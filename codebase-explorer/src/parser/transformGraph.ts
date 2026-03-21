import { Graph } from './buildGraph';

export function transformToReactFlow(graph: Graph) {
  const nodes = graph.nodes.map((node, index) => ({
    id: node.id,
    data: { label: node.id },
    position: { 
      x: (index % 5) * 200, 
      y: Math.floor(index / 5) * 200 
    },
  }));

  const nodeIds = new Set(graph.nodes.map(n => n.id));

  const resolveRelativePath = (from: string, to: string) => {
    if (!to.startsWith('./') && !to.startsWith('../')) return to;

    const fromParts = from.split('/').slice(0, -1); // parent folder
    const toParts = to.split('/');

    toParts.forEach(part => {
      if (part === '.') return;
      else if (part === '..') fromParts.pop();
      else fromParts.push(part);
    });

    return fromParts.join('/');
  };

  const edges = graph.edges
    .map((edge, index) => {
      let target = resolveRelativePath(edge.from, edge.to);

      // ext check
      if (!nodeIds.has(target)) {
        if (nodeIds.has(target + '.ts')) target += '.ts';
        else if (nodeIds.has(target + '.tsx')) target += '.tsx';
        else if (nodeIds.has(target + '.js')) target += '.js';
        else if (nodeIds.has(target + '.jsx')) target += '.jsx';
      }

      return { from: edge.from, to: target, index };
    })
    .filter(edge => nodeIds.has(edge.to))
    .map(edge => ({
      id: `${edge.from}-${edge.to}-${edge.index}`,
      source: edge.from,
      target: edge.to,
    }));

  return { nodes, edges };
};
