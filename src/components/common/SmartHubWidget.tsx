"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Sparkles, X, Phone, MessageSquare, MessageCircle, Mail, MapPin,
  Download, FileText, Hammer, Truck, Calculator, Send, Copy, Check,
  ExternalLink, Compass, HelpCircle, Layers, ArrowRight
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════
   KNOWLEDGE BASE — RAG retrieval source (never hallucinate)
   ═══════════════════════════════════════════════════════════════════ */

interface KnowledgeBaseItem {
  keywords: string[];
  response: string;
  category: 'products' | 'faq' | 'company' | 'contact' | 'brands' | 'delivery';
  suggestedActions?: { label: string; action: string; type?: 'link' | 'click' }[];
}

const KNOWLEDGE_BASE: KnowledgeBaseItem[] = [
  {
    category: 'products',
    keywords: ['roofing', 'sheet', 'color', 'sheets', 'corrugated', 'galvalume', 'aluzinc', 'blue', 'green', 'red', 'white', 'upvc'],
    response: "We offer premium SSN Aluzinc & PPGI Corrugated Roofing Sheets (Sky Blue, Turkish Blue, Misted Green, Brick Red; 0.40 - 0.50 mm AZ-150 grade complying with IS 15965 / ASTM A792). We also supply SSN 3-Layer Corrugated UPVC Sheets (2.0 - 3.0 mm; width 1130 mm). Custom sizing is supported based on structural layouts.",
    suggestedActions: [
      { label: 'View Roofing Sheets', action: '/products', type: 'link' },
      { label: 'View Catalogue Products', action: '/products', type: 'link' },
      { label: 'WhatsApp Sales', action: 'https://wa.me/917780224863', type: 'link' }
    ]
  },
  {
    category: 'products',
    keywords: ['tmt', 'rebar', 'rebars', 'bar', 'bars', 'rods', 'rod', 'fe550d', '550', 'vizag', 'simhadri', 'aggold'],
    response: "We supply Fe 550D grade SSN TMT RODS conforming strictly to IS 1786 from certified mills like Vizag Steel, Simhadri TMT, and AG Gold Steel. Available diameters range from 4 mm to 25 mm, and lengths are customizable to your project specifications.",
    suggestedActions: [
      { label: 'View TMT Bars', action: '/products?category=tmt-bars', type: 'link' },
      { label: 'Call Sales', action: 'tel:+917780224863', type: 'link' },
      { label: 'WhatsApp Sales', action: 'https://wa.me/917780224863', type: 'link' }
    ]
  },
  {
    category: 'products',
    keywords: ['pipe', 'pipes', 'gi', 'ms', 'zinc', 'mild steel', 'tube', 'tubes', 'hollow', 'ompl', 'tata', 'jsw', 'hariom', 'a1', 'gold'],
    response: "We supply SSN Galvanized Zinc Pipes (GI) from leading brands like Tata Steel, JSW, Hariom, and A1 Gold with a 360 gsm pure zinc coating complying with IS 1239 / IS 3589 (diameters 15mm to 150mm). We also distribute MS Black Pipes (YST 210/240/310 grades complying with IS 1161 / IS 3589) manufactured by OMPL. Standard lengths are 20 feet (6.0 meters).",
    suggestedActions: [
      { label: 'View Products', action: '/products', type: 'link' },
      { label: 'WhatsApp Sales', action: 'https://wa.me/917780224863', type: 'link' }
    ]
  },
  {
    category: 'products',
    keywords: ['beam', 'beams', 'structural', 'i-beam', 'column', 'channel', 'ismb', 'steel'],
    response: "We supply hot-rolled structural steel sections, including I-Beams (ISMB 116 to ISMB 600, weight 11.5 kg/m to 122 kg/m) conforming to IS 2062 and IS 808 steel standards.",
    suggestedActions: [
      { label: 'View Products', action: '/products', type: 'link' },
      { label: 'Steel Calculator', action: '/tools', type: 'link' }
    ]
  },
  {
    category: 'faq',
    keywords: ['faq', 'faqs', 'frequent', 'question', 'questions', 'help', 'ask'],
    response: "Here are some of our Frequently Asked Questions:\n\n1. Do you customize roofing sheets?\nYes, we support custom roll-forming and cut-to-length shearing based on structural drawings to minimize installation waste.\n\n2. Do your products meet standards?\nYes, all TMT rebars meet IS 1786, structural members meet IS 2062, and pipes meet IS 1239/3589. Mill Test Certificates (MTCs) are provided.\n\n3. Which areas do you deliver to?\nWe deliver throughout Andhra Pradesh (Srikakulam, Vizianagaram, Parvathipuram, Visakhapatnam, Kakinada, Rajahmundry) and bordering Odisha checkposts.",
    suggestedActions: [
      { label: 'WhatsApp Sales', action: 'https://wa.me/917780224863', type: 'link' },
      { label: 'Contact Sales', action: '/contact', type: 'link' }
    ]
  },
  {
    category: 'faq',
    keywords: ['custom', 'length', 'cut', 'size', 'sizeing', 'shearing', 'wastage'],
    response: "Yes, we support custom roll-forming and shearing! We cut roofing sheets exactly to the sizes (in feet) requested in your structural drawings to minimize installation waste.",
    suggestedActions: [
      { label: 'WhatsApp Sales', action: 'https://wa.me/917780224863', type: 'link' }
    ]
  },
  {
    category: 'faq',
    keywords: ['quality', 'certificate', 'standard', 'standards', 'is', 'bis', 'traceability', 'mtc', 'compliant'],
    response: "Quality is guaranteed. All TMT rebars meet IS 1786, structural members meet IS 2062, and pipes meet IS 1239/3589. We maintain 100% quality traceability with Mill Test Certificates (MTCs) supplied with every order.",
    suggestedActions: [
      { label: 'Call Sales', action: 'tel:+917780224863', type: 'link' }
    ]
  },
  {
    category: 'company',
    keywords: ['owner', 'md', 'manager', 'bhaskar', 'rao', 'maddi', 'about', 'who'],
    response: "SSN Industries is managed by MD Maddi Bhaskar Rao, serving as a trusted distributor and rolling partner of premium construction steel and roofing supplies in Andhra Pradesh.",
    suggestedActions: [
      { label: 'About Us', action: '/about', type: 'link' }
    ]
  },
  {
    category: 'company',
    keywords: ['location', 'address', 'office', 'where', 'google', 'maps', 'veeraghattam', 'chittapullivalasa', 'factory'],
    response: "Our corporate headquarters and sales depot is located at Chittapullivalasa, Veeraghattam, Andhra Pradesh – 532460, India.",
    suggestedActions: [
      { label: 'Get Directions', action: 'https://maps.app.goo.gl/hyw1pv2mWE5V2uRG9', type: 'link' }
    ]
  },
  {
    category: 'contact',
    keywords: ['phone', 'contact', 'number', 'mobile', 'call', 'email', 'mail', 'whatsapp', 'connect', 'quote', 'quotation'],
    response: "You can contact us directly: Call MD Maddi Bhaskar Rao at +91 77802 24863, email ssnindustries7@gmail.com, or message us on WhatsApp.",
    suggestedActions: [
      { label: 'Call Sales', action: 'tel:+917780224863', type: 'link' },
      { label: 'WhatsApp Sales', action: 'https://wa.me/917780224863', type: 'link' },
      { label: 'Request Quote', action: '/contact', type: 'link' }
    ]
  },
  {
    category: 'brands',
    keywords: ['brand', 'brands', 'partner', 'partners', 'dealership', 'tata', 'jsw', 'jindal', 'ompl', 'simhadri', 'hariom', 'aggold', 'ag', 'gold'],
    response: "We are authorized distributors and partners of leading industrial brands, including Tata Steel (primary steel), JSW Steel (galvanized coils), Jindal (structural sections), Vizag Steel (TMT), Simhadri TMT, OMPL Steel, Hariom Pipes, and AG Gold Steel.",
    suggestedActions: [
      { label: 'View Products', action: '/products', type: 'link' },
      { label: 'WhatsApp Sales', action: 'https://wa.me/917780224863', type: 'link' }
    ]
  },
  {
    category: 'delivery',
    keywords: ['delivery', 'transport', 'ship', 'shipping', 'place', 'places', 'regions', 'districts', 'srikakulam', 'vizag', 'vizianagaram', 'visakhapatnam', 'ap', 'andhra', 'odisha'],
    response: "We supply and deliver materials throughout Andhra Pradesh (Srikakulam, Vizianagaram, Visakhapatnam, Kakinada, Rajahmundry) and neighbouring Odisha border corridors (Rayagada, Parlakhemundi, Gajapati).",
    suggestedActions: [
      { label: 'Delivery Map', action: '/#delivery', type: 'link' },
      { label: 'Contact Sales', action: '/contact', type: 'link' }
    ]
  }
];



