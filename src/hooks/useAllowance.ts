import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useBlng from './useBlng'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getMoneyTreeContract } from '../blng/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const blng = useBlng()
  const moneyTreeContract = getMoneyTreeContract(blng)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      moneyTreeContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, moneyTreeContract, lpContract])

  useEffect(() => {
    if (account && moneyTreeContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, moneyTreeContract, lpContract])

  return allowance
}

export default useAllowance
