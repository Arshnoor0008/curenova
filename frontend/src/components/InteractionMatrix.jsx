import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export const InteractionMatrix = ({ drugs = [], matrixCells = [], onSelectPair }) => {
  const [selectedCell, setSelectedCell] = useState(null);

  if (!drugs || drugs.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
        Enter at least two medications to generate the pairwise interaction matrix.
      </div>
    );
  }

  const getCell = (row, col) => {
    return (
      matrixCells.find(
        (c) =>
          (c.drug_row === row && c.drug_col === col) ||
          (c.drug_row === col && c.drug_col === row)
      ) || { severity: 'None', has_interaction: false, summary: 'No direct conflict' }
    );
  };

  const getCellColor = (row, col) => {
    if (row === col) return 'bg-slate-100 text-slate-400 cursor-default';
    const cell = getCell(row, col);
    if (!cell.has_interaction) return 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700';
    if (cell.severity === 'High Risk') return 'bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold';
    if (cell.severity === 'Moderate Risk') return 'bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold';
    return 'bg-sky-100 hover:bg-sky-200 text-sky-800';
  };

  const handleCellClick = (row, col) => {
    if (row === col) return;
    const cell = getCell(row, col);
    setSelectedCell({ row, col, ...cell });
    if (onSelectPair) {
      onSelectPair(row, col, cell);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-700">Pairwise Interaction Heatmap</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-200 border border-rose-300"></span>
            <span className="text-slate-600">High Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-200 border border-amber-300"></span>
            <span className="text-slate-600">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-300"></span>
            <span className="text-slate-600">No Conflict</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-3 text-left font-semibold text-slate-500 w-32">Medication</th>
              {drugs.map((drug) => (
                <th
                  key={drug}
                  className="p-3 text-center font-semibold text-slate-700 border-l border-slate-200 min-w-24 truncate"
                  title={drug}
                >
                  {drug}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drugs.map((rowDrug) => (
              <tr key={rowDrug} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-800 bg-slate-50/70 border-r border-slate-200 truncate">
                  {rowDrug}
                </td>
                {drugs.map((colDrug) => {
                  const cell = getCell(rowDrug, colDrug);
                  const isSelf = rowDrug === colDrug;
                  return (
                    <td
                      key={colDrug}
                      onClick={() => handleCellClick(rowDrug, colDrug)}
                      className={`p-3 text-center border-r border-slate-200 last:border-0 transition-colors ${getCellColor(
                        rowDrug,
                        colDrug
                      )} ${!isSelf ? 'cursor-pointer' : ''}`}
                      title={isSelf ? 'Self' : `${rowDrug} + ${colDrug}: ${cell.severity}`}
                    >
                      {isSelf ? (
                        <span className="text-slate-300">—</span>
                      ) : cell.severity === 'High Risk' ? (
                        <div className="flex items-center justify-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          <span className="text-[11px] font-bold">HIGH</span>
                        </div>
                      ) : cell.severity === 'Moderate Risk' ? (
                        <div className="flex items-center justify-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-[11px] font-semibold">MOD</span>
                        </div>
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 mx-auto text-emerald-500" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCell && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-bold text-slate-800 text-sm">
              Interaction Detail: {selectedCell.row} ↔ {selectedCell.col}
            </h5>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                selectedCell.severity === 'High Risk'
                  ? 'bg-rose-100 text-rose-800'
                  : selectedCell.severity === 'Moderate Risk'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {selectedCell.severity}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{selectedCell.summary}</p>
        </div>
      )}
    </div>
  );
};

export default InteractionMatrix;
