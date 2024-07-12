import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ButtonTrans } from "../ui/ButtonTrans";

export default function CreateItemDrawer({ columns, brands, onSave, onClose }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({});

  const handleChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSave = () => {
    const newItem = {
      nombre: formData.nombre || "",
      modelo: formData.modelo || "",
      marca_id: formData.brandName || "",
      habilitado : true, // Use the brand ID for saving
    };

    // Check if all required fields are filled
    if (!newItem.nombre || !newItem.marca_id) {
      // Show an alert if some fields are missing
      alert("Please fill all required fields.");
      return;
    }

    onSave(newItem);
  };

  return (
    <Box sx={{ padding: theme.spacing(3) }}>
      {columns.map((column) => (
        <FormControl
          key={column.id}
          required
          fullWidth
          sx={{
            marginBottom: theme.spacing(2),
            "& .MuiInputLabel-root": {
              color: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.dark,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.dark,
              },
            },
            "& .MuiSelect-icon": {
              color: theme.palette.primary.main,
            },
          }}
        >
          {column.id === "brandName" ? (
            <>
              <InputLabel>{column.label}</InputLabel>
              <Select
                value={formData[column.id] || ""}
                onChange={(e) => handleChange(column.id, e.target.value)}
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.dark,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.dark,
                  },
                }}
              >
                {brands.map((brand) => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.nombre}
                  </MenuItem>
                ))}
              </Select>
            </>
          ) : (
            <TextField
              label={column.label}
              placeholder={`Enter ${column.label.toLowerCase()}`}
              value={formData[column.id] || ""}
              onChange={(e) => handleChange(column.id, e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.dark,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.dark,
                  },
                },
              }}
            />
          )}
        </FormControl>
      ))}
      <Box sx={{ marginTop: theme.spacing(2), textAlign: "right" }}>
        <Button onClick={onClose} sx={{ marginRight: theme.spacing(1) }}>
          Cancel
        </Button>
        <ButtonTrans variant="contained" color="primary" onClick={handleSave}>
          Save Product
        </ButtonTrans>
      </Box>
    </Box>
  );
}
