import React, { useState, useEffect, useRef } from 'react';
import {
  Share2,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  ExternalLink,
  Layers,
  Search,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { graphService } from '../services/api';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const TYPE_COLORS = {
  Drug: { bg: '#0284c7', text: '#ffffff', border: '#0369a1' },
  Disease: { bg: '#e11d48', text: '#ffffff', border: '#be123c' },
  Protein: { bg: '#0d9488', text: '#ffffff', border: '#0f766e' },
  Gene: { bg: '#8b5cf6', text: '#ffffff', border: '#7c3aed' },
  Pathway: { bg: '#f59e0b', text: '#ffffff', border: '#d97706' },
  Paper: { bg: '#64748b', text: '#ffffff', border: '#475569' },
  ClinicalTrial: { bg: '#3b82f6', text: '#ffffff', border: '#1d4ed8' },
  SafetySignal: { bg: '#dc2626', text: '#ffffff', border: '#991b1b' },
};

export const KnowledgeGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadGraph();
  }, [filterType]);

  const loadGraph = async () => {
    setLoading(true);
    try {
      const res = await graphService.getOverview(filterType !== 'all' ? filterType : null, 40);
      setGraphData(res);
      if (res.nodes.length > 0 && !selectedNode) {
        setSelectedNode(res.nodes[0]);
      }
    } catch (err) {
      console.error('Failed to load knowledge graph', err);
    } finally {
      setLoading(false);
    }
  };

  // Node position calculation in a radial layout
  const getNodeCoordinates = (nodes) => {
    const width = 800;
    const height = 550;
    const centerX = width / 2;
    const centerY = height / 2;

    return nodes.map((node, index) => {
      // Group by type for layered radial aesthetic
      const angle = (index / nodes.length) * 2 * Math.PI;
      let radius = 180;
      if (node.type === 'Disease') radius = 80;
      else if (node.type === 'Drug') radius = 150;
      else if (node.type === 'Protein' || node.type === 'Gene') radius = 230;
      else radius = 280;

      // Add deterministic jitter
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      return {
        ...node,
        x,
        y,
      };
    });
  };

  const positionedNodes = getNodeCoordinates(graphData.nodes);
  const nodeMap = new Map(positionedNodes.map((n) => [n.id, n]));

  // Connected edges for selected node
  const activeEdgeIds = new Set(
    graphData.edges
      .filter((e) => selectedNode && (e.source === selectedNode.id || e.target === selectedNode.id))
      .map((e) => e.id)
  );

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-teal-100 text-teal-700">
                <Share2 className="w-4 h-4" />
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Biomedical Knowledge Graph
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Interactive relationship network connecting Drugs, Diseases, Targets, Genes, Pathways, and Safety Alerts
            </p>
          </div>
          <SafetyDisclaimer variant="compact" />
        </div>

        {/* Toolbar & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter Node Entity:
            </span>
            {['all', 'Drug', 'Disease', 'Protein', 'Pathway', 'SafetySignal'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  filterType === type
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'All Entities' : type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 2.2))}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.6))}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setPanOffset({ x: 0, y: 0 });
              }}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Graph Canvas Container + Inspector Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* SVG Canvas */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs relative h-[600px] select-none">
            {loading ? (
              <div className="flex h-full items-center justify-center text-slate-400">
                Loading connected biological graph...
              </div>
            ) : (
              <svg
                className="w-full h-full cursor-grab active:cursor-grabbing"
                viewBox="0 0 800 550"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="4"
                    refX="14"
                    refY="2"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 2, 0 4" fill="#94a3b8" />
                  </marker>
                  <marker
                    id="arrowhead-active"
                    markerWidth="6"
                    markerHeight="4"
                    refX="14"
                    refY="2"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 2, 0 4" fill="#0284c7" />
                  </marker>
                </defs>

                <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}>
                  {/* Edges */}
                  {graphData.edges.map((edge) => {
                    const sourceNode = nodeMap.get(edge.source);
                    const targetNode = nodeMap.get(edge.target);
                    if (!sourceNode || !targetNode) return null;

                    const isHighlight = activeEdgeIds.has(edge.id);

                    return (
                      <g key={edge.id}>
                        <line
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke={isHighlight ? '#0284c7' : '#e2e8f0'}
                          strokeWidth={isHighlight ? 2.5 : 1.2}
                          strokeDasharray={edge.relationship.includes('WARNING') ? '4 2' : 'none'}
                          markerEnd={isHighlight ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                        />
                        {isHighlight && (
                          <text
                            x={(sourceNode.x + targetNode.x) / 2}
                            y={(sourceNode.y + targetNode.y) / 2 - 4}
                            fill="#0284c7"
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                            className="pointer-events-none select-none"
                          >
                            {edge.relationship}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {positionedNodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const colors = TYPE_COLORS[node.type] || { bg: '#64748b', text: '#fff' };

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNode(node);
                        }}
                        className="cursor-pointer group"
                      >
                        {/* Glow ring if selected */}
                        {isSelected && (
                          <circle r="22" fill="none" stroke="#0284c7" strokeWidth="3" opacity="0.4" />
                        )}
                        <circle
                          r="16"
                          fill={colors.bg}
                          stroke={isSelected ? '#0f172a' : colors.border}
                          strokeWidth={isSelected ? '2.5' : '1.5'}
                          className="transition-transform group-hover:scale-110"
                        />
                        <text
                          y="26"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="10"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          className="pointer-events-none select-none"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            )}

            {/* Canvas Legend */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200 text-[10px] space-y-1">
              <span className="font-bold text-slate-700 block uppercase tracking-wider text-[9px]">
                Entity Types:
              </span>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {Object.entries(TYPE_COLORS).slice(0, 6).map(([type, c]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.bg }} />
                    <span className="text-slate-600">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Node Inspector Side Panel */}
          <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: TYPE_COLORS[selectedNode.type]?.bg + '20',
                      color: TYPE_COLORS[selectedNode.type]?.bg,
                    }}
                  >
                    {selectedNode.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">ID: {selectedNode.id}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedNode.label}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedNode.category || 'Biomedical Entity'}</p>
                </div>

                {/* Specific Properties */}
                <div className="space-y-2 text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                    Ontological Properties:
                  </span>
                  {selectedNode.properties &&
                    Object.entries(selectedNode.properties).map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500 capitalize">{k.replace('_', ' ')}:</span>
                        <span className="font-semibold text-slate-800 font-mono">{String(v)}</span>
                      </div>
                    ))}
                </div>

                {/* Connected Relationships list */}
                <div className="space-y-2 pt-2">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                    Direct Network Edges:
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {graphData.edges
                      .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                      .map((e) => {
                        const isOutgoing = e.source === selectedNode.id;
                        const otherId = isOutgoing ? e.target : e.source;
                        const otherNode = nodeMap.get(otherId);

                        return (
                          <div
                            key={e.id}
                            className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                          >
                            <div className="flex items-center justify-between text-[11px] font-semibold">
                              <span className="text-sky-700">{e.relationship}</span>
                              <span className="text-slate-400">
                                {isOutgoing ? '→' : '←'} {otherNode?.label || otherId}
                              </span>
                            </div>
                            {e.evidence && <p className="text-[10px] text-slate-500 mt-1">{e.evidence}</p>}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                <Info className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs">Click any node on the graph to inspect biological connections and literature evidence.</p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
              Graph Engine: Neo4j Cypher compatible model with in-memory graph fallback.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
