import { ArrowLeft, BadgeCheck, Bookmark, CalendarCheck, Check, Film, Languages, MapPin, MessageCircle, Play, Route, Ruler, Share2, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Portrait } from '../components/Portrait';
import { actors } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { NotFoundPage } from './NotFoundPage';

export function ActorDetailPage() {
  const { actorId } = useParams();
  const actor = actors.find((item) => item.id === actorId);
  const [favorites, setFavorites] = useLocalStorage<string[]>('castlink:favorites', []);
  if (!actor) return <NotFoundPage />;
  const favorite = favorites.includes(actor.id);
  const toggleFavorite = () => setFavorites((current) => favorite ? current.filter((id) => id !== actor.id) : [...current, actor.id]);

  return (
    <section className="profile-page">
      <div className="container profile-back-row"><Link to="/actors"><ArrowLeft size={16} />返回演员库</Link></div>
      <div className="container profile-hero-grid">
        <Portrait name={actor.name} initials={actor.initials} gradient={actor.gradient} accent={actor.accent} className="profile-portrait" />
        <div className="profile-main">
          <div className="profile-kicker"><span>{actor.city}演员</span><span className="availability-pill"><span />{actor.availability}</span></div>
          <div className="profile-name-row">
            <div><h1>{actor.name}</h1><p>{actor.englishName}</p></div>
            {actor.verified && <span className="verified-badge"><BadgeCheck size={18} />实名认证</span>}
          </div>
          <p className="profile-tagline">{actor.tagline}</p>
          <div className="profile-facts">
            <span><Ruler size={17} />{actor.height} cm</span>
            <span><CalendarCheck size={17} />可扮演 {actor.playingAge}</span>
            <span><MapPin size={17} />常驻 {actor.city}</span>
            <span><Languages size={17} />{actor.languages.join(' / ')}</span><span><Route size={17} />可工作：{actor.workRegions.join(' / ')}</span>
          </div>
          <div className="tag-row profile-tags">{actor.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          <div className="profile-actions">
            <button type="button" className="button button-primary"><MessageCircle size={18} />选择招募并邀请</button>
            <button type="button" className="button button-secondary" onClick={toggleFavorite}><Bookmark size={18} fill={favorite ? 'currentColor' : 'none'} />{favorite ? '已收藏' : '收藏演员'}</button>
            <button type="button" className="icon-button profile-share" aria-label="分享演员卡"><Share2 size={18} /></button>
          </div>
          <div className="profile-safety"><Check size={15} />联系方式将在演员接受邀请后开放，保护双方隐私。</div>
        </div>
        <aside className="profile-score-card">
          <span>演员卡完整度</span><strong>{actor.profileScore}%</strong>
          <div className="score-track"><div style={{ width: `${actor.profileScore}%` }} /></div>
          <small>照片、视频和履历信息完整</small>
        </aside>
      </div>

      <div className="container profile-content-grid">
        <div className="profile-content-main">
          <section className="content-card">
            <div className="content-card-heading"><h2>演员简介</h2><span><Sparkles size={15} />职业资料</span></div>
            <p className="profile-bio">{actor.bio}</p>
          </section>
          <section className="content-card">
            <div className="content-card-heading"><h2>表演视频</h2><span>3条视频</span></div>
            <div className="video-grid">
              {['演员Showreel 2026', '悬疑独白片段', '自然光自我介绍'].map((title, index) => (
                <button type="button" className="video-card" key={title} style={{ background: actor.gradient }}>
                  <span className="video-play"><Play size={19} fill="currentColor" /></span>
                  <div><small>0{index + 1}</small><strong>{title}</strong><span>{index === 0 ? '02:16' : index === 1 ? '01:24' : '00:58'}</span></div>
                </button>
              ))}
            </div>
          </section>
          <section className="content-card">
            <div className="content-card-heading"><h2>代表作品</h2><span><Film size={15} />{actor.credits.length}条履历</span></div>
            <div className="credits-list">
              {actor.credits.map((credit) => (
                <div className="credit-row" key={`${credit.title}-${credit.year}`}>
                  <span>{credit.year}</span><div><strong>《{credit.title}》</strong><p>{credit.role}</p></div><em>{credit.type}</em>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="profile-sidebar">
          <section className="content-card compact-card">
            <h3>专业技能</h3>
            <div className="skill-list">{actor.skills.map((skill) => <span key={skill}><Check size={14} />{skill}</span>)}</div>
          </section>
          <section className="content-card compact-card">
            <h3>语言与方言</h3>
            <div className="skill-list">{actor.languages.map((language) => <span key={language}><Check size={14} />{language}</span>)}</div>
          </section>
          <section className="content-card compact-card contact-card">
            <span className="eyebrow">项目方操作</span><h3>认为他适合你的角色？</h3><p>选择一条正在进行的剧组招募，发送包含拍摄地区、日期和报酬的正式邀请。</p><button type="button" className="button button-primary button-full">选择剧组招募</button><small>演员平均回复时间：6小时</small>
          </section>
        </aside>
      </div>
    </section>
  );
}
