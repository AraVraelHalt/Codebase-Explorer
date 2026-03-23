import React, { useState } from 'react';

import FileUpload from './components/FileUpload';
import Sidebar from './components/Sidebar';
import Graph from './components/Graph';
import { buildDependencyGraph } from './parser/buildGraph';
import { transformToReactFlow } from './parser/transformGraph';
import { FileNode } from './parser/parseRepo';

import './App.css';
import './components/Sidebar.css'

function App() {
  const [graphData, setGraphData] = useState<any> (null);
  const [parsedFiles, setParsedFiles] = useState<FileNode[]> ([]);
  const [activeNodeId, setActiveNodeId] = useState<string | null> (null);

  const handleParsedFiles = (files: FileNode[]) => {
    setParsedFiles(files);

    const graph = buildDependencyGraph(files);
    const transformed = transformToReactFlow(graph);
    
    setGraphData(transformed);
  };

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "300px", borderRight: "1px solid #333", padding: "1rem" }}>
        <Sidebar 
        files={parsedFiles} 
        activeNodeId={activeNodeId}
        setActiveNodeId={setActiveNodeId}
        />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>Codebase Explorer</h1>
        <FileUpload onParsed={handleParsedFiles} />

        {graphData && (
          <Graph 
          nodes={graphData.nodes} 
          edges={graphData.edges}
          activeNodeId={activeNodeId}
          setActiveNodeId={setActiveNodeId}
          />
        )}
      </div>
    </div>
  );
}

export default App;
