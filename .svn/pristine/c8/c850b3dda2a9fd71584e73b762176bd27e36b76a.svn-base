import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { green, orange, common } from '@mui/material/colors';


export const IconButtonLoading = ({ handleButtonClick, isDisabled, isLoadedSuccess, tooltipText = "", muiIconComponent: Component, variantStyle, backgroundColorButton, backgroundColorHoverButton, sizeWidth = 50, sizeHeight = 50, iconColor = common.white, tooltipPlacement, buttonText = "", blockLoadingState = false }) => {

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    return () => {
      setLoading(false);
      setSuccess(false);
    };
  }, []);

  React.useEffect(() => {
    if (isLoadedSuccess === true) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setLoading(false);
      }, 3000);
    }
  }, [isLoadedSuccess]);

  const handleClick = (e) => {
    handleButtonClick(e);
    if (!loading) {

      setSuccess(false);
      setLoading(true);

    }
  }

  if (buttonText.length > 0) {
    return (
      <Tooltip placement={tooltipPlacement ? tooltipPlacement : 'top'} title={`${tooltipText}`}>
        <div style={{ cursor: 'pointer' }} onClick={(e) => { if (!(success || (loading && !blockLoadingState) || isDisabled)) { handleClick(e) } }}>
          <IconButton
            aria-label="save"
            variant={variantStyle ? variantStyle : 'contained'}
            size="large"
            
            disabled={(success || (loading && !blockLoadingState) || isDisabled)}
          >
            {success ? <CheckIcon color={green[500]} /> : (loading && !blockLoadingState) ? <CircularProgress size={22} /> : <Component />}
          </IconButton>
          <Typography style={{ paddingLeft: 5, display: 'inline-flex', alignItems: 'center' }}>{buttonText}</Typography>
        </div>
      </Tooltip>
    )
  } else {
    return (
      <Tooltip placement={tooltipPlacement ? tooltipPlacement : 'top'} title={`${tooltipText}`}>
        <div style={{ cursor: 'pointer' }} onClick={(e) => { if (!(success || (loading && !blockLoadingState) || isDisabled)) { handleClick(e) } }}>
          <IconButton
            aria-label="save"
            variant={variantStyle ? variantStyle : 'contained'}
            size="large"
            
            disabled={(success || (loading && !blockLoadingState) || isDisabled)}
          >
            {success ? <CheckIcon color={green[500]} /> : (loading && !blockLoadingState) ? <CircularProgress style={{ width: 22, height: -1 }} /> : <Component />}
          </IconButton>

        </div>
      </Tooltip>
    )
  }

}

IconButtonLoading.propTypes = {
  handleButtonClick: PropTypes.func,
  isDisabled: PropTypes.bool.isRequired,
  isLoadedSuccess: PropTypes.bool.isRequired
}
