import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { Heart, HeartCrack } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface HeartEffectProps {
  type: 'celebration' | 'broken';
}

const AnimatedHeart = Animated.createAnimatedComponent(Heart);
const AnimatedHeartCrack = Animated.createAnimatedComponent(HeartCrack);

export default function HeartEffect({ type }: HeartEffectProps) {
  // Main heart animation values
  const mainHeartY = useSharedValue(0);
  const mainHeartScale = useSharedValue(0);
  const mainHeartRotation = useSharedValue(0);
  const mainHeartOpacity = useSharedValue(1);

  // Floating hearts (for celebration)
  const floatingHeart1Y = useSharedValue(0);
  const floatingHeart2Y = useSharedValue(0);
  const floatingHeart3Y = useSharedValue(0);
  const floatingHeart1X = useSharedValue(0);
  const floatingHeart2X = useSharedValue(0);
  const floatingHeart3X = useSharedValue(0);
  const floatingOpacity = useSharedValue(0);

  useEffect(() => {
    if (type === 'celebration') {
      // Main heart rises gracefully
      mainHeartScale.value = withSpring(1, { duration: 500 });
      mainHeartY.value = withTiming(-100, {
        duration: 2000,
        easing: Easing.out(Easing.quad),
      });
      mainHeartRotation.value = withRepeat(
        withTiming(10, { duration: 1000 }),
        -1,
        true
      );

      // Floating hearts animation
      setTimeout(() => {
        floatingOpacity.value = withTiming(1, { duration: 300 });
        
        floatingHeart1Y.value = withTiming(-150, { duration: 3000 });
        floatingHeart1X.value = withTiming(-50, { duration: 3000 });
        
        floatingHeart2Y.value = withTiming(-180, { duration: 3500 });
        floatingHeart2X.value = withTiming(60, { duration: 3500 });
        
        floatingHeart3Y.value = withTiming(-160, { duration: 2800 });
        floatingHeart3X.value = withTiming(-80, { duration: 2800 });

        setTimeout(() => {
          floatingOpacity.value = withTiming(0, { duration: 1000 });
        }, 2000);
      }, 500);

    } else {
      // Broken heart animation
      mainHeartScale.value = withSpring(1.2, { duration: 300 });
      
      setTimeout(() => {
        mainHeartY.value = withTiming(200, {
          duration: 1500,
          easing: Easing.in(Easing.quad),
        });
        mainHeartRotation.value = withTiming(45, {
          duration: 1500,
          easing: Easing.in(Easing.quad),
        });
        mainHeartOpacity.value = withTiming(0.3, { duration: 1500 });
      }, 800);
    }
  }, [type]);

  const mainHeartStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: mainHeartY.value },
      { scale: mainHeartScale.value },
      { rotate: `${mainHeartRotation.value}deg` },
    ],
    opacity: mainHeartOpacity.value,
  }));

  const floatingHeart1Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatingHeart1Y.value },
      { translateX: floatingHeart1X.value },
    ],
    opacity: floatingOpacity.value,
  }));

  const floatingHeart2Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatingHeart2Y.value },
      { translateX: floatingHeart2X.value },
    ],
    opacity: floatingOpacity.value,
  }));

  const floatingHeart3Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatingHeart3Y.value },
      { translateX: floatingHeart3X.value },
    ],
    opacity: floatingOpacity.value,
  }));

  return (
    <View style={styles.heartContainer}>
      {/* Main Heart */}
      <Animated.View style={[styles.mainHeart, mainHeartStyle]}>
        {type === 'celebration' ? (
          <AnimatedHeart size={60} color="#E11D48" fill="#E11D48" />
        ) : (
          <AnimatedHeartCrack size={60} color="#6B7280" />
        )}
      </Animated.View>

      {/* Floating Hearts (only for celebration) */}
      {type === 'celebration' && (
        <>
          <Animated.View style={[styles.floatingHeart, floatingHeart1Style]}>
            <AnimatedHeart size={30} color="#F97316" fill="#F97316" />
          </Animated.View>
          <Animated.View style={[styles.floatingHeart, floatingHeart2Style]}>
            <AnimatedHeart size={25} color="#EC4899" fill="#EC4899" />
          </Animated.View>
          <Animated.View style={[styles.floatingHeart, floatingHeart3Style]}>
            <AnimatedHeart size={35} color="#E11D48" fill="#E11D48" />
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heartContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30,
    marginTop: -30,
    zIndex: 1000,
  },
  mainHeart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingHeart: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});