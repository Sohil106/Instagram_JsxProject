import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useController } from "react-hook-form";

const CustomSwitch = ({ name, control, defaultValue }) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    defaultValue: defaultValue || false,
  });

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            sx={{ color: "red" }}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
          />
        }
        label="Private"
      />
    </FormGroup>
  );
};

export default CustomSwitch;
