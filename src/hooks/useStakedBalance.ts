import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMiningManagerContract } from '../dgld/utils'
import useDefiGold from './useDefiGold'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const dgld = useDefiGold()
  const miningManagerContract = getMiningManagerContract(dgld)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(miningManagerContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, dgld])

  useEffect(() => {
    if (account && dgld) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, dgld])

  return balance
}

export default useStakedBalance
