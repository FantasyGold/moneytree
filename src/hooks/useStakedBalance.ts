import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMoneyTreeContract } from '../blng/utils'
import useBlng from './useBlng'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const blng = useBlng()
  const moneyTreeContract = getMoneyTreeContract(blng)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(moneyTreeContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, blng])

  useEffect(() => {
    if (account && blng) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, blng])

  return balance
}

export default useStakedBalance
