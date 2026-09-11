import type { NowListening, NowWatching } from "../types/now"

/**
 * The strip shows the first entry. Reorder to change what is on display, or
 * say the word and I'll make it cycle.
 */
export const WATCHING: NowWatching[] = [
  {
    title: "Hajime no Ippo",
    artwork: "/images/now/hajime-no-ippo.jpg",
    episode: 42,
    totalEpisodes: 75,
    href: "https://myanimelist.net/anime/263/Hajime_no_Ippo",
  },
  {
    title: "Hunter x Hunter",
    artwork: "/images/now/hunter-x-hunter.jpg",
    episode: 88,
    totalEpisodes: 148,
    href: "https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011",
  },
]

/** Flip to true to bring the music half of the strip back. */
export const SHOW_LISTENING = false

export const LISTENING: NowListening[] = [
  {
    track: "Soni De Nakhre",
    artist: "Wajid, Labh Janjua",
    // artwork: "/images/now/soni-de-nakhre.jpg",
    duration: 274,
    position: 96,
  },
]
