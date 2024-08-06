import React, { useState, useEffect } from "react";
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

export default function CreateItemDrawer({
  fields,
  brands,
  onSave,
  onClose,
  editingItem,
}) {
  const theme = useTheme();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

  const handleChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
    console.log(formData, "FORMDATA");
  };

  const handleSave = () => {
    const newItem = { ...formData };

    const requiredFields = fields.filter((field) => field.required);

    for (let field of requiredFields) {
      if (!newItem[field.id]) {
        alert("Please fill all required fields.");
        return;
      }
    }

    onSave(newItem);
  };

  return (
    <Box sx={{ padding: theme.spacing(3) }}>
      {fields.map((field) => (
        <FormControl
          key={field.id}
          required={field.required}
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
          {field.type === "select" ? (
            <>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
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
              label={field.label}
              type={field.type === "date" ? "date" : "text"}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
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
              InputLabelProps={{
                shrink: field.type === "date" ? true : undefined,
              }}
            />
          )}
        </FormControl>
      ))}
      <Box sx={{ marginTop: theme.spacing(2), textAlign: "right" }}>
        <Button onClick={onClose} sx={{ marginRight: theme.spacing(1) }}>
          Cancelar
        </Button>
        <ButtonTrans variant="contained" color="primary" onClick={handleSave}>
          Guardar
        </ButtonTrans>
      </Box>
    </Box>
  );
}
