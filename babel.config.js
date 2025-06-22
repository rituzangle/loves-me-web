// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // Required for expo-router to correctly transpile its modules for native builds
        'expo-router/babel',
        // Keep react-native-reanimated/plugin if you are using React Native Reanimated
        'react-native-reanimated/plugin',
      ],
    };
  };
  