import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://rinkeby.etherscan.io/address/0xA07eA3542FAa728D0452A61D0dD23354DaE3DFec#code"
      >
        MoneyTree Contract
      </StyledLink>
      {/*<StyledLink
        target="_blank"
        href="https://uniswap.info/pair/0xce84867c3c02b05dc570d0135103d3fb9cc19433"
      >
        Bling BLNG-ETH
      </StyledLink> */}
      <StyledLink target="_blank" href="https://discord.gg/xXtgPPW">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/fantasygold">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/fantasygoldcoin">
        Twitter
      </StyledLink>
      <StyledLink target="_blank" href="https://fantasygold.io">
        FantasyGold Core
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
