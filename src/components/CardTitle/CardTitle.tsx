import React from '../../views/Claims/node_modules/react'
import styled from '../../views/Claims/components/node_modules/styled-components'

interface CardTitleProps {
  text?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ text }) => (
  <StyledCardTitle>{text}</StyledCardTitle>
)

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 18px;
  font-weight: 700;
  padding: ${(props) => props.theme.spacing[4]}px;
  text-align: center;
`

export default CardTitle
