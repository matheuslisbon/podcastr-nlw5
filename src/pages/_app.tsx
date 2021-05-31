import { Header } from '../components/Header'
import { Player } from '../components/Player'

import '../styles/globals.scss'

import styles from '../styles/app.module.scss'
import { PlayerContext, PlayerContextProvider} from '../contexts/PlayerContext'


function MyApp({ Component, pageProps }) {

  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />        
        </main>

        <Player />
      </div>         
    </PlayerContextProvider>
   
  )
}

export default MyApp
