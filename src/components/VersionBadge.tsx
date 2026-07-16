const version = import.meta.env.VITE_APP_VERSION || '0.0.0';
const buildId = import.meta.env.VITE_BUILD_ID || 'local';
const buildTime = import.meta.env.VITE_BUILD_TIME || '';

function formatBuildTime(value: string) {
  if (!value) return '本地开发版本';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export function VersionBadge() {
  return (
    <span
      className="version-badge"
      title={`幕见 CastLink v${version}\n构建：${buildId}\n时间：${formatBuildTime(buildTime)}`}
      aria-label={`当前版本 ${version}，构建 ${buildId}`}
    >
      <strong>v{version}</strong>
      <code>{buildId}</code>
    </span>
  );
}
