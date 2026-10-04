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
  AlertTriangle,
  Compass,
  ArrowRight
} from 'lucide-react';
import { graphService } from '../services/api';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const TYPE_COLORS = {
  Drug: { bg: '#0284c7', text: '#ffffff', border: '#0369a1' },
  Disease: { bg: '#e11d48', text: '#ffffff', border: '#be123c' },
  Protein: { bg: '#0d9488', text: '#ffffff', border: '#0f766e' },
  Gene: { bg: '#8b5cf6', text: '#ffffff', border: '#7c3aed' },
  Pathway: { bg: '#d97706', text: '#ffffff', border: '#b45309' },
  Paper: { bg: '#64748b', text: '#ffffff', border: '#475569' },
  ClinicalTrial: { bg: '#2563eb', text: '#ffffff', border: '#1d4ed8' },
  SafetySignal: { bg: '#dc2626', text: '#ffffff', border: '#991b1b' },
};

export const KnowledgeGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
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
      const angle = (index / nodes.length) * 2 * Math.PI;
      let radius = 180;
      if (node.type === 'Disease') radius = 80;
      else if (node.type === 'Drug') radius = 150;
      else if (node.type === 'Protein' || node.type === 'Gene') radius = 230;
      else radius = 280;

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-[#0284c7]">
              <Share2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Biomedical Knowledge Graph
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
            Interactive multi-relational network connecting Drugs, Diseases, Targets, Genes, Pathways, and Safety Alerts
          </p>
        </div>
        <SafetyDisclaimer variant="compact" />
      </div>

      {/* Toolbar & Filter Bar */}
      <Card elevation="flat" className="p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-[var(--color-text-muted)] flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Entity Filter:
          </span>
          {['all', 'Drug', 'Disease', 'Protein', 'Pathway', 'SafetySignal'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-[#0284c7] text-white shadow-2xs'
                  : 'bg-[var(--color-surface-sunken)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)]'
              }`}
            >
              {type === 'all' ? 'All Entities' : type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="secondary"
            size="sm"
            icon={ZoomIn}
            onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 2.2))}
            title="Zoom In"
          />
          <Button
            variant="secondary"
            size="sm"
            icon={ZoomOut}
            onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.6))}
            title="Zoom Out"
          />
          <Button
            variant="secondary"
            size="sm"
            icon={RotateCcw}
            onClick={() => {
              setZoomLevel(1);
              setPanOffset({ x: 0, y: 0 });
            }}
            title="Reset Pan & Zoom"
          />
        </div>
      </Card>

      {/* Graph Canvas Container + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Canvas with Minimap */}
        <div className="lg:col-span-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] overflow-hidden shadow-xs relative h-[600px] select-none">
          {loading ? (
            <div className="flex h-full items-center justify-center text-xs text-[var(--color-text-muted)]">
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
                        stroke={isHighlight ? '#0284c7' : 'var(--color-border-strong)'}
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
                          className="pointer-events-none select-none font-mono"
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
                        stroke={isSelected ? '#0284c7' : colors.border}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        className="transition-transform group-hover:scale-110"
                      />
                      <text
                        y="26"
                        textAnchor="middle"
                        fill="var(--color-text-primary)"
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

          {/* Minimap Thumbnail */}
          <div className="absolute top-3 right-3 w-28 h-20 bg-[var(--color-surface-card)]/90 backdrop-blur-xs border border-[var(--color-border-subtle)] rounded-lg p-1 shadow-md pointer-events-none hidden sm:block">
            <div className="relative w-full h-full bg-[var(--color-surface-sunken)] rounded overflow-hidden">
              {positionedNodes.map((n) => (
                <div
                  key={n.id}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    left: `${(n.x / 800) * 100}%`,
                    top: `${(n.y / 550) * 100}%`,
                    backgroundColor: TYPE_COLORS[n.type]?.bg || '#64748b'
                  }}
                />
              ))}
              <div
                className="absolute border border-[#0284c7] bg-[#0284c7]/20"
                style={{
                  left: '25%',
                  top: '25%',
                  width: '50%',
                  height: '50%'
                }}
              />
            </div>
            <span className="text-[9px] font-mono text-[var(--color-text-muted)] text-center block mt-0.5">
              Minimap
            </span>
          </div>

          {/* Canvas Legend */}
          <div className="absolute bottom-3 left-3 bg-[var(--color-surface-card)]/95 backdrop-blur-xs p-3 rounded-xl border border-[var(--color-border-subtle)] text-[10px] space-y-1 shadow-xs">
            <span className="font-mono font-bold text-[var(--color-text-muted)] block uppercase tracking-wider text-[9px]">
              Entity Categories:
            </span>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-medium">
              {Object.entries(TYPE_COLORS).slice(0, 6).map(([type, c]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.bg }} />
                  <span className="text-[var(--color-text-secondary)]">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Node Inspector Drawer */}
        <div className="lg:col-span-1">
          <Card elevation="raised" className="p-5 h-[600px] flex flex-col justify-between overflow-y-auto">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: TYPE_COLORS[selectedNode.type]?.bg + '20',
                      color: TYPE_COLORS[selectedNode.type]?.bg,
                    }}
                  >
                    {selectedNode.type}
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-mono">ID: {selectedNode.id}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[var(--color-text-primary)]">{selectedNode.label}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5 font-mono">{selectedNode.category || 'Biomedical Entity'}</p>
                </div>

                {/* Specific Properties */}
                <div className="space-y-2 text-xs">
                  <span className="text-[var(--color-text-muted)] font-mono font-bold uppercase tracking-wider text-[10px] block">
                    Ontological Properties:
                  </span>
                  {selectedNode.properties &&
                    Object.entries(selectedNode.properties).map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1 border-b border-[var(--color-border-subtle)]">
                        <span className="text-[var(--color-text-muted)] capitalize">{k.replace('_', ' ')}:</span>
                        <span className="font-semibold text-[var(--color-text-primary)] font-mono">{String(v)}</span>
                      </div>
                    ))}
                </div>

                {/* Connected Relationships list */}
                <div className="space-y-2 pt-2">
                  <span className="text-[var(--color-text-muted)] font-mono font-bold uppercase tracking-wider text-[10px] block">
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
                            className="p-2 rounded-lg bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] text-xs space-y-0.5"
                          >
                            <div className="flex items-center justify-between text-[11px] font-semibold">
                              <span className="text-[#0284c7] font-mono">{e.relationship}</span>
                              <span className="text-[var(--color-text-muted)]">
                                {isOutgoing ? '→' : '←'} {otherNode?.label || otherId}
                              </span>
                            </div>
                            {e.evidence && <p className="text-[10px] text-[var(--color-text-secondary)]">{e.evidence}</p>}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-[var(--color-text-muted)]">
                <Info className="w-8 h-8 mx-auto text-[var(--color-border-strong)] mb-2" />
                <p className="text-xs">Click any node on the graph to inspect biological connections and literature evidence.</p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] text-[10px] text-[var(--color-text-muted)] font-mono">
              Graph Engine: Neo4j Cypher compatible model with in-memory graph fallback.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
