import {
  Bell,
  BriefcaseBusiness,
  Clapperboard,
  Home,
  LayoutDashboard,
  Search,
  UserRound,
} from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { VersionBadge } from './VersionBadge';

const desktopNavItems = [
  { to: '/actors', label: '找演员' },
  { to: '/roles', label: '找角色' },
  { to: '/dashboard/producer', label: '选角工作台' },
  { to: '/dashboard/actor', label: '演员工作台' },
];

const mobileTabs = [
  { to: '/', label: '首页', icon: Home, end: true },
  { to: '/actors', label: '演员', icon: Search },
  { to: '/roles', label: '角色', icon: BriefcaseBusiness },
  { to: '/dashboard/actor', label: '工作台', icon: LayoutDashboard },
  { to: '/profile/edit', label: '我的', icon: UserRound },
];

export function Layout() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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
              placeholder="搜索演员、城市、角色气质"
              aria-label="搜索演员"
            />
          </form>

          <div className="header-actions">
            <Link to="/profile/edit" className="button button-ghost button-small">
              <UserRound size={16} />创建演员卡
            </Link>
          </div>

          <div className="mobile-header-actions">
            <Link to="/actors" className="mobile-header-button" aria-label="搜索演员"><Search size={20} /></Link>
            <Link to="/dashboard/actor" className="mobile-header-button" aria-label="查看通知">
              <Bell size={20} />
              <span className="notification-dot" />
            </Link>
          </div>
        </div>
      </header>

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
            <p>让演员被专业地展示，让合适的人更快找到合适的角色。</p>
          </div>
          <div>
            <strong>演员</strong>
            <Link to="/profile/edit">创建演员卡</Link>
            <Link to="/roles">浏览角色</Link>
            <Link to="/dashboard/actor">演员工作台</Link>
          </div>
          <div>
            <strong>项目方</strong>
            <Link to="/actors">搜索演员</Link>
            <Link to="/dashboard/producer">选角工作台</Link>
            <Link to="/roles">发布角色</Link>
          </div>
          <div>
            <strong>平台</strong>
            <span>实名认证</span>
            <span>项目审核</span>
            <span>隐私与安全</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 CASTLINK MVP</span>
          <span>当前为产品验证版本，数据均为演示内容</span>
        </div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="移动端主导航">
        {mobileTabs.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => isActive ? 'mobile-tab is-active' : 'mobile-tab'}
          >
            <span className="mobile-tab-icon"><Icon size={21} strokeWidth={isMobilePrimary(label) ? 2.2 : 2} /></span>
            <small>{label}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

function isMobilePrimary(label: string) {
  return label === '演员' || label === '角色';
}
