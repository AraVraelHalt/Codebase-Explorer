import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Sidebar from './components/Sidebar';
import Graph from './components/Graph';
import { FileNode } from './parser/parseRepo';
import { useGraphData } from './hooks/useGraphData';
import './App.css';

function App() {
  const [parsedFiles, setParsedFiles] = useState<FileNode[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);

  const { graphData, weights, process } = useGraphData();

  const handleParsedFiles = (files: FileNode[]) => {
    setParsedFiles(files);
    process(files);
  };

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '300px', borderRight: '1px solid #333', padding: '1rem' }}>
        <Sidebar
          files={parsedFiles}
          weights={weights}
          activeNodeId={activeNodeId}
          setActiveNodeId={setActiveNodeId}
          showMetrics={showMetrics}
        />
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <h1>Codebase Explorer</h1>

        <FileUpload onParsed={handleParsedFiles} />

        {parsedFiles.length > 0 && (
          <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <button onClick={() => setShowMetrics(prev => !prev)}>
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
