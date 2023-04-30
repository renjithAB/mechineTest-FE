import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { resetModel, toastSelector } from "../../store/slice/uiSlice";
import {
  Card,
  CardActionArea,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";

export default function NewsDialogueDialog() {
  const dispatch = useDispatch<any>();
  const { modelStatus, newsDetail } = useSelector(toastSelector);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (modelStatus) {
      setOpen(true);
    }
  }, [modelStatus]);

  const handleClose = () => {
    setOpen(false);
    dispatch(resetModel());
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{newsDetail.title}</DialogTitle>
        <DialogContent>
          <Card
            sx={{
              background: "#FFFFFF",
              mb: 5,
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={newsDetail.cover}
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
          <DialogContentText>{newsDetail.description}</DialogContentText>
          {newsDetail["extraImages"] && (
            <ImageList
              sx={{ width: 500, height: 450 }}
              variant="woven"
              cols={3}
              gap={8}
            >
              {newsDetail["extraImages"].map((item: any, index: any) => (
                <ImageListItem key={index}>
                  <img src={item} alt={item.title} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
