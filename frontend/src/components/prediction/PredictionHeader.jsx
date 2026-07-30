import { FaHouseUser } from "react-icons/fa";

function PredictionHeader() {
  return (
    <div className="text-center mb-14">

      <div className="inline-flex items-center gap-3 rounded-full bg-blue-100 px-5 py-2 text-blue-700 font-semibold">
        <FaHouseUser />
        AI Price Estimation
      </div>

      <h2 className="mt-6 text-5xl font-bold text-slate-800">
        Predict Your House Price
      </h2>

      <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-gray-600">
        Fill in your property's details and let our optimized
        Gradient Boosting model estimate its market value in just a
        few milliseconds.
      </p>

    </div>
  );
}

export default PredictionHeader;