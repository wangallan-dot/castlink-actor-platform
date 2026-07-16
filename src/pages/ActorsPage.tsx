import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ActorCard } from '../components/ActorCard';
import { actors, filterOptions } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function ActorsPage() {
  const [params, setParams] = useSearchParams();
  const [favorites, setFavorites] = useLocalStorage<string[]>('castlink:favorites', []);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const keyword = params.get('q') ?? '';
  const city = params.get('city') ?? '全部城市';
  const gender = params.get('gender') ?? '不限';
  const age = params.get('age') ?? '不限';
  const tag = params.get('tag') ?? '';
  const verifiedOnly = params.get('verified') === 'true';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === '不限' || value === '全部城市') next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const filteredActors = useMemo(() => {
    return actors.filter((actor) => {
      const haystack = [actor.name, actor.englishName, actor.city, actor.tagline, ...actor.tags, ...actor.skills].join(' ').toLowerCase();
      const matchesKeyword = !keyword || haystack.includes(keyword.toLowerCase());
      const matchesCity = city === '全部城市' || actor.city === city;
      const matchesGender = gender === '不限' || actor.gender === gender;
      const matchesTag = !tag || actor.tags.includes(tag);
      const matchesVerified = !verifiedOnly || actor.verified;
      const matchesAge = age === '不限'
        || (age === '18–24岁' && actor.age <= 24)
        || (age === '25–34岁' && actor.age >= 25 && actor.age <= 34)
        || (age === '35–44岁' && actor.age >= 35 && actor.age <= 44)
        || (age === '45岁以上' && actor.age >= 45);
      return matchesKeyword && matchesCity && matchesGender && matchesTag && matchesVerified && matchesAge;
    });
  }, [age, city, gender, keyword, tag, verifiedOnly]);

  const activeFilterCount = [city !== '全部城市', gender !== '不限', age !== '不限', Boolean(tag), verifiedOnly].filter(Boolean).length;
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const clearFilters = () => setParams(keyword ? { q: keyword } : {});

  const filterPanel = (
    <aside className="filter-panel">
      <div className="filter-panel-heading">
        <div><SlidersHorizontal size={17} /><strong>筛选条件</strong></div>
        {activeFilterCount > 0 && <button type="button" onClick={clearFilters}>清除</button>}
      </div>
      <label className="filter-field">
        <span>所在城市</span>
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
        <strong>需要更精准的筛选？</strong>
        <p>项目方专业版支持档期、方言、表演技能、项目经验等高级条件。</p>
      </div>
    </aside>
  );

  return (
    <section className="directory-page">
      <div className="directory-hero">
        <div className="container directory-hero-inner">
          <div><span className="eyebrow">演员数据库</span><h1>找到真正适合角色的人</h1><p>按形象条件、角色气质、专业技能和工作地区筛选演员。</p></div>
          <div className="directory-count"><strong>{actors.length * 164}</strong><span>位演员资料已入库</span></div>
        </div>
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
                placeholder="搜索姓名、城市、角色气质或技能"
              />
              {keyword && <button type="button" onClick={() => updateParam('q', '')} aria-label="清除搜索"><X size={16} /></button>}
            </form>
            <button type="button" className="button button-secondary filter-drawer-trigger" onClick={() => setFiltersOpen(true)}>
              <Filter size={17} />筛选{activeFilterCount ? ` · ${activeFilterCount}` : ''}
            </button>
            <select className="sort-select" aria-label="排序方式"><option>综合推荐</option><option>资料完整度</option><option>最近活跃</option></select>
          </div>
          <div className="results-heading">
            <span>找到 <strong>{filteredActors.length}</strong> 位演员</span>
            {keyword && <span>关键词：{keyword}</span>}
          </div>
          {filteredActors.length > 0 ? (
            <div className="actor-grid directory-actor-grid">
              {filteredActors.map((actor) => <ActorCard key={actor.id} actor={actor} favorite={favorites.includes(actor.id)} onToggleFavorite={toggleFavorite} />)}
            </div>
          ) : (
            <div className="empty-state"><Search size={36} /><h3>没有找到匹配的演员</h3><p>尝试减少筛选条件，或使用更宽泛的关键词。</p><button type="button" className="button button-primary" onClick={clearFilters}>清除筛选</button></div>
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
