import { useCallback, useEffect, useState } from '../views/Claims/node_modules/react'

import BigNumber from '../defigold/node_modules/bignumber.js.js'
import useDefiGold from './useStake'
import { useWallet } from '../views/Claims/node_modules/use-wallet'
import { provider } from '../views/Dig/node_modules/web3-core'
import { Contract } from '../views/Dig/components/node_modules/web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getMiningManagerContract } from '../defigold/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const defiGold = useDefiGold()
  const miningManagerContract = getMiningManagerContract(defiGold)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      miningManagerContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, miningManagerContract, lpContract])

  useEffect(() => {
    if (account && miningManagerContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, miningManagerContract, lpContract])

  return allowance
}

export default useAllowance
