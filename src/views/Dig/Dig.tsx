import React, { useEffect, useMemo } from '../Claims/node_modules/react'
import { useParams } from '../Claims/node_modules/react-router-dom'
import styled from '../Claims/components/node_modules/styled-components'
import { useWallet } from '../Claims/node_modules/use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useDig from '../../hooks/useDig'
import useRedeem from '../../hooks/useRedeem'
import useDefiGold from '../../hooks/useStake'
import { getMiningManagerContract } from '../../defigold/utils'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'

const Dig: React.FC = () => {
  const { digId } = useParams()
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
  } = useDig(digId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const defiGold = useDefiGold()
  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const { onRedeem } = useRedeem(getMiningManagerContract(defiGold))

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      <PageHeader
        icon={icon}
        subtitle={`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`}
        title={name}
      />
      <StyledDig>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              lpContract={lpContract}
              pid={pid}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          ⭐️ Every time you stake and unstake LP tokens, the contract will
          dig your DefiGold rewards for you!
        </StyledInfo>
        <Spacer size="lg" />
      </StyledDig>
    </>
  )
}

const StyledDig = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Dig
