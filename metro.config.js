const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      'react-native': path.resolve(__dirname, 'node_modules/react-native-tvos'),
    },
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx', 'tvos.js'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
