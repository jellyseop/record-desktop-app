import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleCondition = ({ filter, setFilter }) => {
  const onChange = (_, newAlignment) => {
    if (newAlignment !== null) {
      setFilter(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={filter}
      size="large"
      fullWidth
      exclusive
      onChange={onChange}
      aria-label="Platform"
      className="toggle"
    >
      <ToggleButton value="all">전체</ToggleButton>
      <ToggleButton value="used">사용</ToggleButton>
      <ToggleButton value="unused">미사용</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleCondition;
