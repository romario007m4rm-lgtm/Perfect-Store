import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  PlusCircle,
  FileText,
  BadgeDollarSign,
  Layers,
  Image as ImageIcon,
  Scroll,
  Check,
  PackageCheck,
  FolderSync
} from "lucide-react";
import { Product } from "../types";

interface AdminPanelProps {
  lang: "ar" | "en";
  onPublishProduct: (product: Product) => void;
  existingCount: number;
  onResetProducts: () => void;
}

// Gorgeous stable unsplash fashion dress images that look extremely luxurious
const SAMPLE_COUTURE_IMAGES = [
  {
    name: "Obsidian Stardust Gown",
    nameAr: "ثوب غبار النجوم الأسود",
    url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Emerald Sovereign Velour",
    nameAr: "مخمل الزمرد الإمبراطوري",
    url: "https://images.unsplash.com/photo-1539008885128-40d147806135?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Regal Ivory Silk Cape",
    nameAr: "عباءة الحرير العاجية",
    url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Crimson Eclipse Gown",
    nameAr: "فستان الكسوف القرمزي",
    url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600",
  }
];

export default function AdminPanel({
  lang,
  onPublishProduct,
  existingCount,
  onResetProducts
}: AdminPanelProps) {
  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    category: "couture" as const,
    price: "",
    image: SAMPLE_COUTURE_IMAGES[0].url,
    description: "",
    descriptionAr: "",
    rarity: "Bespoke Only - Tailored To Order",
    rarityAr: "تصميم مخصص حسب المقاس والطلب",
    materials: "Premium Mulberry Silk, Hand-spun Gold Filigree",
    materialsAr: "حرير التوت الفاخر، خيوط ذهبية مغزولة يدوياً",
    story: "A majestic dress designed to command attention and represent deep cosmic alignment.",
    storyAr: "ثوب ملكي صُمم ليفرض هيبته وحضوره الأخاذ مستوحى من خطوط الفلك والجاذبية اللانهائية."
  });

  const [notification, setNotification] = useState<string | null>(null);

  const selectPreset = (idx: number) => {
    const preset = SAMPLE_COUTURE_IMAGES[idx];
    setFormData((prev) => ({
      ...prev,
      name: `${preset.name} Specification`,
      nameAr: preset.nameAr,
      image: preset.url,
      price: `$${(28000 + idx * 8500).toLocaleString()}`,
      description: `An exquisite haute couture masterpiece centering ${preset.name.toLowerCase()} silhouettes, adorned with custom gold and silver wire work.`,
      descriptionAr: `تحفة فنية للأزياء الراقية تجسد قوام ${preset.nameAr}، مزخرفة بضفائر من أسلاك الذهب والفضة اللامعة.`
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.nameAr || !formData.price || !formData.image) return;

    // Split materials
    const matsEn = formData.materials.split(",").map(m => m.trim()).filter(Boolean);
    const matsAr = formData.materialsAr.split(",").map(m => m.trim()).filter(Boolean);

    // Form product object
    const newProduct: Product = {
      id: `custom-couture-${Date.now()}`,
      name: formData.name,
      nameAr: formData.nameAr,
      category: formData.category,
      categoryAr: formData.category === "couture" ? "أزياء راقية" : "مجوهرات حصرية",
      price: formData.price,
      image: formData.image,
      description: formData.description,
      descriptionAr: formData.descriptionAr,
      details: ["Bespoke handcrafted custom dress", "Reinforced gold thread work over shoulders"],
      detailsAr: ["فستان مفصل خصيصاً يدوياً", "تطريز ذهبي مدعم على الأكتاف والياقة"],
      craftsmanship: "Meticulously hand-spun over 200 hours in our atelier.",
      craftsmanshipAr: "صيغ يدوياً بحب تام على مدار ٢٠٠ ساعة عمل متصلة.",
      rarity: formData.rarity,
      rarityAr: formData.rarityAr,
      materials: matsEn,
      materialsAr: matsAr,
      story: formData.story,
      storyAr: formData.storyAr
    };

    onPublishProduct(newProduct);
    
    // Trigger success notification
    setNotification(lang === "ar" ? "تم نشر الموديل بنجاح! ارتدته المنيكانات في حجرة العرض الآن." : "Masterpiece Published! Mannequins inside Couture Room are now decorated.");
    setTimeout(() => setNotification(null), 7000);

    // Reset some fields
    setFormData((prev) => ({
      ...prev,
      name: "",
      nameAr: "",
      price: ""
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-6 bg-[#090909]/95 border border-white/10 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.85)] relative overflow-hidden" id="admin-vault">
      {/* Absolute gold highlight */}
      <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-5 border-b border-white/10">
        <div>
          <span className="text-brand-gold font-mono text-[9px] uppercase tracking-[0.25em] block mb-1">
            {lang === "ar" ? "مركز الإشراف والتحكم بالمنتجات" : "CURATOR VAULT CONTROL PANEL"}
          </span>
          <h3 className="font-serif text-2xl text-neutral-100 font-light flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-brand-gold" />
            {lang === "ar" ? "نشر وتفصيل فستان مخصص للمنيكانات" : "Publish Custom Masterpiece Gown"}
          </h3>
          <p className="text-xs text-white/40 mt-1">
            {lang === "ar"
              ? "القطع المضافة هنا تظهر مباشرةً على المنيكانات يميناً ويساراً في الممر ثلاثي الأبعاد."
              : "Items published using this console instantly apply to the 3D mannequins in our Couture Runway."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-black/60 border border-white/5 py-1.5 px-4 rounded-full font-mono text-[10px] text-white/50">
            {lang === "ar" ? `القطع المنشورة: ${existingCount}` : `Total Vault: ${existingCount} items`}
          </span>

          <button
            onClick={onResetProducts}
            title="Reset to default products"
            className="p-2 bg-neutral-900 hover:bg-red-950/20 text-white/40 hover:text-red-400 border border-white/5 hover:border-red-900/30 rounded-xl transition-all duration-300 cursor-pointer text-xs uppercase font-mono flex items-center gap-1.5"
          >
            <FolderSync className="w-3.5 h-3.5" />
            {lang === "ar" ? "إعادة تعيين الافتراضي" : "Reset Data"}
          </button>
        </div>
      </div>

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="bg-brand-gold/10 border border-brand-gold/30 text-brand-gold rounded-2xl p-4 mb-6 text-xs flex items-center gap-2.5 font-sans"
        >
          <div className="bg-brand-gold/20 p-1 rounded-full text-brand-gold">
            <PackageCheck className="w-4 h-4" />
          </div>
          <p className="font-medium">{notification}</p>
        </motion.div>
      )}

      {/* Preset Fast Select Gowns Row as clickable buttons */}
      <div className="mb-8 bg-black/40 rounded-2xl p-5 border border-white/5 space-y-3.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
          {lang === "ar" ? "اختيار سريع من النماذج الراقية المتوفرة بالأتيلييه:" : "Fast-track specimens layout (click to import):"}
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SAMPLE_COUTURE_IMAGES.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => selectPreset(idx)}
              className="bg-neutral-900/50 hover:bg-[#0c0c0c] border border-white/10 hover:border-brand-gold/45 rounded-xl p-2 text-left flex gap-2.5 items-center transition-all duration-300 cursor-pointer truncate"
            >
              <img
                src={img.url}
                alt={img.name}
                className="w-10 h-10 object-cover rounded-lg border border-white/10 flex-shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-[11px] font-serif font-light text-white truncate">{lang === 'ar' ? img.nameAr : img.name}</p>
                <span className="text-[9px] font-mono text-brand-gold">SPECIMEN {idx + 1}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
        
        {/* Name English */}
        <div className="space-y-1.5">
          <label className="text-white/45 block uppercase font-mono text-[9px] tracking-wider flex items-center gap-1">
            <FileText className="w-3 h-3 text-brand-gold" />
            Product Gown Name (English):
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Majestic Midnight Gold Cloak"
            className="w-full bg-black border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 px-4 text-white"
          />
        </div>

        {/* Name Arabic */}
        <div className="space-y-1.5 text-right">
          <label className="text-white/45 block uppercase font-mono text-[9px] tracking-wider flex items-center gap-1 justify-end">
            اسم الفستان / الموديل (باللغة العربية):
            <FileText className="w-3 h-3 text-brand-gold" />
          </label>
          <input
            type="text"
            required
            dir="rtl"
            value={formData.nameAr}
            onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
            placeholder="مثال: عباءة الغسق الليلية المطرزة بالياقوت"
            className="w-full bg-black border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 px-4 text-white text-right"
          />
        </div>

        {/* Price Tag */}
        <div className="space-y-1.5">
          <label className="text-white/45 block uppercase font-mono text-[9px] tracking-wider flex items-center gap-1">
            <BadgeDollarSign className="w-3 h-3 text-brand-gold" />
            Luxury Price Tag:
          </label>
          <input
            type="text"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g. $42,500"
            className="w-full bg-black border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 px-4 text-white font-mono"
          />
        </div>

        {/* Custom Image URL */}
        <div className="space-y-1.5">
          <label className="text-white/45 block uppercase font-mono text-[9px] tracking-wider flex items-center gap-1">
            <ImageIcon className="w-3 h-3 text-brand-gold" />
            Gown Image URL:
          </label>
          <input
            type="text"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="Past photographic dress url or use presets above"
            className="w-full bg-black border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 px-4 text-white truncate font-mono"
          />
        </div>

        {/* Story EN */}
        <div className="space-y-1.5">
          <label className="text-white/45 block uppercase font-mono text-[9px] tracking-wider flex items-center gap-1">
            <Scroll className="w-3 h-3 text-brand-gold" />
            Curatorial Story & Aura (English):
          </label>
          <textarea
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            placeholder="Write a mysterious, luxurious tale of who should wear this."
            rows={2}
            className="w-full bg-black border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 px-4 text-white"
          />
        </div>

        {/* Story AR */}
        <div className="space-y-1.5 text-right">
          <label className="text-white/45 block uppercase font-mono text-[9px] tracking-wider flex items-center gap-1 justify-end">
            قصة وهيبة القطعة الملهمة (بالعربية):
            <Scroll className="w-3 h-3 text-brand-gold" />
          </label>
          <textarea
            dir="rtl"
            value={formData.storyAr}
            onChange={(e) => setFormData({ ...formData, storyAr: e.target.value })}
            placeholder="اكتب عبارات شاعرية وملهمة تصف هيبة هذا الثوب وفخامته."
            rows={2}
            className="w-full bg-black border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 px-4 text-white text-right"
          />
        </div>

        {/* Materials list */}
        <div className="space-y-1.5">
          <label className="text-white/45 block uppercase font-mono text-[9px] tracking-wider">
            Primary materials (comma separated):
          </label>
          <input
            type="text"
            value={formData.materials}
            onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
            className="w-full bg-black border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 px-4 text-white"
          />
        </div>

        {/* Materials list Arabic */}
        <div className="space-y-1.5 text-right">
          <label className="text-white/45 block uppercase font-mono text-[9px] tracking-wider">
            المواد الفاخرة المشغولة (مفصولة بفاصلة):
          </label>
          <input
            type="text"
            dir="rtl"
            value={formData.materialsAr}
            onChange={(e) => setFormData({ ...formData, materialsAr: e.target.value })}
            className="w-full bg-black border border-white/10 focus:border-brand-gold/30 focus:outline-none rounded-xl py-3 px-4 text-white text-right"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            className="w-full bg-brand-gold hover:bg-white text-black font-mono text-center uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-300 font-bold shadow-[0_4px_30px_rgba(212,175,55,0.15)] cursor-pointer text-xs"
          >
            {lang === "ar" ? "تطريز الفستان ونشره للمعرض ➜" : "Embroider & Publish to Showroom mannequins ➜"}
          </button>
        </div>
      </form>
    </div>
  );
}
