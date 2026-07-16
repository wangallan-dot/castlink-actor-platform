import type { Actor, Recruitment } from './types';

export const actors: Actor[] = [
  {
    id: 'lin-zhou', name: '周林', englishName: 'Lin Zhou', gender: '男', age: 29, playingAge: '25–34岁', height: 182,
    city: '上海', workRegions: ['上海', '杭州', '横店'], acceptsTravel: true, canStayOnSet: true, availability: '8月可进组', lastActive: '10分钟前',
    verified: true, profileScore: 96, tagline: '都市、悬疑、现实主义题材演员',
    bio: '毕业于上海戏剧学院表演系，具有电影、剧集和商业广告拍摄经验。擅长克制型表演与复杂人物塑造。',
    tags: ['都市精英', '悬疑', '警察', '反派'], skills: ['驾驶', '游泳', '拳击', '即兴表演'], languages: ['普通话', '上海话', '英语'],
    credits: [
      { title: '夜航', role: '陈澈 / 男二号', year: 2026, type: '网络剧' },
      { title: '无人来信', role: '方鸣 / 主演', year: 2025, type: '短片' },
      { title: '边界之外', role: '调查员', year: 2024, type: '品牌电影' },
    ],
    accent: '沪', gradient: 'linear-gradient(150deg,#0f172a 0%,#334155 46%,#cbd5e1 100%)', initials: '周林', featured: true,
  },
  {
    id: 'yu-qing', name: '余晴', englishName: 'Qing Yu', gender: '女', age: 26, playingAge: '20–29岁', height: 168,
    city: '北京', workRegions: ['北京', '上海', '杭州'], acceptsTravel: true, canStayOnSet: false, availability: '档期开放', lastActive: '刚刚',
    verified: true, profileScore: 92, tagline: '自然、灵动，擅长生活流表演',
    bio: '独立演员，拥有舞台剧与影视拍摄经验。镜头表现自然，适合都市情感、青春与轻喜剧题材。',
    tags: ['邻家感', '都市白领', '学生感', '轻喜剧'], skills: ['现代舞', '钢琴', '主持', '配音'], languages: ['普通话', '四川话', '英语'],
    credits: [
      { title: '第七码头', role: '林鹿 / 女一号', year: 2026, type: '短剧' },
      { title: '风从南方来', role: '小夏', year: 2025, type: '电影' },
      { title: '明天见', role: '品牌主角', year: 2024, type: '广告' },
    ],
    accent: '京', gradient: 'linear-gradient(150deg,#3f1d2e 0%,#9f5b72 48%,#f4d7df 100%)', initials: '余晴', featured: true,
  },
  {
    id: 'chen-mu', name: '陈牧', englishName: 'Mu Chen', gender: '男', age: 36, playingAge: '32–44岁', height: 179,
    city: '横店', workRegions: ['横店', '杭州', '上海'], acceptsTravel: true, canStayOnSet: true, availability: '7月底可进组', lastActive: '1小时前',
    verified: true, profileScore: 89, tagline: '古装、年代、动作题材职业演员',
    bio: '十年影视表演经验，参与多部古装及年代项目。具备动作基础，可完成基础武打与骑马表演。',
    tags: ['古装将领', '硬汉', '父亲', '年代感'], skills: ['武术', '骑马', '威亚', '驾驶'], languages: ['普通话', '河南话'],
    credits: [
      { title: '长河落日', role: '赵百川', year: 2026, type: '电视剧' },
      { title: '孤城十三日', role: '副官', year: 2025, type: '电影' },
      { title: '山海令', role: '将军', year: 2024, type: '短剧' },
    ],
    accent: '横', gradient: 'linear-gradient(150deg,#25180f 0%,#79543b 48%,#d8c2a8 100%)', initials: '陈牧', featured: true,
  },
  {
    id: 'su-wen', name: '苏雯', englishName: 'Wen Su', gender: '女', age: 41, playingAge: '38–50岁', height: 166,
    city: '杭州', workRegions: ['杭州', '上海', '横店'], acceptsTravel: true, canStayOnSet: false, availability: '需提前协调', lastActive: '今天',
    verified: true, profileScore: 94, tagline: '成熟、知性，擅长高密度台词',
    bio: '国家二级演员，长期从事话剧与影视表演。擅长知识分子、母亲、企业管理者等角色。',
    tags: ['知性母亲', '企业高管', '医生', '教师'], skills: ['台词', '朗诵', '越剧', '主持'], languages: ['普通话', '杭州话'],
    credits: [
      { title: '回声之后', role: '梁清 / 女二号', year: 2026, type: '电视剧' },
      { title: '春日病房', role: '主任医师', year: 2025, type: '电影' },
      { title: '选择', role: '母亲', year: 2024, type: '公益广告' },
    ],
    accent: '杭', gradient: 'linear-gradient(150deg,#172321 0%,#54706b 48%,#cadbd7 100%)', initials: '苏雯', featured: true,
  },
  {
    id: 'he-xiao', name: '何骁', englishName: 'Xiao He', gender: '男', age: 23, playingAge: '18–26岁', height: 185,
    city: '成都', workRegions: ['成都', '重庆', '深圳'], acceptsTravel: true, canStayOnSet: true, availability: '档期开放', lastActive: '8分钟前',
    verified: false, profileScore: 78, tagline: '阳光、运动型青年演员',
    bio: '表演专业应届毕业生，具有校园短片与品牌内容拍摄经验，运动能力突出。',
    tags: ['学生感', '运动型', '阳光', '青春'], skills: ['篮球', '滑板', '游泳', '吉他'], languages: ['普通话', '四川话'],
    credits: [
      { title: '夏天没有终点', role: '阿骁', year: 2026, type: '短片' },
      { title: '热浪计划', role: '学生', year: 2025, type: '广告' },
    ],
    accent: '蓉', gradient: 'linear-gradient(150deg,#10233d 0%,#35689f 48%,#c7def1 100%)', initials: '何骁',
  },
  {
    id: 'luo-ya', name: '罗雅', englishName: 'Ya Luo', gender: '女', age: 32, playingAge: '28–38岁', height: 170,
    city: '深圳', workRegions: ['深圳', '广州', '上海'], acceptsTravel: true, canStayOnSet: false, availability: '8月中旬可拍', lastActive: '30分钟前',
    verified: true, profileScore: 87, tagline: '商务、都市、轻熟龄形象',
    bio: '广告与影视演员，镜头感稳定，具备商务片、访谈式表演和情绪表演经验。',
    tags: ['商务精英', '都市女性', '律师', '创业者'], skills: ['瑜伽', '网球', '英语', '主持'], languages: ['普通话', '粤语', '英语'],
    credits: [
      { title: '向上生长', role: '创始人', year: 2026, type: '品牌电影' },
      { title: '第二种答案', role: '程律', year: 2025, type: '短剧' },
    ],
    accent: '深', gradient: 'linear-gradient(150deg,#241333 0%,#76519a 48%,#e0d0ef 100%)', initials: '罗雅',
  },
  {
    id: 'gao-yuan', name: '高远', englishName: 'Yuan Gao', gender: '男', age: 52, playingAge: '48–62岁', height: 176,
    city: '北京', workRegions: ['北京', '青岛', '上海'], acceptsTravel: true, canStayOnSet: true, availability: '需项目邀约', lastActive: '昨天',
    verified: true, profileScore: 91, tagline: '权威、沉稳，适合现实主义题材',
    bio: '资深影视演员，具有丰富的年代剧与现实主义题材经验，擅长领导、父亲和复杂反派角色。',
    tags: ['领导', '父亲', '反派', '教授'], skills: ['书法', '京剧', '驾驶', '台球'], languages: ['普通话', '山东话'],
    credits: [
      { title: '沉默的证词', role: '顾问', year: 2026, type: '电视剧' },
      { title: '海岸线', role: '老周', year: 2025, type: '电影' },
    ],
    accent: '京', gradient: 'linear-gradient(150deg,#171717 0%,#525252 50%,#d4d4d4 100%)', initials: '高远',
  },
  {
    id: 'tang-ke', name: '唐可', englishName: 'Ke Tang', gender: '女', age: 19, playingAge: '16–22岁', height: 164,
    city: '武汉', workRegions: ['武汉', '长沙', '杭州'], acceptsTravel: true, canStayOnSet: false, availability: '暑期可拍', lastActive: '2小时前',
    verified: false, profileScore: 73, tagline: '清新自然的新生代演员',
    bio: '影视表演专业在读，参与校园短片、舞台剧与新媒体内容拍摄。',
    tags: ['高中生', '大学生', '清新', '文艺'], skills: ['小提琴', '民族舞', '羽毛球'], languages: ['普通话', '武汉话'],
    credits: [{ title: '十九岁的夏天', role: '唐糖', year: 2026, type: '短片' }],
    accent: '汉', gradient: 'linear-gradient(150deg,#18302a 0%,#4f8a78 48%,#d0e8e0 100%)', initials: '唐可',
  },
];

