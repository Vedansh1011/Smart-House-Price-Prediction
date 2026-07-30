import {
  FaBrain,
  FaReact,
  FaPython,
  FaServer,
} from "react-icons/fa";

function About() {
  return (
    <section
      id="about"
      className="bg-white py-20 transition-colors duration-500 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-slate-800 dark:text-white">
          About This Project
        </h2>

        <p className="mt-6 max-w-4xl mx-auto text-center text-gray-600 text-lg leading-8 dark:text-gray-300">
          Smart House Price Prediction is an AI-powered web application that
          predicts residential property prices using a trained Gradient
          Boosting Machine Learning model. The application combines React,
          FastAPI and Machine Learning to deliver accurate house price
          predictions through an intuitive interface.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          <div className="bg-slate-50 rounded-2xl shadow-md p-8 text-center transition-colors duration-500 dark:bg-slate-800">
            <FaBrain className="mx-auto text-5xl text-blue-600" />
            <h3 className="mt-5 text-xl font-bold text-slate-800 dark:text-white">
              AI Model
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Gradient Boosting Regressor trained on housing datasets.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl shadow-md p-8 text-center transition-colors duration-500 dark:bg-slate-800">
            <FaReact className="mx-auto text-5xl text-cyan-500" />
            <h3 className="mt-5 text-xl font-bold text-slate-800 dark:text-white">
              React
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Modern responsive frontend with interactive UI.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl shadow-md p-8 text-center transition-colors duration-500 dark:bg-slate-800">
            <FaPython className="mx-auto text-5xl text-yellow-500" />
            <h3 className="mt-5 text-xl font-bold text-slate-800 dark:text-white">
              Python
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Backend developed using Python and Machine Learning.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl shadow-md p-8 text-center transition-colors duration-500 dark:bg-slate-800">
            <FaServer className="mx-auto text-5xl text-green-600" />
            <h3 className="mt-5 text-xl font-bold text-slate-800 dark:text-white">
              FastAPI
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              High-performance REST API serving prediction requests.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;