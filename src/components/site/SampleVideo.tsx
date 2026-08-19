export function SampleVideo({ src, label }: { src: string; label: string }) {
  return (
    <div className="gsd-split__media">
      <span className="gsd-split__caption chip-yellow">{label}</span>
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
    </div>
  )
}
