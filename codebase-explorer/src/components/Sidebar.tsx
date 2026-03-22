import React, { useState } from "react";
import { FileNode } from "../parser/parseRepo";

type Props = {
  files: FileNode[];
};

const Sidebar: React.FC<Props> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  return (
    <div>
      <h3>File Panel</h3>

      {/* File buttons */}
      {files.map((file) => (
        <div key={file.name} style={{ marginBottom: "0.5rem" }}>
        <button
          onClick={() => setSelectedFile(selectedFile?.name === file.name ? null : file)}
          style={{ 
            display: 'block', 
            width: '100%',
          }}
        >
          {file.name}
        </button>

        {selectedFile?.name === file.name && (
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
