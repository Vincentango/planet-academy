export function SampleVideo({
  src,
  label,
  title,
  caption,
}: {
  src: string
  label: string
  title?: string
  caption?: string
}) {
  return (
    <div className="mosaic__media">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label={label}
      />
      <span className="mosaic__chip chip-yellow">{label}</span>
      {title || caption ? (
        <div className="mosaic__overlay">
          {title ? <p className="mosaic__title">{title}</p> : null}
          {caption ? <p className="mosaic__caption">{caption}</p> : null}
        </div>
      ) : null}
    </div>
  )
}
