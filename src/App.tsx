import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Crown,
  Sparkles,
  ShoppingBag,
  Clock,
  Compass,
  ArrowRight,
  Bookmark,
  Calendar,
  Lock,
  MapPin,
  Mail,
  Phone,
  User,
  Trash2,
  CheckCircle,
  AlertTriangle,
  FileText,
  ChevronRight,
  Eye,
  Settings
} from "lucide-react";
import { PRODUCTS, BRAND_LOGO_URL } from "./data";
import { Product, CartItem, AppointmentRequest } from "./types";
import CuratorEye from "./components/CuratorEye";
import ProductDetails from "./components/ProductDetails";
import ShowroomCameraWalkthrough from "./components/ShowroomCameraWalkthrough";
import CoutureAtelierRoom from "./components/CoutureAtelierRoom";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [lang, setLang] = useState<"ar" | "en">("ar"); // Default to Arabic as requested by user
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"all" | "jewelry" | "watch" | "couture" | "ring">("all");

  // Dynamic Room Navigation State
  const [currentRoom, setCurrentRoom] = useState<"grand-foyer" | "couture-atelier" | "curator-office">("grand-foyer");

  // Dynamic Products state loaded from LocalStorage or PRODUCTS
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("perfect_showroom_products");
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch (e) {
      return PRODUCTS;
    }
  });

  // Private Consultation State
  const [appointment, setAppointment] = useState<AppointmentRequest>({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "14:00",
    interests: []
  });
  const [isApptSubmitted, setIsApptSubmitted] = useState(false);
  const [apptReceipt, setApptReceipt] = useState<string>("");

  const handleToggleLang = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const handleAddToWishlist = (newItem: CartItem) => {
    setWishlist((prev) => {
      // Avoid duplicate items
      const exists = prev.some((item) => item.product.id === newItem.product.id && 
                      JSON.stringify(item.customization) === JSON.stringify(newItem.customization));
      if (exists) return prev;
      return [...prev, newItem];
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (id: string) => {
    setAppointment((prev) => {
      const exists = prev.interests.includes(id);
      const newInterests = exists
        ? prev.interests.filter((item) => item !== id)
        : [...prev.interests, id];
      return { ...prev, interests: newInterests };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment.fullName || !appointment.email || !appointment.phone || !appointment.preferredDate) {
      return;
    }
    const token = `PASS-PRFT-${Math.floor(1000 + Math.random() * 9000)}`;
    setApptReceipt(token);
    setIsApptSubmitted(true);
  };

  const resetAppointmentForm = () => {
    setAppointment({
      fullName: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "14:00",
      interests: []
    });
    setIsApptSubmitted(false);
    setApptReceipt("");
  };

  const handlePublishProduct = (newProduct: Product) => {
    setProductsList((prev) => {
      const updated = [newProduct, ...prev];
      localStorage.setItem("perfect_showroom_products", JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetProducts = () => {
    setProductsList(PRODUCTS);
    localStorage.removeItem("perfect_showroom_products");
  };

  // Filter products by category
  const filteredProducts = activeCategory === "all"
    ? productsList
    : productsList.filter((p) => p.category === activeCategory);

  return (
    <div className={`min-h-screen bg-[#030303] text-[#e5e5e5] select-none overflow-x-hidden selection:bg-brand-gold selection:text-black ${lang === "ar" ? "rtl font-sans" : "ltr font-serif"}`}>
      
      {/* Immersive background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Soft gold side laser light stripes */}
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-gradient-to-b from-transparent via-brand-gold/15 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-gradient-to-b from-transparent via-brand-gold/15 to-transparent"></div>
        
        {/* Floor dark marble texture simulator */}
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* FIXED HEADER: Backdrop blur bar (Only shown when not in Grand Foyer) */}
      {currentRoom !== "grand-foyer" && (
        <header className="sticky top-0 z-40 bg-[#030303]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 relative">
            
            {/* LEFT: Branding with interactive miniature Eye avatar */}
            <div className="flex items-center gap-3.5">
              <span className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-gold/30 flex items-center justify-center bg-black/80 group">
                <img
                  src={BRAND_LOGO_URL}
                  alt="Perfect Logo"
                  className="w-[124%] h-[124%] object-cover scale-110 group-hover:rotate-12 duration-500 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </span>
              <div className="flex flex-col select-none">
                <h1 className="font-serif text-base md:text-lg font-normal text-white tracking-[0.25em] leading-none uppercase">
                  PERFECT <span className="text-brand-gold">STORE</span>
                </h1>
                <span className="font-mono text-[8px] text-[#E5E5E5]/40 tracking-widest uppercase mt-1">
                  {lang === "ar" ? "صالة التجول التفاعلي ثلاثي الأبعاد" : "Interactive 3D Showroom Sanctum"}
                </span>
              </div>
            </div>

            {/* CENTER: Majestic Room Navigation Tab Bar (Dynamic Website structure built around the virtual 3D tour) */}
            <div className="flex items-center gap-1 bg-black/60 border border-white/10 rounded-full p-1 shadow-inner">
              {[
                { id: "grand-foyer", label: lang === "ar" ? "البهو الرئيسي" : "Grand Foyer" },
                { id: "couture-atelier", label: lang === "ar" ? "أتيلييه الفساتين" : "Dress Room" },
                { id: "curator-office", label: lang === "ar" ? "منصة التحكم والمشرف" : "Curator Sanctuary" }
              ].map((room) => (
                <button
                  key={room.id}
                  onClick={() => setCurrentRoom(room.id as any)}
                  className={`px-4 py-2 rounded-full text-[10.5px] font-mono transition-all duration-300 font-medium cursor-pointer tracking-wider uppercase ${
                    currentRoom === room.id
                      ? "bg-brand-gold text-black font-bold shadow-[0_2px_15px_rgba(212,175,55,0.25)]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {room.label}
                </button>
              ))}
            </div>

            {/* RIGHT: Controls (Wishlist drawer trigger, Language switcher) */}
            <div className="flex items-center gap-3">
              {/* Language toggle switch */}
              <button
                onClick={handleToggleLang}
                className="bg-transparent hover:bg-white/5 text-[9px] font-mono px-3.5 py-2 rounded-full border border-white/10 text-white/60 hover:text-brand-gold duration-300 transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-widest"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold inline-block"></span>
                {lang === "ar" ? "English" : "العربية"}
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 bg-transparent hover:bg-white/5 rounded-full border border-white/15 hover:border-brand-gold/30 text-white/50 hover:text-brand-gold transition-all duration-300 cursor-pointer"
                title={lang === "ar" ? "خزانتك المخصصة" : "Your Showcase Locker"}
              >
                <ShoppingBag className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-black font-mono font-medium text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* 3D ROOM ROUTER CONTROLLER */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          
          {/* ROOM 1: GRAND SHOWROOM FOYER */}
          {currentRoom === "grand-foyer" && (
            <motion.div
              key="grand-foyer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="relative w-full h-screen overflow-hidden"
            >
              {/* Immersive Walkthrough view */}
              <ShowroomCameraWalkthrough
                lang={lang}
                products={productsList}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onScrollToConsult={() => setCurrentRoom("curator-office")}
                onEnterCoutureRoom={() => setCurrentRoom("couture-atelier")}
                wishlist={wishlist}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={removeFromWishlist}
                appointment={appointment}
                onAppointmentChange={handleFormChange}
                onAppointmentInterestToggle={handleInterestToggle}
                onAppointmentSubmit={handleFormSubmit}
                isApptSubmitted={isApptSubmitted}
                apptReceipt={apptReceipt}
                onResetAppointment={resetAppointmentForm}
              />
            </motion.div>
          )}

          {/* ROOM 2: CINEMATIC DRESS SHOWROOM (COUTURE ATELIER) */}
          {currentRoom === "couture-atelier" && (
            <motion.div
              key="couture-atelier"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="w-full h-full"
            >
              <CoutureAtelierRoom
                lang={lang}
                products={productsList}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onGoBack={() => setCurrentRoom("grand-foyer")}
              />
            </motion.div>
          )}

          {/* ROOM 3: SECURED CURATOR OFFICE & ADMIN CRYPT */}
          {currentRoom === "curator-office" && (
            <motion.div
              key="curator-office"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.55 }}
              className="py-10 max-w-7xl mx-auto px-6 space-y-16"
            >
              
              {/* CURATOR AI CONSOLE SECT: The interactive sentinel desk */}
              <section className="bg-black/40 border border-white/10 rounded-[32px] py-12 relative overflow-hidden">
                <CuratorEye
                  lang={lang}
                  selectedProduct={selectedProduct || undefined}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  products={productsList}
                />
              </section>

              {/* THE ADMIN CONTROL CHAMBER: To publish custom dresses onto mannequins immediately */}
              <section id="admin-crypt">
                <AdminPanel
                  lang={lang}
                  onPublishProduct={handlePublishProduct}
                  existingCount={productsList.length}
                  onResetProducts={handleResetProducts}
                />
              </section>

              {/* PRIVATE SCHEDULER & PASS COMPILER */}
              <section className="bg-[#0c0c0c]/80 border border-white/10 rounded-[32px] p-8 md:p-12 relative" id="consultation">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* LEFT: Personalized Collection Closet */}
                  <div className="col-span-12 lg:col-span-5 space-y-6">
                    <span className="text-brand-gold font-mono text-[9px] uppercase tracking-[0.25em] block">
                      {lang === "ar" ? "خزانتك الخاصة المنسقة" : "Personal Showroom Locker"}
                    </span>
                    <h3 className="font-serif text-3xl md:text-5xl font-light text-neutral-100">
                      {lang === "ar" ? "قطعك المفضلة والمخصصة" : "My Private Closet"}
                    </h3>
                    <p className="font-sans text-white/50 text-xs md:text-sm leading-relaxed font-light">
                      {lang === "ar"
                        ? "في متجر PERFECT STORE، تصاميمك المخصصة تحفظ خصيصاً في خزانة الصرح للبحث والمراجعة. احصل على كود admission حصري لحمل تطلعات صياغتك والتواصل الفعلي."
                        : "Your bespoke configurations are kept temporarily inside this private locker block. Generate custom specification passes and reference codes for physical consulting in Rome/Milan boutiques."}
                    </p>

                    <div className="space-y-4 pt-4">
                      {wishlist.length === 0 ? (
                        <div className="border border-dashed border-white/10 p-8 rounded-2xl text-center font-mono text-white/40 text-xs space-y-3 bg-[#0C0C0C]">
                          <Lock className="w-5 h-5 text-white/30 mx-auto" />
                          <p>{lang === "ar" ? "لم ترسل قطعاً مخصصة لخزانتك بعد" : "No custom designs certified yet"}</p>
                          <p className="text-[10px] text-white/20">
                            {lang === "ar" ? "تفضل بفتح تفاصيل منتج لصياغة صك الأتيلييه." : "Open any product specification to generate an authenticity certificate."}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3.5">
                          {wishlist.map((item) => (
                            <div
                              key={item.id}
                              className="bg-black/60 border border-white/10 rounded-2xl p-4 flex gap-4 items-center justify-between shadow-md relative overflow-hidden"
                            >
                              <div className="flex items-center gap-3.5">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-12 h-12 rounded-lg object-cover border border-white/10"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="space-y-0.5">
                                  <h5 className="font-serif text-sm text-white/95">
                                    {lang === "ar" ? item.product.nameAr : item.product.name}
                                  </h5>
                                  <span className="font-mono text-[10px] text-brand-gold">{item.product.price}</span>
                                  <p className="text-[9px] text-white/40 font-mono">
                                    {item.customization?.metalOrFabric} • {item.customization?.gemstoneOrThread}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="text-white/40 hover:text-red-400 hover:bg-white/5 duration-200 p-1.5 rounded transition-all cursor-pointer"
                                title={lang === "ar" ? "إزالة القطعة" : "Discard specimen"}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: Scheduled Showroom Appointment Reservation Form */}
                  <div className="col-span-12 lg:col-span-7 bg-[#050505] border border-white/10 rounded-[32px] p-6 md:p-10 relative">
                    <div className="absolute top-0 right-12 w-32 h-[1px] bg-brand-gold/30"></div>

                    {!isApptSubmitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div>
                          <span className="text-brand-gold font-mono text-[9px] uppercase tracking-[0.25em] block mb-1">
                            {lang === "ar" ? "قسم الاستقبال وحجز الميعاد" : "CONSULTATION SERVICES"}
                          </span>
                          <h4 className="font-serif text-xl md:text-2xl text-neutral-100 font-normal">
                            {lang === "ar" ? "طلب تنظيم زيارة خاصة للمعرض" : "Request Private Showroom Admission"}
                          </h4>
                          <p className="text-xs text-white/45 mt-1.5 font-sans leading-relaxed">
                            {lang === "ar"
                              ? "يسر موظفي PERFECT STORE استقبال النخبة لتجربة القطع الحقيقية تحت مرافقة منسقك الشخصي المعتمد."
                              : "We look forward organizing custom physical reviews of authenticated unique pieces accompanied by certified specialists."}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                          <div>
                            <label className="text-white/45 block mb-1.5 uppercase font-mono text-[8px] tracking-wider">
                              {lang === "ar" ? "الاسم الكامل الثنائي:" : "Full Name:"}
                            </label>
                            <div className="relative">
                              <User className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-white/35" />
                              <input
                                type="text"
                                name="fullName"
                                value={appointment.fullName}
                                onChange={handleFormChange}
                                placeholder={lang === "ar" ? "السيد / السيدة الموقرة" : "e.g. Romario de Perfection"}
                                required
                                className={`w-full bg-black/40 border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 text-white placeholder-white/25 ${lang === 'ar' ? 'pr-3 pl-10' : 'pl-10 pr-3'}`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-white/45 block mb-1.5 uppercase font-mono text-[8px] tracking-wider">
                              {lang === "ar" ? "البريد الإلكتروني المباشر:" : "Primary Email:"}
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-white/35" />
                              <input
                                type="email"
                                name="email"
                                value={appointment.email}
                                onChange={handleFormChange}
                                placeholder="vip@perfectstore.com"
                                required
                                className={`w-full bg-black/40 border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 text-white placeholder-white/25 ${lang === 'ar' ? 'pr-3 pl-10' : 'pl-10 pr-3'}`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-white/45 block mb-1.5 uppercase font-mono text-[8px] tracking-wider">
                              {lang === "ar" ? "رقم الهاتف والاتصال السريع:" : "Phone / Direct Line:"}
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-white/35" />
                              <input
                                type="tel"
                                name="phone"
                                value={appointment.phone}
                                onChange={handleFormChange}
                                placeholder="+966 50 000 000"
                                required
                                className={`w-full bg-black/40 border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 text-white placeholder-white/25 ${lang === 'ar' ? 'pr-3 pl-10' : 'pl-10 pr-3'}`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-white/45 block mb-1.5 uppercase font-mono text-[8px] tracking-wider">
                              {lang === "ar" ? "تاريخ الزيارة المقترح:" : "Suggested Date:"}
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-white/35" />
                              <input
                                type="date"
                                name="preferredDate"
                                value={appointment.preferredDate}
                                onChange={handleFormChange}
                                required
                                className={`w-full bg-black/40 border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 text-white placeholder-white/25 ${lang === 'ar' ? 'pr-3 pl-10' : 'pl-10 pr-3'}`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Checklist selection of interest products */}
                        <div className="space-y-3 font-sans text-xs">
                          <label className="text-white/45 block uppercase font-mono text-[8px] tracking-wider">
                            {lang === "ar" ? "المقتنيات الفريدة محل الرغبة والاهتمام:" : "Masterpieces holding your interest:"}
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {productsList.map((p) => {
                              const isSelected = appointment.interests.includes(p.id);
                              return (
                                <div
                                  key={p.id}
                                  onClick={() => handleInterestToggle(p.id)}
                                  className={`border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all duration-300 font-sans text-xs ${
                                    isSelected
                                      ? "bg-brand-gold/10 border-brand-gold/35 text-brand-gold font-medium"
                                      : "bg-black/35 border-white/10 text-white/60 hover:bg-white/5"
                                  }`}
                                >
                                  <span className="truncate max-w-[170px] block font-light">
                                    {lang === "ar" ? p.nameAr : p.name}
                                  </span>
                                  <span className="font-mono text-[9px] text-white/45">{p.price}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-brand-gold hover:bg-white text-black font-mono text-center uppercase tracking-[0.2em] py-4 rounded-full transition-all duration-300 font-bold shadow-[0_4px_30px_rgba(212,175,55,0.15)] cursor-pointer text-xs"
                        >
                          {lang === "ar" ? "طلب جدولة الزيارة الخاصة وتوثيق المستند" : "Issue Invitation and Finalize Details"}
                        </button>
                      </form>
                    ) : (
                      // Display Printable VIP invitation certificate
                      <div className="space-y-6 text-center py-6">
                        <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto">
                          <CheckCircle className="w-6 h-6 text-brand-gold" />
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-serif text-2xl text-neutral-100">
                            {lang === "ar" ? "تم حفر رمز الدخول وتوثيق الميعاد" : "VIP Invitation Confirmed"}
                          </h4>
                          <p className="text-white/50 text-xs md:text-sm max-w-lg mx-auto font-sans leading-relaxed font-light">
                            {lang === "ar"
                              ? "تمت جدولة طلبكم بنجاح ومزامنته مع فرع الصياغة التابع للرمز التسلسلي لـ PERFECT. يسعدنا استقبالكم قريباً."
                              : "Your request has been filed with the respective Roman and Milanese vaults. Certified representatives will contact you shortly."}
                          </p>
                        </div>

                        {/* Dynamic Golden Admittance Pass */}
                        <div className="border border-brand-gold/30 bg-[#080808] rounded-2xl p-6 relative overflow-hidden text-left font-serif shadow-2xl">
                          {/* Decorative corner lines inside badge */}
                          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-brand-gold/25"></div>
                          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-brand-gold/25"></div>

                          <div className="border border-dashed border-brand-gold/10 p-4 space-y-4 font-sans text-xs">
                            <div className="flex justify-between items-center text-[8px] font-mono uppercase text-brand-gold tracking-widest">
                              <span>PERFECT SHOWROOM SHOWCASE PASS</span>
                              <span>{apptReceipt}</span>
                            </div>

                            <div className="text-center font-serif text-xs uppercase tracking-[0.25em] text-neutral-100 pb-2 border-b border-white/10">
                              EXCLUSIVE ADMISSION CREDENTIAL
                            </div>

                            <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 pt-2 text-[11px]">
                              <div>
                                <span className="text-white/40 font-mono text-[8px] uppercase block tracking-wider">HOLDER NAME</span>
                                <span className="text-white/90 font-medium">{appointment.fullName}</span>
                              </div>
                              <div>
                                <span className="text-white/40 font-mono text-[8px] uppercase block tracking-wider">COMMUNICATION</span>
                                <span className="text-white/90 truncate block">{appointment.email}</span>
                              </div>
                              <div>
                                <span className="text-white/40 font-mono text-[8px] uppercase block tracking-wider">SCHEDULED DATE</span>
                                <span className="text-white/95">{appointment.preferredDate} @ {appointment.preferredTime}</span>
                              </div>
                              <div>
                                <span className="text-white/40 font-mono text-[8px] uppercase block tracking-wider">MAPPED LOCATION</span>
                                <span className="text-brand-gold font-medium flex items-center gap-1">
                                  <MapPin className="w-3 h-3 animate-bounce" />
                                  Rome Luxury Vault
                                </span>
                              </div>
                            </div>

                            {appointment.interests.length > 0 && (
                              <div className="border-t border-white/10 pt-3">
                                <span className="text-white/40 font-mono text-[8px] uppercase block tracking-wider mb-1">INTEREST SPECTRA</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {appointment.interests.map((id) => {
                                    const pObj = productsList.find((p) => p.id === id);
                                    return (
                                      <span key={id} className="bg-black/60 border border-white/10 px-2.5 py-1 rounded text-[10px] text-white/80">
                                        {lang === 'ar' ? pObj?.nameAr : pObj?.name}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            <div className="flex justify-between items-center border-t border-white/10 pt-3 font-mono text-[7px] text-white/30">
                              <span>ISSUER: SENTINEL PROTOCOLS V.3</span>
                              <span>© PERFECT INC.</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2 justify-center">
                          <button
                            onClick={resetAppointmentForm}
                            className="bg-transparent hover:bg-white/5 border border-white/10 text-brand-gold font-mono text-xs px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer uppercase tracking-wider"
                          >
                            {lang === "ar" ? "تسجيل موعد جديد" : "Schedule Another Consult"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* MOBILE FLOATING NAVIGATION PILL: For convenient, gorgeous room exploration */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden block w-auto max-w-sm px-6">
        <div className="flex items-center gap-1 bg-black/90 backdrop-blur-xl border border-brand-gold/30 rounded-full p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
          {[
            { id: "grand-foyer", label: lang === "ar" ? "البوابة" : "Foyer" },
            { id: "couture-atelier", label: lang === "ar" ? "الفساتين" : "Atelier" },
            { id: "curator-office", label: lang === "ar" ? "المشرف" : "Curator" }
          ].map((room) => (
            <button
              key={room.id}
              onClick={() => setCurrentRoom(room.id as any)}
              className={`px-4 py-2 rounded-full text-[10px] font-mono font-medium transition-all duration-300 cursor-pointer uppercase tracking-wider ${
                currentRoom === room.id
                  ? "bg-brand-gold text-black font-extrabold"
                  : "text-white/45 hover:text-white"
              }`}
            >
              {room.label}
            </button>
          ))}
        </div>
      </div>

      {/* LUXURY FOOTER */}
      <footer className="bg-[#050505] border-t border-white/10 py-12 text-center text-xs relative font-sans text-white/40 mt-16 space-y-4">
        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row md:justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full overflow-hidden border border-brand-gold/30 flex items-center justify-center bg-black/60 scale-90">
              <img src={BRAND_LOGO_URL} alt="logo" className="w-[124%] h-[124%] object-cover scale-110" referrerPolicy="no-referrer" />
            </span>
            <span className="font-serif tracking-[0.2em] uppercase text-white/95 text-sm">
              PERFECT <span className="text-brand-gold">STORE</span>
            </span>
          </div>

          <div className="flex gap-5 text-white/45 uppercase tracking-widest font-mono text-[8px]">
            <span className="hover:text-brand-gold duration-300 cursor-pointer transition-colors">Rome Atelier</span>
            <span className="hover:text-brand-gold duration-300 cursor-pointer transition-colors">Milano Vault</span>
            <span className="hover:text-brand-gold duration-300 cursor-pointer transition-colors">Paris Sanctuary</span>
          </div>

          <p className="font-mono text-[8px] tracking-widest text-white/20 uppercase">
            {lang === "ar" ? "قوانين الندرة والرفاهية المطلقة © ٢٠٢٦" : "Sovereign Laws of Absolute Craftsmanship © 2026"}
          </p>
        </div>
      </footer>

      {/* DEEP DETAILED INSPECTION SLIDEOVER MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            lang={lang}
            onClose={() => setSelectedProduct(null)}
            onAddToWishlist={handleAddToWishlist}
          />
        )}
      </AnimatePresence>

      {/* WISHLIST SIDE DRAWER PANEL */}
      <AnimatePresence>
        {isWishlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#090909] border-l border-white/10 h-full p-8 flex flex-col justify-between shadow-2xl relative"
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-6">
                  <h3 className="font-serif text-lg font-light text-white flex items-center gap-2">
                    <ShoppingBag className="w-4.5 h-4.5 text-brand-gold animate-bounce" />
                    {lang === "ar" ? "خزانتك المخصصة" : "My Active Curations"}
                  </h3>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="text-white/40 hover:text-brand-gold font-mono text-xs uppercase cursor-pointer transition-colors"
                  >
                    [{lang === "ar" ? "إغلاق" : "Close"}]
                  </button>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[62vh] pr-1 scrollbar-thin scrollbar-thumb-neutral-850">
                  {wishlist.length === 0 ? (
                    <div className="text-center py-20 text-white/30 font-mono text-xs space-y-3">
                      <Lock className="w-7 h-7 mx-auto text-white/20 animate-pulse" />
                      <p>{lang === "ar" ? "خزانتك المخصصة لا تزال فارغة" : "Your showcase locker is currently vacant"}</p>
                    </div>
                  ) : (
                    wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="bg-black/40 border border-white/10 rounded-2xl p-4 flex gap-4 items-center justify-between hover:border-brand-gold/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-serif text-sm font-light text-white leading-tight">
                              {lang === "ar" ? item.product.nameAr : item.product.name}
                            </h4>
                            <span className="font-mono text-xs text-brand-gold">{item.product.price}</span>
                            <p className="text-[9px] text-[#D4AF37]/60 font-mono">
                              {item.customization?.metalOrFabric} • {item.customization?.gemstoneOrThread}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-white/35 hover:text-red-400 p-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {wishlist.length > 0 && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setCurrentRoom("curator-office");
                      setTimeout(() => {
                        const el = document.getElementById("consultation");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 400);
                    }}
                    className="block w-full bg-brand-gold hover:bg-white text-black font-bold uppercase tracking-[0.15em] font-mono py-3.5 rounded-full text-center text-xs duration-300 cursor-pointer"
                  >
                    {lang === "ar" ? "حجز ميعاد المعاينة الخاصة" : "Book Private Consult"}
                  </button>
                  <p className="font-mono text-[9px] text-white/40 text-center uppercase tracking-wider">
                    {lang === "ar" ? "سيتم توثيق القطع تلقائياً في تذكرة الاستقبال" : "Items auto-linked to VIP pass"}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
