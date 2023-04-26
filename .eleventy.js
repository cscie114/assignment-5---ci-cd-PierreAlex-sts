const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "alerts",
		functionsDir: "./netlify/functions/",
	});
	eleventyConfig.addPassthroughCopy("src/assets/**");
	return {
		dir: {
			input: "src",
			output: "dist"
		}
	};
};
