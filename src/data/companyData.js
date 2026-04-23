// Elite Auditors Company Data - from company card/business card PDF
export const companyInfo = {
  arabicName: 'شركة نخبة المراجعين',
  englishName: 'ELITE AUDITORS',
  officeMobile: '+966541533600',
  website: 'eliteaudit.sa',
  officeEmail: 'info@eliteaudit.sa',
  commercialRegistration: '7052653529',
  licenseNumber: '1103',
  address: 'المملكة العربية السعودية - الرياض - حي المروج',
  cpa: 'CERTIFIED PUBLIC ACCOUNTANT',
  services: ['CONSULTING', 'AUDITING', 'TAX'],
};

export const companyProfile = {
  about: {
    ar: `شركة نخبة المراجعين شركة استشارية مهنية متخصصة تهدف إلى تحقيق خدماتها المهنية من خلال الأقسام الرئيسية الخاصة بمراجعة الحسابات والزكاة والضريبة والاستشارات المالية وادارية والمراجعة الداخلية وتأسيس الشركات في جميع أنحاء المملكة العربية السعودية عن طريق مدققين ومراجعين ومستشارين مؤهلين مهنياً، حيث يجلب كل فرد منهم خبراته المتخصصة بالتميز. نفخر بتقديم حلول مبتكرة مصممة خصيصاً لتلبية احتياجات كل عميل لضمان النمو والنجاح المستدام.`,
    en: `Elite Auditors is a specialized professional advisory firm that delivers its services through core divisions including audit, zakat & tax, financial and administrative advisory, internal audit, and company formation across the Kingdom of Saudi Arabia. Our qualified auditors, reviewers, and consultants bring deep, specialized expertise and a commitment to excellence. We pride ourselves on innovative, tailor-made solutions designed to meet each client’s needs and support sustainable growth and success.`,
  },
  values: [
    {
      key: 'quality',
      image: '/value-bgs/01.png',
      titleAr: 'الجودة العالية',
      bodyAr: 'ضمان استفادة كل عميل من خدماتنا من خلال تقديم معايير جودة تلبي احتياجاته.',
      titleEn: 'High quality',
      bodyEn: 'Delivering consistent quality standards that meet each client’s needs.',
    },
    {
      key: 'customer-understanding',
      image: '/value-bgs/02.png',
      titleAr: 'فهم العملاء',
      bodyAr: 'نسعى لفهم عملائنا وطموحاتهم واستراتيجياتهم بعمق، وأن نكون جزءاً من تحقيق أهدافهم التجارية.',
      titleEn: 'Client understanding',
      bodyEn: 'Deep understanding of our clients’ vision, ambitions, and strategy.',
    },
    {
      key: 'relationships',
      image: '/value-bgs/03.png',
      titleAr: 'الشغف بالعلاقات',
      bodyAr: 'نبني علاقات قوية ودائمة مع أصحاب المصلحة، ونكون دائماً قريبين ومتجاوبين وفعّالين للتكيف.',
      titleEn: 'Relationship-driven',
      bodyEn: 'Building long-term stakeholder relationships with responsive service.',
    },
    {
      key: 'support',
      image: '/value-bgs/04.png',
      titleAr: 'الدعم',
      bodyAr: 'ندعم الكفاءات السعودية وندرب خريجي المحاسبة بالشكل الذي يتطلبه السوق السعودي.',
      titleEn: 'Support',
      bodyEn: 'Supporting local talent and developing the next generation of accountants.',
    },
  ],
  services: {
    audit: {
      titleAr: 'خدمات التدقيق',
      titleEn: 'Audit & Assurance',
      itemsAr: [
        'مراجعة القوائم المالية السنوية والمرحلية',
        'الإجراءات المتفق عليها',
        'المراجعات الخاصة',
        'خدمات التحليل المالي العامة والخاصة',
      ],
      itemsEn: [
        'Annual & interim financial statement audits',
        'Agreed-upon procedures',
        'Special reviews',
        'General & specialized financial analysis services',
      ],
    },
    advisory: {
      titleAr: 'خدمات استشارات',
      titleEn: 'Advisory',
      itemsAr: [
        'إعداد السياسات والإجراءات',
        'الاستشارات المحاسبية (IFRS)',
        'الحوكمة والمخاطر والامتثال',
        'المراجعة الداخلية',
        'ﺧﺪﻣﺎت إﻋﺎدة ﻫﻴﻜﻠﺔ ادارة اﻟﻤﺎﻟﻴﺔ',
      ],
      itemsEn: [
        'Policies & procedures design',
        'Accounting advisory (IFRS)',
        'Governance, risk & compliance (GRC)',
        'Internal audit',
        'Finance function restructuring',
      ],
    },
    other: {
      titleAr: 'خدمات أخرى',
      titleEn: 'Other services',
      itemsAr: [
        'الاشراف على البيع على الخارطة\nاعمال البيع على الخارطة',
        'خدمات تأسيس الشركات',
        'خدمات تصنيف المقاولين',
        'خدمات مراجعة الزكاة والضريبة والاستشارات\nالادارية',
      ],
      itemsEn: [
        'Off-plan sales support',
        'Company formation services',
        'Contractor classification services',
        'Zakat & tax review and administrative consulting',
      ],
    },
    zakatTax: {
      titleAr: 'خدمات الزكاة و الضرائب',
      titleEn: 'Zakat & Tax',
      itemsAr: ['إعداد الإقرارات الزكوية والضريبية', 'استشارات الزكاة والضرائب', 'الاعتراضات الزكوية والضريبية'],
      itemsEn: ['Zakat & tax returns preparation', 'Zakat & tax consulting', 'Zakat & tax objections support'],
    },
  },
  methodology: [
    {
      key: 'tech',
      titleAr: 'تمكين التقنية',
      bodyAr: 'نوفر مجموعة شاملة من أحدث وأكثر التقنيات فعالية لتعزيز جودة خدماتنا، مع التكيف السريع مع احتياجات كل مشروع لضمان الدقة والكفاءة.',
      titleEn: 'Technology enablement',
      bodyEn: 'We leverage modern tools and technologies to improve quality, accuracy, and efficiency.',
    },
    {
      key: 'pm',
      titleAr: 'إدارة المشاريع',
      bodyAr: 'تعيين فرق متخصصة لكل عميل لضمان تسليم النتائج في الوقت المحدد وبشكل يفوق التوقعات.',
      titleEn: 'Project management',
      bodyEn: 'Dedicated teams per client to deliver outcomes on time and beyond expectations.',
    },
  ],
  position: {
    ar: {
      headline: 'نضع العميل أولاً ونقدم خدمة مخصصة مبنية على خبرة ومعرفة متخصصة.',
      pillars: [
        { key: 'client', title: 'أولوية العميل', body: 'نركز على فهم احتياجات العملاء وتقديم قيمة واضحة في كل تعامل.' },
        { key: 'tailored', title: 'خدمة مخصصة', body: 'حلول مصممة خصيصاً لتناسب طبيعة كل عميل وقطاعه ومتطلباته.' },
        { key: 'expertise', title: 'المعرفة المتخصصة', body: 'فريق مؤهل يقدم استشارات وتدقيق مبنيين على خبرة ومعايير مهنية.' },
        { key: 'flex', title: 'المرونة والابتكار', body: 'نتكيف بسرعة مع المتغيرات ونبتكر في أساليب التنفيذ لتحقيق أفضل النتائج.' },
        { key: 'globalLocal', title: 'الخبرة العالمية والمحلية', body: 'نمزج فهم السوق المحلي مع أفضل الممارسات المهنية.' },
      ],
    },
    en: {
      headline: 'Client-first, tailored service backed by specialized expertise.',
      pillars: [
        { key: 'client', title: 'Client priority', body: 'We focus on understanding client needs and delivering clear value in every engagement.' },
        { key: 'tailored', title: 'Tailored service', body: 'Solutions designed to fit each client, industry, and requirement.' },
        { key: 'expertise', title: 'Specialized knowledge', body: 'Qualified professionals delivering audit and advisory grounded in standards and experience.' },
        { key: 'flex', title: 'Flexibility & innovation', body: 'We adapt quickly and apply modern approaches to deliver better outcomes.' },
        { key: 'globalLocal', title: 'Global & local experience', body: 'We combine local market understanding with best professional practices.' },
      ],
    },
  },
  strategicGoals: {
    visualSrc: '/strategic-goals-visual.png',
    lanes: [
      {
        num: '01',
        tagAr: 'تقديم تجربة نخبة المراجعين',
        tagEn: 'Delivering the Elite Auditors experience',
        bodyAr:
          'نركز على فهم عميق وشامل لرؤية عملائنا وأعمالهم ونجاحهم، ونسعى دائماً لبناء علاقات قوية وطويلة الأمد مع عملائنا بناءً على فهم عميق لاستراتيجياتهم وطموحاتهم.',
        bodyEn:
          'We focus on a deep, holistic understanding of our clients’ vision, operations, and success—and we work continuously to build strong, long-term relationships grounded in their strategies and ambitions.',
      },
      {
        num: '02',
        tagAr: 'تمكين الفرق الشغوفة',
        tagEn: 'Empowering passionate teams',
        bodyAr:
          'نسعى لتحقيق طموحات فريقنا وتمكينهم من تعزيز قيمهم وبناء مسيرة مهنية ناجحة في شركتنا وما بعدها.',
        bodyEn:
          'We pursue our team’s ambitions and empower them to strengthen their values and build successful careers with us and beyond.',
      },
      {
        num: '03',
        tagAr: 'بناء مجتمعات',
        tagEn: 'Building communities',
        bodyAr: 'نتطلع إلى الشراكة مع العاملين الرئيسيين في السوق.',
        bodyEn: 'We look forward to partnering with key players in the market.',
      },
    ],
  },
  strategicPillars: {
    visualSrc: '/strategic-pillars-visual.png',
    stackLabels: [
      { key: 'customers', titleAr: 'العملاء', titleEn: 'Clients' },
      { key: 'team', titleAr: 'فريق العمل', titleEn: 'Our team' },
      { key: 'partners', titleAr: 'الشركاء', titleEn: 'Partners' },
    ],
    pillars: [
      {
        num: '01',
        linesAr: [
          'تقديم تجربة العميل في نخبة المراجعين: التعاون والفهم والأفكار والرؤية—كل شيء يدور حول عملائنا.',
          'نقدم تركيزاً لا مثيل له على العملاء في كل تعامل.',
        ],
        linesEn: [
          'The client experience at Elite Auditors is built on collaboration, understanding, ideas, and vision—everything revolves around our clients.',
          'We bring an unmatched focus on clients in every interaction.',
        ],
      },
      {
        num: '02',
        linesAr: [
          'تمكين الفرق الشغوفة ومساعدة أفراد فريقنا على تحقيق تطلعاتهم.',
          'نمكّن بعضنا البعض لتعزيز قيمتنا وبناء مسيرات مهنية ناجحة داخل شركتنا وخارجها.',
        ],
        linesEn: [
          'We empower passionate teams and help our people reach their aspirations.',
          'We enable one another to strengthen our value and build successful careers inside and outside the firm.',
        ],
      },
      {
        num: '03',
        linesAr: [
          'مع الفريق المناسب، كل شيء ممكن.',
          'نسعى إلى الشراكة مع اللاعبين الرئيسيين في السوق، ونقدّر شراكاتنا الاستراتيجية، ونتطلع إلى بناء المزيد منها.',
        ],
        linesEn: [
          'With the right team, everything is possible.',
          'We pursue partnerships with key market players, value our strategic alliances, and aim to build more of them.',
        ],
      },
    ],
  },
}

