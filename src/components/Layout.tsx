import { Clapperboard, Menu, Search, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/actors', label: '找演员' },
  { to: '/roles', label: '找角色' },
  { to: '/dashboard/producer', label: '选角工作台' },
  { to: '/dashboard/actor', label: '演员工作台' },
];

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const keyword = search.trim();
    navigate(keyword ? `/actors?q=${encodeURIComponent(keyword)}` : '/actors');
    setMobileOpen(false);
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
            <span className="brand-mark"><Clapperboard size={19} /></span>
            <span className="brand-copy">
              <strong>幕见</strong>
              <small>CASTLINK</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="主导航">
            {navItems.map((item) => (
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
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="打开导航菜单"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-nav-panel">
            <form className="mobile-search" onSubmit={submitSearch}>
              <Search size={17} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索演员" />
            </form>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/profile/edit" onClick={() => setMobileOpen(false)}>创建演员卡</Link>
          </div>
        )}
      </header>

      <main key={location.pathname} className="page-transition">
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
    </div>
  );
}
