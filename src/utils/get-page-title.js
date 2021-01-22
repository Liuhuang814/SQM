import defaultSettings from '@/settings'

const title = defaultSettings.title || '皓酌SQM-供应商质量系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
