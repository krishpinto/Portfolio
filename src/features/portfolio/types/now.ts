type NowItemBase = {
  /**
   * Artwork under `/public`. Shown as the crisp tile, and blurred behind the
   * whole cell so the strip takes its colour from the art itself.
   */
  artwork?: string
  /** Optional link out. */
  href?: string
}

export type NowWatching = NowItemBase & {
  title: string
  /** Episode you are on. Omit for films. */
  episode?: number
  /** Total episodes, if the run is finished. Draws the progress hairline. */
  totalEpisodes?: number
}

export type NowListening = NowItemBase & {
  track: string
  artist: string
  /** Track length in seconds. */
  duration: number
  /** Where playback sits on first paint, in seconds. It ticks on from here. */
  position: number
}
