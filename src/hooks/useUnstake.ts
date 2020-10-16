import { useCallback } from 'react'

import useBlng from './useBlng'
import { useWallet } from 'use-wallet'

import { unstake, getMoneyTreeContract } from '../blng/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const blng = useBlng()
  const moneyTreeContract = getMoneyTreeContract(blng)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(moneyTreeContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, blng],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
