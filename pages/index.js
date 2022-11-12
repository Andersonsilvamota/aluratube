import config from '../config.json'
import styled from 'styled-components'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'
import { useState } from 'react'

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = useState("");

  return (
    <>
      <div>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline serchValue={valorDoFiltro} playlists={config.playlists} />
      </div>

    </>

  )
}

export default HomePage


const StyledHeader = styled.div`
  background-color: ${(theme) => theme.backgroundLevel1};

  img {
    width: 80ox;
    height: 80px;
    border-radius: 50%;
  }
  .user-profile {
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`

function Header() {
  return (
    <StyledHeader>
      <section className='user-profile'>
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ serchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists)

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName]
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const serchValueNormalized = serchValue.toLowerCase();
                return titleNormalized.includes(serchValueNormalized)
              }).map((video) => {
                return (
                  <a href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )
              })}

            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}

