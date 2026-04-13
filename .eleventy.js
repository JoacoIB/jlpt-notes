module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addFilter("furigana", (value) => {
    if (typeof value !== "string") {
      return value;
    }

    return value.replace(/\{([^{}|]+)\|([^{}]+)\}/g, "<ruby>$1<rt>$2</rt></ruby>");
  });
  eleventyConfig.addFilter("hasFurigana", (value) => (
    typeof value === "string" && /\{[^{}|]+\|[^{}]+\}/.test(value)
  ));
  eleventyConfig.addFilter("sectionTone", (value) => {
    if (typeof value !== "string") {
      return "default";
    }

    const normalized = value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

    if (normalized.startsWith("uso")) {
      return "uso";
    }

    if (normalized.startsWith("ejemplo")) {
      return "ejemplo";
    }

    if (normalized.startsWith("atencion")) {
      return "atencion";
    }

    if (normalized.startsWith("errores comunes")) {
      return "errores";
    }

    return "default";
  });
  eleventyConfig.addFilter("inlineFormat", (value) => {
    if (typeof value !== "string") {
      return value;
    }

    return value
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/~~([^~]+)~~/g, "<del>$1</del>")
      .replace(/--([^\n]+?)--/g, "<del>$1</del>");
  });

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
