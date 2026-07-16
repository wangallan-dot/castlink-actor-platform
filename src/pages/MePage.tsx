import { BadgeCheck, BriefcaseBusiness, ChevronRight, ClipboardList, MessageCircleMore, Settings, ShieldCheck, UserRound, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIdentity } from '../context/useIdentity';

export function MePage() {
  const { identity, setIdentity } = useIdentity();

  const actorLinks = [
    { to: '/profile/edit', icon: UserRound, title: '我的演员卡', note: '照片、视频、履历与档期' },
    { to: '/applications', icon: ClipboardList, title: '申请与试镜', note: '查看申请、邀请和试镜进度' },
    { to: '/messages', icon: MessageCircleMore, title: '项目消息', note: '处理剧组沟通与资料补充' },
  ];

  const crewLinks = [
    { to: '/recruitment/manage', icon: BriefcaseBusiness, title: '招募管理', note: '草稿、招募中和已完成项目' },
    { to: '/actors', icon: UsersRound, title: '收藏与浏览演员', note: '继续筛选合适的候选演员' },
    { to: '/messages', icon: MessageCircleMore, title: '演员消息', note: '处理申请、邀请和试镜回复' },
  ];

  const links = identity === 'actor' ? actorLinks : crewLinks;

  return (
    <section className="me-page">
      <div className="container me-profile-card">
        <span className="me-avatar">{identity === 'actor' ? '周' : '深'}</span>
        <div><span className="eyebrow">当前身份</span><h1>{identity === 'actor' ? '周林 · 演员' : '深蓝影业 · 剧组方'}</h1><p>{identity === 'actor' ? '演员卡完整度 96% · 实名认证已完成' : '剧组身份已认证 · 3条招募进行中'}</p></div>
        <BadgeCheck size={23} className="verified-icon" />
      </div>

      <div className="container identity-settings-card">
        <div><strong>切换使用身份</strong><span>身份切换放在“我”，避免打断日常浏览。</span></div>
        <div className="identity-segmented-control">
          <button type="button" className={identity === 'actor' ? 'is-active' : ''} onClick={() => setIdentity('actor')}><UserRound size={17} />演员</button>
          <button type="button" className={identity === 'crew' ? 'is-active' : ''} onClick={() => setIdentity('crew')}><BriefcaseBusiness size={17} />剧组方</button>
        </div>
      </div>

      <div className="container me-link-list">
        {links.map(({ to, icon: Icon, title, note }) => (
          <Link key={title} to={to}><span><Icon size={20} /></span><div><strong>{title}</strong><small>{note}</small></div><ChevronRight size={17} /></Link>
        ))}
      </div>

      <div className="container me-link-list secondary-me-links">
        <button type="button"><span><ShieldCheck size={20} /></span><div><strong>认证与隐私</strong><small>管理公开资料和联系方式权限</small></div><ChevronRight size={17} /></button>
        <button type="button"><span><Settings size={20} /></span><div><strong>设置与反馈</strong><small>账号、安全、帮助和问题反馈</small></div><ChevronRight size={17} /></button>
      </div>
    </section>
  );
}
