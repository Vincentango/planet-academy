import type { Payload } from 'payload'
import { CONCEPTS } from '@/lib/taxonomies'
import { COURSE_LAB_BY_SLUG, LABS, type LabSlug } from '@/lib/labs'

type IdMap = Record<string, number | string>

async function upsertConcept(payload: Payload, map: IdMap, item: (typeof CONCEPTS)[number]) {
  const existing = await payload.find({
    collection: 'concepts',
    where: { code: { equals: item.code } },
    limit: 1,
    overrideAccess: true,
  })
  const data = {
    ...item,
    locked: true,
    paradigmVersion: 'B1.0',
  }
  if (existing.docs[0]) {
    map[item.shortCode] = existing.docs[0].id
    map[item.code] = existing.docs[0].id
    return
  }
  const created = await payload.create({ collection: 'concepts', data, overrideAccess: true })
  map[item.shortCode] = created.id
  map[item.code] = created.id
}

async function ensureAdmin(payload: Payload) {
  const email = process.env.ADMIN_EMAIL || 'admin@planetacad.one'
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe_Planet1'
  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  })
  if (found.docs[0]) return
  await payload.create({
    collection: 'users',
    data: { email, password, name: '星球学院管理员', role: 'admin' },
    overrideAccess: true,
  })
}

async function createModule(
  payload: Payload,
  courseId: number | string,
  order: number,
  title: string,
  hours: number,
  goal: string,
  task: string,
  output: string,
  evidence: string,
) {
  return payload.create({
    collection: 'course-modules',
    overrideAccess: true,
    data: {
      title,
      course: courseId,
      order,
      hours,
      goal,
      task,
      teacherMove: '提供支架、关键提问与安全边界，不替代学生的问题定义与价值判断。',
      output,
      evidence,
      tools: '记录表、讨论协议、迭代日志',
    },
  })
}

