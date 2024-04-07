'use client'

import { Location, MAX_ZOOM, Point, latLongToPoint } from '@/lib/map-utils'
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { ImageWithLoadingAnimation } from './ImageWithLoadingAnimation'
import { Report } from '@/lib/parse-data'
import { Marker } from './Marker'

type Rectangle = {
  x: number
  y: number
  width: number
  height: number
}

const HOST = 'https://assets.concept3d.com/assets/1005/1005_Map_11'
const LABEL_HOST =
  'https://assets.concept3d.com/assets/1005/1005_BuildingLabels_Mar2024'

/** Visual size of each tile, in pixels. */
const TILE_SIZE = 256

export type MapProps = {
  corner1: Location
  corner2: Location
  zoom: number
  reports: Report[]
}
export function Map ({ corner1, corner2, zoom, reports }: MapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [viewport, setViewport] = useState<Rectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  useEffect(() => {
    const observer = new ResizeObserver(([{ contentBoxSize }]) => {
      const [{ blockSize, inlineSize }] = contentBoxSize
      setViewport(viewport => ({
        ...viewport,
        width: inlineSize,
        height: blockSize
      }))
    })
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  /** Size of each tile at the largest zoom level. */
  const tileSize = 2 ** (MAX_ZOOM - zoom) * TILE_SIZE
  const range = useMemo(() => {
    const p1 = latLongToPoint(corner1)
    const p2 = latLongToPoint(corner2)
    const x = Math.floor(Math.min(p1.x, p2.x) / tileSize)
    const y = Math.floor(Math.min(p1.y, p2.y) / tileSize)
    return {
      x,
      y,
      width: Math.ceil(Math.max(p1.x, p2.x) / tileSize) - x,
      height: Math.ceil(Math.max(p1.y, p2.y) / tileSize) - y
    }
  }, [zoom, corner1, corner2])

  const tiles = useMemo(() => {
    const tiles: Point[] = []
    const startX = Math.floor(viewport.x / TILE_SIZE)
    const endX = Math.ceil((viewport.x + viewport.width) / TILE_SIZE)
    const startY = Math.floor(viewport.y / TILE_SIZE)
    const endY = Math.ceil((viewport.y + viewport.height) / TILE_SIZE)
    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        tiles.push({ x, y })
      }
    }
    return tiles
  }, [zoom, viewport])

  const groups = useMemo(() => {
    const THRESHOLD = 10
    const groups: Record<string, { report: Report; position: Point }[]> = {}
    for (const report of reports) {
      const point = latLongToPoint(report.location)
      const position = {
        x: (point.x / tileSize - range.x) * TILE_SIZE,
        y: (range.y + range.height - point.y / tileSize) * TILE_SIZE
      }
      const groupId = `${Math.floor(position.x / THRESHOLD)},${Math.floor(
        position.y / THRESHOLD
      )}`
      groups[groupId] ??= []
      groups[groupId].push({ report, position })
    }
    return Object.values(groups).map(entries => {
      // Average the group's position
      let x = 0
      let y = 0
      for (const entry of entries) {
        x += entry.position.x
        y += entry.position.y
      }
      return {
        reports: entries.map(({ report }) => report),
        position: { x: x / entries.length, y: y / entries.length }
      }
    })
  }, [reports])

  return (
    <div
      className='map'
      onClick={e => {
        const hasReports =
          e.target instanceof Element && e.target.closest('[data-reports]')
        const reports: Report[] =
          hasReports instanceof HTMLElement && hasReports.dataset.reports
            ? JSON.parse(hasReports.dataset.reports)
            : []
        console.log(reports)
      }}
      onScroll={e => {
        const div = e.currentTarget
        setViewport(viewport => ({
          ...viewport,
          x: div.scrollLeft,
          y: div.scrollTop
        }))
      }}
      ref={ref}
    >
      <div
        className='scroll-area'
        style={{
          width: `${range.width * TILE_SIZE}px`,
          height: `${range.height * TILE_SIZE}px`
        }}
      >
        {tiles.map(({ x, y }) => (
          <ImageWithLoadingAnimation
            key={`${x}/${y}`}
            className='tile'
            src={`${HOST}/${zoom}/${x + range.x}/${
              range.height - 1 - y + range.y
            }`}
            style={{ left: `${x * TILE_SIZE}px`, top: `${y * TILE_SIZE}px` }}
          />
        ))}
        {tiles.map(({ x, y }) => (
          <ImageWithLoadingAnimation
            key={`${x}/${y}`}
            className='tile'
            src={`${LABEL_HOST}/${zoom}/${x + range.x}/${
              range.height - 1 - y + range.y
            }`}
            style={{ left: `${x * TILE_SIZE}px`, top: `${y * TILE_SIZE}px` }}
          />
        ))}
      </div>
      {groups.map(({ reports, position }) => (
        <Marker
          key={`${position.x},${position.y}`}
          reports={reports}
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        />
      ))}
    </div>
  )
}
