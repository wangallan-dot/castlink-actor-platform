import {
  BriefcaseBusiness,
  CalendarDays,
  Clapperboard,
  ClipboardCopy,
  FilePenLine,
  Home,
  ImagePlus,
  MessageCircleMore,
  Plus,
  Search,
  UserRound,
  UsersRound,
  Video,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
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
  { kind: 'link' as const, to: '/', label: '首页', icon: Home, end: true },
  { kind: 'link' as const, to: '/recruitments', label: '招募', icon: BriefcaseBusiness },
  { kind: 'publish' as const, label: '发布', icon: Plus },
  { kind: 'link' as const, to: '/messages', label: '消息', icon: MessageCircleMore, badge: 3 },
  { kind: 'link' as const, to: '/me', label: '我', icon: UserRound },
];

const crewTabs = [
  { kind: 'link' as const, to: '/', label: '首页', icon: Home, end: true },
  { kind: 'link' as const, to: '/actors', label: '演员', icon: UsersRound },
  { kind: 'publish' as const, label: '发布', icon: Plus },
  { kind: 'link' as const, to: '/messages', label: '消息', icon: MessageCircleMore, badge: 3 },
  { kind: 'link' as const, to: '/me', label: '我', icon: UserRound },
];

function ScrollMemory() {
  const location = useLocation();

  useEffect(() => {
    const key = `castlink:scroll:${location.pathname}${location.search}`;
    const saved = Number(window.sessionStorage.getItem(key) || 0);
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: saved, behavior: 'auto' }));
    let ticking = false;

    const remember = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        window.sessionStorage.setItem(key, String(window.scrollY));
        ticking = false;
      });
    };

    window.addEventListener('scroll', remember, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.sessionStorage.setItem(key, String(window.scrollY));
      window.removeEventListener('scroll', remember);
    };
  }, [location.pathname, location.search]);

  return null;
}

