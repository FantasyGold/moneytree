import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Blng } from '../../blng'

export interface BlngContext {
  blng?: typeof Blng
}

export const Context = createContext<BlngContext>({
  blng: undefined,
})

declare global {
  interface Window {
    blngsauce: any
  }
}

const BlngProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [blng, setBlng] = useState<any>()

  // @ts-ignore
  window.blng = blng
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const blngLib = new Blng(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setBlng(blngLib)
      window.blngsauce = blngLib
    }
  }, [ethereum])

  return <Context.Provider value={{ blng }}>{children}</Context.Provider>
}

export default BlngProvider
