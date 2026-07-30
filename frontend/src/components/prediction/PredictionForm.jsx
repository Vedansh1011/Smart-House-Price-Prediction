import { FormProvider, useForm } from "react-hook-form";
import BasicInfo from "./steps/BasicInfo";
import Dimensions from "./steps/Dimensions";
import GarageInfo from "./GarageInfo";

function PredictionForm() {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      OverallQual: "",
      OverallCond: "",
      YearBuilt: "",
      YearRemodAdd: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section id="prediction" className="bg-slate-50 py-20">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto max-w-6xl space-y-8 px-6"
        >
          <BasicInfo />
          <Dimensions />
          <GarageInfo />
        </form>
      </FormProvider>
    </section>
  );
}

export default PredictionForm;