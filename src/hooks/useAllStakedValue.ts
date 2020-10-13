import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMiningManagerContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../dgld/utils'
import useDgld from './useDgld'
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
  const dgld = useDgld()
  const farms = getFarms(dgld)
  const miningManagerContract = getMiningManagerContract(dgld)
  const wethContact = getWethContract(dgld)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
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
  }, [account, miningManagerContract, dgld])

  useEffect(() => {
    if (account && miningManagerContract && dgld) {
      fetchAllStakedValue()
    }
  }, [account, block, miningManagerContract, setBalance, dgld])

  return balances
}

export default useAllStakedValue
