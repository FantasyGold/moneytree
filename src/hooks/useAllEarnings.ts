import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMoneyTreeContract, getFarms } from '../blng/utils'
import useBlng from './useBlng'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const blng = useBlng()
  const farms = getFarms(blng)
  const moneyTreeContract = getMoneyTreeContract(blng)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(moneyTreeContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, moneyTreeContract, blng])

  useEffect(() => {
    if (account && moneyTreeContract && blng) {
      fetchAllBalances()
    }
  }, [account, block, moneyTreeContract, setBalance, blng])

  return balances
}

export default useAllEarnings