/* ═══════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════════ */

const panelVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.94, y: 30 }
};

/* ═══════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════ */

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  handoff?: boolean;
  actions?: { label: string; action: string; type?: 'link' | 'click' }[];
}

export default function SmartHubWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const hubRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // ── AI Chat state ──
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // ── Contact info ──
  const mdPhone = "+917780224863";
  const mdEmail = "ssnindustries7@gmail.com";
  const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=ssnindustries7@gmail.com";
  const waUrl = `https://wa.me/917780224863?text=${encodeURIComponent("Hi! I would like to request a quotation for industrial materials.")}`;

  // ── Mobile detection for call link ──
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkScreen = () => {
      // Common mobile user-agent test + screen width check
      const mobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(window.innerWidth < 768 || mobileAgent);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const SUGGESTION_CHIPS = [
    { label: 'Roofing Sheets', icon: '🏗', query: 'I need information about roofing sheets and UPVC' },
    { label: 'TMT Rods', icon: '🛠', action: '/products?category=tmt-bars' },
    { label: 'FAQs', icon: '❓', query: 'Show me frequently asked questions' },
    { label: 'Product Catalogue', icon: '📄', action: '/products' },
    { label: 'Delivery Areas', icon: '🚚', action: '/#delivery' },
    { label: 'Brands', icon: '🏭', query: 'What brands do you supply?' },
    { label: 'Contact Sales', icon: '📞', action: isMobile ? `tel:${mdPhone}` : '/contact?highlight=phone' },
    { label: 'Find Our Factory', icon: '📍', action: 'https://maps.app.goo.gl/hyw1pv2mWE5V2uRG9' },
    { label: 'WhatsApp', icon: '💬', action: 'https://wa.me/917780224863' },
  ];

  /* ── Close on click outside ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (hubRef.current && !hubRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  /* ── Close on Escape ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  /* ── Reset conversation when widget is closed ── */
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setChatInput('');
      setIsTyping(false);
    }
  }, [isOpen]);

  /* ── Auto-scroll chat ── */
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  /* ── Get formatted timestamp ── */
  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  /* ── RAG Chat Handler ── */
  const handleQuerySend = useCallback((textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      sender: 'user', 
      text: textToSend,
      timestamp: getTimestamp()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const queryLower = textToSend.toLowerCase().trim();
      const normalized = queryLower.replace(/[^a-z0-9\s]/g, '');
      const words = normalized.split(/\s+/);

      let botText = "";
      let handoff = false;
      let actions: ChatMessage['actions'] = [];

      // 1. GREETING HANDLING
      const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'namaste'];
      const isGreeting = greetings.some(g => queryLower === g || queryLower.startsWith(g + ' ') || words.includes(g));

      // 2. THANK YOU HANDLING
      const thanks = ['thanks', 'thank you', 'thank you so much', 'awesome', 'great'];
      const isThanks = thanks.some(t => queryLower === t || queryLower.startsWith(t + ' ') || words.includes(t));

      // 3. GOODBYE HANDLING
      const goodbyes = ['bye', 'goodbye', 'see you'];
      const isGoodbye = goodbyes.some(g => queryLower === g || queryLower.startsWith(g + ' ') || words.includes(g));

      // 4. PRICE / STOCK / COMMERCIAL / QUOTATION TRIGGER
      const isPriceOrStock = words.some(w =>
        ['price', 'cost', 'rate', 'pricing', 'amount', 'stock', 'available', 'availability', 'quote', 'quotation', 'discount', 'rs', 'rupees'].includes(w)
      );

      // 5. SMART ROOFING RECOMMENDATION TRIGGER
      const isRoofingRecommendation = words.includes('roofing') && (words.includes('need') || words.includes('want') || words.includes('buy') || words.includes('select') || words.includes('recommend'));

      // 6. OUT OF SCOPE CHECK
      const outOfScopeKeywords = ['movie', 'politics', 'sport', 'programming', 'code', 'javascript', 'python', 'react', 'medical', 'doctor', 'song', 'game', 'homework'];
      const isOutOfScope = outOfScopeKeywords.some(w => words.includes(w));

      if (isGreeting) {
        botText = "👋 Hello!\n\nWelcome to SSN Industries.\n\nI'm your AI Product & Sales Assistant. I can help you with:\n\n🏗 Roofing Sheets\n\n🛠 TMT Rods\n\n🏭 Steel Pipes\n\n📄 Product Specifications\n\n📚 Product Catalogue\n\n🚚 Delivery Areas\n\n📞 Contact Information\n\n💬 Quotation Requests\n\nHow can I help you today?";
      } else if (isThanks) {
        botText = "You're welcome!\n\nI'm always happy to help. If you have any more questions about our products, quotations, or services, feel free to ask.";
      } else if (isGoodbye) {
        botText = "Thank you for visiting SSN Industries.\n\nHave a wonderful day! If you need any assistance in the future, we're always here to help.";
      } else if (isOutOfScope) {
        botText = "I'm specifically designed to help with SSN Industries products and services. If you have questions about roofing sheets, TMT rods, steel products, quotations, delivery, or our company, I'd be happy to assist you.";
      } else if (isRoofingRecommendation) {
        botText = "I'd be happy to help. Could you tell me more about your requirements:\n\n• Is this for a residential project, commercial building, industrial shed, warehouse, or agricultural building?\n• Do you have a preferred colour (Sky Blue, Misted Green, Brick Red, etc.)?\n• What thickness (0.40mm - 0.50mm) or approximate roof area do you require?";
        actions = [
          { label: 'View Roofing Sheets', action: '/products', type: 'link' },
          { label: 'View Product List', action: '/products', type: 'link' }
        ];
      } else if (isPriceOrStock) {
        botText = "For the latest pricing, stock availability, and commercial quotations, our sales team will be happy to assist you.";
        handoff = true;
        actions = [
          { label: 'Call Sales', action: isMobile ? `tel:${mdPhone}` : `/contact?highlight=phone`, type: 'link' },
          { label: 'WhatsApp Sales', action: waUrl, type: 'link' },
          { label: 'Email MD', action: gmailComposeUrl, type: 'link' }
        ];
      } else {
        // Fallback RAG Score lookup
        let bestItem: KnowledgeBaseItem | null = null;
        let bestScore = 0;
        for (const item of KNOWLEDGE_BASE) {
          let score = 0;
          for (const w of words) {
            if (item.keywords.includes(w)) score++;
          }
          if (score > bestScore) { bestScore = score; bestItem = item; }
        }
        if (bestItem && bestScore > 0) {
          botText = bestItem.response;
          actions = bestItem.suggestedActions;
        } else {
          botText = "I'm here to help with everything related to SSN Industries, including our products, quotations, delivery, and company information. For complex custom specifications, bulk quantities, or direct pricing sheets, MD Maddi Bhaskar Rao can assist you directly.";
          handoff = true;
          actions = [
            { label: 'Call Sales', action: isMobile ? `tel:${mdPhone}` : `/contact?highlight=phone`, type: 'link' },
            { label: 'WhatsApp Sales', action: waUrl, type: 'link' },
            { label: 'Email MD', action: gmailComposeUrl, type: 'link' }
          ];
        }
      }

      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botText,
        timestamp: getTimestamp(),
        handoff,
        actions
      }]);
    }, 850);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    handleQuerySend(chatInput);
    setChatInput('');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div ref={hubRef} className="font-inter">
      {/* ═══ MOBILE-ONLY: Standalone WhatsApp button ═══ */}
      <motion.a
        href="https://wa.me/917780224863"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="sm:hidden fixed bottom-[32px] right-[24px] z-50 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl transition-all"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />
        <div className="relative h-7 w-7 z-10">
          <Image src="/images/logos/logo-whatsapp.png" alt="WhatsApp" fill sizes="28px" className="object-contain" />
        </div>
      </motion.a>

      {/* ═══ DESKTOP/TABLET: Hub launcher button ═══ */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex fixed bottom-[32px] right-[24px] z-50 items-center justify-center h-14 w-14 rounded-full bg-[#0F2942] text-white shadow-2xl hover:shadow-[0_8px_30px_rgba(15,41,66,0.5)] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4A017]/40"
        aria-label={isOpen ? "Close SSN Assistant" : "Open SSN Assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Sparkles size={22} className="text-[#D4A017]" />
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-[#D4A017] border-2 border-[#0F2942] rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* ═══ EXPANDED CO-PILOT ASSISTANT PANEL ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden sm:flex fixed bottom-[96px] right-[24px] z-50 w-[380px] h-[640px] flex-col overflow-hidden rounded-[20px] border border-white/20 dark:border-white/10 bg-white/95 dark:bg-[#0F2942]/95 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
          >
            {/* ── Header ── */}
            <div className="bg-[#0F2942] px-5 py-4 flex items-center justify-between border-b border-white/5 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-white border-2 border-[#D4A017] flex items-center justify-center shadow-inner">
                  <Image src="/images/logos/logo-ssn.png" alt="SSN" fill sizes="36px" className="object-contain p-1" />
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-outfit text-sm font-bold text-white block leading-tight tracking-wide">
                      🤖 SSN Assistant
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-emerald-300 font-semibold tracking-wide">Verified Product & Sales Assistant · Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]"
                aria-label="Close Assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Scrollable Chat / Discovery Core ── */}
            <div ref={chatScrollRef} className="flex-grow overflow-y-auto p-5 space-y-6 scrollbar-thin select-text">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5 text-left"
                >
                  {/* Large Welcome Message */}
                  <div className="space-y-2">
                    <h3 className="font-outfit text-xl font-extrabold text-brand-slate dark:text-white leading-tight">
                      Hello 👋
                    </h3>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                      Welcome to SSN Industries.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      I'm your AI Product & Sales Assistant.
                    </p>
                  </div>

                  {/* Scannable Help List */}
                  <div className="text-xs space-y-1.5 text-slate-700 dark:text-gray-300 font-medium">
                    <p>I can help you:</p>
                    <ul className="space-y-1 pl-1">
                      <li>• Find products</li>
                      <li>• Compare roofing sheets</li>
                      <li>• Understand specifications</li>
                      <li>• Learn about TMT rods</li>
                      <li>• Download catalogues</li>
                      <li>• Request quotations</li>
                      <li>• Contact our sales team</li>
                    </ul>
                  </div>

                  {/* Search / Chat Input Box directly inside welcome state */}
                  <form onSubmit={onSubmit} className="pt-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        placeholder="Ask about roofing sheets, TMT rods, quotations..."
                        className="w-full bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl pl-4 pr-10 py-3 text-xs shadow-inner focus:outline-none focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20 transition-all"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0F2942] hover:bg-[#163c61] text-white p-1.5 rounded-full transition-colors flex items-center justify-center focus-visible:outline-none"
                      >
                        <Send size={10} className="text-[#D4A017]" />
                      </button>
                    </div>
                  </form>

                  {/* Suggestion Chips Section */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Popular Topics</span>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTION_CHIPS.map((chip, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ y: -1.5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (chip.action) {
                              if (chip.action.startsWith('http') || chip.action.endsWith('.pdf')) {
                                window.open(chip.action, '_blank');
                              } else {
                                setIsOpen(false);
                                window.location.href = chip.action;
                              }
                            } else if (chip.query) {
                              handleQuerySend(chip.query);
                            }
                          }}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 rounded-full text-[11px] font-semibold text-slate-700 dark:text-gray-300 hover:border-[#D4A017]/40 hover:text-[#D4A017] transition-all cursor-pointer"
                        >
                          <span>{chip.icon}</span>
                          <span>{chip.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-center space-x-1 max-w-[85%] group">
                        {/* Chat bubble */}
                        <div className={`rounded-[18px] px-4 py-3 text-[12.5px] leading-relaxed whitespace-pre-line text-left relative ${
                          msg.sender === 'user'
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-gray-100 rounded-tr-sm shadow-sm'
                            : 'bg-[#0F2942] text-white rounded-tl-sm shadow-md'
                        }`}>
                          {msg.text}
                          
                          {/* Copy icon */}
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="absolute -right-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-brand-amber transition-all cursor-pointer hidden md:block"
                            title="Copy message"
                          >
                            {copiedId === msg.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                          </button>
                        </div>
                      </div>

                      {/* Message Timestamp */}
                      <span className="text-[9px] text-gray-400 dark:text-gray-500 px-1">
                        {msg.timestamp}
                      </span>

                      {/* Smart Context-Aware Actions */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1.5">
                          {msg.actions.map((act, actIdx) => (
                            <a
                              key={actIdx}
                              href={act.action}
                              target={act.action.startsWith('http') || act.action.endsWith('.pdf') ? '_blank' : undefined}
                              rel={act.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="inline-flex items-center space-x-1 px-3 py-1.5 text-[11px] font-bold bg-[#D4A017] text-[#0F2942] hover:bg-[#c49214] rounded-full transition-all duration-200 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none animate-fade-in"
                            >
                              <span>{act.label}</span>
                              <ArrowRight size={10} />
                            </a>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-[#0F2942] text-white rounded-[18px] rounded-tl-sm px-4 py-3 shadow-md flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Search Input (Sticky Bottom when conversation starts) ── */}
            {messages.length > 0 && (
              <div className="px-5 py-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 shrink-0">
                <form onSubmit={onSubmit} className="flex space-x-2">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      placeholder="Ask about roofing sheets, TMT rods, quotations..."
                      className="w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-[#D4A017]/25 rounded-full pl-4.5 pr-12 py-3.5 text-[12.5px] shadow-sm focus:outline-none focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20 transition-all placeholder-slate-400"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0F2942] hover:bg-[#163c61] text-white p-2 rounded-full transition-colors flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] cursor-pointer"
                      aria-label="Send query"
                    >
                      <Send size={12} className="text-[#D4A017]" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Persistent Human Support Footer ── */}
            <div className="px-5 py-4.5 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/60 shrink-0 text-left">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-2">
                Need Immediate Assistance?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Call Sales', icon: <Phone size={13} />, href: isMobile ? `tel:${mdPhone}` : '/contact?highlight=phone', color: 'text-green-500', isLocal: !isMobile },
                  { label: 'WhatsApp', icon: <MessageCircle size={13} />, href: waUrl, color: 'text-[#25D366]', isLocal: false },
                  { label: 'Email', icon: <Mail size={13} />, href: gmailComposeUrl, color: 'text-blue-500', isLocal: false },
                  { label: 'Directions', icon: <MapPin size={13} />, href: 'https://maps.app.goo.gl/hyw1pv2mWE5V2uRG9', color: 'text-rose-500', isLocal: false },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target={item.isLocal ? undefined : "_blank"}
                    rel={item.isLocal ? undefined : "noopener noreferrer"}
                    className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 hover:border-[#D4A017]/30 transition-all text-slate-600 dark:text-gray-400 hover:text-[#D4A017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] shadow-sm hover:-translate-y-0.5"
                  >
                    <span className={`${item.color} h-7 w-7 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center transition-transform hover:scale-105`}>
                      {item.icon}
                    </span>
                    <span className="text-[8px] mt-1.5 font-bold uppercase tracking-wider text-center leading-tight">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
