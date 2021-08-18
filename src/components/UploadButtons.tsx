import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useFormikContext } from "formik";
import { createRef } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: "none",
    },
    noPadding: {
      padding: "0",
    },
  })
);
export interface UploadButtonsProps {
  label: string;
  onChange: () => void;
  name: string;
}

export default function UploadButtons({
  onChange,
  ...props
}: UploadButtonsProps) {
  const classes = useStyles();

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={onChange}
        multiple
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="secondary"
          aria-label="upload picture"
          component="span"
          className={classes.noPadding}
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}
