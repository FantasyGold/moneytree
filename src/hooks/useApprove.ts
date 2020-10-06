import { useCallback } from 'react'

import useDefiGold from './useDefiGold'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMiningManagerContract } from '../dgld/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const dgld = useDefiGold()
  const miningManagerContract = getMiningManagerContract(dgld)

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
