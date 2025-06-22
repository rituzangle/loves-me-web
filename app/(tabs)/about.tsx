import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Flower } from 'lucide-react-native';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FDF2F8', '#FCE7F3', '#FBBF24']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Flower size={48} color="#E11D48" />
          <Text style={styles.title}>About the Game</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Play</Text>
          <Text style={styles.text}>
            Tap on each petal of the daisy to pluck it while alternating between "Loves Me" and "Loves Me Not". 
            The final petal will reveal the answer to your heart's question!
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Tradition</Text>
          <Text style={styles.text}>
            This timeless game of chance has been played for generations. Legend says that the daisy holds the truth 
            about love, and its petals can reveal the feelings of your heart's desire.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Features</Text>
          <View style={styles.featureList}>
            <View style={styles.feature}>
              <Heart size={16} color="#E11D48" />
              <Text style={styles.featureText}>Randomized petal count (8-16 petals)</Text>
            </View>
            <View style={styles.feature}>
              <Heart size={16} color="#E11D48" />
              <Text style={styles.featureText}>Smooth petal-plucking animations</Text>
            </View>
            <View style={styles.feature}>
              <Heart size={16} color="#E11D48" />
              <Text style={styles.featureText}>Celebration effects for happy endings</Text>
            </View>
            <View style={styles.feature}>
              <Heart size={16} color="#E11D48" />
              <Text style={styles.featureText}>Haptic feedback on supported devices</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with 💕 for hopeless romantics everywhere
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'DancingScript-Bold',
    color: '#BE185D',
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#BE185D',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#374151',
    lineHeight: 24,
  },
  featureList: {
    marginTop: 10,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#374151',
    marginLeft: 10,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  footerText: {
    fontSize: 16,
    fontFamily: 'DancingScript-Regular',
    color: '#BE185D',
    textAlign: 'center',
  },
});