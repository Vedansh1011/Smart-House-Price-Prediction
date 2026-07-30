import Input from "../../common/Input";
import SectionCard from "../../common/SectionCard";

function GarageExterior() {
  return (
    <SectionCard
      icon="🚗"
      title="Garage & Exterior"
    >
      <Input
        name="GarageCars"
        label="Garage Capacity (Cars)"
        type="number"
        placeholder="e.g. 2"
        rules={{
          required: "Garage capacity is required",
          min: {
            value: 0,
            message: "Value cannot be negative",
          },
        }}
      />

      <Input
        name="GarageArea"
        label="Garage Area (sq ft)"
        type="number"
        placeholder="e.g. 548"
        rules={{
          required: "Garage area is required",
        }}
      />

      <Input
        name="LotFrontage"
        label="Lot Frontage (ft)"
        type="number"
        placeholder="e.g. 65"
      />

      <Input
        name="MasVnrArea"
        label="Masonry Veneer Area (sq ft)"
        type="number"
        placeholder="e.g. 196"
      />
    </SectionCard>
  );
}

export default GarageExterior;