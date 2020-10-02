import React from '../../views/Claims/node_modules/react'
import styled from '../../views/Claims/components/node_modules/styled-components'

const CardContent: React.FC = ({ children }) => (
  <StyledCardContent>{children}</StyledCardContent>
)

const StyledCardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing[3]}px;
`

export default CardContent
