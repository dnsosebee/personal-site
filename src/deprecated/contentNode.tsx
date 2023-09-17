import { MDXContent, MDXProps } from "mdx/types";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

export type ContentNodeProps = {
  title: string;
  urlComponent: string;
  // subNodes: any[];
  children: MDXContent;
};

type ZoomLevel = "s" | "m" | "l";

const d = dynamic(() => import("./danielSosebee.mdx"), {
  loading: () => <p>Loading...</p>,
});

type x = ComponentType<MDXProps>;

type Annotation = ComponentType<MDXProps>;

type VisibleTree<T extends ZoomLevel> = {
  title: string;
  url: string;
  zoomLevel: T;
} & (T extends "stub"
  ? {}
  : T extends "parent"
  ? {
      children: VisibleTree<ZoomLevel>[];
    }
  : T extends "full"
  ? {
      children: (Annotation | VisibleTree<ZoomLevel>)[];
    }
  : never);

type RFNode = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {};
};

export const ChildNode = ({ id }: { id: string }) => {
  return <div>{id}</div>;
};
