import defaultSettings from '@/settings'

const title = defaultSettings.title || 'SQM-供应商质量系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
