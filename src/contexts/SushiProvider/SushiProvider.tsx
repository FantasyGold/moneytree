import React, { createContext, useEffect, useState } from '../../views/Claims/node_modules/react'

import { useWallet } from '../../views/Claims/node_modules/use-wallet'

import { DefiGold } from '../../defigold'

export interface DefiGoldContext {
  defiGold?: typeof DefiGold
}

export const Context = createContext<DefiGoldContext>({
  defiGold: undefined,
})

declare global {
  interface Window {
    defiGoldsauce: any
  }
}

const DefiGoldProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [defiGold, setDefiGold] = useState<any>()

  // @ts-ignore
  window.defiGold = defiGold
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const defiGoldLib = new DefiGold(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setDefiGold(defiGoldLib)
      window.defiGoldsauce = defiGoldLib
    }
  }, [ethereum])

  return <Context.Provider value={{ defiGold }}>{children}</Context.Provider>
}

export default DefiGoldProvider
