import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useDgld from '../../hooks/useDgld'
import {getContract} from '../../utils/erc20'
import UnstakeXDgld from './components/UnstakeXDgld'
import StakeDgld from "./components/StakeDgld";

import {contractAddresses} from '../../dgld/lib/constants'
import {getXDgldSupply} from "../../dgld/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";

const StakeXDgld: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xDgld[3],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const dgld = useDgld()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXDgldSupply(dgld)
      setTotalSupply(supply)
    }
    if (dgld) {
      fetchTotalSupply()
    }
  }, [dgld, setTotalSupply])



  const lpContract = useMemo(() => {
    debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXDgld
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakeDgld
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ You will earn a portion of the swaps fees based on the amount
              of xDGLD held relative the weight of the staking. xDGLD can be minted
              by staking DGLD. To redeem DGLD staked plus swap fees convert xDGLD
              back to DGLD. {totalSupply ? `There are currently ${getBalanceNumber(totalSupply)} xDGLD in the whole pool.` : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
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

export default StakeXDgld