async function seedCourses(payload: Payload, ids: IdMap) {
  const existing = await payload.find({ collection: 'courses', limit: 1, overrideAccess: true })
  if (existing.totalDocs > 0) return

  const courses = [
    {
      title: '盲盒课程',
      subtitle: '把“惊喜”做成可设计的价值体验',
      slug: 'manghe',
      lab: 'interaction' as const,
      sampleFlag: true,
      featured: true,
      gradeMin: 3,
      gradeMax: 6,
      totalHours: 16,
      subjects: ['艺术', '综合实践'],
      summary:
        '小学生以敏捷创造弧设计一款面向真实同伴的主题盲盒：从用户惊喜、材料成本到发布反馈，练习设计创作与价值创造。示例课程。',
      drivingQuestion: '如何为校园里的真实同伴设计一款既有文化表达、又说得清成本与公平的主题盲盒？',
      primaryX: 'X5',
      secondaryX: ['X6'],
      primaryY: 'Y3',
      targetC: ['C2', 'C5'],
      primaryT: ['T1', 'T2', 'T4'],
      targetL: 'L2',
      teachingArc: 'ARC3',
      domainPathways: ['A6'],
      trackAffinity: ['TRACK4'],
      materials: '卡纸、色纸、小型包装盒、贴纸、环保填充物；每组预算有上限。',
      hardware: '不适用（手工与桌面材料为主）。',
      software: '可选绘图工具；不强制账号。',
      safety: '避免细小零件误吞；剪刀使用需教师在场；不收集同学肖像用于公开传播。',
      assessments: '课前：用户访谈笔记。过程：原型迭代记录。总结：发布后同伴反馈与成本复盘。',
      evidence: '设计草图、材料清单、一次真实用户测试、版本对比说明。',
      modules: [
        ['定义惊喜', 4, '把“好看”转成可验证的用户问题。', '访谈 3 位同伴，写下他们真正期待的开箱瞬间。', '问题定义卡', '访谈笔记'],
        ['原型与成本', 6, '在材料约束下做出可开箱原型。', '制作第一版盲盒并核算成本。', '可开箱原型 + 成本表', '原型照片与迭代说明'],
        ['测试发布', 6, '用真实反馈改进，完成小范围发布。', '组织开箱测试，根据反馈改一版后发布。', '发布版盲盒与反馈海报', '用户反馈与复盘'],
      ],
    },
    {
      title: '河流特攻队',
      subtitle: '把一条身边的河变成可论证的系统问题',
      slug: 'heliu-tegongdui',
      lab: 'earth' as const,
      sampleFlag: true,
      featured: true,
      gradeMin: 6,
      gradeMax: 9,
      totalHours: 32,
      subjects: ['科学', '人文社科'],
      summary:
        '学生以系统透镜与证据透镜调查校园或社区邻近水体，区分观察、推断与价值主张，形成可公开的河流问题论证。示例课程。',
      drivingQuestion: '我们身边的这条河，究竟发生了什么？哪些变化可以被证据支持，哪些只是传闻？',
      primaryX: 'X1',
      primaryY: 'Y1',
      secondaryY: 'Y2',
      targetC: ['C1', 'C4'],
      primaryT: ['T3', 'T4', 'T6'],
      targetL: 'L3',
      teachingArc: 'ARC1',
      domainPathways: ['A3'],
      trackAffinity: ['TRACK3'],
      c13_project_maturity: 'P5',
      materials: '观察记录表、采样瓶（如允许）、水质试纸、地图打印件。',
      hardware: '可选便携检测或手机拍摄；不得进入危险水域。',
      software: '表格与简报工具；可选公开数据查询。',
      safety: '禁止独自下水；采样须在安全岸线和成人监护下；不公开可识别未成年人影像；不泄露精确家庭住址。',
      assessments: '证据分级表、论证结构检查、同伴评审、安全合规检查。',
      evidence: '观察卡、数据表、反证检索、论证海报、评审记录。',
      modules: [
        ['问题与先验', 8, '激活已有经验，提出可研究的驱动问题。', '绘制河段地图并列出已知与未知。', '问题清单与河段图', '先验激活记录'],
        ['研究与证据', 14, '收集第一手与第二手证据并分级。', '完成至少一次现场观察与一组公开数据对照。', '证据包', '原始记录与来源标注'],
        ['论证与评审', 10, '形成可被质疑的论证并接受同伴评审。', '发布论证并回应至少两条反驳。', '论证报告', '评审意见与修改说明'],
      ],
    },
    {
      title: '碳索校园',
      subtitle: '把校园能耗变成可行动的低碳问题',
      slug: 'tansuo-xiaoyuan',
      lab: 'earth' as const,
      sampleFlag: true,
      featured: true,
      gradeMin: 7,
      gradeMax: 11,
      totalHours: 32,
      subjects: ['科学', '数学', '综合实践'],
      summary:
        '学生调查校园能源使用，用系统视角识别高碳环节，设计可验证的低碳行动并评估影响。示例课程。主 X1，领域路径为能源低碳。',
      drivingQuestion: '如果要把我们的校园变成一座更低碳的微型地球系统，最先应该改哪里，凭什么？',
      primaryX: 'X1',
      primaryY: 'Y1',
      targetC: ['C4', 'C6'],
      primaryT: ['T3', 'T7', 'T4'],
      targetL: 'L4',
      teachingArc: 'ARC5',
      domainPathways: ['A3'],
      trackAffinity: ['TRACK5'],
      materials: '能耗记录表、海报材料、计算草稿本。',
      hardware: '可选电表读数（须物业许可）；禁止拆改电路。',
      software: '表格、简易可视化；可选公开排放因子。',
      safety: '不进入配电间；不改动学校电气设施；数据匿名到楼层/功能区，不针对个人。',
      assessments: '基线数据完整性、方案可行性、利益相关者沟通、影响评估。',
      evidence: '能耗基线、方案对比、行动记录、前后数据、复盘。',
      modules: [
        ['校园碳画像', 10, '建立可复现的校园能耗观察。', '选择 2 个功能区做一周记录。', '碳画像草图', '原始读数与方法说明'],
        ['利益相关者与方案', 12, '把方案放进真实约束。', '访谈物业/教师/同学，提出两个可比方案。', '方案书', '访谈纪要与约束清单'],
        ['行动与评估', 10, '实施一小步并评估。', '落地一个经批准的低碳行动并测量变化。', '行动报告', '前后数据与限制说明'],
      ],
    },
    {
      title: '火星基地',
      subtitle: '在极端约束中设计人类如何共同生活',
      slug: 'huoxing-jidi',
      lab: 'embodied' as const,
      sampleFlag: true,
      featured: true,
      gradeMin: 8,
      gradeMax: 12,
      totalHours: 48,
      subjects: ['科学', '信息技术', '人文社科'],
      summary:
        '学生以未来透镜构想一座火星基地：同时处理智能技术系统与全球/共同体治理规则，检验当下地球决策如何投射到未来。示例课程。',
      drivingQuestion: '若一百人必须在火星生活三年，哪些系统必须先被设计，哪些规则绝不能交给机器单独决定？',
      primaryX: 'X9',
      secondaryX: ['X10'],
      primaryY: 'Y6',
      targetC: ['C4', 'C1', 'C6'],
      primaryT: ['T1', 'T5', 'T7'],
      targetL: 'L4',
      teachingArc: 'ARC3',
      domainPathways: ['A1', 'A2'],
      aiCapabilities: ['AI-A', 'AI-C'],
      trackAffinity: ['TRACK1', 'TRACK2'],
      materials: '系统图纸、角色卡、约束卡（水、氧、能源、通信、冲突）。',
      hardware: '可选模型材料；不涉及真实高压或危险化学。',
      software: '协作文档、可选模拟表格或简易程序；AI 仅作分析助手。',
      safety: '讨论冲突情境时提供心理安全协议；不收集敏感健康数据；AI 输出必须经学生价值判断。',
      assessments: '系统图完整性、治理规则可执行性、人机边界检查、发布答辩。',
      evidence: '基地系统图、治理宪章草稿、情景推演记录、人机边界清单、答辩反馈。',
      modules: [
        ['约束与未来情景', 12, '用未来透镜展开多种可能，而非单一科幻设定。', '写出三个差异化情景并选出要设计的一个。', '情景矩阵', '情景假设与证据'],
        ['系统与规则原型', 20, '同时设计技术系统与治理规则。', '完成水/能源/通信系统图，并写出四条不可外包给 AI 的规则。', '系统原型 + 宪章 v1', '迭代日志'],
        ['测试与发布', 16, '用角色推演压力测试后公开发布。', '组织一次多角色危机推演并修订方案。', '基地方案发布版', '推演记录与修订对照'],
      ],
    },
  ] as const

  for (const course of courses) {
    const created = await payload.create({
      collection: 'courses',
      overrideAccess: true,
      draft: false,
      data: {
        title: course.title,
        subtitle: course.subtitle,
        slug: course.slug,
        summary: course.summary,
        sampleFlag: course.sampleFlag,
        featured: course.featured,
        gradeMin: course.gradeMin,
        gradeMax: course.gradeMax,
        totalHours: course.totalHours,
        subjects: [...course.subjects],
        drivingQuestion: course.drivingQuestion,
        lab: course.lab,
        paradigmVersion: 'B1.0',
        primaryX: ids[course.primaryX],
        secondaryX: 'secondaryX' in course ? course.secondaryX.map((k) => ids[k]) : [],
        primaryY: ids[course.primaryY],
        secondaryY: 'secondaryY' in course ? ids[course.secondaryY] : undefined,
        targetC: course.targetC.map((k) => ids[k]),
        primaryT: course.primaryT.map((k) => ids[k]),
        targetL: ids[course.targetL],
        teachingArc: ids[course.teachingArc],
        domainPathways: course.domainPathways.map((k) => ids[k]),
        aiCapabilities: 'aiCapabilities' in course ? course.aiCapabilities.map((k) => ids[k]) : [],
        trackAffinity: course.trackAffinity.map((k) => ids[k]),
        materials: course.materials,
        hardware: course.hardware,
        software: course.software,
        safety: course.safety,
        assessments: course.assessments,
        evidence: course.evidence,
        c13_project_maturity: 'c13_project_maturity' in course ? course.c13_project_maturity : undefined,
        seo: { title: `${course.title} · 星球学院`, description: course.summary },
        status: 'published',
      },
    })

    const moduleIds = []
    for (const [title, hours, goal, task, output, evidence] of course.modules) {
      const mod = await createModule(payload, created.id, moduleIds.length + 1, title, hours, goal, task, output, evidence)
      moduleIds.push(mod.id)
    }
    await payload.update({
      collection: 'courses',
      id: created.id,
      overrideAccess: true,
      data: { modules: moduleIds },
    })
  }
}

