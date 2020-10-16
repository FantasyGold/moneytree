import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useBlng from '../../hooks/useBlng'

import { bnToDec } from '../../utils'
import { getMoneyTreeContract, getEarned } from '../../blng/utils'
import { getFarms } from '../../blng/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const blng = useBlng()
  const { account } = useWallet()

  const farms = getFarms(blng)

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
