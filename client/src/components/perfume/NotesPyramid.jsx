function NotesPyramid({ notes }) {
  if (!notes) return null

  const { top = [], middle = [], base = [] } = notes

  const NoteTag = ({ note }) => (
    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-cream-100 text-dark-700 border border-cream-200 hover:bg-accent-100 hover:text-accent-700 hover:border-accent-200 transition-colors cursor-default">
      {note.name || note}
    </span>
  )

  const NoteSection = ({ title, subtitle, notesArray, gradient }) => (
    <div className="relative mb-8 last:mb-0">
      <div className={`absolute inset-0 ${gradient} opacity-30 rounded-3xl`}></div>
      <div className="relative text-center py-6 px-4">
        <p className="text-xs uppercase tracking-widest text-dark-400 mb-1 font-semibold">{title}</p>
        <p className="text-xs text-dark-300 mb-4">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {notesArray.length > 0 ? (
            notesArray.map((note, idx) => <NoteTag key={idx} note={note} />)
          ) : (
            <span className="text-dark-400 text-sm italic">No {title.toLowerCase()} listed</span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <NoteSection 
        title="Top Notes" 
        subtitle="First impression • 15-30 min" 
        notesArray={top}
        gradient="bg-gradient-to-b from-accent-100 to-transparent"
      />
      <NoteSection 
        title="Heart Notes" 
        subtitle="The heart • 30 min - 4 hrs" 
        notesArray={middle}
        gradient="bg-gradient-to-b from-cream-200 to-transparent"
      />
      <NoteSection 
        title="Base Notes" 
        subtitle="The foundation • 4+ hrs" 
        notesArray={base}
        gradient="bg-gradient-to-t from-cream-200 to-transparent"
      />
    </div>
  )
}

export default NotesPyramid