export const recruitments: Recruitment[] = [
  {
    id: 'silent-witness-gu-chen', title: '顾沉｜刑警队长', project: '《沉默证词》', projectType: '悬疑网剧', city: '上海', district: '松江影视基地',
    shootDate: '2026.08.12–09.05', shootStart: '2026-08-12', shootEnd: '2026-09-05', duration: '18个拍摄日', pay: '¥3,000–5,000/天',
    ageRange: '32–40岁', gender: '男', tags: ['刑警', '成熟', '克制', '悬疑'], summary: '外冷内热的刑警队长，长期追查一宗未结案件。',
    description: '顾沉是全剧核心人物之一。表面沉稳、理性，实际长期承受案件带来的心理压力。人物需要同时具备职业权威感与细腻的内在情绪。',
    requirements: ['有悬疑或刑侦题材经验优先', '普通话标准', '可接受夜戏', '需提交指定台词试镜'], company: '深蓝影业', verified: true,
    postedAt: '2小时前', publishedAt: '2026-07-16T18:00:00+08:00', applicationDeadline: '2026-07-17T18:00:00+08:00',
    acceptsNonLocalActors: true, providesAccommodation: true, remainingSlots: 1, status: 'closing',
  },
  {
    id: 'summer-letter-xia-qing', title: '夏晴｜品牌策划', project: '《晚风来信》', projectType: '都市短剧', city: '杭州', district: '滨江区',
    shootDate: '2026.08.03–08.10', shootStart: '2026-08-03', shootEnd: '2026-08-10', duration: '6个拍摄日', pay: '¥1,500–2,500/天',
    ageRange: '25–32岁', gender: '女', tags: ['都市', '白领', '自然', '情感'], summary: '在事业和情感之间重新寻找生活节奏的都市女性。',
    description: '角色需要生活化的表演方式，避免偶像剧式夸张表达。人物前期防备感较强，后期逐渐展现柔软和幽默。',
    requirements: ['有都市情感题材经验', '镜头感自然', '杭州或周边演员优先'], company: '拾光内容工作室', verified: true,
    postedAt: '今天', publishedAt: '2026-07-16T09:20:00+08:00', applicationDeadline: '2026-07-19T20:00:00+08:00',
    acceptsNonLocalActors: true, providesAccommodation: false, remainingSlots: 1, status: 'closing',
  },
  {
    id: 'brand-film-founder', title: '创业公司创始人', project: '科技品牌年度影片', projectType: '品牌电影', city: '深圳', district: '南山区',
    shootDate: '2026.07.28–07.30', shootStart: '2026-07-28', shootEnd: '2026-07-30', duration: '2个拍摄日', pay: '¥8,000–15,000/项目',
    ageRange: '30–42岁', gender: '不限', tags: ['商务', '专业', '科技', '访谈感'], summary: '需要可信、克制、有思考感的企业创始人形象。',
    description: '非传统硬广表演，主要通过工作场景和短台词建立人物。需要自然表达复杂行业内容。',
    requirements: ['台词稳定', '商务形象', '英语口语流利加分', '需提供正装照片'], company: '万象创意', verified: true,
    postedAt: '1天前', publishedAt: '2026-07-15T11:00:00+08:00', applicationDeadline: '2026-07-16T23:59:00+08:00',
    acceptsNonLocalActors: false, providesAccommodation: false, remainingSlots: 1, status: 'closing',
  },
  {
    id: 'ancient-drama-general', title: '青年将领｜重要配角', project: '《山河令旗》', projectType: '古装短剧', city: '横店', district: '明清宫苑',
    shootDate: '2026.08.20–09.15', shootStart: '2026-08-20', shootEnd: '2026-09-15', duration: '12个拍摄日', pay: '面议',
    ageRange: '25–35岁', gender: '男', tags: ['古装', '将领', '动作', '硬朗'], summary: '忠诚果断的青年将领，有多场动作与情绪重场戏。',
    description: '人物并非脸谱化武将，需要体现对主公的忠诚与对战争的复杂感受。',
    requirements: ['有古装经验', '身高178cm以上', '有武术或威亚经验', '可驻组'], company: '横店星河影视', verified: true,
    postedAt: '2天前', publishedAt: '2026-07-14T15:30:00+08:00', applicationDeadline: '2026-07-25T18:00:00+08:00',
    acceptsNonLocalActors: true, providesAccommodation: true, remainingSlots: 2, status: 'open',
  },
  {
    id: 'campus-film-student', title: '林禾｜大学生', project: '《雨季之前》', projectType: '青年短片', city: '成都', district: '锦江区',
    shootDate: '2026.08.01–08.05', shootStart: '2026-08-01', shootEnd: '2026-08-05', duration: '4个拍摄日', pay: '¥800–1,200/天',
    ageRange: '18–24岁', gender: '女', tags: ['学生', '青春', '自然', '文艺'], summary: '敏感、安静但有明确行动力的大学生。',
    description: '独立短片女主角，台词不多，表演重点在人物观察、停顿和非语言表达。',
    requirements: ['表演自然', '能适应少量夜戏', '需提交一段无台词表演'], company: '浮光青年影像', verified: false,
    postedAt: '3天前', publishedAt: '2026-07-13T12:00:00+08:00', applicationDeadline: '2026-07-20T22:00:00+08:00',
    acceptsNonLocalActors: true, providesAccommodation: true, remainingSlots: 1, status: 'open',
  },
  {
    id: 'family-film-father', title: '父亲｜家庭片主演', project: '《回家吃饭》', projectType: '院线电影', city: '青岛', district: '市南区',
    shootDate: '2026.10–11月', shootStart: '2026-10-08', shootEnd: '2026-11-12', duration: '约28个拍摄日', pay: '合同制',
    ageRange: '45–58岁', gender: '男', tags: ['父亲', '现实主义', '生活流', '北方'], summary: '沉默寡言的海边小城父亲，与多年未归的女儿重新建立关系。',
    description: '人物情绪表达内敛，重视生活质感。演员需要有较强的细节表演能力和长期人物塑造能力。',
    requirements: ['有电影或现实主义题材经验', '北方口音自然', '可接受海边外景拍摄'], company: '潮汐电影', verified: true,
    postedAt: '4天前', publishedAt: '2026-07-12T10:00:00+08:00', applicationDeadline: '2026-08-15T18:00:00+08:00',
    acceptsNonLocalActors: true, providesAccommodation: true, remainingSlots: 1, status: 'open',
  },
];

export const roles = recruitments;

export const filterOptions = {
  cities: ['全部城市', '北京', '上海', '杭州', '横店', '广州', '深圳', '成都', '武汉', '青岛'],
  genders: ['不限', '男', '女'],
  ageRanges: ['不限', '18–24岁', '25–34岁', '35–44岁', '45岁以上'],
  roleTags: ['都市精英', '学生感', '古装将领', '商务精英', '父亲', '母亲', '反派', '轻喜剧'],
};

export const discoveryRegions = ['全国', '北京', '上海', '横店', '杭州', '广州', '深圳', '成都', '更多'];
export const extraRegions = ['武汉', '青岛', '重庆', '西安', '南京', '厦门'];
