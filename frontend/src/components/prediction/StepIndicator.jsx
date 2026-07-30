function StepIndicator({ currentStep, totalSteps, title }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white transition-colors duration-300">
        Smart House Price Prediction
      </h2>

      <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
        Step {currentStep + 1} of {totalSteps}
      </p>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700 transition-colors duration-300">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-slate-700 dark:text-gray-100 transition-colors duration-300">
        {title}
      </h3>
    </div>
  );
}

export default StepIndicator;