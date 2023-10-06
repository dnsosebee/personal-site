export const pn = (slug: string[]) => {
  const pathname = `/${slug.join("/")}`;
  return pathname;
};
