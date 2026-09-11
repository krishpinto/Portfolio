/** Four bars bouncing on staggered loops. Pure CSS, no state. */
export function Equalizer() {
  return (
    <span className="flex h-3 shrink-0 items-end gap-px" aria-hidden>
      {[0, 0.35, 0.15, 0.5].map((delay, index) => (
        <span
          key={index}
          className="w-0.5 animate-equalizer rounded-full bg-foreground"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  )
}
