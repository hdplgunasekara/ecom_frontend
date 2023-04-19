import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProductTable from "../productTable";
import { SvgIcon } from "@mui/material";
import { ReactComponent as StarIcon } from "../../assets/starred.svg";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { alignProperty } from "@mui/material/styles/cssUtils";
import Avatar from '@mui/material/Avatar';

export default function NavBar() {
  return (
    <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
            <Box
             sx={{
            display: "flex",
               alignItems : "center",
              }}
            >
                <Typography variant="h6" align="left" sx={{ fontSize:18,mr:1 }}>
                    ADMIN
                </Typography>
                <ArrowDropDownIcon />
                <Avatar sx={{ width: 50, height:50, backgroundColor: "#001EB9",mr:15 ,ml:2 }}>DP</Avatar>
            </Box>

        </Box>
    </div>
  );
}
