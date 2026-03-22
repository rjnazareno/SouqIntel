function NotesPyramid({ notes }) {
  if (!notes) return null

  const { top = [], middle = [], base = [] } = notes

  const NoteTag = ({ note }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white shadow-sm border border-gray-100">
      {note.name || note}
    </span>
  )

  return (
    <div className="max-w-xl mx-auto">
      {/* Top Notes */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[200px] border-l-transparent border-r-[200px] border-r-transparent border-b-[120px] border-b-amber-100 opacity-50"></div>
        </div>
        <div className="relative text-center py-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Top Notes</p>
          <p className="text-xs text-gray-400 mb-3">First impression • 15-30 min</p>
          <div className="flex flex-wrap justify-center gap-2">
            {top.length > 0 ? (
              top.map((note, idx) => <NoteTag key={idx} note={note} />)
            ) : (
              <span className="text-gray-400 text-sm">No top notes listed</span>
            )}
          </div>
        </div>
      </div>

      {/* Middle Notes */}
      <div className="relative mb-8">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 bg-gradient-to-r from-transparent via-orange-50 to-transparent opacity-50"></div>
        <div className="relative text-center py-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Heart Notes</p>
          <p className="text-xs text-gray-400 mb-3">The heart • 30 min - 4 hrs</p>
          <div className="flex flex-wrap justify-center gap-2">
            {middle.length > 0 ? (
              middle.map((note, idx) => <NoteTag key={idx} note={note} />)
            ) : (
              <span className="text-gray-400 text-sm">No heart notes listed</span>
            )}
          </div>
        </div>
      </div>

      {/* Base Notes */}
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-amber-50 to-transparent opacity-50"></div>
        <div className="relative text-center py-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Base Notes</p>
          <p className="text-xs text-gray-400 mb-3">The foundation • 4+ hrs</p>
          <div className="flex flex-wrap justify-center gap-2">
            {base.length > 0 ? (
              base.map((note, idx) => <NoteTag key={idx} note={note} />)
            ) : (
              <span className="text-gray-400 text-sm">No base notes listed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesPyramid
