import { useContext } from 'react'
import { Context } from '../contexts/DgldProvider'

const useDgld = () => {
  const { dgld } = useContext(Context)
  return dgld
}

export default useDgld
