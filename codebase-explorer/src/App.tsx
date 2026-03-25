import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Sidebar from './components/Sidebar';
import Graph from './components/Graph';
import { buildDependencyGraph } from './graph/buildGraph';
import { transformToReactFlow } from './graph/transformGraph';
import { FileNode } from './parser/parseRepo';
import { calculateWeights } from './utils/metrics';
import './App.css';

function App() {
  const [graphData, setGraphData] = useState<any>(null);
  const [parsedFiles, setParsedFiles] = useState<FileNode[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [showMetrics, setShowMetrics] = useState(false);

  const handleParsedFiles = (files: FileNode[]) => {
    setParsedFiles(files);

    const graph = buildDependencyGraph(files);
    const transformed = transformToReactFlow(graph);
    const newWeights = calculateWeights(transformed.nodes, transformed.edges);

    setGraphData(transformed);
    setWeights(newWeights);
  };

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "300px", borderRight: "1px solid #333", padding: "1rem" }}>
        <Sidebar 
        files={parsedFiles}
        weights={weights}
        activeNodeId={activeNodeId}
        setActiveNodeId={setActiveNodeId}
        showMetrics={showMetrics}
        />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>Codebase Explorer</h1>
        <FileUpload onParsed={handleParsedFiles} />

        {parsedFiles.length > 0 && (  
          <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <button onClick={() => setShowMetrics(!showMetrics)}>
              {showMetrics ? 'Hide Metrics' : 'Show Metrics'}
            </button>
          </div>
        )}

        {graphData && (
          <Graph 
          nodes={graphData.nodes} 
          edges={graphData.edges}
          activeNodeId={activeNodeId}
          />
        )}
      </div>
    </div>
  );
}

export default App;
