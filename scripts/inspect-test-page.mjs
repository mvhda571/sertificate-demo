const url = process.argv[2]
const response = await fetch(url)
const html = new TextDecoder('windows-1251').decode(await response.arrayBuffer())
for (const match of html.matchAll(/<(?:a|form)[^>]+(?:href|action)=["']([^"']+)["'][^>]*>([\s\S]*?)<\/(?:a|form)>/gi)) {
  const label = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (process.argv.includes('--all') || /onlayn|test|uzbmb|pdf|ko‘rsat|ko'rsat/i.test(`${match[1]} ${label}`)) console.log(`${match[1]} :: ${label}`)
}
for (const match of html.matchAll(/<(?:input|button)[^>]*>/gi)) if (/online|test|show|pdf/i.test(match[0])) console.log(match[0])
