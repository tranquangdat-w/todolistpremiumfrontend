import { MenuItem, Select } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableChartIcon from "@mui/icons-material/TableChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import MapIcon from "@mui/icons-material/Map";
import { useState } from "react";

export default function ViewSelect() {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "board", label: "Board", icon: <ViewModuleIcon /> },
    { value: "table", label: "Table", icon: <TableChartIcon /> },
    { value: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  ];

  return (
    <Select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      displayEmpty
      renderValue={(selected) => {
        // If nothing is selected, show default icon
        if (!selected) return <ViewModuleIcon />;
        // Show only the icon of the selected item
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
