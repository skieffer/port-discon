const CopyWebpackPlugin = require("copy-webpack-plugin");
const path_resolver = require('path');

module.exports = env => {
    const args = env || {};
    const chrome = !!args.chr;

    return {
        // Need empty `entry` so Webpack doesn't try to compile a `main.js`.
        entry: {
        },
        output: {
            path: path_resolver.resolve(
                __dirname,
                chrome ? 'dist-chrome' : 'dist-mozilla'
            )
        },
        mode: 'development',
        // According to [this](https://github.com/webpack/webpack/issues/4899#issuecomment-609737316),
        // setting `devtool: 'source-map'` is the way to prevent `eval` in the packed JS.
        // We can't have `eval`, since it is not allowed in browser extensions.
        // I'm using 'inline-source-map' instead because plain 'source-map' won't seem to show up in Chrome devtools.
        devtool: 'inline-source-map',
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        context: "src",
                        from: "content.js",
                        to: "content.js"
                    },
                    {
                        context: "src",
                        from: "bg.js",
                        to: "bg.js"
                    },
                    {
                        context: "src",
                        from: "options.html",
                        to: "options.html"
                    },
                    {
                        context: "src",
                        from: "options.js",
                        to: "options.js"
                    },
                    {
                        context: "src",
                        from: chrome ? "manifest.chrome.json" : "manifest.mozilla.json",
                        to: "manifest.json",
                        transform: (content, path) => {
                            const manifest = JSON.parse(content.toString());
                            // Add version number from package.json to manifest.json, so we don't have to repeat ourselves.
                            manifest.version = require("./package.json").version;
                            return JSON.stringify(manifest, null, 2);
                        },
                    },
                ]
            }),
        ],
        performance: {
            hints: false
        },
    };
};
