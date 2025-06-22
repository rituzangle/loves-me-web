import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This is a placeholder component that won't actually render
// since the reset tab is handled by the tab press listener
export default function ResetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resetting...</Text>
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