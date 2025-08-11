import { MenuItem, Select } from "@mui/material";

export default function ViewSelect({ options, selectedOption, setSelectedOption }) {
  return (
    <Select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      displayEmpty
      renderValue={(selected) => {
        if (!selected) return options[0]?.icon || null; // Default icon
        const option = options.find((opt) => opt.value === selected);
        return option ? option.icon : null;
      }}
      sx={{
        background: "#fff",
        borderRadius: 2,
        minWidth: 48,
        height: 40,
        ".MuiSelect-select": {
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {opt.icon}
            {opt.label}
          </span>
        </MenuItem>
      ))}
    </Select>
  );
}
