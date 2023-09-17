export const Article = ({ children }: { children: React.ReactNode }) => {
  return <article className="prose dark:prose-invert max-w-none">{children}</article>;
};
