export type ConceptSeed = {
  code: string
  shortCode: string
  name: string
  nameEn?: string
  family: 'C' | 'X' | 'Y' | 'T' | 'L' | 'ARC' | 'AI' | 'A' | 'TRACK' | 'LOOP'
  layer?: string
  shortDefinition: string
  officialDefinition: string
  stages?: string
  sort: number
}

export const CONCEPTS: ConceptSeed[] = [
  {
    code: 'B10-C1', shortCode: 'C1', name: '批判性感知与伦理判断', nameEn: 'Critical Perception & Ethical Judgment',
    family: 'C', layer: '基础层', sort: 1,
    shortDefinition: '通过真实体验形成感知，在价值冲突中做出有担当的判断。',
    officialDefinition: '来源合并：具身智慧 + 道德勇气。AI 可分析伦理问题，但无法承担道德责任；AI 可处理数据，但无法真正“感受”。培养贯穿 K-12，小学阶段优先级最高。',
  },
  {
    code: 'B10-C2', shortCode: 'C2', name: '创造性表达与原创生产', nameEn: 'Creative Expression & Original Production',
    family: 'C', layer: '核心层', sort: 2,
    shortDefinition: '突破已有模式，产生真正原创性的作品、方案或想法。',
    officialDefinition: '来源合并：创造性跃迁。AI 擅长在已有模式中组合，但无法真正突破模式边界。初中深化，高中达最高强度。',
  },
  {
    code: 'B10-C3', shortCode: 'C3', name: '深度连接与协作共情', nameEn: 'Deep Connection & Empathic Collaboration',
    family: 'C', layer: '核心层', sort: 3,
    shortDefinition: '建立真实的人际信任，在团队中实现真正的协作与共情。',
    officialDefinition: '来源合并：深度连接。AI 可模拟情感，但无法真正建立人与人之间的信任关系。',
  },
  {
    code: 'B10-C4', shortCode: 'C4', name: '复杂系统思维与问题解决', nameEn: 'Complex Systems Thinking & Problem Solving',
    family: 'C', layer: '核心层', sort: 4,
    shortDefinition: '理解复杂系统的动态关系，在不确定情境中做出有效判断。',
    officialDefinition: '来源合并：适应性智慧。AI 依赖训练数据，在真正的新情境中表现脆弱。',
  },
  {
    code: 'B10-C5', shortCode: 'C5', name: '意义建构与自我驱动', nameEn: 'Meaning-Making & Self-Direction',
    family: 'C', layer: '基础层', sort: 5,
    shortDefinition: '为自己的学习和行动赋予意义，建立持久的内在动机。',
    officialDefinition: '来源合并：意义建构。AI 可描述意义，但无法真正“拥有”意义和内在动机。与 C1 同为基础层，贯穿全学段。',
  },
  {
    code: 'B10-C6', shortCode: 'C6', name: '共同行动与社会变革', nameEn: 'Collective Action & Social Change',
    family: 'C', layer: '整合层', sort: 6,
    shortDefinition: '在复杂社会系统中组织、动员他人，推动真实的共同行动。',
    officialDefinition: '来源合并：共同行动力。是前五项能力的综合运用，K-12 最高培养目标，主要在高中大型综合项目中体现。AI 可辅助协调，但无法真正激发人类的共同意志。',
  },
  {
    code: 'B10-X1', shortCode: 'X1', name: '自然生态与地球系统', nameEn: 'Nature, Ecology & Earth Systems',
    family: 'X', sort: 11,
    shortDefinition: '地球作为相互依存的生命系统如何运作，以及人类如何找到可持续路径。',
    officialDefinition: '认知视角是生态学视角，聚焦自然系统本身的运作逻辑与动态平衡。与 X3 的区别：X1 问“自然系统如何运作”，X3 问“人类如何通过食物与自然和彼此连接”。',
  },
  {
    code: 'B10-X2', shortCode: 'X2', name: '城市社区与人类聚居', nameEn: 'Cities, Communities & Human Settlement',
    family: 'X', sort: 12,
    shortDefinition: '人类如何在城市和社区中组织集体生活，并设计更公平宜居的环境。',
    officialDefinition: '认知视角是社会学视角，聚焦人类如何在有限空间内协调共同生活的制度与文化安排。',
  },
  {
    code: 'B10-X3', shortCode: 'X3', name: '食物农业与生命联结', nameEn: 'Food, Agriculture & Living Connection',
    family: 'X', sort: 13,
    shortDefinition: '食物如何连接土地、文化与历史，以及如何保护和创新饮食文化。',
    officialDefinition: '认知视角是人类学视角，聚焦食物作为文化符号、社会纽带和生命意义的载体。',
  },
  {
    code: 'B10-X4', shortCode: 'X4', name: '身体健康与心理福祉', nameEn: 'Body, Health & Psychological Wellbeing',
    family: 'X', sort: 14,
    shortDefinition: '身体与心理如何相互影响，以及如何在个体、社区和社会层面促进整体健康。',
    officialDefinition: '认知视角是整体健康视角，强调身体、心理、社会环境的不可分割性。',
  },
  {
    code: 'B10-X5', shortCode: 'X5', name: '艺术表达与文化创造', nameEn: 'Arts, Expression & Cultural Creation',
    family: 'X', sort: 15,
    shortDefinition: '人类如何通过艺术和文化创造表达自我、传递意义、构建共同体。',
    officialDefinition: '认知视角是美学与文化创造视角，聚焦人类通过符号和形式赋予世界意义的独特能力。',
  },
  {
    code: 'B10-X6', shortCode: 'X6', name: '经济系统与价值创造', nameEn: 'Economic Systems & Value Creation',
    family: 'X', sort: 16,
    shortDefinition: '人类如何通过经济活动创造和分配价值，以及如何理解工作与经济公平。',
    officialDefinition: '认知视角是政治经济学视角，聚焦价值创造与分配背后的权力关系与制度安排。',
  },
  {
    code: 'B10-X7', shortCode: 'X7', name: '历史叙事与集体记忆', nameEn: 'History, Narrative & Collective Memory',
    family: 'X', sort: 17,
    shortDefinition: '人类如何通过历史叙事构建集体身份，以及谁有权力定义历史。',
    officialDefinition: '认知视角是历史学与叙事学视角。与 X8 的区别：X7 聚焦历史作为叙事和记忆的社会功能，X8 聚焦伦理原则的普遍性与文化特殊性。',
  },
  {
    code: 'B10-X8', shortCode: 'X8', name: '伦理哲学与价值判断', nameEn: 'Ethics, Philosophy & Value Judgment',
    family: 'X', sort: 18,
    shortDefinition: '人类如何在价值冲突中做出有担当的判断，并重新思考责任与尊严。',
    officialDefinition: '认知视角是哲学视角，聚焦价值判断的依据、方法与局限。',
  },
  {
    code: 'B10-X9', shortCode: 'X9', name: '智能技术与人类社会', nameEn: 'Intelligent Technology & Human Society',
    family: 'X', sort: 19,
    shortDefinition: '人工智能与数字技术如何重塑工作、关系和认知，以及人类如何保持主体性。',
    officialDefinition: '认知视角是科技社会学视角，聚焦技术与社会的相互塑造关系。',
  },
  {
    code: 'B10-X10', shortCode: 'X10', name: '全球治理与未来想象', nameEn: 'Global Governance & Future Imagination',
    family: 'X', sort: 20,
    shortDefinition: '人类如何在全球层面协调应对共同挑战，并设计更公平可持续的未来。',
    officialDefinition: '认知视角是全球政治与未来学视角，聚焦超越国家边界的集体行动与未来设计。',
  },
  {
    code: 'B10-Y1', shortCode: 'Y1', name: '系统与结构透镜', nameEn: 'Systems & Structure Lens',
    family: 'Y', sort: 21,
    shortDefinition: '将对象理解为相互依存的系统，分析关系、反馈与涌现。',
    officialDefinition: 'Y 轴是纯粹认知视角，不是教法。典型问题：各部分如何相互影响？主要培养 C4。典型组合：X1、X2、X9、X10。',
  },
  {
    code: 'B10-Y2', shortCode: 'Y2', name: '证据与推理透镜', nameEn: 'Evidence & Reasoning Lens',
    family: 'Y', sort: 22,
    shortDefinition: '系统收集、分析和评估证据，区分事实与观点，构建论证。',
    officialDefinition: '典型问题：支持这个观点的证据是什么？可靠吗？主要培养 C1、C4。',
  },
  {
    code: 'B10-Y3', shortCode: 'Y3', name: '设计与创造透镜', nameEn: 'Design & Creation Lens',
    family: 'Y', sort: 23,
    shortDefinition: '以解决真实问题为导向，通过迭代设计将想法转化为方案或作品。',
    officialDefinition: '典型路径：定义问题→发散构思→原型→测试→迭代。主要培养 C2。不是教学弧。',
  },
  {
    code: 'B10-Y4', shortCode: 'Y4', name: '批判与伦理透镜', nameEn: 'Critical & Ethical Lens',
    family: 'Y', sort: 24,
    shortDefinition: '质疑表面叙事，分析权力与利益，从伦理角度评估正当性。',
    officialDefinition: '典型问题：谁受益、谁承担代价？主要培养 C1、C6。',
  },
  {
    code: 'B10-Y5', shortCode: 'Y5', name: '比较与文化透镜', nameEn: 'Comparative & Cultural Lens',
    family: 'Y', sort: 25,
    shortDefinition: '比较不同文化与历史背景下的理解，发现普遍性与特殊性。',
    officialDefinition: '主要培养 C3、C5。典型组合：X3、X4、X5、X7、X8。',
  },
  {
    code: 'B10-Y6', shortCode: 'Y6', name: '未来与可能性透镜', nameEn: 'Futures & Possibilities Lens',
    family: 'Y', sort: 26,
    shortDefinition: '用情景规划、趋势分析与愿景设计想象并设计可能的未来。',
    officialDefinition: '主要培养 C4、C5。典型组合：X1、X6、X9、X10。',
  },
  {
    code: 'B10-T1', shortCode: 'T1', name: '设计创作', nameEn: 'Design & Making',
    family: 'T', sort: 31,
    shortDefinition: '将想法转化为可见、可用的作品或原型。',
    officialDefinition: '主要对应 C2。AI 可生成内容，但无法真正理解“为谁设计”的人文意图。注意：B1.0 赛道三原文另有“T1系统思维”表述，已登记待确认，系统不擅自修订官方 T1 定义。',
  },
  {
    code: 'B10-T2', shortCode: 'T2', name: '创新工具使用', nameEn: 'Innovation Tooling',
    family: 'T', sort: 32,
    shortDefinition: '识别、学习和灵活运用新工具（包括 AI 工具）解决问题。',
    officialDefinition: '主要对应 C4、C5。选择什么工具、如何用的判断属于人类。',
  },
  {
    code: 'B10-T3', shortCode: 'T3', name: '研究分析', nameEn: 'Research & Analysis',
    family: 'T', sort: 33,
    shortDefinition: '系统收集、分析和解释信息，形成有说服力的论证。',
    officialDefinition: '主要对应 C1、C4。AI 可处理数据，但无法真正理解研究问题背后的人文关怀。',
  },
  {
    code: 'B10-T4', shortCode: 'T4', name: '沟通表达', nameEn: 'Communication & Expression',
    family: 'T', sort: 34,
    shortDefinition: '通过文字、口头、视觉、表演等多种媒介清晰有力地传递想法。',
    officialDefinition: '主要对应 C2、C3。AI 可生成表达，但无法真正建立人与人之间的情感连接。',
  },
  {
    code: 'B10-T5', shortCode: 'T5', name: '计算技术', nameEn: 'Computational Thinking & Technology',
    family: 'T', sort: 35,
    shortDefinition: '运用计算思维和数字技术解决问题，包括编程、数据处理和系统设计。',
    officialDefinition: '主要对应 C4。AI 可执行计算，但无法真正理解计算结果的社会意义。',
  },
  {
    code: 'B10-T6', shortCode: 'T6', name: '团队协作', nameEn: 'Collaboration & Teamwork',
    family: 'T', sort: 36,
    shortDefinition: '在真实团队中建立信任、管理冲突、协调行动。',
    officialDefinition: '主要对应 C3、C6。AI 可辅助协调，但无法真正建立信任和共情。',
  },
  {
    code: 'B10-T7', shortCode: 'T7', name: '项目管理', nameEn: 'Project Management',
    family: 'T', sort: 37,
    shortDefinition: '在复杂多变的项目中制定计划、分配资源、应对不确定性。',
    officialDefinition: '主要对应 C4、C6。AI 可提供建议，但无法真正承担项目失败的责任和压力。',
  },
  {
    code: 'B10-L1', shortCode: 'L1', name: '启蒙探索', family: 'L', sort: 41,
    shortDefinition: '在高度结构化支持下，完成单一技能的基础练习。',
    officialDefinition: '自主程度：高度依赖教师支架。最少课时：16 课时。等级依据认知复杂度与自主程度，不由年级自动决定。',
  },
  {
    code: 'B10-L2', shortCode: 'L2', name: '基础建构', family: 'L', sort: 42,
    shortDefinition: '在适度支持下，运用单一技能完成简单项目。',
    officialDefinition: '自主程度：能做出基本设计选择。建议 32 课时。',
  },
  {
    code: 'B10-L3', shortCode: 'L3', name: '综合应用', family: 'L', sort: 43,
    shortDefinition: '在有限支持下，综合运用 2-3 个技能构件完成中等复杂度项目。',
    officialDefinition: '自主程度：能识别问题并设计方案。32 课时。',
  },
  {
    code: 'B10-L4', shortCode: 'L4', name: '深度探究', family: 'L', sort: 44,
    shortDefinition: '在较少支持下，综合运用多个技能构件对真实问题进行深度探究。',
    officialDefinition: '自主程度：能主导研究方向。建议 48 课时。',
  },
  {
    code: 'B10-L5', shortCode: 'L5', name: '创新突破', family: 'L', sort: 45,
    shortDefinition: '在高度自主状态下，产生具有真实影响力的创新成果。',
    officialDefinition: '自主程度：能定义问题并推动变革。48 课时。',
  },
  {
    code: 'B10-L6', shortCode: 'L6', name: '引领示范', family: 'L', sort: 46,
    shortDefinition: '具备指导他人的能力，产生具有可扩展性的创新成果。',
    officialDefinition: '自主程度：能在更大系统中发挥领导作用。48 课时以上，通常跨学期。',
  },
  {
    code: 'B10-ARC1', shortCode: 'ARC1', name: '深度探究弧', nameEn: 'Deep Inquiry Arc',
    family: 'ARC', sort: 51, stages: '问题→先验→研究→证据→论证→评审',
    shortDefinition: '以研究和理解为核心，形成有说服力的论证。',
    officialDefinition: '阶段：驱动性问题提出 → 先验知识激活 → 系统性研究 → 证据整合与分析 → 论证建构 → 成果展示与同伴评审。主要 T3、T4；C1、C4；Y1/Y2/Y4。学段：初中至高中，L3-L6。',
  },
  {
    code: 'B10-ARC2', shortCode: 'ARC2', name: '结构化体验弧', nameEn: 'Structured Experience Arc',
    family: 'ARC', sort: 52, stages: '准备→体验→反思→概念→深化→迁移',
    shortDefinition: '以真实体验和感知为核心，通过亲身经历理解抽象概念。',
    officialDefinition: '主要 T4、T6；C3、C5；Y5/Y6。学段：小学至初中，L1-L4。Y 轴不是教法，教学弧才是实施路径。',
  },
  {
    code: 'B10-ARC3', shortCode: 'ARC3', name: '敏捷创造弧', nameEn: 'Agile Creation Arc',
    family: 'ARC', sort: 53, stages: '定义→构思→原型→测试→迭代→发布',
    shortDefinition: '以设计和制作为核心，通过快速迭代把想法变成可见成果。',
    officialDefinition: '主要 T1、T2；C2、C4；Y3。学段：全学段，L2-L5。',
  },
  {
    code: 'B10-ARC4', shortCode: 'ARC4', name: '游戏化探险弧', nameEn: 'Gamified Adventure Arc',
    family: 'ARC', sort: 54, stages: '任务→探索→挑战→协作→庆典',
    shortDefinition: '以激发好奇心和探索欲为核心，适合低学段或降低门槛的情境。',
    officialDefinition: '阶段：情境导入（任务发布）→ 探索发现 → 挑战升级 → 团队协作 → 成果庆典。主要 T2、T6；C3、C5。学段：小学，L1-L3。',
  },
  {
    code: 'B10-ARC5', shortCode: 'ARC5', name: '社会行动弧', nameEn: 'Social Action Arc',
    family: 'ARC', sort: 55, stages: '调研→利益相关者→方案→行动→评估→总结',
    shortDefinition: '以推动真实社会变革为核心，把学习成果转化为社会影响。',
    officialDefinition: '阶段：问题识别（社区调研）→ 利益相关者分析 → 方案设计 → 倡导行动 → 影响评估 → 经验总结。主要 T6、T7、T4；C6、C1。学段：初中至高中，L4-L6。',
  },
  {
    code: 'B10-AI-A', shortCode: 'AI-A', name: '理解与批判', family: 'AI', sort: 61,
    shortDefinition: '理解 AI 工作原理，批判性评估生成内容的可靠性与偏见。',
    officialDefinition: '对应 C1、C4；对应 Y4。学段重点：初中起系统培养。横向贯穿层，不是独立课程模块。',
  },
  {
    code: 'B10-AI-B', shortCode: 'AI-B', name: '协作与创造', family: 'AI', sort: 62,
    shortDefinition: '将 AI 作为创造伙伴，在人机协作中实现超越单独工作的创新。',
    officialDefinition: '对应 C2、C3；对应 Y3。全学段，深度递进。',
  },
  {
    code: 'B10-AI-C', shortCode: 'AI-C', name: '伦理与责任', family: 'AI', sort: 63,
    shortDefinition: '理解 AI 的社会影响，做出负责任的 AI 使用决策。',
    officialDefinition: '对应 C1、C6；对应 Y4。小学启蒙，高中深化。',
  },
  {
    code: 'B10-AI-D', shortCode: 'AI-D', name: '适应与进化', family: 'AI', sort: 64,
    shortDefinition: '持续学习新的 AI 工具，在快速迭代中保持学习能力。',
    officialDefinition: '对应 C4、C5；对应 Y6。全学段，贯穿始终。',
  },
  {
    code: 'B10-D1-A1', shortCode: 'A1', name: '数字智能', family: 'A', sort: 71,
    shortDefinition: '从数字工具与计算思维，走向系统性 AI 项目与技术伦理。',
    officialDefinition: '核心议题对应 X9。未来方向示例：AI 工程师、数据科学家、算法伦理师、人机交互设计师。领域路径是评价输出端，不是 X 轴情境。',
  },
  {
    code: 'B10-D1-A2', shortCode: 'A2', name: '工程制造', family: 'A', sort: 72,
    shortDefinition: '从动手制作理解材料结构，走向复杂系统工程与跨学科创新。',
    officialDefinition: '核心议题对应 X2、X6。',
  },
  {
    code: 'B10-D1-A3', shortCode: 'A3', name: '能源低碳', family: 'A', sort: 73,
    shortDefinition: '从生态意识走向能源系统分析、气候政策与可持续创新。',
    officialDefinition: '核心议题对应 X1、X10。',
  },
  {
    code: 'B10-D1-A4', shortCode: 'A4', name: '生命健康', family: 'A', sort: 74,
    shortDefinition: '从身心健康习惯走向生命科学探究与公共卫生创新。',
    officialDefinition: '核心议题对应 X4、X3。',
  },
  {
    code: 'B10-D1-A5', shortCode: 'A5', name: '城市商业', family: 'A', sort: 75,
    shortDefinition: '从理解社区与商业运作，走向社会创新与政策倡导。',
    officialDefinition: '核心议题对应 X2、X6。',
  },
  {
    code: 'B10-D1-A6', shortCode: 'A6', name: '人文艺术', family: 'A', sort: 76,
    shortDefinition: '从多元艺术表达与文化体验，走向原创艺术与伦理思辨。',
    officialDefinition: '核心议题对应 X5、X7、X8。',
  },
  {
    code: 'B10-D4-TR1', shortCode: 'TRACK1', name: '智能系统与算法', family: 'TRACK', sort: 81,
    shortDefinition: '以编程、算法和 AI 为核心，创造能处理信息或解决问题的智能系统。',
    officialDefinition: '倾向标注，不可独立作为学生最终结论。核心门槛：T5 + T3（L3 以上）。',
  },
  {
    code: 'B10-D4-TR2', shortCode: 'TRACK2', name: '工程发明与产品创新', family: 'TRACK', sort: 82,
    shortDefinition: '以工程设计和制造为核心，创造解决真实问题的有形产品或系统。',
    officialDefinition: '倾向标注。核心门槛：T1 设计创作 + T7 项目管理（L3 以上）。',
  },
  {
    code: 'B10-D4-TR3', shortCode: 'TRACK3', name: '科学探究与研究', family: 'TRACK', sort: 83,
    shortDefinition: '以科学方法和实证研究为核心，对自然或社会现象进行系统性探究。',
    officialDefinition: '倾向标注。核心门槛：T3 研究分析（L4 以上）。B1.0 该条目另出现“T1系统思维”原文，与前文 T1=设计创作冲突，已登记待确认，系统不擅自修订。',
  },
  {
    code: 'B10-D4-TR4', shortCode: 'TRACK4', name: '创意表达与公共传播', family: 'TRACK', sort: 84,
    shortDefinition: '以艺术创作和媒体传播为核心，通过有感染力的表达影响公众认知。',
    officialDefinition: '倾向标注。核心门槛：T4 沟通表达（L4 以上）+ T1 设计创作（L3 以上）。',
  },
  {
    code: 'B10-D4-TR5', shortCode: 'TRACK5', name: '综合创新与社会行动', family: 'TRACK', sort: 85,
    shortDefinition: '以跨维度整合和社会影响为核心，推动真实的社会变革。',
    officialDefinition: '倾向标注。门槛：七类技能均达 L3 以上，其中至少两类达 L4 以上。',
  },
  {
    code: 'B10-LOOP1', shortCode: 'LOOP1', name: '范式自治', family: 'LOOP', sort: 91,
    shortDefinition: 'AI 能力边界变化时，重审七大独特能力、C1-C6、XYZ 与评价标准。',
    officialDefinition: '周期 3-5 年。层次最高、周期最长的闭环。',
  },
  {
    code: 'B10-LOOP2', shortCode: 'LOOP2', name: '课程迭代', family: 'LOOP', sort: 92,
    shortDefinition: '收集项目实施数据，分析最优 XY 组合，优化课程设计指南。',
    officialDefinition: '每学期数据分析，每学年更新课程设计指南。',
  },
  {
    code: 'B10-LOOP3', shortCode: 'LOOP3', name: '教师成长', family: 'LOOP', sort: 93,
    shortDefinition: '实施 → 结构化反思 → 同伴学习 → 能力提升 → 更高质量实施。',
    officialDefinition: '每项目后反思，每学期教师能力评估。',
  },
  {
    code: 'B10-LOOP4', shortCode: 'LOOP4', name: '生态扩展', family: 'LOOP', sort: 94,
    shortDefinition: '高质量成果进入案例库，吸引更多教师，产生更丰富课程资源。',
    officialDefinition: '案例库每学期更新。',
  },
  {
    code: 'B10-LOOP5', shortCode: 'LOOP5', name: '个体成长', family: 'LOOP', sort: 95,
    shortDefinition: '项目完成后更新四维标签，形成能力画像，导航下一次项目选择。',
    officialDefinition: '把评价从终结性判断转为形成性导航。第一阶段只展示框架，不建学生实名成长系统。',
  },
]

