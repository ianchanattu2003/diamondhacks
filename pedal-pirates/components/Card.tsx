interface Props {
  property1: 'variant-2' | 'variant-3' | 'default'
  className: any
}

export const Card = ({ property1, className }: Props): JSX.Element => {
  return (
    <div className={`card ${property1} ${className}`}>
      {['default', 'variant-2'].includes(property1) && (
        <>
          <p className='vehicle-default'>
            <span className='text-wrapper'>Vehicle: </span>
            <span className='span'>
              Default
              <br />
            </span>
            <span className='text-wrapper'>Location: </span>
            <span className='span'>
              (X, Y)
              <br />
            </span>
            <span className='text-wrapper'>Date Occurred: </span>
            <span className='span'>
              Default
              <br />
            </span>
            <span className='text-wrapper'>Time Occurred: </span>
            <span className='span'>
              Default
              <br />
            </span>
            <span className='text-wrapper'>Details: </span>
            <span className='span'>
              Default
              <br />
            </span>
            <span className='text-wrapper'>Source:</span>
            <span className='span'> Default</span>
          </p>
          <div className='overlap-group'>
            <div className='ellipse' />
            <div className='div'>
              {property1 === 'default' && <>🚲</>}

              {property1 === 'variant-2' && <>🛴</>}
            </div>
          </div>
        </>
      )}

      {property1 === 'variant-3' && (
        <div className='overlap-group-2'>
          <p className='was-your-ride-jacked'>
            <span className='text-wrapper-2'>
              Was your ride jacked here?
              <br />
            </span>
            <span className='text-wrapper-3'>Mark it on the map.</span>
          </p>
          <div className='ellipse-2' />
          <div className='text-wrapper-4'>❌</div>
        </div>
      )}
    </div>
  )
}
