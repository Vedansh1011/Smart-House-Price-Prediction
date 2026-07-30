function Navigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}) {
  return (
    <div className="mt-10 flex justify-between">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onPrevious();
        }}
        disabled={currentStep === 0}
        className="
          rounded-lg
          px-6
          py-3
          font-semibold
          transition-all
          duration-300
          bg-gray-200
          text-slate-800
          hover:bg-gray-300
          disabled:opacity-50
          disabled:cursor-not-allowed
          dark:bg-slate-700
          dark:text-white
          dark:hover:bg-slate-600"
      >
        ← Previous
      </button>

      {currentStep === totalSteps - 1 ? (
        <button
          type="submit"
          className="
            rounded-lg
            px-6
            py-3
            font-semibold
            text-white
            bg-blue-600
            transition-all
            duration-300
            hover:bg-blue-700
            hover:scale-105
            active:scale-95
            shadow-md
            hover:shadow-xl
            dark:bg-blue-500
            dark:hover:bg-blue-600"
        >
          Predict Price
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onNext();
          }}
          className="
            rounded-lg
            px-6
            py-3
            font-semibold
            text-white
            bg-blue-600
            transition-all
            duration-300
            hover:bg-blue-700
            hover:scale-105
            active:scale-95
            shadow-md
            hover:shadow-xl
            dark:bg-blue-500
            dark:hover:bg-blue-600"
        >
          Next →
        </button>
      )}
    </div>
  );
}

export default Navigation;