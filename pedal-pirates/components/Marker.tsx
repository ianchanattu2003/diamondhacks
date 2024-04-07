import { Report } from '@/lib/parse-data'
import { CSSProperties } from 'react'

export type MarkerProps = {
  reports: Report[]
  style?: CSSProperties
}
export function Marker ({ reports, style }: MarkerProps) {
  return (
    <button className={`report report-${reports.length}`} style={style}>
      {reports.length === 1 ? '1' : reports.length}
    </button>
  )
}
