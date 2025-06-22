import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Easing } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const { height } = Dimensions.get('window');

interface PetalProps {
  id: string;
  angle: number;
  isPlucked: boolean;
  onPluck: (id: string) => void;
  disabled: boolean;
  daisySize: number;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Petal({
  id,
  angle,
  isPlucked,
  onPluck,
  disabled,
  daisySize,
}: PetalProps) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const PETAL_WIDTH = daisySize * 0.12;
  const PETAL_HEIGHT = daisySize * 0.2;
  const RADIUS = daisySize * 0.35;

  const radian = (angle * Math.PI) / 180;
  const petalX = Math.cos(radian) * RADIUS;
  const petalY = Math.sin(radian) * RADIUS;
  const petalRotation = angle + 90;

  useEffect(() => {
    if (isPlucked) {
      const fallDistance = height + 100;
      const horizontalDrift = (Math.random() - 0.5) * 150;
      const rotationAmount = (Math.random() - 0.5) * 540;

      translateY.value = withTiming(fallDistance, {
        duration: 4000,
        easing: Easing.out(Easing.cubic),
      });

      translateX.value = withTiming(horizontalDrift, {
        duration: 4500,
        easing: Easing.out(Easing.ease),
      });

      rotation.value = withTiming(rotationAmount, {
        duration: 4200,
        easing: Easing.out(Easing.quad),
      });

      setTimeout(() => {
        opacity.value = withTiming(0, {
          duration: 2000,
          easing: Easing.out(Easing.quad),
        });
      }, 1500);
    }
  }, [isPlucked]);

  const handlePress = () => {
    if (disabled || isPlucked) return;

    scale.value = withSequence(
      withSpring(1.2, { duration: 100 }),
      withSpring(1, { duration: 100 })
    );

    setTimeout(() => onPluck(id), 150);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: petalX + translateX.value },
      { translateY: petalY + translateY.value },
      { rotate: `${petalRotation + rotation.value}deg` },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  if (isPlucked && opacity.value === 0) return null;

  return (
    <AnimatedTouchableOpacity
      style={[styles.petal, animatedStyle]}
      onPress={handlePress}
      disabled={disabled || isPlucked}
      activeOpacity={0.8}
    >
      <Svg width={PETAL_WIDTH} height={PETAL_HEIGHT} viewBox="0 0 24 48">
        <Path
          d="M12 2 C6 2, 2 8, 2 16 C2 24, 6 30, 12 46 C18 30, 22 24, 22 16 C22 8, 18 2, 12 2 Z"
          fill="url(#petalGradient)"
          stroke="#E91E63"
          strokeWidth="0.5"
        />
        <defs>
          <linearGradient
            id="petalGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FDF2F8" />
            <stop offset="50%" stopColor="#F8BBD9" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </Svg>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  petal: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
