function KeywordChips({ items = [], title }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span key={item} className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-2 text-sm font-medium text-sky-600 dark:text-sky-300">
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-500 dark:text-slate-400">No items found.</span>
        )}
      </div>
    </div>
  );
}

export default KeywordChips;