export const HUMAN_UNIQUES = [
  { n: '①', name: '具身智慧', en: 'Embodied Intelligence', meaning: '通过身体感知、情感体验和直觉判断获取的知识', limit: 'AI 可处理关于身体的数据，但无法真正“感受”' },
  { n: '②', name: '道德勇气', en: 'Moral Courage', meaning: '在真实社会压力下坚守价值判断并付诸行动', limit: 'AI 可分析伦理问题，但无法承担道德责任' },
  { n: '③', name: '深度连接', en: 'Deep Connection', meaning: '建立真实的人际信任、共情理解和情感支持', limit: 'AI 可模拟情感表达，但无法真正建立人与人之间的连接' },
  { n: '④', name: '创造性跃迁', en: 'Creative Leap', meaning: '在没有先例的情况下产生真正原创性想法', limit: 'AI 擅长在已有模式中组合，但无法真正突破边界' },
  { n: '⑤', name: '适应性智慧', en: 'Adaptive Wisdom', meaning: '在高度不确定、快速变化的情境中做出有效判断', limit: 'AI 依赖训练数据，在真正的新情境中表现脆弱' },
  { n: '⑥', name: '意义建构', en: 'Meaning-Making', meaning: '为自己的存在和行动赋予意义、建立内在动机', limit: 'AI 可以描述意义，但无法真正“拥有”意义' },
  { n: '⑦', name: '共同行动力', en: 'Collective Agency', meaning: '在复杂社会系统中组织、动员和协调他人共同行动', limit: 'AI 可辅助协调，但无法真正激发人类的共同意志' },
]

export const AI_BOUNDARIES = [
  { title: '问题定义权归人类', body: 'AI 可以帮助分析问题，但“这个问题值得解决吗”的判断必须由学生做出。驱动性问题的提出，是学习活动的起点，也是人类主体性的核心体现。' },
  { title: '价值判断权归人类', body: 'AI 可以提供选项和分析，但“哪个选项更好”的价值判断必须由学生做出。这一过程正是 C1 的核心培养场景。' },
  { title: '真实关系由人类建立', body: 'AI 可以辅助沟通，但真实的人际连接和信任只能通过人与人的直接互动建立。' },
  { title: '责任归属于人类', body: '无论 AI 在项目中贡献了多少，最终成果责任由学生承担。真正的责任感只能在真实的责任承担中生长。' },
]
