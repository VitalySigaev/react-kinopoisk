import { InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";

interface MySelectProps {
    options: (number | string)[];
    value: number | string;
    handleChange: (value: number | string) => void;
    label: string;

}

const MySelect: FC<MySelectProps> = ({ options, value, handleChange, label }) => {
    return (
        <div style={{ marginRight: 10 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                style={{ width: 290 }}
                value={value}
                onChange={(e) => handleChange(e.target.value as number | string)}
                label={label}
            >
                {options.map((option: number | string) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </div>
    );
}

export default MySelect;
