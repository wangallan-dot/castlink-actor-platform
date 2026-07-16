import { ArrowRight, BadgeCheck, BriefcaseBusiness, Search, Sparkles, UserRoundSearch, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActorCard } from '../components/ActorCard';
import { RoleCard } from '../components/RoleCard';
import { actors, roles } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function HomePage() {
  const [favorites, setFavorites] = useLocalStorage<string[]>('castlink:favorites', []);
  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-grid-lines" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={16} />影视人才连接与选角协作平台</span>
            <h1>让每一个角色，<br /><em>找到最合适的演员。</em></h1>
            <p>建立标准化数字演员卡，连接真实影视项目。从演员搜索、沟通、试镜到定角，在一个工作流内完成。</p>
            <div className="hero-actions">
              <Link to="/actors" className="button button-primary"><Search size={18} />搜索演员</Link>
              <Link to="/profile/edit" className="button button-secondary"><UserRoundSearch size={18} />创建演员卡</Link>
            </div>
            <div className="hero-trust-row">
              <span><BadgeCheck size={16} />项目身份认证</span>
              <span><Video size={16} />在线试镜协作</span>
              <span><BriefcaseBusiness size={16} />专业选角工作台</span>
            </div>
          </div>

          <div className="hero-stage" aria-label="演员匹配工作流演示">
            <div className="hero-stage-header">
              <span>角色智能匹配</span>
              <small>《沉默证词》· 刑警队长</small>
            </div>
            <div className="hero-candidate-stack">
              {actors.slice(0, 3).map((actor, index) => (
                <Link key={actor.id} to={`/actors/${actor.id}`} className="hero-candidate" style={{ transform: `translateY(${index * 76}px) scale(${1 - index * 0.04})`, zIndex: 3 - index }}>
                  <div className="hero-candidate-avatar" style={{ background: actor.gradient }}>{actor.name.slice(-1)}</div>
                  <div>
                    <strong>{actor.name}</strong>
                    <span>{actor.playingAge} · {actor.city}</span>
                  </div>
                  <div className="match-score">{94 - index * 6}%<small>匹配</small></div>
                </Link>
              ))}
            </div>
            <div className="hero-stage-footer">
              <span>已筛选 1,284 位演员</span>
              <Link to="/actors">查看推荐 <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div><strong>标准演员卡</strong><span>照片、视频、技能、履历统一管理</span></div>
          <div><strong>角色精准筛选</strong><span>按年龄感、气质、技能和档期搜索</span></div>
          <div><strong>在线试镜</strong><span>邀请、提交、评分和候选人比较</span></div>
          <div><strong>隐私控制</strong><span>演员自主决定资料可见范围</span></div>
        </div>
      </section>

      <section className="section section-surface">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">精选演员</span><h2>资料完整、近期可约的演员</h2></div>
            <Link to="/actors" className="text-link">查看全部演员 <ArrowRight size={16} /></Link>
          </div>
          <div className="actor-grid">
            {actors.filter((actor) => actor.featured).map((actor) => (
              <ActorCard key={actor.id} actor={actor} favorite={favorites.includes(actor.id)} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">正在选角</span><h2>真实项目，明确角色</h2></div>
            <Link to="/roles" className="text-link">查看全部角色 <ArrowRight size={16} /></Link>
          </div>
          <div className="role-grid">
            {roles.slice(0, 3).map((role) => <RoleCard key={role.id} role={role} />)}
          </div>
        </div>
      </section>

      <section className="section workflow-section">
        <div className="container">
          <div className="section-heading centered-heading">
            <div><span className="eyebrow">完整闭环</span><h2>不止是一张演员名片</h2><p>从职业展示，到被搜索、被邀请、完成试镜，再进入真实项目生产。</p></div>
          </div>
          <div className="workflow-grid">
            {[
              ['01', '创建演员卡', '用统一标准整理形象、履历、技能与档期。'],
              ['02', '被精准搜索', '项目方按角色条件找到真正适合的人。'],
              ['03', '提交在线试镜', '接收角色资料，完成Self-tape并在线提交。'],
              ['04', '定角进入项目', '连接合同、通告、排期与后续拍摄协作。'],
            ].map(([number, title, copy]) => (
              <article className="workflow-card" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-panel">
          <div><span className="eyebrow light-eyebrow">开始建立职业身份</span><h2>你的下一次机会，可能从一张完整的演员卡开始。</h2></div>
          <div className="cta-actions">
            <Link to="/profile/edit" className="button button-light">免费创建演员卡</Link>
            <Link to="/dashboard/producer" className="button button-dark-outline">进入选角工作台</Link>
          </div>
        </div>
      </section>
    </>
  );
}
