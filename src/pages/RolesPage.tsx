import { BriefcaseBusiness, Search, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { RoleCard } from '../components/RoleCard';
import { roles } from '../data';

export function RolesPage() {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('全部类型');
  const [city, setCity] = useState('全部城市');
  const filtered = useMemo(() => roles.filter((role) => {
    const haystack = [role.title, role.project, role.projectType, role.city, role.summary, ...role.tags].join(' ').toLowerCase();
    return (!keyword || haystack.includes(keyword.toLowerCase())) && (type === '全部类型' || role.projectType === type) && (city === '全部城市' || role.city === city);
  }), [city, keyword, type]);
  const types = ['全部类型', ...Array.from(new Set(roles.map((role) => role.projectType)))];
  const cities = ['全部城市', ...Array.from(new Set(roles.map((role) => role.city)))];

  return (
    <section className="roles-page">
      <div className="roles-hero">
        <div className="container roles-hero-grid">
          <div><span className="eyebrow"><BriefcaseBusiness size={16} />角色招募广场</span><h1>找到适合你的下一次表演机会</h1><p>平台审核项目身份与招募信息，演员可以直接查看角色条件并提交职业资料。</p></div>
          <div className="roles-safety-card"><ShieldCheck size={24} /><div><strong>安全招募机制</strong><span>认证项目、报酬信息、隐私沟通与举报处理</span></div></div>
        </div>
      </div>
      <div className="container roles-content">
        <div className="roles-toolbar">
          <label className="directory-search"><Search size={18} /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索角色、项目或关键词" /></label>
          <select value={type} onChange={(event) => setType(event.target.value)}>{types.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={city} onChange={(event) => setCity(event.target.value)}>{cities.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="results-heading"><span>共有 <strong>{filtered.length}</strong> 个角色正在招募</span><span>最新发布优先</span></div>
        <div className="role-grid roles-directory-grid">{filtered.map((role) => <RoleCard key={role.id} role={role} />)}</div>
      </div>
    </section>
  );
}
