import { BarChart3, CalendarClock, ChevronRight, CircleCheck, FolderKanban, Search, Send, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { actors } from '../data';
import { Portrait } from '../components/Portrait';

const columns = [
  { title: '待筛选', count: 12, actorIds: ['he-xiao', 'tang-ke'] },
  { title: '已联系', count: 7, actorIds: ['luo-ya', 'chen-mu'] },
  { title: '已邀试镜', count: 5, actorIds: ['lin-zhou', 'yu-qing'] },
  { title: '导演复看', count: 3, actorIds: ['su-wen'] },
];

export function ProducerDashboard() {
  return (
    <section className="dashboard-page producer-dashboard">
      <div className="container dashboard-heading"><div><span className="eyebrow">招募管理</span><h1>《沉默证词》</h1><p>深蓝影业 · 6条剧组招募进行中 · 团队成员5人</p></div><div className="dashboard-heading-actions"><Link to="/actors" className="button button-secondary"><Search size={17} />搜索演员</Link><button type="button" className="button button-primary">发布剧组招募</button></div></div>
      <div className="container producer-metrics">
        {[['全部候选人','48',UsersRound],['待处理资料','12',FolderKanban],['已发送试镜','18',Send],['即将截止','3',CalendarClock]].map(([label,value,Icon]) => <article key={String(label)}><span><Icon size={20} /></span><div><small>{label as string}</small><strong>{value as string}</strong></div></article>)}
      </div>
      <div className="container dashboard-card project-summary-card">
        <div><span className="project-status-dot" />选角进行中</div><strong>核心角色完成度 42%</strong><div className="project-progress"><i style={{ width: '42%' }} /></div><span>距离试镜截止还有 8 天</span>
      </div>
      <div className="container casting-board">
        <div className="casting-board-heading"><div><h2>顾沉｜刑警队长</h2><p>男 · 32–40岁 · 上海 · 18个拍摄日</p></div><div><button type="button" className="button button-secondary button-small"><BarChart3 size={16} />对比演员</button><button type="button" className="button button-primary button-small">邀请试镜</button></div></div>
        <div className="kanban-scroll">
          {columns.map((column) => (
            <section className="kanban-column" key={column.title}>
              <header><span>{column.title}</span><em>{column.count}</em></header>
              <div className="kanban-cards">
                {column.actorIds.map((id) => {
                  const actor = actors.find((item) => item.id === id)!;
                  return <article className="candidate-mini-card" key={id}><Portrait name={actor.name} initials={actor.initials} gradient={actor.gradient} className="candidate-mini-avatar" /><div><strong>{actor.name}{actor.verified && <CircleCheck size={14} />}</strong><span>{actor.playingAge} · {actor.height}cm</span><p>{actor.tags.slice(0,2).join(' · ')}</p></div><button type="button"><ChevronRight size={17} /></button></article>;
                })}
                <button type="button" className="add-candidate-card">+ 添加候选演员</button>
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className="container dashboard-grid producer-bottom-grid">
        <section className="dashboard-card"><div className="dashboard-card-heading"><div><h2>团队动态</h2><p>最近24小时</p></div></div><div className="activity-list">{[['导演 王珂','将周林移动到“导演复看”','12分钟前'],['选角导演 李然','为余晴添加评分 4.6','1小时前'],['制片 张茜','更新角色拍摄日期','3小时前'],['系统','收到陈牧的试镜视频','昨天']].map(([name,action,time]) => <div key={action}><span>{name.slice(-1)}</span><p><strong>{name}</strong>{action}</p><em>{time}</em></div>)}</div></section>
        <section className="dashboard-card"><div className="dashboard-card-heading"><div><h2>招募进度</h2><p>6条招募</p></div></div><div className="role-progress-list">{[['顾沉｜刑警队长',42],['林瑶｜法医',68],['周启明｜记者',25],['王局｜领导',86]].map(([title,value]) => <div key={String(title)}><div><strong>{title as string}</strong><span>{value as number}%</span></div><div className="score-track"><i style={{ width: `${value}%` }} /></div></div>)}</div></section>
      </div>
    </section>
  );
}
