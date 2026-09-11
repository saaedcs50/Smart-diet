import { EgyptianMedication } from './types';

export const LIPIDS_LIVER_MEDS: EgyptianMedication[] = [
  // ==========================================
  // Statins & Cholesterol Reducers (الستاتينات وأدوية الكوليسترول)
  // ==========================================
  {
    id: 'lipitor_ator_10_20_40_80',
    tradeName: 'ليبيتور / أتور (Lipitor / Ator)',
    tradeNameEn: 'Lipitor 10, 20, 40, 80mg / Ator (Pfizer / Egyptian Int. Pharma)',
    scientificName: 'أتورفاستاتين كالسيوم (Atorvastatin Calcium)',
    category: 'lipids',
    categoryAr: 'مخفض الكوليسترول الضار (LDL) وحامي الشرايين التاجية',
    categoryIcon: '🧪',
    defaultTiming: 'مساءً بعد العشاء أو قبل النوم (أو في أي وقت ثابت يومياً)',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['10 مجم', '20 مجم', '40 مجم', '80 مجم'],
    clinicalNotes: 'يثبط إنزيم HMG-CoA Reductase في الكبد لتخفيض الكوليسترول الضار LDL بنسبة تصل لـ 50% مع تثبيت الصفائح الدموية في الشرايين. تجنب شرب عصير الجريب فروت معه. ينصح بمكمل CoQ10 في حال الشعور بآلام عضلية.',
    searchTokens: ['ليبيتور', 'lipitor', 'ator', 'اتور', 'atorvastatin', 'اتورفاستاتين', 'كوليسترول', 'دهون ضارة']
  },
  {
    id: 'crestor_justechol_10_20',
    tradeName: 'كريستور / جوستيكول (Crestor / Justechol)',
    tradeNameEn: 'Crestor 5mg, 10mg, 20mg, 40mg (AstraZeneca) / Justechol',
    scientificName: 'روستوفاستاتين كالسيوم (Rosuvastatin Calcium)',
    category: 'lipids',
    categoryAr: 'أقوى الستاتينات كفاءة في خفض الكوليسترول الضار ورفع النافع',
    categoryIcon: '🧪',
    defaultTiming: 'مرة واحدة يومياً في أي وقت (صباحاً أو مساءً) مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['5 مجم', '10 مجم', '20 مجم', '40 مجم'],
    clinicalNotes: 'عمر نصفي طويل ومحب للماء (Hydrophilic)، أقل تداخلاً مع الأدوية الأخرى عبر إنزيمات السيتوكروم مقارنة بغيره. فعال جداً حتى في الجرعات الصغيرة (5-10 مجم).',
    searchTokens: ['كريستور', 'crestor', 'rosuvastatin', 'روستوفاستاتين', 'جوستيكول', 'justechol', 'كوليسترول قوي']
  },
  {
    id: 'ezetrol_atozet',
    tradeName: 'إيزيترول / أتوزيت (Ezetrol / Atozet)',
    tradeNameEn: 'Ezetrol 10mg / Atozet 10/10, 10/20, 10/40mg',
    scientificName: 'إيزيتيميب 10 مجم (Ezetimibe) منفرد أو مركب مع أتورفاستاتين',
    category: 'lipids',
    categoryAr: 'مانع امتصاص الكوليسترول المعوي للمرضى الذين لا يتحملون جرعات الستاتين العالية',
    categoryIcon: '🧪',
    defaultTiming: 'مرة واحدة يومياً مع أو بدون طعام',
    dosageForm: 'أقراص',
    commonDoses: ['10 مجم منفرد', 'Atozet 10/20 مجم مركب'],
    clinicalNotes: 'يثبط بروتين NPC1L1 في الأمعاء فيمنع امتصاص الكوليسترول الغذائي بنسبة 54%. الجمع بينه وبين الستاتين يعطي خفضاً فائقاً للكوليسترول الضار دون الحاجة لمضاعفة جرعة الستاتين.',
    searchTokens: ['ايزيترول', 'إيزيترول', 'ezetrol', 'atozet', 'اتوزيت', 'ezetimibe', 'ايزيتيميب']
  },
  {
    id: 'lipanthyl_supra_145_160',
    tradeName: 'ليبانثيل سوبرا (Lipanthyl Supra 145 / 160mg)',
    tradeNameEn: 'Lipanthyl Supra 145mg, 160mg (Fenofibrate Micronized)',
    scientificName: 'فينوفايبرات ميكرونايزد (Fenofibrate)',
    category: 'lipids',
    categoryAr: 'علاج الدهون الثلاثية المرتفعة (Triglycerides) والوقاية من التهاب البنكرياس',
    categoryIcon: '🧪',
    defaultTiming: 'مع وجبة الغداء الرئيسية مباشرة (امتصاصه يزداد مع وجود الطعام)',
    dosageForm: 'أقراص مغلفة بتقنية النانو سوبرا',
    commonDoses: ['145 مجم Supra', '160 مجم', '300 مجم'],
    clinicalNotes: 'يخفض الدهون الثلاثية بنسبة 30-50% ويرفع الكوليسترول النافع (HDL). أساسي جداً لمن تتجاوز الدهون الثلاثية لديهم 500 مجم/ديسيلتر لحماية البنكرياس.',
    searchTokens: ['ليبانثيل', 'lipanthyl', 'fenofibrate', 'فينوفايبرات', 'دهون ثلاثية', 'ترايجليسريد']
  },

  // ==========================================
  // Liver & Gallstone Protectors (صحة الكبد والمرارة وتفتيت الحصوات)
  // ==========================================
  {
    id: 'ursofalk_ursosolvan_250_500',
    tradeName: 'أورسوفالك / أورسوسولفان (Ursofalk / Ursosolvan)',
    tradeNameEn: 'Ursofalk 250mg, 500mg (Ursodeoxycholic Acid - UDCA)',
    scientificName: 'حمض أورسوديوكسي كوليك (Ursodeoxycholic Acid - UDCA)',
    category: 'lipids',
    categoryAr: 'حامي المرارة ومذيب الحصوات ومنع تكوّن حصوات المرارة أثناء النزول السريع في الوزن وجراحات السمنة',
    categoryIcon: '🧪',
    defaultTiming: 'مع أو بعد وجبة العشاء أو الغداء مع كوب حليب أو ماء',
    dosageForm: 'كبسولات / أقراص مغلفة',
    commonDoses: ['250 مجم مرتين إلى 3 مرات يومياً مع الأكل', '500 مجم مرتين يومياً'],
    clinicalNotes: 'أهم دواء وقائي أثناء الرجيم القاسي وجراحات التكميم وتحويل المسار: النزول السريع في الوزن يفرز كميات هائلة من الكوليسترول في العصارة الصفراوية مما يسبب تكون حصوات المرارة، وهذا الدواء يذيب الكوليسترول ويمنع تشكل الحصوات تماماً.',
    searchTokens: ['اورسوفالك', 'أورسوفالك', 'ursofalk', 'ursosolvan', 'اورسوسولفان', 'حصوات المرارة', 'تكميم', 'نزول سريع']
  },
  {
    id: 'essentiale_forte_n',
    tradeName: 'إسنشيال فورت إن (Essentiale Forte N)',
    tradeNameEn: 'Essentiale Forte N (Essential Phospholipids 300mg)',
    scientificName: 'دهون فوسفورية أساسية نقية مستخلصة من فول الصويا (EPL 300mg)',
    category: 'lipids',
    categoryAr: 'مجدد خلايا الكبد وعلاج الكبد الدهني (Fatty Liver / NAFLD)',
    categoryIcon: '🧪',
    defaultTiming: 'كبسولتان 3 مرات يومياً مع الوجبات مع كوب ماء كبير دون مضغ',
    dosageForm: 'كبسولات جيلاتينية بنية',
    commonDoses: ['كبسولتان 3 مرات يومياً لمدة 3 أشهر ثم جرعة استمرارية'],
    clinicalNotes: 'تندمج الفوسفوليبيدات في الأغشية المتضررة لخلايا الكبد، فتحسن تصفية الدهون وتجدد نشاط إنزيمات الكبد (AST / ALT) وتقلل ارتشاح الدهون الكبدية.',
    searchTokens: ['اسنشيال فورت', 'إسنشيال', 'essentiale forte', 'كبد دهني', 'دهون الكبد', 'فوسفوليبيد']
  },
  {
    id: 'hepa_merz_sachets',
    tradeName: 'هيبا-ميرز أكياس (Hepa-Merz)',
    tradeNameEn: 'Hepa-Merz Sachets (L-Ornithine L-Aspartate - LOLA)',
    scientificName: 'إل-أورنيثين إل-أسبارتات (L-Ornithine L-Aspartate)',
    category: 'lipids',
    categoryAr: 'محفز دورة اليوريا وتطهير الكبد من الأمونيا وتنشيط الطاقة',
    categoryIcon: '🧪',
    defaultTiming: 'يذاب الكيس في كوب ماء أو عصير ويشرب مع أو بعد الوجبات 1-3 مرات يومياً',
    dosageForm: 'أكياس فوارة سريعة الذوبان',
    commonDoses: ['1-2 كيس 3 مرات يومياً'],
    clinicalNotes: 'ينشط مسارات التخلص من السموم والأمونيا في خلايا الكبد والعضلات، ويعالج الإجهاد الكبدي والشعور بالتخمة والإعياء.',
    searchTokens: ['هيبا ميرز', 'hepa merz', 'تنظيف كبد', 'امونيا', 'سموم الكبد', 'اورنيثين']
  },
  {
    id: 'silymarin_legalon_140',
    tradeName: 'سيليمارين / ليجالون 140 مجم (Silymarin / Legalon)',
    tradeNameEn: 'Silymarin / Legalon 140mg (Milk Thistle Extract)',
    scientificName: 'خلاصة بذور شوك الجمل / الخرفيش القياسية (Milk Thistle)',
    category: 'lipids',
    categoryAr: 'مضاد أكسدة كبدي طبيعي يثبت جدار الخلايا الكبدية ضد السموم',
    categoryIcon: '🧪',
    defaultTiming: 'كبسولة 3 مرات يومياً بعد الوجبات',
    dosageForm: 'كبسولات / أكياس فوارة (سيليمارين بلس)',
    commonDoses: ['140 مجم 2-3 مرات يومياً'],
    clinicalNotes: 'يحفز تصنيع البروتينات في خلايا الكبد ويعمل كمضاد أكسدة قوي لحماية الكبد من الشوارد الحرة والدهون الزائدة.',
    searchTokens: ['سيليمارين', 'silymarin', 'ليجالون', 'legalon', 'شوك الجمل', 'حليب الشوك', 'كبد']
  }
];
