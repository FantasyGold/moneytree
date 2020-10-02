import React from '../../views/Claims/node_modules/react'
import { Link } from '../../views/Claims/node_modules/react-router-dom'
import styled from '../../views/Claims/components/node_modules/styled-components'
import manager from '../../assets/img/manager.png'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={manager} height="32" style={{ marginTop: -4 }} />
      <StyledText>
        DefiGold <MiningManagerText>MiningManager</MiningManagerText>
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Reem Kufi', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
`

const MiningManagerText = styled.span`
  font-family: 'Kaushan Script', sans-serif;
`

export default Logo
