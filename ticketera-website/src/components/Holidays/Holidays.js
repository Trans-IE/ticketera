// components/holidays/Holidays.js

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
  holidayGetRowset,
  holidayUpdate,
  holidayCreate,
  holidayDelete,
} from "../../redux/actions/holidayActions";
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

const Holidays = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const holidays = useSelector((state) => state?.holidays?.holidays || []);

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [undoHoliday, setUndoHoliday] = useState(null);

  useEffect(() => {
    dispatch(holidayGetRowset());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (fecha) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este feriado?")) {
      const holiday = holidays.find((holiday) => holiday.fecha === fecha);
      if (holiday) {
        setUndoHoliday(holidayDelete);
        dispatch(holidayDelete(holiday))
          .then(() => {
            dispatch(holidayGetRowset());
            setSnackbarOpen(true);
          })
          .catch((error) => {
            console.error("Error deleting holiday:", error);
            alert(`No se pudo eliminar el feriado. Error: ${error.message}`);
          });
      }
    }
  };

  const handleUndo = () => {
    if (undoHoliday) {
      const reenabledHoliday = { ...undoHoliday, habilitado: true };
      dispatch(holidayUpdate(reenabledHoliday)).then(() => {
        dispatch(holidayGetRowset());
        setUndoHoliday(null);
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
      dispatch(holidayUpdate({ ...newItem, fecha: editingItem.fecha })).then(
        () => {
          dispatch(holidayGetRowset());
        }
      );
    } else {
      dispatch(holidayCreate(newItem)).then(() => {
        dispatch(holidayGetRowset());
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

  const filteredHolidays = holidays.filter((holiday) =>
    holiday.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { id: "fecha", label: "Fecha", render: (row) => formatDate(row.fecha) },
    { id: "descripcion", label: "Descripción" },
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
          <IconButton onClick={() => handleDelete(row.fecha)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const fields = [
    { id: "fecha", label: "Fecha", type: "date", required: true },
    { id: "descripcion", label: "Descripción", type: "text", required: true },
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
                  placeholder="Buscar Feriado"
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
                  Añadir Feriado
                </ButtonTrans>
              </Box>
            </Box>
            <Box sx={{ width: "90vw" }}>
              <ItemTable columns={columns} data={filteredHolidays} />
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
              {editingItem ? "Editar Feriado" : "Añadir Nuevo Feriado"}
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>
            <CreateItemDrawer
              fields={fields}
              type="date"
              holidays={holidays}
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
          message="Feriado eliminado"
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

export default Holidays;
