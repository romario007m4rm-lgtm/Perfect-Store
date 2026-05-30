import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  ArrowLeft,
  Sparkles,
  Info,
  ChevronRight,
  Play,
  Pause,
  Eye,
  ShoppingBag,
  RotateCcw,
  Plus
} from "lucide-react";
import { Product } from "../types";

interface CoutureAtelierRoomProps {
  lang: "ar" | "en";
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onGoBack: () => void;
}

export default function CoutureAtelierRoom({
  lang,
  products,
  onSelectProduct,
  onGoBack
}: CoutureAtelierRoomProps) {
  // We keep track of the scroll/camera depth down the aisle
  const [depth, setDepth] = useState<number>(0); // 0 (entrance) to 100 (deep inside)
  const [isWalking, setIsWalking] = useState<boolean>(true);
  const [walkSpeed, setWalkSpeed] = useState<number>(0.05); // Speed multiplier
  const [walkDirection, setWalkDirection] = useState<"forward" | "backward">("forward");

  // Handheld camera sway coefficients
  const [swayX, setSwayX] = useState<number>(0);
  const [swayY, setSwayY] = useState<number>(0);
  const [swayRotate, setSwayRotate] = useState<number>(0);

  // Mouse tilt offsets for look-around
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter products by couture category, but fallback to all products if admin hasn't added any dresses yet
  const coutureProducts = products.filter((p) => p.category === "couture" || p.category === "womens_dresses" || p.category === "maxi_dresses");
  const displayProducts = coutureProducts.length > 0 ? coutureProducts : products;

  // Let's formulate the layout positions for 6 mannequins in 3D depth space.
  // We distribute them on the left and right sides.
  const mannequinPositions = [
    { side: "left" as const, zPercent: 15, xOffset: -320 },
    { side: "right" as const, zPercent: 25, xOffset: 320 },
    { side: "left" as const, zPercent: 45, xOffset: -280 },
    { side: "right" as const, zPercent: 55, xOffset: 280 },
    { side: "left" as const, zPercent: 75, xOffset: -240 },
    { side: "right" as const, zPercent: 85, xOffset: 240 }
  ];

  // Map each position to a product from the database
  const mannequins = mannequinPositions.map((pos, idx) => {
    // Loop through display products if there are fewer than 6
    const product = displayProducts[idx % displayProducts.length];
    return {
      ...pos,
      id: `mannequin-${idx}`,
      product
    };
  });

  // 1. Handheld Camera Sway loop using sinusoidal math to mimic a human carrying a camera
  useEffect(() => {
    let frameId: number;
    let startTime = Date.now();

    const updateSway = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Multi-frequency sine loops for natural breathing sway
      const x = Math.sin(elapsed * 1.5) * 11 + Math.cos(elapsed * 2.5) * 4;
      const y = Math.cos(elapsed * 1.2) * 8 + Math.sin(elapsed * 1.9) * 3;
      const rotate = Math.sin(elapsed * 0.8) * 0.65 + Math.cos(elapsed * 1.6) * 0.2;
      
      setSwayX(x);
      setSwayY(y);
      setSwayRotate(rotate);
      
      frameId = requestAnimationFrame(updateSway);
    };

    updateSway();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // 2. Automated calm walking cruise down the carpet aisle
  useEffect(() => {
    let intervalId: any;
    if (isWalking) {
      intervalId = setInterval(() => {
        setDepth((prev) => {
          let next = prev;
          if (walkDirection === "forward") {
            next = prev + walkSpeed;
            if (next >= 100) {
              setWalkDirection("backward");
              return 100;
            }
          } else {
            next = prev - walkSpeed;
            if (next <= 0) {
              setWalkDirection("forward");
              return 0;
            }
          }
          return next;
        });
      }, 30);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isWalking, walkSpeed, walkDirection]);

  // Handle look-around perspective warping on mouse hover - disabled as per user request
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disabled to stop look-around camera response on mouse move
  };

  const handleMouseLeave = () => {
    // Disabled
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full min-h-[100vh] bg-[#030303] flex flex-col justify-between overflow-hidden relative select-none selection:bg-brand-gold selection:text-black"
    >
      {/* 3D Hallway Environment Viewport */}
      <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden">
        
        {/* Ambient Dark Atmospheric Lighting Grid */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/90 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/80 pointer-events-none z-10"></div>

        {/* 3D Perspective Chamber Wrapper */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ perspective: "1200px" }}
        >
          {/* Inner 3D coordinate space shifted by walking depth, mouse look, and handheld sway */}
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "50% 50% -500px",
            }}
            animate={{
              // Parallax walk-through depth + look-around panning + sway drift
              x: mouseOffset.x + swayX,
              y: mouseOffset.y + swayY + 20,
              rotateZ: swayRotate,
              // We translate the world in Z axis as the user walks!
              z: (depth / 100) * 600
            }}
            transition={{
              type: "spring",
              stiffness: 85,
              damping: 24,
              mass: 0.95
            }}
            className="w-full h-full absolute inset-0 flex items-center justify-center"
          >
            {/* The Luxury Golden/Velvet Carpet Running down the Center */}
            <div 
              className="absolute w-[450px] h-[3000px] bg-gradient-to-t from-red-950 via-neutral-900 to-[#120005] border-x-4 border-brand-gold/20 shadow-[0_0_80px_rgba(212,175,55,0.15)] opacity-85"
              style={{
                transform: "rotateX(90deg) translateZ(-340px) translateY(1100px)",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Gold floral weave line pattern in middle of carpet */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(214,175,55,0.02)_20px,rgba(214,175,55,0.02)_40px)]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-brand-gold/30"></div>
            </div>

            {/* Chamber Walls */}
            {/* Left Wall */}
            <div 
              className="absolute w-[1800px] h-[700px] bg-gradient-to-r from-[#030303] via-neutral-950 to-[#0c0c0c] border-b border-white/5"
              style={{
                transform: "rotateY(90deg) translateZ(-600px) translateY(-50px) translateX(300px)",
                backgroundSize: "200px 100%"
              }}
            >
              {/* Luxury architectural panels and gold vertical moldings */}
              <div className="absolute inset-y-0 right-10 w-[2px] bg-brand-gold/15"></div>
              <div className="absolute inset-y-0 right-80 w-[2px] bg-brand-gold/15"></div>
              <div className="absolute inset-y-0 right-[600px] w-[2px] bg-brand-gold/15"></div>
              <div className="absolute inset-y-0 right-[1100px] w-[2px] bg-brand-gold/15"></div>
            </div>

            {/* Right Wall */}
            <div 
              className="absolute w-[1800px] h-[700px] bg-gradient-to-l from-[#030303] via-neutral-950 to-[#0c0c0c] border-b border-white/5"
              style={{
                transform: "rotateY(-90deg) translateZ(-600px) translateY(-50px) translateX(-300px)"
              }}
            >
              <div className="absolute inset-y-0 left-10 w-[2px] bg-brand-gold/15"></div>
              <div className="absolute inset-y-0 left-80 w-[2px] bg-brand-gold/15"></div>
              <div className="absolute inset-y-0 left-[600px] w-[2px] bg-brand-gold/15"></div>
              <div className="absolute inset-y-0 left-[1100px] w-[2px] bg-brand-gold/15"></div>
            </div>

            {/* Ceiling Lights (warm golden spotlights cascading along) */}
            <div 
              className="absolute w-[300px] h-[2000px] flex justify-between flex-col py-10"
              style={{
                transform: "rotateX(90deg) translateZ(420px) translateY(800px)"
              }}
            >
              {[1, 2, 3, 4, 5].map((light) => (
                <div key={light} className="w-10 h-10 rounded-full bg-white/5 border border-brand-gold/20 flex items-center justify-center glow-[rgba(214,175,55,0.4)] mx-auto">
                  <div className="w-3.5 h-3.5 rounded-full bg-brand-gold/60"></div>
                </div>
              ))}
            </div>

            {/* Mannequins Grid Placed elegantly in the 3D space */}
            {mannequins.map((mannequin, index) => {
              // Calculate visual depth in 3D perspective based on Z coordinate and walking depth
              const zVal = mannequin.zPercent; // e.g. 15, 45, 75
              
              // Map mannequin to coordinate translation
              // Higher zPercent places mannequin deeper in the room
              const worldZ = zVal * -25; // mapped deep under the screen
              
              // Return styled mannequins with interactive hover card
              return (
                <div
                  key={mannequin.id}
                  style={{
                    position: "absolute",
                    transform: `translateX(${mannequin.xOffset}px) translateY(80px) translateZ(${worldZ}px)`,
                    transformStyle: "preserve-3d"
                  }}
                  className="pointer-events-auto cursor-pointer group"
                  onClick={() => onSelectProduct(mannequin.product)}
                >
                  {/* Glowing Spotlight Shadow Ring below base */}
                  <div className="absolute -bottom-2 -left-4 w-28 h-5 bg-brand-gold/20 filter blur-md rounded-full transform rotateX(80deg) scale-110"></div>
                  
                  {/* Metal Stand Base */}
                  <div className="w-20 h-2 bg-gradient-to-r from-neutral-800 to-[#1a1a1a] border border-brand-gold/50 rounded-full relative shadow-lg">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-20 bg-brand-gold/40 border-l border-white/25 z-0 transform -rotateX(90deg) origin-bottom"></div>
                  </div>

                  {/* 3D Mannequin Figure Wearing Gown representation */}
                  <div className="relative w-28 h-[220px] flex flex-col items-center select-none mt-1 group-hover:scale-105 duration-500 transition-transform">
                    {/* Spotlight glow behind gown */}
                    <div className="absolute inset-0 bg-radial-gradient from-brand-gold/15 to-transparent pointer-events-none group-hover:from-brand-gold/25 duration-500 rounded-full filter blur-lg"></div>

                    {/* Mannequin Silhouette */}
                    <div className="w-14 h-[190px] bg-gradient-to-b from-neutral-900 to-black rounded-t-[50px] relative overflow-hidden flex items-center justify-center border-x border-t border-brand-gold/20 shadow-2xl">
                      
                      {/* Wearing Dress Image overlay */}
                      <img
                        src={mannequin.product.image}
                        alt={mannequin.product.name}
                        className="w-full h-full object-cover filter brightness-[0.88] group-hover:brightness-[1] duration-500 transition-all group-hover:scale-105 saturate-[0.95]"
                      />
                      
                      {/* Fine gold embroidery laces/silhouettes over dress */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute inset-x-2 bottom-4 rounded border border-brand-gold/20 p-1.5 bg-black/80 backdrop-blur-md opacity-0 group-hover:opacity-100 duration-300 transform translate-y-2 group-hover:translate-y-0 text-center text-[10px] font-mono text-brand-gold">
                        {lang === "ar" ? "افتح الفحص" : "Inspect"}
                      </div>
                    </div>

                    {/* Neck golden detail */}
                    <div className="w-4 h-4 rounded-full bg-brand-gold/80 border border-white/20 -mt-[198px] relative z-10 shadow-lg"></div>

                    {/* Elegant Holographic tag pointing to the mannequin */}
                    <div className={`absolute ${mannequin.side === "left" ? "left-32 text-left" : "right-32 text-right"} top-10 w-[200px] pointer-events-none space-y-1.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 duration-300 transition-all`}>
                      <span className="font-mono text-[9px] text-brand-gold/80 tracking-widest uppercase bg-black/60 px-2.5 py-0.5 rounded border border-brand-gold/20 inline-block">
                        {lang === "ar" ? "المنيكان الملبس" : "MODEL WEARING"}
                      </span>
                      <h4 className="font-serif text-sm font-light text-white leading-tight min-h-[36px] drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
                        {lang === "ar" ? mannequin.product.nameAr : mannequin.product.name}
                      </h4>
                      <p className="font-mono text-[10px] text-brand-gold/90 bg-neutral-950/80 border border-white/5 py-1 px-2.5 rounded-full inline-block">
                        {mannequin.product.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* 3D Coordinated Camera Cruise HUD Overlay */}
        <div className="absolute top-6 left-6 right-6 z-30 flex justify-between pointer-events-none">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 bg-black/80 hover:bg-neutral-900 border border-brand-gold/30 text-brand-gold font-mono text-xs uppercase px-5 py-2.5 rounded-full tracking-wider transition-all duration-300 pointer-events-auto cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.8)]"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "ar" ? "العودة للبهو الرئيسي ➜" : "Return to Foyer ➜"}
          </button>

          <div className="flex gap-2.5 pointer-events-auto">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-full font-mono text-[10px] tracking-widest text-[#D4AF37] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
              <span>
                {lang === "ar"
                  ? `الكاميرا تسير.. العمق: ${Math.round(depth)}%`
                  : `WALK CRUISING.. DEPTH: ${Math.round(depth)}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Perspective controls */}
        <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col md:flex-row justify-between items-center gap-4 bg-black/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.95)]">
          
          {/* Active Navigation HUD info */}
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-[#D4AF37] text-sm font-light italic flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-gold animate-spin-slow" />
              {lang === "ar" ? "حجرة الأزياء الراقية والمنيكانات" : "Atelier Couture Showcase Room"}
            </h4>
            <p className="font-sans text-[11px] text-white/40 font-light">
              {lang === "ar"
                ? "يتحرك المنظور بهدوء وبطء في ممر العرض. على اليمين واليسار المنيكانات ترتدي الملابس المنشورة. انقر على أي منيكان لمعاينة القطعة."
                : "Automatic quiet cruise forwards & backwards through the runway showroom. Mannequins on outer flanks wear custom published garments."}
            </p>
          </div>

          {/* Active Manual Cruise dials */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Speed selection */}
            <div className="flex items-center gap-2 bg-neutral-950/80 border border-white/5 px-3 py-1.5 rounded-full">
              <span className="font-mono text-[9px] text-white/45">SPEED:</span>
              {[0.02, 0.05, 0.09].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setWalkSpeed(spd)}
                  className={`text-[9px] font-mono px-2.5 py-1 rounded-full ${
                    walkSpeed === spd
                      ? "bg-brand-gold text-black font-bold"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {spd === 0.02 ? "SLOW" : spd === 0.05 ? "CRUISE" : "WARP"}
                </button>
              ))}
            </div>

            {/* Direction Selection */}
            <button
              onClick={() => {
                setWalkDirection((prev) => (prev === "forward" ? "backward" : "forward"));
              }}
              className="px-4 py-2 bg-neutral-950/80 hover:bg-neutral-900 border border-white/5 text-white/70 hover:text-white font-mono text-[9px] uppercase rounded-full duration-300 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3 text-brand-gold" />
              {lang === "ar" ? `الاتجاه: ${walkDirection === "forward" ? "للأمام" : "للخلف"}` : `DIR: ${walkDirection.toUpperCase()}`}
            </button>

            {/* Play / Pause toggle */}
            <button
              onClick={() => setIsWalking(!isWalking)}
              className="p-3 bg-brand-gold text-black rounded-full hover:bg-white duration-300 transition-colors shadow-lg"
              title={isWalking ? "Pause walking" : "Start walking"}
            >
              {isWalking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