async function seedPages(payload: Payload) {
  const existing = await payload.find({ collection: 'pages', limit: 1, overrideAccess: true })
  if (existing.totalDocs > 0) return

  await payload.create({
    collection: 'pages',
    overrideAccess: true,
    data: {
      title: '首页',
      slug: 'home',
      excerpt: '星球学院公开门户：B1.0 理念、课程知识库与成果。',
      status: 'published',
      seo: {
        title: '星球学院 PLANET ACADEMY',
        description: '面向 AI 时代的 K-12 未来创新教育范式。WHY→WHAT→HOW→PROVE，以及五重闭环。',
      },
      layout: [
        {
          blockType: 'hero',
          eyebrow: 'PLANET ACADEMY · B1.0',
          heading: '帮助每一个学生找到作为人类的不可替代性',
          subheading:
            'AI 时代的教育，不是人机竞争，而是人机协作。星球学院以六大核心能力（C1-C6）为顶层目标，以 XYZ 三维课程框架、五种教学弧和四维评价，把理念变成可检索的课程知识库。',
          theme: 'brand',
          container: 'wide',
          height: 'large',
          spacing: 'xl',
          alignment: 'left',
          actions: [
            { label: '阅读教育范式', href: '/paradigm', style: 'primary' },
            { label: '进入课程中心', href: '/courses', style: 'secondary' },
          ],
        },
        {
          blockType: 'logicChain',
          heading: '四层推导链 + 五重闭环',
          intro: '四层之间不是并列，而是严格的因果推导。每一层设计都必须回答：这个设计如何服务于 C1-C6？',
          theme: 'dark',
          container: 'wide',
          spacing: 'lg',
          layers: [
            { code: 'WHY', title: '范式基础', summary: 'AI 能力边界、七大人类独特能力、C1-C6、四大人机协作边界。', href: '/paradigm/why' },
            { code: 'WHAT', title: '课程框架', summary: 'X 轴十大议题、Y 轴六大认知透镜、Z 轴双层能力结构。', href: '/paradigm/xyz' },
            { code: 'HOW', title: '教学实施', summary: '五种教学弧、L1-L6 认知阶梯、AI 能力 A/B/C/D。', href: '/paradigm/teaching-arcs' },
            { code: 'PROVE', title: '评价体系', summary: '四维标签、T1-T7 证据、五大综合赛道倾向。', href: '/paradigm/assessment' },
            { code: 'SUSTAIN', title: '五重闭环', summary: '范式、课程、教师、生态、个体，形成可持续运行。', href: '/paradigm/ecosystem' },
          ],
        },
        {
          blockType: 'conceptGrid',
          heading: 'C1-C6 六大核心能力',
          intro: '基础层 C1/C5，核心层 C2/C3/C4，整合层 C6。',
          family: 'C',
          theme: 'brand',
          container: 'wide',
          spacing: 'lg',
        },
        {
          blockType: 'courseFeed',
          heading: '示例课程',
          intro: '卡片仅展示名称、学段/年级、主 X、主 Y、课时与 1-2 个学科。',
          mode: 'featured',
          limit: 4,
          theme: 'dark',
          container: 'wide',
          spacing: 'lg',
        },
        {
          blockType: 'cta',
          heading: '把理念变成可实施的课程对象',
          body: '学校、教师与合作伙伴可以通过结构化课程字段、模块与证据链理解星球学院，而不是只看宣传页。',
          buttonLabel: '联系我们',
          buttonHref: '/contact',
          theme: 'brand',
          container: 'content',
          spacing: 'lg',
          alignment: 'center',
        },
      ],
    },
  })
}

