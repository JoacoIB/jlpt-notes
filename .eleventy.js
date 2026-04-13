module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  const repository = process.env.GITHUB_REPOSITORY || "";
  const repositoryName = repository.split("/")[1] || "";
  const isUserSite = repositoryName.endsWith(".github.io");
  const pathPrefix = repositoryName && !isUserSite ? `/${repositoryName}/` : "/";

  return {
    pathPrefix,
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
