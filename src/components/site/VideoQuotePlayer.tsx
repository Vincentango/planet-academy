'use client'

import { useEffect, useRef, useState } from 'react'

export function VideoQuotePlayer({
  src,
  english,
  chinese,
}: {
  src: string
  english?: string
  chinese?: string
}) {
  const [open, setOpen] = useState(false)
  const preview = useRef<HTMLVideoElement>(null)
  const full = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (open) preview.current?.pause()
    else void preview.current?.play().catch(() => {})
  }, [open])

  useEffect(() => {
    if (!open) return
    const video = full.current
    if (video) {
      video.muted = false
      video.currentTime = 0
      void video.play().catch(() => {})
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <article
        className="video-quote"
        role="button"
        tabIndex={0}
        aria-label="放大播放视频"
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        <video ref={preview} src={src} autoPlay muted loop playsInline />
        <div className="video-quote__veil" />
        <div className="video-quote__copy">
          {english ? <p className="video-quote__en">{english}</p> : null}
          {chinese ? <p className="video-quote__zh">{chinese}</p> : null}
        </div>
      </article>
      {open ? (
        <div className="video-quote-modal" onClick={() => setOpen(false)}>
          <button type="button" className="video-quote-modal__close" aria-label="关闭">
            关闭
          </button>
          <video
            ref={full}
            src={src}
            controls
            autoPlay
            playsInline
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  )
}
