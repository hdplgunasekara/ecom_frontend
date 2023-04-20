import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SvgIcon, IconButton } from "@mui/material";
import { ReactComponent as StarIcon } from "../../assets/starred.svg";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { useParams } from "react-router-dom";
import { getSearchResult } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
//
export default function SearchResult() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const { name } = useParams();
  const dispatch = useDispatch();
  const { searchResult, searchResultLength } = useSelector(
    (state) => state.product
  );
  //
  React.useEffect(() => {
    dispatch(getSearchResult(name));
  }, [dispatch, name]);
  //
  const handleSearch = () => {
    if (search === "") {
      swal("Please enter a valid search term");
      return;
    }
    window.location.href = `/search/${search}`;
  };
  return (
    <div>
      <Box sx={{ px: 16, py: 2 }}>
        <Typography variant="h3" align="left">
          PRODUCTS
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
        <Typography variant="h6" align="left" sx={{ color: "#969191" }}>
          {searchResultLength} Results found for '{name}'
        </Typography>
        <Box>
          {searchResult.map((item) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                bgcolor: "background.paper",
                borderRadius: 1,
                m: 6,
                mx: 15,
                pb: 3,
              }}
              borderBottom={1}
            >
              <Box>
                <Typography
                  align="left"
                  sx={{ color: "#001EB9", fontSize: 16 }}
                >
                  {item.sku}
                </Typography>
                <Typography variant="h6" align="left" sx={{ color: "black" }}>
                  {item.product_name}
                </Typography>
                <Typography
                  align="left"
                  sx={{ color: "#969191", fontSize: 16 }}
                >
                  {item.product_description}
                </Typography>
              </Box>
              <IconButton>
                <ArrowIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}
