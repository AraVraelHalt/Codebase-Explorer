import { useState } from 'react';
import { Node, Edge } from 'reactflow';
import { FileNode } from '../parser/parseRepo';
import { processFiles } from '../utils/processFiles';

type GraphData = {
  nodes: Node[];
  edges: Edge[];
};

export function useGraphData() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [weights, setWeights] = useState<Record<string, number>>({});

  const process = (files: FileNode[]) => {
    const { graphData, weights } = processFiles(files);
    setGraphData(graphData);
    setWeights(weights);
  };

  return { graphData, weights, process };
}
