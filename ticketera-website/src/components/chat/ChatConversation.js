import React, { useEffect, useState, useMemo, useContext, memo, useCallback, useLayoutEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { getFullDateString } from "../../helpers/dateHelper.js";
import { ChatMessageV2 } from './ChatMessageV2';
import { ChatMessageLabel } from "./ChatMessageLabel";
import { TextareaAutosize, Tooltip } from "@mui/material";
import { getMaxFileSizes, getMediaCanWebexCall } from "../../helpers/getConfigFunctions";
import { GupshupErrorCodes, interactionTypes } from "../../helpers/constants";

import { GroupedElementsList } from "../ui/GroupedElementsList";



const useStyles = makeStyles((theme) => ({
  messageArea: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: theme.spacing(1),
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  messageAreaMonitor: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: theme.spacing(1),
    overflowX: 'hidden',
    overflowY: 'auto',
    height: "100vh",
  },
  styleSendTextContainer: {
    paddingTop: '10px',
    paddingBottom: '10px',
    margin: 0,
    width: '100%'
  },
  styleActionButtons: {
    minHeight: '42px',
    minWidth: '42px',
  },
  textArea: {

  },
  deleteAttachButton: {
    position: 'absolute',
    bottom: '-5px',
    right: '-5px',
    backgroundColor: 'darkblue',
    color: 'white',
    zIndex: 1050,
    height: 5,
    width: 5
  },
  chatButton: {
    backgroundColor: 'seagreen',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'darkseagreen',
    },
  },
  divChatButton: {
    textAlignLast: 'center',
    margin: 5
  },
  chatBackground: {
    height: '100vh',
    maxWidth: '100%',
    position: 'relative',
    margin: 0,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  }
}));

let elements = [];


