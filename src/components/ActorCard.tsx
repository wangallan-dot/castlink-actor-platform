import { Bookmark, CheckCircle2, Clock3, MapPin, Route } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Actor } from '../types';
import { Portrait } from './Portrait';

type ActorCardProps = {
  actor: Actor;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export function ActorCard({ actor, favorite, onToggleFavorite }: ActorCardProps) {
  return (
    <article className="actor-card">
      <Link to={`/actors/${actor.id}`} className="actor-card-visual" aria-label={`查看${actor.name}的演员卡`}>
        <Portrait
          name={actor.name}
          initials={actor.initials}
          gradient={actor.gradient}
          accent={actor.accent}
          className="actor-card-portrait"
        />
        <div className="actor-card-overlay">
          <span>{actor.playingAge}</span>
          <span>{actor.height}cm</span>
        </div>
      </Link>
      <button
        type="button"
        className={`icon-button actor-favorite ${favorite ? 'is-active' : ''}`}
        onClick={() => onToggleFavorite(actor.id)}
        aria-label={favorite ? '取消收藏' : '收藏演员'}
      >
        <Bookmark size={18} fill={favorite ? 'currentColor' : 'none'} />
      </button>
      <div className="actor-card-body">
        <div className="actor-card-title-row">
          <div>
            <Link to={`/actors/${actor.id}`} className="actor-name-link">
              <h3>{actor.name}</h3>
            </Link>
            <p>{actor.englishName}</p>
          </div>
          {actor.verified && <CheckCircle2 size={18} className="verified-icon" aria-label="已认证" />}
        </div>
        <div className="actor-mobile-summary">
          <span>{actor.playingAge}</span><i>·</i><span>{actor.city}</span>
        </div>
        <p className="actor-tagline">{actor.tagline}</p>
        <div className="tag-row">
          {actor.tags.slice(0, 3).map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <div className="actor-card-footer">
          <span><MapPin size={14} />{actor.city}</span>
          <span className="availability-dot">{actor.availability}</span>
        </div>
        <div className="actor-discovery-meta">
          <span><Clock3 size={12} />{actor.lastActive}活跃</span>
          {actor.acceptsTravel && <span><Route size={12} />可跨城</span>}
        </div>
      </div>
    </article>
  );
}
