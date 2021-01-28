const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: {
        app: "./index.js",
    },
    output: {
        path: __dirname + "./public/dist",
        filename: 'bundle.js',
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new WebpackPwaManifest({
            filename: "manifest.json",
            inject: false,

            // set fingerprints to `false` to make the names of the generated
            // files predictable making it easier to refer to them in our code
            fingerprints: false,

            name: "AlwaysBudgetTracking",
            short_name: "Budgeter",
            description: 'Always Budget Tracking is an application that allows users to track their expenses, and gains on and offline.',
            theme_color: "#ffffff",
            background_color: "#ffffff",
            start_url: "/",
            display: "standalone",

            icons: [
                {
                    src: path.resolve(
                        __dirname,
                        "public/icons/icon-512x512.png"
                    ),
                    // the plugin will generate an image for each size
                    // included in the size array
                    size: [72, 96, 128, 144, 152, 192, 384, 512],
                    destination: path.join('icons'),
                }
            ]
        })
    ]
};

module.exports = config;