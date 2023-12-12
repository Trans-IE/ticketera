import { orange } from '@mui/material/colors';

export const ChatStyle = ({ palette, spacing }) => {
  const radius = spacing(2.5);
  const size = spacing(4);
  const rightBgColor = "rgba(4, 157, 217, 0.2)";
  // if you want the same as facebook messenger, use this color '#09f'
  return {
    avatar: {
      width: size,
      height: size,
    },
    leftRow: {
      textAlign: 'left',
    },
    rightRow: {
      textAlign: 'right',
    },
    msg: {
      padding: spacing(1, 2),
      maxWidth: spacing(80),
      borderRadius: 4,
      marginTop: 4,
      marginBottom: 4,
      display: 'inline-block',
      wordBreak: 'break-word',
      fontFamily:
        // eslint-disable-next-line max-len
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: '14px',
    },
    msgmini: {
      padding: spacing(0, 0),
      borderRadius: 4,
      marginBottom: 0,
      marginTop: 0,
      width: 100,
      display: 'block',
      wordBreak: 'break-word',
      fontFamily:
        // eslint-disable-next-line max-len
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: '9px',
    },
    center: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: palette.grey[500],
    },
    left: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      backgroundColor: '#ffe3c6'//'#fde6d8'//orange[200],
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: '#cfeefc',//rightBgColor,
      color: palette.common.black,
    },
    leftFirst: {
      borderTopLeftRadius: radius,
    },
    leftLast: {
      borderBottomLeftRadius: radius,
    },
    rightFirst: {
      borderTopRightRadius: radius,
    },
    rightLast: {
      borderBottomRightRadius: radius,
    },


    messageContainer: {
      marginBottom: 10
    },

    messageAuthor: {
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333'
    },
    messageContent: {
      //borderRadius: 15,
      color: '#333',
      padding: '5px 15px',
      textAlign: 'left',
      display: 'inline-block',
      maxWidth: '70%',
      wordWrap: 'break-word',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginLeft: 10,
      marginRight: 10
    },
    messageContentRight: {
      textAlign: 'right',
      marginLeft: 0,
      marginRight: 10,
    },
    messageTime: {
      fontSize: 'xx-small',
      color: '#888',
      marginTop: 5
    }
  };
};