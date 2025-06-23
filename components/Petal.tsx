import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  Easing,
  runOnJS
} from 'react-native-reanimated';

import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop
} from 'react-native-svg';

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
  const [shouldRender, setShouldRender] = useState(true);

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
        }, () => {
          runOnJS(setShouldRender)(false);
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

  if (!shouldRender) return null;

  return (
    <AnimatedTouchableOpacity
      style={[styles.petalContainer, animatedStyle]}
      onPress={handlePress}
      disabled={disabled || isPlucked}
      activeOpacity={0.8}
    >
      {/* This new Animated.View will be the opaque shadow layer *behind* the SVG */}
      <Animated.View style={styles.shadowCastingLayer} /> 
      
      {/* The SVG petal with the gradient, now sits on top of the shadow layer */}
      <Svg width={PETAL_WIDTH} height={PETAL_HEIGHT} viewBox="0 0 24 48" style={styles.petalSvg}>
        <Path
          d="M12 2 C6 2, 2 8, 2 16 C2 24, 6 30, 12 46 C18 30, 22 24, 22 16 C22 8, 18 2, 12 2 Z"
          fill="url(#petalGradient)"
          stroke="#E91E63"
          strokeWidth="0.5"
        />
        <Defs>
          <LinearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FDF2F8" />
            <Stop offset="50%" stopColor="#F8BBD9" />
            <Stop offset="100%" stopColor="#EC4899" />
          </LinearGradient>
        </Defs>
      </Svg>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  petalContainer: {
    position: 'absolute',
    justifyContent: 'center', // Center children vertically
    alignItems: 'center',   // Center children horizontally
    width: 'auto', // Allow content to dictate size, or set explicitly if needed
    height: 'auto',
  },
  shadowCastingLayer: {
    // This is the opaque layer that will cast the shadow
    position: 'absolute', // Position it absolutely within petalContainer
    width: '100%', // Match the size of the petal
    height: '100%',
    backgroundColor: '#FDF2F8', // Choose a solid color that matches the lightest part of your petal's gradient, or the background it sits on.
                               // This makes the layer opaque for shadow calculation.
    borderRadius: 999, // Make it roughly circular to match the petal's base shape
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    // Optional: If you see any clipping issues, adjust `overflow` or `zIndex`.
    // overflow: 'hidden', // Can sometimes help, but be cautious with clipping
  },
  petalSvg: {
    position: 'absolute', // Make it absolute to layer on top
    // Ensure the SVG is above the shadow layer
    zIndex: 1, 
  }
});
// This component renders a petal with an animated fall effect when plucked.
// It uses React Native Reanimated for animations and SVG for rendering the petal shape.
// The petal falls with a rotation and horizontal drift, and fades out before being removed from the DOM.
// The petal is styled with a gradient fill and a stroke, and it can be plucked by tapping on it.
// The component accepts props for id, angle, plucked state, a callback for plucking, a disabled state, and the size of the daisy.
//
// The petal's position is calculated based on the angle and a fixed radius from the center of the daisy.
//
// The petal's animation includes translation, rotation, scaling, and opacity changes.
//
// The component uses a TouchableOpacity for interaction, and it disables interaction when the petal is plucked or if the disabled prop is true.
//
// The petal is rendered with a gradient fill and a stroke, and it uses a shared value for animations.
//
// The component also includes a shadow casting layer to enhance the visual effect of the petal.
// This code is a React Native component that renders a petal for a daisy game.
// It uses React Native Reanimated for animations and SVG for rendering the petal shape.
//
// The petal falls with a rotation and horizontal drift when plucked, and fades out before being removed from the DOM.
//
// The petal is styled with a gradient fill and a stroke, and it can be plucked by tapping on it.
//
// The component accepts props for id, angle, plucked state, a callback for plucking, a disabled state, and the size of the daisy.
//
// The petal's position is calculated based on the angle and a fixed radius from the center of the daisy.
// // The petal's animation includes translation, rotation, scaling, and opacity changes.
//
// The component uses a TouchableOpacity for interaction, and it disables interaction when the petal is plucked or if the disabled prop is true.
// The petal is rendered with a gradient fill and a stroke, and it uses a shared value for animations.
// The component also includes a shadow casting layer to enhance the visual effect of the petal.
// This code is a React Native component that renders a petal for a daisy game.
// It uses React Native Reanimated for animations and SVG for rendering the petal shape.
//
// The petal falls with a rotation and horizontal drift when plucked, and fades out before being removed from the DOM.
// The petal is styled with a gradient fill and a stroke, and it can be plucked by tapping on it.
// The component accepts props for id, angle, plucked state, a callback for plucking, a disabled state, and the size of the daisy.
//