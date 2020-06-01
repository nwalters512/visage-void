import React, { CSSProperties } from "react";
import { Typography } from "@material-ui/core";
import { COLOR } from "../../symbol/color";

const styles: {
  label: CSSProperties;
  buttonText: CSSProperties;
  caption: CSSProperties;
  subTitle: CSSProperties;
} = {
  label: {
    color: COLOR.text,
    fontSize: 16,
  },
  buttonText: {
    color: COLOR.buttonText,
    fontSize: 18,
    fontWeight: "bold",
  },
  caption: {
    color: COLOR.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    color: COLOR.text,
    fontSize: 20,
    fontWeight: "bold",
  },
};

const Label = ({ children }) => {
  return (
    <Typography variant="body1" style={styles.label}>
      {children}
    </Typography>
  );
};

const ButtonText = ({ children }) => {
  return (
    <Typography variant="button" style={styles.buttonText}>
      {children}
    </Typography>
  );
};

const Caption = ({ children }) => {
  return (
    <Typography variant="caption" style={styles.caption}>
      {children}
    </Typography>
  );
};
const SubTitle = ({ children }) => {
  return (
    <Typography variant="h2" style={styles.caption}>
      {children}
    </Typography>
  );
};

export { Label, ButtonText, Caption, SubTitle };
