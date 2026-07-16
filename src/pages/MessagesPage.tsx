import {
  ArrowLeft,
  CheckCheck,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  MessageCircleMore,
  Mic,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';

type Identity = 'actor' | 'producer';

type Conversation = {
  id: string;
  identity: Identity;
  name: string;
  organization: string;
  project: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  stage: string;
  stageTone: 'green' | 'orange' | 'blue' | 'gray';
  initials: string;
  gradient: string;
  online?: boolean;
  verified?: boolean;
};

type ThreadMessage = {
  id: string;
  direction: 'incoming' | 'outgoing';
  text?: string;
  time: string;
  attachment?: {
    type: 'script' | 'video' | 'image';
    title: string;
    meta: string;
  };
};

const conversations: Conversation[] = [
  {
    id: 'deep-blue', identity: 'actor', name: '王珂', organization: '深蓝影业', project: '《沉默证词》', role: '顾沉｜刑警队长',
    lastMessage: '导演希望补录一段审讯室情绪转折，请在明天18:00前提交。', time: '10:26', unread: 2,
    stage: '补充试镜', stageTone: 'orange', initials: '王', gradient: 'linear-gradient(145deg,#183d31,#4d8d76)', online: true, verified: true,
  },
  {
    id: 'shiguang', identity: 'actor', name: '李然', organization: '拾光内容工作室', project: '《晚风来信》', role: '夏晴｜品牌策划',
    lastMessage: '你的档期已确认，稍后会发送线上围读时间。', time: '昨天', unread: 1,
    stage: '档期确认', stageTone: 'green', initials: '李', gradient: 'linear-gradient(145deg,#5b2d46,#bc7b95)', verified: true,
  },
  {
    id: 'wanxiang', identity: 'actor', name: '张茜', organization: '万象创意', project: '科技品牌年度影片', role: '创业公司创始人',
    lastMessage: '方便再发一组近期正装照片吗？希望是自然光环境。', time: '周一', unread: 0,
    stage: '资料沟通', stageTone: 'blue', initials: '张', gradient: 'linear-gradient(145deg,#243b5a,#7699c3)', online: true, verified: true,
  },
  {
    id: 'chaoxi', identity: 'actor', name: '赵制片', organization: '潮汐电影', project: '《回家吃饭》', role: '父亲｜家庭片主演',
    lastMessage: '项目将在周五安排第一轮线上沟通，时间确认后通知你。', time: '7月14日', unread: 0,
    stage: '初选通过', stageTone: 'green', initials: '赵', gradient: 'linear-gradient(145deg,#3b3025,#9b7452)', verified: true,
  },
  {
    id: 'zhou-lin', identity: 'producer', name: '周林', organization: '演员', project: '《沉默证词》', role: '顾沉｜刑警队长',
    lastMessage: '补录片段已上传，请您查收。', time: '10:41', unread: 1,
    stage: '待导演复看', stageTone: 'orange', initials: '周', gradient: 'linear-gradient(145deg,#172033,#61728d)', online: true, verified: true,
  },
  {
    id: 'yu-qing', identity: 'producer', name: '余晴', organization: '演员', project: '《晚风来信》', role: '夏晴｜品牌策划',
    lastMessage: '8月3日至10日档期没有冲突，可以参加线上围读。', time: '昨天', unread: 0,
    stage: '档期确认', stageTone: 'green', initials: '余', gradient: 'linear-gradient(145deg,#5c2840,#c889a1)', verified: true,
  },
  {
    id: 'chen-mu', identity: 'producer', name: '陈牧', organization: '演员', project: '《山河令旗》', role: '青年将领｜重要配角',
    lastMessage: '可以接受12天驻组，也有骑马和威亚经验。', time: '周二', unread: 0,
    stage: '条件确认', stageTone: 'blue', initials: '陈', gradient: 'linear-gradient(145deg,#34241a,#9f7558)', verified: true,
  },
];

const threadHistory: Record<string, ThreadMessage[]> = {
  'deep-blue': [
    { id: '1', direction: 'incoming', text: '周老师您好，我们正在为《沉默证词》的顾沉一角做最后一轮筛选。', time: '昨天 16:42' },
    { id: '2', direction: 'outgoing', text: '您好，我已经看过角色资料。8月12日至9月5日档期可以协调。', time: '昨天 16:48' },
    { id: '3', direction: 'incoming', time: '昨天 17:03', attachment: { type: 'script', title: '顾沉_审讯室补充试镜.pdf', meta: '4页 · 1.8MB' } },
    { id: '4', direction: 'incoming', text: '导演希望补录一段审讯室情绪转折。不要演得太外放，重点是人物压住情绪后的一次失控。', time: '今天 10:24' },
    { id: '5', direction: 'incoming', text: '请在明天18:00前通过平台提交，拍摄横屏中景即可。', time: '今天 10:26' },
  ],
  shiguang: [
    { id: '1', direction: 'incoming', text: '余老师您好，项目方看过您的资料，想确认8月3日至10日的拍摄档期。', time: '昨天 11:20' },
    { id: '2', direction: 'outgoing', text: '这段时间可以安排，杭州本地拍摄也没有问题。', time: '昨天 11:34' },
    { id: '3', direction: 'incoming', text: '好的，档期已记录。稍后会发送线上围读时间。', time: '昨天 11:40' },
  ],
  wanxiang: [
    { id: '1', direction: 'incoming', text: '您好，我们觉得您的商务形象和角色比较接近。', time: '周一 14:08' },
    { id: '2', direction: 'incoming', text: '方便再发一组近期正装照片吗？希望是自然光环境，不需要精修。', time: '周一 14:09' },
  ],
  chaoxi: [
    { id: '1', direction: 'incoming', text: '您的资料已进入第一轮候选名单。', time: '7月14日 09:18' },
    { id: '2', direction: 'incoming', text: '项目将在周五安排线上沟通，时间确认后通知您。', time: '7月14日 09:20' },
  ],
  'zhou-lin': [
    { id: '1', direction: 'outgoing', text: '周老师，导演希望补录一段审讯室情绪转折，请控制在90秒内。', time: '今天 10:24' },
    { id: '2', direction: 'incoming', text: '收到。我会按照克制到失控的方向准备，下午完成录制。', time: '今天 10:31' },
    { id: '3', direction: 'incoming', time: '今天 10:41', attachment: { type: 'video', title: '顾沉_补充试镜_v2.mp4', meta: '01:22 · 86MB' } },
    { id: '4', direction: 'incoming', text: '补录片段已上传，请您查收。', time: '今天 10:41' },
  ],
  'yu-qing': [
    { id: '1', direction: 'outgoing', text: '想确认一下8月3日至10日的拍摄档期。', time: '昨天 09:12' },
    { id: '2', direction: 'incoming', text: '这段时间没有冲突，可以参加线上围读。', time: '昨天 09:28' },
  ],
  'chen-mu': [
    { id: '1', direction: 'outgoing', text: '项目需要12天驻组，并包含骑马和基础威亚动作。', time: '周二 18:20' },
    { id: '2', direction: 'incoming', text: '可以接受12天驻组，也有骑马和威亚经验。', time: '周二 18:31' },
  ],
};

const filters = ['全部', '未读', '待回复', '试镜', '定角'];

export function MessagesPage() {
  const [identity, setIdentity] = useState<Identity>('actor');
  const [activeFilter, setActiveFilter] = useState('全部');
  const [keyword, setKeyword] = useState('');
  const [selectedId, setSelectedId] = useState('deep-blue');
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [localThreads, setLocalThreads] = useState<Record<string, ThreadMessage[]>>(threadHistory);

  const identityConversations = useMemo(() => conversations.filter((conversation) => conversation.identity === identity), [identity]);
  const visibleConversations = useMemo(() => identityConversations.filter((conversation) => {
    const searchText = [conversation.name, conversation.organization, conversation.project, conversation.role, conversation.lastMessage].join(' ').toLowerCase();
    const matchesKeyword = !keyword || searchText.includes(keyword.toLowerCase());
    const matchesFilter = activeFilter === '全部'
      || (activeFilter === '未读' && conversation.unread > 0)
      || (activeFilter === '待回复' && ['补充试镜', '资料沟通', '条件确认'].includes(conversation.stage))
      || (activeFilter === '试镜' && ['补充试镜', '待导演复看'].includes(conversation.stage))
      || (activeFilter === '定角' && conversation.stage === '初选通过');
    return matchesKeyword && matchesFilter;
  }), [activeFilter, identityConversations, keyword]);

  const selected = identityConversations.find((conversation) => conversation.id === selectedId) ?? identityConversations[0];
  const messages = selected ? localThreads[selected.id] ?? [] : [];
  const unreadTotal = identityConversations.reduce((total, conversation) => total + conversation.unread, 0);

  const changeIdentity = (next: Identity) => {
    setIdentity(next);
    const first = conversations.find((conversation) => conversation.identity === next);
    if (first) setSelectedId(first.id);
    setMobileThreadOpen(false);
  };

  const openConversation = (id: string) => {
    setSelectedId(id);
    setMobileThreadOpen(true);
  };

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !selected) return;
    const nextMessage: ThreadMessage = { id: `${Date.now()}`, direction: 'outgoing', text, time: '刚刚' };
    setLocalThreads((current) => ({ ...current, [selected.id]: [...(current[selected.id] ?? []), nextMessage] }));
    setDraft('');
  };

  return (
    <section className={`messages-page ${mobileThreadOpen ? 'is-thread-open' : ''}`}>
      <div className="container messages-page-heading">
        <div>
          <span className="eyebrow"><MessageCircleMore size={15} />沟通中心</span>
          <h1>消息</h1>
          <p>所有沟通都与具体项目和角色绑定，不再与普通系统提醒混在一起。</p>
        </div>
        <div className="identity-switch" aria-label="切换沟通身份">
          <button type="button" className={identity === 'actor' ? 'is-active' : ''} onClick={() => changeIdentity('actor')}>我是演员</button>
          <button type="button" className={identity === 'producer' ? 'is-active' : ''} onClick={() => changeIdentity('producer')}>我是项目方</button>
        </div>
      </div>

      <div className="container communication-summary">
        <div><strong>{unreadTotal}</strong><span>条未读消息</span></div>
        <div><strong>{identity === 'actor' ? 2 : 3}</strong><span>{identity === 'actor' ? '个待回复事项' : '位候选人待跟进'}</span></div>
        <button type="button"><ShieldCheck size={16} />沟通仅对项目双方可见</button>
      </div>

      <div className="container messages-shell">
        <aside className="message-list-panel">
          <div className="message-list-toolbar">
            <label className="message-search"><Search size={17} /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索项目、角色或联系人" /></label>
            <div className="message-filter-row">{filters.map((filter) => <button type="button" key={filter} className={activeFilter === filter ? 'is-active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          </div>

          <div className="system-reminder-strip">
            <span><FileText size={16} /></span>
            <div><strong>2个试镜任务即将截止</strong><small>系统提醒独立展示，不占用双方会话</small></div>
            <ChevronRight size={16} />
          </div>

          <div className="conversation-list">
            {visibleConversations.map((conversation) => (
              <button type="button" key={conversation.id} className={`conversation-item ${selected?.id === conversation.id ? 'is-active' : ''}`} onClick={() => openConversation(conversation.id)}>
                <span className="conversation-avatar" style={{ background: conversation.gradient }}>{conversation.initials}{conversation.online ? <i /> : null}</span>
                <span className="conversation-copy">
                  <span className="conversation-title-row"><strong>{conversation.name}</strong><time>{conversation.time}</time></span>
                  <span className="conversation-role">{conversation.project} · {conversation.role}</span>
                  <span className="conversation-preview">{conversation.lastMessage}</span>
                  <span className={`conversation-stage tone-${conversation.stageTone}`}>{conversation.stage}</span>
                </span>
                {conversation.unread > 0 ? <em className="conversation-unread">{conversation.unread}</em> : null}
              </button>
            ))}
            {visibleConversations.length === 0 ? <div className="message-empty-state">没有匹配的会话</div> : null}
          </div>
        </aside>

        {selected ? (
          <section className="message-thread-panel">
            <header className="thread-header">
              <button type="button" className="thread-back-button" onClick={() => setMobileThreadOpen(false)} aria-label="返回会话列表"><ArrowLeft size={20} /></button>
              <span className="conversation-avatar thread-avatar" style={{ background: selected.gradient }}>{selected.initials}{selected.online ? <i /> : null}</span>
              <div><strong>{selected.name}</strong><span>{selected.organization}{selected.verified ? ' · 已认证' : ''}</span></div>
              <button type="button" className="thread-detail-button">项目详情<ChevronRight size={15} /></button>
            </header>

            <div className="thread-context-card">
              <div><span>当前沟通对应角色</span><strong>{selected.project} · {selected.role}</strong></div>
              <span className={`conversation-stage tone-${selected.stageTone}`}>{selected.stage}</span>
              <button type="button">{selected.stage.includes('试镜') || selected.stage.includes('复看') ? '查看试镜任务' : '查看角色资料'}</button>
            </div>

            <div className="thread-message-area">
              <div className="thread-date-divider"><span>最近沟通</span></div>
              {messages.map((message) => (
                <div key={message.id} className={`thread-message ${message.direction === 'outgoing' ? 'is-outgoing' : 'is-incoming'}`}>
                  <div className="message-bubble">
                    {message.text ? <p>{message.text}</p> : null}
                    {message.attachment ? (
                      <button type="button" className="message-attachment">
                        <span>{message.attachment.type === 'script' ? <FileText size={20} /> : null}{message.attachment.type === 'video' ? <Video size={20} /> : null}{message.attachment.type === 'image' ? <ImageIcon size={20} /> : null}</span>
                        <div><strong>{message.attachment.title}</strong><small>{message.attachment.meta}</small></div>
                        <ChevronRight size={16} />
                      </button>
                    ) : null}
                  </div>
                  <span className="message-meta">{message.time}{message.direction === 'outgoing' ? <CheckCheck size={13} /> : null}</span>
                </div>
              ))}
            </div>

            <form className="message-composer" onSubmit={sendMessage}>
              <button type="button" className="composer-tool" aria-label="添加附件"><Paperclip size={19} /></button>
              <label><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="输入消息，沟通项目与角色细节" /></label>
              <button type="button" className="composer-tool" aria-label="发送语音"><Mic size={19} /></button>
              <button type="submit" className="composer-send" aria-label="发送消息"><Send size={18} /></button>
            </form>
          </section>
        ) : null}
      </div>
    </section>
  );
}
