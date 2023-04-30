import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetToast, toastSelector } from "../store/slice/uiSlice";

function SnackBar() {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = useState(false);
  const { message, variant, status } = useSelector(toastSelector);

  useEffect(() => {
    if (status) {
      setOpen(true);
    }
  }, [status]);

  const handleClose = (event: any) => {
    setOpen(false);
    dispatch(resetToast());
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={variant} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default SnackBar;