export const ChatConversation = memo(() => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const { agent, config } = useSelector(state => state.auth, shallowEqual);

  const [textToSend, setTextToSend] = useState("");
  const [activeHistoryList, setactiveHistoryList] = useState([]);

  const [refs, setRefs] = useState({});

  // temporal 
  const [chatActiveIsEditable, setchatActiveIsEditable] = useState(true);
  // const [online, setonline] = useState(true)

  const textAreaRef = useRef(null);

  useEffect(() => {


    setactiveHistoryList([
      {
        send_time: '2023-11-21T18:48:24.752Z',
        event_type: 'm',
        extension_id: -1,
        extension_type: -1,
        label: '',
        agent_name: '5491132114106',
        suspended: false,
        message_value: 'Hola',
        direction: 0,
        message_id: 6140,
        message_type: 0,
        status: '',
        error_code: -1,
        path: null,
        perform_user: '',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:48:26.234Z',
        event_type: 's',
        extension_id: 130,
        extension_type: 1,
        label: 'bot_whap_1',
        agent_name: '',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:48:26.257Z',
        event_type: 's',
        extension_id: 160,
        extension_type: 0,
        label: 'bot_demo_wh',
        agent_name: 'Bot de ingreso por whatsap',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:48:26.552Z',
        event_type: 'm',
        extension_id: -1,
        extension_type: -1,
        label: '',
        agent_name: '',
        suspended: false,
        message_value: 'Buen día! Por favor escribí el número de caso por el que querés consultar',
        direction: 1,
        message_id: 6141,
        message_type: 0,
        status: 'read',
        error_code: -1,
        path: null,
        perform_user: '',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:48:35.867Z',
        event_type: 'm',
        extension_id: -1,
        extension_type: -1,
        label: '',
        agent_name: '5491132114106',
        suspended: false,
        message_value: '27363',
        direction: 0,
        message_id: 6142,
        message_type: 0,
        status: '',
        error_code: -1,
        path: null,
        perform_user: '',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:48:35.926Z',
        event_type: 'm',
        extension_id: -1,
        extension_type: -1,
        label: '',
        agent_name: '',
        suspended: false,
        message_value: 'El caso se encuentra en curso. ',
        direction: 1,
        message_id: 6143,
        message_type: 0,
        status: 'read',
        error_code: -1,
        path: null,
        perform_user: '',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:48:38.552Z',
        event_type: 'm',
        extension_id: -1,
        extension_type: -1,
        label: '',
        agent_name: '',
        suspended: false,
        message_value: '<p><span style="text-decoration: underline;"><strong>Elijí una opción</strong></span></p><p>¿Querés hablar con un operador?</p><ul style="list-style-type: disc;"><li><strong>SI</strong></li><li><strong>NO</strong></li></ul >',
        direction: 1,
        message_id: 6144,
        message_type: 7,
        status: 'read',
        error_code: -1,
        path: null,
        perform_user: '',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:49:21.957Z',
        event_type: 'm',
        extension_id: -1,
        extension_type: -1,
        label: '',
        agent_name: '5491132114106',
        suspended: false,
        message_value: 'SI',
        direction: 0,
        message_id: 6145,
        message_type: 0,
        status: '',
        error_code: -1,
        path: null,
        perform_user: '',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:49:22.110Z',
        event_type: 's',
        extension_id: 4,
        extension_type: 1,
        label: 'soporte_wh',
        agent_name: '',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Bot',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:49:22.141Z',
        event_type: 's',
        extension_id: 277,
        extension_type: 0,
        label: 'gGomez',
        agent_name: 'Genoveva Gomez',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T18:50:01.074Z',
        event_type: 'm',
        extension_id: -1,
        extension_type: -1,
        label: '',
        agent_name: '5491132114106',
        suspended: false,
        message_value: 'Holaaaaa',
        direction: 0,
        message_id: 6146,
        message_type: 0,
        status: '',
        error_code: -1,
        path: null,
        perform_user: '',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T19:28:06.821Z',
        event_type: 's',
        extension_id: 277,
        extension_type: 0,
        label: 'gGomez',
        agent_name: 'Genoveva Gomez',
        suspended: true,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T20:09:29.828Z',
        event_type: 's',
        extension_id: 277,
        extension_type: 0,
        label: 'gGomez',
        agent_name: 'Genoveva Gomez',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-21T21:04:18.503Z',
        event_type: 's',
        extension_id: 277,
        extension_type: 0,
        label: 'gGomez',
        agent_name: 'Genoveva Gomez',
        suspended: true,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-22T14:09:30.729Z',
        event_type: 's',
        extension_id: 277,
        extension_type: 0,
        label: 'gGomez',
        agent_name: 'Genoveva Gomez',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-22T15:38:30.004Z',
        event_type: 's',
        extension_id: 277,
        extension_type: 0,
        label: 'gGomez',
        agent_name: 'Genoveva Gomez',
        suspended: true,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-22T17:06:21.689Z',
        event_type: 's',
        extension_id: 16,
        extension_type: 0,
        label: 'mindurain',
        agent_name: 'Martin Indurain',
        suspended: true,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Martin Indurain (mindurain)',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-22T17:06:28.191Z',
        event_type: 's',
        extension_id: 16,
        extension_type: 0,
        label: 'mindurain',
        agent_name: 'Martin Indurain',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-22T17:07:41.781Z',
        event_type: 's',
        extension_id: 16,
        extension_type: 0,
        label: 'mindurain',
        agent_name: 'Martin Indurain',
        suspended: true,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-22T17:26:42.119Z',
        event_type: 's',
        extension_id: 16,
        extension_type: 0,
        label: 'mindurain',
        agent_name: 'Martin Indurain',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-22T17:38:02.120Z',
        event_type: 's',
        extension_id: 16,
        extension_type: 0,
        label: 'mindurain',
        agent_name: 'Martin Indurain',
        suspended: true,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-23T13:15:13.684Z',
        event_type: 's',
        extension_id: 279,
        extension_type: 0,
        label: 'facu',
        agent_name: 'Facu Seib',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Facu Seib (facu)',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-23T17:44:35.252Z',
        event_type: 's',
        extension_id: 279,
        extension_type: 0,
        label: 'facu',
        agent_name: 'Facu Seib',
        suspended: true,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      },
      {
        send_time: '2023-11-23T17:50:40.656Z',
        event_type: 's',
        extension_id: 279,
        extension_type: 0,
        label: 'facu',
        agent_name: 'Facu Seib',
        suspended: false,
        message_value: '',
        direction: -1,
        message_id: -1,
        message_type: -1,
        status: '',
        error_code: -1,
        path: null,
        perform_user: 'Sistema',
        forwarded: false,
        id_interaction: 2405
      }
    ]
    )

    return () => {

    }
  }, [])


  useEffect(() => {
    if (textAreaRef.current) {
      const textArea = textAreaRef.current;

      // Configura el observador para vigilar los cambios en el contenido del campo de texto
      const observer = new MutationObserver(() => {
        const lineHeight = parseFloat(getComputedStyle(textArea).lineHeight);
        const rows = Math.floor(textArea.scrollHeight / lineHeight);
        if (rows < 5) {
          updateChatBox(rows);
        }
      });

      observer.observe(textArea, { childList: true, subtree: true });
      updateChatBox(1);
      // Detén el observador cuando el componente se desmonte
      return () => {
        observer.disconnect();
      };
    }

  }, [chatActiveIsEditable]);

  useEffect(() => {
    if (activeHistoryList) {
      setRefs(activeHistoryList.reduce((chat, value) => {
        chat[value.message_id] = React.createRef();
        return chat;
      }, {}));
      let msgIDToScroll = 0;

      handleScroll(msgIDToScroll);
    }
  }, [activeHistoryList]);



  const updateChatBox = (rows = 1) => {
    const messageAreaElement = document.querySelector(`.${classes.messageArea}`);
    const textAreaContainer = document.querySelector(`.${classes.styleSendTextContainer}`);
    if (messageAreaElement && textAreaContainer) {
      if (!chatActiveIsEditable) {
        rows = 0;
      }
      const messageAreaHeight = `calc(100vh - 40px - ${rows * 20}px)`;
      const textAreaHeight = `calc(60px + ${rows * 25}px)`;
      messageAreaElement.style.height = messageAreaHeight;
      textAreaContainer.style.height = textAreaHeight;
    }
  }


  const handleTextToSendChange = (event) => {
    if (!(textToSend.length === 0 && event.target.value === '\n')) {
      setTextToSend(event.target.value);
    }
  }

  const handleTextToSendOnKeypress = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey && !e.ctrlKey && e.target.value.length > 0) {
        sendMessage();
      }
    }
  };

  const sendMessage = () => {

    if (textToSend.length > 0) {
      //  dispatch(chatSendMessage(textToSend));
    }

    setTextToSend("");
  }

  const [renderId, setRenderId] = useState(-1)

  const handleScroll = (id) => {
    setRenderId(id);
  }


  useLayoutEffect(() => {
    if (renderId !== -1) {
      const container = document.querySelector('#listid');
      const paper = refs[renderId]?.current;
      if (container) {
        const containerTop = container.getBoundingClientRect().top;
        const scrollTop = container.scrollTop;
        if (renderId > 0 && paper) {
          const paperTop = paper.getBoundingClientRect().top;
          const scrollTo = scrollTop + paperTop - containerTop;

          // Realiza el desplazamiento después de que el componente se ha renderizado
          container.scrollTop = scrollTo;
        } else {
          container.scrollTop = 0;
        }
      }
      setRenderId(-1)
    }
  }, [renderId, refs]);

  const [menuOpen, setMenuOpen] = React.useState(null);
  const handleOpenMenu = (event) => {
    setMenuOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuOpen(null);
  };

  const getErrorCodeMessage = useCallback((error_code) => {
    let error_message = "";
    if (error_code !== null && error_code !== undefined) {
      if (error_code > 0) {
        switch (error_code) {
          case GupshupErrorCodes.MoreThan24Hours:
            error_message = "El envío del mensaje falló debido a que pasaron mas de 24 horas desde que el cliente escribió a este número.";
            break;
          case GupshupErrorCodes.NoMoneyOnWallet:
            error_message = "El envío del mensaje falló debido a saldo insuficiente.";
            break;
          case GupshupErrorCodes.NotExistingNumber:
            error_message = "El número de teléfono al que has enviado el mensaje no está registrado en WhatsApp.";
            break;
          case GupshupErrorCodes.NotSendingTemplateAndUserNotOptIn:
            error_message = "Debe iniciar conversación desde plantilla";
            break;
          case GupshupErrorCodes.MissingParameter:
            error_message = "Plantilla incompleta.";
            break;
          case GupshupErrorCodes.UserNotRegisteredForTemplate:
            error_message = "El usuario no está registrado y no está activo para una sesión.";
            break;
          case GupshupErrorCodes.UserNotValid:
            error_message = "El usuario no es válido.";
            break;
          case GupshupErrorCodes.MediaSizeNotValid:
            error_message = "El tamaño del archivo multimedia no es compatible.";
            break;
          case GupshupErrorCodes.MediaURLNotValid:
            error_message = "URL de multimedia no válida";
            break;
          case GupshupErrorCodes.TemplateFormatMismatch:
            error_message = "El envío del mensaje falló debido a que los parametros enviados no coinciden con el template seleccionado";
            break;

          default:
            error_message = `Ocurrio un error con código ${error_code} `;

            break;
        }
      }
    }

    return error_message;
  })

  return (
    <Grid id="drop-area" item xs={12} className={classes.chatBackground}>
      {(activeHistoryList !== undefined) && <List id="listid" className={chatActiveIsEditable ? classes.messageArea : classes.messageAreaMonitor}  >

        {


          activeHistoryList.map(
            (chatmsg, index) => {

              console.log(chatmsg);

              if (chatmsg?.event_type === "m") {

                if (chatmsg.direction === 0) {
                  return (
                    <div key={index}
                      ref={refs[chatmsg.message_id]}
                    >
                      <ChatMessageV2
                        key={chatmsg.message_id}
                        avatar={''}
                        showavatar={false}
                        messages={[
                          { message_value: chatmsg.message_value, type: chatmsg.message_type, path: chatmsg.path, id: chatmsg.message_id, forwarded: chatmsg.forwarded, sender_name: chatmsg.sender_name }
                        ]}

                        status={chatmsg.status}
                        error_code_message={(chatmsg.status === "failed") ? getErrorCodeMessage(chatmsg.error_code) : ""}
                        timestamp={getFullDateString(chatmsg.send_time)}
                      />
                    </div>
                  )
                } else {

                  let formatMessage = "";
                  let sender_name = null;

                  if (chatmsg.sender_name !== undefined && chatmsg.sender_name !== "") {
                    if (isMonitor || chatmsg.sender_name?.toUpperCase() !== (agent.name?.toUpperCase() + " " + agent.surname?.toUpperCase())) {
                      sender_name = chatmsg.sender_name;
                    }
                  }
                  formatMessage = chatmsg.message_value;
                  return (
                    <div key={index}
                      ref={refs[chatmsg.message_id]}
                    >
                      <ChatMessageV2
                        key={chatmsg.message_id}
                        side={'right'}
                        messages={[

                          { message_value: formatMessage, type: chatmsg.message_type, path: chatmsg.path, id: chatmsg.message_id, forwarded: chatmsg.forwarded, sender_name: sender_name },
                        ]}
                        status={chatmsg.status}
                        error_code_message={(chatmsg.status === "failed") ? getErrorCodeMessage(chatmsg.error_code) : ""}
                        timestamp={getFullDateString(chatmsg.send_time)}
                        ref={refs[chatmsg.message_id]}
                      />
                    </div>
                  )
                }

              } else {

                if (chatmsg?.event_type === "s") {
                  let formatMessageS = "";

                  if (chatmsg.extension_type === 0) {
                    const lastStep = activeHistoryList.slice(0, index).reverse().find(step => step?.event_type === 's');
                    if (lastStep?.extension_id === chatmsg.extension_id) {
                      if (chatmsg.suspended === false) {
                        if (lastStep?.suspended === true && lastStep !== chatmsg) {
                          formatMessageS += `Conversación reactivada en ${chatmsg.agent_name || " "} (${chatmsg.label})`;
                        }
                      } else {
                        if (lastStep?.suspended === false && lastStep !== chatmsg) {
                          formatMessageS += `Conversación suspendida en ${chatmsg.agent_name || " "} (${chatmsg.label})`;
                        }
                      }
                    } else {
                      if (chatmsg.suspended === false) {
                        formatMessageS = `Conversación asignada a ${chatmsg.agent_name || " "} (${chatmsg.label}) por ${chatmsg.perform_user || ''}`;
                        if (lastStep?.suspended === true && lastStep !== chatmsg) {
                          formatMessageS += " y retomada";
                        }
                      } else {
                        formatMessageS = `Conversación asignada a ${chatmsg.agent_name || " "} (${chatmsg.label}) por ${chatmsg.perform_user || ''}`;
                        if (lastStep?.suspended === false && lastStep !== chatmsg) {
                          formatMessageS += " y suspendida";
                        }
                      }
                    }
                  } else {
                    if (chatmsg.label) {
                      formatMessageS = `Conversación transferida a ${chatmsg.agent_name || " "} (${chatmsg.label})${chatmsg.perform_user ? " por " + chatmsg.perform_user : ''}`;
                    } else {
                      formatMessageS = `Conversación finalizada${chatmsg.perform_user ? " por " + chatmsg.perform_user : ''}`;
                    }
                  }

                  if (activeHistoryList[index + 1]?.event_type === "s") {
                    elements.push(
                      <div style={{ paddingBottom: 5 }}>
                        <ChatMessageLabel key={index} timestamp={getFullDateString(chatmsg.send_time)} message={formatMessageS} />
                      </div>);
                    return <></>
                  } else {
                    let mainElement = <ChatMessageLabel key={index} timestamp={getFullDateString(chatmsg.send_time)} message={formatMessageS} />;
                    let tmpElementsData = [...elements];
                    elements = [];
                    return (<div style={{ paddingBottom: 10 }}><GroupedElementsList mainElement={mainElement} arrayElements={tmpElementsData} /></div>)
                  }

                }
              }



            }

          )

        }

      </List>}
      {
        chatActiveIsEditable &&
        <div>
          <Divider />
          <Grid container spacing={1} className={classes.styleSendTextContainer}>
            <Grid item lg={9} md={9} sm={6} xs={6} style={{ maxWidth: '100%', position: 'relative', padding: 0 }}>
              <TextareaAutosize
                id="TextareaAutosizeChat"
                placeholder="Escribir mensaje"
                autoComplete='off'
                value={textToSend}
                onInput={(e) => handleTextToSendChange(e)}
                ref={textAreaRef}
                onKeyDown={(e) => handleTextToSendOnKeypress(e)}
                //minRows={1}
                maxRows={3}
                onPaste={(e) => {
                  const items = e.clipboardData.items;
                  const files = [];
                  if (items) {
                    for (let i = 0; i < items.length; i++) {
                      const item = items[i];
                      if (item.kind === 'file') {
                        const file = item.getAsFile();
                        files.push(file);
                      }
                    }
                  }
                  addAttachementsDragCopy(files);
                }}
                style={{
                  width: '100%',
                  resize: 'none',
                  overflowY: 'hidden',
                  boxSizing: 'border-box',
                  position: 'absolute',
                  minHeight: '40px',
                  lineHeight: '25px',
                  fontFamily: 'inherit',
                  maxHeight: '100px'
                }}
                disabled={activeHistoryList.length === 0 || online === false}
              />

            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={6} alignSelf={'center'} style={{ padding: 0, paddingBottom: 15 }} >

              <Tooltip placement="top" enterDelay={300} title={'Enviar mensaje'}>
                <Fab style={{ margin: 0, marginRight: 10 }} disabled={(activeHistoryList.length === 0 || online === false)} size="small" className={classes.styleActionButtons} color="primary" aria-label="add" onClick={() => sendMessage()} ><SendIcon /></Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      }
    </Grid >
  )
})
