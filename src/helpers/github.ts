const buildGithubRawUrl = (baseUrl: string, path: string) => {
  return `https://raw.githubusercontent.com${
    new URL([baseUrl, path!.replace("./", "")].join("/")).pathname
  }`.replace("/tree/", "/refs/heads/");
};

export { buildGithubRawUrl };
