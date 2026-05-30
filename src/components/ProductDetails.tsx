import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Compass, Shield, Sun, Moon, Sunrise, Eye, Volume2, Bookmark, Check } from "lucide-react";
import { Product, CustomizationOptions, CartItem } from "../types";
import { GENERAL_GEMSTONES, GENERAL_METALS } from "../data";

interface ProductDetailsProps {
  product: Product;
  lang: "ar" | "en";
  onClose: () => void;
  onAddToWishlist: (item: CartItem) => void;
}

type LightingPreset = "midnight" | "sunset" | "dawn";

export default function ProductDetails({ product, lang, onClose, onAddToWishlist }: ProductDetailsProps) {
  // Config state
  const [selectedMetal, setSelectedMetal] = useState(lang === "ar" ? GENERAL_METALS[0].nameAr : GENERAL_METALS[0].name);
  const [selectedGem, setSelectedGem] = useState(lang === "ar" ? GENERAL_GEMSTONES[0].nameAr : GENERAL_GEMSTONES[0].name);
  const [engraving, setEngraving] = useState("");
  
  // Immersive variables
  const [lighting, setLighting] = useState<LightingPreset>("midnight");
  const [customized, setCustomized] = useState(false);
  const [certificateSerial, setCertificateSerial] = useState("");
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Zoom magnifier refs - disabled as per user request
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disabled to stop any magnification or mouse interaction overlays
  };

  const triggerCustomization = (e: React.FormEvent) => {
    e.preventDefault();
    const serial = `PERFECT-${product.id.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setCertificateSerial(serial);
    setCustomized(true);
  };

  const handleWishlistAdd = () => {
    const item: CartItem = {
      id: `cart-${Date.now()}`,
      product: product,
      customization: {
        metalOrFabric: selectedMetal,
        gemstoneOrThread: selectedGem,
        engravingOrPattern: engraving || (lang === "ar" ? "لا يوجد نقش" : "No specialized engraving")
      },
      timestamp: Date.now()
    };
    onAddToWishlist(item);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  // Environment styled background based on showroom states
  const getBGGradient = () => {
    switch (lighting) {
      case "sunset":
        return "bg-gradient-to-br from-[#080808] via-amber-950/20 to-[#0c0c0c] shadow-[inset_0_0_100px_rgba(212,175,55,0.03)]";
      case "dawn":
        return "bg-gradient-to-br from-[#080808] via-cyan-950/15 to-[#0c0c0c] shadow-[inset_0_0_100px_rgba(6,182,212,0.02)]";
      case "midnight":
      default:
        return "bg-gradient-to-br from-[#0c0c0c] via-[#080808] to-[#0c0c0c]";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#080808]/95 backdrop-blur-xl transition-all duration-300 font-serif selection:bg-brand-gold selection:text-black">
      
      {/* Decorative corners matching Elegant Dark boutique */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-white/10 pointer-events-none"></div>
      <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-white/10 pointer-events-none"></div>
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-white/10 pointer-events-none"></div>
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-white/10 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={`w-full max-w-7xl rounded-[36px] border border-white/10 p-8 md:p-12 relative ${getBGGradient()} overflow-hidden`}
      >
        {/* Floating background glowing spot */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none"></div>

        {/* Action Header bar */}
        <div className="flex justify-between items-center mb-8 relative z-10 border-b border-white/10 pb-5">
          <button
            onClick={onClose}
            className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 hover:text-brand-gold transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <span className="group-hover:-translate-x-1 duration-200 block">←</span>
            {lang === "ar" ? "العودة للمعرض العام" : "Return to Vault"}
          </button>

          {/* Showroom Lighting Switcher (The interactive showcase controller) */}
          <div className="flex bg-[#080808] rounded-xl p-1 border border-white/10 items-center gap-1">
            <span className="text-[10px] font-mono text-white/45 uppercase px-3 cursor-default select-none hidden md:inline tracking-[0.15em]">
              {lang === "ar" ? "بيئة العرض:" : "Lighting atmosphere:"}
            </span>
            <button
              onClick={() => setLighting("midnight")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                lighting === "midnight" ? "bg-white/5 text-brand-gold border border-white/10" : "text-white/40 hover:text-white"
              }`}
              title="Midnight Spotlight"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLighting("sunset")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                lighting === "sunset" ? "bg-white/5 text-amber-500 border border-white/10" : "text-white/40 hover:text-white"
              }`}
              title="Warm Sunset"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLighting("dawn")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                lighting === "dawn" ? "bg-white/5 text-cyan-500 border border-white/10" : "text-white/40 hover:text-white"
              }`}
              title="Dawn Sparkle"
            >
              <Sunrise className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
          
          {/* LEFT: Masterpiece Inspection Showcase Panel with detailed magnifier */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="space-y-1">
              <span className="text-brand-gold font-mono text-[10px] uppercase tracking-[0.3em] leading-none mb-1 block">
                {lang === "ar" ? product.categoryAr : product.category.toUpperCase()}
              </span>
              <h1 className="text-2xl md:text-4xl text-white font-normal leading-tight font-serif mt-1">
                {lang === "ar" ? product.nameAr : product.name}
              </h1>
              <p className="text-xl md:text-2xl text-brand-gold font-light mt-1 font-mono">{product.price}</p>
            </div>

            {/* Immersive interactive visual image container with Zoom Lens magnifier overlay */}
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setShowMagnifier(false)}
              className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 group select-none shadow-[2px_10px_40px_rgba(0,0,0,0.8)] cursor-zoom-in"
            >
              {/* Overlay shadow to adapt to ambient lighting selection */}
              <div
                className={`absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none ${
                  lighting === "sunset"
                    ? "bg-amber-600/10 mix-blend-color-burn opacity-100"
                    : lighting === "dawn"
                    ? "bg-cyan-500/10 mix-blend-overlay opacity-100"
                    : "opacity-0"
                }`}
              ></div>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Laser focus status indicators */}
              <div className="absolute top-4 left-4 bg-[#080808]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 font-mono text-[9px] text-brand-gold tracking-[0.2em] uppercase">
                <Shield className="w-3 h-3 text-brand-gold" />
                {lang === "ar" ? product.rarityAr : product.rarity}
              </div>

              <div className="absolute bottom-4 inset-x-4 bg-[#080808]/85 backdrop-blur-sm p-3 border border-brand-gold/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center font-mono text-[9px] text-[#D4AF37] tracking-widest uppercase">
                {lang === "ar" ? "تفاصيل التحفة الفنية مصاغة بأعلى درجات الدقة والكمال" : "Masterpiece craftsmanship made with absolute precision"}
              </div>

              {/* Magnifier Zoom circle */}
              {showMagnifier && (
                <div
                  className="absolute pointer-events-none w-36 h-36 rounded-full border-2 border-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.4),_inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden"
                  style={{
                    left: magnifierPos.x - 72,
                    top: magnifierPos.y - 72,
                  }}
                >
                  <div
                    className="w-[400%] h-[400%] absolute bg-no-repeat"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: '400% 400%',
                      backgroundPosition: `${magnifierPos.bgX}% ${magnifierPos.bgY}%`,
                    }}
                  ></div>
                </div>
              )}
            </div>

            {/* Micro Details tags */}
            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <div className="bg-[#080808] p-3 rounded-xl border border-white/10">
                <span className="text-[9px] text-white/40 uppercase block mb-1 tracking-wider">
                  {lang === "ar" ? "معيار الصياغة" : "Craftsmanship Level"}
                </span>
                <span className="text-white/80 text-[11px] truncate block font-sans">
                  {lang === "ar" ? "صياغة يدوية نقية" : "Pure Artisanal"}
                </span>
              </div>
              <div className="bg-[#080808] p-3 rounded-xl border border-white/10">
                <span className="text-[9px] text-white/40 uppercase block mb-1 tracking-wider">
                  {lang === "ar" ? "مقر الصياغة" : "Atelier Origin"}
                </span>
                <span className="text-white/80 text-[11px] truncate block font-sans">
                  {lang === "ar" ? "روما وميلان" : "Rome & Milan"}
                </span>
              </div>
            </div>
          </div>

          {/* CENTRE-RIGHT: Product Specifications and custom configurations */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Detailed narrative tabs */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-[0.25em] text-brand-gold uppercase pb-2.5 border-b border-white/10 flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-gold" />
                {lang === "ar" ? "رواية التحفة وتفاصيل المواد" : "The Narrative & Material Profiles"}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line font-sans font-light">
                {lang === "ar" ? product.descriptionAr : product.description}
              </p>
              <blockquote className="border-l-2 border-brand-gold/40 pl-4 py-1.5 italic text-white/50 text-[12px] font-sans">
                {lang === "ar" ? product.storyAr : product.story}
              </blockquote>
            </div>

            {/* Spec grid bulletpoints */}
            <div className="bg-[#080808] p-5 rounded-2xl border border-white/10 space-y-3">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] block border-b border-white/10 pb-2">
                {lang === "ar" ? "المواصفات الجوهرية" : "Intrinsic Gemological Specs"}
              </span>
              <ul className="space-y-2.5 font-sans">
                {(lang === "ar" ? product.detailsAr : product.details).map((detail, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs text-white/70 leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 mt-1.5 flex-shrink-0"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Atelier: Custom Engravings & Alloy configurations */}
            <div className="bg-[#080808] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.2em]">
                  {lang === "ar" ? "ورشة التخصيص بالأتيلييه" : "THE ATELIER PERSONALIZATION"}
                </span>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  {lang === "ar" ? "إصدار فريد معزز بالهوية" : "Authenticity Verified"}
                </span>
              </div>

              <form onSubmit={triggerCustomization} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Select Metal grade */}
                  <div>
                    <label className="text-white/40 block mb-1.5 font-mono text-[9px] tracking-wider uppercase">
                      {lang === "ar" ? "سبيكة صب الهيكل / النسيج:" : "Structural Alloy / Body Fabric:"}
                    </label>
                    <select
                      value={selectedMetal}
                      onChange={(e) => setSelectedMetal(e.target.value)}
                      className="w-full bg-[#0c0c0c] border border-white/10 rounded-lg p-3 text-white/80 focus:outline-none focus:border-brand-gold/40 text-xs"
                    >
                      {GENERAL_METALS.map((metal) => (
                        <option key={metal.id} value={lang === "ar" ? metal.nameAr : metal.name}>
                          {lang === "ar" ? metal.nameAr : metal.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select secondary Gemstone profile */}
                  <div>
                    <label className="text-white/40 block mb-1.5 font-mono text-[9px] tracking-wider uppercase">
                      {lang === "ar" ? "ترصيع الحجر الثانوي / خيط الحياكة:" : "Secondary Stone Accent / Weave thread:"}
                    </label>
                    <select
                      value={selectedGem}
                      onChange={(e) => setSelectedGem(e.target.value)}
                      className="w-full bg-[#0c0c0c] border border-white/10 rounded-lg p-3 text-white/80 focus:outline-none focus:border-brand-gold/40 text-xs"
                    >
                      {GENERAL_GEMSTONES.map((gem) => (
                        <option key={gem.id} value={lang === "ar" ? gem.nameAr : gem.name}>
                          {lang === "ar" ? gem.nameAr : gem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Signature text engraving input */}
                <div>
                  <label className="text-white/40 block mb-1.5 font-mono text-[9px] tracking-wider uppercase">
                    {lang === "ar" ? "نقش الشعار / عبارة التوقيع الشخصي (بحدود 25 حرفاً):" : "Personal Signature Engraving / Custom Initials (max 25 chars):"}
                  </label>
                  <input
                    type="text"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value.substring(0, 25))}
                    placeholder={lang === "ar" ? "مثال: PERFECT TO ROMA" : "e.g. PERFECT TO MILANO"}
                    className="w-full bg-[#0c0c0c] border border-white/10 rounded-lg p-3 text-white/80 focus:outline-none focus:border-brand-gold/40 placeholder-white/20 text-xs"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-brand-gold text-black hover:bg-white font-mono text-center uppercase tracking-[0.2em] text-[11px] font-bold py-3.5 rounded-full transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    {lang === "ar" ? "تصدير صك الأصالة والمطابقة" : "Generate Custom Design Certificate"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleWishlistAdd}
                    className="bg-[#0c0c0c] hover:bg-white/5 text-brand-gold border border-white/10 hover:border-brand-gold/30 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {addedSuccess ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </form>

              {/* Show Success toast */}
              <AnimatePresence>
                {addedSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-center text-xs font-mono"
                  >
                    {lang === "ar"
                      ? "تم تخزين القطعة بنجاح في خزانتك الشخصية للمعاينة وحجز الميعاد."
                      : "The custom item configuration has been added to your vault."}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Visual Printable Luxury Certificate of Authenticity */}
              <AnimatePresence>
                {customized && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-white/10 bg-[#0c0c0c] rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between"
                  >
                    {/* Watermark in background */}
                    <div className="absolute right-4 bottom-4 opacity-[0.02] text-[80px] font-serif pointer-events-none uppercase">
                      PERFECT
                    </div>

                    <div className="border border-dashed border-white/20 p-4 space-y-3.5">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-brand-gold">
                        <span>CERTIFICATE OF SPECIFICATION</span>
                        <span>{certificateSerial}</span>
                      </div>

                      <div className="text-center">
                        <h4 className="text-sm font-normal text-white uppercase tracking-widest">
                          {lang === "ar" ? "صك المطابقة الحصري" : "Exclusive Authenticity Decree"}
                        </h4>
                        <div className="w-16 h-[1px] bg-brand-gold/35 mx-auto mt-1.5"></div>
                      </div>

                      <div className="grid grid-cols-2 text-[10px] gap-y-2 text-white/70 font-sans">
                        <div>
                          <span className="text-white/40 font-mono uppercase text-[8px] tracking-wider block">BASE MODEL</span>
                          <span className="font-serif text-xs text-white">{lang === "ar" ? product.nameAr : product.name}</span>
                        </div>
                        <div>
                          <span className="text-white/40 font-mono uppercase text-[8px] tracking-wider block">DECLARED VALUE</span>
                          <span className="font-mono text-brand-gold">{product.price}</span>
                        </div>
                        <div>
                          <span className="text-white/40 font-mono uppercase text-[8px] tracking-wider block">ALLOY CONFIGURATION</span>
                          <span className="text-white">{selectedMetal}</span>
                        </div>
                        <div>
                          <span className="text-white/40 font-mono uppercase text-[8px] tracking-wider block">CORE EMBELLISHMENT</span>
                          <span className="text-white">{selectedGem}</span>
                        </div>
                        {engraving && (
                          <div className="col-span-2 border-t border-white/10 pt-2">
                            <span className="text-white/40 font-mono uppercase text-[8px] tracking-wider block">HAND-CARVED TEXT ENGRAVING</span>
                            <span className="italic text-brand-gold">"{engraving}"</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-end border-t border-white/10 pt-4 font-mono text-[8px] text-white/40">
                        <div>
                          <span>AUTHENTICATED BY: THE SENTINEL EYE</span>
                          <span className="block italic mt-0.5">PERFECT STORE SHOWROOM ATELIER</span>
                        </div>
                        <div className="text-right">
                          <span className="text-brand-gold uppercase tracking-widest block font-serif">PERFECT</span>
                          <span className="block mt-0.5">ISSUED MAY 2026</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
