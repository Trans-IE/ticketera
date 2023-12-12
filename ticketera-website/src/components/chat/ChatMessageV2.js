import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import { ChatStyle } from './chatMessageStyle';
import { green, red } from '@mui/material/colors';

import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ErrorIcon from '@mui/icons-material/Error';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import { messageTypes } from '../../helpers/constants';
import parse from 'html-react-parser';

import Tooltip from '@mui/material/Tooltip';
/* import { ChatMessageAttachment } from './ChatMessageAttachment';
 */
export const ChatMessageV2 = memo(withStyles(ChatStyle, { name: 'ChatMessageV2' })(props => {
  const {
    classes,
    avatar,
    messages,
    timestamp,
    side,
    status,
    error_code_message,
    showavatar,
    GridContainerProps,
    GridItemProps,
    AvatarProps,
    getTypographyProps,
  } = props;
  const attachClass = index => {
    if (index === 0) {
      return classes[`${side}First`];
    }
    if (index === messages.length - 1) {
      return classes[`${side}Last`];
    }
    return '';
  };



  return (
    <Grid
      container
      justify={side === 'right' ? 'flex-end' : (side === 'center') ? 'center' : 'flex-start'}
      {...GridContainerProps}

    >
      {side === 'left' && showavatar === 'true' && (
        <Grid item {...GridItemProps}>
          <Avatar
            src={avatar}
            {...AvatarProps}
            className={cx(classes.avatar, AvatarProps.className)}
          />
        </Grid>
      )}
      <Grid item xs={12} >
        {messages.map((msg, i) => {
          const TypographyProps = getTypographyProps(msg.message_value, i, props);
          const authorColor = side === 'left' ? '#fa824c' : '#075e54';
          return (
            <div key={msg.message_value?.id || i} className={cx(classes[`${side}Row`], classes.messageContainer)}>
              <Typography
                align={'left'}
                {...TypographyProps}
                className={cx(
                  classes.msg,
                  classes[side],
                  attachClass(i),
                  TypographyProps.className,
                  classes.messageContent
                )}
              >
                {msg.sender_name && <div className={classes.messageAuthor} style={{ color: authorColor }}> {msg.sender_name}</div>}
                <Grid container alignItems="center" spacing={1}>
                  {msg.forwarded && (
                    <Grid container item xs={12} alignItems="center" style={{ padding: 0, marginTop: 4, marginLeft: 8 }}>
                      <ReplyAllIcon style={{ color: 'grey', fontSize: 14 }} />
                      <Typography variant="caption" style={{ color: 'grey', marginLeft: 4 }}>
                        Reenviado
                      </Typography>
                    </Grid>

                  )}
                  <Grid item xs={12} style={{ paddingTop: msg.forwarded ? 1 : 8 }}>
                    {/* {msg.path && <ChatMessageAttachment msg={msg} />} */}
                    {typeof msg.message_value === 'string' &&
                      (msg.type !== messageTypes.list && msg.type !== messageTypes.quick_reply) &&
                      msg.message_value.split('\n').map((str, index) => (
                        <span key={index}>
                          {str}
                          <br />
                        </span>
                      ))}
                    {typeof msg.message_value === 'string' &&
                      (msg.type === messageTypes.list || msg.type === messageTypes.quick_reply) &&
                      parse(msg.message_value)}
                  </Grid>
                </Grid>

                <Typography
                  align={'left'}
                  {...TypographyProps}
                  className={cx(
                    classes.msgmini,
                    attachClass(i),
                    TypographyProps.className
                  )}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Grid item xs={10} gutterBottom className={classes.messageTime}>
                      {timestamp}
                    </Grid>
                    <Grid item xs={2} gutterBottom>
                      {status === 'failed' && (
                        <Tooltip title={error_code_message}>
                          <ErrorIcon style={{ color: red[500] }} fontSize="small" />
                        </Tooltip>
                      )}
                      {status == 'mismatch' && (
                        <SmsFailedIcon style={{ color: red[500] }} fontSize="small" />
                      )}
                      {status === 'sent' && <DoneIcon fontSize="small" />}
                      {status === 'delivered' && <DoneAllIcon fontSize="small" />}
                      {status === 'read' && (
                        <DoneAllIcon style={{ color: green[500] }} fontSize="small" />
                      )}
                      {status === 'enqueued' && <WatchLaterIcon fontSize="small" />}
                    </Grid>
                  </Grid>
                </Typography>
              </Typography>

            </div>
          );
        })}
      </Grid>
    </Grid >
  );
}));

ChatMessageV2.propTypes = {
  avatar: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  timestamp: PropTypes.string,
  side: PropTypes.oneOf(['left', 'center', 'right']),
  status: PropTypes.string,
  showavatar: PropTypes.oneOf(['true', 'false']),
  GridContainerProps: PropTypes.shape({}),
  GridItemProps: PropTypes.shape({}),
  AvatarProps: PropTypes.shape({}),
  getTypographyProps: PropTypes.func,
};

ChatMessageV2.defaultProps = {
  avatar: '',
  messages: [],
  timestamp: '',
  side: 'left',
  status: '',
  showavatar: 'true',
  GridContainerProps: {},
  GridItemProps: {},
  AvatarProps: {},
  getTypographyProps: () => ({}),
};
