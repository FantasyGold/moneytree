import { useContext } from '../views/Claims/node_modules/react'
import { Context as ClaimsContext } from '../contexts/Claims'

const useClaims = () => {
  const { claims } = useContext(ClaimsContext)
  return [claims]
}

export default useClaims
