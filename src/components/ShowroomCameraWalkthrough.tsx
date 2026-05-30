import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Compass,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
  Eye,
  Info,
  ExternalLink,
  ChevronRight,
  Sliders,
  Play,
  CornerDownLeft,
  Anchor,
  Star,
  Clock,
  Shirt,
  Disc,
  Pocket,
  Footprints,
  Package
} from "lucide-react";
import { Product, CartItem, AppointmentRequest } from "../types";
import { GENERAL_METALS, GENERAL_GEMSTONES } from "../data";

const SHOWROOM_IMG = "/src/assets/images/perfect_showroom_vault_1780148424376.png";

interface ShowroomCameraWalkthroughProps {
  lang: "ar" | "en";
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onScrollToConsult: () => void;
  onEnterCoutureRoom?: () => void;
  wishlist: CartItem[];
  onAddToWishlist: (item: CartItem) => void;
  onRemoveFromWishlist: (id: string) => void;
  appointment: AppointmentRequest;
  onAppointmentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onAppointmentInterestToggle: (id: string) => void;
  onAppointmentSubmit: (e: React.FormEvent) => void;
  isApptSubmitted: boolean;
  apptReceipt: string;
  onResetAppointment: () => void;
}

interface Department {
  id: "womens_dresses" | "maxi_dresses" | "mens_fashion" | "kids_fashion" | "jewelry" | "watches" | "home_decor" | "shoes" | "crystal_decor";
  labelEn: string;
  labelAr: string;
  subEn: string;
  subAr: string;
  left: string;
  top: string;
  width: string;
  height: string;
  zoom: number;
  origin: string;
  descEn: string;
  descAr: string;
}

