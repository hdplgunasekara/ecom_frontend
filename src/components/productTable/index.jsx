import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProducts ,deleteProduct } from "../../redux/productSlice";
import { SvgIcon, IconButton } from "@mui/material";
import { ReactComponent as StarIcon } from "../../assets/starred.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";
import { getProductToEdit } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";
import Swal from "sweetalert";

export default function ProductTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { isLoading } = useSelector((state) => state.product);

  const handleDeleteClick = (id) => {
    console.log(id);
    Swal({
      title: "ARE YOU SURE?",
      text: "You will not be able to undo this action if you proceed!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProduct(id)).then((res) => {
          Swal({
            title: "Done!",
            text: "Product is deleted",
            icon: "success",
            timer: 2000,
            button: false,
          });
          dispatch(getProducts());
        });
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ color: "#001EB9" }}>
              SKU
            </TableCell>
            <TableCell align="left" sx={{ color: "#001EB9" }}>
              IMAGE
            </TableCell>
            <TableCell align="left" sx={{ color: "#001EB9" }}>
              PRODUCT&nbsp;NAME
            </TableCell>
            <TableCell align="left" sx={{ color: "#001EB9" }}>
              PRICE
            </TableCell>
            <TableCell align="left" sx={{ color: "#001EB9" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((product) => (
            <TableRow
              key={product._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {product.sku}
              </TableCell>
              <TableCell align="left">
                <img
                  src={product.images[0]}
                  width={100}
                  height={100}
                  alt="Product image"
                />
              </TableCell>
              <TableCell align="left">{product.product_name}</TableCell>
              <TableCell align="left">{product.price}</TableCell>
              <TableCell align="left">
                <Box>
                  <IconButton
                    onClick={() => {
                      handleDeleteClick(product._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      dispatch(getProductToEdit(product._id));
                      navigate(`/edit/${product._id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <StarIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
