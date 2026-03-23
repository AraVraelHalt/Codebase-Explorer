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
      const isOutgoing = edge.source === currentId;
      const isIncoming = edge.target === currentId;

      const type = isOutgoing
        ? 'outgoing'
        : isIncoming
        ? 'incoming'
        : 'default';

      const styles = {
        outgoing: {
          stroke: 'yellow',
          glow: 'yellow',
          width: 2,
          opacity: 1,
        },
        incoming: {
          stroke: '#4da6ff',
          glow: '#4da6ff',
          width: 2,
          opacity: 1,
        },
        default: {
          stroke: '#888',
          glow: '#888',
          width: 1,
          opacity: 0.4,
        },
      };

      const s = styles[type];

      return {
        ...edge,
        style: {
          stroke: s.stroke,
          strokeWidth: s.width,
          opacity: s.opacity,
          filter: `drop-shadow(0 0 6px ${s.glow})`,
        },
        markerEnd: {
          type: 'arrowclosed',
          color: s.stroke,
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
