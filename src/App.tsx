import React, { useCallback, useEffect, useState } from './views/Claims/node_modules/react'
import { BrowserRouter as Router, Route, Switch } from './views/Claims/node_modules/react-router-dom'
import { ThemeProvider } from './views/Claims/components/node_modules/styled-components'
import { UseWalletProvider } from './views/Claims/node_modules/use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import ClaimsProvider from './contexts/Claims'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import DefiGoldProvider from './contexts/DefiGoldProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Claims from './views/Claims'
import Home from './views/Home'
import Stake from './views/Stake'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/claims">
            <Claims />
          </Route>
          <Route path="/staking">
            <Stake />
          </Route>
        </Switch>
      </Router>
      <Disclaimer />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
        }}
      >
        <DefiGoldProvider>
          <TransactionProvider>
            <ClaimsProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </ClaimsProvider>
          </TransactionProvider>
        </DefiGoldProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [])

  return <div />
}

export default App
