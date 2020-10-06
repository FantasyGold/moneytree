import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useDefiGold from '../../hooks/useDefiGold'

import { bnToDec } from '../../utils'
import { getMiningManagerContract, getEarned } from '../../dgld/utils'
import { getFarms } from '../../dgld/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const dgld = useDefiGold()
  const { account } = useWallet()

  const farms = getFarms(dgld)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
