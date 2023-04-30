import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { getNewsList } from "../../store/actions/newsActions";
import { useDispatch, useSelector } from "react-redux";
import {
  newsSelector,
  resetNewsUpdateStatus,
} from "../../store/slice/newsSlice";
import { snackBar, updateNewsDetails } from "../../store/slice/uiSlice";
import "./test.css";
import NewsDialogueDialog from "./newsDetailsDialogue";

function ManageNews() {
  const { isGetNewsSuccess, news } = useSelector(newsSelector);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getNewsList());
  }, []);

  useEffect(() => {
    if (isGetNewsSuccess) {
      if (news.length < 1) {
        const message = {
          message: "Nothing Found",
          variant: "warning",
        };
        dispatch(snackBar(message));
      }
    }
    dispatch(resetNewsUpdateStatus());
  }, [dispatch, isGetNewsSuccess, news, news.length]);

  const handleCardClick = (index: any) => {
    const tempNewsArray = [...news];
    dispatch(updateNewsDetails(tempNewsArray[index]));
  };

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
      console.log(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box>
      <NewsDialogueDialog />
      <Grid
        container
        spacing={3}
        sx={{ height: windowHeight - 110, overflow: "auto" }}
        className="my-component"
      >
        {news.map((item: any, index: any) => (
          <Grid
            item
            onClick={() => handleCardClick(index)}
            key={index}
            xs={12}
            md={3}
          >
            <Card
              sx={{
                background: "#1A2027",
                maxHeight: 360,
                minHeight: 360,
                pb: 5,
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.cover}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      color: "#fff",
                      lineHeight: "1.2",
                    }}
                    className="multiline-ellipsis-title"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "#fff" }}
                    className="multiline-ellipsis-body"
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ManageNews;
