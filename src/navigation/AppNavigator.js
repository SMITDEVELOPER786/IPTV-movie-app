import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import all screens
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MoviesScreen from "../screens/MoviesScreen";
import SeriesScreen from "../screens/SeriesScreen";
import SplashScreen from "../screens/SplashScreen";
import MultiScreen from "../screens/MultiScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ParentalControlScreen from "../screens/ParentalControlScreen";
import PlayerSelectionScreen from "../screens/PlayerSelectionScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import SpeedTestScreen from "../screens/SpeedTestScreen";
import SubtitleScreen from "../screens/SubtitleScreen";
import VideoFormatScreen from "../screens/VideoFormatScreen";
import VPNScreen from "../screens/VPNScreen";
import AddPlaylistScreen from "../screens/AddPlaylistScreen";
import AutomationScreen from "../screens/AutomationScreen";
import EPGScreen from "../screens/EPGScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
// import GeneralSettingsScreen from "../screens/GeneralSettingsScreen";
// import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Movies" component={MoviesScreen} />
      <Stack.Screen name="Series" component={SeriesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Multi" component={MultiScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="ParentalControl" component={ParentalControlScreen} />
      <Stack.Screen name="PlayerSelection" component={PlayerSelectionScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="SpeedTest" component={SpeedTestScreen} />
      <Stack.Screen name="Subtitles" component={SubtitleScreen} />
      <Stack.Screen name="VideoFormat" component={VideoFormatScreen} />
      <Stack.Screen name="VPN" component={VPNScreen} />
      <Stack.Screen name="AddPlaylist" component={AddPlaylistScreen} />
      <Stack.Screen name="Automation" component={AutomationScreen} />
      <Stack.Screen name="EPG" component={EPGScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} /> */}
      {/* <Stack.Screen name="GeneralSettings" component={GeneralSettingsScreen} /> */}
    </Stack.Navigator>
  );
}
