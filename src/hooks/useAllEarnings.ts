import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMiningManagerContract, getFarms } from '../dgld/utils'
import useDgld from './useDgld'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const dgld = useDgld()
  const farms = getFarms(dgld)
  const miningManagerContract = getMiningManagerContract(dgld)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(miningManagerContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, miningManagerContract, dgld])

  useEffect(() => {
    if (account && miningManagerContract && dgld) {
      fetchAllBalances()
    }
  }, [account, block, miningManagerContract, setBalance, dgld])

  return balances
}

export default useAllEarnings
