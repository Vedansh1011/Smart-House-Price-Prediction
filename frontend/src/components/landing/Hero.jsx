import { FaArrowRight, FaChartLine, FaHome } from "react-icons/fa";

function Hero() {
  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 transition-colors duration-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Section */}
        <div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold dark:bg-slate-700 dark:text-blue-300">
            <FaChartLine />
            AI Powered Prediction
          </div>

          <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold text-slate-800 leading-tight dark:text-white">
            Smart House
            <span className="block text-blue-700 dark:text-blue-400">
              Price Prediction
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8 dark:text-gray-300">
            Predict residential property prices using an optimized
            Gradient Boosting Machine Learning model with an
            interactive web application powered by FastAPI and React.
          </p>

          <div className="mt-10 flex gap-4">

            <button
              onClick={() =>
                document
                  .getElementById("prediction")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="px-7 py-4 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition flex items-center gap-3"
            >
              Start Prediction
              <FaArrowRight />
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="px-7 py-4 rounded-xl border border-blue-700 text-blue-700 font-semibold hover:bg-blue-50 transition dark:border-blue-400 dark:text-blue-300 dark:hover:bg-slate-700"
            >
              Learn More
            </button>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex justify-center">

          <div className="w-105 h-105 rounded-3xl bg-white shadow-2xl flex flex-col items-center justify-center transition-colors duration-500 dark:bg-slate-800">

            <FaHome className="text-8xl text-blue-600" />

            <h2 className="mt-6 text-2xl font-bold text-slate-800 dark:text-white">
              Machine Learning Dashboard
            </h2>

            <p className="mt-4 text-gray-500 text-center px-10 dark:text-gray-300">
              Predict house prices instantly using trained AI models.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;