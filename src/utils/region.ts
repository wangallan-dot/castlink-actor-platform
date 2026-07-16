export const REGION_STORAGE_KEY = 'castlink:region';

export function readRegion(search: string) {
  const params = new URLSearchParams(search);
  return params.get('region') || window.localStorage.getItem(REGION_STORAGE_KEY) || '全国';
}

export function writeRegion(region: string) {
  window.localStorage.setItem(REGION_STORAGE_KEY, region);
}
