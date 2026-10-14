function NoteTag({ note }) {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm border border-noir-600 bg-noir-800 text-ivory-100 hover:border-gold-500/60 hover:text-gold-300 transition-colors cursor-default">
      {note.name || note}
    </span>
  )
}

function NoteSection({ title, subtitle, notesArray, width }) {
  return (
    <div className={`reveal relative mx-auto mb-4 last:mb-0 rounded-3xl border border-noir-600/70 bg-linear-to-b from-gold-500/7 to-transparent ${width}`}>
      <div className="text-center py-6 px-4">
        <p className="eyebrow mb-1">{title}</p>
        <p className="text-xs text-ivory-500 mb-4">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {notesArray.length > 0 ? (
            notesArray.map((note, idx) => <NoteTag key={idx} note={note} />)
          ) : (
            <span className="text-ivory-500 text-sm italic">No {title.toLowerCase()} listed</span>
          )}
        </div>
      </div>
    </div>
  )
}

// Widening tiers read as a pyramid: top notes narrowest, base widest.
function NotesPyramid({ notes }) {
  if (!notes) return null

  const { top = [], middle = [], base = [] } = notes

  return (
    <div className="max-w-2xl mx-auto">
      <NoteSection title="Top Notes" subtitle="First impression, 15-30 min" notesArray={top} width="max-w-md" />
      <NoteSection title="Heart Notes" subtitle="The heart, 30 min to 4 hrs" notesArray={middle} width="max-w-lg" />
      <NoteSection title="Base Notes" subtitle="The foundation, 4+ hrs" notesArray={base} width="max-w-2xl" />
    </div>
  )
}

export default NotesPyramid
