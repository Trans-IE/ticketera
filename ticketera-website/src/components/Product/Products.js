import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Chip,
  Typography,
  Snackbar,
  Button,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ItemTable from "../table/Table";
import CreateItemDrawer from "../createItemDrawer/Create";
import ContainerWithMenu from "../root/ContainerWithMenu";
import { ButtonTrans } from "../ui/ButtonTrans";
import {
  getAllProducts,
  getAllBrands,
  createProduct,
  updateProduct,
} from "../../redux/actions/productActions";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const Products = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { productsDataList: products, brandsDataList: brands } = useSelector(
    (state) => state.product
  );
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    model: "",
    sorting: 1, // Ordenar por defecto de más nuevo a más viejo
  });
  const [editingItem, setEditingItem] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [undoProduct, setUndoProduct] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllBrands());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setEditingItem(null);
  };

  const handleSaveItem = (newItem) => {
    if (editingItem) {
      dispatch(updateProduct(newItem)).then(() => {
        dispatch(getAllProducts());
      });
    } else {
      dispatch(createProduct(newItem)).then(() => {
        dispatch(getAllProducts());
      });
    }
    setOpen(false);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterChipDelete = (filterName) => {
    setFilters({ ...filters, [filterName]: "" });
  };

  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      const product = products.find((product) => product.id === id);
      if (product) {
        const updatedProduct = { ...product, habilitado: false };
        setUndoProduct(updatedProduct);
        dispatch(updateProduct(updatedProduct))
          .then(() => {
            dispatch(getAllProducts());
            setSnackbarOpen(true);
          })
          .catch((error) => {
            console.error("Error updating product:", error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario
            alert(`No se pudo eliminar el producto. Error: ${error.message}`);
          });
      }
    }
  };

  const handleUndo = () => {
    if (undoProduct) {
      const reenabledProduct = { ...undoProduct, habilitado: true };
      dispatch(updateProduct(reenabledProduct)).then(() => {
        dispatch(getAllProducts());
        setUndoProduct(null);
        setSnackbarOpen(false);
      });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setOpen(true);
  };

  // Map the brands to products locally
  const productsWithBrandNames = products.map((product) => {
    const brand = brands.find((brand) => brand.id === product.marca_id);
    return {
      ...product,
      brandName: brand ? brand.nombre : "Desconocido",
    };
  });

  const filteredData = productsWithBrandNames
    .filter((item) => item.habilitado) // Filtra los productos habilitados
    .filter((item) => {
      return (
        (filters.name === "" ||
          item.nombre.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.brand === "" || item.brandName === filters.brand) &&
        (filters.model === "" ||
          (item.modelo ?? "")
            .toLowerCase()
            .includes(filters.model.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (filters.sorting === 1) {
        return b.id - a.id; // Más nuevos
      } else if (filters.sorting === 2) {
        return a.id - b.id; // Más antiguos
      }
      return 0;
    });

  const columns = [
    { id: "nombre", label: "Producto" },
    { id: "brandName", label: "Marca" },
    { id: "modelo", label: "Modelo" },
    {
      id: "actions",
      label: "",
      render: (row) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <IconButton onClick={() => handleEdit(row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const fields = [
    { id: "nombre", label: "Nombre", type: "text", required: true },
    { id: "modelo", label: "Modelo", type: "text", required: true },
    { id: "marca_id", label: "Marca", type: "select", required: true },
  ];

  return (
    <ContainerWithMenu>
      <Box sx={{ display: "flex", overflow: "auto" }}>
        <CssBaseline />
        <Main open={open}>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <TextField
                  size="small"
                  placeholder="Producto"
                  name="name"
                  value={filters.name}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                    "& label": {
                      color: theme.palette.text.primary,
                    },
                    width: "150px",
                  }}
                />
                <FormControl size="small">
                  <InputLabel>Marca</InputLabel>
                  <Select
                    value={filters.brand}
                    name="brand"
                    onChange={handleInputChange}
                    sx={{ borderRadius: "20px", width: "150px" }}
                  >
                    <MenuItem value="">Marca</MenuItem>
                    {brands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.nombre}>
                        {brand.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  placeholder="Modelo"
                  name="model"
                  value={filters.model}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                    "& label": {
                      color: theme.palette.text.primary,
                    },
                    width: "150px",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {Object.entries(filters).map(([key, value]) => {
                  if (value && value !== "") {
                    return (
                      <Chip
                        key={key}
                        label={`${
                          key.charAt(0).toUpperCase() + key.slice(1)
                        }: ${value}`}
                        variant="outlined"
                        onDelete={() => handleFilterChipDelete(key)}
                      />
                    );
                  }
                  return null;
                })}
                <FormControl fullWidth size="small" sx={{ minWidth: "150px" }}>
                  <InputLabel>Ordenar por</InputLabel>
                  <Select
                    value={filters.sorting}
                    onChange={(e) =>
                      setFilters({ ...filters, sorting: e.target.value })
                    }
                    sx={{ borderRadius: "20px" }}
                  >
                    <MenuItem value={1}>Mas nuevos</MenuItem>
                    <MenuItem value={2}>Mas antiguos</MenuItem>
                  </Select>
                </FormControl>
                <Box>
                  <ButtonTrans
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleDrawerOpen}
                  >
                    Add Product
                  </ButtonTrans>
                </Box>
              </Box>
            </Box>

            <Box sx={{ width: "90vw" }}>
              <ItemTable columns={columns} data={filteredData} />
            </Box>
          </Box>
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader
            sx={{
              height: "fit-content",
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
            <Typography variant="h6">
              {editingItem ? "Editar Producto" : "Agregar Producto"}
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>
            <CreateItemDrawer
              fields={fields}
              brands={brands}
              onSave={handleSaveItem}
              onClose={handleDrawerClose}
              editingItem={editingItem}
            />
          </List>
        </Drawer>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={10000}
          onClose={handleSnackbarClose}
          message="Producto eliminado"
          action={
            <>
              <Button color="primary" size="large" onClick={handleUndo}>
                DESHACER
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <Close fontSize="small" />
              </IconButton>
            </>
          }
        />
      </Box>
    </ContainerWithMenu>
  );
};

export default Products;
