import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { DefiGold } from '../../dgld'

export interface DefiGoldContext {
  dgld?: typeof DefiGold
}

export const Context = createContext<DefiGoldContext>({
  dgld: undefined,
})

declare global {
  interface Window {
    dgldsauce: any
  }
}

const DefiGoldProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [dgld, setDefiGold] = useState<any>()

  // @ts-ignore
  window.dgld = dgld
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const dgldLib = new DefiGold(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setDefiGold(dgldLib)
      window.dgldsauce = dgldLib
    }
  }, [ethereum])

  return <Context.Provider value={{ dgld }}>{children}</Context.Provider>
}

export default DefiGoldProvider
