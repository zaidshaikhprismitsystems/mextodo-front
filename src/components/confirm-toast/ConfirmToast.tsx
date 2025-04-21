import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ConfirmToast({
    message,
    onConfirm,
    onCancel
}: any) {

  return (
    <Box>
        <Typography>{message}</Typography>
        <Box sx={{display: "flex", gap: 1, mt: 1}}>
            <Button variant="contained" onClick={() => { onConfirm(); toast.dismiss(); }}>Yes</Button>
            <Button variant="contained" onClick={() => { onCancel(); toast.dismiss(); }}>No</Button>
        </Box>
    </Box>
  );
}