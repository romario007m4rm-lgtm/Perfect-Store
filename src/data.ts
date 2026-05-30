import { Product } from "./types";

export const BRAND_LOGO_URL = "/src/assets/images/perfect_logo_eye_1780094109883.png";

export const PRODUCTS: Product[] = [
  // 1. WOMEN'S DRESSES
  {
    id: "charcoal-silk-gown",
    name: "The Imperial Charcoal Silk Gown",
    nameAr: "عباءة الحرير الفحمية والذهبية",
    category: "womens_dresses",
    categoryAr: "فساتين أزياء راقية",
    price: "$35,000",
    description: "An exclusive, majestic custom-draped couture silk gown crafted in deep charcoal-black silk fibers, adorned with extensive gold-thread custom embroidery. Available via Amazon Premium Luxury Concierge.",
    descriptionAr: "عباءة ملكية من قماش الحرير الطبيعي بلون الفحم الحالك، منسوجة ومطرزة بخيوط من الذهب الخالص في تفاصيل ملهمة تفيض هيبة وأناقة. متوفرة عبر خدمة أمازون كونسيرج للأزياء الفاخرة.",
    image: "/src/assets/images/product_gold_gown_1780094164089.png",
    details: [
      "Fabric: 100% heavy mulberry silk raw-spun to give a matte charcoal structure.",
      "Embroidery: Authentic 24k gold leaf-wrapped silk threads hand-stitched over 4 weeks.",
      "Clasp: Solid gold structural neck fastener in the form of a minimalist open eye.",
      "Custom tailored to client's exact proportions upon purchase reservation."
    ],
    detailsAr: [
      "النسيج: حرير التوت الطبيعي الثقيل بنسبة 100% بلون الفحم الداكن المعتم.",
      "التطريز: خيوط حريرية مطلية بذهب عيار 24 قيراط مطرزة يدوياً على مدار 4 أسابيع.",
      "العقدة: مشبك رقبة من الذهب الخالص يتخذ هيئة الرمز الفني للعين الحارسة.",
      "يتم تفصيلها بالكامل وفقاً للقياسات الشخصية الدقيقة لكل عميل فور طلب الحجز."
    ],
    craftsmanship: "Draped using classical techniques that negate structural seams, allowing the heavy charcoal silk to flow continuously, evoking the grand silhouettes of architectural columns.",
    craftsmanshipAr: "تمت دراستها وتفصيلها بأساليب كلاسيكية مذهلة لتقليل الخياطة الهيكلية، مما يسمح للحرير الثقيل بالتدفق والتموج بانسيابية تامة تشبه الأعمدة الرخامية الشامخة.",
    rarity: "Bespoke Only - Tailored To Order",
    rarityAr: "تصميم مخصص حسب المقاس والطلب (Bespoke)",
    materials: ["Mulberry Charcoal Silk", "24k Gold leaf embroidery thread", "Solid Gold Clasp"],
    materialsAr: ["حرير التوت الفحمي", "خيوط ذهب حقيقي عيار 24", "قفل ذهب نقي صلب"],
    story: "Designed to merge sculpture with dress. This gown commands the room, casting a majestic shadow when illuminated by warm spotlights. The hand embroidery represents energy waves emanating from the soul.",
    storyAr: "تم تجميع هذا الثوب ليمزج بين نحت التماثيل الكلاسيكية وقصات الأزياء الراقية. تفرض العباءة حضورها بتموجاتها الفحمية، وماتطريزها الذهبي إلا دفقات شعاع تنطلق لتأسر ذائقة الناظرين.",
    brand: "PERFECT Ateliers x Amazon Luxury",
    brandAr: "أتيلييه PERFECT x أمازون لكجري",
    rating: 4.9,
    colors: ["Charcoal Black & Gold", "Midnight Onyx & Platinum", "Royal Crimson & Bronze"],
    sizes: ["US 2 / XS", "US 4 / S", "US 6 / M", "US 8 / L", "Bespoke Size"],
    amazonUrl: "https://www.amazon.com/s?k=luxury+couture+silk+gown"
  },
  {
    id: "velvet-evening-gown",
    name: "Royal Golden-Embroided Velvet Gown",
    nameAr: "فستان الحرير المخملي الإمبراطوري",
    category: "womens_dresses",
    categoryAr: "أزياء مخملية راقية",
    price: "$24,500",
    description: "An intensely rich midnight blue silk velvet evening dress draped by hand, featuring structured shoulders and delicate gold thread borders running along the split cuffs.",
    descriptionAr: "فستان سهرة فريد من الحرير المخملي الأزرق الداكن منسوج يدوياً، بتصميم أكتاف هندسية جذابة وحدود مطرزة يدوياً بخيوط الذهب الفاخرة على طول الأكمام المفتوحة.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    details: [
      "Material: 100% premium Italian silk-base velvet with a fluid liquid sheen.",
      "Hardware: Signature gold-trim loops and supportive inner corset boning.",
      "Sourcing: Available exclusively on Amazon Luxury Stores with authenticated certifications."
    ],
    detailsAr: [
      "الخامات: مخمل حريري إيطالي ممتاز بنسبة 100% بريق سائل مذهل.",
      "الإكسسوارات: حلقات ذهبية وزوايا داخلية داعمة للجسد لتناسق إيجابي فريد.",
      "المصدر: متوفر حصرياً في متجر أمازون الفاخر مع توثيق أصالة معتمد."
    ],
    craftsmanship: "The velvet is brushed in a single downward direction in Florence to ensure that light bends symmetrically around the wearer's curves, creating a majestic deep shadow play.",
    craftsmanshipAr: "تم صقل المخمل باتجاه سفلي موحد في فلورنسا لضمان انكسار الضوء بتناسق جمالي حول منحنيات الجسد، صانعاً تموجات ظل ملكية لا تضاهى.",
    rarity: "Limited Run of 10 Pieces",
    rarityAr: "إصدار محدود بـ 10 قطع فقط عالمياً",
    materials: ["Italian Silk Velvet", "18k Solid Gold Threads", "Satin Linings"],
    materialsAr: ["مخمل حريري إيطالي", "خيوط ذهب صلبة عيار 18", "بطانة من الساتان النقي"],
    story: "Conceived during a moonlit stroll along the Grand Canal in Venice. The midnight blue fabric is designed to mirror deep lagoon waters shimmering under ancient gaslamps.",
    storyAr: "مستوحى من نزهة ليلية شاعرة على ضفاف القناة الكبرى في البندقية. صُمم القماش الأزرق ليعكس زرقة مياه البحيرة العميقة المتلألئة تحت أضواء المصابيح العتيقة.",
    brand: "Venice Imperial",
    brandAr: "براند فينيس إمبراطوري",
    rating: 4.8,
    colors: ["Venetian Blue & Gold", "Obsidian Black", "Imperial Emerald Velvet"],
    sizes: ["US 4 / S", "US 6 / M", "US 8 / L"],
    amazonUrl: "https://www.amazon.com/s?k=luxury+velvet+evening+gown"
  },

  // 2. MAXI DRESSES
  {
    id: "maxi-gold-brocade",
    name: "Sovereign Golden Brocade Maxi",
    nameAr: "فستان ماكسي بروكار الذهب",
    category: "maxi_dresses",
    categoryAr: "فساتين ماكسي الفخمة",
    price: "$19,800",
    description: "An absolute display-stopping long maxi column silhouette woven in historical Damascus gold threads and midnight silk, designed to create a towering posture.",
    descriptionAr: "فستان ماكسي طويل شامخ منسوج بخيوط البروكار الدمشقي التقليدي مع قماش الحرير الإمبراطوري الحالك، صُمم ليفرض حضوراً مهيباً وتناسق قوام أخّاذ.",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600",
    details: [
      "Weave: Authentic jacquard brocade with raised gold leaf threads.",
      "Lining: Super-fine habotai silk lining for seamless skin touch comfort.",
      "Origin: Imported from Amazon Haute Couture collectors network."
    ],
    detailsAr: [
      "النسيج: بروكار جاكار أصيل مرصع بخيوط حريرية مطلية بذهب عيار 24 قيراط.",
      "البطانة: حرير هابوتاي ناعم للغاية لتلامس فائق العذوبة والنعومة مع البشرة.",
      "المصدر: مستورد من شبكة جامعي الأزياء الراقية لدى أمازون."
    ],
    craftsmanship: "Every single gold leaf motif along the gown is raised using double-weft handlooms to ensure texture density, achieving museum-grade historical weight.",
    craftsmanshipAr: "تم حياكة كل نقشة ذهبية بارزة بعناية دقيقة على نول الحياكة اليدوي ذو اللحمة المزدوجة ومطلي بالذهب عيار 24 ليكون بمثابة قطعة متحفية ترتديها.",
    rarity: "Bespoke Production (Only Custom Orders)",
    rarityAr: "إنتاج مخصص حسب الطلب للعملاء الكبار",
    materials: ["Damascus Gold Brocade", "Habotai Silk", "Pearly Clasps"],
    materialsAr: ["بروكار ذهبي دمشقي", "حرير هابوتاي الفاخر", "مشاربك لؤلؤية طبيعية"],
    story: "A celebration of ancient Byzantine dynasties. The golden patterns trace the shapes of crown laurels, elevating the wearer into a status of raw sovereign majesty.",
    storyAr: "احتفال بالهيبة والملوكية الإمبراطورية. تتتبع الزخارف الذهبية تفاصيل أكاليل الغار الإمبراطورية، لتضعك في قلب الضوء والهالة الملكية الرائعة.",
    brand: "Byzantine Atelier",
    brandAr: "أتيلييه بيزنطة الفاخر",
    rating: 5.0,
    colors: ["Damascus Gold", "Imperial Ivory & Platinum"],
    sizes: ["US 2 / XS", "US 4 / S", "US 6 / M", "US 8 / L", "Bespoke Size"],
    amazonUrl: "https://www.amazon.com/s?k=designer+gold+brocade+maxi+dress"
  },

  // 3. MEN'S FASHION
  {
    id: "mens-bespoke-tux",
    name: "Sovereign Midnight Peak Tuxedo",
    nameAr: "بدلة توكسيدو الغسق الإمبراطورية",
    category: "mens_fashion",
    categoryAr: "أزياء رجالية فاخرة",
    price: "$16,500",
    description: "An exquisite men's tuxedo tailored using exceptionally fine super-180 Mongolian wool, accompanied by structured silk satin peak lapels and hand-beaten gold accent buttons.",
    descriptionAr: "بدلة رجالية فاخرة تمت حياكتها من صوف سوبر 180 المغولي فائق النعومة، مع ياقة مدببة من الساتان الحريري وأزرار مذهبة مشغولة يدوياً بنقش دقيق.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
    details: [
      "Structure: Fully-canvased construction with soft Neapolitan shoulder drapes.",
      "Linings: Pure jacquard gold lining patterned with our geometric logo.",
      "Amazon Luxury verified checkout with climate-neutral signature delivery."
    ],
    detailsAr: [
      "الهيكل: كانفاس مغزل بالكامل مع لمسات وحياكة نابولية ناعمة للاكتاف.",
      "البطانة: حرير جاكار ذهبي نقي يحمل شعار PERFECT الهندسي المطرز.",
      "طريقة الدفع: شحن آمن وسريع عبر أمازون لكجري مع تسليم شخصي موثق."
    ],
    craftsmanship: "The lapels are padded using over 4,000 microscopic manual stitches inside the wool canvas to guarantee they roll naturally over the chest without stiff crease lines.",
    craftsmanshipAr: "تم تدعيم طية صدر السترة من الداخل بأكثر من 4,000 غرزة يدوية مجهرية لضمان التفافها الطبيعي والأنيق على الصدر دون تجاعيد.",
    rarity: "1 of 15 Masterpieces",
    rarityAr: "تحفة فنية فريدة (15 قطعة فقط في العالم)",
    materials: ["Super 180s Cashmere Wool", "Silk Satin", "Hand-cast Gold Buttons"],
    materialsAr: ["صوف مغولي سوبر 180", "ساتان الحرير الإيطالي", "أزرار ذهبية مشغولة يدوياً"],
    story: "Tailored to recall the geometric lines of modern Milanese high-rise glass architecture. It stands tall, commanding power and quiet elegance in equal measures.",
    storyAr: "مصممة لتستحضر الخطوط الهندسية الشامخة للعمارة الإيطالية الحديثة في ميلانو. إنها بدلة القوة والهيبة الممزوجة بالهدوء والوقار النخبوي.",
    brand: "Atelier Milan x Amazon Elite",
    brandAr: "أتيلييه ميلان x أمازون إليت",
    rating: 4.9,
    colors: ["Midnight Blue & Gold", "Obsidian Black"],
    sizes: ["EU 48 / R", "EU 50 / R", "EU 52 / R", "Bespoke Fitting"],
    amazonUrl: "https://www.amazon.com/s?k=luxury+men+bespoke+tuxedo"
  },

  // 4. KIDS FASHION
  {
    id: "kids-royal-coat",
    name: "Petit Prince Double-Breasted Cashmere Coat",
    nameAr: "معطف الأمير الصغير من الكشمير",
    category: "kids_fashion",
    categoryAr: "أزياء أطفال ملكية",
    price: "$3,800",
    description: "An ultra-luxurious children's protective winter coat woven from baby cashmere wool, detailed with authentic brass-gilded buttons and soft silk velvet pockets.",
    descriptionAr: "معطف شتوي فخم للأطفال لحماية ودفء مثالي، مغزول من كشمير الأطفال فائق النعومة، مع أزرار نحاسية مطلية بالذهب وجيوب مخملية من الحرير الهابوتاي.",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600",
    details: [
      "Shell: 100% fine Baby Mongolian Cashmere.",
      "Lining: Breathable silk lining adorned with delicate hand-drawn botanical lines.",
      "Comfort: Temperature-regulating lightweight fibers comfortable on sensitive young skin."
    ],
    detailsAr: [
      "الخامة الخارجية: كشمير أطفال منغولي عيار 100% غاية في النعومة.",
      "البطانة: حرير طبيعي يسمح بالتنفس ومزين برسومات يدوية فريدة للنباتات البرية.",
      "الراحة: خيوط خفيفة للغاية لتعديل حرارة الجسم ومكافحة حساسية البشرة الحساسة."
    ],
    craftsmanship: "Spun in absolute clean air facilities in Piedmont to guarantee that no mechanical irritants exist in the wool, ensuring seamless comfort and warmth.",
    craftsmanshipAr: "تم غزل الصوف وتصفيفه في معامل نقية بمقاطعة بيدمونت لضمان خلوه التام من المهيجات ليوفر دفئاً ملكياً ناعماً ومريحاً للطفل.",
    rarity: "Limited Heritage Edition",
    rarityAr: "إصدار تراثي محدود وموثق بالأرقام",
    materials: ["Baby Cashmere", "Silk Habotai Lining", "Brass-Gilded Buttons"],
    materialsAr: ["كشمير منغولي للأطفال", "حرير هابوتاي ناعم للغاية", "أزرار برونزية مطلية بالذهب"],
    story: "Inspired by the classic illustrations of children's fairy tales. A piece that represents the preservation of classic style, inherited through generations of elegance.",
    storyAr: "مستوحى من الرسوم التوضيحية لقصص الخيال الكلاسيكية للأمراء. قطعة تمثل توارث الأناقة ورونق الهيبة الكلاسيكية عبر الأجيال والمواليد.",
    brand: "Heritage Petit",
    brandAr: "براند هيريتيج للأطفال",
    rating: 4.7,
    colors: ["Classic Royal Navy", "Camel Cashmere Gold", "Pristine Ivory"],
    sizes: ["Ages 3-4", "Ages 5-6", "Ages 7-8", "Custom Tailored"],
    amazonUrl: "https://www.amazon.com/s?k=designer+kids+cashmere+coat"
  },

  // 5. JEWELRY
  {
    id: "sapphire-sovereign",
    name: "The Sapphire Sovereign Choker",
    nameAr: "قلادة الياقوت الملكي",
    category: "jewelry",
    categoryAr: "مجوهرات حصرية",
    price: "$142,000",
    description: "An authentic masterpiece sculpted from 18k yellow gold, centering an monumental pear-cut deep blue royal sapphire surrounded by clusters of flawless step-cut diamonds.",
    descriptionAr: "تحفة فنية فريدة مصبوغة من الذهب الأصفر عيار 18 قيراط، يتوسطها ياقوت أزرق إمبراطوري نادر على شكل قطرة ماء، محاط ببريق من الألماس البراق متناهي النقاء.",
    image: "/src/assets/images/product_sapphire_choker_1780094125320.png",
    details: [
      "Center Gem: 12.4 Carat GIA-Certified Royal Blue Sapphire.",
      "Diamonds: 6.8 Carats total weight of flawless marquise and brilliant-cut diamonds.",
      "Metal Composition: Solid 18k Gold hand-polished to mirror finish.",
      "Adjustable custom gold lock with laser-engraved serial number 'PERFECT-001'."
    ],
    detailsAr: [
      "الحجر المركزي: ياقوت أزرق ملكي بوزن 12.4 قيراط موثق بشهادة GIA الدولية.",
      "الألماس: قطع ألماس بوزن إجمالي 6.8 قيراط من أنقى درجات النقاء.",
      "صياغة المعدن: ذهب أصفر نقي عيار 18 قيراط مصقول يدوياً كالمرآة.",
      "قفل ذهبي مخصص محفور بالليزر للرقم التسلسلي الفريد 'PERFECT-001'."
    ],
    craftsmanship: "Meticulously hand-set by master artisans in our Rome atelier. Each diamond is calibrated to reflect the exact focal point of the central sapphire, taking over 180 hours of precision gem-setting.",
    craftsmanshipAr: "صيغت التحفة يدوياً وبدقة متناهية بأيدي كبار طهاة المجوهرات في روما، حيث استغرقت صياغتها وترصيعها ما يزيد عن 180 ساعة من العمل الدؤوب لتعكس الضوء بأقصى درجات الإبهار.",
    rarity: "Unique 1-of-1 Creation",
    rarityAr: "قطعة واحدة فريدة في العالم (1 of 1)",
    materials: ["18k Yellow Gold", "Royal Blue Sapphire", "Marquise Diamonds", "Brilliant-Cut Diamonds"],
    materialsAr: ["ذهب أصفر عيار 18", "ياقوت أزرق ملكي نادر", "ألماس بقصّ الماركيز", "ألماس مصقول ممتاز"],
    story: "Inspired by the celestial depths of space, the Sovereign Choker was envisioned as a frozen point of starlight held in gold. The blue iris represents the dynamic connection between sight and desire, capturing the eyes of all who enter.",
    storyAr: "مستوحاة من أعماق السماء الحالكة، صُممت قلادة Sovereign لتكون بمثابة شعاع متجمد من ضوء النجوم يلتف حول العنق. يعكس الياقوت الأزرق رونق العين الثاقبة والجاذبية اللانهائية لجمال لا يمكن نسيانه.",
    brand: "PERFECT Haute Joaillerie",
    brandAr: "مجوهرات PERFECT الراقية",
    rating: 5.0,
    colors: ["Imperial Gold Frame", "Sovereign Rose Gold", "Platinum Luster"],
    sizes: ["One Size Fitting - Customized Inner Circumference"],
    amazonUrl: "https://www.amazon.com/s?k=high+end+luxury+sapphire+choker"
  },
  {
    id: "imperial-emerald-ring",
    name: "The Imperial Emerald Engraved Ring",
    nameAr: "خاتم الزمرد الإمبراطوري",
    category: "jewelry",
    categoryAr: "خواتم فريدة",
    price: "$53,000",
    description: "A mesmerizing specimen featuring an intensely vibrant raw-cut premium emerald, set within an artisanal yellow gold band decorated with ancient engraving.",
    descriptionAr: "خاتم خلاب يحتضن حجراً ضخماً من الزمرد الكولومبي الخام فائق الخضار والنقاء، مرصعاً في تاج من الذهب الأصفر ذو النقوش الأثرية الدقيقة.",
    image: "/src/assets/images/product_emerald_ring_1780094180503.png",
    details: [
      "Gemstone: 8.7 Carat Natural Colombian Emerald, raw cut to maximize internal glow.",
      "Band: Heavy, textured solid yellow gold of rustic texture and luxury touch.",
      "Secret: Inside the band contains custom engraving of the PERFECT Eye insignia.",
      "Packaging: Ships inside a polished obsidian box with built-in led spotlight."
    ],
    detailsAr: [
      "الحجر الكريم: زمرد كولومبي طبيعي غير مصقول بوزن 8.7 قيراط لبريق بري غامض.",
      "الحزام: ذهب أصفر صلب ثقيل منقوش بنسيج غني يدوياً لمتعة بصرية وحسية فريدة.",
      "السر الخفي: يحتوي الجزء الداخلي من الخاتم على نقش مخفي لعين الكمال (PERFECT Eye).",
      "العلبة: تقدم في صندوق من حجر الوبسيديان المصقول مع إضاءة سبوتلايت مدمجة للتحفة."
    ],
    craftsmanship: "The custom rustic texture on the gold band is hand-beaten with specialized horn-tipped hammers and aged through safe oxidation to give a majestic, historical museum artifact allure.",
    craftsmanshipAr: "تم صياغة الملمس المعتق والريفي المشغول يدوياً بالمطارق النحاسية والنقش الدقيق للأخاديد، وعتّق بأوكسيد الذهب للحصول على مظهر أثري ملكي لا مثيل له.",
    rarity: "Unique 1-of-1 Creation",
    rarityAr: "قطعة واحدة فريدة في العالم (1 of 1)",
    materials: ["Colombian Emerald", "Aged Solid Gold", "Obsidian Base Casing"],
    materialsAr: ["زمرد كولومبي طبيعي", "ذهب أصفر عتيق صلب", "علبة من الأوبسيديان البركاني"],
    story: "Representing life, earth, and sovereign energy, the Imperial Emerald Ring was crafted as a companion talisman. Its green core is deep, hosting historic inclusions that tell a story of millennia inside crystalline stone.",
    storyAr: "يمثل الزمرد طاقة الحياة والأرض والقداسة الملكية. صُنع هذا الخاتم ليكون بمثابة تميمة للأناقة المطلقة. يحكي قلب الزمرد الأخضر قصة الطبيعة الساحرة عبر ملايين السنين داخل الصخور الحجرية الكريستالية.",
    brand: "Gems of Chivor",
    brandAr: "مجوهرات شيفور النادرة",
    rating: 4.8,
    colors: ["Rustic Hand-beaten Gold", "Smooth Polished Platina"],
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    amazonUrl: "https://www.amazon.com/s?k=luxury+raw+colombian+emerald+gold+ring"
  },

  // 6. WATCHES
  {
    id: "onyx-chronometer",
    name: "The Perfect Onyx Chronometer",
    nameAr: "ساعة الأونيكس الأزلية",
    category: "watches",
    categoryAr: "ساعات عظيمة الثمن",
    price: "$89,500",
    description: "An ultra-premium mechanical watch incorporating an absolute black onyx dial, enclosed inside custom gold-trim chassis with a dark marble bezel insert.",
    descriptionAr: "ساعة ميكانيكية فائقة الدقة بتصميم مذهل يتميز بميناء من حجر الأونيكس الأسود الداكن، محاطة بإطار من الرخام الأسود المعرق بالذهب وتفاصيل ذهبية دقيقة.",
    image: "/src/assets/images/product_onyx_watch_1780094142171.png",
    details: [
      "Movement: Hand-wound calibre with 72-hour power reserve and visual skeleton gears.",
      "Dial: Flawless, single-slice absolute Black Onyx plate with zero markings.",
      "Bezel: High-pressure compacted black Italian marble with native gold-dust veins.",
      "Bracelet: Hand-stitched full-grain matte alligator leather with gold deployant buckle."
    ],
    detailsAr: [
      "الحركة: معايرة ميكانيكية يدوية مع احتياطي طاقة لمدة 72 ساعة وتروس مرئية.",
      "الميناء: لوحة فريدة من حجر الأونيكس الأسود الداكن الخالي تماماً من الأرقام لصفاء مطلق.",
      "الإطار: رخام إيطالي أسود مضغوط مع عروق حقيقية مشبعة بغبار الذهب.",
      "السوار: جلد تمساح غير لامع مخيط يدوياً مع إبزيم من الذهب الخالص."
    ],
    craftsmanship: "The marble bezel is sliced using diamond-abrasive ultrasonic cutters to a thickness of exactly 0.8mm, then reinforced with a gold frame structure to absorb mechanical shocks.",
    craftsmanshipAr: "تم نحت الرخام المحيط بالساعة باستخدام ليزر فوق صوتي دقيق للغاية لسمك 0.8 مم بالضبط، ثم تم تعزيزه بإطار ذهبي هيكلي مقاوم للصدمات.",
    rarity: "Limited Edition - Total 5 Units Exist",
    rarityAr: "إصدار بقمة المحدودية (5 قطع فقط في العالم)",
    materials: ["Black Onyx Dial", "Compact Italian Marble", "18k Gold Trims", "Matte Alligator Leather"],
    materialsAr: ["ميناء أونيكس أسود مصقول", "رخام أسود إيطالي مدمج", "حواف وزخارف ذهب عيار 18", "جلد تمساح فاخر"],
    story: "A true chronometer does not merely record hours; it marks the weight of infinite moments. Formed with marble elements matching the PERFECT STORE entrance floors, this timepiece represents the physical embodiment of the showroom itself.",
    storyAr: "الزمن ليس مجرد أرقام، بل تراكم للحظات من الفخامة. تحتوي هذه الساعة الفاخرة على قطع رخام مطابقة لأرضية متجرنا الفخم، لتكون كأنك ترتدي جزءاً من الصرح التاريخي في معصمك.",
    brand: "PERFECT Horlogerie Swiss",
    brandAr: "ساعات PERFECT السويسرية",
    rating: 4.9,
    colors: ["Classic Jet-Black", "Deep Forest Green"],
    sizes: ["41mm Bespoke Shell Case"],
    amazonUrl: "https://www.amazon.com/s?k=exclusive+hand+wound+tourbillon+chronometer"
  },

  // 7. HOME DECOR
  {
    id: "decor-alabaster-urn",
    name: "Classic Tuscan Alabaster Urn & Column",
    nameAr: "عمود الرخام الألباستر الأثري",
    category: "home_decor",
    categoryAr: "منحوتات وديكور ملكي",
    price: "$14,500",
    description: "A breathtaking decorative vessel and supportive pedestal carved entirely from a singular block of semi-translucent Tuscan white alabaster, complete with inside electrical glowing bulbs.",
    descriptionAr: "وعاء زخرفي خلاب مع عمود حامل منحوتان بالكامل من كتلة واحدة من مرمر الألباستر التوسكاني الأبيض شبه الشفاف، ومزود بوحدات إضاءة دافئة مدمجة داخله.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600",
    details: [
      "Material: 100% natural Italian White Veined Alabaster.",
      "Base: Velvet heavy weighted floor protector plate.",
      "Luminosity: Safe integrated warmth LED bulb showing the delicate natural veining inside."
    ],
    detailsAr: [
      "الخامات: مرمر ألباستر توسكاني طبيعي 100% مع عروق رمادية متناهية الصغر.",
      "القاعدة: طبقة مخملية سميكة لحماية الأرضيات الرخارية الفاخرة.",
      "الإضاءة: مصباح LED آمن ذو وهج ذهبي دافئ يوضح تشققات الرخام الطبيعية الرائعة."
    ],
    craftsmanship: "Turned on lathes and meticulously hand-polished using progressively finer diamond paste over 72 hours until the alabaster achieves its iconic misty transparency.",
    craftsmanshipAr: "قُطعت وصُقلت التحفة يدوياً باستخدام حبيبات ألماسية ناعمة على مدار 72 ساعة متصلة حتى يعكس الحجر بريقاً ملكياً شفافاً تحت الأضواء الكاشفة.",
    rarity: "Limited Quarry Yield",
    rarityAr: "نحاتة حصرية من صخور توسكانا النادرة",
    materials: ["Tuscan Alabaster", "LED Illuminators", "Satin Protector Base"],
    materialsAr: ["رخام ألباستر توسكاني", "إضاءة دافئة LED", "قاعدة ساتان حامية"],
    story: "Paying tribute to antique Roman villa entrance lobbies. When lit, it acts as a silent beacon, radiating deep golden safety rays and bathing the room in soft ambient history.",
    storyAr: "تحية وإرث لقصور وقاعات الإمبراطورية الرومانية القديمة. عندما تضاء، تبعث دفئاً ووقاراً ملكياً هادئاً، وتغرق الصالة في عبق التاريخ والأصالة.",
    brand: "Atelier Volterra",
    brandAr: "نحاتة أتيلييه فولتيرا الإيطالية",
    rating: 4.8,
    colors: ["Glow Alabaster White", "Misty Ochre Urn"],
    sizes: ["Height 120cm with Column Base"],
    amazonUrl: "https://www.amazon.com/s?k=luxury+sculpture+alabaster+pedestal"
  },

  // 8. SHOES
  {
    id: "shoes-stiletto",
    name: "The Sovereign Diamond Crystal Stiletto",
    nameAr: "حذاء الستيليتو الألماسي المرصع",
    category: "shoes",
    categoryAr: "أحذية نادرة وحصرية",
    price: "$11,200",
    description: "An unbelievable crystal heel meticulously dusted with over 4,500 miniature Swarovski diamonds, supported by a geometric structural brass heel wedge.",
    descriptionAr: "حذاء نسائي أسطوري مرصع يدوياً بأكثر من 4,500 حجر من بلورات الألماس سواروفسكي المجهرية، ومدعوم بكعب هندسي منحوت من البرونز المذهب القوي.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600",
    details: [
      "Upper: High-tensile clear mesh fully frosted with reflective diamonds.",
      "Sole: Finished in unblemished smooth gold leaf paint with customized client initials.",
      "Security: Gilded key safe luggage case containing custom silk storage socks."
    ],
    detailsAr: [
      "السطح العلوي: شبكة شفافة عالية الصلابة مكسوة بالكامل ببلورات الألماس اللامعة.",
      "النعال: مطلي يدوياً بطلاء الذهب الخالص اللامع مع حفر مخصص للحروف الأولى من الاسم.",
      "الحماية: يقدم في حقيبة تخزين مذهبة ومقواة ومبطنة بالحرير الفاخر لمنع التجريح."
    ],
    craftsmanship: "Every single crystal is applied by hand using specialized ultraviolet adhesives in Lucerne, requiring steady magnifying optical loops and extreme surgical precision.",
    craftsmanshipAr: "تم ترصيع ولصق كل بلورة ألماس واحدة تلو الأخرى يدوياً باستخدام غراء الأشعة فوق البنفسجية في لوسيرن تحت عدسات مكبرة مجهرية بالغة الدقة.",
    rarity: "Custom Tailored (Bespoke)",
    rarityAr: "تفصيل مخصص بالكامل وإصدار نخبوي فردي",
    materials: ["Swarovski Diamonds", "Clear High-Tensile Mesh", "Gilded Brass Wedges"],
    materialsAr: ["بلورات ألماس سواروفسكي", "شبكة شفافة شديدة المتانة", "برونز مسبوك مطلي بالذهب"],
    story: "Designed for grand entrances. It reflects light dynamically with even the slowest steps, transforming any flat ground into a shimmering stage of majestic starlight.",
    storyAr: "صُمم خصيصاً للظهور في المحافل والقصور التاريخية. يعكس الحذاء بريق الضوء مع كل خطوة هادئة، ليحول الأرضية الرخامية العادية إلى مسرح متلألئ بالأمجاد.",
    brand: "Lucerne Atelier x Amazon",
    brandAr: "أتيلييه لوسيرن x أمازون لكجري",
    rating: 5.0,
    colors: ["Starlight Diamond & Gold", "Midnight Onyx Reflection"],
    sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40"],
    amazonUrl: "https://www.amazon.com/s?k=high+luxury+swarovski+crystal+heels"
  },

  // 9. CRYSTAL SCULPTURES AND FIGURES
  {
    id: "crystal_falcon_sculpture",
    name: "Sovereign Lead Crystal Falcon",
    nameAr: "مجسم صقر الكريستال الإمبراطوري",
    category: "crystal_decor",
    categoryAr: "قطع كريستال ومجسمات",
    price: "$28,000",
    description: "A breathtaking falcon sculpture fashioned from high-refraction lead crystal glass, capturing a majestic bird in soaring motion, mounted on a solid obsidian pedestal with gold talons.",
    descriptionAr: "تحفة فنية رائعة تجسد صقراً ملكياً في وضعية الانقضاض، منحوتة من أجود أنواع كريستال الرصاص عالي الانكسار الضوئي، ومثبتة على قاعدة من الأوبسيديان المصقول بمخالب مذهبة.",
    image: "/src/assets/images/crystal_falcon_sculpture_1780147419848.png",
    details: [
      "Crystal Composition: Over 32% premium full lead crystal for diamond-grade reflection.",
      "Pedestal Base: Solid volcanic obsidian stone, hand-carved and satin-polished.",
      "Hardware: Solid 18k yellow gold-plated structural claw mounts.",
      "Signature: Signed and numbered by the master glassmaker with diamond-tipped pen."
    ],
    detailsAr: [
      "تركيبة الكريستال: أكثر من 32٪ من كريستال الرصاص الفاخر لانكسار ضوئي يماثل الألماس.",
      "قاعدة المجسم: صخرة أوبسيديان بركانية صلبة، منحوتة يدوياً ومصقولة بعناية.",
      "التفاصيل المعدنية: مخالب وقواعد مسبوكة ومطية بالذهب الخالص عيار 18 قيراط.",
      "التوقيع: يحمل توقيعاً محفوراً بالماس ورقماً تسلسلياً فريداً من صانع الكريستال."
    ],
    craftsmanship: "Blown and sculpted hot at 1,400°C by certified Venetian glass masters, then progressively cold-cut with copper wheels for sharp prismatic facets that turn sunlight into rainbow halos.",
    craftsmanshipAr: "تم نفخ الكريستال وتشكيله حاراً عند درجة حرارة 1400 مئوية بأيدي كبار حرفيي البندقية، ثم نُحت بارداً بعجلات نحاسية للحصول على زوايا حادة تعكس الضوء بألوان الطيف.",
    rarity: "Strict Limit of 5 Units Worldwide",
    rarityAr: "إصدار نادر للغاية (5 قطع فقط حول العالم)",
    materials: ["Venetian Lead Crystal", "Satin Obsidian Stone", "18k Gold Accents"],
    materialsAr: ["كريستال رصاص فني", "حجر أوبسيديان بركاني مصقول", "ذهب نقي عيار 18"],
    story: "Representing power, vision, and absolute precision. Designed to occupy the center pedestal of elite salons, casting complex light patterns that dance across the room as the sun moves.",
    storyAr: "يمثل الصقر هيبة الحكمة، القوة، والرؤية الثاقبة. صُمم هذا المجسم ليتوسط صالونات الطبقة المخملية، ناشراً تموجات ضوئية مبهجة تتراقص في الغرفة مع حركة الشمس.",
    brand: "Atelier Varisco x Amazon Elite",
    brandAr: "أتيلييه فاريسكو x أمازون إليت",
    rating: 5.0,
    colors: ["Prismatic Diamond Clear", "Warm Golden Amber Hue"],
    sizes: ["Width 35cm x Height 45cm"],
    amazonUrl: "https://www.amazon.com/s?k=baccarat+crystal+falcon+sculpture"
  },
  {
    id: "crystal_obelisk",
    name: "Imperial Rose-Quartz Prism Obelisk",
    nameAr: "مسلة الكوارتز الكريستالية المشعّة",
    category: "crystal_decor",
    categoryAr: "مسلات ومنحوتات هندسية",
    price: "$18,500",
    description: "A monumental, flawless geometric obelisk sculpture cut from select pink quartz crystal, designed with sacred mathematical ratios to disperse ambient room light into glorious rainbow rays.",
    descriptionAr: "مسلة هندسية شامخة منحوتة من الكوارتز الوردي الطبيعي الخالي من الشوائب، صُممت بنسب رياضية مقدسة لتبدد الأضواء المحيطة وتحولها إلى حزم ملونة ساحرة تسر الناظرين.",
    image: "/src/assets/images/crystal_obelisk_prism_1780147438983.png",
    details: [
      "Gemstone Sourcing: Natural AAA-Grade Madagascar rose quartz of uniform crystalline structure.",
      "Optics: Laser-calibrated prism angles that split sunlight into perfectly separated rainbow arcs.",
      "Base Support: Heavily weighted solid bronze base with non-slip protective felt.",
      "Illumination: Optimized to channel backlighting for a breathtaking internal mystical glow."
    ],
    detailsAr: [
      "مصدر الحجر: كوارتز وردي طبيعي من مدغشقر ذو هيكل بلوري نقي ومتناسق للغاية.",
      "البصريات: زوايا هندسية معايرة بالليزر لتقسيم الضوء بوضوح تام إلى أقواس الطيف.",
      "القاعدة: برونز فرنسي ثقيل مدعوم بطبقة مخملية لمنع إلحاق أي ضرر بالأسطح الرخامية.",
      "التأثير الإيجابي: مصمم لتجميع الضوء الخلفي وبث وهج باطني رائع من داخل الصخرة الكريستالية."
    ],
    craftsmanship: "The obelisk is cut from a single 50kg raw geode, then slowly hand-faceted using progress diamond powders over several weeks to achieve absolutely flat, mirror-sharp geometric faces.",
    craftsmanshipAr: "قُطعت المسلة من كتلة خام تزن 50 كجم، ثم صُقلت يدوياً بأقراص ألماسية دقيقة على مدار عدة أسابيع للوصول إلى أسطح مرايا هندسية مسطحة بالغة الدقة.",
    rarity: "Unique 1-of-1 Piece",
    rarityAr: "قطعة فنية فريدة غير مكررة (1 of 1)",
    materials: ["Madagascar Rose Quartz", "Solid Cast Bronze", "Diamond Paste Polish"],
    materialsAr: ["كوارتز وردي مدغشقري نادِر", "برونز مسبوك صلب", "تلميع بألماس مجهري"],
    story: "A physical monument to quietude and luxury. Intended as a structural gemstone anchor, the obelisk symbolizes unyielding stability, beauty, and the pursuit of perfect alignment between light and shape.",
    storyAr: "نصب مادي يجمع بين السكينة المطلقة والوقار الإمبراطوري الشامخ. ترمز المسلة إلى الثبات الراسخ، والجمال الخالد، وبث السلام الدائم في أروقة قصر العميل الكوني.",
    brand: "Gems of Antananarivo",
    brandAr: "مجوهرات وفنون أنتاناناريفو",
    rating: 4.9,
    colors: ["Satin Blush Pink", "Pure Luminescent Clear"],
    sizes: ["Base 15cm x Height 60cm"],
    amazonUrl: "https://www.amazon.com/s?k=luxury+crystal+gemstone+obelisk"
  },
  {
    id: "crystal_celestial_sphere",
    name: "The Cosmic Constellation Glass Sphere",
    nameAr: "مجسم الكرة الفلكية الكريستالية",
    category: "crystal_decor",
    categoryAr: "منحوتات فلكية نادرة",
    price: "$14,000",
    description: "An extraordinary solid crystal sphere hosting sub-surface laser-engraved 3D cosmic star maps, resting upon custom ornate claw pedestals crafted from gilded architectural bronze.",
    descriptionAr: "مجسم فلكي مهيب يتكون من كرة كريستالية صلبة ثلاثية الأبعاد تحتوي بداخلها على خرائط دقيقة للنجوم والمجرات محفورة بالليزر، ومثبتة فوق قاعدة من البرونز المعتق المطلي بالذهب الخالص.",
    image: "/src/assets/images/crystal_celestial_sphere_1780147459990.png",
    details: [
      "Glass Quality: Optical borosilicate glass of highest purity index (zero bubbles or striations).",
      "Internal Engraving: High-precision sub-surface laser pulsing with 2.5 million spatial co-ordinates.",
      "Sculpted Pedestal: Ornate antique style claw sculpted in solid architectural bronze.",
      "Gilding: Hand-applied 24k gold leaf gilding over aged bronze surface."
    ],
    detailsAr: [
      "جودة الزجاج: زجاج بورسليكات بصري فائق النقاوة (خالٍ تماماً من الفقاعات والتشوهات).",
      "النقش الداخلي: نبضات ليزر عالية الدقة ترسم 2.5 مليون إحداثية فلكية لمواقع النجوم والمجرات.",
      "حامل التحفة: مخالب برونزية منحوتة باليد وفق الطراز الفني الكلاسيكي العتيق.",
      "الطلاء والذهب: طلاء ذهب عيار 24 مطبق بطريقة يدوية عتيقة فوق التفاصيل النحاسية."
    ],
    craftsmanship: "Constructed utilizing state-of-the-art spatial lasers that fuse microscopic dust points inside the optical glass without leaving any marks on the outer surface, capturing structural outer-space maps inside solid crystal.",
    craftsmanshipAr: "صُنعت بالليزر المتطور الذي يقوم بنسج جزيئات غبار مجهرية بالغة التوهج في باطن الكرة دون إحداث أي خدش على سطحها الخارجي الأملس، لتبدو النجوم كأنها تسبح داخل الكريستال.",
    rarity: "Limited Edition - 12 Numbered Units",
    rarityAr: "إصدار فني محدود ومرقم بـ 12 قطعة فقط",
    materials: ["Optical Borosilicate Glass", "24k Gold Leaf Gilded Bronze"],
    materialsAr: ["زجاج بورسليكات فائق الصفاء", "برونز معتق بذهب عيار 24"],
    story: "Representing the visual gateway to cosmic dreams. This sphere contains the exact constellations of the night sky, bringing the vast mysteries of space into the warm privacy of your study table or library shelf.",
    storyAr: "بوابة بصرية للغوص في مجرات وأحلام الكون الفسيح. تحتوي هذه الكرة الكريستالية على المواقع الدقيقة لأبراج النجوم، لتجلب مهابة الكون اللانهائي داخل جدران مكتبتك أو غرفتك الخاصة.",
    brand: "Orion's Forge",
    brandAr: "قرية وهاد النجوم الفلكية",
    rating: 5.0,
    colors: ["Celeste Starlight Glow", "Cosmic Onyx & Gold"],
    sizes: ["Diameter 20cm x Total Height 32cm"],
    amazonUrl: "https://www.amazon.com/s?k=optical+glass+celestial+constellation+sphere"
  }
];

export const GENERAL_METALS = [
  { id: "gold-yellow", name: "18k Imperial Yellow Gold", nameAr: "ذهب أصفر إمبراطوري عيار 18" },
  { id: "gold-rose", name: "18k Regal Rose Gold", nameAr: "ذهب وردي ملكي عيار 18" },
  { id: "platinum", name: "Obsidian Satin Platinum", nameAr: "بلاتين أوبسيديان الساتاني" },
  { id: "gold-white", name: "18k Pristine White Gold", nameAr: "ذهب أبيض نقي عيار 18" }
];

export const GENERAL_GEMSTONES = [
  { id: "sapphire", name: "Imperial Blue Sapphire", nameAr: "ياقوت أزرق إمبراطوري" },
  { id: "emerald", name: " Colombian Emerald", nameAr: "زمرد كولومبي برّي" },
  { id: "diamond-pink", name: "Rose Blush Pink Diamond", nameAr: "ألماس وردي خجول" },
  { id: "diamond-black", name: "Midnight Black Diamond", nameAr: "ألماس أسود حالك" }
];
