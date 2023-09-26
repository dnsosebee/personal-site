export type Slug = string[];

export type Route = {
  isIndex: boolean;
  pathname: string;
  slug: Slug; // same as above
  metadata: any;
  links: Slug[];
};
