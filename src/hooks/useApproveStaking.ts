import {useCallback} from 'react'

import useDgld from './useDgld'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getDgldContract,
  getXDgldStakingContract
} from '../dgld/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const dgld = useDgld()
  const lpContract = getDgldContract(dgld)
  const contract = getXDgldStakingContract(dgld)

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