export const teamMembers = [
  {
    id: 1,
    arabicName: 'حمد طلال آل منيف',
    englishName: 'HAMAD AL MUNYIF',
    jobTitleArabic: 'الشريك المدير',
    jobTitleEnglish: 'Managing Partner / CPA / SOCPA',
    mobile: '0545314747',
    email: 'h.almunif@eliteaudit.sa',
  },
  {
    id: 2,
    arabicName: 'عمر عبدالشافى',
    englishName: 'OMAR ABDELSHAFY',
    jobTitleArabic: 'مراجع حسابات',
    jobTitleEnglish: 'Auditor',
    mobile: '0565678659',
    email: 'o.abdelshafy@eliteaudit.sa',
  },
  {
    id: 3,
    arabicName: 'محمود سعيد',
    englishName: 'MAHMOUD SAEED',
    jobTitleArabic: 'مراجع حسابات',
    jobTitleEnglish: 'Auditor',
    mobile: '0565530073',
    email: 'm.saeed@eliteaudit.sa',
  },
  {
    id: 4,
    arabicName: 'محمد حمدى',
    englishName: 'MOHAMED HAMDY',
    jobTitleArabic: 'مراجع حسابات',
    jobTitleEnglish: 'Auditor',
    mobile: '0565814921',
    email: 'm.hamdy@eliteaudit.sa',
  },
  {
    id: 5,
    arabicName: 'رنا أمين',
    englishName: 'RANA AMIN',
    jobTitleArabic: 'مراجع حسابات',
    jobTitleEnglish: 'Auditor',
    mobile: '0535766689',
    email: 'r.amin@eliteaudit.sa',
  },
  {
    id: 6,
    arabicName: 'سيدرا سالم',
    englishName: 'SEDRA SALEM',
    jobTitleArabic: 'مراجع حسابات',
    jobTitleEnglish: 'Auditor',
    mobile: '0502736232',
    email: 's.salem@eliteaudit.sa',
  },
];
