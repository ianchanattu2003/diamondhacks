import { ImgHTMLAttributes, useState } from 'react'

export function ImageWithLoadingAnimation ({
  className = '',
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      className={`${className} ${loaded ? 'loaded' : 'loading'}`}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  )
}
