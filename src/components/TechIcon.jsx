import {
  siPython, siApachekafka, siFlutter, siKotlin, siSwift, siReact, siNextdotjs, siTypescript, siSpringboot, siDotnet,
  siNestjs, siLaravel, siDocker, siJenkins, siAmazonwebservices, siVercel, siFirebase, siSupabase, siStripe, siPolygon,
  siPostgresql, siMysql, siMongodb, siHuggingface, siGooglegemini, siHtml5, siCss3, siJavascript, siFramer, siSonarqube,
  siPrometheus, siSqlite, siBlazor, siOpenjdk, siPhp, siExpress, siPrisma, siScikitlearn, siAndroid, siApple, siOllama, siMeta,
} from 'simple-icons'

// nom de techno (en minuscules, recherche par inclusion) → icône de marque officielle
const MAP = [
  ['python', siPython], ['kafka', siApachekafka], ['redpanda', siApachekafka], ['flutterflow', siFlutter], ['flutter', siFlutter],
  ['kotlin', siKotlin], ['compose', siAndroid], ['android', siAndroid], ['swiftui', siSwift], ['swift', siSwift], ['ios', siApple],
  ['react native', siReact], ['react', siReact], ['next', siNextdotjs], ['typescript', siTypescript], ['spring', siSpringboot],
  ['blazor', siBlazor], ['.net', siDotnet], ['asp', siDotnet], ['c#', siDotnet], ['nest', siNestjs], ['laravel', siLaravel],
  ['docker', siDocker], ['jenkins', siJenkins], ['aws', siAmazonwebservices], ['vercel', siVercel], ['firebase', siFirebase],
  ['supabase', siSupabase], ['stripe', siStripe], ['polygon', siPolygon], ['postgis', siPostgresql], ['postgres', siPostgresql],
  ['mysql', siMysql], ['mongo', siMongodb], ['hugging', siHuggingface], ['gemini', siGooglegemini], ['html', siHtml5],
  ['css', siCss3], ['javascript', siJavascript], ['framer', siFramer], ['sonar', siSonarqube], ['prometheus', siPrometheus],
  ['sqlite', siSqlite], ['java', siOpenjdk], ['php', siPhp], ['express', siExpress], ['prisma', siPrisma],
  ['scikit', siScikitlearn], ['ollama', siOllama], ['llama', siMeta],
]

export function iconFor(name = '') {
  const n = name.toLowerCase()
  return MAP.find(([k]) => n.includes(k))?.[1]
}

/** Puce de techno avec le vrai logo de la marque (si connu). */
export function TechChip({ name, dark }) {
  const ic = iconFor(name)
  const color = ic ? `#${ic.hex}` : undefined
  return (
    <span className={`tchip ${dark ? 'dark' : ''}`}>
      {ic && (
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden fill={dark && ['000000', '1A1A1A'].includes(ic.hex) ? '#fff' : color}>
          <path d={ic.path} />
        </svg>
      )}
      {name}
    </span>
  )
}
