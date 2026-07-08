'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  BarChart3,
  Layers,
  Award,
  Image as ImageIcon,
  MessageSquare,
  Mail,
  Settings,
  Plus,
  Trash2,
  CheckCircle,
  LogOut,
  FolderOpen,
  Upload,
  Loader2,
} from 'lucide-react';
import { LOCAL_PRODUCTS } from '@/constants/products';

// Shared localStorage key used by BOTH admin and customer pages
const LS_PRODUCTS = 'ssn_products';
const LS_BRANDS   = 'ssn_admin_brands';
const LS_GALLERY  = 'ssn_gallery_items';
const LS_TESTIMONIALS = 'ssn_admin_testimonials';

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  specs: Record<string, string>;
}

interface BrandItem {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  imageUrl: string;
  description?: string;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  message: string;
  rating: number;
}

interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

// Build the default product list from LOCAL_PRODUCTS (the real catalog)
const DEFAULT_PRODUCTS: ProductItem[] = LOCAL_PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  category: p.category,
  specs: Object.fromEntries(Object.entries(p.specs).map(([k, v]) => [k, String(v)])),
}));

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [activeModule, setActiveModule] = useState<'dashboard' | 'products' | 'brands' | 'gallery' | 'testimonials' | 'enquiries' | 'settings'>('dashboard');

  // Verify auth session on load
  useEffect(() => {
    const isAuth = sessionStorage.getItem('ssn_admin_authenticated');
    if (isAuth !== 'true') {
      router.push('/admin/login');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthChecked(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('ssn_admin_authenticated');
    router.push('/admin/login');
  };

  // --- Dynamic local states for DB models CRUD ---
  const [products, setProducts] = useState<ProductItem[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
    try {
      const saved = localStorage.getItem(LS_PRODUCTS);
      if (saved) return JSON.parse(saved);
      // First load: seed localStorage with the real catalog so customer reads it too
      localStorage.setItem(LS_PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    } catch { return DEFAULT_PRODUCTS; }
  });
  const [brands, setBrands] = useState<BrandItem[]>(() => {
    if (typeof window === 'undefined') return [
      { id: '1', name: 'Tata Steel', slug: 'tata-steel', description: 'Primary steel coil supplier' },
      { id: '2', name: 'JSW Steel', slug: 'jsw-steel', description: 'Roofing coil sheet provider' },
    ];
    try {
      const saved = localStorage.getItem('ssn_admin_brands');
      return saved ? JSON.parse(saved) : [
        { id: '1', name: 'Tata Steel', slug: 'tata-steel', description: 'Primary steel coil supplier' },
        { id: '2', name: 'JSW Steel', slug: 'jsw-steel', description: 'Roofing coil sheet provider' },
      ];
    } catch { return []; }
  });
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('ssn_gallery_items');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    if (typeof window === 'undefined') return [
      { id: '1', name: 'Amit Sharma', role: 'Lead Civil Engineer', company: 'L&T', message: 'Exceptional structural members, very high dimensional precision.', rating: 5 },
    ];
    try {
      const saved = localStorage.getItem('ssn_admin_testimonials');
      return saved ? JSON.parse(saved) : [
        { id: '1', name: 'Amit Sharma', role: 'Lead Civil Engineer', company: 'L&T', message: 'Exceptional structural members, very high dimensional precision.', rating: 5 },
      ];
    } catch { return []; }
  });
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([
    { id: '1', name: 'Rahul Verma', email: 'rahul@infra.com', phone: '9876543210', subject: 'Bulk TMT Bar quote', message: 'Require quote for 15 metric tons of 16mm rebar bars.', status: 'PENDING', createdAt: '2026-07-03' },
  ]);
  const [settings, setSettings] = useState<Record<string, string>>({
    contact_email: 'sales@ssnindustries.com',
    phone_number: '+91 11 4050 9000',
    office_address: 'SSN Tower, 45 Industrial Estate, Delhi NCR, India',
  });

  // --- Form controllers state ---
  const [prodForm, setProdForm] = useState({ name: '', slug: '', category: '', material: '', thickness: '' });
  const [brandForm, setBrandForm] = useState({ name: '', slug: '', description: '' });
  const [gallForm, setGallForm] = useState({ title: '', tag: 'facility', imageUrl: '', description: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [testForm, setTestForm] = useState({ name: '', role: '', company: '', message: '', rating: 5 });

  // --- CRUD Handlers ---
  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.slug) return;
    const newProduct = {
      id: Date.now().toString(),
      name: prodForm.name,
      slug: prodForm.slug,
      category: prodForm.category,
      specs: { material: prodForm.material, thickness: prodForm.thickness },
    };
    const updated = [...products, newProduct];
    setProducts(updated);
    try { localStorage.setItem(LS_PRODUCTS, JSON.stringify(updated)); } catch {}
    setProdForm({ name: '', slug: '', category: '', material: '', thickness: '' });
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    try { localStorage.setItem(LS_PRODUCTS, JSON.stringify(updated)); } catch {}
  };

  const addBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandForm.name) return;
    const newBrand = {
      id: Date.now().toString(),
      name: brandForm.name,
      slug: brandForm.slug || brandForm.name.toLowerCase().replace(/ /g, '-'),
      description: brandForm.description,
    };
    const updated = [...brands, newBrand];
    setBrands(updated);
    try { localStorage.setItem('ssn_admin_brands', JSON.stringify(updated)); } catch {}
    setBrandForm({ name: '', slug: '', description: '' });
  };

  const deleteBrand = (id: string) => {
    const updated = brands.filter((b) => b.id !== id);
    setBrands(updated);
    try { localStorage.setItem('ssn_admin_brands', JSON.stringify(updated)); } catch {}
  };

  const addGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gallForm.title || !gallForm.imageUrl) return;
    const newItem = {
      id: Date.now().toString(),
      title: gallForm.title,
      tag: gallForm.tag,
      imageUrl: gallForm.imageUrl,
      description: gallForm.description,
    };
    const updated = [...gallery, newItem];
    setGallery(updated);
    try { localStorage.setItem('ssn_gallery_items', JSON.stringify(updated)); } catch {}
    setGallForm({ title: '', tag: 'factory', imageUrl: '', description: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to local preview object URL (base64/blob)
    const localUrl = URL.createObjectURL(file);
    
    // Auto-generate a beautiful description based on tag and filename
    setIsGenerating(true);

    // Clean up filename (remove extension and replace dashes/underscores with spaces)
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    setTimeout(() => {
      let generatedTitle = formattedName;
      let generatedDesc = "";

      // Smart dynamic keywords matching from file name
      const nameLower = cleanName.toLowerCase();
      let productRef = "steel products";
      if (nameLower.includes("sheet") || nameLower.includes("roof")) {
        productRef = "corrugated roofing sheets";
      } else if (nameLower.includes("tmt") || nameLower.includes("rod") || nameLower.includes("rebar")) {
        productRef = "high-ductility TMT rods";
      } else if (nameLower.includes("pipe") || nameLower.includes("tube")) {
        productRef = "structural hollow steel pipes";
      } else if (nameLower.includes("coil") || nameLower.includes("roll")) {
        productRef = "galvanized steel coil rolls";
      }

      if (gallForm.tag === 'facility') {
        generatedDesc = `A wide-angle operational view of our primary manufacturing facility, showcasing the layout and transit infrastructure for distributing premium ${productRef}.`;
      } else if (gallForm.tag === 'warehouse') {
        generatedDesc = `Organized stockyard shelving showing a batch of certified ${productRef} ready for dispatch.`;
      } else if (gallForm.tag === 'products') {
        generatedDesc = `A catalog image of our premium grade SSN ${productRef} produced strictly to IS structural safety standards.`;
      } else if (gallForm.tag === 'machinery') {
        generatedDesc = `Advanced industrial roll forming and processing machinery, optimized for handling high-yield steel coils to manufacture custom-profile ${productRef}.`;
      } else {
        generatedDesc = `A finished view of a commercial structures contract where our high-durability ${productRef} were successfully integrated for long-lasting structural strength.`;
      }

      setGallForm(prev => ({
        ...prev,
        title: generatedTitle,
        imageUrl: localUrl,
        description: generatedDesc
      }));
      setIsGenerating(false);
    }, 1000); // Simulate a smart AI analysis delay
  };

  const deleteGallery = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    try { localStorage.setItem('ssn_gallery_items', JSON.stringify(updated)); } catch {}
  };

  const addTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.name || !testForm.message) return;
    const newItem = {
      id: Date.now().toString(),
      name: testForm.name,
      role: testForm.role,
      company: testForm.company,
      message: testForm.message,
      rating: testForm.rating,
    };
    const updated = [...testimonials, newItem];
    setTestimonials(updated);
    try { localStorage.setItem('ssn_admin_testimonials', JSON.stringify(updated)); } catch {}
    setTestForm({ name: '', role: '', company: '', message: '', rating: 5 });
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    try { localStorage.setItem('ssn_admin_testimonials', JSON.stringify(updated)); } catch {}
  };

  const toggleEnquiryStatus = (id: string) => {
    setEnquiries(
      enquiries.map((e) =>
        e.id === id ? { ...e, status: e.status === 'PENDING' ? 'RESOLVED' : 'PENDING' } : e
      )
    );
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-brand-slate text-sm">
        Verifying security token...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-brand-slate font-inter">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div className="p-6">
          <div className="flex items-center space-x-2.5 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-amber text-brand-slate">
              <FolderOpen className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-outfit text-sm font-bold tracking-tight text-brand-slate">SSN CONTROL</span>
              <p className="text-[8px] font-bold text-brand-charcoal/60 uppercase">Admin Terminal</p>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-semibold">
            {[
              { id: 'dashboard', label: 'Overview Panel', icon: BarChart3 },
              { id: 'products', label: 'Products Catalog', icon: Layers },
              { id: 'brands', label: 'Alliances & Brands', icon: Award },
              { id: 'gallery', label: 'Facility Gallery', icon: ImageIcon },
              { id: 'testimonials', label: 'Review Moderation', icon: MessageSquare },
              { id: 'enquiries', label: 'Inbound Enquiries', icon: Mail },
              { id: 'settings', label: 'Website Settings', icon: Settings },
            ].map((mod) => {
              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id as 'dashboard' | 'products' | 'brands' | 'gallery' | 'testimonials' | 'enquiries' | 'settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-sm transition-all text-left uppercase tracking-wider ${
                    activeModule === mod.id
                      ? 'bg-brand-amber text-brand-slate font-bold'
                      : 'hover:bg-slate-100 text-brand-charcoal'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{mod.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 border border-red-300 text-red-500 rounded-sm text-xs font-bold hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>TERMINATE SESSION</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Module Renderers */}

        {activeModule === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-outfit text-2xl font-bold tracking-tight">Overview Dashboard</h2>
              <p className="text-xs text-brand-charcoal">SSN Industries global site status.</p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Products', val: products.length, icon: Layers },
                { title: 'Brand Partners', val: brands.length, icon: Award },
                { title: 'Active Testimonials', val: testimonials.length, icon: MessageSquare },
                { title: 'Total Enquiries', val: enquiries.length, icon: Mail },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200 p-5 rounded-sm shadow-sm">
                    <div className="flex justify-between items-center text-brand-amber mb-3">
                      <span className="text-[10px] font-bold text-brand-charcoal uppercase">{stat.title}</span>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="font-outfit text-3xl font-extrabold text-brand-slate">{stat.val}</span>
                  </div>
                );
              })}
            </div>

            {/* Mini Log */}
            <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4 shadow-sm">
              <h3 className="font-outfit text-sm font-bold uppercase tracking-wider text-brand-amber">Recent Inquiries</h3>
              <div className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="py-3 flex justify-between text-xs items-center">
                    <div>
                      <span className="font-bold block text-brand-slate">{enq.name} ({enq.email})</span>
                      <span className="text-[10px] text-brand-charcoal">{enq.subject}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold ${enq.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {enq.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeModule === 'products' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-outfit text-2xl font-bold tracking-tight">Products Catalog</h2>
                <p className="text-xs text-brand-charcoal">Insert, update, or remove database product catalog entries.</p>
              </div>
            </div>

            {/* Add product form */}
            <form onSubmit={addProduct} className="ent-card p-6 space-y-4">
              <h3 className="font-outfit text-sm font-bold uppercase tracking-wider text-brand-amber">Add New Product</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="ent-label block mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    className="ent-input"
                  />
                </div>
                <div>
                  <label className="ent-label block mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={prodForm.slug}
                    onChange={(e) => setProdForm({ ...prodForm, slug: e.target.value })}
                    className="ent-input"
                  />
                </div>
                <div>
                  <label className="ent-label block mb-1">Category</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="ent-input"
                  >
                    <option value="">Select Category</option>
                    <option value="roofing-sheets">Roofing Sheets</option>
                    <option value="steel-pipes">Steel Pipes</option>
                    <option value="structural-steel">Structural Steel</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="ent-label block mb-1">Specification Material</label>
                  <input
                    type="text"
                    value={prodForm.material}
                    onChange={(e) => setProdForm({ ...prodForm, material: e.target.value })}
                    className="ent-input"
                  />
                </div>
                <div>
                  <label className="ent-label block mb-1">Thickness options</label>
                  <input
                    type="text"
                    value={prodForm.thickness}
                    onChange={(e) => setProdForm({ ...prodForm, thickness: e.target.value })}
                    className="ent-input"
                  />
                </div>
              </div>
              <button type="submit" className="ent-btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                <span>ADD PRODUCT</span>
              </button>
            </form>

            {/* Product table */}
            <div className="ent-table-container">
              <table className="ent-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Material</th>
                    <th>Thickness</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="font-bold">{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.specs?.material || '-'}</td>
                      <td>{p.specs?.thickness || '-'}</td>
                      <td className="text-center">
                        <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-400">
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeModule === 'brands' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-outfit text-2xl font-bold tracking-tight">Brands & Partners</h2>
              <p className="text-xs text-brand-charcoal">Manage distribution relationships.</p>
            </div>

            <form onSubmit={addBrand} className="ent-card p-6 space-y-4">
              <h3 className="font-outfit text-sm font-bold uppercase tracking-wider text-brand-amber">Add Partner Brand</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="ent-label block mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={brandForm.name}
                    onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                    className="ent-input"
                  />
                </div>
                <div>
                  <label className="ent-label block mb-1">Description</label>
                  <input
                    type="text"
                    value={brandForm.description}
                    onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                    className="ent-input"
                  />
                </div>
              </div>
              <button type="submit" className="ent-btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                <span>ADD BRAND</span>
              </button>
            </form>

            <div className="ent-card p-0 overflow-hidden">
              <div className="divide-y divide-white/5">
                {brands.map((b) => (
                  <div key={b.id} className="p-4 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold block">{b.name}</span>
                      <span className="text-[10px] text-gray-400">{b.description}</span>
                    </div>
                    <button onClick={() => deleteBrand(b.id)} className="text-red-500 hover:text-red-400">
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeModule === 'gallery' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-outfit text-2xl font-bold tracking-tight">Facility Gallery</h2>
              <p className="text-xs text-brand-charcoal">Manage images of manufacturing mills and client projects.</p>
            </div>

            <form onSubmit={addGallery} className="ent-card p-6 space-y-6">
              <h3 className="font-outfit text-sm font-bold uppercase tracking-wider text-brand-amber">Add Photo & Generate Description</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Select Tag first */}
                <div className="space-y-4">
                  <div>
                    <label className="ent-label block mb-1">1. Select Category</label>
                    <select
                      value={gallForm.tag}
                      onChange={(e) => setGallForm({ ...gallForm, tag: e.target.value })}
                      className="ent-input"
                    >
                      <option value="facility">Facility</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="products">Products</option>
                      <option value="machinery">Machinery</option>
                      <option value="projects">Projects</option>
                    </select>
                  </div>

                  {/* 2. File Upload Box */}
                  <div>
                    <label className="ent-label block mb-1">2. Upload Picture</label>
                    <div className="relative flex items-center justify-center border-2 border-dashed border-brand-charcoal/20 dark:border-white/10 rounded-sm p-4 bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Upload image file"
                      />
                      <div className="flex flex-col items-center space-y-2 pointer-events-none">
                        <Upload className="h-6 w-6 text-brand-amber" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-steel">Choose File</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Generated Specifications */}
                <div className="md:col-span-2 space-y-4">
                  {isGenerating ? (
                    <div className="h-full flex flex-col items-center justify-center py-10 space-y-3 bg-brand-ice/20 dark:bg-slate-950 border border-brand-charcoal/5 rounded-sm">
                      <Loader2 className="h-7 w-7 text-brand-amber animate-spin" />
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-steel animate-pulse">Generating description from image...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="ent-label block mb-1">Generated Title</label>
                          <input
                            type="text"
                            required
                            placeholder="Upload a picture to generate..."
                            value={gallForm.title}
                            onChange={(e) => setGallForm({ ...gallForm, title: e.target.value })}
                            className="ent-input"
                          />
                        </div>
                        <div>
                          <label className="ent-label block mb-1">Image Reference URL / Local Blob</label>
                          <input
                            type="text"
                            required
                            placeholder="Blob reference or Unsplash URL..."
                            value={gallForm.imageUrl}
                            onChange={(e) => setGallForm({ ...gallForm, imageUrl: e.target.value })}
                            className="ent-input text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="ent-label block mb-1">AI Generated Description</label>
                        <textarea
                          placeholder="Image content description will be auto-generated here..."
                          value={gallForm.description}
                          onChange={(e) => setGallForm({ ...gallForm, description: e.target.value })}
                          className="ent-input h-20 text-xs py-2 resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Thumbnail and Save button */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5 gap-4">
                {gallForm.imageUrl ? (
                  <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-950/60 p-2 rounded-sm border border-brand-charcoal/5 dark:border-white/5 w-full sm:w-auto">
                    <div className="h-12 w-12 rounded-sm overflow-hidden bg-slate-900 relative shrink-0">
                      <Image src={gallForm.imageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white block truncate max-w-[200px]">{gallForm.title}</span>
                      <span className="text-[9px] font-semibold text-brand-steel uppercase">{gallForm.tag}</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-[11px] font-semibold text-brand-steel">No preview available. Upload an image to start.</span>
                )}

                <button
                  type="submit"
                  disabled={!gallForm.imageUrl || isGenerating}
                  className="ent-btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>UPLOAD PHOTO</span>
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((g) => (
                <div key={g.id} className="ent-card p-0 overflow-hidden flex flex-col justify-between">
                  <div className="aspect-video w-full bg-slate-950 relative">
                    <Image src={g.imageUrl} alt={g.title} width={300} height={168} unoptimized className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="font-bold block text-xs leading-snug">{g.title}</span>
                      <span className="text-[10px] text-brand-steel font-bold uppercase block">{g.tag}</span>
                      {g.description && (
                        <p className="text-[10px] text-slate-500 dark:text-gray-400 font-inter leading-relaxed mt-1">{g.description}</p>
                      )}
                    </div>
                    <button onClick={() => deleteGallery(g.id)} className="text-red-500 hover:text-red-400">
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'testimonials' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-outfit text-2xl font-bold tracking-tight">Review Moderation</h2>
              <p className="text-xs text-brand-charcoal">Approve or delete testimonials from structural engineers and homeowners.</p>
            </div>

            <form onSubmit={addTestimonial} className="ent-card p-6 space-y-4">
              <h3 className="font-outfit text-sm font-bold uppercase tracking-wider text-brand-amber">Add Testimonial</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="ent-label block mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={testForm.name}
                    onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                    className="ent-input"
                  />
                </div>
                <div>
                  <label className="ent-label block mb-1">Role</label>
                  <input
                    type="text"
                    required
                    value={testForm.role}
                    onChange={(e) => setTestForm({ ...testForm, role: e.target.value })}
                    className="ent-input"
                  />
                </div>
                <div>
                  <label className="ent-label block mb-1">Company</label>
                  <input
                    type="text"
                    value={testForm.company}
                    onChange={(e) => setTestForm({ ...testForm, company: e.target.value })}
                    className="ent-input"
                  />
                </div>
              </div>
              <div>
                <label className="ent-label block mb-1">Review Message</label>
                <textarea
                  required
                  rows={3}
                  value={testForm.message}
                  onChange={(e) => setTestForm({ ...testForm, message: e.target.value })}
                  className="ent-textarea resize-none"
                ></textarea>
              </div>
              <button type="submit" className="ent-btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                <span>SAVE TESTIMONIAL</span>
              </button>
            </form>

            <div className="ent-card p-4 space-y-4">
              <div className="divide-y divide-white/5">
                {testimonials.map((t) => (
                  <div key={t.id} className="py-4 flex justify-between items-start text-xs">
                    <div className="space-y-1">
                      <span className="font-bold block">{t.name} ({t.role} {t.company ? `@ ${t.company}` : ''})</span>
                      <p className="text-brand-charcoal leading-relaxed max-w-2xl">{`"${t.message}"`}</p>
                      <span className="text-brand-amber">{'★'.repeat(t.rating)}</span>
                    </div>
                    <button onClick={() => deleteTestimonial(t.id)} className="text-red-500 hover:text-red-400">
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeModule === 'enquiries' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-outfit text-2xl font-bold tracking-tight">Inbound Enquiries</h2>
              <p className="text-xs text-brand-charcoal">Read lead queries submitted from the website forms.</p>
            </div>

            <div className="ent-card p-0 overflow-hidden">
              <div className="divide-y divide-slate-100">
                {enquiries.map((e) => (
                  <div key={e.id} className="p-6 flex flex-col sm:flex-row justify-between gap-4 text-xs">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-sm text-brand-slate">{e.name}</span>
                        <span className="text-[10px] text-brand-charcoal">{e.email} | {e.phone || 'No phone'}</span>
                      </div>
                      <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block">Subject: {e.subject}</span>
                      <p className="text-brand-charcoal leading-relaxed">{`"${e.message}"`}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className={`px-2.5 py-1 rounded-sm text-[10px] font-bold ${e.status === 'PENDING' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                        {e.status}
                      </span>
                      <button
                        onClick={() => toggleEnquiryStatus(e.id)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 text-brand-charcoal font-semibold rounded-sm hover:bg-slate-200"
                      >
                        <CheckCircle className="h-4 w-4 text-brand-amber" />
                        <span>TOGGLE STATUS</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeModule === 'settings' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-outfit text-2xl font-bold tracking-tight">Website Settings</h2>
              <p className="text-xs text-brand-charcoal">Configure structural coordinates, contact phone lines, and general email routing.</p>
            </div>

            <div className="ent-card p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="ent-label block mb-1">Corporate Contact Email</label>
                  <input
                    type="text"
                    value={settings.contact_email}
                    onChange={(e) => updateSetting('contact_email', e.target.value)}
                    className="ent-input max-w-md"
                  />
                </div>
                <div>
                  <label className="ent-label block mb-1">Phone Number Lines</label>
                  <input
                    type="text"
                    value={settings.phone_number}
                    onChange={(e) => updateSetting('phone_number', e.target.value)}
                    className="ent-input max-w-md"
                  />
                </div>
                <div>
                  <label className="ent-label block mb-1">Office Corporate Address</label>
                  <input
                    type="text"
                    value={settings.office_address}
                    onChange={(e) => updateSetting('office_address', e.target.value)}
                    className="ent-input max-w-xl"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  alert('Settings updated in temporary session state successfully!');
                }}
                className="ent-btn-primary"
              >
                <CheckCircle className="h-4.5 w-4.5 mr-2" />
                <span>SAVE CONFIGURATIONS</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
