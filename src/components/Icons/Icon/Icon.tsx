import React from 'react'
import { Flex } from '../../ComponentAlignment'

type IconProps = {
  source: string
  alt: string
  width?: string
  height?: string
}
export const Icon = ({ source, alt, width, height }: IconProps) => {
  return (
    <Flex>
      <img src={source} alt={alt} width={width} height={height} />
    </Flex>
  )
}
