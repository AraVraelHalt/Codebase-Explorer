import React, { useState } from 'react';

import { FileNode } from '../parser/parseRepo';
import SearchBar from './SearchBar';

import './Sidebar.css';

type Props = {
  files: FileNode[];
  activeNodeId: string | null;
  setActiveNodeId: (id: string | null) => void;
};

const Sidebar: React.FC<Props> = ({ files, activeNodeId, setActiveNodeId }) => {
  const [showFunctions, setShowFunctions] = useState(false);
  const [showImports, setShowImports] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string> ("");

  return (
    <div className='sidebar-scroll' style={{height: '100vh', overflowY: 'auto', padding: '1rem'}}>
      <h3>File Panel</h3>

      {/* Search bar */}
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      {/* File buttons */}
      {files
        .filter(file => file.name.split('/').pop()!.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((file) => (
        <div key={file.name} style={{ marginBottom: '0.5rem' }}>
        <button
          className='file-button'
          onClick={() => setActiveNodeId(activeNodeId === file.name ? null : file.name)}
          style={{ 
            display: 'block', 
            width: '100%',
            backgroundColor: activeNodeId === file.name ? '#333' : undefined,
          }}
        >
          {file.name.split('/').pop()}
        </button>

        {activeNodeId === file.name && (
          <div style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>

            <div style={{ marginBottom: '0.5rem', textAlign: 'left' }}>
              <div
                onClick={() => setShowFunctions(!showFunctions)}
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
              >
                {showFunctions ? '▼' : '▶'} Functions ({file.functions.length})
              </div>

              {showFunctions && (
                <ul style={{ margin: '0.25rem 0 0 1rem', padding: 0 }}>
                  {file.functions.map((fn) => (
                    <li key={fn}>{fn}</li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ textAlign: 'left' }}>
              <div
                onClick={() => setShowImports(!showImports)}
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
              >
                {showImports ? '▼' : '▶'} Imports ({file.imports.length})
              </div>

              {showImports && (
                <ul style={{ margin: '0.25rem 0 0 1rem', padding: 0 }}>
                  {file.imports.map((imp) => (
                    <li key={imp}>{imp}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