async function seedProjects(payload: Payload) {
  const existing = await payload.find({ collection: 'projects', limit: 1, overrideAccess: true })
  if (existing.totalDocs > 0) return
  const course = await payload.find({
    collection: 'courses',
    where: { slug: { equals: 'heliu-tegongdui' } },
    limit: 1,
    overrideAccess: true,
  })
  await payload.create({
    collection: 'projects',
    overrideAccess: true,
    data: {
      title: '河流特攻队：一次被修订过的论证',
      slug: 'heliu-zhenglun-v2',
      summary: '学生先把“河变脏了”当成结论，后来用证据分级把结论改成“岸线垃圾输入增加，水质变化仍需对照数据”。展示过程，不只展示成品。',
      course: course.docs[0]?.id,
      processNote: '包含观察卡、反证检索和一次同伴评审后的版本对照。影像默认匿名。',
      status: 'published',
    },
  })
}


const PLACEHOLDER_COURSES: Array<{
  title: string
  subtitle: string
  slug: string
  lab: LabSlug
  gradeMin: number
  gradeMax: number
  totalHours: number
  subjects: string[]
  summary: string
  drivingQuestion: string
  primaryX: string
  secondaryX?: string[]
  primaryY: string
  targetC: string[]
  primaryT: string[]
  targetL: string
  teachingArc: string
  domainPathways: string[]
  trackAffinity: string[]
  materials: string
  hardware: string
  software: string
  safety: string
  assessments: string
  evidence: string
}> = [
  {
    title: '规则与公平',
    subtitle: '用一场可见的博弈理解规则如何分配机会',
    slug: 'guize-yugongping',
    lab: 'logic',
    gradeMin: 6,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['数学', '人文社科'],
    summary: '学生设计并修订一套课堂博弈规则，观察策略如何改变结果，区分“赢得比赛”与“规则是否公平”。示例课程。',
    drivingQuestion: '一套看起来人人都能玩的规则，怎样才能被证明对所有参与者仍然公平？',
    primaryX: 'X8',
    primaryY: 'Y4',
    targetC: ['C1', 'C4'],
    primaryT: ['T3', 'T4'],
    targetL: 'L3',
    teachingArc: 'ARC1',
    domainPathways: ['A6'],
    trackAffinity: ['TRACK3'],
    materials: '规则卡、计分表、角色牌。',
    hardware: '不适用。',
    software: '可选表格工具。',
    safety: '竞争情境需提供退出与心理安全协议；不针对个人输赢做公开羞辱。',
    assessments: '规则修订说明、公平性论证、同伴评审。',
    evidence: '规则 v1/v2、对局记录、公平性论证海报。',
  },
  {
    title: '十五分钟街区',
    subtitle: '把日常出行半径做成可设计的城市问题',
    slug: 'shiwufenzhong-jiequ',
    lab: 'city',
    gradeMin: 7,
    gradeMax: 10,
    totalHours: 32,
    subjects: ['人文社科', '综合实践'],
    summary: '学生测绘自己的十五分钟生活圈，识别服务缺口，提出一个可被社区讨论的微型公共方案。示例课程。',
    drivingQuestion: '如果只能在步行十五分钟内安排生活，我们的街区还缺什么，谁被排除在外？',
    primaryX: 'X2',
    primaryY: 'Y3',
    targetC: ['C4', 'C6'],
    primaryT: ['T1', 'T7'],
    targetL: 'L3',
    teachingArc: 'ARC5',
    domainPathways: ['A5'],
    trackAffinity: ['TRACK5'],
    materials: '街区底图、观察记录表、访谈提纲。',
    hardware: '可选手机拍照；不采集精确住址。',
    software: '简报与协作文档。',
    safety: '户外观察须结伴并避开危险路段；影像默认匿名；不公开可识别未成年人。',
    assessments: '地图完整性、方案可行性、利益相关者沟通。',
    evidence: '生活圈地图、访谈纪要、方案对比、发布反馈。',
  },
  {
    title: '校园食物地图',
    subtitle: '从一顿午餐看见土地、劳动与选择',
    slug: 'xiaoyuan-shiwu-ditu',
    lab: 'agri',
    gradeMin: 3,
    gradeMax: 6,
    totalHours: 16,
    subjects: ['科学', '综合实践'],
    summary: '小学生追踪午餐中的一种食物回到产地与季节，做成一张可讲解的校园食物地图。示例课程。',
    drivingQuestion: '今天盘子里的食物，是从哪块土地、经过谁的手，才来到校园的？',
    primaryX: 'X3',
    primaryY: 'Y5',
    targetC: ['C5', 'C3'],
    primaryT: ['T3', 'T4'],
    targetL: 'L2',
    teachingArc: 'ARC2',
    domainPathways: ['A4'],
    trackAffinity: ['TRACK3'],
    materials: '食材卡、季节表、地图打印纸。',
    hardware: '不适用。',
    software: '可选绘图工具。',
    safety: '食物过敏须提前申报；不鼓励品尝不明来源食材；田间参观须成人监护。',
    assessments: '食物来源记录、地图讲解、同伴提问回应。',
    evidence: '食物旅程卡、校园食物地图、讲解记录。',
  },
  {
    title: '口述史工作坊',
    subtitle: '让一段地方记忆被听见，也被质疑',
    slug: 'koushushi-gongzuofang',
    lab: 'culture',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['语文', '人文社科'],
    summary: '学生采访一位同意参与的长辈或社区成员，整理口述，并对照第二手材料区分记忆、叙事与证据。示例课程。',
    drivingQuestion: '一段被讲述的过去，哪些部分可以被核验，哪些必须被当作叙事来理解？',
    primaryX: 'X7',
    primaryY: 'Y5',
    targetC: ['C3', 'C5'],
    primaryT: ['T4', 'T3'],
    targetL: 'L3',
    teachingArc: 'ARC1',
    domainPathways: ['A6'],
    trackAffinity: ['TRACK4'],
    materials: '知情同意书、访谈提纲、转写稿纸。',
    hardware: '可选录音设备（须同意）；不公开原声除非另有授权。',
    software: '文档与时间线工具。',
    safety: '必须书面知情同意；可随时撤回；不采集敏感身份信息；公开文本默认匿名。',
    assessments: '访谈伦理检查、叙事与证据对照、成果发布。',
    evidence: '同意书、转写摘录、对照表、发布文本。',
  },
  {
    title: '公共墙绘',
    subtitle: '把一面墙做成可讨论的公共表达',
    slug: 'gonggong-qianghui',
    lab: 'art',
    gradeMin: 3,
    gradeMax: 6,
    totalHours: 16,
    subjects: ['艺术', '综合实践'],
    summary: '学生为校园或社区一面被允许的墙面提出主题、草图与材料方案，并在真实约束下完成一次公共表达。示例课程。',
    drivingQuestion: '一面人人都会路过的墙，怎样说话才既有表达、又不剥夺别人的墙？',
    primaryX: 'X5',
    primaryY: 'Y3',
    targetC: ['C2', 'C3'],
    primaryT: ['T1', 'T4'],
    targetL: 'L2',
    teachingArc: 'ARC3',
    domainPathways: ['A6'],
    trackAffinity: ['TRACK4'],
    materials: '草图纸、色卡、被批准的涂料或可移除材料。',
    hardware: '刷具；高处作业禁止。',
    software: '可选绘图工具。',
    safety: '只在批准墙面施工；使用无毒材料；避免高处与封闭空间；不绘制攻击性肖像。',
    assessments: '主题论证、草图迭代、现场实施与复盘。',
    evidence: '草图版本、材料清单、过程照片、观众反馈。',
  },
  {
    title: '桌面机构工坊',
    subtitle: '让一个机构在桌面上可被看见、被修好',
    slug: 'zhuomian-jigou-gongfang',
    lab: 'making',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['信息技术', '综合实践'],
    summary: '学生设计一个解决具体动作问题的桌面机构，完成原型、测试与一次公开的故障复盘。示例课程。',
    drivingQuestion: '如果只用桌面尺度的材料，怎样做出一个能稳定完成指定动作的机构？',
    primaryX: 'X9',
    primaryY: 'Y3',
    targetC: ['C2', 'C4'],
    primaryT: ['T1', 'T5'],
    targetL: 'L3',
    teachingArc: 'ARC3',
    domainPathways: ['A2'],
    trackAffinity: ['TRACK2'],
    materials: '卡纸、木条、橡胶筋、连接件、测量尺。',
    hardware: '可选微型电机（低压）；禁止改装市电。',
    software: '可选简易建模或记录表。',
    safety: '刀具与热熔胶须教师在场；运动部件加防护；不使用锐利金属边。',
    assessments: '机构图、测试记录、迭代说明、发布答辩。',
    evidence: '机构图、原型、测试视频或照片、故障复盘。',
  },
]

