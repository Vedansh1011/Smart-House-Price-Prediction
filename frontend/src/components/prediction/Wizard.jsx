import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import BasicInfo from "./steps/BasicInfo";
import Dimensions from "./steps/Dimensions";
import GarageExterior from "./steps/GarageExterior";
import InteriorRooms from "./steps/InteriorRooms";
import Review from "./steps/Review";
import Navigation from "./Navigation";
import StepIndicator from "./StepIndicator";
import { predictHousePrice } from "../../services/api";

function Wizard() {
  const methods = useForm({
    mode: "onBlur",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nextStep = async () => {
    const isValid = await methods.trigger(
      stepFields[currentStep]
    );

    if (!isValid) return;

    if (currentStep < steps.length - 1) {

      // Clear previous prediction
      if (currentStep === steps.length - 2) {
        setPrediction(null);
        setError("");
      }

      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setPrediction(null);
      setError("");
      setCurrentStep((prev) => prev - 1);
    }
  };

  const steps = [
    <BasicInfo />,
    <Dimensions />,
    <GarageExterior />,
    <InteriorRooms />,
    <Review />,
  ];

  const stepTitles = [
    "Basic Property Information",
    "House Dimensions",
    "Garage & Exterior",
    "Interior Rooms",
    "Review & Predict",
  ];

  const stepFields = [
  [
    "OverallQual",
    "OverallCond",
    "YearBuilt",
    "YearRemodAdd",
  ],
  [
    "GrLivArea",
    "1stFlrSF",
    "2ndFlrSF",
    "TotalBsmtSF",
  ],
  [
    "GarageCars",
    "GarageArea",
    "LotFrontage",
    "MasVnrArea",
  ],
  [
    "BedroomAbvGr",
    "FullBath",
    "HalfBath",
    "TotRmsAbvGrd",
    "Fireplaces",
  ],
  [],
];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const result = await predictHousePrice(data);

      console.log(result);

      setPrediction(result["Predicted Price"]);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="prediction"
      className="bg-slate-50 py-20 transition-colors duration-500 dark:bg-slate-900"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto max-w-6xl px-6"
        >
          <StepIndicator
            currentStep={currentStep}
            totalSteps={steps.length}
            title={stepTitles[currentStep]}
          />

          {steps[currentStep]}

          {loading && (
            <div className="mt-6 text-center text-blue-600 font-semibold dark:text-blue-400">
              Predicting house price...
            </div>
          )}

          {error && (
            <div className="mt-4 text-center text-red-500">
              {error}
            </div>
          )}

          {prediction && (
            <div className="mt-6 rounded-lg bg-green-100 p-6 text-center transition-colors duration-500 dark:bg-green-900/30">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                Estimated House Price
              </h3>

              <p className="mt-2 text-3xl font-bold text-green-700 dark:text-green-300">
                ${prediction.toLocaleString()}
              </p>
            </div>
          )}

          <Navigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        </form>
      </FormProvider>
    </section>
  );
}

export default Wizard;