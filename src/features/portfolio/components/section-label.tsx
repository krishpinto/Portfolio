/**
 * The small underlined heading that sits above a technology row or a list of
 * bullets, copied from Ramx's cards. The rule is what separates one block from
 * the next without needing whitespace the page does not have.
 */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="border-b border-line pb-2 text-sm font-semibold">
      {children}
    </h4>
  )
}
