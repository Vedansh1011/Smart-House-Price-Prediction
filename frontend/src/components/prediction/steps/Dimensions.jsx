import Input from "../../common/Input";
import SectionCard from "../../common/SectionCard";

function Dimensions() {
  return (
    <SectionCard
      icon="📐"
      title="House Dimensions"
    >
      <Input
        name="GrLivArea"
        label="Above Ground Living Area (sq ft)"
        type="number"
        placeholder="e.g. 1710"
        rules={{
          required: "Living Area is required",
          min: {
            value: 100,
            message: "Enter a valid area",
          },
        }}
      />

      <Input
        name="1stFlrSF"
        label="First Floor Area (sq ft)"
        type="number"
        placeholder="e.g. 856"
        rules={{
          required: "First Floor Area is required",
        }}
      />

      <Input
        name="2ndFlrSF"
        label="Second Floor Area (sq ft)"
        type="number"
        placeholder="e.g. 854"
      />

      <Input
        name="TotalBsmtSF"
        label="Basement Area (sq ft)"
        type="number"
        placeholder="e.g. 856"
      />
    </SectionCard>
  );
}

export default Dimensions;