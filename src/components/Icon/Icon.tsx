import React from '../../views/Claims/node_modules/react'
import styled from '../../views/Claims/components/node_modules/styled-components'

export interface IconProps {
  color?: string,
  children?: React.ReactNode,
  size?: number,
}

const Icon: React.FC<IconProps> = ({ children, color, size = 24 }) => (
  <StyledIcon>
    {React.isValidElement(children) && React.cloneElement(children, {
      color,
      size,
    })}
  </StyledIcon>
)

const StyledIcon = styled.div`
`

export default Icon