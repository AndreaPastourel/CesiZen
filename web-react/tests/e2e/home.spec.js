import { test, expect } from "@playwright/test";

test("la page d'accueil se charge", async ({ page }) => {
  const response = await page.goto("/", {
    waitUntil: "domcontentloaded",
    timeout: 15000
  });

  expect(response).not.toBeNull();
  expect(response?.ok()).toBe(true);
});
