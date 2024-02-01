import React from 'react'
import styled from 'styled-components'

export type InlineType = {
  stretch?: boolean
  width?: string | number
  verticalCenter?: boolean
  centerContent?: boolean
} & React.PropsWithChildren

const StyledDiv = styled.div<{
  $stretch?: boolean
  $width?: string | number
  $verticalCenter?: boolean
  $centerContent?: boolean
}>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.$centerContent ? 'center' : 'space-between')};
  align-items: ${(props) => (props.$verticalCenter ? 'center' : 'unset')};
  width: ${(props) => (props.$stretch ? '100%' : props.$width)};
  gap: 10px;
`

export const Inline = ({ stretch, width, verticalCenter, centerContent, children }: InlineType) => {
  return (
    <StyledDiv
      $stretch={stretch}
      $width={width}
      $centerContent={centerContent}
      $verticalCenter={verticalCenter}>
      {children}
    </StyledDiv>
  )
}
