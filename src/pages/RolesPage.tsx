import { BriefcaseBusiness, Clock3, Search, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { readRegion } from '../utils/region';
import { RoleCard } from '../components/RoleCard';
import { recruitments } from '../data';
import { getDeadlineInfo, recruitmentMatchesRegion } from '../utils/deadline';

const deadlineFilters = ['推荐', '最新', '急招', '今日截止', '3天内', '7天内'];

export function RolesPage() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('全部类型');
  const region = readRegion(location.search);
  const deadlineMode = params.get('deadline') === '3days' ? '3天内' : (params.get('mode') || '推荐');

  const types = ['全部类型', ...Array.from(new Set(recruitments.map((item) => item.projectType)))];

  const filtered = useMemo(() => {
    const result = recruitments.filter((item) => {
      const deadline = getDeadlineInfo(item.applicationDeadline);
      const haystack = [item.title, item.project, item.projectType, item.city, item.district, item.summary, ...item.tags].join(' ').toLowerCase();
      const matchesKeyword = !keyword || haystack.includes(keyword.toLowerCase());
      const matchesType = type === '全部类型' || item.projectType === type;
      const matchesRegion = recruitmentMatchesRegion(item, region);
      const matchesDeadline = deadlineMode === '推荐'
        || (deadlineMode === '最新')
        || (deadlineMode === '急招' && deadline.remainingHours <= 72 && !deadline.isClosed)
        || (deadlineMode === '今日截止' && deadline.remainingHours <= 24 && !deadline.isClosed)
        || (deadlineMode === '3天内' && deadline.remainingHours <= 72 && !deadline.isClosed)
        || (deadlineMode === '7天内' && deadline.remainingHours <= 168 && !deadline.isClosed);
      return matchesKeyword && matchesType && matchesRegion && matchesDeadline;
    });

    return result.sort((a, b) => {
      const aDeadline = getDeadlineInfo(a.applicationDeadline);
      const bDeadline = getDeadlineInfo(b.applicationDeadline);
      if (aDeadline.isClosed !== bDeadline.isClosed) return aDeadline.isClosed ? 1 : -1;
      if (deadlineMode === '最新') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      if (deadlineMode === '推荐') {
        if (a.verified !== b.verified) return a.verified ? -1 : 1;
        if (aDeadline.tone !== bDeadline.tone) return aDeadline.remainingHours - bDeadline.remainingHours;
      }
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
    <section className="roles-page recruitment-page">
      <div className="roles-hero recruitment-hero">
        <div className="container roles-hero-grid">
          <div>
            <span className="eyebrow"><BriefcaseBusiness size={16} />剧组招募</span>
            <h1>按地区和招募时限，找到正在进行的项目</h1>
            <p>每条招募都明确拍摄地点、拍摄日期、截止时间、报酬与角色要求。</p>
          </div>
          <div className="roles-safety-card"><ShieldCheck size={24} /><div><strong>招募信息审核</strong><span>项目身份、时限、报酬和拍摄条件清晰展示</span></div></div>
        </div>
      </div>

      <div className="container recruitment-deadline-tabs" aria-label="招募时限筛选">
        {deadlineFilters.map((item) => (
          <button type="button" key={item} className={deadlineMode === item ? 'is-active' : ''} onClick={() => chooseDeadlineMode(item)}>
            {item === '急招' && <Clock3 size={13} />}{item}
          </button>
        ))}
      </div>

      <div className="container roles-content">
        <div className="roles-toolbar recruitment-toolbar">
          <label className="directory-search"><Search size={18} /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索项目、招募人物或关键词" /></label>
          <select value={type} onChange={(event) => setType(event.target.value)}>{types.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="results-heading">
          <span><strong>{region}</strong>共有 <strong>{filtered.length}</strong> 条有效剧组招募</span>
          <span>{deadlineMode === '推荐' ? '综合时限与信息完整度排序' : `${deadlineMode}筛选`}</span>
        </div>
        <div className="recruitment-feed recruitment-directory-feed">
          {filtered.map((item) => <RoleCard key={item.id} role={item} />)}
        </div>
      </div>
    </section>
  );
}
