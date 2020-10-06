import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMiningManagerContract } from '../dgld/utils'
import useDefiGold from './useDefiGold'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const dgld = useDefiGold()
  const miningManagerContract = getMiningManagerContract(dgld)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(miningManagerContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, miningManagerContract, dgld])

  useEffect(() => {
    if (account && miningManagerContract && dgld) {
      fetchBalance()
    }
  }, [account, block, miningManagerContract, setBalance, dgld])

  return balance
}

export default useEarnings
