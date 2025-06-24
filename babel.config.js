// babel.config.js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './',
          },
        },
      ],
      'react-native-reanimated/plugin', // this must be last
    ],
  };
};
// This configuration file sets up Babel for an Expo project.
// It includes the necessary presets and plugins for module resolution and React Native Reanimated.
// The 'module-resolver' plugin allows for custom path aliases, making imports cleaner.
// The 'react-native-reanimated/plugin' is included to enable the use of Reanimated features in the project.
// Ensure that the 'react-native-reanimated/plugin' is the last plugin in the array to avoid issues with Reanimated's Babel transformations.
// This setup is essential for optimizing the development experience in React Native applications using Expo.
// Make sure to install the necessary dependencies:
// npm install --save-dev babel-preset-expo babel-plugin-module-resolver react-native-reanimated
// This configuration is compatible with Expo SDK 48 and later versions.
// The alias '@': './' means @/components/utils/petalUtils maps to ./components/utils/petalUtils.
