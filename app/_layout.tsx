import React, { useEffect, useState } from 'react'; // <-- Ensure useState is imported
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import {
  DancingScript_400Regular,
  DancingScript_700Bold
} from '@expo-google-fonts/dancing-script';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
// If you want a basic loading screen, uncomment these:
// import { View, Text, StyleSheet } from 'react-native';

// Prevent the splash screen from auto-hiding until fonts are loaded and app is ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Call useFrameworkReady() here as per React Hooks rules (always at the top level)
  // We assume this hook doesn't directly return JSX itself.
  useFrameworkReady();

  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    'DancingScript-Regular': DancingScript_400Regular,
    'DancingScript-Bold': DancingScript_700Bold,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
  });

  // State to manage overall app readiness (fonts loaded, splash screen hidden)
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        if (fontsLoaded || fontError) {
          // If fonts are loaded (or there was an error loading them), hide the splash screen
          await SplashScreen.hideAsync();
          setAppReady(true); // Mark app as ready to render main content
        }
      } catch (e) {
        // Log any errors during preparation, but still try to hide splash and proceed
        console.warn('Error during app preparation:', e);
        SplashScreen.hideAsync(); // Ensure splash screen is hidden even on error
        setAppReady(true);
      }
    }

    prepareApp();
  }, [fontsLoaded, fontError]); // Re-run effect when fontsLoaded or fontError changes

  // If the app is not ready, return null or a simple loading view
  if (!appReady) {
    return null; // This will keep the splash screen visible (because of preventAutoHideAsync)
                 // until appReady becomes true.
    /*
    // Optional: A very basic loading screen if you don't want just the splash
    return (
      <View style={loadingStyles.container}>
        <Text style={loadingStyles.text}>Loading...</Text>
      </View>
    );
    */
  }

  // Once fonts are loaded and app is ready, render the main application stack
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}

// Optional: Styles for a basic loading screen if you choose to use it
/*
const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF2F8', // Or match your app's background
  },
  text: {
    fontSize: 20,
    color: '#BE185D', // Or a default color
    // IMPORTANT: Do NOT use custom fonts here, as they might not be loaded yet!
  },
});
*/