export function Layout() {
  const [search, setSearch] = useState('');
  const [publishOpen, setPublishOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { identity } = useIdentity();
  const mobileTabs = identity === 'actor' ? actorTabs : crewTabs;
  const showDiscoveryNav = location.pathname === '/';
  const showMobileSearch = ['/', '/actors', '/recruitments'].some((path) => location.pathname === path);
  const searchTarget = location.pathname.startsWith('/recruitments') || (location.pathname === '/' && identity === 'actor')
    ? '/recruitments'
    : '/actors';

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const keyword = search.trim();
    navigate(keyword ? `${searchTarget}?q=${encodeURIComponent(keyword)}` : searchTarget);
  };

  const openContextSearch = () => navigate(`${searchTarget}?focusSearch=1`);

  const isTabActive = (to: string, end?: boolean) => {
    if (to === '/me') return location.pathname === '/me' || location.pathname.startsWith('/profile/edit');
    return end ? location.pathname === to : location.pathname.startsWith(to);
  };

  const publishActions = identity === 'actor'
    ? [
        { to: '/profile/edit?section=availability', icon: CalendarDays, title: '更新档期', description: '标记可以进组的时间与地区' },
        { to: '/profile/edit?section=video', icon: Video, title: '上传表演视频', description: '补充Showreel、自我介绍或技能展示' },
        { to: '/profile/edit?section=photos', icon: ImagePlus, title: '上传新照片', description: '更新近期形象照与全身照' },
        { to: '/profile/edit', icon: FilePenLine, title: '编辑演员卡', description: '完善履历、技能和公开资料' },
      ]
    : [
        { to: '/recruitment/manage?create=true', icon: Plus, title: '发布剧组招募', description: '新建项目并填写招募人物' },
        { to: '/recruitment/manage?tab=drafts', icon: FilePenLine, title: '继续编辑草稿', description: '恢复尚未发布的招募内容' },
        { to: '/recruitment/manage?copy=latest', icon: ClipboardCopy, title: '复制历史招募', description: '从已有项目快速创建新招募' },
      ];

  return (
    <div className="app-shell">
      <ScrollMemory />
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="幕见首页">
            <span className="brand-mark"><Clapperboard size={19} /></span>
            <span className="brand-copy"><strong>幕见</strong><small>CASTLINK</small></span>
          </Link>
          <VersionBadge />

          <nav className="desktop-nav" aria-label="主导航">
            {desktopNavItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>{item.label}</NavLink>
            ))}
          </nav>

          <form className="header-search" onSubmit={submitSearch}>
            <Search size={16} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchTarget === '/actors' ? '搜索演员' : '搜索剧组招募'} aria-label="搜索" />
          </form>

          <div className="header-actions">
            <Link to="/messages" className="button button-ghost button-small header-message-link"><MessageCircleMore size={16} />消息<span className="header-message-count">3</span></Link>
            <Link to="/me" className="button button-ghost button-small"><UserRound size={16} />我的</Link>
          </div>

          <div className="mobile-header-actions">
            {showMobileSearch && <button type="button" className="mobile-search-entry" onClick={openContextSearch} aria-label="搜索"><Search size={21} /></button>}
          </div>
        </div>
      </header>

      {showDiscoveryNav && <DiscoveryNav />}

      <main className="page-transition mobile-app-main"><Outlet /></main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div><Link to="/" className="brand footer-brand"><span className="brand-mark"><Clapperboard size={19} /></span><span className="brand-copy"><strong>幕见</strong><small>CASTLINK</small></span></Link><p>演员自然地逛招募，剧组自然地逛演员，找到目标后再进入申请、邀请和沟通。</p></div>
          <div><strong>演员</strong><Link to="/recruitments">浏览剧组招募</Link><Link to="/applications">申请与试镜</Link><Link to="/messages">项目沟通</Link></div>
          <div><strong>剧组</strong><Link to="/actors">浏览演员</Link><Link to="/recruitment/manage">招募管理</Link><Link to="/messages">演员沟通</Link></div>
          <div><strong>平台</strong><span>身份认证</span><span>招募审核</span><span>隐私与安全</span></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 CASTLINK MVP</span><span>当前为产品验证版本，页面数据均为演示内容</span></div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label={`${identity === 'actor' ? '演员端' : '剧组端'}主导航`}>
        {mobileTabs.map((item) => {
          const Icon = item.icon;
          if (item.kind === 'publish') {
            return (
              <button type="button" key="publish" className="mobile-tab mobile-publish-tab" onClick={() => setPublishOpen(true)}>
                <span className="mobile-publish-icon"><Icon size={27} strokeWidth={2.5} /></span><small>{item.label}</small>
              </button>
            );
          }

          const active = isTabActive(item.to, item.end);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={active ? 'mobile-tab is-active' : 'mobile-tab'}
              onClick={(event) => {
                if (active) {
                  event.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <span className="mobile-tab-icon"><Icon size={21} strokeWidth={item.label === '消息' ? 2.3 : 2} />{item.badge ? <em className="mobile-tab-badge">{item.badge}</em> : null}</span>
              <small>{item.label}</small>
            </Link>
          );
        })}
      </nav>

      {publishOpen && (
        <div className="publish-sheet-backdrop" onClick={() => setPublishOpen(false)}>
          <section className="publish-sheet" onClick={(event) => event.stopPropagation()} aria-label="快捷发布">
            <header><div><strong>{identity === 'actor' ? '更新演员资料' : '发布剧组招募'}</strong><span>{identity === 'actor' ? '让剧组看到最新的你' : '从一个清晰的招募开始'}</span></div><button type="button" onClick={() => setPublishOpen(false)} aria-label="关闭"><X size={21} /></button></header>
            <div className="publish-action-list">
              {publishActions.map(({ to, icon: ActionIcon, title, description }) => (
                <Link key={title} to={to} onClick={() => setPublishOpen(false)}><span><ActionIcon size={21} /></span><div><strong>{title}</strong><small>{description}</small></div></Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
