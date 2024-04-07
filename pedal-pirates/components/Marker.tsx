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
  onClick?: () => void
}
export function Marker ({ reports, style, onClick }: MarkerProps) {
  const hasEmoji =
    reports.length === 1 && displayObject(reports[0].object) !== null

  return (
    <button
      className={`report report-${reports.length} ${
        hasEmoji ? 'has-emoji' : ''
      }`}
      style={style}
      onClick={e => {
        onClick?.()
        e.stopPropagation()
      }}
    >
      {reports.length === 1
        ? displayObject(reports[0].object) ?? '1'
        : reports.length}
    </button>
  )
}
