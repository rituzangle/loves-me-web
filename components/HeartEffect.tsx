// 🪄 HeartEffect.tsx - A whimsical celebration of love, longing, and glittery resilience
// 💘 Celebration mode:
//  - Spring-loaded heart + heartbeat pulse
//  - Floating hearts drifting upward
//  - 5 randomized sparkles shimmering around the heart
// 💔 Broken heart mode:
//  - Cracked heart fall
//  - 🌱 sprout grows from the ground
//  - A random quip offers playful encouragement
// 🔮 magic: random timing, sparkle loops, web-safe animations

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
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

interface HeartEffectProps {
  type: 'celebration' | 'broken';
}

const AnimatedHeart = Animated.createAnimatedComponent(Heart);
const AnimatedHeartCrack = Animated.createAnimatedComponent(HeartCrack);
const AnimatedText = Animated.createAnimatedComponent(Text);

const quips = [
  "A '🪢' today doesn’t mean never.🪢",
  'Even daisies get it wrong sometimes. 🍃',
  "Your story’s just flipping to the next page... 📖",
  'Try again. Your destiny took a coffee break. ☕✨',
  '404: Love outcome not found. 🌥️',
  'This daisy had commitment issues. 😬',
  'Ugh. Typical flower drama. 🌸🥲',
  'Denied. But you look amazing. 👀💅',
  'Some answers need a second try. ',
  'Silence is still an answer. 🎤',
  'Every ‘not’ shapes your ‘yes’. 😈',
  'The petal union’s still voting. 🗳️',
  "Itsy bitsy 🕷️ says: Let's try again.",
];

