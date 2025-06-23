import { Tabs } from 'expo-router';
import { Heart, Info, RotateCcw, X, Download } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  const handleExit = () => {
    if (Platform.OS === 'web') {
      window.close();
    } else {
      console.log('Exit requested - app would minimize on mobile');
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFE4E6',
          borderTopColor: '#F8BBD9',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#E11D48',
        tabBarInactiveTintColor: '#BE185D',
      }}>
      <Tabs.Screen
        name="exit"
        options={{
          title: 'Exit',
          tabBarIcon: ({ size, color }) => (
            <X size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleExit();
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Game',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reset"
        options={{
          title: 'Reset',
          tabBarIcon: ({ size, color }) => (
            <RotateCcw size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (Platform.OS === 'web') {
              window.location.reload();
            } else {
              console.log('Reset requested - would restart app on mobile');
            }
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Info',
          tabBarIcon: ({ size, color }) => (
            <Info size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="download"
        options={{
          title: 'Download',
          tabBarIcon: ({ size, color }) => (
            <Download size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}