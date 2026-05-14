import { getAccessToken } from "@/services/authStorage";
import { getCurrentUser } from "@/services/userStorage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  async function checkSession() {
    const token = await getAccessToken();
    const user = await getCurrentUser();

    if (token && user) {
      setInitialRoute("/(tabs)/ressourcesList");
      return;
    }

    setInitialRoute("/ressourcesList");
  }

  useEffect(() => {
    checkSession();
  }, []);

  if (!initialRoute) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F8F4EC",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={initialRoute as any} />;
}