module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            { pattern: 'test/main.js', watched: false } // TODO: Remove watched property?
        ],
        exclude: [],
        preprocessors:{
            'test/main.js': ['webpack', 'sourcemap']
        },
        webpack: require('./webpack.config')({ env: 'test' }),
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    });
}
