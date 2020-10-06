import { useCallback } from 'react'

import useDefiGold from './useDefiGold'
import { useWallet } from 'use-wallet'

import { harvest, getMiningManagerContract } from '../dgld/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const dgld = useDefiGold()
  const miningManagerContract = getMiningManagerContract(dgld)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(miningManagerContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, dgld])

  return { onReward: handleReward }
}

export default useReward
