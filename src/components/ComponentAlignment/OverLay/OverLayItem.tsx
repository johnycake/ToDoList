import styled from 'styled-components'

type OverLayItemProps = {
  stretch?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  width?: string | number
  height?: string | number
  rowDirection?: boolean
  aligItemsToEnds?: boolean
}

export const OverLayItem = styled.div<OverLayItemProps>(
  ({ stretch, fullWidth, fullHeight, rowDirection, aligItemsToEnds, width, height }) => ({
    height: (stretch && !rowDirection) || fullHeight ? '100%' : height,
    width: (stretch && rowDirection) || fullWidth ? '100%' : width,
    display: 'flex',
    flexDirection: rowDirection ? 'row' : 'column',
    position: 'absolute',
    justifyContent: aligItemsToEnds ? 'space-between' : 'center',
    alignItems: 'center',
    gap: 10
  })
)
