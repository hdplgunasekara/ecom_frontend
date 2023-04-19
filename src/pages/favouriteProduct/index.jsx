import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProductTable from "../../components/productTable";
import { SvgIcon } from "@mui/material";
import { ReactComponent as StarIcon } from "../../assets/starred.svg";

export default function FavouriteProductList() {
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
