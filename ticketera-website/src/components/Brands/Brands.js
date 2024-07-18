import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Typography,
  TablePagination,
  TextField,
  IconButton,
  Drawer,
  List,
  Divider,
  Snackbar,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Close from "@mui/icons-material/Close";
import {
  brandGetRowset,
  brandUpdate,
  brandCreate,
} from "../../redux/actions/brandActions";
import ItemTable from "../table/Table";
import CreateItemDrawer from "../createItemDrawer/Create";
import ContainerWithMenu from "../root/ContainerWithMenu";
import { ButtonTrans } from "../ui/ButtonTrans";

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

const Brands = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [undoBrand, setUndoBrand] = useState(null);

  useEffect(() => {
    dispatch(brandGetRowset());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    const brand = brands.find((brand) => brand.id === id);
    if (brand) {
      const updatedBrand = { ...brand, habilitado: false };
      setUndoBrand(updatedBrand);
      dispatch(brandUpdate(updatedBrand))
        .then(() => {
          dispatch(brandGetRowset());
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.error("Error updating brand:", error);
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario
          alert(`No se pudo eliminar la marca. Error: ${error.message}`);
        });
    }
  };

  const handleUndo = () => {
    if (undoBrand) {
      const reenabledBrand = { ...undoBrand, habilitado: true };
      dispatch(brandUpdate(reenabledBrand)).then(() => {
        dispatch(brandGetRowset());
        setUndoBrand(null);
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
    setDrawerOpen(true);
  };

  const handleSaveItem = (newItem) => {
    if (editingItem) {
      dispatch(brandUpdate({ ...newItem, id: editingItem.id })).then(() => {
        dispatch(brandGetRowset());
      });
    } else {
      dispatch(brandCreate(newItem)).then(() => {
        dispatch(brandGetRowset());
      });
    }
    setDrawerOpen(false);
    setEditingItem(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBrands = brands
    // .filter((brand) => brand.habilitado) // Filtra las marcas habilitadas
    .filter((brand) =>
      brand.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const columns = [
    { id: "nombre", label: "Marca" },
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
                  placeholder="Buscar Marca"
                  value={searchTerm}
                  onChange={handleSearchChange}
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
              <Box>
                <ButtonTrans
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleDrawerOpen}
                >
                  Añadir Marca
                </ButtonTrans>
              </Box>
            </Box>
            <Box sx={{ width: "90vw" }}>
              <ItemTable columns={columns} data={filteredBrands} />
            </Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredBrands.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
          open={drawerOpen}
          onClose={handleDrawerClose}
        >
          <DrawerHeader sx={{ height: "fit-content" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
            <Typography variant="h6">
              {editingItem ? "Editar Marca" : "Añadir Nueva Marca"}
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
          message="Marca eliminada"
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

export default Brands;
