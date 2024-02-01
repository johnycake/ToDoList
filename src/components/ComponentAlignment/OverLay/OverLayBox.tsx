import styled from 'styled-components'

type OverLayBoxProps = {
  fullHeight?: boolean
  height?: string | number
  width?: string | number
  itemsBottom?: boolean
  itemsTop?: boolean
}

export const OverLayBox = styled.div<OverLayBoxProps>(
  ({ fullHeight, height, width, itemsBottom, itemsTop }) => ({
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: itemsBottom ? 'end' : itemsTop ? 'start' : 'center',
    height: fullHeight ? '100%' : height,
    width: fullHeight ? '100%' : width
  })
)
