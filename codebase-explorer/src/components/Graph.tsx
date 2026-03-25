import React, { useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

type Props = {
  nodes: Node[];
  edges: Edge[];
  activeNodeId: string | null;
};

const edgeStyles = {
  outgoing: { stroke: 'yellow', glow: 'yellow', width: 2, opacity: 1 },
  incoming: { stroke: '#4da6ff', glow: '#4da6ff', width: 2, opacity: 1 },
  default: { stroke: '#888', glow: '#888', width: 1, opacity: 0.4 },
};

const Graph: React.FC<Props> = ({ nodes, edges, activeNodeId }) => {
  const [rfNodes, , onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);

  useEffect(() => {
    const currentId = highlightedNodeId || activeNodeId;

    const updatedEdges = edges.map((edge) => {
      const styleType =
        edge.source === currentId
          ? 'outgoing'
          : edge.target === currentId
          ? 'incoming'
          : 'default';

      const s = edgeStyles[styleType];

      return {
        ...edge,
        style: {
          stroke: s.stroke,
          strokeWidth: s.width,
          opacity: s.opacity,
          filter: `drop-shadow(0 0 6px ${s.glow})`,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: s.stroke,
        },
      };
    });

    setRfEdges(updatedEdges);
  }, [highlightedNodeId, activeNodeId, edges, setRfEdges]);

  return (
    <div style={{ height: 500, marginTop: '2rem' }}>
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => setHighlightedNodeId(node.id)}
        onNodeDragStart={(_, node) => setHighlightedNodeId(node.id)}
        onPaneClick={() => setHighlightedNodeId(null)}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;
