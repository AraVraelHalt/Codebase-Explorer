import React, { useState } from 'react';
import { FileNode } from '../parser/parseRepo';
import SearchBar from './SearchBar';
import './Sidebar.css';

type Props = {
  files: FileNode[];
  weights: Record<string, number>;
  activeNodeId: string | null;
  setActiveNodeId: (id: string | null) => void;
  showMetrics: boolean;
};

type ExpandState = {
  functions: boolean;
  imports: boolean;
};

const getFileName = (path: string) => path.split('/').pop()!;

const Sidebar: React.FC<Props> = ({ files, weights, activeNodeId, setActiveNodeId, showMetrics }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, ExpandState>>({});

  const toggleSection = (fileId: string, section: keyof ExpandState) => {
    setExpanded((prev) => ({
      ...prev,
      [fileId]: {
        functions: prev[fileId]?.functions || false,
        imports: prev[fileId]?.imports || false,
        [section]: !prev[fileId]?.[section],
      },
    }));
  };

  return (
    <div className="sidebar-scroll" style={{ height: '100vh', overflowY: 'auto', padding: '1rem' }}>

      {files.length > 0 && (
        <>
          <h3>File Panel</h3>
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        </>
      )}

      {files
        .filter((file) =>
          getFileName(file.name).toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((file) => {
          const fileName = getFileName(file.name);
          const isActive = activeNodeId === file.name;
          const weight = weights[file.name] ?? 0;
          const fileState = expanded[file.name] || { functions: false, imports: false };

          return (

            <div key={file.name} style={{ marginBottom: '0.5rem' }}>
              <button
                className="file-button"
                onClick={() =>
                  setActiveNodeId(isActive ? null : file.name)
                }
                style={{
                  display: 'flex',
                  width: '100%',
                  backgroundColor: isActive ? '#333' : undefined,
                  padding: '0.5rem 1rem',
                }}
              >
                <span>{fileName}</span>

                {showMetrics && (
                  <span style={{ marginLeft: 'auto' }}>
                    {weight.toFixed(2)}
                  </span>
                )}
              </button>

              {isActive && (
                <div style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
                  {/* Functions */}
                  <div style={{ marginBottom: '0.5rem', textAlign: 'left' }}>
                    <div
                      onClick={() => toggleSection(file.name, 'functions')}
                      style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      {fileState.functions ? '▼' : '▶'} Functions ({file.functions.length})
                    </div>

                    {fileState.functions && (
                      <ul style={{ margin: '0.25rem 0 0 1rem', padding: 0 }}>
                        {file.functions.map((fn) => (
                          <li key={fn}>{fn}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Imports */}
                  <div style={{ textAlign: 'left' }}>
                    <div
                      onClick={() => toggleSection(file.name, 'imports')}
                      style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      {fileState.imports ? '▼' : '▶'} Imports ({file.imports.length})
                    </div>

                    {fileState.imports && (
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
          );
        })}
    </div>
  );
};

export default Sidebar;
