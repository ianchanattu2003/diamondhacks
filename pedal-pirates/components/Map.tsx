'use client'

import { Location, MAX_ZOOM, Point, latLongToPoint } from '@/lib/map-utils'
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { ImageWithLoadingAnimation } from './ImageWithLoadingAnimation'

type Rectangle = {
  x: number
  y: number
  width: number
  height: number
}

const HOST = 'https://assets.concept3d.com/assets/1005/1005_Map_11'

/** Visual size of each tile, in pixels. */
const TILE_SIZE = 256

export type MapProps = {
  corner1: Location
  corner2: Location
  zoom: number
}
export function Map ({
  corner1,
  corner2,
  zoom,
  children
}: PropsWithChildren<MapProps>) {
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

  const range = useMemo(() => {
    /** Size of each tile at the largest zoom level. */
    const tileSize = 2 ** (MAX_ZOOM - zoom) * TILE_SIZE
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

  return (
    <div
      className='map'
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
            src={`${HOST}/${zoom}/${x + range.x}/${range.height - y + range.y}`}
            style={{ left: `${x * TILE_SIZE}px`, top: `${y * TILE_SIZE}px` }}
          />
        ))}
      </div>
      {children}
    </div>
  )
}
