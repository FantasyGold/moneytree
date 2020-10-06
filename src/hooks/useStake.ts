import { useCallback } from 'react'

import useDefiGold from './useDefiGold'
import { useWallet } from 'use-wallet'

import { stake, getMiningManagerContract } from '../dgld/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const dgld = useDefiGold()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMiningManagerContract(dgld),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, dgld],
  )

  return { onStake: handleStake }
}

export default useStake
