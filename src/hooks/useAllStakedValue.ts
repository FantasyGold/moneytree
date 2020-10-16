import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMoneyTreeContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../blng/utils'
import useBlng from './useBlng'
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
  const blng = useBlng()
  const farms = getFarms(blng)
  const moneyTreeContract = getMoneyTreeContract(blng)
  const wethContact = getWethContract(blng)
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
            moneyTreeContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, moneyTreeContract, blng])

  useEffect(() => {
    if (account && moneyTreeContract && blng) {
      fetchAllStakedValue()
    }
  }, [account, block, moneyTreeContract, setBalance, blng])

  return balances
}

export default useAllStakedValue
