import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import all screens
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MoviesScreen from "../screens/MoviesScreen";
import SeriesScreen from "../screens/SeriesScreen";
import LiveTVScreen from "../screens/LiveScreen";
import SplashScreen from "../screens/SplashScreen";
import MultiScreenModal from '../screens/MultiScreen'
import NotificationScreen from "../screens/NotificationScreen";
import ParentalControlModal from "../screens/ParentalControlModal";
import PlayerSelectionScreen from "../screens/PlayerSelectionModal";
import PlaylistScreen from "../screens/PlaylistScreen";
import SpeedTestModal from '../screens/SpeedTestScreen'
import SubtitleScreen from "../screens/SubtitleModal";
import VideoFormatModal from "../screens/VideoFormatModal";
import VPNModal from '../screens/VPNScreen'
import EPGScreen from "../screens/EPGScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import GeneralSettingsScreen from "../screens/GeneralSettings";
import SettingsScreen from "../screens/SettingScreen";
import AddPlaylistModal from "../screens/AddPlaylistModal";


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerShown:false
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} ptions={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="LiveTV" component={LiveTVScreen}/>
      <Stack.Screen name="Movies" component={MoviesScreen} />
      <Stack.Screen name="Series" component={SeriesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="multiscreen" component={MultiScreenModal} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="ParentalControl" component={ParentalControlModal} />
      <Stack.Screen name="PlayerSelection" component={PlayerSelectionScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="SpeedTest" component={SpeedTestModal} />
      <Stack.Screen name="Subtitles" component={SubtitleScreen} />
      <Stack.Screen name="VideoFormat" component={VideoFormatModal} />
      <Stack.Screen name="VPN" component={VPNModal} />
      <Stack.Screen name="AddPlaylist" component={AddPlaylistModal} />
      <Stack.Screen name="EPG" component={EPGScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} /> 
      <Stack.Screen name="GeneralSettings" component={GeneralSettingsScreen} />
    </Stack.Navigator>
  );
}