async function conceptIdMap(payload: Payload): Promise<IdMap> {
  const ids: IdMap = {}
  const concepts = await payload.find({ collection: 'concepts', limit: 200, overrideAccess: true })
  for (const doc of concepts.docs) {
    const item = doc as { id: number | string; shortCode?: string; code?: string }
    if (item.shortCode) ids[item.shortCode] = item.id
    if (item.code) ids[item.code] = item.id
  }
  return ids
}

async function createPublishedCourse(
  payload: Payload,
  ids: IdMap,
  course: (typeof PLACEHOLDER_COURSES)[number] | {
    title: string
    subtitle: string
    slug: string
    lab: LabSlug
    gradeMin: number
    gradeMax: number
    totalHours: number
    subjects: string[]
    summary: string
    drivingQuestion: string
    primaryX: string
    secondaryX?: string[]
    primaryY: string
    targetC: string[]
    primaryT: string[]
    targetL: string
    teachingArc: string
    domainPathways: string[]
    trackAffinity: string[]
    materials: string
    hardware: string
    software: string
    safety: string
    assessments: string
    evidence: string
  },
) {
  return payload.create({
    collection: 'courses',
    overrideAccess: true,
    draft: false,
    data: {
      title: course.title,
      subtitle: course.subtitle,
      slug: course.slug,
      summary: course.summary,
      sampleFlag: true,
      featured: false,
      gradeMin: course.gradeMin,
      gradeMax: course.gradeMax,
      totalHours: course.totalHours,
      subjects: [...course.subjects],
      drivingQuestion: course.drivingQuestion,
      lab: course.lab,
      paradigmVersion: 'B1.0',
      primaryX: ids[course.primaryX],
      secondaryX: course.secondaryX?.map((k) => ids[k]) || [],
      primaryY: ids[course.primaryY],
      targetC: course.targetC.map((k) => ids[k]),
      primaryT: course.primaryT.map((k) => ids[k]),
      targetL: ids[course.targetL],
      teachingArc: ids[course.teachingArc],
      domainPathways: course.domainPathways.map((k) => ids[k]),
      trackAffinity: course.trackAffinity.map((k) => ids[k]),
      materials: course.materials,
      hardware: course.hardware,
      software: course.software,
      safety: course.safety,
      assessments: course.assessments,
      evidence: course.evidence,
      seo: { title: `${course.title} · 星球学院`, description: course.summary },
      status: 'published',
    },
  })
}

