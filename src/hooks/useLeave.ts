import {useCallback} from 'react'

import useDgld from './useDgld'
import {useWallet} from 'use-wallet'

import {leave, getXDgldStakingContract} from '../dgld/utils'

const useLeave = () => {
  const {account} = useWallet()
  const dgld = useDgld()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXDgldStakingContract(dgld),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, dgld],
  )

  return {onLeave: handle}
}

export default useLeave
