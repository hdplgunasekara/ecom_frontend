import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { SvgIcon } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductToEdit } from "../../redux/productSlice";
import { LoadingOverlay } from "@mantine/core";

export default function EditProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [images, setImages] = React.useState(null);
  const [isImageAvailable, setIsImageAvailable] = React.useState(false);
  const { productForEdit, isLoading } = useSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(getProductToEdit(id));
  }, []);

  const handleImageChange = (event) => {
    setIsImageAvailable(false);
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    if (images === null) {
      setIsImageAvailable(true);
    }
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    try {
      // const response = await axios.post("/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // console.log(response.data);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      
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
            Edit product
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
              value={productForEdit.sku}
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
              value={productForEdit?.price}
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
              value={productForEdit?.product_name}
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
              value={productForEdit?.quantity}
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
            value={productForEdit?.product_description}
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
