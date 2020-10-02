import { useCallback, useEffect, useState } from '../views/Claims/node_modules/react'

import BigNumber from '../defigold/node_modules/bignumber.js.js'
import { useWallet } from '../views/Claims/node_modules/use-wallet'
import { provider } from '../views/Dig/node_modules/web3-core'

import { getBalance } from '../utils/erc20'
import useBlock from './useBlock'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(ethereum, tokenAddress, account)
    setBalance(new BigNumber(balance))
  }, [account, ethereum, tokenAddress])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, setBalance, block, tokenAddress])

  return balance
}

export default useTokenBalance
