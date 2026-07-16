import { BarChart3, Bell, CalendarDays, ChevronRight, CircleCheck, Eye, FileVideo, MessageSquare, Sparkles, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ActorDashboard() {
  return (
    <section className="dashboard-page">
      <div className="container dashboard-heading"><div><span className="eyebrow">申请与试镜</span><h1>申请进度</h1><p>集中查看剧组邀请、申请记录和试镜截止时间。</p></div><Link to="/profile/edit" className="button button-primary">编辑演员卡</Link></div>
      <div className="container dashboard-grid">
        <div className="dashboard-main">
          <div className="metric-grid">
            {[['待回复邀请', '2', '今天处理', Bell], ['已申请招募', '6', '1条有进展', FileVideo], ['试镜任务', '3', '1个将截止', Eye], ['收藏招募', '8', '+3', Sparkles]].map(([label, value, note, Icon]) => (
              <article className="metric-card" key={String(label)}><span className="metric-icon"><Icon size={19} /></span><div><small>{label as string}</small><strong>{value as string}</strong><em>{note as string}</em></div></article>
            ))}
          </div>
          <section className="dashboard-card">
            <div className="dashboard-card-heading"><div><h2>待处理事项</h2><p>请在剧组招募或试镜截止时间前完成处理。</p></div><button type="button">查看全部</button></div>
            <div className="invite-list">
              {[
                ['《沉默证词》', '顾沉｜刑警队长', '深蓝影业', '明天 18:00截止', '提交试镜'],
                ['科技品牌年度影片', '创业公司创始人', '万象创意', '3天后截止', '查看邀请'],
                ['《回家吃饭》', '父亲｜家庭片主演', '潮汐电影', '5天后截止', '回复档期'],
              ].map((item) => (
                <article className="invite-row" key={item[0]}><span className="invite-logo">{item[0].slice(1, 2)}</span><div><strong>{item[1]}</strong><p>{item[0]} · {item[2]}</p></div><span className="deadline">{item[3]}</span><button type="button" className="button button-secondary button-small">{item[4]}</button></article>
              ))}
            </div>
          </section>
          <section className="dashboard-card">
            <div className="dashboard-card-heading"><div><h2>申请与试镜进度</h2><p>最近提交的角色申请和反馈状态。</p></div></div>
            <div className="pipeline-list">
              {[
                ['《晚风来信》· 品牌策划', '导演复看', '2026.07.14提交', 3],
                ['《第七码头》· 周野', '已进入第二轮', '2026.07.11提交', 4],
                ['品牌短片· 调查员', '已提交', '2026.07.09提交', 2],
              ].map(([title, status, date, step]) => (
                <div className="pipeline-row" key={String(title)}><div><strong>{title as string}</strong><span>{date as string}</span></div><div className="mini-pipeline">{[1,2,3,4].map((item) => <i key={item} className={item <= Number(step) ? 'is-active' : ''} />)}</div><em>{status as string}</em><ChevronRight size={17} /></div>
              ))}
            </div>
          </section>
        </div>
        <aside className="dashboard-sidebar">
          <section className="dashboard-card profile-progress-card"><div className="progress-ring"><strong>96%</strong><span>完整度</span></div><h3>演员卡状态良好</h3><p>补充一段方言展示视频，可提高更多本地角色匹配率。</p><Link to="/profile/edit" className="text-link">继续完善 <ChevronRight size={16} /></Link></section>
          <section className="dashboard-card quick-actions"><h3>快捷操作</h3>{[[UserRound,'编辑基础资料'],[FileVideo,'上传作品视频'],[CalendarDays,'更新演员档期'],[MessageSquare,'查看项目消息'],[BarChart3,'查看曝光分析']].map(([Icon,label]) => <button type="button" key={String(label)}><Icon size={17} />{label as string}<ChevronRight size={15} /></button>)}</section>
          <section className="dashboard-card verified-card"><CircleCheck size={28} /><h3>实名认证已完成</h3><p>你的演员卡将获得更高的项目方信任权重。</p></section>
        </aside>
      </div>
    </section>
  );
}
