import React, { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, useNodesState, useEdgesState} from "reactflow";
import "reactflow/dist/style.css";

type Props = {
  nodes: any[];
  edges: any[];
  activeNodeId: string | null;
  setActiveNodeId: (id: string | null) => void;
};

const Graph: React.FC<Props> = ({ nodes, edges, activeNodeId, setActiveNodeId }) => {
  const [rfNodes, , onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null> (null);

  // Update edge ? active node changes
  useEffect(() => {
    const currentId = highlightedNodeId || activeNodeId;

    const updatedEdges = edges.map((edge) => {
      const isConnected =
        edge.source === currentId || edge.target === currentId;

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
        markerEnd: {
          type: 'arrowclosed',
          color: isConnected ? 'yellow' : '#888',
        },
      };
    });

    setRfEdges(updatedEdges);
  }, [highlightedNodeId, activeNodeId, edges, setRfEdges]);

  return (
    <div style={{ height: '500px', marginTop: '2rem' }}>
      <ReactFlow 
      nodes={rfNodes} 
      edges={rfEdges} 
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={(_, node) => setHighlightedNodeId(node.id)}
      onNodeDragStart={(_, node) => setHighlightedNodeId(node.id)}
      onPaneClick={() => setHighlightedNodeId(null)} // resest
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;
