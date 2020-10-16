import { useCallback } from 'react'

import useBlng from './useBlng'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMoneyTreeContract } from '../blng/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const blng = useBlng()
  const moneyTreeContract = getMoneyTreeContract(blng)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, moneyTreeContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, moneyTreeContract])

  return { onApprove: handleApprove }
}

export default useApprove
