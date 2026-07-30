import { useFormContext } from "react-hook-form";
import SectionCard from "../../common/SectionCard";

function Review() {
  const { watch } = useFormContext();

  const data = watch();

  return (
    <SectionCard
      icon="📋"
      title="Review Information"
    >
      <div className="space-y-8">

        {/* Basic Information */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
            🏠 Basic Information
          </h3>

          <div className="space-y-2">

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Overall Quality
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.OverallQual}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Overall Condition
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.OverallCond}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Year Built
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.YearBuilt}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Year Remodeled
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.YearRemodAdd}
              </span>
            </div>

          </div>
        </div>

        {/* House Dimensions */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
            📐 House Dimensions
          </h3>

          <div className="space-y-2">

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Living Area
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.GrLivArea} sq.ft
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                1st Floor Area
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data["1stFlrSF"]} sq.ft
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                2nd Floor Area
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data["2ndFlrSF"]} sq.ft
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Basement Area
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.TotalBsmtSF} sq.ft
              </span>
            </div>

          </div>
        </div>

        {/* Garage & Exterior */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
            🚗 Garage & Exterior
          </h3>

          <div className="space-y-2">

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Garage Capacity
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.GarageCars} Cars
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Garage Area
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.GarageArea} sq.ft
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Lot Frontage
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.LotFrontage} ft
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Masonry Veneer Area
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.MasVnrArea} sq.ft
              </span>
            </div>

          </div>
        </div>

        {/* Interior Rooms */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-slate-800 dark:text-white">
            🛏 Interior Rooms
          </h3>

          <div className="space-y-2">

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Bedrooms
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.BedroomAbvGr}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Full Bathrooms
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.FullBath}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Half Bathrooms
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.HalfBath}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Total Rooms
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.TotRmsAbvGrd}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-slate-700 dark:text-gray-300">
                Fireplaces
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {data.Fireplaces}
              </span>
            </div>

          </div>
        </div>

      </div>
    </SectionCard>
  );
}

export default Review;