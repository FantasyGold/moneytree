import {useCallback} from 'react'

import useBlng from './useBlng'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getBlngContract,
  getXBlngStakingContract
} from '../blng/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const blng = useBlng()
  const lpContract = getBlngContract(blng)
  const contract = getXBlngStakingContract(blng)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
