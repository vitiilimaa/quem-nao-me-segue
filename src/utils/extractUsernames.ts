const extractUsernames = (htmlContent: string) => {
  const regex = /href=["'](https:\/\/www\.instagram\.com\/([^"'/]+)\/?)["']/g;
  const matches = [...htmlContent.matchAll(regex)];
  const usernames = matches.map((match) => match[2].toLowerCase());
  return Array.from(new Set(usernames));
};

export default extractUsernames;
