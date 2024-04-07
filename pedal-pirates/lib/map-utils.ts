// https://github.com/SheepTester/uxdy/blob/main/classrooms/lib/locations.ts
// https://github.com/SheepTester/offline-ucsd-map/blob/main/src/view/lat-long.ts

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

/**
 * Converts a pixel location in the [classrooms map image][map] to a latitude
 * and longitude position.
 *
 * [map]: https://sheeptester.github.io/uxdy/classrooms/map.webp
 */
export function classroomsPixelToLatLong (x: number, y: number): Location {
  const zoom = 17
  const tileSize = 2 ** (MAX_ZOOM - zoom) * 256
  const tileX = (x / 256 + 22845) * tileSize
  const tileY = ((2816 - y) / 256 + 78217) * tileSize
  return {
    longitude: (tileX / SCALE - 1) * 180,
    latitude:
      ((Math.atan(Math.exp((tileY / SCALE - 1) * Math.PI)) - Math.PI / 4) *
        360) /
      Math.PI
  }
}
