import type { Recruitment } from '../types';

export type DeadlineTone = 'normal' | 'soon' | 'urgent' | 'closed';

export type DeadlineInfo = {
  tone: DeadlineTone;
  label: string;
  detail: string;
  remainingHours: number;
  isClosed: boolean;
};

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export function getDeadlineInfo(deadline: string, now = new Date()): DeadlineInfo {
  const target = new Date(deadline);
  const diff = target.getTime() - now.getTime();
  const remainingHours = Math.max(0, Math.ceil(diff / HOUR));
  const formatted = new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(target);

  if (diff <= 0) {
    return { tone: 'closed', label: '已截止', detail: `${formatted}截止`, remainingHours: 0, isClosed: true };
  }

  if (diff <= DAY) {
    return {
      tone: 'urgent',
      label: remainingHours <= 6 ? `剩余${remainingHours}小时` : '今日截止',
      detail: `${formatted}截止`,
      remainingHours,
      isClosed: false,
    };
  }

  if (diff <= 3 * DAY) {
    const days = Math.ceil(diff / DAY);
    return { tone: 'soon', label: `${days}天后截止`, detail: `${formatted}截止`, remainingHours, isClosed: false };
  }

  const days = Math.ceil(diff / DAY);
  return { tone: 'normal', label: `剩余${days}天`, detail: `${formatted}截止`, remainingHours, isClosed: false };
}

export function recruitmentMatchesRegion(recruitment: Recruitment, region: string) {
  return region === '全国' || recruitment.city === region;
}

export function actorMatchesRegion(workRegions: string[], city: string, region: string) {
  return region === '全国' || city === region || workRegions.includes(region);
}
