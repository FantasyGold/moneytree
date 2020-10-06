import { useCallback } from 'react'

import useDefiGold from './useDefiGold'
import { useWallet } from 'use-wallet'

import { unstake, getMiningManagerContract } from '../dgld/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const dgld = useDefiGold()
  const miningManagerContract = getMiningManagerContract(dgld)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(miningManagerContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, dgld],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
