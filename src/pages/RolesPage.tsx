import { BriefcaseBusiness, Clock3, MapPin, Search, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { RoleCard } from '../components/RoleCard';
import { discoveryRegions, extraRegions, recruitments } from '../data';
import { getDeadlineInfo, recruitmentMatchesRegion } from '../utils/deadline';
import { readRegion, writeRegion } from '../utils/region';

const deadlineFilters = ['推荐', '最新', '急招', '今日截止', '3天内', '7天内'];

export function RolesPage() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const keyword = params.get('q') || '';
  const type = params.get('type') || '全部类型';
  const region = readRegion(location.search);
  const deadlineMode = params.get('deadline') === '3days' ? '3天内' : (params.get('mode') || '推荐');
  const types = ['全部类型', ...Array.from(new Set(recruitments.map((item) => item.projectType)))];
  const regions = [...discoveryRegions.filter((item) => item !== '更多'), ...extraRegions];

  useEffect(() => {
    if (params.get('focusSearch') === '1') {
      searchInputRef.current?.focus();
      const next = new URLSearchParams(params);
      next.delete('focusSearch');
      setParams(next, { replace: true });
    }
  }, [params, setParams]);

  const updateParam = (key: string, value: string, defaultValue?: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const chooseRegion = (nextRegion: string) => {
    writeRegion(nextRegion);
    const next = new URLSearchParams(params);
    if (nextRegion === '全国') next.delete('region');
    else next.set('region', nextRegion);
    setParams(next);
  };

  const filtered = useMemo(() => {
    const result = recruitments.filter((item) => {
      const deadline = getDeadlineInfo(item.applicationDeadline);
      if (deadline.isClosed) return false;
      const haystack = [item.title, item.project, item.projectType, item.city, item.district, item.summary, ...item.tags].join(' ').toLowerCase();
      const matchesKeyword = !keyword || haystack.includes(keyword.toLowerCase());
      const matchesType = type === '全部类型' || item.projectType === type;
      const matchesRegion = recruitmentMatchesRegion(item, region);
      const matchesDeadline = deadlineMode === '推荐'
        || deadlineMode === '最新'
        || (deadlineMode === '急招' && deadline.remainingHours <= 72)
        || (deadlineMode === '今日截止' && deadline.remainingHours <= 24)
        || (deadlineMode === '3天内' && deadline.remainingHours <= 72)
        || (deadlineMode === '7天内' && deadline.remainingHours <= 168);
      return matchesKeyword && matchesType && matchesRegion && matchesDeadline;
    });

    return result.sort((a, b) => {
      if (deadlineMode === '最新') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      const aDeadline = getDeadlineInfo(a.applicationDeadline);
      const bDeadline = getDeadlineInfo(b.applicationDeadline);
      if (deadlineMode === '推荐' && a.verified !== b.verified) return a.verified ? -1 : 1;
      return aDeadline.remainingHours - bDeadline.remainingHours;
    });
  }, [deadlineMode, keyword, region, type]);

  const chooseDeadlineMode = (mode: string) => {
    const next = new URLSearchParams(params);
    next.delete('deadline');
    if (mode === '推荐') next.delete('mode');
    else next.set('mode', mode);
    setParams(next);
  };

  return (
    <section className="roles-page recruitment-page active-search-page">
      <div className="roles-hero recruitment-hero"><div className="container roles-hero-grid"><div><span className="eyebrow"><BriefcaseBusiness size={16} />剧组招募</span><h1>主动查找明确、有效的剧组招募</h1><p>按拍摄地区、截止时间、项目类型和人物条件搜索。</p></div><div className="roles-safety-card"><ShieldCheck size={24} /><div><strong>招募信息审核</strong><span>项目身份、时限、报酬和拍摄条件清晰展示</span></div></div></div></div>

      <div className="container recruitment-deadline-tabs quick-filter-tabs" aria-label="招募时限筛选">{deadlineFilters.map((item) => <button type="button" key={item} className={deadlineMode === item ? 'is-active' : ''} onClick={() => chooseDeadlineMode(item)}>{item === '急招' && <Clock3 size={13} />}{item}</button>)}</div>

      <div className="container roles-content">
        <div className="roles-toolbar recruitment-toolbar active-search-toolbar">
          <label className="directory-search"><Search size={18} /><input ref={searchInputRef} value={keyword} onChange={(event) => updateParam('q', event.target.value)} placeholder="搜索项目、招募人物或关键词" /></label>
          <label className="region-select-control"><MapPin size={16} /><select value={region} onChange={(event) => chooseRegion(event.target.value)} aria-label="选择拍摄地区">{regions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <select value={type} onChange={(event) => updateParam('type', event.target.value, '全部类型')} aria-label="选择项目类型">{types.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="results-heading"><span><strong>{region}</strong>共有 <strong>{filtered.length}</strong> 条有效剧组招募</span><span>{deadlineMode === '推荐' ? '综合时限与信息完整度排序' : `${deadlineMode}筛选`}</span></div>
        {filtered.length > 0 ? <div className="recruitment-feed recruitment-directory-feed">{filtered.map((item) => <RoleCard key={item.id} role={item} />)}</div> : <div className="empty-state"><Search size={36} /><h3>没有找到匹配的招募</h3><p>尝试切换地区、时限或项目类型。</p><button type="button" className="button button-primary" onClick={() => setParams(region === '全国' ? {} : { region })}>清除筛选</button></div>}
      </div>
    </section>
  );
}
