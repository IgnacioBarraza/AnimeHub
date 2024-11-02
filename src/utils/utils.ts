export const languageFlags: { [key: string]: string } = {
  en: '/flags/en.svg', // English
  ja: '/flags/jp.svg', // Japanese
  ko: '/flags/kr.svg', // Korean
  zh: '/flags/cn.svg', // Chinese
  fr: '/flags/fr.svg', // French
  de: '/flags/de.svg', // German
  es: '/flags/es.svg', // Spanish spain
  it: '/flags/it.svg', // Italian
  ru: '/flags/ru.svg', // Russian
  pt: '/flags/pt.svg', // Portuguese
  'es-la': '/flags/es-la.svg', // Spanish mexico
  tr: '/flags/tr.svg',
  lt: '/flags/lt.svg',
  th: '/flags/th.svg',
  uk: '/flags/uk.svg',
  vi: '/flags/vi.svg',
  id: '/flags/id.svg',
  'zh-hk': '/flags/zh-hk.svg',
  ar: '/flags/ar.svg',
  he: '/flags/he.svg',
  fa: '/flags/fa.svg',
  'ja-ro': '/flags/jp.svg',
  ne: '/flags/ne.svg'
}

export const languageTranslate: { [key: string]: string } = {
  en: 'English', // English
  ja: 'Japanese', // Japanese
  ko: 'Korean', // Korean
  zh: 'Chinese Simplified', // Chinese
  fr: 'French', // French
  de: 'German', // German
  es: 'Spanish (Spain)', // Spanish spain
  it: 'Italian', // Italian
  ru: 'Russian', // Russian
  pt: 'Portuguese (Brasil)', // Portuguese
  'es-la': 'Spanish (Latam)', // Spanish mexico
  tr: 'Turkish',
  lt: 'Lithuania',
  th: 'Thai',
  uk: 'Ukraine',
  vi: 'Vietnamese',
  id: 'Indonesian',
  'zh-hk': 'Chinese (Hong Kong)',
  ar: 'Arabic',
  he: 'Hebrew',
  fa: 'Persian',
  'ja-ro': 'Japanese (Romanized)',
  ne: 'Nepali'
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'ongoing':
      return 'text-green-500'
    case 'completed':
      return 'text-blue-500'
    case 'hiatus':
      return 'text-amber-600'
    case 'FINISHED':
      return 'text-blue-500'
    case 'RELEASING':
      return 'text-green-500'
    case 'NOT_YET_RELEASED':
      return 'text-amber-500'
    case 'CANCELLED':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

export const statusDict = {
  RELEASING: 'Airing',
  FINISHED: 'Finished',
  NOT_YET_RELEASED: 'Not Yet Aired',
  CANCELLED: 'Cancelled',
}

export const platformColors: { [key: string]: string } = {
  Crunchyroll: 'bg-orange-500 hover:bg-orange-700',
  Netflix: 'bg-red-700 hover:bg-red-900',
  Hulu: 'bg-green-500 hover:bg-green-700',
  'Amazon Prime Video': 'bg-yellow-600 hover:bg-yellow-800',
  iQ: 'bg-blue-500 hover:bg-blue-700',
  'Official Site': 'bg-gray-500 hover:bg-gray-700',
  'Bilibili TV': 'bg-sky-400 hover:bg-sky-600',
  YouTube: 'bg-red-600 hover:bg-red-800',
  'Tubi TV': 'bg-yellow-500 hover:bg-yellow-700',
  'Adult Swim': 'bg-black'
}

function formatDescription(description: string) {
  return description
    .replace(/\n/g, '')
    .replace(/<br\s*\/?>/gi, '<br>')
    .replace(/<i>(.*?)<\/i>/gi, '<em>$1</em>')
    .replace(/<strong>(.*?)<\/strong>/gi, '<strong>$1</strong>')
    .replace(/\(Source:\s*(.*?)\)/gi, '<p><strong>Source:</strong> $1</p>')
}

function extractTextFromHtml(html: string) {
  // Use a temporary element to parse HTML and get plain text
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  return tempDiv.textContent || tempDiv.innerText || ''
}

export function formatDescriptionWithLimit(description: string, limit: number, showFullDescription: unknown) {
  // Format and extract plain text for character count
  const formattedDescription = formatDescription(description)
  const plainText = extractTextFromHtml(formattedDescription)

  // Check if the full description should be displayed
  if (showFullDescription || plainText.length <= limit) {
    return formattedDescription // Return full formatted description
  } else {
    // Limit the plain text and reformat it
    const limitedText = plainText.slice(0, limit) + '...'
    return formatDescription(limitedText)
  }
}