import {useCallback} from 'react'

import useBlng from './useBlng'
import {useWallet} from 'use-wallet'

import {leave, getXBlngStakingContract} from '../blng/utils'

const useLeave = () => {
  const {account} = useWallet()
  const blng = useBlng()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXBlngStakingContract(blng),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, blng],
  )

  return {onLeave: handle}
}

export default useLeave
