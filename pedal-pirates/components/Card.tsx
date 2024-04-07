import Link from 'next/link'
import { PropsWithChildren } from 'react'

export type CardProps = {
  href?: string
  small?: boolean
}
export const Card = ({
  href,
  small,
  children
}: PropsWithChildren<CardProps>): JSX.Element => {
  const Element = href ? Link : 'div'
  return (
    <Element href={href ?? ''} className={`card ${small ? 'small' : ''}`}>
      {children}
    </Element>
  )
}
