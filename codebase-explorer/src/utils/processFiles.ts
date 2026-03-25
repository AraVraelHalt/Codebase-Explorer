import { FileNode } from '../parser/parseRepo';
import { buildDependencyGraph } from '../graph/buildGraph';
import { transformToReactFlow } from '../graph/transformGraph';
import { calculateWeights } from './metrics';

export function processFiles(files: FileNode[]) {
  const graph = buildDependencyGraph(files);
  const transformed = transformToReactFlow(graph);
  const weights = calculateWeights(transformed.nodes, transformed.edges);

  return { graphData: transformed, weights };
}
