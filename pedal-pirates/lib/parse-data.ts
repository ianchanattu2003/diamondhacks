import { Location, classroomsPixelToLatLong } from './map-utils'

export type Report = {
  source: string
  /** Description of object that was stolen. "What was stolen?" */
  object: string
  location: Location
  /** Description of location. "(UCPD Only) Where was it stolen?" */
  locationName: string
  lastSeen: {
    /** Date or date range. "What day did you last see it?" */
    date: string
    /** Time or time range. "Approximately what time did you last see it?" */
    time: string
  }
  /** Description and price of object that was stolen. "Summary, comments, details?" */
  details: string
}

export function parseData (tsv: string): Report[] {
  const reports: Report[] = []
  for (const line of tsv.trim().split(/\r?\n/).slice(1)) {
    const [type, object, x, y, locationName, date, time, , , details] =
      line.split('\t')
    if (type === 'IGNORE') {
      continue
    }
    console.log(x, y, classroomsPixelToLatLong(+x, +y))
    reports.push({
      source: type,
      object,
      location: classroomsPixelToLatLong(+x, +y),
      locationName,
      lastSeen: { date, time },
      details
    })
  }
  return reports
}
