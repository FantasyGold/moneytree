import {useCallback} from 'react'

import useDgld from './useDgld'
import {useWallet} from 'use-wallet'

import {enter, getXDgldStakingContract} from '../dgld/utils'

const useEnter = () => {
  const {account} = useWallet()
  const dgld = useDgld()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXDgldStakingContract(dgld),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, dgld],
  )

  return {onEnter: handle}
}

export default useEnter
