type Node = {
  id: string;
};

type Edge = {
  source: string;
  target: string;
};

export function calculateWeights(nodes: Node[], edges: Edge[]) {
  const weights: Record<string, number> = {};
  const incomingCount: Record<string, number> = {};
  const outgoingCount: Record<string, number> = {};

  nodes.forEach((node) => {
    weights[node.id] = 0;
    incomingCount[node.id] = 0;
    outgoingCount[node.id] = 0;
  });

  edges.forEach(({ source, target }) => {
    if (incomingCount[target] !== undefined) incomingCount[target]++;
    if (outgoingCount[source] !== undefined) outgoingCount[source]++;
  });

  nodes.forEach((node) => {
    weights[node.id] =
      incomingCount[node.id] + outgoingCount[node.id] * 0.3;
  });

  const maxWeight = Math.max(...Object.values(weights), 1);

  Object.keys(weights).forEach((key) => {
    weights[key] /= maxWeight;
  });

  return weights;
}
