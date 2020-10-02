import { useCallback, useEffect, useState } from '../views/Claims/node_modules/react'
import { provider } from '../views/Dig/node_modules/web3-core'

import BigNumber from '../defigold/node_modules/bignumber.js.js'
import { useWallet } from '../views/Claims/node_modules/use-wallet'

import { getEarned, getMiningManagerContract, getClaims } from '../defigold/utils'
import useDefiGold from './useStake'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const defiGold = useDefiGold()
  const claims = getClaims(defiGold)
  const miningManagerContract = getMiningManagerContract(defiGold)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      claims.map(({ pid }: { pid: number }) =>
        getEarned(miningManagerContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, miningManagerContract, defiGold])

  useEffect(() => {
    if (account && miningManagerContract && defiGold) {
      fetchAllBalances()
    }
  }, [account, block, miningManagerContract, setBalance, defiGold])

  return balances
}

export default useAllEarnings
