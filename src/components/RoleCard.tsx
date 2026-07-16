import { BadgeCheck, CalendarDays, MapPin, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Role } from '../types';

export function RoleCard({ role }: { role: Role }) {
  return (
    <article className="role-card">
      <div className="role-card-topline">
        <span className="role-type">{role.projectType}</span>
        <span className="role-posted">{role.postedAt}</span>
      </div>
      <Link to={`/roles/${role.id}`} className="role-card-link">
        <h3>{role.title}</h3>
      </Link>
      <p className="role-project">
        {role.project}
        {role.verified && <BadgeCheck size={16} className="verified-icon" aria-label="项目已认证" />}
      </p>
      <p className="role-summary">{role.summary}</p>
      <div className="tag-row">
        {role.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
      </div>
      <div className="role-meta-grid">
        <span><MapPin size={15} />{role.city}</span>
        <span><CalendarDays size={15} />{role.shootDate}</span>
        <span><Timer size={15} />{role.duration}</span>
      </div>
      <div className="role-card-bottom">
        <strong>{role.pay}</strong>
        <Link to={`/roles/${role.id}`} className="text-link">查看角色</Link>
      </div>
    </article>
  );
}
