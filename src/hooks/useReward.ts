import { useCallback } from '../views/Claims/node_modules/react'

import useDefiGold from './useStake'
import { useWallet } from '../views/Claims/node_modules/use-wallet'

import { harvest, getMiningManagerContract } from '../defigold/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const defiGold = useDefiGold()
  const miningManagerContract = getMiningManagerContract(defiGold)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(miningManagerContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, defiGold])

  return { onReward: handleReward }
}

export default useReward