export default function ShowroomCameraWalkthrough({
  lang,
  products,
  onSelectProduct,
  onScrollToConsult,
  onEnterCoutureRoom,
  wishlist,
  onAddToWishlist,
  onRemoveFromWishlist,
  appointment,
  onAppointmentChange,
  onAppointmentInterestToggle,
  onAppointmentSubmit,
  isApptSubmitted,
  apptReceipt,
  onResetAppointment
}: ShowroomCameraWalkthroughProps) {
  // Cinematic states
  const [introStep, setIntroStep] = useState<"unstarted" | "calibrating" | "entering" | "ready">("unstarted");
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [cameraOrigin, setCameraOrigin] = useState<string>("50% 50%");
  
  // Active Foyer selection
  const [activeFoyerSpot, setActiveFoyerSpot] = useState<string | null>(null);
  const [warpActive, setWarpActive] = useState<boolean>(false);
  
  // Immersive Navigation System State
  const [currentDepartment, setCurrentDepartment] = useState<string | null>(null);
  const [focusedProduct, setFocusedProduct] = useState<Product | null>(null);

  // Audio and sound effects
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientOscs = useRef<any[]>([]);

  // Parallax look-around forces
  const [swayX, setSwayX] = useState<number>(0);
  const [swayY, setSwayY] = useState<number>(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Instant Customizer state inside the details panel
  const [customMetal, setCustomMetal] = useState<string>("18k Imperial Yellow Gold");
  const [customGem, setCustomGem] = useState<string>("Imperial Blue Sapphire");
  const [customPattern, setCustomPattern] = useState<string>("Unique PERFECT Signature");
  const [customSuccessMsg, setCustomSuccessMsg] = useState<string | null>(null);

  // Play cinematic intro automatically on mount
  useEffect(() => {
    // If we have already visited in session, skip or play fast
    const skipped = sessionStorage.getItem("perfect_showroom_skip_intro");
    if (skipped === "true") {
      setIntroStep("ready");
      return;
    }

    setIntroStep("calibrating");
    const t1 = setTimeout(() => {
      setIntroStep("entering");
      setZoomLevel(1.5);
    }, 2200);

    const t2 = setTimeout(() => {
      setIntroStep("ready");
      setZoomLevel(1.0);
      sessionStorage.setItem("perfect_showroom_skip_intro", "true");
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Handheld breathing camera sways
  useEffect(() => {
    let frameId: number;
    let startTime = Date.now();

    const runBreathingSway = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Damped sways inside focused lookups to avoid motion-sickness
      const factor = focusedProduct ? 0.2 : currentDepartment ? 0.4 : 1.0;
      
      const x = Math.sin(elapsed * 0.9) * 4 * factor;
      const y = Math.cos(elapsed * 0.75) * 3 * factor;
      setSwayX(x);
      setSwayY(y);

      frameId = requestAnimationFrame(runBreathingSway);
    };

    runBreathingSway();
    return () => cancelAnimationFrame(frameId);
  }, [focusedProduct, currentDepartment]);

  // Mouse Parallax looking around - disabled as per user request
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disabled to prevent camera reaction when moving the mouse
  };

  const handleMouseLeave = () => {
    // Disabled
  };

  // Sound Synth Generator for high-luxury audio feedbacks
  const triggerAtmosphericSound = (freq: number, duration: number, type: OscillatorType = "sine", volume: number = 0.05) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Sweep or pitch ramp
      if (freq < 150) {
        osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + duration);
      } else {
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);
      }

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(freq * 2.5, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log("Web Audio exception ignored safely.", e);
    }
  };

  // Persistent Ambient Drone Sound synth loops
  const toggleAmbientDrone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (isAudioActive) {
        ambientOscs.current.forEach(osc => { try { osc.stop(); } catch(err){} });
        ambientOscs.current = [];
        setIsAudioActive(false);
        return;
      }

      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      // Base deep room sub-bass drone
      const baseOsc = ctx.createOscillator();
      const baseGain = ctx.createGain();
      baseOsc.type = "sine";
      baseOsc.frequency.setValueAtTime(65, ctx.currentTime);
      baseGain.gain.setValueAtTime(0.06, ctx.currentTime);
      baseOsc.connect(baseGain);
      baseGain.connect(ctx.destination);
      baseOsc.start();

      // Atmospheric golden shimmering bell synth
      const shimmerOsc = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmerOsc.type = "sine";
      shimmerOsc.frequency.setValueAtTime(293.66, ctx.currentTime); // D4 note
      shimmerGain.gain.setValueAtTime(0.015, ctx.currentTime);
      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      shimmerOsc.start();

      ambientOscs.current = [baseOsc, shimmerOsc];
      setIsAudioActive(true);
    } catch(e) {
      console.log("Failed to start loops in background sanitization", e);
    }
  };

  // Cleanup synths on unmount
  useEffect(() => {
    return () => {
      ambientOscs.current.forEach(osc => { try { osc.stop(); } catch(err){} });
    };
  }, []);

  // Department definitions
  const departments: Department[] = [
    {
      id: "womens_dresses",
      labelEn: "Women's Couture Dresses",
      labelAr: "قسم الفساتين الراقية",
      subEn: "Imperial Gowns & Silks",
      subAr: "أزياء الحرير والقفطان الملكية",
      left: "14.5%",
      top: "50%",
      width: "16%",
      height: "55%",
      zoom: 2.2,
      origin: "14.5% 50%",
      descEn: "Bespoke 1-of-1 silk draperies formulated within our Milan ateliers.",
      descAr: "عباءات انسيابية محاكة يدوياً ومطرزة بخيوط من الذهب الخالص."
    },
    {
      id: "maxi_dresses",
      labelEn: "Sovereign Maxi Gowns",
      labelAr: "رسم فريد لفساتين الماكسي",
      subEn: "Long Sculpted Silhouettes",
      subAr: "قصات شامخة للأفراح والمحافل",
      left: "26.5%",
      top: "55%",
      width: "12%",
      height: "45%",
      zoom: 2.3,
      origin: "26.5% 55%",
      descEn: "Immaculate long-framed columns casting highly elegant shadows.",
      descAr: "تحف فصائلية طويلة منسوجة خصيصاً بنقوش البروكار المذهبة."
    },
    {
      id: "mens_fashion",
      labelEn: "Men's Luxury Tailoring",
      labelAr: "أزياء النخبة الرجالية",
      subEn: "Bespoke Suits & Cadet Coats",
      subAr: "بدلات حرير وتوكسيدو الكشمير",
      left: "41.5%",
      top: "44%",
      width: "9%",
      height: "30%",
      zoom: 2.5,
      origin: "41.5% 44%",
      descEn: "Premium super-180 Mongolian cashmere and unblemished Neapolitan cuts.",
      descAr: "بدلات كشمير ثقيلة مع ياقة ساتان دقيقة لأناقة رجالية عابرة للأزمان."
    },
    {
      id: "kids_fashion",
      labelEn: "Petit Heritage Court",
      labelAr: "أزياء الأطفال الإمبراطورية",
      subEn: "Noble Outfits & Petit Coats",
      subAr: "ملابس كشمير ناعمة للأمراء الصغار",
      left: "68%",
      top: "43%",
      width: "7%",
      height: "23%",
      zoom: 2.5,
      origin: "68% 43%",
      descEn: "Highly comfortable baby cashmere blends safe on sensitive skin.",
      descAr: "معاطف صوف شتوي ناعم منسوجة للأمراء الصغار بخلو تام من الكيماويات."
    },
    {
      id: "jewelry",
      labelEn: "The Sovereign Jewelry Pedestal",
      labelAr: "منصة المجوهرات النادرة والقلائد",
      subEn: "Flawless Sapphires & Emeralds",
      subAr: "صياغة الألماس والياقوت الإمبراطوري",
      left: "49.5%",
      top: "66%",
      width: "26%",
      height: "36%",
      zoom: 2.3,
      origin: "49.5% 66%",
      descEn: "Authentic Rome-set masterworks carrying GIA certificates.",
      descAr: "صياغة ذهبية فاخرة تتوسطها أحجار كريمة ملكية تخلب الألباب."
    },
    {
      id: "watches",
      labelEn: "Swiss Precision Watches",
      labelAr: "ساعات الأونيكس السويسرية",
      subEn: "Tourbillon & Collector Bezel",
      subAr: "ساعات ميكانيكية ذات عروق ذهبية مرمرية",
      left: "38%",
      top: "60%",
      width: "11%",
      height: "20%",
      zoom: 2.6,
      origin: "38% 60%",
      descEn: "Exquisite hand-wound mechanical movements carrying absolute black onyx cores.",
      descAr: "تراكم الزمن في صياغة أنيقة تمزج بين الرخام وحجر الأونيكس المعتق."
    },
    {
      id: "home_decor",
      labelEn: "Royal Alabaster Sculptures",
      labelAr: "الديكور والمنحوتات التوسكانية",
      subEn: "Semi-translucent Italian Urns",
      subAr: "أواني كلاسيكية مضيئة من الألباستر",
      left: "6%",
      top: "58%",
      width: "10%",
      height: "40%",
      zoom: 2.1,
      origin: "6% 58%",
      descEn: "Vessels hand-polished with progress diamond pastes to misty glow values.",
      descAr: "أعمدة مرمرية عتيقة مضاءة بالكامل تبعث الدفء في أركان الغرفة."
    },
    {
      id: "shoes",
      labelEn: "Illuminated Stiletto Shoes",
      labelAr: "كعب الستيليتو والأحذية الحرفية",
      subEn: "Swarovski Diamond-Dust Soles",
      subAr: "أحذية مرصعة بالغبار المذهب وبلورات الألماس",
      left: "88%",
      top: "64%",
      width: "11%",
      height: "30%",
      zoom: 2.1,
      origin: "88% 64%",
      descEn: "Stiletto heels backed by structural architectural bronze wedges.",
      descAr: "حذاء الأحلام المرصع بأكثر من 4,500 حجر مجهري كروي عاكس للضوء."
    },
    {
      id: "crystal_decor",
      labelEn: "Crystal Masterpieces & Sculptures",
      labelAr: "قطع الكريستال والمجسمات الملكية",
      subEn: "Light-Refracting Lead Glass Figures",
      subAr: "منحوتات الزجاج ومسلات الكوارتز",
      left: "82%",
      top: "46%",
      width: "10%",
      height: "25%",
      zoom: 2.2,
      origin: "82% 46%",
      descEn: "Breathtaking precision-faceted crystal and mineral sculptures reflecting divine brilliance.",
      descAr: "مجسمات فلكية ونحوتات من كريستال الرصاص والكوارتز الوردي الطبيعي تبهر الأبصار بانكسار الضوء."
    }
  ];

  // Fly sequence into dedicated display department
  const handleDepartmentAdmission = (dept: Department) => {
    // 1. Zoom camera heavily into the physical object first
    triggerAtmosphericSound(90, 1.2, "triangle", 0.08); // low cinematic sweep
    setCameraOrigin(dept.origin);
    setZoomLevel(dept.zoom);
    setWarpActive(true);

    // 2. Transmit through the cinematic warp into the dedicated room
    setTimeout(() => {
      setCurrentDepartment(dept.id);
      setWarpActive(false);
      // Clean up focused products initially
      setFocusedProduct(null);
      triggerAtmosphericSound(440, 0.8, "sine", 0.03); // chime entering
    }, 750);
  };

  const handleReturnToFoyer = () => {
    triggerAtmosphericSound(300, 1.0, "triangle", 0.05); // high to low zoom sweep back
    setWarpActive(true);
    
    setTimeout(() => {
      setCurrentDepartment(null);
      setFocusedProduct(null);
      setZoomLevel(1.0);
      setCameraOrigin("50% 50%");
      setWarpActive(false);
    }, 600);
  };

  // Close to singular product details for floating checkout card
  const handleFocusProduct = (prod: Product) => {
    triggerAtmosphericSound(620, 0.4, "sine", 0.04);
    setFocusedProduct(prod);
    // Reset selection defaults for quick customizer
    setCustomMetal(lang === "ar" ? "ذهب أصفر إمبراطوري عيار 18" : "18k Imperial Yellow Gold");
    setCustomGem(lang === "ar" ? "ياقوت أزرق إمبراطوري" : "Imperial Blue Sapphire");
    setCustomPattern(lang === "ar" ? "نقش العين الحارسة الحصري" : "Bespoke Royal Monogram Ring");
    setCustomSuccessMsg(null);
  };

  const handleUnfocusProduct = () => {
    triggerAtmosphericSound(220, 0.5, "sine", 0.03);
    setFocusedProduct(null);
  };

  // Immediate custom specification insertion into wishlist (Locker)
  const handleAddCustomToLockerAndCheckout = () => {
    if (!focusedProduct) return;

    const customSpec: CartItem = {
      id: `${focusedProduct.id}-${Date.now()}`,
      product: focusedProduct,
      customization: {
        metalOrFabric: customMetal,
        gemstoneOrThread: customGem,
        engravingOrPattern: customPattern
      },
      timestamp: Date.now()
    };

    onAddToWishlist(customSpec);
    triggerAtmosphericSound(523.25, 0.7, "sine", 0.07); // celestial C5 chime
    
    setCustomSuccessMsg(
      lang === "ar"
        ? "تمت الصياغة ونقل القطعة بنجاح إلى خزانتك المخصصة!"
        : "Specimen forged and safely dispatched to your Private Locker!"
    );
    setTimeout(() => setCustomSuccessMsg(null), 4000);
  };

  // Filter products matching current active department
  const filteredProducts = products.filter(p => p.category === currentDepartment);

  return (
    <div
      className="w-full h-screen bg-[#020202] text-[#e5e5e5] select-none overflow-hidden relative flex flex-col justify-between"
      id="grand-showroom-sanctum"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* ====================================
          1. IMMERSIVE TEXTURED BACKGROUND
          ==================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft side golden laser spotlights */}
        <div className="absolute top-0 bottom-0 left-[6%] w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/25 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-[6%] w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/25 to-transparent"></div>
        {/* Ambient deep mesh background */}
        <div className="absolute inset-0 bg-[#020202]/95 mix-blend-color-burn"></div>
      </div>

      {/* ====================================
          2. CINEMATIC INTRO DUST SCREEN
          ==================================== */}
      <AnimatePresence>
        {introStep !== "ready" && (
          <motion.div
            key="cinematic-intro-mask"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 bg-[#030303] flex flex-col items-center justify-center p-8 text-center select-none"
          >
            {/* Holographic scanner laser sweep */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent animate-pulse opacity-40"></div>
            
            <div className="max-w-xl space-y-8 relative">
              <motion.div
                initial={{ scale: 0.82, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="flex justify-center"
              >
                <div className="w-20 h-20 rounded-full border border-brand-gold/30 flex items-center justify-center bg-black/60 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 to-transparent animate-spin-slow"></span>
                  <img
                    src="/src/assets/images/perfect_logo_eye_1780094109883.png"
                    alt="Perfect Logo"
                    className="w-[115%] h-[115%] object-cover scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              <div className="space-y-3">
                <motion.h2
                  initial={{ letterSpacing: "0.4em", opacity: 0 }}
                  animate={{ letterSpacing: "0.22em", opacity: 1 }}
                  transition={{ duration: 1.8, delay: 0.3 }}
                  className="font-serif text-xl md:text-2xl text-white uppercase tracking-[0.22em]"
                >
                  PERFECT <span className="text-brand-gold">STORE</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ duration: 1.2, delay: 0.9 }}
                  className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#e5e5e5]"
                >
                  {lang === "ar" ? "جاري تفعيل الاتصال البصري الفخم" : "SECURE VIRTUAL ADMISSION LENS"}
                </motion.p>
              </div>

              {/* Status calibrations */}
              <div className="pt-8 border-t border-white/5 flex justify-center gap-6 font-mono text-[8px] text-white/30 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand-gold animate-ping"></span>
                  {lang === "ar" ? "بوابة الغسق نشطة" : "PORTAL ONLINE"}
                </span>
                <span>•</span>
                <span>{lang === "ar" ? "عدسات 3D مستقرة" : "SENSORS CALIBRATING"}</span>
              </div>

              {/* Skip admissions bypass link */}
              <button
                onClick={() => setIntroStep("ready")}
                className="inline-block mt-8 bg-black/50 hover:bg-white text-white hover:text-black font-mono text-[8.5px] uppercase tracking-[0.18em] px-4 py-2 border border-white/10 hover:border-brand-gold hover:scale-105 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                {lang === "ar" ? "تجاوز المقدمة السينمائية ➜" : "Skip Entrance Cinematic ➜"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================
          3. CINEMATIC MOTION-BLUR WARP OVERLAY
          ==================================== */}
      <AnimatePresence>
        {warpActive && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(22px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40 bg-black/45 flex items-center justify-center pointer-events-none"
          >
            {/* Speed line lights resembling hyperdrive warp */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-[48%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent animate-pulse"></div>
              <div className="absolute top-0 bottom-0 left-[48%] w-[2px] bg-gradient-to-b from-transparent via-brand-gold/40 to-transparent animate-pulse"></div>
            </div>
            
            <div className="text-center space-y-2">
              <span className="w-6 h-6 rounded-full border border-brand-gold border-t-transparent animate-spin inline-block"></span>
              <p className="font-mono text-[8.5px] tracking-widest text-[#d4af37] uppercase">
                {lang === "ar" ? "جاري تحريك المنظور والتقريب البصري..." : "WALKING THROUGH SHOWROOM PATHWAYS..."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================
          4. PERSISTENT FLOATING HUD CONTROLLER
          ==================================== */}
      <header className="absolute top-0 left-0 right-0 z-30 pt-6 pb-12 px-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={currentDepartment ? handleReturnToFoyer : undefined}
            className={`w-9 h-9 rounded-full border flex items-center justify-center bg-black/85 outline-none transition-all duration-300 ${
              currentDepartment ? "border-brand-gold hover:bg-brand-gold hover:text-black cursor-pointer" : "border-white/10"
            }`}
          >
            {currentDepartment ? (
              <ArrowLeft className="w-4 h-4" />
            ) : (
              <img
                src="/src/assets/images/perfect_logo_eye_1780094109883.png"
                className="w-10 h-10 object-cover scale-110"
                alt="Logo"
                referrerPolicy="no-referrer"
              />
            )}
          </button>
          <div className="flex flex-col select-none">
            <h1 className="font-serif text-sm tracking-[0.25em] text-white uppercase leading-none">
              PERFECT <span className="text-brand-gold">STORE</span>
            </h1>
            <span className="text-[7px] font-mono text-brand-gold/60 uppercase tracking-widest mt-1">
              {currentDepartment 
                ? (lang === "ar" ? "أتيلييه العضوية والنسج الحصري" : "EXECUTIVE CORRIDOR SECTION")
                : (lang === "ar" ? "صالون التفحص البصري الفخم" : "Interactive Foyer Portal")}
            </span>
          </div>
        </div>

        {/* Center state HUD advise */}
        <div className="hidden lg:flex items-center gap-3.5 bg-black/75 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full font-mono text-[9px] tracking-[0.16em] text-brand-gold pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse"></span>
          <span>
            {focusedProduct
              ? (lang === "ar" ? `تركيز اللسعة: ${focusedProduct.nameAr.toUpperCase()}` : `LENS ZOOM ACTIVE: [${focusedProduct.name.toUpperCase()}]`)
              : currentDepartment
              ? (lang === "ar" ? `قسم فعال: ${currentDepartment.toUpperCase()}` : `DEPARTMENT BOUTIQUE ACTIVE: [${currentDepartment.toUpperCase()}]`)
              : (lang === "ar" ? "حلق وحرك المؤشر: أنظر لغلاف الأجهزة والمنيكانات وحدودها لتشغيل الكاميرا" : "GAZE AT DEPARTMENTS: HOVER MANNEQUINS & PEDESTALS FOR EDGE GLOWS")}
          </span>
        </div>

        {/* Audio controller */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button
            onClick={toggleAmbientDrone}
            className="p-2.5 bg-black/80 hover:bg-brand-gold/20 border border-white/15 hover:border-brand-gold/30 text-white rounded-full transition-all duration-300 cursor-pointer"
            title="Ambient Music Synthesizer"
          >
            {isAudioActive ? (
              <Volume2 className="w-4 h-4 text-brand-gold animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/40" />
            )}
          </button>

          {currentDepartment && (
            <button
              onClick={handleReturnToFoyer}
              className="bg-black border border-white/15 hover:border-brand-gold hover:text-brand-gold px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              {lang === "ar" ? "البهو الرئيسي" : "Foyer Hall"}
            </button>
          )}
        </div>
      </header>

      {/* ====================================
          5. THE MAIN INTERACTIVE STAGE VIEW
          ==================================== */}
      <div className="absolute inset-0 w-full h-full z-10 overflow-hidden bg-[#030303]">
        
        <AnimatePresence mode="wait">
          
          {/* A. FOYER HALL PORTAL SCENE */}
          {!currentDepartment && (
            <motion.div
              key="foyer-active-scene"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Parallax viewport container */}
              <motion.div
                style={{
                  transformOrigin: cameraOrigin,
                  x: swayX + mouseOffset.x,
                  y: swayY + mouseOffset.y,
                  scale: zoomLevel,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Immersive background boutique blueprint image */}
                <img
                  src={SHOWROOM_IMG}
                  className="w-full h-full object-cover select-none"
                  alt="Premium Perfect Showroom Vault"
                  draggable={false}
                />

                {/* Fine geometric coordinate grid on top of image for HUD depth */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

                {/* THE EDGE-GLOWING TARGET HOTSPOT ZONES */}
                <div className="absolute inset-0 pointer-events-none">
                  {departments.map((dept) => (
                    <motion.div
                      key={dept.id}
                      style={{
                        position: "absolute",
                        left: dept.left,
                        top: dept.top,
                        width: dept.width,
                        height: dept.height,
                      }}
                      initial={{ scale: 1, x: "-50%", y: "-50%" }}
                      whileHover={{ scale: 1.0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 25 }}
                      className="pointer-events-auto cursor-pointer group rounded-3xl"
                      onClick={() => handleDepartmentAdmission(dept)}
                      onMouseEnter={() => {
                        triggerAtmosphericSound(220, 0.1, "sine", 0.01);
                        setActiveFoyerSpot(dept.id);
                      }}
                      onMouseLeave={() => setActiveFoyerSpot(null)}
                    >
                      {/* 
                        GLOWING EDGE SYSTEM:
                        Removes ugly target signs. Hovering on any physical object 
                        triggers a gorgeous high-fidelity lighting edge contour that glows!
                      */}
                      <div className="absolute inset-0 rounded-[28px] border border-transparent group-hover:border-brand-gold/65 transition-all duration-500 bg-brand-gold/[0.005] group-hover:bg-brand-gold/[0.035] shadow-[inset_0_0_20px_rgba(212,175,55,0),0_0_20px_rgba(212,175,55,0)] group-hover:shadow-[inset_0_0_35px_rgba(212,175,55,0.18),0_0_35px_rgba(212,175,55,0.45)] p-4 flex flex-col justify-end overflow-hidden">
                        
                        {/* Elegant minimized text tag inside the glowing framework */}
                        <div className="opacity-0 group-hover:opacity-100 duration-500 transform translate-y-3 group-hover:translate-y-0 transition-all text-center">
                          <span className="inline-block bg-black/95 backdrop-blur-md border border-brand-gold/45 px-3 py-1.5 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                            <span className="font-serif text-[11px] text-white font-medium block whitespace-nowrap">
                              {lang === "ar" ? dept.labelAr : dept.labelEn}
                            </span>
                            <span className="font-mono text-[7px] text-brand-gold/80 uppercase tracking-widest mt-0.5 block whitespace-nowrap">
                              {lang === "ar" ? dept.subAr : dept.subEn}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Corner luxury notches that react to mouse hover */}
                      <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/15 group-hover:border-brand-gold rounded-tl-[12px] transition-colors duration-400"></span>
                      <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/15 group-hover:border-brand-gold rounded-tr-[12px] transition-colors duration-400"></span>
                      <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/15 group-hover:border-brand-gold rounded-bl-[12px] transition-colors duration-400"></span>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/15 group-hover:border-brand-gold rounded-br-[12px] transition-colors duration-400"></span>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            </motion.div>
          )}

          {/* B. DEDICATED DEPARTMENT MULTIPLE DISPLAY SCENE */}
          {currentDepartment && (
            <motion.div
              key="department-room-scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-stretch justify-between p-6 pt-24"
            >
              
              {/* Left Wing Sidebar: Department narrative */}
              <div className="w-full lg:w-[26%] flex flex-col justify-between p-6 bg-black/75 backdrop-blur-xl border border-white/10 rounded-[28px] z-30 mb-4 lg:mb-0 relative overflow-hidden shadow-2xl">
                {/* Gold decoration laser line */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"></div>
                
                <div className="space-y-6">
                  {/* Department Title */}
                  <div className="space-y-1.5">
                    <span className="text-brand-gold font-mono text-[8px] uppercase tracking-[0.25em] block">
                      {lang === "ar" ? "القسم الفعال بموجب الغسق" : "LENS CORRIDOR UNIT"}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl text-white tracking-tight">
                      {lang === "ar" 
                        ? (departments.find(d => d.id === currentDepartment)?.labelAr)
                        : (departments.find(d => d.id === currentDepartment)?.labelEn)}
                    </h3>
                    <p className="font-sans text-xs text-white/50 leading-relaxed font-light mt-2.5">
                      {lang === "ar"
                        ? (departments.find(d => d.id === currentDepartment)?.descAr)
                        : (departments.find(d => d.id === currentDepartment)?.descEn)}
                    </p>
                  </div>

                  {/* High status certification assurance labels */}
                  <div className="p-4 bg-brand-gold/[0.035] border border-brand-gold/15 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                      <span className="font-serif text-[10px] text-brand-gold tracking-wider uppercase">
                        {lang === "ar" ? "جرد موثق نادراً" : "SOVEREIGN GUILD CERTIFIED"}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/40 leading-relaxed font-light">
                      {lang === "ar"
                        ? "تحفة أصلية تم جردها من متاجر أمازون المعتمدة للطبقات النخبوية ومعايرة بعناية داخل محفل PERFECT."
                        : "Each masterpiece is directly linked to licensed Amazon luxury nodes, thoroughly vetted by our curated standards."}
                    </p>
                  </div>
                </div>

                {/* Locker indicators */}
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/40">{lang === "ar" ? "الخزانات الخاصة نشطة" : "ACTIVE LOCKER COUNT"}</span>
                    <span className="text-brand-gold bg-brand-gold/15 px-2.5 py-1 rounded-full font-bold">
                      {wishlist.length} {lang === "ar" ? "قطع" : "specimens"}
                    </span>
                  </div>

                  <button
                    onClick={handleReturnToFoyer}
                    className="w-full bg-black hover:bg-neutral-900 border border-white/10 hover:border-brand-gold text-white font-mono text-[9px] uppercase tracking-widest py-3.5 rounded-full duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5 text-brand-gold" />
                    {lang === "ar" ? "العودة للبهو الرئيسي" : "Return to Grand Foyer"}
                  </button>
                </div>
              </div>

              {/* Center Wing Main Grid: Converting product images into standalone luxurious display posts */}
              <div className="flex-1 px-0 lg:px-6 flex items-center justify-center z-20 relative overflow-y-auto max-h-[75vh] lg:max-h-full py-4 lg:py-0">
                {filteredProducts.length === 0 ? (
                  <div className="text-center space-y-4 border border-dashed border-white/15 p-12 rounded-[28px] max-w-md bg-black/40">
                    <Package className="w-10 h-10 text-white/30 mx-auto animate-pulse" />
                    <h4 className="font-serif text-base text-white">{lang === "ar" ? "لم يتم وضع أي منيكانات في هذا القسم بعد" : "No Boutique Dispositions Mounted"}</h4>
                    <p className="text-xs text-white/40 leading-relaxed font-light">
                      {lang === "ar" ? "يرجى زيارة لوحة التحكم والمشرف لإصدار فساتين أو ساعات جديدة." : "Select the Curator Sanctuary in the top bar or consult with Admin to release custom models."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl justify-items-center">
                    {filteredProducts.map((prod, idx) => {
                      const isFocused = focusedProduct?.id === prod.id;
                      
                      return (
                        <motion.div
                          key={prod.id}
                          initial={{ opacity: 0, y: 35 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.15 }}
                          className={`w-full max-w-sm flex flex-col items-center group relative ${
                            isFocused ? "z-30" : "z-10"
                          }`}
                        >
                          {/* THE PRODUCT INTERACTIVE EXHIBITION DISPLAY COLUMN */}
                          <div 
                            onClick={() => handleFocusProduct(prod)}
                            className="w-full aspect-[4/5] bg-black/85 border border-white/10 rounded-[32px] overflow-hidden relative shadow-2xl cursor-pointer transition-all duration-500 hover:border-brand-gold/50 flex flex-col justify-between"
                          >
                            {/* Inner Spotlight ambient ray */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none group-hover:bg-brand-gold/[0.02] duration-500"></div>
                            
                            {/* Boutique Stand Label Tag */}
                            <div className="p-4 flex justify-between items-center font-mono text-[8px] text-white/40 border-b border-white/5 bg-neutral-900/10">
                              <span>NO. {idx + 1} / PERFECT CORRIDOR</span>
                              <span className="text-brand-gold/80 font-bold uppercase tracking-widest">{prod.rarity}</span>
                            </div>

                            {/* Center display element (mannequin wrap or case holder) */}
                            <div className="flex-1 flex items-center justify-center p-6 relative">
                              <motion.div 
                                style={{
                                  x: isFocused ? swayX * 0.4 : 0,
                                  y: isFocused ? swayY * 0.4 : 0,
                                }}
                                className="w-full h-full relative flex items-center justify-center"
                              >
                                {/* Immersive glass case framing reflection for jewelry/watches */}
                                {(prod.category === "watches" || prod.category === "jewelry") && (
                                  <div className="absolute inset-0 border border-brand-gold/15 bg-brand-gold/[0.005] shadow-[0_10px_40px_rgba(212,175,55,0.03)] rounded-2xl pointer-events-none">
                                    {/* Glass sheen reflex */}
                                    <div className="absolute top-0 bottom-0 left-0 right-1/2 bg-gradient-to-r from-white/5 to-transparent skew-x-12 opacity-50"></div>
                                  </div>
                                )}

                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="max-h-[75%] max-w-[85%] object-contain rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 duration-700 transition-transform"
                                  referrerPolicy="no-referrer"
                                />
                              </motion.div>
                            </div>

                            {/* Bottom spotlight panel */}
                            <div className="p-5 border-t border-white/5 bg-gradient-to-t from-[#050505] to-[#010101] text-center space-y-1.5 rounded-b-[32px] relative">
                              {/* Bottom physical platform edge light */}
                              <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent"></div>
                              
                              <h4 className="font-serif text-sm text-neutral-200 group-hover:text-brand-gold transition-colors block leading-tight">
                                {lang === "ar" ? prod.nameAr : prod.name}
                              </h4>
                              <span className="font-mono text-xs text-brand-gold block font-semibold">{prod.price}</span>
                              <span className="font-mono text-[7px] text-white/55 block tracking-widest uppercase">
                                {lang === "ar" ? "انقر لبدء التركيز البصري" : "CLICK FOR INTENSE LENS FOCUS"}
                              </span>
                            </div>
                          </div>

                          {/* Physical pedestal shadow base */}
                          <div className="w-[85%] h-5 bg-gradient-to-b from-[#080808] to-transparent bg-neutral-900/5 mt-3 rounded-full blur-[4px] border-b border-brand-gold/5"></div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* =========================================================
                  C. INTENSE CLOSED PRODUCT CLOSE-UP FLOATING ROYAL INFO SHEET
                  ========================================================= */}
              <AnimatePresence>
                {focusedProduct && (
                  <motion.div
                    initial={{ opacity: 0, x: lang === "ar" ? -150 : 150 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: lang === "ar" ? -150 : 150 }}
                    transition={{ type: "spring", damping: 25, stiffness: 120 }}
                    className={`absolute top-24 bottom-6 w-full md:w-[420px] bg-black/95 backdrop-blur-2xl border border-white/10 p-6 rounded-[28px] z-40 overflow-y-auto flex flex-col justify-between shadow-2xl ${
                      lang === "ar" ? "left-6" : "right-6"
                    }`}
                  >
                    {/* Header Controls */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5">
                        <button
                          onClick={handleUnfocusProduct}
                          className="text-white/40 hover:text-white flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest cursor-pointer"
                        >
                          ← {lang === "ar" ? "إغلاق التفاصيل" : "Close Specs"}
                        </button>
                        <span className="text-brand-gold font-mono tracking-widest text-[9px] uppercase">
                          {focusedProduct.rarity}
                        </span>
                      </div>

                      {/* Display Image Spot */}
                      <div className="w-full aspect-[4/3] bg-[#050505] rounded-2xl border border-white/5 flex items-center justify-center p-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_80%)]"></div>
                        
                        {/* Elegant interactive floating spotlight ring */}
                        <div className="absolute inset-0 border border-brand-gold/10 bg-brand-gold/[0.002] rounded-2xl pointer-events-none"></div>

                        <img
                          src={focusedProduct.image}
                          alt={focusedProduct.name}
                          className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info labels */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em] block">
                          {focusedProduct.brand || "PERFECT Store Authentic"}
                        </span>
                        <h4 className="font-serif text-lg md:text-xl text-white font-medium">
                          {lang === "ar" ? focusedProduct.nameAr : focusedProduct.name}
                        </h4>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(focusedProduct.rating || 5)
                                  ? "text-brand-gold fill-brand-gold"
                                  : "text-white/20"
                              }`}
                            />
                          ))}
                          <span className="text-[9px] text-white/50 font-mono ml-2 mt-0.5">
                            {focusedProduct.rating || "5.0"} / 5.0
                          </span>
                        </div>

                        <div className="text-lg font-mono font-medium text-brand-gold pt-1">
                          {focusedProduct.price}
                        </div>

                        <p className="font-sans text-xs text-white/55 leading-relaxed font-light pt-2">
                          {lang === "ar" ? focusedProduct.descriptionAr : focusedProduct.description}
                        </p>
                      </div>

                      {/* Customized swatches based on categories */}
                      <div className="pt-4 border-t border-white/5 space-y-4">
                        {/* Size charts */}
                        {focusedProduct.sizes && (
                          <div className="space-y-1.5">
                            <span className="text-[8.5px] font-mono text-white/40 uppercase tracking-widest block">
                              {lang === "ar" ? "المقاس الحصري المتوفر" : "SELECT EXCLUSIVE SIZE"}
                            </span>
                            <div className="flex gap-2 flex-wrap">
                              {focusedProduct.sizes.map((sz) => (
                                <span
                                  key={sz}
                                  className="font-mono text-[9px] px-2.5 py-1.5 border border-brand-gold/30 bg-brand-gold/5 text-brand-gold rounded font-medium"
                                >
                                  {sz}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Colors */}
                        {focusedProduct.colors && (
                          <div className="space-y-1.5">
                            <span className="text-[8.5px] font-mono text-white/40 uppercase tracking-widest block">
                              {lang === "ar" ? "مجموعة الألوان المقترحة" : "THEMATIC COLOR PALETTES"}
                            </span>
                            <div className="flex gap-2 flex-wrap">
                              {focusedProduct.colors.map((color) => (
                                <span
                                  key={color}
                                  className="font-mono text-[9.5px] text-[#e5e5e5]/75 bg-black/40 border border-white/10 px-2 py-1 rounded-sm"
                                >
                                  {color}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* High Status GIA properties */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[8.5px] font-mono text-white/40 uppercase tracking-widest block">
                            {lang === "ar" ? "المواد والصياغة الفنية" : "CRAFTSMANSHIP STORY & MATERIALS"}
                          </span>
                          <div className="bg-[#050505] p-3 rounded-xl border border-white/5 text-[10.5px] leading-relaxed text-white/50 font-light space-y-2">
                            <div className="flex justify-between">
                              <span className="font-mono text-[8px] uppercase text-white/30">{lang === "ar" ? "المواد" : "Materials"}</span>
                              <span className="text-right text-brand-gold font-normal">
                                {lang === "ar" 
                                  ? focusedProduct.materialsAr.join(" • ") 
                                  : focusedProduct.materials.join(" • ")}
                              </span>
                            </div>
                            <p className="border-t border-white/5 pt-1.5">
                              {lang === "ar" ? focusedProduct.storyAr : focusedProduct.story}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Locker, customizer configurations actions, and direct Amazon checkout */}
                    <div className="pt-6 border-t border-white/5 space-y-3.5">
                      
                      {customSuccessMsg && (
                        <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-3 text-center text-brand-gold font-mono text-[9.5px] leading-relaxed animate-pulse">
                          {customSuccessMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={handleAddCustomToLockerAndCheckout}
                          className="bg-brand-gold/15 hover:bg-brand-gold/30 border border-brand-gold/30 hover:border-brand-gold text-brand-gold font-mono text-[9px] font-bold uppercase py-3.5 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          {lang === "ar" ? "إضافة فورية للخزانة" : "Forge Specimen"}
                        </button>

                        <a
                          href={focusedProduct.amazonUrl || "https://www.amazon.com/s?k=luxury+designer+products"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-brand-gold hover:bg-white text-black font-mono font-bold text-[9px] uppercase py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_3px_12px_rgba(212,175,55,0.4)]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {lang === "ar" ? "شراء من أمازون" : "Buy on Amazon"}
                        </a>
                      </div>

                      <button
                        onClick={handleUnfocusProduct}
                        className="w-full bg-black hover:bg-neutral-900 border border-white/10 text-white font-mono text-[9px] py-2.5 uppercase tracking-widest rounded-full duration-300 cursor-pointer text-center"
                      >
                        {lang === "ar" ? "← رجوع للمجموعات" : "← Back to Room Display"}
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}

        </AnimatePresence>
      </div>



    </div>
  );
}
