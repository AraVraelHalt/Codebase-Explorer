import React, { useState } from 'react';

import FileUpload from './components/FileUpload';
import Graph from './components/Graph';
import { buildDependencyGraph } from './parser/buildGraph';
import { transformToReactFlow } from './parser/transformGraph';
import { FileNode } from './parser/parseRepo';

import './App.css';

function App() {
  const [graphData, setGraphData] = useState<any> (null);

  const handleParsedFiles = (files: FileNode[]) => {
    const graph = buildDependencyGraph(files);
    const transformed = transformToReactFlow(graph);
    
    setGraphData(transformed);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1> Codebase Explorer</h1>
      <FileUpload onParsed={handleParsedFiles} />

      {graphData && (
        <Graph nodes={graphData.nodes} edges={graphData.edges} />
      )}
    </div>
  );
}

export default App;
