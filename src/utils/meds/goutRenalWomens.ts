import { EgyptianMedication } from './types';

export const GOUT_RENAL_WOMENS_MEDS: EgyptianMedication[] = [
  // ==========================================
  // Gout, Uric Acid & Kidney Stones (النقرس والأملاح والمسالك البولية)
  // ==========================================
  {
    id: 'zyloric_100_300',
    tradeName: 'زيلوريك 100 / 300 مجم (Zyloric)',
    tradeNameEn: 'Zyloric 100mg, 300mg (Allopurinol - Aspen / GSK)',
    scientificName: 'ألوبورينول (Allopurinol)',
    category: 'gout_renal',
    categoryAr: 'مثبط إنزيم الزانثين أوكسيديز لخفض حمض اليوريك والوقاية من نوبات النقرس',
    categoryIcon: '💧',
    defaultTiming: 'بعد وجبة الغداء مباشرة مع كوب ماء كبير مع شرب 2-3 لتر ماء طوال اليوم',
    dosageForm: 'أقراص',
    commonDoses: ['100 مجم يومياً في البداية ثم 300 مجم يومياً'],
    clinicalNotes: 'يمنع تكوين حمض اليوريك في الجسم. قاعدة سريرية: لا يبدأ تناوله أثناء نوبة النقرس الحادة الملتهبة حتى تهدأ تماماً، بل يستمر عليه كعلاج وقائي دائم. يجب شرب ماء وفير لمنع ترسب الأملاح في الكلى.',
    searchTokens: ['زيلوريك', 'zyloric', 'allopurinol', 'الوبورينول', 'نقرس', 'يوريك اسيد', 'املاح']
  },
  {
    id: 'feburic_80_120',
    tradeName: 'فيبوريك 80 / 120 مجم (Feburic)',
    tradeNameEn: 'Feburic 80mg, 120mg (Febuxostat - Menarini)',
    scientificName: 'فيبوكسوستات عالي الفعالية (Febuxostat)',
    category: 'gout_renal',
    categoryAr: 'أحدث وأقوى علاج لخفض اليوريك أسيد لمرضى النقرس والقصور الكلوي',
    categoryIcon: '💧',
    defaultTiming: 'قرص واحد يومياً في أي وقت مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['80 مجم يومياً', '120 مجم للحالات الشديدة والعقد النقرسية'],
    clinicalNotes: 'أقوى بكثير من الألوبورينول في تصفية حمض اليوريك، ولا يتطلب تعديل الجرعة في مرضى القصور الكلوي الطفيف إلى المتوسط.',
    searchTokens: ['فيبوريك', 'feburic', 'febuxostat', 'فيبوكسوستات', 'نقرس حديث', 'حمض البوليك']
  },
  {
    id: 'colchicine_el_nasr',
    tradeName: 'كولشيسين 0.5 مجم (Colchicine)',
    tradeNameEn: 'Colchicine 0.5mg Tablets (El-Nasr Egypt)',
    scientificName: 'كولشيسين نقي 0.5 مجم (Colchicine)',
    category: 'gout_renal',
    categoryAr: 'المسكن النوعي الفوري لنوبات النقرس الحادة وحمى البحر الأبيض المتوسط (FMF)',
    categoryIcon: '💧',
    defaultTiming: 'أثناء النوبة الحادة فوراً حسب إرشادات الطبيب (قرص كل 8-12 ساعة مع الأكل)',
    dosageForm: 'أقراص صغيرة',
    commonDoses: ['0.5 مجم إلى 1 مجم يومياً للوقاية', 'أو بروتوكول النوبة الحادة'],
    clinicalNotes: 'يوقف هجرة خلايا الدم البيضاء إلى المفصل الملتهب، فعال في كسر ألم النقرس الحاد والوقاية من نوبات حمى البحر المتوسط.',
    searchTokens: ['كولشيسين', 'colchicine', 'نوبة نقرس', 'حمى البحر المتوسط', 'fmf', 'التهاب مفصل']
  },
  {
    id: 'uralyt_u_granules',
    tradeName: 'يوراليت-يو حبيبات قلوية (Uralyt-U)',
    tradeNameEn: 'Uralyt-U Granules (Potassium Sodium Hydrogen Citrate - Madaus)',
    scientificName: 'سترات البوتاسيوم والصوديوم الهيدروجينية القلوية',
    category: 'gout_renal',
    categoryAr: 'مذيب حصوات حمض اليوريك وقلونة البول الدقيقة مع شرائط اختبار pH',
    categoryIcon: '💧',
    defaultTiming: 'ملعقة قياسية تذاب في نصف كوب ماء بعد الوجبات 3 مرات يومياً مع قياس pH البول',
    dosageForm: 'حبيبات فوارة مع شرائط اختبار لونية لدرجة حموضة البول',
    commonDoses: ['مكيال صباحاً ومكيال ظهراً ومكيالان مساءً بعد الأكل'],
    clinicalNotes: 'يرفع قلوية البول إلى المعدل المثالي (pH 6.2 - 6.8) مما يؤدي إلى إذابة حصوات حمض اليوريك والسيستين ومنع تشكلها تماماً.',
    searchTokens: ['يوراليت يو', 'uralyt u', 'اذابة حصوات', 'قلونة البول', 'يوريك اسيد كلى', 'شرائط ph']
  },
  {
    id: 'rowatinex_caps',
    tradeName: 'رواتينكس كبسول (Rowatinex)',
    tradeNameEn: 'Rowatinex Capsules (Pinene, Camphene, Cineol, Fenchone, Borneol, Anethol)',
    scientificName: 'مركبات تربينية وزيوت طيارة طبيعية مدرة ومطهرة للمسالك ومفتتة للحصوات',
    category: 'gout_renal',
    categoryAr: 'طارد حصوات الكلى ومسكن للمغص الكلوي ومطهر للمسالك البولية',
    categoryIcon: '💧',
    defaultTiming: 'كبسولة إلى كبسولتين قبل الوجبات بـ 30 دقيقة 3 مرات يومياً مع شرب ماء وفير',
    dosageForm: 'كبسولات جيلاتينية صفراء كروية',
    commonDoses: ['1-2 كبسولة 3 مرات يومياً قبل الأكل'],
    clinicalNotes: 'يزيد تدفق الدم للكلى، يرخي عضلات الحالب لطرد الحصوات الصغيرة، ويقلل الالتهاب والتقلصات الكلوية.',
    searchTokens: ['رواتينكس', 'rowatinex', 'مغص كلوي', 'حالب', 'حصوات كلى', 'حرقان بول']
  },

  // ==========================================
  // Women's Health, PCOS & Bone Density (صحة المرأة وتكيس المبايض وهشاشة العظام)
  // ==========================================
  {
    id: 'inofolic_myo_inositol',
    tradeName: 'إينوفوليك أكياس (Inofolic / Myo-Inositol)',
    tradeNameEn: 'Inofolic (Myo-Inositol 2000mg + Folic Acid 200mcg Sachets)',
    scientificName: 'مايو-إينوزيتول 2000 مجم + حمض الفوليك (Myo-Inositol 2g)',
    category: 'womens_health',
    categoryAr: 'العلاج الذهبي لمتلازمة تكيس المبايض (PCOS)، جودة التبويض، وحساسية الأنسولين',
    categoryIcon: '🌸',
    defaultTiming: 'كيس مذاب في نصف كوب ماء مرتين يومياً صباحاً ومساءً بين الوجبات أو قبل الأكل',
    dosageForm: 'أكياس بودرة قابلة للذوبان السريع',
    commonDoses: ['كيسان يومياً (4000 مجم مايو-إينوزيتول يومياً لمدة 3-6 أشهر)'],
    clinicalNotes: 'يعمل كناقل كيميائي ثاني للأنسولين (Second Messenger)، يعيد التوازن الهرموني بين LH/FSH، يخفض هرمون التستوستيرون الذكوري لدى النساء، ويعيد انتظام الدورة الشهرية وجودة البويضات.',
    searchTokens: ['اينوفوليك', 'إينوفوليك', 'inofolic', 'مايو اينوزيتول', 'myo inositol', 'تكيس مبايض', 'pcos', 'تبويض']
  },
  {
    id: 'fosamax_70_weekly',
    tradeName: 'فوساماكس 70 مجم أسبوعي (Fosamax)',
    tradeNameEn: 'Fosamax 70mg Once Weekly (Alendronate Sodium - Organon)',
    scientificName: 'أليندرونات صوديوم (Alendronate Sodium)',
    category: 'womens_health',
    categoryAr: 'علاج هشاشة العظام الأسبوعي وبناء الكثافة المعدنية للعظام',
    categoryIcon: '🌸',
    defaultTiming: 'صباحاً فور الاستيقاظ على معدة خاوية تماماً مع كوب ماء صنبور عادي كبير (240 مل) مع البقاء في وضعية الجلوس القائم أو الوقوف لمدة 30 دقيقة كاملة دون الاستلقاء أو تناول أي طعام أو شراب آخر',
    dosageForm: 'أقراص أسبوعية',
    commonDoses: ['قرص واحد 70 مجم في نفس اليوم من كل أسبوع'],
    clinicalNotes: 'تعليمات صارمة للغاية: يمنع الاستلقاء لمدة 30 دقيقة بعد تناول القرص لتجنب التصاقه بالمريء وإحداث قرح مريئية شديدة. لا يؤخذ مع حليب أو شاي أو مكملات أخرى.',
    searchTokens: ['فوساماكس', 'fosamax', 'alendronate', 'اليندرونات', 'هشاشة عظام', 'قرص اسبوعي', 'قرحة مريء']
  },
  {
    id: 'bonviva_150_monthly',
    tradeName: 'بونفيفا 150 مجم شهري (Bonviva)',
    tradeNameEn: 'Bonviva 150mg Once Monthly Tablet (Ibandronic Acid - Roche)',
    scientificName: 'حمض الإيباندرونيك (Ibandronic Acid)',
    category: 'womens_health',
    categoryAr: 'علاج هشاشة العظام الشهري المريح للنساء بعد انقطاع الطمث',
    categoryIcon: '🌸',
    defaultTiming: 'قرص واحد شهرياً على الريق صباحاً مع كوب ماء كامل مع البقاء جالساً أو واقفاً لمدة 60 دقيقة كاملة قبل الإفطار',
    dosageForm: 'أقراص مغلفة شهرية',
    commonDoses: ['قرص واحد 150 مجم في نفس اليوم من كل شهر ميلادي'],
    clinicalNotes: 'يثبط الخلايا الآكلة للعظام (Osteoclasts) ويزيد الكثافة العظمية في الفقرات وعنق الفخذ ويقلل خطر الكسور بنسبة كبيرة.',
    searchTokens: ['بونفيفا', 'bonviva', 'ibandronate', 'ايباندرونات', 'هشاشة شهرية', 'انقطاع طمث']
  },
  {
    id: 'duphaston_10mg',
    tradeName: 'دوفاستون 10 مجم (Duphaston)',
    tradeNameEn: 'Duphaston 10mg (Dydrogesterone - Abbott / Viatris)',
    scientificName: 'ديدروجستيرون نقي (Dydrogesterone 10mg)',
    category: 'womens_health',
    categoryAr: 'البروجسترون المطابق حيوياً لتنظيم الدورة الشهرية، بطانة الرحم، وتثبيت الحمل',
    categoryIcon: '🌸',
    defaultTiming: 'قرص واحد إلى قرصين يومياً في أيام محددة من الدورة (عادة من اليوم 11 إلى اليوم 25) مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة بيضاء',
    commonDoses: ['10 مجم 1-2 مرة يومياً'],
    clinicalNotes: 'بروجسترون فموي نقي لا يمنع التبويض الطبيعي ولا يسبب زيادة الوزن أو احتباس السوائل أو ظهور حب الشباب، آمن ومثالي في حالات عدم انتظام الدورة والإجهاض المنذر.',
    searchTokens: ['دوفاستون', 'duphaston', 'dydrogesterone', 'ديدروجستيرون', 'تثبيت حمل', 'تنظيم دورة']
  },
  {
    id: 'dostinex_cabergoline_05',
    tradeName: 'دوستينكس 0.5 مجم (Dostinex)',
    tradeNameEn: 'Dostinex 0.5mg Tablets (Cabergoline Dopamine Agonist - Pfizer)',
    scientificName: 'كابيرجولين 0.5 مجم (Cabergoline)',
    category: 'womens_health',
    categoryAr: 'العلاج عالي الكفاءة لخفض هرمون الحليب (البرولاكتين) وعلاج أورام الغدة النخامية الحميدة',
    categoryIcon: '🌸',
    defaultTiming: 'نصف قرص إلى قرص كامل مرتين أسبوعياً (مثلاً كل إثنين وخميس) وسط وجبة العشاء لتقليل الغثيان',
    dosageForm: 'أقراص بيضاء مقسمة',
    commonDoses: ['0.5 مجم مقسمة على جرعتين أسبوعياً'],
    clinicalNotes: 'يحفز مستقبلات الدوبامين D2 في الغدة النخامية ليوقف إفراز هرمون اللبن الزائد الذي يسبب تأخر الحمل واضطراب التبويض وتكيس المبايض. تناوله وسط الأكل ليلاً يمنع الدوار والغثيان.',
    searchTokens: ['دوستينكس', 'dostinex', 'cabergoline', 'كابيرجولين', 'هرمون الحليب', 'برولاكتين', 'غدة نخامية']
  },
  {
    id: 'clomid_fertab_50',
    tradeName: 'كلوميد 50 مجم / فيرتاب (Clomid / Fertab)',
    tradeNameEn: 'Clomid 50mg (Clomiphene Citrate - Sanofi) / Fertab',
    scientificName: 'كلوميفين سيترات (Clomiphene Citrate 50mg)',
    category: 'womens_health',
    categoryAr: 'المنشط الكلاسيكي الفموي لتحفيز التبويض لمرضى تكيس المبايض وتأخر الإنجاب',
    categoryIcon: '🌸',
    defaultTiming: 'قرص واحد يومياً لمدة 5 أيام متتالية تبدأ من اليوم الثاني أو الثالث للدورة الشهرية',
    dosageForm: 'أقراص',
    commonDoses: ['50 مجم إلى 100 مجم يومياً لمدة 5 أيام شهرياً'],
    clinicalNotes: 'يحجب مستقبلات الإستروجين مؤقتاً في الدماغ فيدفع الغدة النخامية لإفراز كميات مضاعفة من هرموني FSH و LH لإنضاج البويضات.',
    searchTokens: ['كلوميد', 'clomid', 'فيرتاب', 'fertab', 'clomiphene', 'تنشيط تبويض', 'تكيس مبايض']
  },
  {
    id: 'primolut_nor_5',
    tradeName: 'بريمولوت نور 5 مجم (Primolut Nor)',
    tradeNameEn: 'Primolut Nor 5mg (Norethisterone - Bayer)',
    scientificName: 'نورإيثيستيرون 5 مجم (Norethisterone)',
    category: 'womens_health',
    categoryAr: 'التحكم الدقيق في موعد الدورة الشهرية، تأخير الطمث للمناسبات والحج، وعلاج النزيف الوظيفي',
    categoryIcon: '🌸',
    defaultTiming: 'قرص مرتين إلى 3 مرات يومياً قبل الموعد المتوقع للدورة بـ 3 أيام على الأقل مع استمرار تناوله حتى الرغبة في نزول الدورة',
    dosageForm: 'أقراص',
    commonDoses: ['5 مجم 2-3 مرات يومياً'],
    clinicalNotes: 'يثبت بطانة الرحم بكفاءة عالية، تنزل الدورة بعد إيقاف تناول الدواء بـ 2-3 أيام.',
    searchTokens: ['بريمولوت نور', 'primolut nor', 'norethisterone', 'تاخير الدورة', 'تنزيل الدورة', 'نزيف رحمي']
  },
  {
    id: 'yasmin_diane_pcos',
    tradeName: 'ياسمين / ديان 35 (Yasmin / Diane 35)',
    tradeNameEn: 'Yasmin (Drospirenone + Ethinylestradiol - Bayer) / Diane-35 (Cyproterone)',
    scientificName: 'حبوب هرمونية مركبة لتنظيم الدورة، كبح الهرمون الذكوري، وعلاج حب الشباب والشعرانية',
    category: 'womens_health',
    categoryAr: 'علاج أعراض تكيس المبايض الهرمونية والشعر الزائد وحب الشباب مع منع الحمل',
    categoryIcon: '🌸',
    defaultTiming: 'قرص واحد يومياً في نفس الساعة بدقة لمدة 21 يوماً ثم راحة 7 أيام (أو حسب الشريط)',
    dosageForm: 'أقراص مغلفة ملونة مع تقويم يومي',
    commonDoses: ['قرص يومياً لمدة 21 يوماً'],
    clinicalNotes: 'دروسبيرينون في ياسمين مدر خفيف للبول يمنع احتباس السوائل وزيادة الوزن، بينما سيبروتيرون في ديان-35 يغلق مستقبلات الأندروجين في الجلد لمنع تساقط الشعر الدهني وحب الشباب.',
    searchTokens: ['ياسمين', 'yasmin', 'ديان 35', 'diane 35', 'تكيس هرموني', 'حب شباب هرموني', 'شعرانية']
  },

  // ==========================================
  // Neuro-Metabolic, Mood & Sleep Regulators (أدوية الأعصاب والمزاج والنوم ذات الأثر الأيضي)
  // ==========================================
  {
    id: 'lyrica_pregabalin_75_150',
    tradeName: 'ليريكا / بريجابالين (Lyrica / Pregabalin)',
    tradeNameEn: 'Lyrica 75mg, 150mg, 300mg (Pregabalin - Viatris)',
    scientificName: 'بريجابالين (Pregabalin)',
    category: 'general',
    categoryAr: 'مهدئ الآلام العصبية الحادة واعتلال الأعصاب المحيطية والفيبروميالجيا',
    categoryIcon: '🧠',
    defaultTiming: 'مساءً قبل النوم أو مقسم على جرعتين مع أو بدون طعام',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['75 مجم', '150 مجم', '300 مجم يومياً'],
    clinicalNotes: 'تنبيه تغذوي وسريري: قد يسبب البريجابالين زيادة ملحوظة في الشهية واحتباس سوائل بسيط (Peripheral Edema)، يلزم متابعة الوزن وتعديل السعرات الغذائية.',
    searchTokens: ['ليريكا', 'lyrica', 'pregabalin', 'بريجابالين', 'الام اعصاب', 'فيبروميالجيا', 'تنميل']
  },
  {
    id: 'cymbalta_30_60',
    tradeName: 'سيمبالتا 30 / 60 مجم (Cymbalta)',
    tradeNameEn: 'Cymbalta 30mg, 60mg (Duloxetine Delayed Release - Eli Lilly)',
    scientificName: 'دولوكستين هيدروكلوريد (Duloxetine HCl)',
    category: 'general',
    categoryAr: 'علاج آلام الأعصاب المزمنة والألم الليفي العضلي وتحسين المزاج دون زيادة وزن',
    categoryIcon: '🧠',
    defaultTiming: 'صباحاً بعد الإفطار مع كوب ماء',
    dosageForm: 'كبسولات مغلفة معوياً',
    commonDoses: ['30 مجم', '60 مجم مرة يومياً'],
    clinicalNotes: 'مثبط استرداد السيروتونين والنورأدرينالين (SNRI)، يعالج الألم العضلي والاعتلال العصبي المصاحب للسكري مع تأثير محايد أو خافض طفيف للشهية والوزن مقارنة بمهدئات الأعصاب الأخرى.',
    searchTokens: ['سيمبالتا', 'cymbalta', 'duloxetine', 'دولوكستين', 'الم عضلي', 'فيبروميالجيا']
  },
  {
    id: 'melatonin_night_calm',
    tradeName: 'ميلاتونين / نايت كالم (Melatonin / Night Calm)',
    tradeNameEn: 'Melatonin 3mg, 5mg, 10mg / Night Calm (Eszopiclone 1, 3mg)',
    scientificName: 'ميلاتونين هرمون النوم الطبيعي / إيزوبيكلون',
    category: 'general',
    categoryAr: 'تنظيم الساعة البيولوجية ومكافحة الأرق وتحسين كفاءة الحرق الليلي',
    categoryIcon: '🧠',
    defaultTiming: 'قبل موعد النوم بـ 30-45 دقيقة في غرفة مظلمة وهادئة',
    dosageForm: 'أقراص سريعة التفتت / كبسولات',
    commonDoses: ['3 مجم إلى 10 مجم ميلاتونين'],
    clinicalNotes: 'النوم العميق المضبوط بالساعة البيولوجية هو المفتاح الأساسي لضبط هرمونات الجوع والشبع (اللبتين والجرلين) وهرمون النمو الحارق للدهون.',
    searchTokens: ['ميلاتونين', 'melatonin', 'نايت كالم', 'night calm', 'نوم', 'ارق', 'ساعة بيولوجية']
  }
];
