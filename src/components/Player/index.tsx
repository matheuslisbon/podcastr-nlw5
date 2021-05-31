import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from './styles.module.scss'


export function Player (){
  const audioRef = useRef<HTMLAudioElement>(null)
  const {episodeList, currentEpisodeIndex, isPlaying, togglePlay, setPlayingState, playNext, playPrevious, hasNext, hasPrevious} = usePlayer()

  const episode = episodeList[currentEpisodeIndex]


  useEffect(()=> {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play()
    }else {
      audioRef.current.pause()
    }
  }, [isPlaying])
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="tocando agora"/>
        <strong>Tocando agora</strong>
      </header>


      {episode ? (
        <div className={styles.currentEpisode}>
          <Image width={592} height={592} src={episode.thumbnail} objectFit='cover'/>
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      ) }

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (    
              <Slider 
                trackStyle={{backgroundColor:'#04d361'}}
                railStyle={{background: '#9f75ff'}}
                handleStyle={{borderColor:'#04d361'}}
              />
            ): (  
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>

        </div>

        {episode && (
          <audio src={episode.url}
            autoPlay
            ref={audioRef}
            onPlay={()=> setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button type='button' disabled={!episode} >
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>

          <button type='button' disabled={!episode || !hasPrevious} onClick={() => playPrevious()}>
            <img src="/play-previous.svg" alt="Anterior"/>
          </button>

          <button type='button' className={styles.playButton} disabled={!episode} onClick={() => togglePlay()}>
           {isPlaying ? ( <img src="/pause.svg" alt="Tocar"/>) : ( <img src="/play.svg" alt="Tocar"/>) }
          </button>

          <button type='button' disabled={!episode || !hasNext} onClick={() => playNext()}>
            <img src="/play-next.svg" alt="proximo"/>
          </button>

          <button type='button' disabled={!episode}>
            <img src="/repeat.svg" alt="embaralhar"/>
          </button>

        </div>
      </footer>
    </div>
  )
}