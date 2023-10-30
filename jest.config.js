/* eslint-disable */
module.exports = {
    roots: ['media/js/src'],
    globals: {
        'MetricsMentor': ''
    },
    moduleFileExtensions: ['jsx', 'js'],
    testPathIgnorePatterns: ['node_modules/'],
    testEnvironment: 'jsdom',
    testMatch: ['**/*.test.(jsjsx)'],
    moduleNameMapper: {
        // Mocks out all these file formats when tests are run.
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/src/__mocks__/fileMock.ts',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
};