async function ensureCourseLabs(payload: Payload) {
  const ids = await conceptIdMap(payload)
  if (!Object.keys(ids).length) {
    payload.logger.warn('术语库尚未就绪，跳过研究室课程补齐。')
    return
  }

  const existing = await payload.find({ collection: 'courses', limit: 200, overrideAccess: true })
  for (const doc of existing.docs) {
    const course = doc as { id: number | string; slug?: string; lab?: string | null }
    const mapped = course.slug ? COURSE_LAB_BY_SLUG[course.slug] : undefined
    if (mapped && course.lab !== mapped) {
      await payload.update({
        collection: 'courses',
        id: course.id,
        overrideAccess: true,
        data: { lab: mapped },
      })
    }
  }

  const after = await payload.find({ collection: 'courses', limit: 200, overrideAccess: true })
  const have = new Set(
    after.docs
      .map((doc) => (doc as { lab?: string | null }).lab)
      .filter((lab): lab is string => Boolean(lab)),
  )

  for (const lab of LABS) {
    if (have.has(lab.slug)) continue
    const draft = PLACEHOLDER_COURSES.find((item) => item.lab === lab.slug)
    if (!draft) continue
    const found = await payload.find({
      collection: 'courses',
      where: { slug: { equals: draft.slug } },
      limit: 1,
      overrideAccess: true,
    })
    if (found.docs[0]) {
      await payload.update({
        collection: 'courses',
        id: found.docs[0].id,
        overrideAccess: true,
        data: { lab: draft.lab, status: 'published' },
      })
      continue
    }
    await createPublishedCourse(payload, ids, draft)
    payload.logger.info(`已补齐研究室课程：${lab.name} / ${draft.title}`)
  }
}

