
import http from "k6/http";
import execution from "k6/execution";
import { check, fail, group, sleep } from "k6";



const BASE_URL = __ENV.CESIZEN_BASE_URL || "http://localhost:8000";
const CLEAN_BASE_URL = BASE_URL.endsWith("/")
  ? BASE_URL.slice(0, -1)
  : BASE_URL;


//Valeur de tests
const TEST_EMAIL = __ENV.CESIZEN_TEST_EMAIL || "";
const TEST_PASSWORD = __ENV.CESIZEN_TEST_PASSWORD || "";
const TEST_PROFILE = __ENV.CESIZEN_PROFILE || "smoke";


// Définit les différents profils de test disponibles.
const PROFILES = {
  
    //on verfie si le senerio fonctionne
  smoke: {
    executor: "per-vu-iterations",
    vus: 1,
    iterations: 1,
    maxDuration: "1m",
  },

  // monté en charge progressive
  load: {
    executor: "ramping-vus",
    startVUs: 0,

    stages: [
      { duration: "30s", target: 1 },
      { duration: "1m", target: 5 },
      { duration: "30s", target: 0 },
    ],

    gracefulRampDown: "10s",
  },
};



if (!PROFILES[TEST_PROFILE]) {
  throw new Error(
    `Le profil "${TEST_PROFILE}" n’existe pas. Utilise "smoke" ou "load".`
  );
}


//Configuration de K6
export const options = {
  scenarios: {
    [TEST_PROFILE]: PROFILES[TEST_PROFILE],
  },

  noCookiesReset: true,

  //Critere de reussite
  thresholds: {
    checks: ["rate>0.99"],
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1000"],
  },
};


const GET_PARAMETERS = {
  headers: {
    Accept: "application/json, application/ld+json",
  },
};


// Envoie une requête GET et vérifie son code HTTP.
function sendGetRequest(path, label, expectedStatus = 200) {
  const response = http.get(
    `${CLEAN_BASE_URL}${path}`,
    {
      headers: GET_PARAMETERS.headers,
      tags: {
        name: label,
      },
    }
  );


  check(response, {

    [`${label} répond avec le statut ${expectedStatus}`]: (result) =>
      result.status === expectedStatus,
  });
  return response;
}



function loginVirtualUser() {
  
  if (execution.vu.iterationInScenario !== 0) {
    
    return;
  }

  if (!TEST_EMAIL) {
    fail("L’adresse e-mail du compte de test est absente.");
  }

  if (!TEST_PASSWORD) {
    fail("Le mot de passe du compte de test est absent.");
  }

  const loginBody = JSON.stringify({
   
    email: TEST_EMAIL,
    motDePasse: TEST_PASSWORD,
  });

 
  const loginResponse = http.post(
    `${CLEAN_BASE_URL}/api/login_check`,
    loginBody,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      tags: {
        name: "POST /api/login_check",
      },
    }
  );


  const loginSucceeded = check(loginResponse, {
    "La connexion répond avec le statut 200": (result) =>
      result.status === 200,
  });

  if (!loginSucceeded) {
    fail(
      `La connexion a échoué avec le statut ${loginResponse.status}.`
    );
  }


  const cookieJar = http.cookieJar();
  const cookies = cookieJar.cookiesForURL(`${CLEAN_BASE_URL}/`);
  const cookieReceived = check(cookies, {
    "Le cookie AUTH_TOKEN a été reçu": (values) =>
      Boolean(values.AUTH_TOKEN && values.AUTH_TOKEN.length > 0),
  });

  if (!cookieReceived) {
    fail("La connexion a réussi, mais le cookie AUTH_TOKEN est absent.");
  }
}


// Parcours d'un utilisateur
export default function  cesiZenScenario()  {
  let resourceSlug = null;
  group("01 - Consultation publique", function () {
    sendGetRequest(
      "/monitor/health/run",
      "GET /monitor/health/run"
    );

    const resourcesResponse = sendGetRequest(
      "/api/ressources",
      "GET /api/ressources"
    );

    if (resourcesResponse.status === 200) {
      let resourcesBody = null;
      try {
        resourcesBody = resourcesResponse.json();
      } catch (error) {
        fail("La réponse de /api/ressources n’est pas un JSON valide.");
      }

      const resourcesAreValid = check(resourcesBody, {
        "La réponse contient une liste de ressources": (body) =>
          Array.isArray(body.data),
      });

      if (
        resourcesAreValid &&
        resourcesBody.data.length > 0
      ) {
        resourceSlug = resourcesBody.data[0].slug;
      }
    }

    const slugWasFound = check(resourceSlug, {
      "Une ressource possède un slug": (slug) =>
        typeof slug === "string" && slug.length > 0,
    });

    if (slugWasFound) {
      const encodedSlug = encodeURIComponent(resourceSlug);
      sendGetRequest(
        `/api/ressource/${encodedSlug}`,
        "GET /api/ressource/:slug"
      );
    }
  });

  sleep(1);

  group("02 - Authentification", function () {
    loginVirtualUser();
  });

  sleep(1);

  group("03 - Espace utilisateur", function () {
    sendGetRequest(
      "/api/me",
      "GET /api/me"
    );

    sendGetRequest(
      "/api/emotions",
      "GET /api/emotions"
    );

    sendGetRequest(
      "/api/types-emotions",
      "GET /api/types-emotions"
    );

    sendGetRequest(
      "/api/journal",
      "GET /api/journal"
    );
  });

  sleep(1);
}