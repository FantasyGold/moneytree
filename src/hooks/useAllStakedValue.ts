import { useCallback, useEffect, useState } from '../views/Claims/node_modules/react'
import { provider } from '../views/Dig/node_modules/web3-core'

import BigNumber from '../defigold/node_modules/bignumber.js.js'
import { useWallet } from '../views/Claims/node_modules/use-wallet'
import { Contract } from '../views/Dig/components/node_modules/web3-eth-contract'

import {
  getMiningManagerContract,
  getWethContract,
  getClaims,
  getTotalLPWethValue,
} from '../defigold/utils'
import useDefiGold from './useStake'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const defiGold = useDefiGold()
  const claims = getClaims(defiGold)
  const miningManagerContract = getMiningManagerContract(defiGold)
  const wethContact = getWethContract(defiGold)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      claims.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            miningManagerContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, miningManagerContract, defiGold])

  useEffect(() => {
    if (account && miningManagerContract && defiGold) {
      fetchAllStakedValue()
    }
  }, [account, block, miningManagerContract, setBalance, defiGold])

  return balances
}

export default useAllStakedValue
