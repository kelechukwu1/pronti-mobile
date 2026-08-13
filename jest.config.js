module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@reduxjs/toolkit|react-redux|immer|react-native-gesture-handler|react-native-reanimated|react-native-vector-icons|react-native-safe-area-context|@apollo/client)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: [
    './jest.setup.js',
  ],
};
