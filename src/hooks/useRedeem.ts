import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../dgld/utils'

const useRedeem = (miningManagerContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(miningManagerContract, account)
    console.log(txHash)
    return txHash
  }, [account, miningManagerContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
