import React, { useCallback, useEffect, useState } from '../../views/Claims/node_modules/react'

import { useWallet } from '../../views/Claims/node_modules/use-wallet'
import useDefiGold from '../../hooks/useStake'

import { bnToDec } from '../../utils'
import { getMiningManagerContract, getEarned } from '../../defigold/utils'
import { getClaims } from '../../defigold/utils'

import Context from './context'
import { Dig } from './types'

const Claims: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const defiGold = useDefiGold()
  const { account } = useWallet()

  const claims = getClaims(defiGold)

  return (
    <Context.Provider
      value={{
        claims,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Claims
