import React, { useState, useEffect } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  Box,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import FormControl from "@mui/material/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TagsInput } from "react-tag-input-component";
import InputLabel from "@material-ui/core/InputLabel";
import CloudUploadIcon from "@mui/icons-material/CloudUploadOutlined";
import { useDispatch, useSelector } from "react-redux";
import { createNews } from "../../store/actions/newsActions";
import {
  newsSelector,
  resetNewsUpdateStatus,
} from "../../store/slice/newsSlice";
import { LoadingButton } from "@mui/lab";
import { snackBar } from "../../store/slice/uiSlice";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
  label: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

function AddNews() {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const { isNewsCreationPending, isNewsCreated, error } =
    useSelector(newsSelector);
  const [selectedFile, setSelectedFile] = useState([]);
  const [coverPhoto, setcoverPhoto] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    if (isNewsCreated) {
      const message = {
        message: "News successFully created",
        variant: "success",
      };
      dispatch(snackBar(message));
    }
    if (error) {
      const message = { message: "Some error occured", variant: "error" };
      dispatch(snackBar(message));
    }
    dispatch(resetNewsUpdateStatus());
  }, [dispatch, error, isNewsCreated]);

  const initialValues = {
    title: "",
    description: "",
    publishDate: dayjs("2022-04-17"),
    coverPic: "",
  };

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files);
  };

  const handlecoverPhotoSelect = (e: any) => {
    setcoverPhoto(e.target.files[0]);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        publishDate: Yup.date().required(),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm, setFieldValue }
      ) => {
        const formData = new FormData();

        for (let i = 0; i < Object.keys(selectedFile).length; i++) {
          formData.append(`file${i}`, selectedFile[i]);
        }

        const payload = {
          title: values.title,
          description: values.description,
          publishDate: values.publishDate,
          cover: coverPhoto,
          published: true,
          tags: selected,
          files: selectedFile,
        };

        dispatch(createNews(payload));
        resetForm();
        setSelected([]);
        setcoverPhoto([]);
        setSelectedFile([]);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Add News</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        value={values.title}
                        id="title"
                        label="Title"
                        variant="outlined"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                    {touched.title && errors.title && (
                      <FormHelperText error> {errors.title} </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date"
                          defaultValue={values.publishDate}
                          onChange={(value) =>
                            setFieldValue("publishDate", value, true)
                          }
                        />
                      </LocalizationProvider>
                    </FormControl>
                    {touched.publishDate && errors.publishDate && (
                      <FormHelperText error> Date required </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      sx={{
                        border: "solid",
                        padding: 2,
                        borderColor: "#CCCCCC",
                        borderWidth: 1,
                      }}
                      fullWidth
                    >
                      <InputLabel
                        htmlFor="upload-file"
                        className={classes.label}
                      >
                        <CloudUploadIcon className={classes.icon} />
                        Choose file
                      </InputLabel>
                      <input
                        name="coverPic"
                        id="upload-file"
                        type="file"
                        className={classes.input}
                        onChange={handlecoverPhotoSelect}
                      />
                    </FormControl>
                    {touched.coverPic && errors.coverPic && (
                      <FormHelperText error> {errors.coverPic} </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      sx={{
                        border: "solid",
                        padding: 2,
                        borderColor: "#CCCCCC",
                        borderWidth: 1,
                        display: "flex",
                        flexDirection: "row",
                      }}
                      fullWidth
                    >
                      <InputLabel
                        htmlFor="upload-file-multiple"
                        className={classes.label}
                      >
                        <CloudUploadIcon className={classes.icon} />
                        {selectedFile.length
                          ? `${selectedFile.length} File Selected`
                          : "Choose files"}
                      </InputLabel>

                      <input
                        id="upload-file-multiple"
                        type="file"
                        multiple
                        className={classes.input}
                        onChange={handleFileSelect}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    value={values.description}
                    id="description"
                    label="Description"
                    variant="outlined"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    multiline={true}
                    maxRows={5}
                  />
                </FormControl>
                {touched.description && errors.description && (
                  <FormHelperText error> {errors.description} </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TagsInput
                  value={selected}
                  onChange={setSelected}
                  name="tags"
                  placeHolder="Search Tags"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ margin: "0 auto", display: "block", textAlign: "center" }}
              >
                <LoadingButton
                  loading={isNewsCreationPending}
                  variant="contained"
                  type="submit"
                  sx={{ background: "#0D7B58" }}
                >
                  Publish
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default AddNews;
