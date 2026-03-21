import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

type Props = {
  nodes: any[];
  edges: any[];
};

const Graph: React.FC<Props> = ({ nodes, edges }) => {
  return (
    <div style={{ height: "500px", marginTop: "2rem" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;
