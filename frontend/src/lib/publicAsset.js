const publicBase = (process.env.PUBLIC_URL || "").replace(/\/$/, "");

export function publicAsset(path) {
  if (!path) return path;
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${publicBase}${normalizedPath}`;
}
