export type Point = {
  x: number
  y: number
}
export type Location = {
  latitude: number
  longitude: number
}

export const MAX_ZOOM = 20
const SCALE = 2 ** (7 + MAX_ZOOM)

/**
 * Converts a geographic coordinate to a point on the map at the highest zoom
 * level.
 */
export function latLongToPoint ({ latitude, longitude }: Location): Point {
  return {
    x: SCALE * (longitude / 180 + 1),
    y:
      SCALE *
      (Math.log(Math.tan(Math.PI / 4 + (latitude * Math.PI) / 360)) / Math.PI +
        1)
  }
}
