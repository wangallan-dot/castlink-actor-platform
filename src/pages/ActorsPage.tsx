import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ActorCard } from '../components/ActorCard';
import { readRegion } from '../utils/region';
import { actors, filterOptions } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { actorMatchesRegion } from '../utils/deadline';

const actorModes = ['推荐', '本地', '档期开放', '最近活跃', '已认证'];

export function ActorsPage() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const [favorites, setFavorites] = useLocalStorage<string[]>('castlink:favorites', []);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const keyword = params.get('q') ?? '';
  const city = params.get('city') ?? '全部城市';
  const gender = params.get('gender') ?? '不限';
  const age = params.get('age') ?? '不限';
  const tag = params.get('tag') ?? '';
  const verifiedOnly = params.get('verified') === 'true';
  const modeParam = params.get('mode');
  const mode = modeParam === 'available' ? '档期开放' : (modeParam || '推荐');
  const region = readRegion(location.search);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === '不限' || value === '全部城市' || value === '推荐') next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const filteredActors = useMemo(() => {
    const result = actors.filter((actor) => {
      const haystack = [actor.name, actor.englishName, actor.city, actor.tagline, ...actor.tags, ...actor.skills, ...actor.workRegions].join(' ').toLowerCase();
      const matchesKeyword = !keyword || haystack.includes(keyword.toLowerCase());
      const matchesCity = city === '全部城市' || actor.city === city || actor.workRegions.includes(city);
      const matchesGlobalRegion = actorMatchesRegion(actor.workRegions, actor.city, region);
      const matchesGender = gender === '不限' || actor.gender === gender;
      const matchesTag = !tag || actor.tags.includes(tag);
      const matchesVerified = !verifiedOnly || actor.verified;
      const matchesAge = age === '不限'
        || (age === '18–24岁' && actor.age <= 24)
        || (age === '25–34岁' && actor.age >= 25 && actor.age <= 34)
        || (age === '35–44岁' && actor.age >= 35 && actor.age <= 44)
        || (age === '45岁以上' && actor.age >= 45);
      const matchesMode = mode === '推荐'
        || (mode === '本地' && actor.city === region)
        || (mode === '档期开放' && (actor.availability.includes('开放') || actor.availability.includes('可')))
        || (mode === '最近活跃' && ['刚刚', '10分钟前', '8分钟前', '30分钟前', '1小时前'].includes(actor.lastActive))
        || (mode === '已认证' && actor.verified);
      return matchesKeyword && matchesCity && matchesGlobalRegion && matchesGender && matchesTag && matchesVerified && matchesAge && matchesMode;
    });

    return result.sort((a, b) => {
      if (mode === '已认证' && a.profileScore !== b.profileScore) return b.profileScore - a.profileScore;
      if (mode === '本地' && a.city !== b.city) return a.city === region ? -1 : 1;
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      return b.profileScore - a.profileScore;
    });
  }, [age, city, gender, keyword, mode, region, tag, verifiedOnly]);

  const activeFilterCount = [city !== '全部城市', gender !== '不限', age !== '不限', Boolean(tag), verifiedOnly].filter(Boolean).length;
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const clearFilters = () => {
    const next = new URLSearchParams();
    if (keyword) next.set('q', keyword);
    if (region !== '全国') next.set('region', region);
    setParams(next);
  };

  const filterPanel = (
    <aside className="filter-panel">
      <div className="filter-panel-heading">
        <div><SlidersHorizontal size={17} /><strong>筛选条件</strong></div>
        {activeFilterCount > 0 && <button type="button" onClick={clearFilters}>清除</button>}
      </div>
      <label className="filter-field">
        <span>常驻或可工作城市</span>
        <select value={city} onChange={(event) => updateParam('city', event.target.value)}>
          {filterOptions.cities.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="filter-field">
        <span>性别</span>
        <div className="segmented-control">
          {filterOptions.genders.map((item) => (
            <button type="button" key={item} className={gender === item ? 'is-active' : ''} onClick={() => updateParam('gender', item)}>{item}</button>
          ))}
        </div>
      </label>
      <label className="filter-field">
        <span>实际年龄</span>
        <select value={age} onChange={(event) => updateParam('age', event.target.value)}>
          {filterOptions.ageRanges.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <div className="filter-field">
        <span>角色气质</span>
        <div className="choice-tags">
          {filterOptions.roleTags.map((item) => (
            <button type="button" key={item} className={tag === item ? 'is-active' : ''} onClick={() => updateParam('tag', tag === item ? '' : item)}>{item}</button>
          ))}
        </div>
      </div>
      <label className="switch-row">
        <input type="checkbox" checked={verifiedOnly} onChange={(event) => updateParam('verified', String(event.target.checked))} />
        <span className="switch-ui" />
        仅显示实名认证演员
      </label>
      <div className="filter-tip">
        <strong>地区筛选说明</strong>
        <p>结果同时包含常驻该地区，以及明确接受前往该地区工作的演员。</p>
      </div>
    </aside>
  );

  return (
    <section className="directory-page actor-discovery-page">
      <div className="directory-hero actor-discovery-hero">
        <div className="container directory-hero-inner">
          <div><span className="eyebrow">演员浏览</span><h1>按地区、档期和形象快速浏览演员</h1><p>当前地区：{region}。演员可标记常驻地、可工作地区、跨城和驻组能力。</p></div>
          <div className="directory-count"><strong>{actors.length}</strong><span>位演示演员资料</span></div>
        </div>
      </div>

      <div className="container actor-mode-tabs" aria-label="演员浏览方式">
        {actorModes.map((item) => (
          <button type="button" key={item} className={mode === item ? 'is-active' : ''} onClick={() => updateParam('mode', item)}>{item}</button>
        ))}
      </div>

      <div className="container directory-layout">
        <div className="desktop-filter">{filterPanel}</div>
        <div className="directory-content">
          <div className="directory-toolbar">
            <form className="directory-search" onSubmit={(event) => event.preventDefault()}>
              <Search size={18} />
              <input
                value={keyword}
                onChange={(event) => updateParam('q', event.target.value)}
                placeholder="搜索姓名、地区、形象或技能"
              />
              {keyword && <button type="button" onClick={() => updateParam('q', '')} aria-label="清除搜索"><X size={16} /></button>}
            </form>
            <button type="button" className="button button-secondary filter-drawer-trigger" onClick={() => setFiltersOpen(true)}>
              <Filter size={17} />筛选{activeFilterCount ? ` · ${activeFilterCount}` : ''}
            </button>
          </div>
          <div className="results-heading">
            <span>找到 <strong>{filteredActors.length}</strong> 位演员</span>
            <span>{mode} · {region}</span>
          </div>
          {filteredActors.length > 0 ? (
            <div className="actor-grid directory-actor-grid">
              {filteredActors.map((actor) => <ActorCard key={actor.id} actor={actor} favorite={favorites.includes(actor.id)} onToggleFavorite={toggleFavorite} />)}
            </div>
          ) : (
            <div className="empty-state"><Search size={36} /><h3>没有找到匹配的演员</h3><p>尝试切换地区，或减少筛选条件。</p><button type="button" className="button button-primary" onClick={clearFilters}>清除筛选</button></div>
          )}
        </div>
      </div>
      {filtersOpen && (
        <div className="drawer-backdrop" onClick={() => setFiltersOpen(false)}>
          <div className="filter-drawer" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="drawer-close" onClick={() => setFiltersOpen(false)}><X /></button>
            {filterPanel}
            <button type="button" className="button button-primary drawer-apply" onClick={() => setFiltersOpen(false)}>查看 {filteredActors.length} 位演员</button>
          </div>
        </div>
      )}
    </section>
  );
}
