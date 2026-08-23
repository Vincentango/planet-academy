const EN_CHARS = ['C', 'R', 'A', 'D', 'L', 'E', '-', 'X'] as const

type WordmarkProps = {
  className?: string
}

export function Wordmark({ className }: WordmarkProps) {
  return (
    <span className={className ? `wordmark ${className}` : 'wordmark'}>
      <span className="wordmark-zh">星球学院</span>
      <span className="wordmark-en" aria-label="CRADLE-X">
        {EN_CHARS.map((ch, i) => (
          <span key={`${ch}-${i}`} className="wordmark-en__ch" aria-hidden="true">
            {ch}
          </span>
        ))}
      </span>
    </span>
  )
}
