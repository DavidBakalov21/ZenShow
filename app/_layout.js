import { Stack } from "expo-router";
import { PlayerProvider } from "../components/other/PlayerContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PlayerProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="about"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="library"
            options={{
              headerShown: false,
              gestureEnabled: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="settings"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="themepick"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="player"
            options={{
              headerShown: false,
              gestureEnabled: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="deletepage"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack>
      </PlayerProvider>
    </GestureHandlerRootView>
  );
}
