import { useContext } from 'react'
import { Context } from '../contexts/DefiGoldProvider'

const useDefiGold = () => {
  const { defiGold } = useContext(Context)
  return defiGold
}

export default useDefiGold
