import styled from 'styled-components'
import React from 'react'

export type FlexType = {
  fullWidth?: boolean
  fullHeight?: boolean
  width?: string | number
  height?: string | number
  verticalCenter?: boolean
  centerContent?: boolean
} & React.PropsWithChildren

const StyledDiv = styled.div<{
  $fullWidth?: boolean
  $fullHeight?: boolean
  $width?: string | number
  $height?: string | number
  $verticalCenter?: boolean
  $centerContent?: boolean
}>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.$centerContent ? 'center' : 'space-between')};
  align-items: ${(props) => (props.$verticalCenter ? 'center' : 'unset')};
  width: ${(props) => (props.$fullWidth ? '100%' : props.$width)};
  height: ${(props) => (props.$fullHeight ? '100%' : props.$height)};
`

export const Flex = ({
  fullWidth,
  fullHeight,
  width,
  verticalCenter,
  centerContent,
  children
}: FlexType) => {
  return (
    <StyledDiv
      $fullWidth={fullWidth}
      $fullHeight={fullHeight}
      $width={width}
      $centerContent={centerContent}
      $verticalCenter={verticalCenter}>
      {children}
    </StyledDiv>
  )
}
