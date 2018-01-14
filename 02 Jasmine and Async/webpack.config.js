const path = require('path');

module.exports = () => {
    return {
        entry: {
            main: './src/main.ts'
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].bundle.js'
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader'
                    ]
                }
            ]
        },
        devtool: 'inline-source-map'
    }
}
