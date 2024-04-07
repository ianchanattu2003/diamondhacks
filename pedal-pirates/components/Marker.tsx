import { Report } from '@/lib/parse-data'
import { CSSProperties } from 'react'

function displayObject (object: string): string | null {
  object = object.toLowerCase()
  if (object.includes('bicycle')) {
    return '🚲'
  } else if (object.includes('scooter')) {
    return '🛴'
  } else {
    return null
  }
}

export type MarkerProps = {
  reports: Report[]
  style?: CSSProperties
}
export function Marker ({ reports, style }: MarkerProps) {
  const hasEmoji =
    reports.length === 1 && displayObject(reports[0].object) !== null

  return (
    <div
      className={`report report-${reports.length} ${
        hasEmoji ? 'has-emoji' : ''
      }`}
      style={style}
      data-reports={JSON.stringify(reports)}
    >
      {reports.length === 1
        ? displayObject(reports[0].object) ?? '1'
        : reports.length}
    </div>
  )
}
