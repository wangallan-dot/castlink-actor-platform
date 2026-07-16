import { Link } from 'react-router-dom';
export function NotFoundPage() { return <section className="not-found"><span>404</span><h1>页面不存在</h1><p>你访问的演员、角色或页面可能已被移除。</p><Link to="/" className="button button-primary">返回首页</Link></section>; }
