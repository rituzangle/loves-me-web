import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This is a placeholder component that won't actually render
// since the exit tab is handled by the tab press listener
export default function ExitScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Exiting...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#BE185D',
  },
});