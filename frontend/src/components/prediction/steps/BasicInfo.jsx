import Input from "../../common/Input";
import Select from "../../common/Select";
import SectionCard from "../../common/SectionCard";

import {
  overallQualityOptions,
  overallConditionOptions,
} from "../../../constants/formFields";

function BasicInfo() {
  return (
    <SectionCard
      icon="🏠"
      title="Basic Property Information"
    >
    <Select
      name="OverallQual"
      label="Overall Quality"
      options={overallQualityOptions}
      rules={{
        required: "Overall Quality is required",
      }}
    />

    <Select
      name="OverallCond"
      label="Overall Condition"
      options={overallConditionOptions}
      rules={{
        required: "Overall Condition is required",
      }}
    />

    <Input
      name="YearBuilt"
      label="Year Built"
      type="number"
      placeholder="e.g. 2005"
      rules={{
        required: "Year Built is required",
        min: {
          value: 1800,
          message: "Enter a valid year",
        },
      }}
    />

    <Input
      name="YearRemodAdd"
      label="Year Remodeled"
      type="number"
      placeholder="e.g. 2012"
      rules={{
        required: "Year Remodeled is required",
      }}
    />
    </SectionCard>
  );
}

export default BasicInfo;