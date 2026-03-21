import { Graph } from './buildGraph';

export function transformToReactFlow(graph: Graph) {
  const nodes = graph.nodes.map((node, index) => ({
    id: node.id,
    data: { label: node.id },
    position: {
      x: Math.random() * 400,
      y: Math.random() * 400,
    },
  }));

  const edges = graph.edges.map((edge, index) => ({
    id: `${edge.from}-${edge.to}-${index}`,
    source: edge.from,
    target: edge.to,
  }));

  return { nodes, edges };
};
