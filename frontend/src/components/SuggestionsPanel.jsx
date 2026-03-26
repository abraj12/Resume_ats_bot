function SuggestionsPanel({ suggestions = [], title = "Suggestions" }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {suggestions.length > 0 ? (
          suggestions.map((item, index) => (
            <div key={`${item}-${index}`} className="rounded-2xl border border-white/10 bg-white/60 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-950/40 dark:text-slate-300">
              {item}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">No suggestions available yet.</p>
        )}
      </div>
    </div>
  );
}

export default SuggestionsPanel;
