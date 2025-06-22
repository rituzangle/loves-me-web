import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Download, Github } from 'lucide-react-native';
import Petal from '@/components/Petal';
import HeartEffect from '@/components/HeartEffect';

const { width, height } = Dimensions.get('window');
const DAISY_SIZE = Math.min(width * 0.8, 320);
const CENTER_SIZE = DAISY_SIZE * 0.3;

interface PetalData {
  id: string;
  angle: number;
  isPlucked: boolean;
}

export default function GameScreen() {
  const [petals, setPetals] = useState<PetalData[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'loves-me' | 'loves-me-not' | 'ready'>('ready');
  const [currentPhrase, setCurrentPhrase] = useState<'loves-me' | 'loves-me-not'>('loves-me');
  const [petalCount, setPetalCount] = useState(0);
  const [startingPhrase, setStartingPhrase] = useState<'loves-me' | 'loves-me-not'>('loves-me');
  const [gameId, setGameId] = useState(0); // 🔄 Used to remount the daisy

  const centerScale = useSharedValue(1);
  const titleOpacity = useSharedValue(1);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const numPetals = Math.floor(Math.random() * 9) + 8;
    const randomStartingPhrase: 'loves-me' | 'loves-me-not' = Math.random() < 0.5 ? 'loves-me' : 'loves-me-not';

    const newPetals: PetalData[] = Array.from({ length: numPetals }, (_, index) => ({
      id: `petal-${index}`,
      angle: (360 / numPetals) * index,
      isPlucked: false,
    }));

    setPetals(newPetals);
    setPetalCount(numPetals);
    setGameState('playing');
    setCurrentPhrase(randomStartingPhrase);
    setStartingPhrase(randomStartingPhrase);
    setGameId(prev => prev + 1); // 🔁 Force re-render of petal view

    centerScale.value = withSpring(1);
    titleOpacity.value = withTiming(1);
  };

  const triggerHaptics = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleExport = () => {
    if (Platform.OS === 'web') {
      try {
        const link = document.createElement('a');
        link.href = '/loves-me-loves-me-not-app.zip';
        link.download = 'loves-me-loves-me-not-app.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Export failed:', error);
      }
    }
  };

  const handleIntegration = () => {
    if (Platform.OS === 'web') {
      window.open('https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository', '_blank');
    }
  };

  const pluckPetal = (petalId: string) => {
    if (gameState !== 'playing') return;

    triggerHaptics();

    setPetals(prev =>
      prev.map(petal =>
        petal.id === petalId ? { ...petal, isPlucked: true } : petal
      )
    );

    const remainingPetals = petalCount - 1;
    setPetalCount(remainingPetals);

    if (remainingPetals === 0) {
      setTimeout(() => {
        setGameState(currentPhrase);
        centerScale.value = withSequence(
          withSpring(1.2, { duration: 300 }),
          withSpring(1, { duration: 300 })
        );
      }, 500);
    } else {
      setCurrentPhrase(prev =>
        prev === 'loves-me' ? 'loves-me-not' : 'loves-me'
      );

      centerScale.value = withSequence(
        withSpring(0.9, { duration: 200 }),
        withSpring(1, { duration: 200 })
      );
    }
  };

  const centerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: centerScale.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const getCurrentText = () => {
    if (gameState === 'loves-me') return 'They Love Me! 💕';
    if (gameState === 'loves-me-not') return 'They Love Me Not... 💔';
    if (gameState === 'ready') return 'Tap a petal to start!';
    return currentPhrase === 'loves-me' ? 'Loves Me...' : 'Loves Me Not...';
  };

  const getTextColor = () => {
    if (gameState === 'loves-me') return '#E11D48';
    if (gameState === 'loves-me-not') return '#6B7280';
    return '#BE185D';
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FDF2F8', '#FCE7F3', '#FBBF24']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.topRightButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleExport}>
          <Download size={20} color="#E11D48" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleIntegration}>
          <Github size={20} color="#E11D48" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Animated.Text style={[styles.title, titleAnimatedStyle]}>
          Loves Me, Loves Me Not
        </Animated.Text>
        <Text style={[styles.currentText, { color: getTextColor() }]}>
          {getCurrentText()}
        </Text>
        {gameState === 'playing' && (
          <>
            <Text style={styles.petalCount}>{petalCount} petals remaining</Text>
            <Text style={styles.startingInfo}>
              Starting with: {startingPhrase === 'loves-me' ? 'Loves Me' : 'Loves Me Not'}
            </Text>
          </>
        )}
      </View>

      <View style={styles.gameArea}>
        <View key={gameId} style={styles.daisyContainer}>
          {petals.map((petal) => (
            <Petal
              key={petal.id}
              id={petal.id}
              angle={petal.angle}
              isPlucked={petal.isPlucked}
              onPluck={pluckPetal}
              disabled={gameState !== 'playing'}
              daisySize={DAISY_SIZE}
            />
          ))}

          <Animated.View style={[styles.daisyCenter, centerAnimatedStyle]}>
            <LinearGradient
              colors={['#FCD34D', '#F59E0B', '#D97706']}
              style={styles.centerGradient}
            >
              <Text style={styles.centerText}>🌼</Text>
            </LinearGradient>
          </Animated.View>
        </View>

        {gameState === 'loves-me' && <HeartEffect type="celebration" />}
        {gameState === 'loves-me-not' && <HeartEffect type="broken" />}
      </View>

      {(gameState === 'loves-me' || gameState === 'loves-me-not') && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.playAgainButton} onPress={initializeGame}>
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topRightButtons: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    gap: 12,
    zIndex: 1000,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
        borderWidth: 1,
    borderColor: 'rgba(225, 29, 72, 0.2)',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'DancingScript-Bold',
    color: '#BE185D',
    marginBottom: 10,
    textAlign: 'center',
  },
  currentText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
    textAlign: 'center',
  },
  petalCount: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  startingInfo: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daisyContainer: {
    width: DAISY_SIZE,
    height: DAISY_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daisyCenter: {
    position: 'absolute',
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  centerGradient: {
    width: '100%',
    height: '100%',
    borderRadius: CENTER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 30,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  playAgainButton: {
    backgroundColor: '#E11D48',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playAgainText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});

    
      