export async function seedIfEmpty(payload: Payload) {
  await ensureAdmin(payload)
  const users = await payload.find({ collection: 'users', limit: 0, overrideAccess: true })
  const concepts = await payload.find({ collection: 'concepts', limit: 0, overrideAccess: true })
  if (concepts.totalDocs === 0) {
    const ids: IdMap = {}
    for (const item of CONCEPTS) await upsertConcept(payload, ids, item)
    await seedCourses(payload, ids)
    await seedPages(payload)
    await seedProjects(payload)
    await payload.updateGlobal({
      slug: 'site-settings',
      overrideAccess: true,
      data: {
        siteName: '星球学院',
        siteNameEn: 'PLANET ACADEMY',
        tagline: '面向 AI 时代的 K-12 未来创新教育范式',
        footerNote: 'B1.0 为唯一范式母本。C1.3 仅以 c13_* 字段补充工程化信息。公开成果默认匿名。',
        contactEmail: 'hello@planetacad.one',
        paradigmVersion: 'B1.0',
        paradigmDate: '2026',
      },
    })
    payload.logger.info(`星球学院种子数据已写入（用户 ${users.totalDocs}）。`)
  } else {
    payload.logger.info('术语库已存在，跳过完整种子。')
  }
  try {
    await ensureCourseLabs(payload)
  } catch (err) {
    payload.logger.error(err, '研究室课程补齐失败')
  }
}


export async function runSeed() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  const payload = await getPayload({ config })
  await seedIfEmpty(payload)
  process.exit(0)
}

if (import.meta.url.endsWith('seed/index.ts') && process.argv[1]?.includes('seed')) {
  runSeed().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
