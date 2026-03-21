import { Graph } from './buildGraph';
import dagre from 'dagre';

export function transformToReactFlow(graph: Graph) {
  const NODE_WIDTH = 180;
  const NODE_HEIGHT = 60;

  // map node IDs
  const nodeIds = new Set(graph.nodes.map(n => n.id));

  // resolve relative imports in browser
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

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB' }); // top-to-bottom

  graph.nodes.forEach((node) =>
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
  );

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

  dagre.layout(dagreGraph);

  const nodes = graph.nodes.map((node) => {
    const pos = dagreGraph.node(node.id);
    
    return {
      id: node.id,
      data: { label: node.id },
      position: {
        x: pos.x - NODE_WIDTH / 2,
        y: pos.y - NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes, edges };
}
