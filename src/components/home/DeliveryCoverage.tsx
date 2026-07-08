"use client";

import { motion } from 'framer-motion';
import { MapPin, Truck, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

interface Region {
  name: string;
  type: 'Primary' | 'Daily Logistics' | 'Border Zone' | 'Extended Support';
  districts: string[];
  description: string;
}

const COVERAGE_REGIONS: Region[] = [
  {
    name: "Srikakulam",
    type: "Primary",
    districts: ["Palasa", "Tekkali", "Rajam", "Srikakulam City"],
    description: "Daily localized logistical runs with direct mill transit times of under 12-24 hours."
  },
  {
    name: "Vizianagaram",
    type: "Primary",
    districts: ["Salur", "Bobbili", "Vizianagaram City"],
    description: "Hub deliveries and contractor site distribution managing high tonnage reinforcement steel."
  },
  {
    name: "Parvathipuram Manyam",
    type: "Primary",
    districts: ["Parvathipuram", "Kurupam", "Palakonda", "Veeraghattam Corridor"],
    description: "Direct local transit pipeline managing rapid structural construction supply cycles."
  },
  {
    name: "Visakhapatnam",
    type: "Daily Logistics",
    districts: ["Anakapalle", "Gajuwaka", "Vizag Port Area", "Pendurthi"],
    description: "Bulk industrial logistics catering to shipbuilding, infrastructure projects, and commercial hubs."
  },
  {
    name: "Odisha Border Areas",
    type: "Border Zone",
    districts: ["Rayagada Border", "Parlakhemundi / Gajapati", "Jeypore", "Gunupur Corridor"],
    description: "Cross-border logistical clearance managing direct structural supply runs up to bordering checkpoints."
  },
  {
    name: "Extended AP Districts",
    type: "Extended Support",
    districts: ["East Godavari", "Kakinada", "Rajahmundry"],
    description: "Dedicated project-based dispatching for high-volume structural rebar or custom roofing profiles."
  }
];

export default function DeliveryCoverage() {
  return (
    <section id="delivery" className="section-spacing bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 rounded-sm bg-brand-slate/5 dark:bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-brand-amber uppercase border border-brand-charcoal/10 dark:border-white/10"
          >
            <Truck className="h-3.5 w-3.5" />
            <span>Supply Chain & Transit</span>
          </motion.span>
          
          <h2 className="font-outfit text-3xl font-extrabold sm:text-4xl text-brand-slate dark:text-white">
            Delivery Coverage & <span className="text-brand-amber">Logistical Network</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-inter leading-relaxed">
            We operate a dedicated transport fleet to ensure structural integrity and timely transit of heavy construction materials across Andhra Pradesh and bordering regions.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: List of regions (Lg: col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            {COVERAGE_REGIONS.map((region, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-md bg-slate-50 dark:bg-[#071421] border border-slate-200/60 dark:border-white/5 flex flex-col md:flex-row md:items-start gap-4 hover:border-brand-amber/30 dark:hover:border-brand-amber/30 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-full bg-brand-amber/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-brand-amber" />
                </div>
                
                <div className="space-y-2 flex-grow text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-outfit text-base font-bold text-brand-slate dark:text-white">
                      {region.name}
                    </h3>
                    <span className={`inline-block text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm ${
                      region.type === 'Primary' ? 'bg-brand-slate text-brand-amber dark:bg-brand-amber dark:text-brand-slate' :
                      region.type === 'Daily Logistics' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      region.type === 'Border Zone' ? 'bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-400' :
                      'bg-slate-200 text-slate-800 dark:bg-white/10 dark:text-slate-300'
                    }`}>
                      {region.type}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-inter leading-relaxed">
                    {region.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {region.districts.map((d, dIdx) => (
                      <span key={dIdx} className="text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-gray-400 px-2 py-0.5 rounded-sm">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Visual illustration of network map / trust banner (Lg: col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Interactive Region Map / SVG Network Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-brand-slate dark:bg-[#071421] text-white p-8 rounded-md border border-white/5 flex flex-col justify-between flex-grow shadow-lg relative min-h-[300px]"
            >
              <div className="space-y-4 text-left">
                <Compass className="h-10 w-10 text-brand-amber animate-pulse" />
                <h3 className="font-outfit text-xl font-bold text-white">Logistical Coverage Radius</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Headquartered in Veeraghattam, our dispatch yards sit at the central confluence of north-coastal Andhra and the south Odisha border, ensuring reliable dispatch pipelines.
                </p>
              </div>

              {/* Graphical Network representation */}
              <div className="my-8 relative h-36 w-full flex items-center justify-center border border-white/10 rounded-sm bg-slate-950/20 overflow-hidden">
                <div className="absolute h-24 w-24 rounded-full border border-brand-amber/35 animate-ping duration-3000" />
                <div className="absolute h-12 w-12 rounded-full border border-brand-amber/55 animate-ping duration-1500" />
                <div className="z-10 flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-brand-amber flex items-center justify-center text-brand-slate font-extrabold text-xs shadow-lg">SSN</div>
                  <span className="text-[9px] text-brand-amber font-bold tracking-widest uppercase mt-2">Center Yard</span>
                </div>
                
                {/* Simulated Nodes */}
                <div className="absolute top-4 left-10 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Srikakulam</span>
                </div>
                <div className="absolute bottom-6 left-6 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Vizag</span>
                </div>
                <div className="absolute top-12 right-6 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Odisha Border</span>
                </div>
                <div className="absolute bottom-12 right-12 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">VZM</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Fleet Capability</span>
                <span className="text-[10px] text-brand-amber font-bold uppercase tracking-wider">Flatbed & Heavy Transit</span>
              </div>
            </motion.div>

            {/* Bottom trust banner cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 text-left space-y-2">
                <ShieldCheck className="h-5 w-5 text-[#25D366]" />
                <h4 className="text-xs font-bold text-brand-slate dark:text-white font-outfit uppercase">Secure Strapping</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Protected against structural deformation or bends during transit operations.</p>
              </div>
              <div className="p-4 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 text-left space-y-2">
                <CheckCircle2 className="h-5 w-5 text-brand-amber" />
                <h4 className="text-xs font-bold text-brand-slate dark:text-white font-outfit uppercase">No False Claims</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">We only commit to transits within verified corridors to safeguard deadlines.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
