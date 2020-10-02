import { useCallback } from '../views/Claims/node_modules/react'

import useDefiGold from './useStake'
import { useWallet } from '../views/Claims/node_modules/use-wallet'

import { unstake, getMiningManagerContract } from '../defigold/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const defiGold = useDefiGold()
  const miningManagerContract = getMiningManagerContract(defiGold)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(miningManagerContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, defiGold],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
