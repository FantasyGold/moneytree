import { useCallback } from 'react'

import useDgld from './useDgld'
import { useWallet } from 'use-wallet'

import { harvest, getMiningManagerContract } from '../dgld/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const dgld = useDgld()
  const miningManagerContract = getMiningManagerContract(dgld)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(miningManagerContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, dgld])

  return { onReward: handleReward }
}

export default useReward
