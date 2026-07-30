import {
  FaBrain,
  FaBolt,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBrain className="text-5xl text-blue-600" />,
    title: "Machine Learning",
    description:
      "Powered by an optimized Gradient Boosting Regression model trained on the Ames Housing dataset.",
  },
  {
    icon: <FaChartLine className="text-5xl text-green-600" />,
    title: "High Performance",
    description:
      "Built with a feature engineering pipeline and evaluated using standard regression metrics.",
  },
  {
    icon: <FaBolt className="text-5xl text-yellow-500" />,
    title: "Fast Prediction",
    description:
      "FastAPI serves predictions with low latency for a smooth user experience.",
  },
  {
    icon: <FaShieldAlt className="text-5xl text-purple-600" />,
    title: "Reliable Pipeline",
    description:
      "Consistent preprocessing and trained model artifacts ensure dependable predictions.",
  },
];

function Features() {
  return (
    <section className="bg-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800">
            Why Choose This Model?
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
            This application combines machine learning, a modern backend,
            and an intuitive frontend to deliver fast and reliable house
            price predictions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => (
            <div
              key={index}
              className="
                rounded-3xl
                bg-white
                p-8
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >
              <div className="mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-800">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;