import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMoneyTreeContract } from '../blng/utils'
import useBlng from './useBlng'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const blng = useBlng()
  const moneyTreeContract = getMoneyTreeContract(blng)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(moneyTreeContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, moneyTreeContract, blng])

  useEffect(() => {
    if (account && moneyTreeContract && blng) {
      fetchBalance()
    }
  }, [account, block, moneyTreeContract, setBalance, blng])

  return balance
}

export default useEarnings
