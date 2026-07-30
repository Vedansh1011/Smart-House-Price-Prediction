function Card({ title, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {title && (
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {title}
        </h2>
      )}

      {children}

    </div>
  );
}

export default Card;