export default function HeartEffect({ type }: HeartEffectProps) {
  const [quip, setQuip] = useState('');

  // Main heart animation values
  const mainHeartY = useSharedValue(0);
  const mainHeartScale = useSharedValue(0);
  const mainHeartRotation = useSharedValue(0);
  const mainHeartOpacity = useSharedValue(1);

  // Floating hearts
  const floatingHeart1Y = useSharedValue(0);
  const floatingHeart2Y = useSharedValue(0);
  const floatingHeart3Y = useSharedValue(0);
  const floatingHeart1X = useSharedValue(0);
  const floatingHeart2X = useSharedValue(0);
  const floatingHeart3X = useSharedValue(0);
  const floatingOpacity = useSharedValue(0);

  // Sprout + quip text
  const reassuranceOpacity = useSharedValue(0);
  const sproutY = useSharedValue(10);
  const sproutOpacity = useSharedValue(0);

  // Sparkle config
  const sparkleCount = 5;
  const sparkles = [...Array(sparkleCount)].map(() => ({
    x: useSharedValue(0),
    y: useSharedValue(0),
    opacity: useSharedValue(0),
    scale: useSharedValue(1),
    rotation: useSharedValue(0),
  }));

  const floatEase = Easing.inOut(Easing.ease);
  // if heart broken => "loves me not hit"
  useEffect(() => {
  if (type === 'broken') {
    const pick = quips[Math.floor(Math.random() * quips.length)];
    setQuip(pick);
  
    mainHeartScale.value = withSpring(1.2, {
      damping: 8,
      stiffness: 200,
    });
  
    setTimeout(() => {
      mainHeartY.value = withTiming(200, {
        duration: 1500,
        easing: Easing.in(Easing.quad),
      });
  
      mainHeartRotation.value = withTiming(45, {
        duration: 1500,
        easing: Easing.in(Easing.quad),
      });
  
      mainHeartOpacity.value = withTiming(0.3, {
        duration: 1500,
        easing: Easing.out(Easing.quad),
      });
  
      reassuranceOpacity.value = withTiming(1, {
        duration: 1200,
        delay: 0,
        easing: Easing.out(Easing.quad),
      });
  
      sproutY.value = withTiming(-30, { duration: 1200 });
      sproutOpacity.value = withTiming(1, { duration: 800 });
    }, 800);
  }
    else {
    // 💘 Celebration animation
    mainHeartScale.value = withSpring(1, { damping: 12, stiffness: 150 });
    mainHeartY.value = withTiming(-100, { duration: 2000, easing: Easing.out(Easing.quad) });

    mainHeartRotation.value = withRepeat(
      withTiming(10, { duration: 1000 }),
      -1,
      true
    );

    setTimeout(() => {
      mainHeartScale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 220 }),
          withTiming(1.0, { duration: 220 })
        ),
        -1,
        false
      );
    }, 600);

    setTimeout(() => {
      floatingOpacity.value = withTiming(1, { duration: 300 });

      floatingHeart1Y.value = withTiming(-150, { duration: 3000, easing: floatEase });
      floatingHeart1X.value = withTiming(-50, { duration: 3000, easing: floatEase });

      floatingHeart2Y.value = withTiming(-180, { duration: 3500, easing: floatEase });
      floatingHeart2X.value = withTiming(60, { duration: 3500, easing: floatEase });

      floatingHeart3Y.value = withTiming(-160, { duration: 2800, easing: floatEase });
      floatingHeart3X.value = withTiming(-80, { duration: 2800, easing: floatEase });

      setTimeout(() => {
        floatingOpacity.value = withTiming(0, { duration: 1000, easing: floatEase });
      }, 2000);
    }, 500);

    // ✨ SPARKLE PARTY ✨
    sparkles.forEach((sparkle, index) => {
      const delay = 400 + index * 150;
      const xDrift = (Math.random() - 0.5) * 60;
      const yDrift = -80 - Math.random() * 40;
      const scaleSize = 0.6 + Math.random();

      setTimeout(() => {
        sparkle.x.value = withTiming(xDrift, { duration: 1000 });
        sparkle.y.value = withTiming(yDrift, { duration: 1000 });
        sparkle.opacity.value = withSequence(
          withTiming(1, { duration: 200 }),
          withTiming(0, { duration: 800 })
        );
        sparkle.scale.value = withSequence(
          withTiming(scaleSize, { duration: 200 }),
          withTiming(0.5, { duration: 800 })
        );
        sparkle.rotation.value = withTiming(360, { duration: 1000 });
      }, delay);
    });
    }
    }, [type]);
      // Animated styles
  const mainHeartStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: mainHeartY.value },
      { scale: mainHeartScale.value },
      { rotate: `${mainHeartRotation.value}deg` },
    ],
    opacity: mainHeartOpacity.value,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: Platform.OS === 'web' ? 0 : 0.35,
    shadowRadius: mainHeartScale.value * 12,
  }));

  const floatingHeartStyle = (x: Animated.SharedValue<number>, y: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => ({
      transform: [{ translateY: y.value }, { translateX: x.value }],
      opacity: floatingOpacity.value,
    }));

  const reassuranceStyle = useAnimatedStyle(() => ({
    opacity: reassuranceOpacity.value,
    transform: [{ translateY: 30 }],
  }));

  const sproutStyle = useAnimatedStyle(() => ({
    opacity: sproutOpacity.value,
    transform: [{ translateY: sproutY.value }],
  }));

  const sparkleStyles = sparkles.map((sparkle) =>
    useAnimatedStyle(() => ({
      position: 'absolute',
      opacity: sparkle.opacity.value,
      transform: [
        { translateX: sparkle.x.value },
        { translateY: sparkle.y.value },
        { scale: sparkle.scale.value },
        { rotate: `${sparkle.rotation.value}deg` },
      ],
    }))
  );

  return (
    <View style={styles.heartContainer}>
      <Animated.View style={[styles.mainHeart, mainHeartStyle]}>
        {type === 'celebration' ? (
          <AnimatedHeart size={60} color="#E11D48" fill="#E11D48" strokeWidth={2} />
        ) : (
          <AnimatedHeartCrack size={60} color="#6B7280" strokeWidth={2} />
        )}
      </Animated.View>

      {/* Floating Hearts */}
      {type === 'celebration' &&
        <>
          <Animated.View style={[styles.floatingHeart, floatingHeartStyle(floatingHeart1X, floatingHeart1Y)]}>
            <AnimatedHeart size={30} color="#F97316" fill="#F97316" strokeWidth={2} />
          </Animated.View>
          <Animated.View style={[styles.floatingHeart, floatingHeartStyle(floatingHeart2X, floatingHeart2Y)]}>
            <AnimatedHeart size={25} color="#EC4899" fill="#EC4899" strokeWidth={2} />
          </Animated.View>
          <Animated.View style={[styles.floatingHeart, floatingHeartStyle(floatingHeart3X, floatingHeart3Y)]}>
            <AnimatedHeart size={35} color="#E11D48" fill="#E11D48" strokeWidth={2} />
          </Animated.View>
        </>
      }

      {/* Sparkles! */}
      {type === 'celebration' &&
        sparkleStyles.map((style, index) => (
          <AnimatedText key={index} style={[styles.sparkle, style]}>
            {['✨', '❇️', '💫', '🌟', '🔆'][index % 5]}
          </AnimatedText>
        ))
      }

      {/* Quip + Sprout on heartbreak */}
     {type === 'broken' && (
      <View style={styles.quipWrapper}>
        <AnimatedText style={[styles.reassuranceText, reassuranceStyle]}>
          <Text style={{ marginLeft: -90, marginTop: -150 }}>{quip}</Text>
        </AnimatedText>
        <AnimatedText style={[styles.sprout, sproutStyle]}>
          🌱
        </AnimatedText>

      </View>
    )} {/* End of broken heart bit*/}
    </View>
  );
}

