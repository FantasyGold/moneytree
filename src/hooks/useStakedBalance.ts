import { useCallback, useEffect, useState } from '../views/Claims/node_modules/react'

import BigNumber from '../defigold/node_modules/bignumber.js.js'
import { useWallet } from '../views/Claims/node_modules/use-wallet'

import { getStaked, getMiningManagerContract } from '../defigold/utils'
import useDefiGold from './useStake'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const defiGold = useDefiGold()
  const miningManagerContract = getMiningManagerContract(defiGold)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(miningManagerContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, defiGold])

  useEffect(() => {
    if (account && defiGold) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, defiGold])

  return balance
}

export default useStakedBalance
