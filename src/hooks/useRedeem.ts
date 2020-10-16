import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../blng/utils'

const useRedeem = (moneyTreeContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(moneyTreeContract, account)
    console.log(txHash)
    return txHash
  }, [account, moneyTreeContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
