import React, { useEffect } from '../Claims/node_modules/react'
import styled from '../Claims/components/node_modules/styled-components'
import manager from '../../assets/img/manager.png'

import { useParams } from '../Claims/node_modules/react-router-dom'
import { useWallet } from '../Claims/node_modules/use-wallet'
import { provider } from '../Dig/node_modules/web3-core'

import Page from '../../components/Page'
import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import useDefiGold from '../../hooks/useStake'
import useDig from '../../hooks/useDig'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'
import { getMiningManagerContract } from '../../defigold/utils'

import Harvest from './components/Harvest'
import Stake from './components/Stake'

const Dig: React.FC = () => {
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const defiGold = useDefiGold()
  const { ethereum } = useWallet()

  // const lpContract = useMemo(() => {
  //   return getContract(ethereum as provider, lpTokenAddress)
  // }, [ethereum, lpTokenAddress])

  // const { onRedeem } = useRedeem(getMiningManagerContract(defiGold))

  // const lpTokenName = useMemo(() => {
  //   return lpToken.toUpperCase()
  // }, [lpToken])

  // const earnTokenName = useMemo(() => {
  //   return earnToken.toUpperCase()
  // }, [earnToken])

  return (
    <Page>
      {!!account ? (
        <>
          <PageHeader
            icon={<img src={manager} height="120" />}
            title="Stake DefiGold Tokens & Earn Fees"
            subtitle="0.05% of all GoldSwap trades are rewarded to DGLD stakers"
          />
          {/* <ClaimCards /> */}
          <div>TBD</div>
        </>
      ) : (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={onPresentWalletProviderModal}
            text="🔓 Unlock Wallet"
          />
        </div>
      )}
    </Page>
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
