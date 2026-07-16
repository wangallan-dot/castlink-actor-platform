import { Check, ChevronRight, Eye, ImagePlus, Save, Upload, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ProfileDraft = {
  name: string;
  englishName: string;
  gender: string;
  birthYear: string;
  playingAge: string;
  height: string;
  city: string;
  tagline: string;
  bio: string;
  skills: string;
  availability: string;
};

const defaultDraft: ProfileDraft = {
  name: '周林', englishName: 'Lin Zhou', gender: '男', birthYear: '1997', playingAge: '25–34岁', height: '182', city: '上海', tagline: '都市、悬疑、现实主义题材演员', bio: '毕业于上海戏剧学院表演系，具有电影、剧集和商业广告拍摄经验。擅长克制型表演与复杂人物塑造。', skills: '驾驶、游泳、拳击、即兴表演', availability: '2026年8月可进组',
};

export function ProfileEditorPage() {
  const [stored, setStored] = useLocalStorage<ProfileDraft>('castlink:profile-draft', defaultDraft);
  const [draft, setDraft] = useState(stored);
  const [saved, setSaved] = useState(false);
  const update = (key: keyof ProfileDraft, value: string) => setDraft((current) => ({ ...current, [key]: value }));
  const save = () => { setStored(draft); setSaved(true); window.setTimeout(() => setSaved(false), 2400); };

  return (
    <section className="editor-page">
      <div className="editor-header"><div className="container editor-header-inner"><div><span className="eyebrow">数字演员卡</span><h1>编辑演员资料</h1></div><div><button type="button" className="button button-secondary"><Eye size={17} />预览演员卡</button><button type="button" className="button button-primary" onClick={save}><Save size={17} />保存资料</button></div></div></div>
      <div className="container editor-layout">
        <aside className="editor-nav">
          {['基础资料','形象照片','视频作品','演艺经历','技能与语言','档期与隐私'].map((item,index) => <button type="button" className={index === 0 ? 'is-active' : ''} key={item}><span>{index < 2 ? <Check size={14} /> : index + 1}</span>{item}<ChevronRight size={15} /></button>)}
          <div className="editor-progress"><div><span>演员卡完整度</span><strong>76%</strong></div><div className="score-track"><i style={{ width: '76%' }} /></div><p>补充视频和作品履历后，更容易被项目方发现。</p></div>
        </aside>
        <div className="editor-content">
          <section className="editor-card">
            <div className="editor-card-heading"><div><h2>基础身份</h2><p>这些信息将显示在公开演员卡顶部。</p></div><UserRound size={22} /></div>
            <div className="form-grid">
              <label><span>中文姓名 *</span><input value={draft.name} onChange={(e) => update('name', e.target.value)} /></label>
              <label><span>英文名 / 拼音</span><input value={draft.englishName} onChange={(e) => update('englishName', e.target.value)} /></label>
              <label><span>性别 *</span><select value={draft.gender} onChange={(e) => update('gender', e.target.value)}><option>男</option><option>女</option><option>不公开</option></select></label>
              <label><span>出生年份</span><input value={draft.birthYear} onChange={(e) => update('birthYear', e.target.value)} /></label>
              <label><span>可扮演年龄 *</span><input value={draft.playingAge} onChange={(e) => update('playingAge', e.target.value)} /></label>
              <label><span>身高（cm）*</span><input value={draft.height} onChange={(e) => update('height', e.target.value)} /></label>
              <label><span>常驻城市 *</span><input value={draft.city} onChange={(e) => update('city', e.target.value)} /></label>
              <label><span>近期档期</span><input value={draft.availability} onChange={(e) => update('availability', e.target.value)} /></label>
            </div>
          </section>
          <section className="editor-card">
            <div className="editor-card-heading"><div><h2>职业介绍</h2><p>用简洁、可信的方式说明你的类型与专业经历。</p></div></div>
            <label className="full-field"><span>一句话定位 *</span><input value={draft.tagline} onChange={(e) => update('tagline', e.target.value)} maxLength={40} /><small>{draft.tagline.length}/40</small></label>
            <label className="full-field"><span>演员简介 *</span><textarea value={draft.bio} onChange={(e) => update('bio', e.target.value)} rows={5} maxLength={300} /><small>{draft.bio.length}/300</small></label>
            <label className="full-field"><span>专业技能</span><input value={draft.skills} onChange={(e) => update('skills', e.target.value)} /><small>使用中文顿号分隔，例如：骑马、武术、英语</small></label>
          </section>
          <section className="editor-card">
            <div className="editor-card-heading"><div><h2>主形象照片</h2><p>建议使用近期、清晰、无过度修饰的半身照。</p></div></div>
            <div className="photo-uploader"><div><ImagePlus size={34} /><strong>上传演员主照片</strong><span>JPG或PNG，建议比例3:4，最大10MB</span><button type="button" className="button button-secondary"><Upload size={16} />选择照片</button></div><div className="photo-guide"><strong>照片标准</strong><span><Check size={15} />正面清晰，五官无遮挡</span><span><Check size={15} />自然光线与真实肤色</span><span><Check size={15} />避免滤镜、水印和复杂背景</span></div></div>
          </section>
          <div className="editor-save-row"><span>{saved ? '资料已保存到本地浏览器' : '更改尚未保存'}</span><button type="button" className="button button-primary" onClick={save}><Save size={17} />保存并继续</button></div>
        </div>
      </div>
      {saved && <div className="toast"><Check size={17} />演员资料已保存</div>}
    </section>
  );
}
