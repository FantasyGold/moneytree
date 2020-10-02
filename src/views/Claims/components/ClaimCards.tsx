import BigNumber from '../../../defigold/node_modules/bignumber.js.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Dig } from '../../../contexts/Claims'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useClaims from '../../../hooks/useClaims'
import useDefiGold from '../../../hooks/useStake'
import { getEarned, getMiningManagerContract } from '../../../defigold/utils'
import { bnToDec } from '../../../utils'

interface DigWithStakedValue extends Dig, StakedValue {
  apy: BigNumber
}

const ClaimCards: React.FC = () => {
  const [claims] = useClaims()
  const { account } = useWallet()
  const stakedValue = useAllStakedValue()

  const dgldIndex = claims.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'DGLD',
  )

  const dgldPrice =
    dgldIndex >= 0 && stakedValue[dgldIndex]
      ? stakedValue[dgldIndex].tokenPriceInWeth
      : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  const DGLD_PER_BLOCK = new BigNumber(1000)

  const rows = claims.reduce<DigWithStakedValue[][]>(
    (digRows, dig, i) => {
      const digWithStakedValue = {
        ...dig,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? dgldPrice
              .times(DGLD_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null,
      }
      const newDigRows = [...digRows]
      if (newDigRows[newDigRows.length - 1].length === 3) {
        newDigRows.push([digWithStakedValue])
      } else {
        newDigRows[newDigRows.length - 1].push(digWithStakedValue)
      }
      return newDigRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((digRow, i) => (
          <StyledRow key={i}>
            {digRow.map((dig, j) => (
              <React.Fragment key={j}>
                <DigCard dig={dig} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Cooking the rice ..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface DigCardProps {
  dig: DigWithStakedValue
}

const DigCard: React.FC<DigCardProps> = ({ dig }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = dig
  const defiGold = useDefiGold()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (defiGold) return
      const earned = await getEarned(
        getMiningManagerContract(defiGold),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (defiGold && account) {
      fetchEarned()
    }
  }, [defiGold, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      {dig.tokenSymbol === 'DGLD' && <StyledCardAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>{dig.icon}</CardIcon>
            <StyledTitle>{dig.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {dig.lpToken.toUpperCase()}</StyledDetail>
              <StyledDetail>Earn {dig.earnToken.toUpperCase()}</StyledDetail>
            </StyledDetails>
            <Spacer />
            <Button
              disabled={!poolActive}
              text={poolActive ? 'Select' : undefined}
              to={`/claims/${dig.id}`}
            >
              {!poolActive && (
                <Countdown
                  date={new Date(startTime * 1000)}
                  renderer={renderer}
                />
              )}
            </Button>
            <StyledInsight>
              <span>APY</span>
              <span>
                {dig.apy
                  ? `${dig.apy
                      .times(new BigNumber(100))
                      .toNumber()
                      .toLocaleString('en-US')
                      .slice(0, -1)}%`
                  : 'Loading ...'}
              </span>
              {/* <span>
                {dig.tokenAmount
                  ? (dig.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {dig.tokenSymbol}
              </span>
              <span>
                {dig.wethAmount
                  ? (dig.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`

export default ClaimCards
