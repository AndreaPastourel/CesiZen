
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";


const DAILY_EMOTION_REMINDER_ID = "daily-emotion-reminder";


Notifications.setNotificationHandler({

  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export async function requestNotificationPermission() {

  const currentPermission = await Notifications.getPermissionsAsync();

  if (currentPermission.granted) {
    return true;
  }

  const requestedPermission = await Notifications.requestPermissionsAsync();
  return requestedPermission.granted;
}

export async function configureAndroidNotificationChannel() {
 
  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync("daily-reminder", {
    name: "Rappels quotidiens",
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: "default",
  });
}


export async function cancelDailyEmotionReminder() {

  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();


  const existingReminder = scheduledNotifications.find(
   
    (notification) => notification.identifier === DAILY_EMOTION_REMINDER_ID
  );


  if (existingReminder) {
    await Notifications.cancelScheduledNotificationAsync(
      DAILY_EMOTION_REMINDER_ID
    );
  }
}

export async function scheduleDailyEmotionReminder() {
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    return false;
  }

  await configureAndroidNotificationChannel();
  await cancelDailyEmotionReminder();


  await Notifications.scheduleNotificationAsync({
   
    identifier: DAILY_EMOTION_REMINDER_ID,

   
    content: {
  
      title: "Petit point émotion 🌿",
      body: "Prenez une minute pour ajouter votre émotion du jour dans CESI Zen.",
      sound: "default",
    },


    trigger: {
     
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,

      minute: 0,

      channelId: "daily-reminder",
    },
  });


  return true;
}



//notification de test

export async function scheduleTestEmotionReminder() {
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    return false;
  }

  await configureAndroidNotificationChannel();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Test notification 🌿",
      body: "Si tu vois ça, ton rappel d’émotion fonctionne.",
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
      channelId: "daily-reminder",
    },
  });

  return true;
}