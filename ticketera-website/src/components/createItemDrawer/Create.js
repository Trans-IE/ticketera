import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  options,
  onSave,
  onClose,
  editingItem,
}) {
  const theme = useTheme();
  const [formData, setFormData] = useState({});

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = useCallback((id, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }, []);

  const handleSave = useCallback(() => {
    const newItem = { ...formData };

    const requiredFields = fields.filter((field) => field.required);

    for (let field of requiredFields) {
      if (!newItem[field.id]) {
        alert("Please fill all required fields.");
        return;
      }
    }

    onSave(newItem);
  }, [formData, fields, onSave]);

  const renderField = useCallback(
    (field) => {
      switch (field.type) {
        case "select":
          return (
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
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "date":
          return (
            <TextField
              key={field.id}
              label={field.label}
              type="date"
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              fullWidth
              required={field.required}
              sx={{
                marginBottom: theme.spacing(2),
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
                shrink: true,
              }}
            />
          );
        default:
          return (
            <TextField
              key={field.id}
              label={field.label}
              type="text"
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              fullWidth
              required={field.required}
              sx={{
                marginBottom: theme.spacing(2),
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
          );
      }
    },
    [formData, handleChange, options, theme]
  );

  const renderedFields = useMemo(
    () => fields.map((field) => renderField(field)),
    [fields, renderField]
  );

  useEffect(() => {
    if (editingItem) {
      const formattedItem = { ...editingItem };
      if (formattedItem.fecha) {
        formattedItem.fecha = formatDateForInput(formattedItem.fecha);
      }
      setFormData(formattedItem);
    }
  }, [editingItem]);

  return (
    <Box sx={{ padding: theme.spacing(3) }}>
      {renderedFields}
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
