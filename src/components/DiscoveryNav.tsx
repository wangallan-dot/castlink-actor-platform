import { ChevronDown, MapPin, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIdentity } from '../context/useIdentity';
import { discoveryRegions, extraRegions } from '../data';
import { REGION_STORAGE_KEY } from '../utils/region';

const actorTopics = ['全部', '急招', '今日截止', '3天内', '短剧', '电影', '广告', '综艺'];
const crewTopics = ['全部', '本地', '档期开放', '最近活跃', '已认证', '动作', '方言'];

export function DiscoveryNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { identity } = useIdentity();
  const [regionOpen, setRegionOpen] = useState(false);
  const params = new URLSearchParams(location.search);
  const storedRegion = window.localStorage.getItem(REGION_STORAGE_KEY) || '全国';
  const region = params.get('region') || storedRegion;
  const feed = params.get('feed') || 'recommended';
  const topics = identity === 'actor' ? actorTopics : crewTopics;
  const topicParam = params.get('topic') || '全部';
  const topic = topics.includes(topicParam) ? topicParam : '全部';

  const updateQuery = (entries: Record<string, string | null>) => {
    const next = new URLSearchParams(location.search);
    Object.entries(entries).forEach(([key, value]) => {
      if (!value) next.delete(key);
      else next.set(key, value);
    });
    navigate({ pathname: '/', search: next.toString() ? `?${next.toString()}` : '' });
  };

  const chooseFeed = (nextFeed: string) => {
    updateQuery({ feed: nextFeed === 'recommended' ? null : nextFeed });
  };

  const chooseTopic = (nextTopic: string) => {
    updateQuery({ topic: nextTopic === '全部' ? null : nextTopic });
  };

  const chooseRegion = (nextRegion: string) => {
    window.localStorage.setItem(REGION_STORAGE_KEY, nextRegion);
    updateQuery({ region: nextRegion === '全国' ? null : nextRegion, feed: nextRegion === '全国' ? 'recommended' : 'local' });
    setRegionOpen(false);
  };

  const allRegions = [...discoveryRegions.filter((item) => item !== '更多'), ...extraRegions];

  return (
    <div className="discovery-nav-shell home-feed-navigation">
      <nav className="feed-primary-nav" aria-label="首页信息流">
        <button type="button" className={feed === 'recommended' ? 'is-active' : ''} onClick={() => chooseFeed('recommended')}>推荐</button>
        <button type="button" className={feed === 'latest' ? 'is-active' : ''} onClick={() => chooseFeed('latest')}>最新</button>
        <button type="button" className={feed === 'local' ? 'is-active region-feed-button' : 'region-feed-button'} onClick={() => setRegionOpen(true)}>
          <MapPin size={14} />{region === '全国' ? '地区' : region}<ChevronDown size={13} />
        </button>
      </nav>

      <nav className="feed-topic-nav" aria-label={identity === 'actor' ? '招募快捷分类' : '演员快捷分类'}>
        {topics.map((item) => (
          <button type="button" key={item} className={topic === item ? 'is-active' : ''} onClick={() => chooseTopic(item)}>{item}</button>
        ))}
      </nav>

      {regionOpen && (
        <div className="region-sheet-backdrop" onClick={() => setRegionOpen(false)}>
          <section className="region-sheet" onClick={(event) => event.stopPropagation()} aria-label="选择地区">
            <header><div><strong>选择地区</strong><span>地区会用于首页、招募和演员搜索</span></div><button type="button" onClick={() => setRegionOpen(false)} aria-label="关闭地区选择"><X size={20} /></button></header>
            <div className="region-sheet-grid">
              {allRegions.map((item) => (
                <button type="button" key={item} className={region === item ? 'is-active' : ''} onClick={() => chooseRegion(item)}>{item}</button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
