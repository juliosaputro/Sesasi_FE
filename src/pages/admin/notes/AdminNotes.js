import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import ContentLayout from "../../../components/ContentLayout";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/table/cell_table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import AlertDialog from "../../../components/dialog/alertdialog";
import SuccsesDialog from "../../../components/dialog/succesdialog";
import ErrorDialog from "../../../components/dialog/errordialog";
import { useDelete, useGet } from "../../../helper/request";
import NoRecords from "../../../components/table/no_records";
import GlobalHeader from "../../../components/GlobalHeader";

function AdminNotes() {
  const columns = ["No", "Title", "Note", "Action"];
  // state
  const [datas, setDatas] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [msgResponse, setMsgResponse] = useState("");
  const [successDelete, setSuccessDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  // table pagination
  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 0,
  });

  const generateRowNumber = () => {
    return pagination.page * pagination.pageSize + 1;
  };

  // get data
  const [fetch_list_notes, res_list_notes] = useGet();

  function fetch_list() {
    fetch_list_notes({}, "notes");
  }

  useEffect(() => {
    fetch_list();
    setLoadData(true);
  }, []);

  useEffect(() => {
    if (res_list_notes.success) {
      setDatas(res_list_notes.success_res.notes || []);
      setLoadData(false);
    }
  }, [res_list_notes.success]);

  useEffect(() => {
    if (res_list_notes.failed) {
      setMsgResponse(
        res_list_notes.error_res?.data?.message || "Error get data!"
      );
      setErrorDelete(true);
      setLoadData(false);
    }
  }, [res_list_notes.failed]);

  const [delete_data, res_delete] = useDelete(`notes/${idDelete}`);
  function deleteData() {
    delete_data();
    closeDialog();
  }

  useEffect(() => {
    if (res_delete.success) {
      setMsgResponse(res_delete.success_res.message || "Successfull");
      setSuccessDelete(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [res_delete.success]);

  useEffect(() => {
    if (res_delete.failed) {
      setMsgResponse("Failed to Delete Data");
    }
  }, [res_delete.failed]);

  //alert dialog
  const openDialog = (id) => {
    setDialogOpen(true);
    setIdDelete(id);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Navbar />
      <GlobalHeader title="Notes" />
      <ContentLayout>
        <div className="p-8">
          <TableContainer>
            <div className="flex w-full justify-end">
              <Button
                sx={{ borderRadius: 18 }}
                variant="contained"
                color="info"
                startIcon={<AddCircleOutlineIcon fontSize="medium" />}
                component={Link}
                to={`create`}
                state={{ action: "Create" }}
              >
                Create
              </Button>
            </div>
            <Table
              className="simple w-full min-w-full"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell key={index}>
                      <Typography
                        color="text.secondary"
                        className="font-bold text-18 whitespace-nowrap"
                      >
                        {column}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {datas
                  .slice(
                    pagination.page * pagination.pageSize,
                    pagination.page * pagination.pageSize + pagination.pageSize
                  )
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          {generateRowNumber() + index}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          {row?.title}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          {row?.note && row.note.length > 30
                            ? `${row.note.slice(0, 30)}...`
                            : row.note}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <IconButton
                          className="bg-transparent "
                          component={Link}
                          to={`edit/${row.note_id}`}
                          state={{ id_edit: row.note_id, action: "Edit" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => openDialog(row.note_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            {loadData && (
              <div className="w-full flex items-center justify-center py-8">
                <CircularProgress size={40} color="info" />
              </div>
            )}
            {datas.length === 0 && !loadData && (
              <div className="w-full flex items-center justify-center py-8">
                <NoRecords />
              </div>
            )}
            <TablePagination
              component="div"
              count={datas.length}
              rowsPerPage={pagination.pageSize}
              page={pagination.page}
              onPageChange={(e, page) => {
                setPagination({ ...pagination, page: page });
              }}
              onRowsPerPageChange={(e) => {
                setPagination({ ...pagination, pageSize: e.target.value });
              }}
            />
          </TableContainer>
          <AlertDialog
            dialog={dialogOpen}
            onDelete={deleteData}
            closedialog={closeDialog}
            opendialog={openDialog}
          />
          <SuccsesDialog
            dialog={successDelete}
            closedialog={() => setSuccessDelete(false)}
            message={msgResponse}
          />
          <ErrorDialog
            dialog={errorDelete}
            closedialog={() => setErrorDelete(false)}
            message={msgResponse}
          />
        </div>
      </ContentLayout>
    </div>
  );
}

export default AdminNotes;
