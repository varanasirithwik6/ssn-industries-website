import { useState } from 'react';
import { calculateTmtWeight, calculatePipeWeight, calculateBeamWeight } from '@/utils/calculators';

export default function SteelCalculator({ isWidget = false }: { isWidget?: boolean }) {
  const [steelType, setSteelType] = useState<'tmt' | 'pipe' | 'ibeam'>('tmt');
  const [diameter, setDiameter] = useState(12); // mm
  const [length, setLength] = useState(12); // meters
  const [pipeOdt, setPipeOdt] = useState(60); // outer diameter in mm
  const [pipeThk, setPipeThk] = useState(3.2); // thickness in mm
  const [ibeamWeight, setIbeamWeight] = useState(11.5); // kg/m standard selection

  const tmtWeight = calculateTmtWeight(diameter, length);
  const pipeWeight = calculatePipeWeight(pipeOdt, pipeThk, length);
  const beamWeight = calculateBeamWeight(ibeamWeight, length);

  const displayedWeight =
    steelType === 'tmt' ? tmtWeight : steelType === 'pipe' ? pipeWeight : beamWeight;

  return (
    <div className={isWidget ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 lg:grid-cols-3 gap-8"}>
      {/* Parameter Inputs */}
      <div className={isWidget ? "p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-md space-y-4 shadow-sm" : "lg:col-span-2 ent-card space-y-6"}>
        <div>
          <span className="ent-label block mb-2">Steel Profile Type</span>
          <div className={isWidget ? "grid grid-cols-3 gap-1" : "grid grid-cols-1 sm:grid-cols-3 gap-2"} role="group" aria-label="Steel Profile Type Selection">
            {(['tmt', 'pipe', 'ibeam'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSteelType(type)}
                aria-pressed={steelType === type}
                className={`py-2 px-1 border text-[10px] sm:text-xs font-bold uppercase rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 ${
                  steelType === type
                    ? 'bg-brand-slate text-brand-amber border-brand-slate dark:bg-brand-amber dark:text-brand-slate'
                    : 'bg-white border-brand-charcoal/15 text-brand-charcoal hover:bg-brand-ice dark:bg-slate-900 dark:border-white/5'
                }`}
              >
                {type === 'tmt' ? 'TMT Bar' : type === 'pipe' ? 'Pipe' : 'I-Beam'}
              </button>
            ))}
          </div>
        </div>

        {steelType === 'tmt' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tmt-diameter" className="ent-label block mb-1">Diameter (mm)</label>
              <select
                id="tmt-diameter"
                value={diameter}
                onChange={(e) => setDiameter(parseInt(e.target.value))}
                className="ent-input"
              >
                {[8, 10, 12, 16, 20, 25, 32].map((d) => (
                  <option key={d} value={d}>{d} mm</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tmt-length" className="ent-label block mb-1">Length (meters)</label>
              <input
                id="tmt-length"
                type="number"
                value={length}
                onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 0))}
                className="ent-input"
              />
            </div>
          </div>
        )}

        {steelType === 'pipe' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="pipe-diameter" className="ent-label block mb-1">Outer Diameter (mm)</label>
              <input
                id="pipe-diameter"
                type="number"
                value={pipeOdt}
                onChange={(e) => setPipeOdt(Math.max(1, parseFloat(e.target.value) || 0))}
                className="ent-input"
              />
            </div>
            <div>
              <label htmlFor="pipe-thickness" className="ent-label block mb-1">Wall Thickness (mm)</label>
              <input
                id="pipe-thickness"
                type="number"
                step="0.1"
                value={pipeThk}
                onChange={(e) => setPipeThk(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="ent-input"
              />
            </div>
            <div>
              <label htmlFor="pipe-length" className="ent-label block mb-1">Length (meters)</label>
              <input
                id="pipe-length"
                type="number"
                value={length}
                onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 0))}
                className="ent-input"
              />
            </div>
          </div>
        )}

        {steelType === 'ibeam' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ibeam-weight" className="ent-label block mb-1">Standard Section Weight (kg/m)</label>
              <select
                id="ibeam-weight"
                value={ibeamWeight}
                onChange={(e) => setIbeamWeight(parseFloat(e.target.value))}
                className="ent-input"
              >
                <option value="11.5">ISMB 116 (11.5 kg/m)</option>
                <option value="20.4">ISMB 150 (20.4 kg/m)</option>
                <option value="37.3">ISMB 250 (37.3 kg/m)</option>
                <option value="52.4">ISMB 350 (52.4 kg/m)</option>
              </select>
            </div>
            <div>
              <label htmlFor="ibeam-length" className="ent-label block mb-1">Length (meters)</label>
              <input
                id="ibeam-length"
                type="number"
                value={length}
                onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 0))}
                className="ent-input"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Panel */}
      <div className={isWidget ? "p-4 bg-brand-slate text-white border border-white/5 rounded-md flex flex-col justify-between" : "ent-card bg-brand-slate text-white p-6 flex flex-col justify-between border border-white/5 dark:bg-brand-slate"}>
        <div className="space-y-4">
          <div>
            <span className="text-[10px] text-gray-300 block uppercase tracking-wider font-semibold">Theoretical Total Weight</span>
            <span className={isWidget ? "font-outfit text-3xl font-extrabold text-brand-amber block mt-1" : "font-outfit text-4xl font-extrabold text-brand-amber block mt-1"}>
              {displayedWeight.toFixed(2)} kg
            </span>
          </div>
          <div className="border-t border-white/10 pt-3 space-y-1.5 text-[10px] text-gray-400">
            <p>• Derived based on standard carbon-steel density parameters of 7,850 kg/m³.</p>
            <p>• Structural margins assume standard atmospheric temperature calculations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
