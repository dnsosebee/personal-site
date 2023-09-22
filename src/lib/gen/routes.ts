export const routes = [
  {
    pathname: "/",
    slug: [],
    metadata: { title: "Daniel Sosebee's Website" },
    links: [["projects"]],
  },
  { pathname: "/projects", slug: ["projects"], metadata: { title: "Projects" }, links: [] },
  {
    pathname: "/projects/digital-abacus",
    slug: ["projects", "digital-abacus"],
    metadata: { title: "The Digital Abacus" },
    links: [],
  },
  {
    pathname: "/skills-and-interests",
    slug: ["skills-and-interests"],
    metadata: { title: "Skills and Interests" },
    links: [],
  },
];
