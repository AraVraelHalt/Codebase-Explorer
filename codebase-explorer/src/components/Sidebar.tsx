import React from "react";
import { FileNode } from "../parser/parseRepo";

type Props = {
  files: FileNode[];
  activeNodeId: string | null;
  setActiveNodeId: (id: string | null) => void;
};

const Sidebar: React.FC<Props> = ({ files, activeNodeId, setActiveNodeId }) => {

  return (
    <div>
      <h3>File Panel</h3>

      {/* File buttons */}
      {files.map((file) => (
        <div key={file.name} style={{ marginBottom: "0.5rem" }}>
        <button
          onClick={() => setActiveNodeId(activeNodeId === file.name ? null : file.name)}
          style={{ 
            display: 'block', 
            width: '100%',
            backgroundColor: activeNodeId === file.name ? '#333' : undefined,
          }}
        >
          {file.name}
        </button>

        {activeNodeId === file.name && (
          <div style={{ marginLeft: "1rem", marginTop: "0.25rem" }}>
            <p>Functions: {file.functions.join(", ")}</p>
            <p>Imports: {file.imports.join(", ")}</p>
          </div>
        )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
