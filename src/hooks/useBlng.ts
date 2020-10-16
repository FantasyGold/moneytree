import { useContext } from 'react'
import { Context } from '../contexts/BlngProvider'

const useBlng = () => {
  const { blng } = useContext(Context)
  return blng
}

export default useBlng
