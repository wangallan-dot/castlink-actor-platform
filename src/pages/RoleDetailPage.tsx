import { ArrowLeft, BadgeCheck, BedDouble, CalendarDays, Check, Clock, MapPin, Route, ShieldCheck, UserRound, UsersRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { recruitments } from '../data';
import { getDeadlineInfo } from '../utils/deadline';
import { NotFoundPage } from './NotFoundPage';

export function RoleDetailPage() {
  const { roleId } = useParams();
  const role = recruitments.find((item) => item.id === roleId);
  if (!role) return <NotFoundPage />;
  const deadline = getDeadlineInfo(role.applicationDeadline);

  return (
    <section className="role-detail-page">
      <div className="container profile-back-row"><Link to="/recruitments"><ArrowLeft size={16} />返回剧组招募</Link></div>
      <div className="container role-detail-grid">
        <div className="role-detail-main">
          <div className="role-detail-header">
            <div className="role-card-topline">
              <span className="role-type">{role.projectType}</span>
              <span className={`deadline-badge is-${deadline.tone}`} title={deadline.detail}>{deadline.label}</span>
            </div>
            <p className="recruitment-detail-project">{role.project}</p>
            <h1>{role.title}</h1>
            <p className="role-project detail-project">{role.company}{role.verified && <BadgeCheck size={18} className="verified-icon" />}</p>
            <div className="role-detail-facts">
              <span><MapPin size={17} />{role.city}{role.district ? ` · ${role.district}` : ''}</span>
              <span><CalendarDays size={17} />{role.shootDate}</span>
              <span><Clock size={17} />{role.duration}</span>
              <span><UserRound size={17} />{role.gender} · {role.ageRange}</span>
              {role.acceptsNonLocalActors && <span><Route size={17} />接受外地演员</span>}
              {role.providesAccommodation && <span><BedDouble size={17} />剧组提供住宿</span>}
            </div>
            <div className="tag-row">{role.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          </div>
          <section className="content-card"><h2>招募说明</h2><p className="profile-bio">{role.description}</p></section>
          <section className="content-card"><h2>演员要求</h2><div className="requirements-list">{role.requirements.map((item) => <span key={item}><Check size={16} />{item}</span>)}</div></section>
          <section className="content-card safety-notice"><ShieldCheck size={22} /><div><strong>招募安全提示</strong><p>请勿在试镜前支付报名费、保证金或角色预留费。所有沟通应围绕本条剧组招募进行。</p></div></section>
        </div>
        <aside className="role-apply-card">
          <span>项目报酬</span><strong>{role.pay}</strong><small>具体以双方最终确认信息为准</small>
          <div className={`application-deadline-panel is-${deadline.tone}`}>
            <span>申请截止</span><strong>{deadline.label}</strong><small>{deadline.detail}</small>
          </div>
          <button type="button" className="button button-primary button-full" disabled={deadline.isClosed}>{deadline.isClosed ? '招募已截止' : '提交演员卡'}</button>
          <button type="button" className="button button-secondary button-full">收藏剧组招募</button>
          <div className="apply-divider" />
          <div className="apply-company"><span>{role.company.slice(0, 1)}</span><div><strong>{role.company}</strong><small>{role.verified ? '剧组身份已认证' : '招募资料待核验'}</small></div></div>
          <dl>
            <div><dt>发布时间</dt><dd>{role.postedAt}</dd></div>
            <div><dt>剩余名额</dt><dd><UsersRound size={13} />{role.remainingSlots}人</dd></div>
            <div><dt>试镜方式</dt><dd>线上 Self-tape</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
