type Edge = {
  source: string;
  target: string;
};

type Node = {
  id: string;
};

export function calculateWeights(nodes: Node[], edges: Edge[]) {
  const weights: Record<string, number> = {};

  nodes.forEach((node) => {
    weights[node.id] = 0;
  });

  nodes.forEach((node) => {
    const incoming = edges.filter(e => e.target === node.id).length;
    const outgoing = edges.filter(e => e.source === node.id).length;

    weights[node.id] = incoming + (outgoing * 0.3);
  });

  const maxWeight = Math.max(...Object.values(weights), 1);

  Object.keys(weights).forEach((key) => {
    weights[key] = weights[key] / maxWeight;
  });

  return weights;
}
