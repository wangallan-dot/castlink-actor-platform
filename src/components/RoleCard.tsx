import { BadgeCheck, BedDouble, CalendarDays, MapPin, Route, Timer, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Recruitment } from '../types';
import { getDeadlineInfo } from '../utils/deadline';

export function RoleCard({ role }: { role: Recruitment }) {
  const deadline = getDeadlineInfo(role.applicationDeadline);

  return (
    <article className={`role-card recruitment-card ${deadline.isClosed ? 'is-closed' : ''}`}>
      <div className="role-card-topline">
        <div className="recruitment-top-tags">
          <span className="role-type">{role.projectType}</span>
          <span className={`deadline-badge is-${deadline.tone}`} title={deadline.detail}>{deadline.label}</span>
        </div>
        <span className="role-posted">更新于{role.postedAt}</span>
      </div>

      <Link to={`/recruitments/${role.id}`} className="role-card-link">
        <p className="recruitment-project-name">
          {role.project}
          {role.verified && <BadgeCheck size={16} className="verified-icon" aria-label="剧组已认证" />}
        </p>
        <h3>{role.title}</h3>
      </Link>

      <p className="role-summary">{role.summary}</p>

      <div className="recruitment-key-meta">
        <span><MapPin size={15} />{role.city}{role.district ? ` · ${role.district}` : ''}</span>
        <span><CalendarDays size={15} />拍摄 {role.shootDate}</span>
        <span><Timer size={15} />{role.duration}</span>
      </div>

      <div className="recruitment-condition-row">
        {role.acceptsNonLocalActors && <span><Route size={13} />接受外地演员</span>}
        {role.providesAccommodation && <span><BedDouble size={13} />提供住宿</span>}
        <span><UsersRound size={13} />剩余{role.remainingSlots}人</span>
      </div>

      <div className="tag-row recruitment-tags">
        {role.tags.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
      </div>

      <div className="role-card-bottom recruitment-card-bottom">
        <div>
          <strong>{role.pay}</strong>
          <small>{role.company}</small>
        </div>
        <Link to={`/recruitments/${role.id}`} className="button button-primary button-small">
          {deadline.isClosed ? '查看详情' : '查看招募'}
        </Link>
      </div>
    </article>
  );
}
