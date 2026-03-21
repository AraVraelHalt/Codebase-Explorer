import React from "react";
import ReactFlow, { Background, Controls, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

type Props = {
  nodes: any[];
  edges: any[];
};

const Graph: React.FC<Props> = ({ nodes, edges }) => {
  // skip setRfNodes since not used
  const [rfNodes, , onNodesChange] = useNodesState(nodes);

  return (
    <div style={{ height: "500px", marginTop: "2rem" }}>
      <ReactFlow nodes={rfNodes} edges={edges} onNodesChange={onNodesChange}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;
