import { EgyptianMedication } from './types';

export const UROLOGY_PROSTATE_MEDS: EgyptianMedication[] = [
  // ==========================================
  // Prostate Health & Alpha Blockers (صحة البروستاتا وتسهيل تدفق البول)
  // ==========================================
  {
    id: 'omnic_ocas_04',
    tradeName: 'أومنيك أوكاس 0.4 مجم / تامسولين (Omnic Ocas / Tamsulin)',
    tradeNameEn: 'Omnic Ocas 0.4mg (Tamsulosin Oral Controlled Absorption System - Astellas)',
    scientificName: 'تامسولوسين هيدروكلوريد بنظام الامتصاص المنضبط OCAS',
    category: 'urology',
    categoryAr: 'حاصر مستقبلات ألفا-1 الانتقائي لتسهيل تدفق البول وتمرير حصوات الحالب',
    categoryIcon: '🚻',
    defaultTiming: 'قرص واحد يومياً بعد وجبة الإفطار أو العشاء في نفس الموعد ثابتاً يبلع كاملاً دون مضغ',
    dosageForm: 'أقراص مغلفة بنظام تحرر مستمر OCAS',
    commonDoses: ['0.4 مجم قرص واحد يومياً'],
    clinicalNotes: 'يرخي العضلات الملساء في عنق المثانة والبروستاتا ومجرى الحالب، مما يحسن اندفاع البول ويساعد في طرد حصوات الحالب الصغيرة بشكل أسرع دون هبوط شديد في ضغط الدم مقارنة بحاصرات ألفا القديمة.',
    searchTokens: ['اومنيك', 'أومنيك', 'omnic', 'omnic ocas', 'تامسولوسين', 'tamsulosin', 'بروستاتا', 'حصوة حالب', 'احتباس بول']
  },
  {
    id: 'pepon_plus_caps',
    tradeName: 'بيبون بلس / بروستيكيور (Pepon Plus / Prostacure)',
    tradeNameEn: 'Pepon Plus (Pumpkin Seed Oil 300mg + Saw Palmetto 88mg + Zinc 15mg - MEPACO)',
    scientificName: 'زيت بذور القرع النقي 300 مجم + مستخلص ثمار البلميط المنشاري (Saw Palmetto) + زنك',
    category: 'urology',
    categoryAr: 'التركيبة العشبية الطبيعية الذهبية لصحة البروستاتا وتخفيف التبول الليلي المتكرر',
    categoryIcon: '🚻',
    defaultTiming: 'كبسولة واحدة بعد الوجبات مرتين يومياً مع كوب ماء',
    dosageForm: 'كبسولات جيلاتينية رخوة بنية',
    commonDoses: ['1 كبسولة مرتين يومياً لمدة 3 أشهر'],
    clinicalNotes: 'تثبط الإنزيم المحول للهرمون الذكوري (5-alpha Reductase) طبيعياً، تقلل التهاب وتورم البروستاتا وتخفف الاستيقاظ الليلي للتبول دون أي آثار جانبية جنسية.',
    searchTokens: ['بيبون بلس', 'pepon plus', 'بلميط منشاري', 'saw palmetto', 'زيت قرع العسل', 'بروستاتا طبيعي', 'تبول ليلي']
  },
  {
    id: 'proscar_finast_5',
    tradeName: 'بروسكار 5 مجم / فيناست (Proscar / Finast)',
    tradeNameEn: 'Proscar 5mg (Finasteride - Organon / MSD) / Finast',
    scientificName: 'فيناستيرايد 5 مجم (Finasteride 5mg)',
    category: 'urology',
    categoryAr: 'مثبط إنزيم 5-ألفا ريدكتيز لتقليص حجم البروستاتا المتضخمة ومنع تطورها',
    categoryIcon: '🚻',
    defaultTiming: 'قرص واحد يومياً في أي وقت مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة زرقاء',
    commonDoses: ['5 مجم مرة واحدة يومياً'],
    clinicalNotes: 'يقلل هرمون DHT في البروستاتا مما يؤدي إلى انكماش الحجم الفعلي للبروستاتا تدريجياً خلال 6 أشهر ويقلل الحاجة للتدخل الجراحي. ملاحظة: يخفض مستوى تحليل PSA للنصف تقريباً.',
    searchTokens: ['بروسكار', 'proscar', 'finasteride', 'فيناستيرايد', 'تضخم بروستاتا', 'انكماش بروستاتا']
  },

  // ==========================================
  // Urinary Tract Infection & Stone Protection (المسالك وحصوات الكلى والتطهير)
  // ==========================================
  {
    id: 'cranberry_uti_rose_extract',
    tradeName: 'كرانبيري / كبسولات التوت البري للمسالك (Cranberry / Uti-Rose)',
    tradeNameEn: 'Cranberry Extract 500mg (Proanthocyanidins PACs + Vitamin C)',
    scientificName: 'مستخلص التوت البري الطبيعي غني بمركبات PACs المانعة لالتصاق البكتيريا',
    category: 'urology',
    categoryAr: 'الوقاية الطبيعية الأولى من التهابات المسالك البولية المتكررة وحرقان البول',
    categoryIcon: '🚻',
    defaultTiming: 'كبسولة إلى كبسولتين يومياً بعد وجبة الإفطار أو العشاء مع شرب كميات وفيرة من الماء',
    dosageForm: 'كبسولات جيلاتينية / أكياس بودرة فوارة',
    commonDoses: ['1-2 كبسولة يومياً لمدة شهر إلى 3 أشهر للوقاية من تكرار الالتهاب'],
    clinicalNotes: 'تمنع مركبات PACs بكتيريا الإشريكية القولونية (E. coli) من الالتصاق بجدران المثانة ومجرى البول فيتم طردها طبيعياً مع البول، آمنة تماماً للمرأة والرجل.',
    searchTokens: ['كرانبيري', 'توت بري', 'cranberry', 'حرقان بول', 'التهاب مسالك متكرر', 'uti']
  },
  {
    id: 'kellagon_effervescent',
    tradeName: 'كيلاجون فوار / كبسول (Kellagon)',
    tradeNameEn: 'Kellagon (Khellin Extract + Cymbopogon Proximus / Halfabar - MEPACO)',
    scientificName: 'مستخلص الخلين الطبيعي (Khellin) + خلاصة حلفا بر (Cymbopogon)',
    category: 'urology',
    categoryAr: 'باسط عضلات الحالب وطارد لحصوات الكلى والأملاح ومسكن للمغص الكلوي',
    categoryIcon: '🚻',
    defaultTiming: 'كيس يذاب في نصف كوب ماء ويشرب وهو يفور بعد الوجبات 3 مرات يومياً مع شرب ماء وفير',
    dosageForm: 'حبيبات فوارة / كبسولات',
    commonDoses: ['كيس فوار 3 مرات يومياً بعد الأكل'],
    clinicalNotes: 'يرخي تقلصات الحالب المفرطة ويزيد اتساعه مما يسهل خروج الحصوات الرملية الصغيرة ويخفف حدة نوبات المغص الكلوي الحاد.',
    searchTokens: ['كيلاجون', 'kellagon', 'حلفا بر', 'خلين', 'حصوات كلى', 'مغص كلوي', 'فوار حالب']
  },
  {
    id: 'uro_vaxom_caps',
    tradeName: 'يورو-فاكسوم 6 مجم (Uro-Vaxom)',
    tradeNameEn: 'Uro-Vaxom (Bacterial Lysates of Escherichia coli - OM Pharma)',
    scientificName: 'محلل بكتيري مناعي مجفف لبكتيريا E. coli (Immuno-Active)',
    category: 'urology',
    categoryAr: 'اللقاح المناعي الفموي لمنع تكرار عدوى المسالك البولية والمثانة المزمنة',
    categoryIcon: '🚻',
    defaultTiming: 'كبسولة واحدة صباحاً على الريق قبل الإفطار لمدة 3 أشهر متواصلة',
    dosageForm: 'كبسولات صلبة صفراء/برتقالية',
    commonDoses: ['كبسولة واحدة يومياً لمدة 90 يوماً متتالية كورس مناعي وقائي'],
    clinicalNotes: 'يحفز الجهاز المناعي المخاطي في الجهاز البولي لإنتاج الأجسام المضادة IgA، فيقلل تكرار عدوى والتهابات المثانة بنسبة تفوق 70% ويغني عن المضادات الحيوية المتكررة.',
    searchTokens: ['يورو فاكسوم', 'uro vaxom', 'مناعة مسالك', 'التهاب مثانة مزمن', 'مضاد حيوي مسالك']
  }
];
