import { useCallback } from 'react'

import useBlng from './useBlng'
import { useWallet } from 'use-wallet'

import { stake, getMoneyTreeContract } from '../blng/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const blng = useBlng()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMoneyTreeContract(blng),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, blng],
  )

  return { onStake: handleStake }
}

export default useStake
