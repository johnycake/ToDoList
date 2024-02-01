import styled from 'styled-components'
import React from 'react'

export type ColumnType = {
  fullHeight?: boolean
  fullWidth?: boolean
  center?: boolean
  alignItemsToEnds?: boolean
  width?: string | number
  height?: string | number
  grow?: number
  onClick?: () => void
} & React.PropsWithChildren

const StyledDiv = styled.div<{
  $fullHeight?: boolean
  $center?: boolean
  $fullWidth?: boolean
  $alignItemsToEnds?: boolean
  $width?: string | number
  $height?: string | number
  $grow?: number
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: ${(props) => (props.$center ? 'center' : 'unset')};
  height: ${(props) => (props.$fullHeight ? '100%' : props.$height)};
  width: ${(props) => (props.$fullWidth ? '100%' : props.$width)};
  justify-content: ${(props) => (props.$alignItemsToEnds ? 'space-between' : 'center')};
  flex-grow: ${(props) => props.$grow ?? 'unset'};
  gap: 10px;
  margin: 0;
`

export const Column = ({
  fullHeight,
  center,
  fullWidth,
  alignItemsToEnds,
  width,
  height,
  grow,
  children,
  onClick
}: ColumnType) => {
  return (
    <StyledDiv
      $fullHeight={fullHeight}
      $fullWidth={fullWidth}
      $alignItemsToEnds={alignItemsToEnds}
      $center={center}
      $width={width}
      $height={height}
      $grow={grow}
      onClick={onClick}>
      {children}
    </StyledDiv>
  )
}