// 🌈 Styles
const styles = StyleSheet.create({
  heartContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30,
    marginTop: -30,
    zIndex: 1000,
    alignItems: 'center',
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
    quipWrapper: {
        bottom: 20,
        transform: [{ translateX: -100 }],
        transform: [{ translateY: 50 }],
        //width: '100%',
        alignItems: 'center',
    },
reassuranceText: {
  fontSize: 18,
  fontFamily: 'Poppins-Regular',
  color: '#6B7280',
  // textAlign: 'left',
  //lineHeight: 28,
},

sprout: {
  fontSize: 44,
  marginTop: 116,
  textAlign: 'center',
},

  // OLD reassuranceText: {
  //left: '1%', width: '124%',
  //fontSize: 24,
 // fontFamily: 'Poppins-Italic',
 // color: '#6B7280',
   // bottom: '-12%',
  //textAlign: 'left',
 // lineHeight: 22,
    //alignSelf: 'left',
//},
  // sprout: {
   //  position: 'absolute',
    // justifyContent: 'centre',
   //  bottom: '-150%',
  //   fontSize: 100,
  //   textAlign: 'center',
 //  }, //End Sprout

  sparkle: {
    fontSize: 22,
    zIndex: 9000,
  },
});
// This file defines the HeartEffect component, which displays a whimsical heart animation with floating hearts and sparkles.
// It uses React Native Reanimated for smooth animations and Lucide icons for the heart shapes.
// The component supports two modes: celebration and broken, each with unique animations and effects.
// It also includes a random quip for encouragement in broken mode.
// The styles are defined using StyleSheet.create for better performance and organization.
// This component is part of a React Native application that uses Expo and Reanimated for animations.
// It is designed to be used in a daisy petal plucking game, enhancing the user experience with playful animations and effects.
// This file defines the HeartEffect component, which displays a whimsical heart animation with floating hearts and sparkles.
// It uses React Native Reanimated for smooth animations and Lucide icons for the heart shapes.
// The component supports two modes: celebration and broken, each with unique animations and effects.
// It also includes a random quip for encouragement in broken mode.
// The styles are defined using StyleSheet.create for better performance and organization.
// This component is part of a React Native application that uses Expo and Reanimated for animations.
// It is designed to be used in a daisy petal plucking game, enhancing the user experience with playful animations and effects.
// This file defines the HeartEffect component, which displays a whimsical heart animation with floating hearts and sparkles.
// It uses React Native Reanimated for smooth animations and Lucide icons for the heart shapes.
// The component supports two modes: celebration and broken, each with unique animations and effects.
// It also includes a random quip for encouragement in broken mode.
 
