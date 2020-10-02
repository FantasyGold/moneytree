import { useCallback } from '../views/Claims/node_modules/react'
import { useWallet } from '../views/Claims/node_modules/use-wallet'
import { Contract } from '../views/Dig/components/node_modules/web3-eth-contract'
import { redeem } from '../defigold/utils'

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
