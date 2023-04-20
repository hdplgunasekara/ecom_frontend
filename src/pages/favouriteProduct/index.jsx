import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProductTable from "../../components/productTable";
import { SvgIcon } from "@mui/material";
import { ReactComponent as StarIcon } from "../../assets/starred.svg";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
//
export default function FavouriteProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
//
  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
//
  const handleSearch = () => {
    if (search === "") {
      swal("Please enter a valid search term");
      return;
    }
    window.location.href = `/search/${search}`;
  };
//
  return (
    <div>
      <Box sx={{ px: 16, py: 2 }}>
        <Typography variant="h3" align="left">
          FAVOURITE PRODUCTS
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <TextField
            id="filled-search"
            label="Search for products"
            type="search"
            variant="filled"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 5,
                    fontSize: 14,
                    width: 200,
                    bgcolor: "#001EB9",
                    textTransform: "none",
                  }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              ),
            }}
            sx={{ width: "40%" }}
          />
          <Box>
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
              onClick={() => navigate("/add")}
            >
              New Product
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                fontSize: 14,
                width: 50,
                height: 45,
                ml: 1,
                bgcolor: "white",
                border: "2px solid #001EB9",
              }}
              onClick={() => navigate("/favourite-product")}
            >
              <SvgIcon component={StarIcon} />
            </Button>
          </Box>
        </Box>
        <ProductTable />
      </Box>
    </div>
  );
}
