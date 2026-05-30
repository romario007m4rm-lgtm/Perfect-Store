import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MessageSquare, Send, X, ArrowLeft, Loader, HelpCircle } from "lucide-react";
import { ChatMessage, Product } from "../types";
import { BRAND_LOGO_URL } from "../data";

interface CuratorEyeProps {
  lang: "ar" | "en";
  selectedProduct?: Product;
  onSelectProduct?: (product: Product) => void;
  products: Product[];
}

export default function CuratorEye({ lang, selectedProduct, onSelectProduct, products }: CuratorEyeProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "eye",
      text:
        lang === "ar"
                    ? "مرحباً بك في الصرح الخاص بـ PERFECT STORE. أنا 'العين الحارسة' (The Sentinel Eye)، منسقك الشخصي للأناقة الفائقة. اسألني عن القصص الغامضة وراء معروضاتنا، أو اطلب توصية تليق بهيبتك."
          : "Welcome to the private sanctuary of PERFECT STORE. I am 'The Sentinel Eye', your personal curator of absolute luxury. Ask me of the deep stories behind our creations, or seek a customized aesthetic recommendation.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"visual" | "chat">("visual");
  const [statusText, setStatusText] = useState<string>(lang === "ar" ? "العين تراقب..." : "The Sentinel Eye is watching...");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eyeCardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update starting message when language changes
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([
        {
          sender: "eye",
          text:
            lang === "ar"
              ? "مرحباً بك في الصرح الخاص بـ PERFECT STORE. أنا 'العين الحارسة' (The Sentinel Eye)، منسقك الشخصي للأناقة الفائقة. اسألني عن القصص الغامضة وراء معروضاتنا، أو اطلب توصية تليق بهيبتك."
              : "Welcome to the private sanctuary of PERFECT STORE. I am 'The Sentinel Eye', your personal curator of absolute luxury. Ask me of the deep stories behind our creations, or seek a customized aesthetic recommendation.",
        },
      ]);
    }
  }, [lang]);

  // Adjust Status texts randomly for immersive atmosphere
  useEffect(() => {
    const statusesEN = [
      "Sentinel Eye is watching...",
      "Inspecting luxury contours...",
      "Analyzing gold reflection nodes...",
      "Consulting traditional Milanese weavers...",
      "Talismanic alignment in progress..."
    ];
    const statusesAR = [
      "العين الحارسة تراقب بدقة...",
      "تفحص تدرّجات صقل المعادن...",
      "تحليل مؤشرات رونق الذهب...",
      "التشاور مع النساجين في ميلان...",
      "مواءمة التفاصيل الملكية مستمرة..."
    ];

    const timer = setInterval(() => {
      const list = lang === "ar" ? statusesAR : statusesEN;
      const idx = Math.floor(Math.random() * list.length);
      setStatusText(list[idx]);
    }, 8000);

    return () => clearInterval(timer);
  }, [lang]);

  // Handle Parallax Eye effect - disabled as per user request
  const handleMouseMove = (e: React.MouseEvent) => {
    // Disabled to stop any eye movement or reaction on mouse moves
  };

  const handleMouseLeave = () => {
    // Disabled
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (customText?: string) => {
    const textToSend = (customText || inputVal).trim();
    if (!textToSend || loading) return;

    if (!customText) setInputVal("");

    const newMsgs = [...messages, { sender: "user" as const, text: textToSend }];
    setMessages(newMsgs);
    setLoading(true);
    setActiveTab("chat");

    try {
      const response = await fetch("/api/curator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          previousMessages: newMsgs,
          selectedProduct: selectedProduct ? `${selectedProduct.name} (${selectedProduct.price})` : undefined,
        }),
      });

      if (!response.ok) throw new Error("API Route failure");

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "eye", text: data.text }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          sender: "eye",
          text:
            lang === "ar"
              ? "تحذير من البوابة الأمنية: وقعت صعوبة أثناء الاتصال بـ العين الحارسة. يرجى مراجعة إعدادات المفتاح وتجربة السؤال لاحقاً."
              : "Security response: Could not establish path to the Sentinel Curator. Please verify your GEMINI_API_KEY config.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Preset queries depending on language
  const ArabicSuggestions = [
    { label: "ما قصة ساعة الأونيكس الأزلية؟", query: "أريد معرفة تفاصيل وقصة ساعة الأونيكس الأزلية وطريقة الارتباط بأرضية المعرض" },
    { label: "اقترح تنسيقاً لقلادة الياقوت", query: "اقترح لي طقم ملابس ومناسبة تناسب قلادة الياقوت الملكي الإمبراطورية" },
    { label: "حدثني عن ندرة الزمرد الخام", query: "ما الذي يجعل حجر الزمرد في خاتم الزمرد الإمبراطوري نادراً جداً ومميزاً عما يباع بالمتاجر؟" },
    { label: "أريد تخصيص قطعة ملكية", query: "كيف يمكنني حفر الرمز التسلسلي لـ PERFECT وتخصيص قطعة مذهلة؟" },
  ];

  const EnglishSuggestions = [
    { label: "What's the story of the Onyx Watch?", query: "Tell me the lore and craftsmanship details of the Onyx Chronometer." },
    { label: "Suggest styling for the Sapphire Choker", query: "How should I style the Sovereign Sapphire Choker and for what occasion?" },
    { label: "Why is the raw Emerald Ring highly rare?", query: "Explain why the Colombian Emerald in the Imperial Ring is unique compared to ordinary jewelry." },
    { label: "How to customize my jewelry?", query: "Explain how I can personalize and engrave custom serial numbers into a bespoke creation." },
  ];

  const currentSuggestions = lang === "ar" ? ArabicSuggestions : EnglishSuggestions;

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start selection:bg-brand-gold selection:text-black" id="curator-desk">
      
      {/* Title block for broad layout */}
      <div className="col-span-12 text-center mb-4">
        <span className="text-brand-gold font-mono text-xs uppercase tracking-widest block mb-2">
          {lang === "ar" ? "قناة النخبة الاستشارية" : "Elite Advisory Console"}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-neutral-100 font-normal tracking-tight">
          {lang === "ar" ? "تحدث مع العين الحارسة" : "Commune with the Sentinel"}
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-4"></div>
      </div>

      {/* Left Column: Visual Eye Artpiece & Showcase Frame */}
      <div className="col-span-12 lg:col-span-5 flex flex-col items-center">
        <div
          ref={eyeCardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-square md:max-w-[420px] rounded-2xl overflow-hidden border border-white/10 bg-[#0C0C0C] p-[3px] shadow-[0_0_50px_rgba(212,175,55,0.03)] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(212,175,55,0.12)] cursor-crosshair group"
        >
          {/* Internal thin golden line border */}
          <div className="absolute inset-4 rounded-xl border border-brand-gold/10 pointer-events-none group-hover:border-brand-gold/20 transition-colors duration-500"></div>
          
          {/* Subtle gold line grid backdrop */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          {/* Golden rotating indicator orbits */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[88%] h-[88%] rounded-full border border-dashed border-brand-gold/10 animate-[spin_120s_linear_infinite]"></div>
            <div className="absolute w-[72%] h-[72%] rounded-full border border-brand-gold/5 animate-[spin_80s_linear_infinite_reverse]"></div>
            <div className="absolute w-[50%] h-[50%] rounded-full border border-brand-gold/15"></div>
          </div>

          <div className="w-full h-full rounded-2xl overflow-hidden relative flex flex-col justify-between p-6">
            <div className="z-10 flex justify-between items-start w-full">
              <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 font-mono text-[10px] text-brand-gold/90 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                {lang === "ar" ? "نظام كفاءة أثري" : "SENTINEL PROTOCOL"}
              </div>
              <HelpCircle className="w-4 h-4 text-white/40 hover:text-brand-gold transition-colors cursor-pointer" />
            </div>

            {/* Parallax Moving Image container */}
            <div className="absolute inset-x-8 inset-y-16 flex items-center justify-center overflow-hidden rounded-xl">
              <motion.div
                animate={{
                  x: mousePos.x,
                  y: mousePos.y,
                  scale: 1.05
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full h-full relative"
              >
                <img
                  src={BRAND_LOGO_URL}
                  alt="Perfect Eye"
                  className="w-full h-full object-cover rounded-xl filter contrast-[1.08] saturate-[1.1]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Glowing lens flares overlaid on blue pupil */}
                <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent pointer-events-none mix-blend-screen animate-pulse"></div>
              </motion.div>
            </div>

            {/* Bottom Status bar */}
            <div className="z-10 w-full bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10 mt-auto">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-brand-gold/80 animate-pulse"></div>
                <p className="font-mono text-xs text-white/85 tracking-wide select-none">
                  {statusText}
                </p>
              </div>
              {selectedProduct && (
                <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center gap-2 justify-between">
                  <span className="text-[10px] text-white/40 uppercase font-mono">
                    {lang === "ar" ? "تفحص نشط" : "Focusing Item"}
                  </span>
                  <span className="text-xs text-brand-gold font-serif truncate max-w-[200px]">
                    {lang === "ar" ? selectedProduct.nameAr : selectedProduct.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual / Chat micro tab-pills */}
        <div className="flex bg-[#0C0C0C] border border-white/10 rounded-full p-1 mt-5 gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab("visual")}
            className={`px-5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
              activeTab === "visual"
                ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/20"
                : "text-white/40 hover:text-white"
            }`}
          >
            {lang === "ar" ? "لوحة التأثيرات" : "Elegance Art"}
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
              activeTab === "chat"
                ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/20"
                : "text-white/40 hover:text-white"
            }`}
          >
            {lang === "ar" ? "قناة الحوار المباشر" : "Dialogue Hub"}
          </button>
        </div>
      </div>

      {/* Right Column: Dynamic Curation Dialogue Board */}
      <div className="col-span-12 lg:col-span-7">
        <div className="w-full bg-[#0C0C0C]/90 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[520px] shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
          {/* Header Area */}
          <div className="p-4 bg-[#080808]/60 border-b border-white/10 flex justify-between items-center px-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-gold/30 flex items-center justify-center bg-black/60">
                <img src={BRAND_LOGO_URL} alt="Min Eye" className="w-[124%] h-[124%] object-cover scale-110" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-light text-white tracking-wide">
                  {lang === "ar" ? "مستشاري منسق الأناقة" : "Sentinel Eye Curator"}
                </h4>
                <p className="font-mono text-[9px] text-[#D4AF37] flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand-gold inline-block animate-pulse"></span>
                  {lang === "ar" ? "نظام الموديل نشط وجاهز" : "Gemini Generative Engine active"}
                </p>
              </div>
            </div>

            {messages.length > 2 && (
              <button
                onClick={() =>
                  setMessages([
                    {
                      sender: "eye",
                      text:
                        lang === "ar"
                          ? "تمت تصفية مسار الذاكرة بنجاح. أنا في خدمتكم مرة أخرى بأعلى درجات الالتزام."
                          : "Dialogue reset complete. Ready to receive your luxurious inquiries.",
                    },
                  ])
                }
                className="text-[10px] text-white/40 hover:text-brand-gold font-mono transition-colors border border-white/10 px-2.5 py-1 rounded"
              >
                {lang === "ar" ? "إعادة تهيئة" : "Reset Portal"}
              </button>
            )}
          </div>

          {/* Chat Messages Log Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-850">
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start gap-3`}
                >
                  {msg.sender === "eye" && (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-brand-gold/20 bg-black flex-shrink-0 flex items-center justify-center mt-1">
                      <img src={BRAND_LOGO_URL} alt="logo" className="w-[120%] h-[120%] object-cover scale-110" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-brand-gold/15 border border-brand-gold/20 text-white rounded-tr-none"
                        : "bg-[#080808]/80 border border-white/10 text-white/90 rounded-tl-none whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-brand-gold/20 bg-black flex-shrink-0 flex items-center justify-center">
                    <img src={BRAND_LOGO_URL} alt="logo" className="w-[124%] h-[124%] object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="bg-[#080808]/50 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <Loader className="w-3.5 h-3.5 text-brand-gold animate-spin" />
                    <span className="font-mono text-xs text-white/40">
                      {lang === "ar" ? "العين تنسق حروف الإجابة الملكية..." : "The Sentinel drafting elegance..."}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Quick preset suggestions buttons */}
          <div className="px-6 py-2.5 bg-black/40 border-t border-white/10">
            <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-none snap-x font-serif">
              {currentSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s.query)}
                  className="flex-shrink-0 bg-neutral-900/40 hover:bg-brand-gold/5 border border-white/10 hover:border-brand-gold/30 text-white/70 hover:text-brand-gold px-3.5 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer snap-start"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input control form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-4 bg-[#080808]/80 border-t border-white/10 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={
                lang === "ar"
                  ? "اسأل عين المصمم عن خامات القطع والتنسيقات الفاخرة..."
                  : "Query the curator regarding fabrics, gold grades, silhouettes..."
              }
              className="flex-1 bg-black border border-white/10 hover:border-white/20 focus:border-brand-gold/40 focus:outline-none rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-white/20 transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputVal.trim()}
              className="bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold hover:text-brand-gold border border-brand-gold/20 duration-300 p-3 rounded-xl disabled:opacity-40 disabled:hover:bg-brand-gold/10 transition-all flex items-center justify-center text-center cursor-pointer"
            >
              <Send className={`w-4 h-4 ${lang === "ar" ? "scale-x-[-1]" : ""}`} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
