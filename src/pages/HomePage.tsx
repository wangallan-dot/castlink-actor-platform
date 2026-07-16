import { ArrowRight, MessageCircleMore, Search, Sparkles, Video } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ActorCard } from '../components/ActorCard';
import { RoleCard } from '../components/RoleCard';
import { useIdentity } from '../context/useIdentity';
import { actors, recruitments } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { actorMatchesRegion, getDeadlineInfo, recruitmentMatchesRegion } from '../utils/deadline';
import { readRegion } from '../utils/region';

const activityRank: Record<string, number> = {
  '刚刚': 0,
  '8分钟前': 1,
  '10分钟前': 2,
  '30分钟前': 3,
  '1小时前': 4,
  '2小时前': 5,
  '今天': 6,
  '昨天': 7,
};

export function HomePage() {
  const location = useLocation();
  const { identity } = useIdentity();
  const region = readRegion(location.search);
  const params = new URLSearchParams(location.search);
  const feed = params.get('feed') || 'recommended';
  const topic = params.get('topic') || '全部';
  const [favorites, setFavorites] = useLocalStorage<string[]>('castlink:favorites', []);
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const recruitmentFeed = recruitments
    .filter((item) => {
      const deadline = getDeadlineInfo(item.applicationDeadline);
      if (deadline.isClosed) return false;
      if (feed === 'local' && region !== '全国' && !recruitmentMatchesRegion(item, region)) return false;
      if (topic === '急招' && deadline.remainingHours > 72) return false;
      if (topic === '今日截止' && deadline.remainingHours > 24) return false;
      if (topic === '3天内' && deadline.remainingHours > 72) return false;
      if (topic === '短剧' && !item.projectType.includes('短剧')) return false;
      if (topic === '电影' && !item.projectType.includes('电影')) return false;
      if (topic === '广告' && !['品牌电影', '广告'].some((type) => item.projectType.includes(type))) return false;
      if (topic === '综艺' && !item.projectType.includes('综艺')) return false;
      return true;
    })
    .sort((a, b) => {
      if (feed === 'latest') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      const aDeadline = getDeadlineInfo(a.applicationDeadline);
      const bDeadline = getDeadlineInfo(b.applicationDeadline);
      return aDeadline.remainingHours - bDeadline.remainingHours;
    });

  const actorFeed = actors
    .filter((actor) => {
      if (feed === 'local' && region !== '全国' && !actorMatchesRegion(actor.workRegions, actor.city, region)) return false;
      if (topic === '本地' && region !== '全国' && actor.city !== region) return false;
      if (topic === '档期开放' && !(actor.availability.includes('开放') || actor.availability.includes('可'))) return false;
      if (topic === '最近活跃' && (activityRank[actor.lastActive] ?? 99) > 5) return false;
      if (topic === '已认证' && !actor.verified) return false;
      if (topic === '动作' && ![...actor.skills, ...actor.tags].some((item) => ['武术', '拳击', '威亚', '动作', '骑马'].some((key) => item.includes(key)))) return false;
      if (topic === '方言' && actor.languages.every((language) => language === '普通话' || language === '英语')) return false;
      return true;
    })
    .sort((a, b) => {
      if (feed === 'latest' || topic === '最近活跃') return (activityRank[a.lastActive] ?? 99) - (activityRank[b.lastActive] ?? 99);
      if (feed === 'local' && region !== '全国' && a.city !== b.city) return a.city === region ? -1 : 1;
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      return b.profileScore - a.profileScore;
    });

  const feedLabel = feed === 'latest' ? '最新发布' : feed === 'local' ? `${region === '全国' ? '地区' : region}内容` : '为你推荐';
  const resultCount = identity === 'actor' ? recruitmentFeed.length : actorFeed.length;

  return (
    <section className="discovery-home-page continuous-feed-page">
      <div className="container home-task-strip compact-task-strip">
        {identity === 'actor' ? (
          <>
            <Link to="/messages"><span><MessageCircleMore size={18} /></span><div><strong>2条消息待回复</strong><small>剧组正在等待确认</small></div><ArrowRight size={16} /></Link>
            <Link to="/applications"><span><Video size={18} /></span><div><strong>1个试镜明天截止</strong><small>及时提交最新版本</small></div><ArrowRight size={16} /></Link>
          </>
        ) : (
          <>
            <Link to="/recruitment/manage"><span><Sparkles size={18} /></span><div><strong>6份新演员资料</strong><small>3条招募收到申请</small></div><ArrowRight size={16} /></Link>
            <Link to="/messages"><span><Video size={18} /></span><div><strong>2段试镜待查看</strong><small>演员已上传新版本</small></div><ArrowRight size={16} /></Link>
          </>
        )}
      </div>

      <div className="container continuous-feed-heading">
        <div><span>{feedLabel}</span><h1>{identity === 'actor' ? '剧组招募' : '演员'}</h1></div>
        <small>{topic} · {resultCount}条</small>
      </div>

      {resultCount > 0 ? (
        identity === 'actor' ? (
          <div className="container recruitment-feed continuous-recruitment-feed">
            {recruitmentFeed.map((item) => <RoleCard key={item.id} role={item} />)}
          </div>
        ) : (
          <div className="container actor-grid discovery-actor-feed continuous-actor-feed">
            {actorFeed.map((actor) => <ActorCard key={actor.id} actor={actor} favorite={favorites.includes(actor.id)} onToggleFavorite={toggleFavorite} />)}
          </div>
        )
      ) : (
        <div className="container empty-state feed-empty-state">
          <Search size={34} /><h3>当前分类还没有匹配内容</h3><p>切换顶部分类或地区继续浏览。</p>
          <Link to={identity === 'actor' ? '/recruitments' : '/actors'} className="button button-primary">进入完整搜索</Link>
        </div>
      )}

      <div className="container feed-end-marker"><span>已显示当前全部内容</span></div>
    </section>
  );
}
