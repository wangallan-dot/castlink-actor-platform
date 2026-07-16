import { ArrowRight, CalendarClock, CheckCircle2, ClipboardCheck, MessageCircleMore, Sparkles, UsersRound, Video } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ActorCard } from '../components/ActorCard';
import { readRegion } from '../utils/region';
import { RoleCard } from '../components/RoleCard';
import { useIdentity } from '../context/useIdentity';
import { actors, recruitments } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { actorMatchesRegion, getDeadlineInfo, recruitmentMatchesRegion } from '../utils/deadline';

export function HomePage() {
  const location = useLocation();
  const { identity } = useIdentity();
  const region = readRegion(location.search);
  const [favorites, setFavorites] = useLocalStorage<string[]>('castlink:favorites', []);
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const openRecruitments = recruitments
    .filter((item) => !getDeadlineInfo(item.applicationDeadline).isClosed)
    .sort((a, b) => getDeadlineInfo(a.applicationDeadline).remainingHours - getDeadlineInfo(b.applicationDeadline).remainingHours);
  const localRecruitments = openRecruitments.filter((item) => recruitmentMatchesRegion(item, region));
  const localActors = actors.filter((actor) => actorMatchesRegion(actor.workRegions, actor.city, region));
  const availableActors = actors.filter((actor) => actor.availability.includes('开放') || actor.availability.includes('可'));

  return (
    <section className="discovery-home-page">
      <div className="container discovery-home-heading">
        <div>
          <span className="eyebrow"><Sparkles size={15} />{identity === 'actor' ? '演员首页' : '剧组首页'}</span>
          <h1>{identity === 'actor' ? '今天有哪些合适的剧组招募？' : '今天有哪些合适的演员？'}</h1>
          <p>当前地区：{region}。顶部可随时切换推荐、剧组招募和演员频道。</p>
        </div>
      </div>

      <div className="container home-task-strip">
        {identity === 'actor' ? (
          <>
            <Link to="/messages"><span><MessageCircleMore size={18} /></span><div><strong>2条消息待回复</strong><small>项目方正在等待确认</small></div><ArrowRight size={16} /></Link>
            <Link to="/applications"><span><Video size={18} /></span><div><strong>1个试镜明天截止</strong><small>《沉默证词》补充试镜</small></div><ArrowRight size={16} /></Link>
          </>
        ) : (
          <>
            <Link to="/recruitment/manage"><span><UsersRound size={18} /></span><div><strong>6份新演员资料</strong><small>3个招募正在收到申请</small></div><ArrowRight size={16} /></Link>
            <Link to="/messages"><span><Video size={18} /></span><div><strong>2段试镜待查看</strong><small>演员已上传最新版本</small></div><ArrowRight size={16} /></Link>
          </>
        )}
      </div>

      {identity === 'actor' ? (
        <>
          <FeedHeading eyebrow="时限优先" title="即将截止的剧组招募" link="/recruitments?deadline=3days" />
          <div className="container recruitment-feed">
            {openRecruitments.slice(0, 3).map((item) => <RoleCard key={item.id} role={item} />)}
          </div>

          <FeedHeading eyebrow={region === '全国' ? '全国招募' : `${region}招募`} title={region === '全国' ? '正在招募' : `在${region}拍摄的项目`} link="/recruitments" />
          <div className="container recruitment-feed">
            {(localRecruitments.length ? localRecruitments : openRecruitments).slice(0, 4).map((item) => <RoleCard key={item.id} role={item} />)}
          </div>
        </>
      ) : (
        <>
          <FeedHeading eyebrow={region === '全国' ? '推荐演员' : `${region}演员`} title={region === '全国' ? '近期活跃的演员' : `常驻或可前往${region}的演员`} link="/actors" />
          <div className="container actor-grid discovery-actor-feed">
            {(localActors.length ? localActors : actors).slice(0, 6).map((actor) => (
              <ActorCard key={actor.id} actor={actor} favorite={favorites.includes(actor.id)} onToggleFavorite={toggleFavorite} />
            ))}
          </div>

          <FeedHeading eyebrow="档期开放" title="近期可以进组" link="/actors?mode=available" />
          <div className="container actor-grid discovery-actor-feed">
            {availableActors.slice(0, 4).map((actor) => (
              <ActorCard key={actor.id} actor={actor} favorite={favorites.includes(actor.id)} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        </>
      )}

      <div className="container home-safety-summary">
        <CheckCircle2 size={20} />
        <div>
          <strong>沟通围绕具体招募建立</strong>
          <p>演员提交资料或剧组发出邀请后，双方才能进入项目会话，减少陌生骚扰和无效沟通。</p>
        </div>
        <ClipboardCheck size={22} />
        <CalendarClock size={22} />
      </div>
    </section>
  );
}

function FeedHeading({ eyebrow, title, link }: { eyebrow: string; title: string; link: string }) {
  return (
    <div className="container feed-section-heading">
      <div><span>{eyebrow}</span><h2>{title}</h2></div>
      <Link to={link}>查看全部<ArrowRight size={14} /></Link>
    </div>
  );
}
