import { ChevronDown, MapPin } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { discoveryRegions, extraRegions } from '../data';
import { REGION_STORAGE_KEY } from '../utils/region';

const channels = [
  { to: '/', label: '推荐', end: true },
  { to: '/recruitments', label: '剧组招募' },
  { to: '/actors', label: '演员' },
];

export function DiscoveryNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showExtraRegions, setShowExtraRegions] = useState(false);
  const params = new URLSearchParams(location.search);
  const storedRegion = window.localStorage.getItem(REGION_STORAGE_KEY) || '全国';
  const region = params.get('region') || storedRegion;

  const chooseRegion = (nextRegion: string) => {
    window.localStorage.setItem(REGION_STORAGE_KEY, nextRegion);
    const next = new URLSearchParams(location.search);
    if (nextRegion === '全国') next.delete('region');
    else next.set('region', nextRegion);
    navigate({ pathname: location.pathname, search: next.toString() ? `?${next.toString()}` : '' });
    setShowExtraRegions(false);
  };

  const channelHref = (pathname: string) => {
    const next = new URLSearchParams();
    if (region !== '全国') next.set('region', region);
    return `${pathname}${next.toString() ? `?${next.toString()}` : ''}`;
  };

  return (
    <div className="discovery-nav-shell">
      <nav className="discovery-channel-nav" aria-label="内容频道">
        {channels.map((channel) => (
          <NavLink
            key={channel.to}
            to={channelHref(channel.to)}
            end={channel.end}
            className={({ isActive }) => isActive ? 'is-active' : ''}
          >
            {channel.label}
          </NavLink>
        ))}
      </nav>

      <div className="discovery-region-wrap">
        <div className="discovery-region-nav" aria-label="地区筛选">
          <span className="region-location-label"><MapPin size={14} />地区</span>
          {discoveryRegions.map((item) => item === '更多' ? (
            <button
              type="button"
              key={item}
              className={extraRegions.includes(region) ? 'is-active' : ''}
              onClick={() => setShowExtraRegions((value) => !value)}
            >
              {extraRegions.includes(region) ? region : '更多'}<ChevronDown size={12} />
            </button>
          ) : (
            <button type="button" key={item} className={region === item ? 'is-active' : ''} onClick={() => chooseRegion(item)}>
              {item}
            </button>
          ))}
        </div>
        {showExtraRegions && (
          <div className="extra-region-panel">
            {extraRegions.map((item) => (
              <button type="button" key={item} className={region === item ? 'is-active' : ''} onClick={() => chooseRegion(item)}>{item}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

