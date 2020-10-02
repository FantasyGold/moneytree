import { useCallback, useEffect, useState } from '../views/Claims/node_modules/react'
import { provider } from '../views/Dig/node_modules/web3-core'

import BigNumber from '../defigold/node_modules/bignumber.js.js'
import { useWallet } from '../views/Claims/node_modules/use-wallet'

import { getEarned, getMiningManagerContract } from '../defigold/utils'
import useDefiGold from './useStake'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const defiGold = useDefiGold()
  const miningManagerContract = getMiningManagerContract(defiGold)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(miningManagerContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, miningManagerContract, defiGold])

  useEffect(() => {
    if (account && miningManagerContract && defiGold) {
      fetchBalance()
    }
  }, [account, block, miningManagerContract, setBalance, defiGold])

  return balance
}

export default useEarnings
