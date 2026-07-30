function SectionCard({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-500 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">{icon}</span>

        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
          {title}
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

export default SectionCard;