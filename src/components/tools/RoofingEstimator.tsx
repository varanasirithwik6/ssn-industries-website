import { useState } from 'react';

export default function RoofingEstimator({ isWidget = false }: { isWidget?: boolean }) {
  const [roofLength, setRoofLength] = useState(30); // feet
  const [roofWidth, setRoofWidth] = useState(20); // feet
  const [sheetLength, setSheetLength] = useState(10); // feet
  const [overlap, setOverlap] = useState(0.5); // feet (6 inches)

  // Standard effective width of a profile roofing sheet in India is 3 feet (36 inches)
  const sheetWidthEffective = 3.0; 

  // Calculate sheets needed along width
  const sheetsAlongWidth = Math.ceil(roofWidth / sheetWidthEffective);
  // Calculate sheets needed along length (taking overlap into account)
  const sheetsAlongLength = Math.ceil(roofLength / (sheetLength - overlap));
  const totalSheetsNeeded = sheetsAlongWidth * sheetsAlongLength;
  const totalArea = roofLength * roofWidth;

  return (
    <div className={isWidget ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 lg:grid-cols-3 gap-8"}>
      {/* Parameter Inputs */}
      <div className={isWidget ? "p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-md space-y-4 shadow-sm" : "lg:col-span-2 ent-card space-y-6"}>
        <div className={isWidget ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
          <div>
            <label htmlFor="roof-length" className="ent-label block mb-1">Roof Length (ft)</label>
            <input
              id="roof-length"
              type="number"
              value={roofLength}
              onChange={(e) => setRoofLength(Math.max(1, parseFloat(e.target.value) || 0))}
              className="ent-input"
            />
          </div>
          <div>
            <label htmlFor="roof-width" className="ent-label block mb-1">Roof Width (ft)</label>
            <input
              id="roof-width"
              type="number"
              value={roofWidth}
              onChange={(e) => setRoofWidth(Math.max(1, parseFloat(e.target.value) || 0))}
              className="ent-input"
            />
          </div>
        </div>

        <div className={isWidget ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
          <div>
            <label htmlFor="sheet-length" className="ent-label block mb-1">Sheet Length (ft)</label>
            <select
              id="sheet-length"
              value={sheetLength}
              onChange={(e) => setSheetLength(parseFloat(e.target.value))}
              className="ent-input"
            >
              <option value="8">8 ft (Standard)</option>
              <option value="10">10 ft (Recommended)</option>
              <option value="12">12 ft</option>
              <option value="14">14 ft</option>
              <option value="16">16 ft</option>
              <option value="18">18 ft</option>
              <option value="20">20 ft</option>
            </select>
          </div>
          <div>
            <label htmlFor="sheet-overlap" className="ent-label block mb-1">Overlap Margin</label>
            <select
              id="sheet-overlap"
              value={overlap}
              onChange={(e) => setOverlap(parseFloat(e.target.value))}
              className="ent-input"
            >
              <option value="0.5">6 in (0.5 ft)</option>
              <option value="0.75">9 in (0.75 ft)</option>
              <option value="1.0">12 in (1.0 ft)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className={isWidget ? "p-4 bg-brand-slate text-white border border-white/5 rounded-md flex flex-col justify-between" : "ent-card bg-brand-slate text-white p-6 flex flex-col justify-between border border-white/5 dark:bg-brand-slate"}>
        <div className="space-y-4">
          <div>
            <span className="text-[10px] text-gray-300 block uppercase tracking-wider font-semibold">Estimated Material Required</span>
            <span className={isWidget ? "font-outfit text-3xl font-extrabold text-brand-amber block mt-1" : "font-outfit text-4xl font-extrabold text-brand-amber block mt-1"}>
              {totalSheetsNeeded} Sheets
            </span>
            <p className="text-[9px] text-gray-400 mt-1">Based on {sheetLength}ft long sheets with 3ft effective width</p>
          </div>
          <div className="border-t border-white/10 pt-3 space-y-1.5 text-[10px] text-gray-400">
            <p>• <strong>Total Roof Area:</strong> {totalArea} sq.ft.</p>
            <p>• <strong>Sheets along Width:</strong> {sheetsAlongWidth} rows</p>
            <p>• <strong>Sheets along Length:</strong> {sheetsAlongLength} columns</p>
            <p>• Effective sheet length after overlap is {sheetLength - overlap} ft.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
