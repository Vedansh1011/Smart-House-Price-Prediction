import Input from "../../common/Input";
import SectionCard from "../../common/SectionCard";

function InteriorRooms() {
  return (
    <SectionCard
      icon="🛏️"
      title="Interior Rooms"
    >
      <Input
        name="BedroomAbvGr"
        label="Bedrooms Above Ground"
        type="number"
        placeholder="e.g. 3"
        rules={{
          required: "Bedrooms are required",
        }}
      />

      <Input
        name="FullBath"
        label="Full Bathrooms"
        type="number"
        placeholder="e.g. 2"
        rules={{
          required: "Full bathrooms are required",
        }}
      />

      <Input
        name="HalfBath"
        label="Half Bathrooms"
        type="number"
        placeholder="e.g. 1"
      />

      <Input
        name="TotRmsAbvGrd"
        label="Total Rooms Above Ground"
        type="number"
        placeholder="e.g. 7"
        rules={{
          required: "Total rooms are required",
        }}
      />

      <Input
        name="Fireplaces"
        label="Number of Fireplaces"
        type="number"
        placeholder="e.g. 1"
      />
    </SectionCard>
  );
}

export default InteriorRooms;