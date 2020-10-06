import { useContext } from 'react'
import { Context } from '../contexts/DefiGoldProvider'

const useDefiGold = () => {
  const { dgld } = useContext(Context)
  return dgld
}

export default useDefiGold
