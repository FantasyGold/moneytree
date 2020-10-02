import { useCallback } from '../views/Claims/node_modules/react'

import useDefiGold from './useStake'
import { useWallet } from '../views/Claims/node_modules/use-wallet'
import { provider } from '../views/Dig/node_modules/web3-core'
import { Contract } from '../views/Dig/components/node_modules/web3-eth-contract'

import { approve, getMiningManagerContract } from '../defigold/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const defiGold = useDefiGold()
  const miningManagerContract = getMiningManagerContract(defiGold)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, miningManagerContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, miningManagerContract])

  return { onApprove: handleApprove }
}

export default useApprove
