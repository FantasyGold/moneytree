import { useContext } from '../views/Claims/node_modules/react'
import { Context as ClaimsContext } from '../contexts/Claims'

const useUnharvested = () => {
  const { unharvested } = useContext(ClaimsContext)
  return unharvested
}

export default useUnharvested
