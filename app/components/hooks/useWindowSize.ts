import * as React from 'react'

type IStandardSize =
  | 'xsmall'
  | 'small'
  | 'lsmall'
  | 'medium'
  | 'large'
  | 'xlarge'

const useWindowSize = () => {
  const isClient = typeof window === 'object'

  function getSize() {
    return {
      height: isClient ? window.innerHeight : undefined,
      width: isClient ? window.innerWidth : undefined,
    }
  }

  function getStandardSize(width: number) {
    switch (true) {
      case 0 <= width && width <= 599:
        return 'xsmall'
      case 599 < width && width <= 839:
        return 'small'
      case 839 < width && width <= 1279:
        return 'lsmall'
      case 1279 < width && width <= 1439:
        return 'medium'
      case 1439 < width && width <= 1919:
        return 'large'
      case 1919 < width:
        return 'xlarge'
      default:
        return null
    }
  }

  const [windowSize, setWindowSize] = React.useState(getSize)
  const [standardSize, setStandardSize] = React.useState<IStandardSize | null>(
    getStandardSize(window.innerWidth),
  )

  React.useEffect(() => {
    if (!isClient) {
      return
    }

    function handleResize() {
      const newWindowSize = getSize()
      setWindowSize(newWindowSize)
      setStandardSize(getStandardSize(newWindowSize.width || -1))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { ...windowSize, standardSize }
}

export default useWindowSize
