import { interactionTypes, messageTypes } from "./constants";

export const getConfigData = () => {

  return fetch('../config/default.json');

}

export const getURLFromConfigByName = (config, cfg_name, endpoint) => {
  const cfgdata = config.find(cfg => cfg.name === cfg_name);
  let base_endpoint = "";
  //let endpoint = "auth";
  let url = "";
  if (cfgdata !== undefined) {
    base_endpoint = cfgdata.value;
    url = `${base_endpoint}/${endpoint}`;
  }

  return url;

}

export const getValueFromConfig = (config, cfg_name) => {
  const cfgdata = config.find(cfg => cfg.name === cfg_name);

  let value = "";

  if (cfgdata !== undefined) {
    value = cfgdata.value;
  }

  return value;
}

export const getMaxFileSizes = (interaction_type, config) => {
  let obj = getValueFromConfig(config, 'max_file_sizes');
  let interaction_object = Object.entries(interactionTypes).find(entry => Number.parseInt(entry[1]) === interaction_type)
  if (interaction_object) {
    let filterObj = obj[interaction_object[0]]
    filterObj = { ...filterObj }
    filterObj.image = filterObj.image * 1048576;
    filterObj.video = filterObj.video * 1048576;
    filterObj.audio = filterObj.audio * 1048576;
    filterObj.document = filterObj.document * 1048576;

    return filterObj;
  } else {
    return 0;
  }
}

export const getMediaIsEnabled = (interaction_type, config) => {
  let obj = getValueFromConfig(config, 'mediaEnabled');
  let mediaEnabled = false;

  switch (interaction_type) {
    case interactionTypes.email:
    case interactionTypes.email_outbound:
      mediaEnabled = (obj.email === "1")
      break;
    case interactionTypes.chat:
    case interactionTypes.chat_outbound:
      mediaEnabled = (obj.chat === "1")
      break;
    case interactionTypes.facebook_messenger:
    case interactionTypes.facebook_messenger_outbound:
      mediaEnabled = (obj.facebook === "1")
      break;
    case interactionTypes.whatsapp:
    case interactionTypes.whatsapp_outbound:
      mediaEnabled = (obj.whatsapp === "1")
      break;
    case interactionTypes.webex:
    case interactionTypes.webex_outbound:
      mediaEnabled = (obj.webex === "1")
      break;

    default:
      break;
  }

  return mediaEnabled;


}

export const getMediaCanWebexCall = (interaction_type, config) => {
  let obj = getValueFromConfig(config, 'mediaCanWebexCall');
  let can = false;

  switch (interaction_type) {
    case interactionTypes.email:
      can = (obj.email === "1")
      break;
    case interactionTypes.chat:
      can = (obj.chat === "1")
      break;
    case interactionTypes.facebook_messenger:
      can = (obj.facebook === "1")
      break;
    case interactionTypes.whatsapp:
      can = (obj.whatsapp === "1")
      break;
    case interactionTypes.webex:
      can = (obj.webex === "1")
      break;

    default:
      break;
  }

  return can;


}

