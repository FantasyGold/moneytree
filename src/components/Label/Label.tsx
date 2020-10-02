import React from '../../views/Claims/node_modules/react'
import styled from '../../views/Claims/components/node_modules/styled-components'

interface LabelProps {
  text?: string
}

const Label: React.FC<LabelProps> = ({ text }) => (
  <StyledLabel>{text}</StyledLabel>
)

const StyledLabel = styled.div`
  color: ${(props) => props.theme.color.grey[400]};
`

export default Label
