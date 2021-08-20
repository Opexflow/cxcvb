import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { LoadVideoById } from '../../../api/api'
import { changeKeyCodeAction } from '../../../redux/store'
import CurrentVideoCheck from './CurrentVideoCheck'
import s from './VideoLayout.module.css'

export default function VideoLayout({ withquery = false, opened, result }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [currentVideo, setCurrentVideo] = useState({})
  const closeVideoLayoutHandler = () => {
    let p = router.query.p
    dispatch(changeKeyCodeAction(null))
    const closeQuery = withquery ? `/${router.query.query}?p=${p}` : `/?p=${p}`

    router.push(closeQuery, undefined, {
      shallow: true,
      scroll: false,
    })
  }

  useEffect(() => {
    async function fetchData() {
      const isVideoInResult = result.find((video) => {
        if (opened === video?.videoId) {
          setCurrentVideo(video)
          return true
        }
      })

      if (!isVideoInResult) {
        const res = await LoadVideoById({ call: 1, videoId: opened })
        setCurrentVideo(res.result)
      }
    }
    fetchData()
  }, [opened, result])
  return (
    <div className={s.videoLayout_wrapper}>
      <section className={s.videoLayout}>
        <div
          className={s.videoLayout__close}
          onClick={closeVideoLayoutHandler}
        />
        <CurrentVideoCheck currentVideo={currentVideo} />
      </section>
    </div>
  )
}
