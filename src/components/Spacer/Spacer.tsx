import React, { useContext } from '../../views/Claims/node_modules/react'
import styled, { ThemeContext } from '../../views/Claims/components/node_modules/styled-components'

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg'
}

const Spacer: React.FC<SpacerProps> = ({ size = 'md' }) => {
  const { spacing } = useContext(ThemeContext)
  
  let s: number
  switch (size) {
    case 'lg':
      s = spacing[6]
      break
    case 'sm':
      s = spacing[2]
      break
    case 'md':
    default:
      s = spacing[4]
  }
  
  return (
    <StyledSpacer size={s} />
  )
}

interface StyledSpacerProps {
  size: number,
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`

export default Spacer