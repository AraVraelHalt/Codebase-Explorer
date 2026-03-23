import React, { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, useNodesState, useEdgesState} from "reactflow";
import "reactflow/dist/style.css";

type Props = {
  nodes: any[];
  edges: any[];
};

const Graph: React.FC<Props> = ({ nodes, edges }) => {
  const [rfNodes, , onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  // Update edge ? active node changes
  useEffect(() => {
    const updatedEdges = edges.map((edge) => {
      const isConnected =
        edge.source === activeNodeId || edge.target === activeNodeId;

      return {
        ...edge,
        style: isConnected
          ? {
              stroke: 'yellow',
              strokeWidth: 2,
              filter: 'drop-shadow(0 0 6px yellow)',
            }
          : {
              stroke: '#888',
              strokeWidth: 1,
            },
      };
    });

    setRfEdges(updatedEdges);
  }, [activeNodeId, edges, setRfEdges]);

  return (
    <div style={{ height: '500px', marginTop: '2rem' }}>
      <ReactFlow 
      nodes={rfNodes} 
      edges={rfEdges} 
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={(_, node) => setActiveNodeId(node.id)}
      onNodeDragStart={(_, node) => setActiveNodeId(node.id)}
      onPaneClick={() => setActiveNodeId(null)} // resest
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;
