import {useCallback} from 'react'

import useBlng from './useBlng'
import {useWallet} from 'use-wallet'

import {enter, getXBlngStakingContract} from '../blng/utils'

const useEnter = () => {
  const {account} = useWallet()
  const blng = useBlng()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXBlngStakingContract(blng),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, blng],
  )

  return {onEnter: handle}
}

export default useEnter
