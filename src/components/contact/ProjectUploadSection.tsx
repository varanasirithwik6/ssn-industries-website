'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
  FileImage,
} from 'lucide-react';

interface PreviewFile {
  id: string;
  file: File;
  previewUrl: string;
}

const MAX_FILES = 10;
const MAX_SIZE_MB = 10;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = '.jpg,.jpeg,.png,.webp';

// Compress an image using Canvas API (target: ≤ 800KB, quality: 0.8)
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX_DIM = 1600;
      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          const compressed = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
          resolve(compressed);
        },
        'image/jpeg',
        0.8
      );
    };
    img.onerror = () => resolve(file);
    img.src = url;
  });
}

export default function ProjectUploadSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', category: 'projects' });
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'compressing' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formLoadTime] = useState(() => Date.now());

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate message when files or category changes
  useEffect(() => {
    if (files.length === 0) {
      setForm(prev => ({ ...prev, message: '' }));
      return;
    }

    // Clean up first file name for keyword checking
    const firstFileName = files[0].file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const cleanName = firstFileName.charAt(0).toUpperCase() + firstFileName.slice(1);
    const nameLower = firstFileName.toLowerCase();

    let productType = "steel materials";
    if (nameLower.includes("sheet") || nameLower.includes("roof")) {
      productType = "corrugated roofing sheets";
    } else if (nameLower.includes("tmt") || nameLower.includes("rod") || nameLower.includes("rebar")) {
      productType = "reinforcement TMT rods";
    } else if (nameLower.includes("pipe") || nameLower.includes("tube")) {
      productType = "structural hollow steel pipes";
    } else if (nameLower.includes("coil") || nameLower.includes("roll")) {
      productType = "galvanized steel coils";
    }

    let categoryText = "Completed Projects";
    let desc = "";

    if (form.category === 'facility') {
      categoryText = "Facility";
      desc = `Operational workspace overview captured at our manufacturing plant floor. All logistics bays are operating under certified safety protocols.`;
    } else if (form.category === 'warehouse') {
      categoryText = "Warehouse";
      desc = `Organized internal inventory layout showcasing structured storage racks of premium ${productType} prepared for dispatch.`;
    } else if (form.category === 'products') {
      categoryText = "Products";
      desc = `A close-up high-resolution catalog shot of our premium finished ${productType} showing thickness profile details.`;
    } else if (form.category === 'machinery') {
      categoryText = "Machinery";
      desc = `Precision automated roll-forming lines and processing units optimized for high-volume manufacturing of ${productType}.`;
    } else {
      desc = `Completed building structure using certified SSN Industries ${productType} to ensure long-term architectural stability.`;
    }

    setForm(prev => ({
      ...prev,
      message: `[Auto-Generated Description - Category: ${categoryText}]\n${desc}`
    }));
  }, [files, form.category]);

  useEffect(() => {
    return () => { files.forEach(f => URL.revokeObjectURL(f.previewUrl)); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback(async (newFiles: FileList | File[]) => {
    const arr = Array.from(newFiles);
    const valid: File[] = [];
    const errors: string[] = [];

    for (const f of arr) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        errors.push(`"${f.name}" is not supported. Use JPG, PNG, or WEBP.`);
        continue;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        errors.push(`"${f.name}" exceeds ${MAX_SIZE_MB} MB.`);
        continue;
      }
      valid.push(f);
    }

    if (errors.length > 0) setErrorMsg(errors.join(' '));

    setFiles((prev) => {
      const allowed = valid.slice(0, MAX_FILES - prev.length);
      if (prev.length + valid.length > MAX_FILES) {
        setErrorMsg(`Maximum ${MAX_FILES} images allowed. Only the first ${allowed.length} were added.`);
      }
      const newEntries: PreviewFile[] = allowed.map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        file: f,
        previewUrl: URL.createObjectURL(f),
      }));
      return [...prev, ...newEntries];
    });
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find(f => f.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter(f => f.id !== id);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Name is required (min 2 characters).';
    if (!form.phone.trim() || !/^\+?[\d\s\-()]{7,15}$/.test(form.phone.trim())) errs.phone = 'A valid phone number is required.';
    if (files.length === 0) errs.images = 'Please upload at least one project image.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!validate()) return;

    try {
      setStatus('compressing');
      const compressedFiles = await Promise.all(files.map(f => compressImage(f.file)));

      setStatus('submitting');
      const fd = new FormData();
      fd.append('name', form.name.trim());
      fd.append('phone', form.phone.trim());
      fd.append('email', form.email.trim());
      fd.append('category', form.category);
      fd.append('message', form.message.trim());
      fd.append('_t', formLoadTime.toString());
      fd.append('website', ''); // honeypot
      compressedFiles.forEach(f => fd.append('images', f));

      const res = await fetch('/api/upload-project', { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Submission failed. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('A network error occurred. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="ent-card p-10 text-center space-y-5 max-w-2xl mx-auto"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mx-auto">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="font-outfit text-xl font-bold text-brand-slate dark:text-white">Images Received!</h3>
        <p className="text-sm text-brand-charcoal dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Thank you for sharing your project with SSN Industries. Our team has received your images and will review them.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setForm({ name: '', phone: '', email: '', message: '', category: 'projects' });
            setFiles([]);
            setErrorMsg('');
          }}
          className="ent-btn-secondary text-xs"
        >
          Submit Another Project
        </button>
      </motion.div>
    );
  }

  const isLoading = status === 'compressing' || status === 'submitting';

  return (
    <div id="upload-project" className="ent-card p-6 md:p-8 space-y-7">
      <div className="flex items-start space-x-4 pb-6 border-b border-brand-charcoal/10 dark:border-white/5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-brand-amber text-brand-slate">
          <Camera className="h-5 w-5 stroke-[2.5]" />
        </div>
        <div>
          <h3 className="font-outfit text-lg font-bold text-brand-slate dark:text-white">
            Share Gallery Images
          </h3>
          <p className="text-xs text-brand-charcoal dark:text-slate-400 mt-1">
            Have images of our stock, warehouse operations, advanced machinery, or completed building sites? Upload them securely to share with us.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="upload-name" className="ent-label block mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="upload-name" type="text" name="name" value={form.name}
              onChange={handleFieldChange} placeholder="e.g. Rajesh Kumar"
              className={`ent-input ${fieldErrors.name ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
            {fieldErrors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{fieldErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="upload-phone" className="ent-label block mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="upload-phone" type="tel" name="phone" value={form.phone}
              onChange={handleFieldChange} placeholder="e.g. +91 9876543210"
              className={`ent-input ${fieldErrors.phone ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
            {fieldErrors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{fieldErrors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="upload-category" className="ent-label block mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="upload-category"
              name="category"
              value={form.category}
              onChange={handleFieldChange}
              className="ent-input"
              disabled={isLoading}
            >
              <option value="facility">🏢 FACILITY</option>
              <option value="warehouse">📦 WAREHOUSE</option>
              <option value="products">🛠 PRODUCTS</option>
              <option value="machinery">⚙ MACHINERY</option>
              <option value="projects">🏗 PROJECTS</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="upload-email" className="ent-label block mb-1.5">
              Email Address <span className="text-brand-charcoal/50 text-[10px]">(Optional)</span>
            </label>
            <input
              id="upload-email" type="email" name="email" value={form.email}
              onChange={handleFieldChange} placeholder="e.g. rajesh@example.com"
              className="ent-input" disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="upload-message" className="ent-label block mb-1.5">
            Auto-Generated Message Description <span className="text-brand-charcoal/50 text-[10px]">(Editable)</span>
          </label>
          <textarea
            id="upload-message"
            name="message"
            value={form.message}
            onChange={handleFieldChange}
            placeholder="Upload images to auto-populate description..."
            className="ent-textarea"
            rows={4}
            disabled={isLoading}
          />
        </div>

        {/* Drop Zone */}
        <div>
          <label className="ent-label block mb-1.5">
            Gallery Images <span className="text-red-500">*</span>
            <span className="text-brand-charcoal/50 text-[10px] ml-2">(JPG, PNG, WEBP · Max 10 MB each · Up to 10 images)</span>
          </label>
          <div
            onClick={() => !isLoading && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={`relative border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging ? 'border-brand-amber bg-brand-amber/5 scale-[1.01]'
              : fieldErrors.images ? 'border-red-400 bg-red-50/30 dark:bg-red-900/10'
              : 'border-brand-charcoal/20 dark:border-white/10 hover:border-brand-amber/60 hover:bg-brand-amber/3'
            } ${isLoading ? 'pointer-events-none opacity-60' : ''}`}
          >
            <input
              ref={fileInputRef} type="file" multiple accept={ALLOWED_EXTENSIONS}
              className="hidden"
              onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }}
              disabled={isLoading}
            />
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${isDragging ? 'bg-brand-amber text-brand-slate' : 'bg-brand-charcoal/8 dark:bg-white/8 text-brand-steel'}`}>
                  <Upload className="h-6 w-6" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-slate dark:text-white">
                  {isDragging ? 'Drop images here' : 'Click to browse or drag & drop images'}
                </p>
                <p className="text-xs text-brand-charcoal dark:text-slate-400 mt-1">
                  {files.length > 0 ? `${files.length} / ${MAX_FILES} images selected` : 'Supports JPG, PNG, WEBP up to 10 MB each'}
                </p>
              </div>
            </div>
          </div>
          {fieldErrors.images && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{fieldErrors.images}</p>}
        </div>

        {/* Preview Grid */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {files.map((f) => (
                <motion.div key={f.id} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                  className="relative group aspect-square rounded-sm overflow-hidden border border-brand-charcoal/10 dark:border-white/10 bg-slate-100 dark:bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.previewUrl} alt={f.file.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(f.id); }}
                      className="opacity-0 group-hover:opacity-100 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-opacity">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/60 px-1.5 py-0.5">
                    <p className="text-[9px] text-white truncate">{(f.file.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                </motion.div>
              ))}
              {files.length < MAX_FILES && (
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-sm border-2 border-dashed border-brand-charcoal/15 dark:border-white/10 flex flex-col items-center justify-center gap-1 hover:border-brand-amber/50 transition-colors">
                  <FileImage className="h-5 w-5 text-brand-charcoal/40 dark:text-slate-500" />
                  <span className="text-[9px] font-bold text-brand-charcoal/40 dark:text-slate-500">Add more</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error banner */}
        <AnimatePresence>
          {(errorMsg || status === 'error') && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-start space-x-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-sm text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg || 'Something went wrong. Please try again.'}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && (
          <div className="flex items-center space-x-3 text-xs text-brand-charcoal dark:text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin text-brand-amber" />
            <span>{status === 'compressing' ? 'Optimising images…' : 'Sending your gallery photos…'}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <button type="submit" disabled={isLoading} className="ent-btn-primary" id="submit-project-images">
            {isLoading ? (
              <><Loader2 className="h-4.5 w-4.5 mr-2 animate-spin" /><span>{status === 'compressing' ? 'Optimising…' : 'Sending…'}</span></>
            ) : (
              <><ImageIcon className="h-4.5 w-4.5 mr-2" /><span>SUBMIT GALLERY IMAGES</span></>
            )}
          </button>
          <p className="text-[10px] text-brand-charcoal/50 dark:text-slate-500 leading-relaxed self-center">
            🔒 Images are transmitted securely and will <strong>not</strong> be published publicly without your consent.
          </p>
        </div>
      </form>
    </div>
  );
}
