import { useCallback } from 'react'

import useDefiGold from './useStake'
import { useWallet } from 'use-wallet'

import { stake, getMiningManagerContract } from '../defigold/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const defiGold = useDefiGold()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMiningManagerContract(defiGold),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, defiGold],
  )

  return { onStake: handleStake }
}

export default useStake
