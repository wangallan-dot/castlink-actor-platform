import {
  BriefcaseBusiness,
  Clapperboard,
  ClipboardList,
  Home,
  MessageCircleMore,
  Search,
  UserRound,
  UsersRound,
} from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useIdentity } from '../context/useIdentity';
import { DiscoveryNav } from './DiscoveryNav';
import { VersionBadge } from './VersionBadge';

const desktopNavItems = [
  { to: '/recruitments', label: '剧组招募' },
  { to: '/actors', label: '浏览演员' },
  { to: '/messages', label: '消息' },
];

const actorTabs = [
  { to: '/', label: '首页', icon: Home, end: true },
  { to: '/recruitments', label: '剧组招募', icon: BriefcaseBusiness },
  { to: '/messages', label: '消息', icon: MessageCircleMore, badge: 3 },
  { to: '/applications', label: '申请', icon: ClipboardList },
  { to: '/profile/edit', label: '我的', icon: UserRound },
];

const crewTabs = [
  { to: '/', label: '首页', icon: Home, end: true },
  { to: '/actors', label: '演员', icon: UsersRound },
  { to: '/messages', label: '消息', icon: MessageCircleMore, badge: 3 },
  { to: '/recruitment/manage', label: '招募管理', icon: ClipboardList },
  { to: '/profile/edit', label: '我的', icon: UserRound },
];

export function Layout() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { identity, toggleIdentity } = useIdentity();
  const mobileTabs = identity === 'actor' ? actorTabs : crewTabs;
  const showDiscoveryNav = ['/', '/actors', '/recruitments', '/roles'].includes(location.pathname);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const keyword = search.trim();
    navigate(keyword ? `/actors?q=${encodeURIComponent(keyword)}` : '/actors');
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="幕见首页">
            <span className="brand-mark"><Clapperboard size={19} /></span>
            <span className="brand-copy">
              <strong>幕见</strong>
              <small>CASTLINK</small>
            </span>
          </Link>
          <VersionBadge />

          <nav className="desktop-nav" aria-label="主导航">
            {desktopNavItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <form className="header-search" onSubmit={submitSearch}>
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索演员、地区、招募"
              aria-label="搜索演员或剧组招募"
            />
          </form>

          <div className="header-actions">
            <button type="button" className="identity-mode-button" onClick={toggleIdentity}>
              {identity === 'actor' ? '演员端' : '剧组端'}<span>切换</span>
            </button>
            <Link to="/messages" className="button button-ghost button-small header-message-link">
              <MessageCircleMore size={16} />消息<span className="header-message-count">3</span>
            </Link>
          </div>

          <div className="mobile-header-actions">
            <button type="button" className="mobile-identity-button" onClick={toggleIdentity}>
              {identity === 'actor' ? '演员端' : '剧组端'}
            </button>
            <Link to="/messages" className="mobile-message-button" aria-label="打开消息中心">
              <MessageCircleMore size={19} />
              <span>消息</span>
              <strong>3</strong>
            </Link>
          </div>
        </div>
      </header>

      {showDiscoveryNav && <DiscoveryNav />}

      <main key={`${location.pathname}${location.search}`} className="page-transition mobile-app-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand footer-brand">
              <span className="brand-mark"><Clapperboard size={19} /></span>
              <span className="brand-copy"><strong>幕见</strong><small>CASTLINK</small></span>
            </Link>
            <p>演员浏览剧组招募，剧组发现合适演员，双方围绕具体项目直接沟通。</p>
          </div>
          <div>
            <strong>演员</strong>
            <Link to="/recruitments">浏览剧组招募</Link>
            <Link to="/applications">申请与试镜</Link>
            <Link to="/messages">项目沟通</Link>
          </div>
          <div>
            <strong>剧组</strong>
            <Link to="/actors">浏览演员</Link>
            <Link to="/recruitment/manage">招募管理</Link>
            <Link to="/messages">演员沟通</Link>
          </div>
          <div>
            <strong>平台</strong>
            <span>身份认证</span>
            <span>招募审核</span>
            <span>隐私与安全</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 CASTLINK MVP</span>
          <span>当前为产品验证版本，页面数据均为演示内容</span>
        </div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label={`${identity === 'actor' ? '演员端' : '剧组端'}主导航`}>
        {mobileTabs.map(({ to, label, icon: Icon, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => isActive ? 'mobile-tab is-active' : 'mobile-tab'}
          >
            <span className="mobile-tab-icon">
              <Icon size={21} strokeWidth={label === '消息' ? 2.3 : 2} />
              {badge ? <em className="mobile-tab-badge">{badge}</em> : null}
            </span>
            <small>{label}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
