import { useCallback } from 'react'

import useBlng from './useBlng'
import { useWallet } from 'use-wallet'

import { harvest, getMoneyTreeContract } from '../blng/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const blng = useBlng()
  const moneyTreeContract = getMoneyTreeContract(blng)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(moneyTreeContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, blng])

  return { onReward: handleReward }
}

export default useReward
