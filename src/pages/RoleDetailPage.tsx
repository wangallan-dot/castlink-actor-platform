import { ArrowLeft, BadgeCheck, CalendarDays, Check, Clock, MapPin, ShieldCheck, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { roles } from '../data';
import { NotFoundPage } from './NotFoundPage';

export function RoleDetailPage() {
  const { roleId } = useParams();
  const role = roles.find((item) => item.id === roleId);
  if (!role) return <NotFoundPage />;
  return (
    <section className="role-detail-page">
      <div className="container profile-back-row"><Link to="/roles"><ArrowLeft size={16} />返回角色广场</Link></div>
      <div className="container role-detail-grid">
        <div className="role-detail-main">
          <div className="role-detail-header">
            <div className="role-card-topline"><span className="role-type">{role.projectType}</span>{role.urgent && <span className="urgent-badge">急招</span>}</div>
            <h1>{role.title}</h1>
            <p className="role-project detail-project">{role.project} · {role.company}{role.verified && <BadgeCheck size={18} className="verified-icon" />}</p>
            <div className="role-detail-facts">
              <span><MapPin size={17} />{role.city}</span><span><CalendarDays size={17} />{role.shootDate}</span><span><Clock size={17} />{role.duration}</span><span><UserRound size={17} />{role.gender} · {role.ageRange}</span>
            </div>
            <div className="tag-row">{role.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          </div>
          <section className="content-card"><h2>角色概述</h2><p className="profile-bio">{role.description}</p></section>
          <section className="content-card"><h2>试镜要求</h2><div className="requirements-list">{role.requirements.map((item) => <span key={item}><Check size={16} />{item}</span>)}</div></section>
          <section className="content-card safety-notice"><ShieldCheck size={22} /><div><strong>平台安全提示</strong><p>请勿在试镜前支付任何“报名费”“保证金”或“角色预留费”。平台不会以任何形式保证演员获得角色。</p></div></section>
        </div>
        <aside className="role-apply-card">
          <span>项目报酬</span><strong>{role.pay}</strong><small>具体以最终合同为准</small>
          <button type="button" className="button button-primary button-full">提交演员卡</button>
          <button type="button" className="button button-secondary button-full">收藏角色</button>
          <div className="apply-divider" />
          <div className="apply-company"><span>{role.company.slice(0, 1)}</span><div><strong>{role.company}</strong><small>{role.verified ? '企业身份已认证' : '项目资料待完善'}</small></div></div>
          <dl><div><dt>发布时间</dt><dd>{role.postedAt}</dd></div><div><dt>试镜方式</dt><dd>线上 Self-tape</dd></div><div><dt>申请截止</dt><dd>2026.07.26</dd></div></dl>
        </aside>
      </div>
    </section>
  );
}
