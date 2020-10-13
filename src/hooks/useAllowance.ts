import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useDgld from './useDgld'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getMiningManagerContract } from '../dgld/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const dgld = useDgld()
  const miningManagerContract = getMiningManagerContract(dgld)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      miningManagerContract.options.address,
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
