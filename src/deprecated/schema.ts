type ContentNodeId = string;

export type BaseContentNode = {
  id: ContentNodeId;
  metadata: { title: string };
  isFolder: boolean;
};

export type ContentFolder = BaseContentNode & {
  isFolder: true;
  children: ContentNode[];
};

export type ContentPage = BaseContentNode & {
  isFolder: false;
  // outgoingRelations: ContentNodeId[];
  // default: MDXContent;
};

export type ContentNode = ContentFolder | ContentPage;

// export type ContentColumn = ContentFolder[];

// export type ContentCollection = ContentColumn[];

// export const content = {
//   id: "",
//   metadata: { title: "Daniel Sosebee's Website" },
//   isFolder: true,
//   children: [
//     {
//       id: "skills-and-interests",
//       metadata: { title: "Skills and Interests" },
// }
// }
