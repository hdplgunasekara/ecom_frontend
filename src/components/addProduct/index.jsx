import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { SvgIcon } from "@mui/material";
import { addProduct, getProducts } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { LoadingOverlay } from "@mantine/core";

export default function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = React.useState(null);
  const [isImageAvailable, setIsImageAvailable] = React.useState(false);
  const { isLoading } = useSelector((state) => state.product);
  const [formData, setFormData] = React.useState({
    sku: "",
    product_name: "",
    product_description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    setIsImageAvailable(false);
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (images === null) {
      setIsImageAvailable(true);
      return;
    } else if (formData.sku === "") {
      swal("Please enter the product SKU");
      return;
    } else if (
      isNaN(formData.price) ||
      formData.price < 0 ||
      formData.price === ""
    ) {
      swal("Please enter a valid price (non empty positive value).");
      return;
    } else if (
      isNaN(formData.quantity) ||
      formData.quantity < 0 ||
      formData.quantity === ""
    ) {
      swal("Please enter a valid quantity (non empty positive value).");
      return;
    } else if (formData.product_description === "") {
      swal("Please enter the product description");
      return;
    } else if (formData.product_name === "") {
      swal("Please enter the product name");
      return;
    }

    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }
    data.append("sku", formData.sku);
    data.append("product_name", formData.product_name);
    data.append("product_description", formData.product_description);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    try {
      console.log(data);
      dispatch(addProduct(data)).then((res) => {
        swal({
          title: "Done!",
          text: "Product added successfully",
          icon: "success",
          timer: 2000,
          button: false,
        }).then(() => {
          dispatch(getProducts()).then(() => navigate("/"));
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  //
  return (
    <div>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Box sx={{ px: 16, py: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Typography variant="h3" align="left" sx={{ pr: 3 }}>
            PRODUCTS
          </Typography>
          <SvgIcon component={ArrowIcon} />
          <Typography
            variant="h6"
            align="left"
            sx={{ pl: 3, color: "#001EB9" }}
          >
            Add new product
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              align="left"
              sx={{ mr: 4.5, fontSize: 18 }}
            >
              SKU
            </Typography>
            <TextField
              id="filled-basic"
              variant="filled"
              sx={{ width: "40%" }}
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
            <Typography
              variant="h6"
              align="left"
              sx={{ mr: 3, fontSize: 18, ml: 20 }}
            >
              Price
            </Typography>
            <TextField
              id="filled-basic"
              variant="filled"
              sx={{ width: "40%" }}
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" align="left" sx={{ mr: 3, fontSize: 18 }}>
              Name
            </Typography>
            <TextField
              id="filled-basic"
              variant="filled"
              sx={{ width: "40%" }}
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
            />
            <Typography
              variant="h6"
              align="left"
              sx={{ mr: 3, fontSize: 18, ml: 20 }}
            >
              QTY
            </Typography>
            <TextField
              id="filled-basic"
              variant="filled"
              sx={{ width: "40%" }}
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Box
          sx={{
            mb: 3,
          }}
        >
          <Typography variant="h6" align="left" sx={{ fontSize: 18, ml: 2 }}>
            Product Description
          </Typography>
          <Typography
            variant="h6"
            align="left"
            sx={{ fontSize: 14, ml: 2, mb: 2, color: "#969191" }}
          >
            A small description about the product
          </Typography>
          <TextField
            id="filled-multiline-static"
            multiline
            rows={5}
            variant="filled"
            sx={{ width: "100%" }}
            name="product_description"
            value={formData.product_description}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h6" align="left" sx={{ fontSize: 18, ml: 2 }}>
              Add Images
            </Typography>
            <Typography
              variant="h6"
              align="left"
              sx={{ fontSize: 14, ml: 2, mb: 2, color: "#969191" }}
            >
              PNG,JPG,SVG or GIF <br></br>(Maximun file size 50mb)
            </Typography>
          </Box>
          <input
            accept="image/*"
            id="images-input"
            multiple
            type="file"
            onChange={handleImageChange}
            hidden
          />
          <label htmlFor="images-input">
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                fontSize: 14,
                width: 50,
                height: 45,
                ml: 5,
                bgcolor: "#001EB9",
                mt: 2,
              }}
              component="span"
            >
              <Typography variant="h6" sx={{ fontSize: 30 }}>
                +
              </Typography>
            </Button>
          </label>
          {images && (
            <Typography variant="h6" sx={{ fontSize: 16, mt: 3, ml: 3 }}>
              {images.length} Images Selected
            </Typography>
          )}
          {isImageAvailable && (
            <Typography
              variant="h6"
              sx={{ fontSize: 16, mt: 3, ml: 3, color: "red" }}
            >
              Please select at least one image
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            borderRadius: 1,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                fontSize: 14,
                width: 200,
                height: 45,
                bgcolor: "#001EB9",
                textTransform: "none",
              }}
              type="submit"
            >
              Add Product
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}
