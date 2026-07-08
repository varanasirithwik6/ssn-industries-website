'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, MessageSquare, ShieldAlert } from 'lucide-react';
import { LOCAL_PRODUCTS, CATEGORIES } from '@/constants/products';

function ProductsCatalog() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');
  const [allProducts, setAllProducts] = useState(LOCAL_PRODUCTS);
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && CATEGORIES.some(c => c.slug === categoryParam)) {
      setSelectedCat(categoryParam);
    }
  }, [searchParams]);

  // Use shared ssn_products localStorage key — exactly what admin sees/manages
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ssn_products');
      if (saved) {
        const adminItems: Array<{ id: string; name: string; slug: string; category: string; specs: Record<string, string> }> = JSON.parse(saved);
        // Map admin product format to the shape used by the product card renderer
        const mapped = adminItems.map(item => {
          // Try to match with a static product to preserve imageUrl and description
          const match = LOCAL_PRODUCTS.find(p => p.slug === item.slug);
          return match ?? {
            id: item.id,
            name: item.name,
            slug: item.slug,
            category: item.category,
            categoryName: item.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            description: `${item.name} — ${Object.values(item.specs).join(', ')}`.trim(),
            specs: item.specs,
            imageUrl: '',
          };
        });
        setAllProducts(mapped as typeof LOCAL_PRODUCTS);
      }
    } catch { /* fall back to static */ }
  }, []);

  const filteredProducts = allProducts.filter((prod) => {
    const matchCat = selectedCat === 'all' || prod.category === selectedCat;
    const matchSearch =
      prod.name.toLowerCase().includes(search.toLowerCase()) ||
      prod.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="container-custom py-12">
      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-brand-charcoal/10 pb-8 dark:border-white/5">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-amber uppercase">SSN Catalog</span>
          <h1 className="font-outfit text-3xl font-extrabold text-brand-slate dark:text-white mt-1">Our Product Catalog</h1>
        </div>
        <div className="relative w-full md:max-w-xs flex items-center">
          <Search className="absolute left-3.5 h-4.5 w-4.5 text-brand-charcoal dark:text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products catalog"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ent-input pr-10 !pl-11"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-3 text-brand-charcoal hover:text-brand-slate dark:hover:text-white focus:outline-none"
              aria-label="Clear search input"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Sidebar */}
        <nav className="flex flex-row lg:flex-col overflow-x-auto gap-2 lg:overflow-x-visible pb-4 lg:pb-0 shrink-0 self-start" aria-label="Catalog categories">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCat === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCat(cat.slug)}
                aria-pressed={isSelected}
                aria-label={`Filter by ${cat.name}`}
                className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-sm text-xs font-bold transition-all shrink-0 uppercase tracking-wider text-left border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-brand-slate text-brand-amber border-brand-slate dark:bg-brand-amber dark:text-brand-slate dark:border-brand-amber'
                    : 'bg-white border-brand-charcoal/10 text-brand-charcoal hover:bg-brand-ice dark:bg-slate-950 dark:border-white/5 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Product Grid */}
        <div className="lg:col-span-3 space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-brand-charcoal/20 dark:border-white/10 rounded-sm">
              <p className="text-brand-charcoal text-sm">No products found matching the criteria.</p>
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-md p-6 flex flex-col justify-between transition-all duration-350 hover:shadow-md hover:-translate-y-0.5 group"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  {prod.imageUrl ? (
                    <div className="w-full md:w-56 h-56 shrink-0 relative overflow-hidden bg-[#F8F9FA] dark:bg-slate-950 rounded-md border border-slate-200 dark:border-white/10 p-1.5 flex items-center justify-center shadow-sm">
                      <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image
                          src={prod.imageUrl}
                          alt={prod.name}
                          fill
                          sizes="(max-w-768px) 100vw, 224px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full md:w-56 h-56 shrink-0 relative flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-white/10 text-gray-400 p-4">
                      <ShieldAlert className="h-8 w-8 text-brand-amber mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">No Image Available</span>
                    </div>
                  )}
                  {/* Info block */}
                  <div className="flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-extrabold tracking-widest text-[#B0800F] uppercase bg-[#FAF4E5] dark:bg-brand-amber/10 dark:text-brand-amber px-2.5 py-1 rounded-sm border border-[#EFE2C6] dark:border-brand-amber/20">
                          {prod.categoryName}
                        </span>
                        <h2 className="font-outfit text-2xl font-extrabold text-[#0D233A] dark:text-white mt-3 leading-tight tracking-tight hover:text-brand-amber transition-colors duration-300">
                          {prod.name}
                        </h2>
                      </div>
                      <p className="text-sm text-brand-charcoal dark:text-gray-300 leading-relaxed font-medium">
                        {prod.description}
                      </p>
                      
                      {/* Specs Table */}
                      <div className="overflow-hidden rounded-md border border-slate-200 dark:border-white/5">
                        <table className="w-full text-left border-collapse text-xs">
                          <tbody>
                            {Object.entries(prod.specs).map(([key, val]) => (
                              <tr key={key} className="border-b border-slate-100 dark:border-white/5 last:border-0">
                                <td className="w-1/3 font-bold bg-[#F8F9FA] dark:bg-slate-900/40 text-[#4A5568] dark:text-gray-300 p-3 border-r border-slate-100 dark:border-white/5 align-middle">
                                  {key}
                                </td>
                                <td className="w-2/3 p-3 text-[#2D3748] dark:text-gray-200 align-middle font-medium">
                                  {Array.isArray(val) ? val.join(', ') : val}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Action buttons at the bottom of card info block */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center h-11 px-6 bg-[#D4A017] hover:bg-[#B8860B] text-[#0D233A] font-bold text-xs uppercase tracking-wider rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber shadow-sm"
                      >
                        <span>CONTACT SALES</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-custom py-12 text-center text-sm font-semibold">Loading catalog...</div>}>
      <ProductsCatalog />
    </Suspense>
  );
}
