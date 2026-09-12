/**
 * Analytics call sites, with no analytics behind them.
 *
 * This site shipped with PostHog, OpenPanel and Google Tag Manager inherited
 * from the template it started as. None was ever configured — no keys, no
 * container id — so all three collected nothing while still shipping their
 * client libraries to every visitor. They are gone.
 *
 * The calls stay because they record which interactions are worth measuring.
 * To start measuring again, wire a provider up in `trackEvent` and every site
 * below starts reporting; nothing else needs to change.
 */
export type Event = {
  name:
    | "copy_npm_command"
    | "copy_code_block"
    | "copy_block_code"
    | "copy_email"
    | "copy_phone_number"
    | "play_name_pronunciation"
    | "open_command_menu"
    | "command_menu_search"
    | "command_menu_action"
    | "blog_search"
  properties?: Record<string, string | number | boolean | null>
}

export function trackEvent(event: Event) {
  void event
}
