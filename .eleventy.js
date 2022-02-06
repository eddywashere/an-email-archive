const htmlmin = require("html-minifier");
const format = require("date-fns/format");

const now = String(Date.now());

function getFormattedDate(input) {
    const date = new Date(input);
    date.setHours(24);
    return format(date, "M/d/yyyy");
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./styles/tailwind.config.js");
    eleventyConfig.addWatchTarget("./styles/tailwind.css");
    eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
    // Filter source file names using a glob
    eleventyConfig.addCollection("archive", function (collectionApi) {
        return collectionApi
            .getFilteredByGlob("archive/*.html")
            .sort((a, b) => {
                return b.fileSlug.localeCompare(a.fileSlug);
            })
            .map((i) => {
                i.data.formattedDate = getFormattedDate(i.fileSlug.split("_")[0]);
                return i;
            });
    });

    eleventyConfig.addShortcode("version", function () {
        return now;
    });

    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (process.env.ELEVENTY_PRODUCTION && outputPath && outputPath.endsWith(".html")) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
            return minified;
        }

        return content;
    });

    eleventyConfig.addPassthroughCopy({
        "./node_modules/alpinejs/dist/cdn.js": "./js/alpine.js",
    });
};
