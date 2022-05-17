process.traceDeprecation = true;
const path = require("path");
const patternslib_config = require("@patternslib/patternslib/webpack/webpack.config");

module.exports = async (env, argv) => {
    let config = {
        entry: {
            "datagridfield.min": path.resolve(__dirname, "resources/datagridfield-config"),
        },
        externals: {
            "window": "window",
            "$": "jquery",
            "jquery": "jQuery",
            "window.jquery": "jQuery",
            "bootstrap": true,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    tinymce: {
                        name: "tinymce",
                        test: /[\\/]node_modules[\\/]tinymce.*[\\/]/,
                        chunks: "all",
                    },
                    select2: {
                        name: "select2",
                        test: /[\\/]node_modules[\\/]select2.*[\\/]/,
                        chunks: "all",
                    },
                },
            },
        },
    };

    config = patternslib_config(env, argv, config, ["mockup"]);
    config.output.path = path.resolve(__dirname, "src/collective/z3cform/datagridfield/static");

    if (process.env.NODE_ENV === "development") {
        config.devServer.port = "8011";
        config.devServer.static.directory = `${__dirname}/resources`;
    }

    return config;
};
