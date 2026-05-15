import React from 'react'

/**
 * Parses a string with **bold** markers and \n line breaks into React nodes.
 * - **text** → <strong> with boldColor (defaults to white)
 * - \n → <br />
 */
export function renderText(text: string, boldColor = '#fff'): React.ReactNode {
  return text.split('\n').map((line, li) => (
    <span key={li}>
      {li > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*)/).map((chunk, ci) =>
        chunk.startsWith('**') && chunk.endsWith('**')
          ? <strong key={ci} style={{ color: boldColor, fontWeight: 700 }}>{chunk.slice(2, -2)}</strong>
          : chunk
      )}
    </span>
  ))
}
