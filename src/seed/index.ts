import type { Payload } from 'payload'
import { CONCEPTS } from '@/lib/taxonomies'
import { COURSE_LAB_BY_SLUG, LABS, type LabSlug } from '@/lib/labs'
import { ensurePublicComposer } from './public-content'

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
      title: '生态机器人智造营·低段',
      subtitle: '用手作、电路与图形化编程做出会感知的生态机器人',
      slug: 'shengtai-jiqiren-diduan',
      lab: 'making-engineering' as const,
      labTitle: '具身智能研究室',
      system: 'interest',
      sampleFlag: true,
      featured: true,
      gradeMin: 1,
      gradeMax: 3,
      totalHours: 16,
      subjects: ['科学探究', '工程设计', '智能硬件'],
      research: '学生通过手工、电路与图形化编程，制作会发光、会追光、会感知植物状态的生态机器人。',
      summary:
        '低段学生用手作、电路与图形化编程制作会发光、会追光、会感知植物状态的生态机器人，在具体材料里理解感知与反馈。示例课程。',
      drivingQuestion: '怎样做出一个会发光、会追光、还能告诉同学们植物是否舒服的小机器人？',
      primaryX: 'X9',
      secondaryX: ['X1'],
      primaryY: 'Y3',
      targetC: ['C2', 'C4'],
      primaryT: ['T1', 'T5'],
      targetL: 'L2',
      teachingArc: 'ARC3',
      domainPathways: ['A2'],
      trackAffinity: ['TRACK2'],
      materials: '卡纸、导电胶带、LED、光敏电阻、土壤湿度探针、电池盒。',
      hardware: '低压电路与传感器套件；禁止改装市电。',
      software: '图形化编程环境；不强制账号。',
      safety: '刀具与焊接须教师在场；只用低压电池；避免细小零件误吞。',
      assessments: '原型能否发光/追光/读植物状态，以及一次口头复盘。',
      evidence: '电路草图、工作原型、测试记录、复盘说明。',
      modules: [
        ['感知与发光', 5, '让一个手工机体发出可见信号。', '搭一条安全电路，让机器人在黑暗里发光。', '发光原型', '电路图与照片'],
        ['追光与转向', 6, '用光敏元件驱动一个简单动作。', '调试追光，记录成功与失败条件。', '追光原型', '测试表'],
        ['植物状态', 5, '把传感器读数变成同学能懂的提示。', '读取植物干湿并做出提示动作。', '生态机器人 v1', '演示与复盘'],
      ],
    },
    {
      title: '生态机器人智造营·高段',
      subtitle: '设计、搭建并调试多传感器生态智能系统',
      slug: 'shengtai-jiqiren-gaoduan',
      lab: 'making-engineering' as const,
      labTitle: '具身智能研究室',
      system: 'interest',
      sampleFlag: true,
      featured: true,
      gradeMin: 4,
      gradeMax: 6,
      totalHours: 24,
      subjects: ['系统思维', '工程设计', '智能硬件'],
      research: '学生围绕智能温室、AI气象站和智能回收秤等任务，完成多传感器生态智能系统的设计、搭建与调试。',
      summary:
        '高段学生围绕智能温室、AI气象站和智能回收秤，完成多传感器生态智能系统的设计、搭建与调试。示例课程。',
      drivingQuestion: '如果校园里的温室、气象和回收都要自己说话，怎样设计一套互相配合的传感系统？',
      primaryX: 'X9',
      secondaryX: ['X1'],
      primaryY: 'Y1',
      targetC: ['C4', 'C2'],
      primaryT: ['T1', 'T5', 'T7'],
      targetL: 'L3',
      teachingArc: 'ARC3',
      domainPathways: ['A2'],
      trackAffinity: ['TRACK2'],
      materials: '多传感器套件、结构件、导线、记录表。',
      hardware: '低压控制器与传感器；禁止改动校园供电。',
      software: '图形化或入门文本编程；可选表格记录。',
      safety: '户外安装须结伴；防水接头由教师检查；不采集可识别个人数据。',
      assessments: '系统图、联调记录、一次公开演示与故障复盘。',
      evidence: '系统图、工作原型、调试日志、演示反馈。',
      modules: [
        ['系统草图', 6, '先画清传感器如何互相配合。', '选定温室/气象站/回收秤中的一个主任务并画出系统图。', '系统图 v1', '约束清单'],
        ['搭建与联调', 10, '把多路传感做成可调试的整机。', '完成搭建并记录至少三次失败后的修正。', '联调原型', '调试日志'],
        ['演示与复盘', 8, '让系统在真实任务里被看见。', '公开演示并修订一版。', '发布版系统', '复盘对照'],
      ],
    },
    {
      title: 'SDG的IP潮玩盲盒',
      subtitle: '从可持续议题走到可发布的潮玩产品',
      slug: 'sdg-ip-manghe',
      lab: 'culture-arts' as const,
      labTitle: '艺术设计研究室',
      system: 'interest',
      sampleFlag: true,
      featured: true,
      gradeMin: 4,
      gradeMax: 6,
      totalHours: 16,
      subjects: ['AI创作', '数字制造', '产品思维'],
      research: '学生从可持续发展议题出发，完成IP角色、三维模型、实体潮玩、包装及产品发布的完整创作过程。',
      summary:
        '学生从可持续发展议题出发，完成IP角色、三维模型、实体潮玩、包装及产品发布的完整创作过程。示例课程。',
      drivingQuestion: '一个关于可持续发展的角色，怎样从一张草图变成别人愿意打开的潮玩盲盒？',
      primaryX: 'X5',
      secondaryX: ['X6'],
      primaryY: 'Y3',
      targetC: ['C2', 'C5'],
      primaryT: ['T1', 'T2', 'T4'],
      targetL: 'L2',
      teachingArc: 'ARC3',
      domainPathways: ['A6'],
      trackAffinity: ['TRACK4'],
      materials: '草图纸、色卡、包装样张、小型打印或手工成型材料。',
      hardware: '可选桌面三维成型（教师操作）；禁止无人看管的热加工。',
      software: '绘图与可选生成式图像工具；AI 输出必须经学生改绘与价值判断。',
      safety: '热加工与刀具须教师在场；不使用同学肖像做公开IP；生成内容须审核。',
      assessments: '角色论证、模型迭代、包装与发布说明。',
      evidence: '角色设定、模型版本、包装、发布海报。',
      modules: [
        ['议题与IP', 5, '把可持续发展做成一个可被记住的角色。', '选定一项SDG并画出角色与世界观。', 'IP设定集', '议题说明'],
        ['模型与潮玩', 6, '让角色变成可被拿在手里的物。', '完成三维或手工模型并试做一版实体。', '潮玩原型', '迭代照片'],
        ['包装发布', 5, '用包装和开箱完成一次产品发布。', '设计包装并组织小范围发布。', '发布版盲盒', '发布记录'],
      ],
    },
    {
      title: '3D打印盲盒·低段',
      subtitle: '从手绘潮玩角色走到可拿在手里的3D打印盲盒',
      slug: '3d-dayin-manghe-diduan',
      lab: 'culture-arts' as const,
      labTitle: '艺术设计研究室',
      system: 'interest',
      sampleFlag: true,
      featured: true,
      gradeMin: 1,
      gradeMax: 3,
      totalHours: 16,
      subjects: ['AI创作', '三维建模', '数字制造'],
      research: '学生从手绘潮玩角色开始，借助AI生成三维模型并体验3D打印与盲盒封装，让想象变成实体作品。',
      summary:
        '低段学生从手绘潮玩角色开始，借助AI生成三维模型并体验3D打印与盲盒封装，让想象变成实体作品。示例课程。',
      drivingQuestion: '一张自己画的潮玩角色，怎样变成别人也能打开的3D打印盲盒？',
      primaryX: 'X5',
      secondaryX: ['X6'],
      primaryY: 'Y3',
      targetC: ['C2', 'C5'],
      primaryT: ['T1', 'T2'],
      targetL: 'L2',
      teachingArc: 'ARC3',
      domainPathways: ['A6'],
      trackAffinity: ['TRACK4'],
      materials: '草图纸、色卡、小型打印耗材、包装纸。',
      hardware: '桌面3D打印由教师操作；禁止无人看管的热加工。',
      software: '绘图与可选生成式三维工具；AI 输出必须经学生改绘。',
      safety: '热加工与刀具须教师在场；不使用同学肖像做公开IP；生成内容须审核。',
      assessments: '角色草图、打印件、封装与口头说明。',
      evidence: '手绘稿、模型版本、打印件、盲盒包装。',
      modules: [
        ['手绘角色', 5, '先画出一个别人能认出的潮玩角色。', '完成角色设定与正面/侧面草图。', '角色设定', '草图说明'],
        ['模型与打印', 6, '让平面角色变成可打印的三维物。', '用AI辅助生成模型并完成一次打印。', '打印原型', '迭代照片'],
        ['封装开箱', 5, '用包装完成一次开箱体验。', '设计包装并组织小范围开箱。', '发布版盲盒', '开箱记录'],
      ],
    },
    {
      title: '3D打印盲盒·高段',
      subtitle: '独立完成系列IP、三维建模、打印、包装与产品展示',
      slug: '3d-dayin-manghe-gaoduan',
      lab: 'culture-arts' as const,
      labTitle: '艺术设计研究室',
      system: 'interest',
      sampleFlag: true,
      featured: true,
      gradeMin: 4,
      gradeMax: 6,
      totalHours: 24,
      subjects: ['三维建模', '数字制造', '产品思维'],
      research: '学生独立完成系列IP设定、三维建模、3D打印、包装设计和产品展示，体验潮玩产品的完整开发过程。',
      summary:
        '高段学生独立完成系列IP设定、三维建模、3D打印、包装设计和产品展示，体验潮玩产品的完整开发过程。示例课程。',
      drivingQuestion: '如果要发布一套自己的潮玩系列，怎样从IP走到可展示的产品？',
      primaryX: 'X5',
      secondaryX: ['X6'],
      primaryY: 'Y3',
      targetC: ['C2', 'C4'],
      primaryT: ['T1', 'T2', 'T4'],
      targetL: 'L3',
      teachingArc: 'ARC3',
      domainPathways: ['A6'],
      trackAffinity: ['TRACK4'],
      materials: '系列设定表、包装样张、小型打印或手工成型材料。',
      hardware: '桌面三维成型（教师操作）；禁止无人看管的热加工。',
      software: '三维建模与可选生成工具；AI 输出必须经学生改绘与价值判断。',
      safety: '热加工与刀具须教师在场；不使用同学肖像做公开IP；生成内容须审核。',
      assessments: '系列设定、模型迭代、包装与展示说明。',
      evidence: 'IP系列、模型版本、包装、展示海报。',
      modules: [
        ['系列IP', 8, '先把角色做成一套可扩展的世界观。', '完成至少三个互相关联的角色设定。', '系列设定集', '议题说明'],
        ['建模打印', 10, '让系列角色变成可被拿在手里的物。', '完成建模并打印关键角色。', '系列原型', '迭代照片'],
        ['包装展示', 6, '用包装和陈列完成一次产品发布。', '设计包装并组织展示。', '发布版系列', '展示记录'],
      ],
    },
    {
      title: 'AI新文创·低段',
      subtitle: '从非遗故事做出可触摸、可使用的新文创',
      slug: 'ai-xinwenchuang-diduan',
      lab: 'culture-arts' as const,
      labTitle: '文化传承研究室',
      system: 'interest',
      sampleFlag: true,
      featured: true,
      gradeMin: 1,
      gradeMax: 3,
      totalHours: 16,
      subjects: ['文化理解', '审美表达', '数字制造'],
      research: '学生从非遗故事和经典纹样出发，运用AI生图、3D打印、热转印与纸雕创作可触摸、可使用的新文创作品。',
      summary:
        '低段学生从非遗故事和经典纹样出发，运用AI生图、3D打印、热转印与纸雕创作可触摸、可使用的新文创作品。示例课程。',
      drivingQuestion: '一个古老的纹样或故事，怎样变成今天还能被使用的小物件？',
      primaryX: 'X7',
      secondaryX: ['X5'],
      primaryY: 'Y5',
      targetC: ['C3', 'C5'],
      primaryT: ['T1', 'T2'],
      targetL: 'L2',
      teachingArc: 'ARC3',
      domainPathways: ['A6'],
      trackAffinity: ['TRACK4'],
      materials: '纹样临摹纸、热转印材料、纸雕卡纸、小型打印耗材。',
      hardware: '热转印与3D打印须教师操作；禁止无人看管的热加工。',
      software: '绘图与可选生成式图像工具；AI 输出必须经学生改绘。',
      safety: '热加工与刀具须教师在场；不使用神圣或未授权的族群符号做商品化戏仿。',
      assessments: '纹样说明、实体作品、口头讲述。',
      evidence: '纹样稿、AI改绘、实体文创、讲述记录。',
      modules: [
        ['故事与纹样', 5, '先听懂一个纹样从哪里来。', '选定一个非遗故事或纹样并临摹关键形。', '纹样卡', '来源说明'],
        ['生成与改绘', 5, '用AI帮忙，但不让AI替你决定。', '生成参考图并亲手改绘一版。', '文创草图', '改绘对照'],
        ['做成可用的物', 6, '让纹样变成可触摸、可使用的物件。', '完成热转印、纸雕或打印件。', '文创成品', '使用说明'],
      ],
    },
    {
      title: 'AI新文创·高段',
      subtitle: '从纹样提取到IP动画，做成可传播的作品集',
      slug: 'ai-xinwenchuang-gaoduan',
      lab: 'culture-arts' as const,
      labTitle: '文化传承研究室',
      system: 'interest',
      sampleFlag: true,
      featured: true,
      gradeMin: 4,
      gradeMax: 6,
      totalHours: 24,
      subjects: ['文化理解', 'AI创作', '数字制造'],
      research: '学生独立完成非遗纹样提取、AI视觉创作、实体文创制作与IP动画展示，形成具有现代传播力的作品集。',
      summary:
        '高段学生独立完成非遗纹样提取、AI视觉创作、实体文创制作与IP动画展示，形成具有现代传播力的作品集。示例课程。',
      drivingQuestion: '怎样让一段非遗纹样既被尊重地理解，又能被今天的人愿意传播？',
      primaryX: 'X7',
      secondaryX: ['X5'],
      primaryY: 'Y5',
      targetC: ['C2', 'C3'],
      primaryT: ['T1', 'T2', 'T4'],
      targetL: 'L3',
      teachingArc: 'ARC3',
      domainPathways: ['A6'],
      trackAffinity: ['TRACK4'],
      materials: '纹样提取表、实体材料、展示海报。',
      hardware: '热转印与3D打印须教师操作；可选简易拍摄灯。',
      software: '绘图、生成式图像与可选短动画工具；AI 输出必须经学生改绘与价值判断。',
      safety: '热加工与刀具须教师在场；不戏仿未授权的族群符号；公开内容须审核。',
      assessments: '纹样提取、作品集、动画展示与说明。',
      evidence: '提取稿、实体文创、IP动画、作品集。',
      modules: [
        ['提取与论证', 8, '先说清纹样为什么值得被再创作。', '完成纹样提取并写出文化说明。', '提取档案', '来源对照'],
        ['视觉与实体', 10, '把纹样做成可见、可触摸的新形象。', '完成AI视觉创作与一件实体文创。', '文创原型', '迭代记录'],
        ['动画与作品集', 6, '让作品被别人看懂并愿意转发。', '完成短动画与作品集发布。', '传播版作品集', '展示反馈'],
      ],
    },
    {
      title: 'AI生态卡牌：共生世界',
      subtitle: '用食物链和共生关系设计一套可试玩的生态卡牌',
      slug: 'ai-shengtai-kapai',
      lab: 'economy-governance' as const,
      labTitle: '逻辑博弈研究室',
      system: 'interest',
      sampleFlag: true,
      featured: true,
      gradeMin: 4,
      gradeMax: 6,
      totalHours: 16,
      subjects: ['科学探究', '规则设计', 'AI创作'],
      research: '学生以食物链和生态共生关系为科学基础，借助AI创作角色与卡牌，并通过试玩持续优化游戏规则。',
      summary:
        '学生以食物链和生态共生关系为科学基础，借助AI创作角色与卡牌，并通过试玩持续优化游戏规则。示例课程。',
      drivingQuestion: '如果把一条食物链做成卡牌，怎样玩才既好玩、又不违背生态事实？',
      primaryX: 'X1',
      secondaryX: ['X8'],
      primaryY: 'Y4',
      targetC: ['C1', 'C4'],
      primaryT: ['T3', 'T4'],
      targetL: 'L2',
      teachingArc: 'ARC4',
      domainPathways: ['A3'],
      trackAffinity: ['TRACK3'],
      materials: '卡牌卡纸、食物链草图、试玩记录表。',
      hardware: '可选彩色打印；不涉及危险实验。',
      software: '绘图与可选生成式图像工具；AI 只辅助角色视觉。',
      safety: '竞争试玩提供退出协议；不针对个人输赢做公开羞辱；生成内容须审核。',
      assessments: '生态关系图、规则修订、试玩记录。',
      evidence: '关系图、卡牌组、规则 v1/v2、试玩反馈。',
      modules: [
        ['共生关系', 5, '先画清谁吃谁、谁帮谁。', '选定一个生态系统并画出食物链与共生。', '关系图', '科学说明'],
        ['角色与卡牌', 6, '把关系做成可被拿在手里的牌。', '用AI辅助创作角色并制成卡牌。', '卡牌原型', '牌面说明'],
        ['试玩修订', 5, '用试玩证明规则有没有违背生态。', '组织试玩并修订至少一版规则。', '可玩版卡组', '试玩记录'],
      ],
    },
    {
      title: 'AI策略桌游：月球基地',
      subtitle: '把探月、基地建设与生命保障做成一局策略桌游',
      slug: 'ai-celue-zhuoyou-yueqiu',
      lab: 'economy-governance' as const,
      labTitle: '逻辑博弈研究室',
      system: 'interest',
      sampleFlag: true,
      featured: true,
      gradeMin: 7,
      gradeMax: 9,
      totalHours: 24,
      subjects: ['逻辑推理', '系统思维', '规则设计'],
      research: '学生围绕探月任务、基地建设与生命保障，将资源管理、概率机制和任务规划转化为月球基地策略桌游。',
      summary:
        '学生围绕探月任务、基地建设与生命保障，将资源管理、概率机制和任务规划转化为月球基地策略桌游。示例课程。',
      drivingQuestion: '若一队人必须在月球活过三十天，哪些资源、概率和任务规则必须先被设计进一盘棋？',
      primaryX: 'X9',
      secondaryX: ['X8'],
      primaryY: 'Y4',
      targetC: ['C1', 'C4'],
      primaryT: ['T3', 'T5', 'T7'],
      targetL: 'L3',
      teachingArc: 'ARC4',
      domainPathways: ['A1'],
      trackAffinity: ['TRACK3'],
      materials: '资源标记、任务卡、概率骰或卡、地图底板。',
      hardware: '不适用。',
      software: '可选表格模拟与协作文档；AI 仅作规则推演助手。',
      safety: '竞争情境提供退出与心理安全协议；危机推演不针对个人；AI 输出必须经学生判断。',
      assessments: '资源系统图、规则可执行性、试玩复盘。',
      evidence: '系统图、规则书、对局记录、修订对照。',
      modules: [
        ['约束与资源', 8, '先写清月球上什么不能被浪费。', '列出水、氧、能源与任务约束并做成资源系统。', '资源图', '约束清单'],
        ['规则原型', 10, '把约束变成可执行的回合机制。', '设计概率、任务与建设规则并试跑两局。', '规则 v1', '对局记录'],
        ['试玩发布', 6, '用公开试玩证明规则站得住。', '组织试玩并修订一版。', '发布版桌游', '复盘对照'],
      ],
    },
    {
      title: '河流特攻队',
      subtitle: '把一条身边的河变成可论证的系统问题',
      slug: 'heliu-tegongdui',
      lab: 'nature-ecology' as const,
      labTitle: '地球科学研究室',
      system: 'fusion',
      sampleFlag: true,
      featured: true,
      gradeMin: 6,
      gradeMax: 9,
      totalHours: 32,
      subjects: ['科学探究', '工程设计', '智能硬件'],
      research: '学生走进真实河流开展水质调查，设计水质监测或垃圾清理装置，形成可持续的河流治理解决方案。',
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
      lab: 'climate-energy' as const,
      labTitle: '地球科学研究室',
      system: 'fusion',
      sampleFlag: true,
      featured: true,
      gradeMin: 7,
      gradeMax: 11,
      totalHours: 32,
      subjects: ['科学探究', '数据分析', '智能硬件'],
      research: '学生调查校园碳排放，研发智能照明、自动浇水和分类垃圾桶等低碳产品，并提出校园改造建议。',
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
      lab: 'digital-intel' as const,
      system: 'pioneer',
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
        labTitle: 'labTitle' in course ? course.labTitle : undefined,
        research: 'research' in course ? course.research : undefined,
        system: 'system' in course ? course.system : undefined,
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
  system?: 'interest' | 'fusion' | 'pioneer'
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
    system: 'fusion',
    lab: 'economy-governance',
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
    system: 'fusion',
    lab: 'city-community',
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
    system: 'interest',
    lab: 'food-agri-water',
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
    system: 'fusion',
    lab: 'culture-arts',
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
    system: 'interest',
    lab: 'culture-arts',
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
    system: 'pioneer',
    lab: 'making-engineering',
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
      system: 'system' in course ? course.system : undefined,
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

const COURSE_SYSTEM_BY_SLUG: Record<string, 'interest' | 'fusion' | 'pioneer'> = {
  'shengtai-jiqiren-diduan': 'interest',
  'shengtai-jiqiren-gaoduan': 'interest',
  'sdg-ip-manghe': 'interest',
  '3d-dayin-manghe-diduan': 'interest',
  '3d-dayin-manghe-gaoduan': 'interest',
  'ai-xinwenchuang-diduan': 'interest',
  'ai-xinwenchuang-gaoduan': 'interest',
  'ai-shengtai-kapai': 'interest',
  'ai-celue-zhuoyou-yueqiu': 'interest',
  'chongqing-jiaotong-ai': 'fusion',
  'xunhuan-dushi-nongchang': 'fusion',
  'liti-gongyuan-chengshi': 'fusion',
  'shikong-yunsuan-shequ': 'fusion',
  'hanzi-lishi-chuancheng': 'fusion',
  'hanzi-duoyang-fangyan': 'fusion',
  'hanzi-wenhua-pengzhuang': 'fusion',
  'hanzi-shikong-tansuo': 'fusion',
  'heliu-tegongdui': 'fusion',
  'tansuo-xiaoyuan': 'fusion',
  'guize-yugongping': 'fusion',
  'shiwufenzhong-jiequ': 'fusion',
  'koushushi-gongzuofang': 'fusion',
  'huoxing-jidi': 'pioneer',
  'zhuomian-jigou-gongfang': 'pioneer',
}

const FUSION_EXTRAS: Array<{
  title: string
  subtitle: string
  slug: string
  lab: LabSlug
  labTitle: string
  research: string
  issue: 'nature' | 'tech' | 'people'
  scene: LabSlug
  stage: 'g1-3' | 'g4-6' | 'g7-9' | 'g10-12'
  gradeMin: number
  gradeMax: number
  totalHours: number
  subjects: string[]
}> = [
  {
    title: '重庆立体交通与AI系统设计',
    subtitle: '用AI视觉与控制逻辑搭建立体交通智能系统',
    slug: 'chongqing-jiaotong-ai',
    lab: 'digital-intel',
    labTitle: '具身智能研究室',
    research: '学生以重庆山地交通为真实情境，运用AI视觉、传感器与控制逻辑搭建立体交通智能系统。',
    issue: 'tech',
    scene: 'digital-intel',
    stage: 'g7-9',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['逻辑推理', '系统思维', '智能硬件'],
  },
  {
    title: '可持续未来：循环经济都市农场',
    subtitle: '把循环、种植和物联网做成一座都市农场',
    slug: 'xunhuan-dushi-nongchang',
    lab: 'food-agri-water',
    labTitle: '未来农业研究室',
    research: '学生围绕城市食物供应与废弃物处理，设计并搭建融合循环经济、立体种植和物联网控制的未来都市农场。',
    issue: 'nature',
    scene: 'food-agri-water',
    stage: 'g7-9',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['科学探究', '系统思维', '智能硬件'],
  },
  {
    title: '立体公园城市',
    subtitle: '把居住、交通、绿化与公共服务叠进一座立体城市',
    slug: 'liti-gongyuan-chengshi',
    lab: 'city-community',
    labTitle: '未来都市研究室',
    research: '学生通过空间规划、结构实验和生态能源计算，设计一座集居住、交通、绿化与公共服务于一体的立体城市。',
    issue: 'tech',
    scene: 'city-community',
    stage: 'g7-9',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['系统思维', '工程设计', '数据分析'],
  },
  {
    title: '时空运算：学校出发的社区再造',
    subtitle: '用数据和交互模型重做校园与社区的时段服务',
    slug: 'shikong-yunsuan-shequ',
    lab: 'city-community',
    labTitle: '未来都市研究室',
    research: '学生调查校园与社区的时空利用情况，用数据和交互模型设计能够在不同时段服务不同人群的未来社区。',
    issue: 'people',
    scene: 'city-community',
    stage: 'g7-9',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['数据分析', '系统思维', '交互设计'],
  },
  {
    title: '汉字博物馆·历史传承',
    subtitle: '从符号、甲骨文到造纸，看见汉字如何推动文明',
    slug: 'hanzi-lishi-chuancheng',
    lab: 'culture-arts',
    labTitle: '文化传承研究室',
    research: '学生从早期符号、甲骨文、书体演变和造纸工艺入手，理解汉字如何记录并推动人类文明发展。',
    issue: 'nature',
    scene: 'culture-arts',
    stage: 'g7-9',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['文化理解', '科学探究', '审美表达'],
  },
  {
    title: '汉字博物馆·多样方言',
    subtitle: '用采集、声调和地图理解语言与地域文化',
    slug: 'hanzi-duoyang-fangyan',
    lab: 'culture-arts',
    labTitle: '文化传承研究室',
    research: '学生通过方言采集、声调分析、地域地图和朗诵展示，探究语言与地理、历史及地域文化之间的联系。',
    issue: 'people',
    scene: 'culture-arts',
    stage: 'g7-9',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['文化理解', '数据分析', '叙事表达'],
  },
  {
    title: '汉字博物馆·文化碰撞',
    subtitle: '比较汉字在不同文化中的冲突、适应与创新',
    slug: 'hanzi-wenhua-pengzhuang',
    lab: 'culture-arts',
    labTitle: '文化传承研究室',
    research: '学生比较汉字在不同地区和文化中的演变，通过分析、讨论与视觉设计理解文字交流中的冲突、适应与创新。',
    issue: 'people',
    scene: 'culture-arts',
    stage: 'g10-12',
    gradeMin: 7,
    gradeMax: 12,
    totalHours: 24,
    subjects: ['文化理解', '逻辑推理', '审美表达'],
  },
  {
    title: '汉字博物馆·时空探索',
    subtitle: '用AI字体与互动装置让濒危文字重新被看见',
    slug: 'hanzi-shikong-tansuo',
    lab: 'culture-arts',
    labTitle: '文化传承研究室',
    research: '学生围绕东巴文、女书等濒危文字，利用AI字体设计与互动装置探索传统文字在数字时代的保护与新生。',
    issue: 'tech',
    scene: 'culture-arts',
    stage: 'g7-9',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['文化理解', 'AI创作', '交互设计'],
  },
]

const FUSION_EXISTING_UPDATES = [
  {
    slug: 'heliu-tegongdui',
    lab: 'nature-ecology' as const,
    labTitle: '地球科学研究室',
    research: '学生走进真实河流开展水质调查，设计水质监测或垃圾清理装置，形成可持续的河流治理解决方案。',
    subjects: ['科学探究', '工程设计', '智能硬件'],
  },
  {
    slug: 'tansuo-xiaoyuan',
    lab: 'climate-energy' as const,
    labTitle: '地球科学研究室',
    research: '学生调查校园碳排放，研发智能照明、自动浇水和分类垃圾桶等低碳产品，并提出校园改造建议。',
    subjects: ['科学探究', '数据分析', '智能硬件'],
  },
]

async function ensureFusionCourses(payload: Payload) {
  for (const item of FUSION_EXISTING_UPDATES) {
    const res = await payload.find({
      collection: 'courses',
      where: { slug: { equals: item.slug } },
      limit: 5,
      overrideAccess: true,
      depth: 0,
    })
    for (const doc of res.docs) {
      await payload.update({
        collection: 'courses',
        id: doc.id,
        overrideAccess: true,
        data: {
          lab: item.lab,
          labTitle: item.labTitle,
          research: item.research,
          subjects: item.subjects,
          system: 'fusion',
          scene: item.lab,
        },
      })
    }
  }

  for (const course of FUSION_EXTRAS) {
    const res = await payload.find({
      collection: 'courses',
      where: { slug: { equals: course.slug } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })
    const data = {
      title: course.title,
      subtitle: course.subtitle,
      slug: course.slug,
      summary: course.research,
      drivingQuestion: course.research,
      sampleFlag: true,
      featured: false,
      gradeMin: course.gradeMin,
      gradeMax: course.gradeMax,
      totalHours: course.totalHours,
      subjects: [...course.subjects],
      lab: course.lab,
      labTitle: course.labTitle,
      research: course.research,
      system: 'fusion' as const,
      scene: course.scene,
      issue: course.issue,
      stage: course.stage,
      status: 'published' as const,
    }
    if (res.docs[0]) {
      await payload.update({
        collection: 'courses',
        id: res.docs[0].id,
        overrideAccess: true,
        data,
      })
    } else {
      await payload.create({
        collection: 'courses',
        overrideAccess: true,
        draft: false,
        data,
      })
    }
  }
}

async function ensureCourseLabs(payload: Payload) {
  payload.logger.info('公开浏览使用 B3.0 静态目录；不改写生产 courses.lab 枚举，不创建 108 门 Payload 课程。')
}

async function ensureCourseSystems(payload: Payload) {
  const res = await payload.find({ collection: 'courses', limit: 200, overrideAccess: true, depth: 0 })
  for (const doc of res.docs) {
    const item = doc as { id: string | number; slug?: string; system?: string }
    if (!item.slug || item.system) continue
    const system = COURSE_SYSTEM_BY_SLUG[item.slug]
    if (!system) continue
    await payload.update({ collection: 'courses', id: item.id, overrideAccess: true, data: { system } })
  }
}

const RETIRED_INTEREST = ['manghe', 'xiaoyuan-shiwu-ditu', 'gonggong-qianghui']

async function retireOldInterestCourses(payload: Payload) {
  for (const slug of RETIRED_INTEREST) {
    const res = await payload.find({
      collection: 'courses',
      where: { slug: { equals: slug } },
      limit: 5,
      overrideAccess: true,
      depth: 0,
    })
    for (const doc of res.docs) {
      await payload.update({
        collection: 'courses',
        id: doc.id,
        overrideAccess: true,
        data: { status: 'archived', featured: false },
      })
    }
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
    await ensurePublicComposer(payload)
    await seedProjects(payload)
    await payload.updateGlobal({
      slug: 'site-settings',
      overrideAccess: true,
      data: {
        siteName: '星球学院',
        siteNameEn: 'CRADLE-X',
        tagline: '面向 AI 时代的 K-12 未来创新教育范式',
        footerNote: 'B1.0 为唯一范式母本。C1.3 仅以 c13_* 字段补充工程化信息。',
        contactEmail: 'hello@planetacad.one',
        paradigmVersion: 'B3.0',
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
  try {
    await ensureCourseSystems(payload)
  } catch (err) {
    payload.logger.error(err, '课程体系字段补齐失败')
  }
  try {
    await ensureFusionCourses(payload)
  } catch (err) {
    payload.logger.error(err, '融合体系课程补齐失败')
  }
  try {
    await retireOldInterestCourses(payload)
  } catch (err) {
    payload.logger.error(err, '旧兴趣课程下架失败')
  }
  try {
    await ensurePublicComposer(payload)
  } catch (err) {
    payload.logger.error(err, '公开页面/站点设置补齐失败')
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
