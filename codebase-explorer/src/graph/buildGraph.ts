import { FileNode } from "../parser/parseRepo";

export type GraphNode = {
  id: string;
};

export type GraphEdge = {
  from: string;
  to: string;
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export function buildDependencyGraph(files: FileNode[]): Graph {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = []; 

  files.forEach((file) => {
    nodes.push({ id: file.name });
  });

  files.forEach((file) => {
    file.imports.forEach((imp) => {
      edges.push({
        from: file.name,
        to: imp,
      });
    });
  });

  return { nodes, edges };
};
