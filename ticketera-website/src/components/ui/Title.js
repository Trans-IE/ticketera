import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const Title = ({ componentVariant = "h6", children }) => {
  const titleContent = useMemo(
    () => (
      <Typography component="h4" variant={componentVariant} color="primary">
        {children}
      </Typography>
    ),
    [componentVariant, children]
  );

  return titleContent;
};

Title.propTypes = {
  componentVariant: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Title);
