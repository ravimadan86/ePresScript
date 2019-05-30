import DB from "../../models";

export const services = {
  saveSettings: saveSettings,
  fetchSettings: fetchSettings,
  updateTemplateSettings: updateTemplateSettings
};

function updateTemplateSettings(value, access_token) {
  console.log("Save settings request", value);
  return DB.Settings.update({
    access_token: access_token, dr_education: value.dr_education , dr_specialist: value.dr_specialist, education_institute: value.education_institute, reg_no: value.reg_no, printTemplate: value.defaultTemplate , center_text: value.center_text, chamber_name: value.chamber_name, chamber_address: value.chamber_address, chamber_timing: value.chamber_timing, margin_top: value.margin_top, margin_bottom: value.margin_bottom, margin_left: value.margin_left, margin_right: value.margin_right
  }, { where: { product_id: '270892' } }).then(handleResponse , handleError);

}


function saveSettings(value, access_token) {
  console.log("Save settings request", value);
  return DB.Settings.update({
    default_printer: value.defaultPrinter , background_print: value.backgroundPrint , access_token: access_token
  }, { where: { product_id: '270892' } }).then(handleResponse , handleError);

}
function fetchSettings() {
  console.log("fetchSettings");
  return DB.Settings.findOne({
    where: { product_id: '270892' }
  }).then(handleResponse , handleError);
}

function handleResponse(response: any) {
  return Promise.resolve(response);
}

function handleError(error: any) {
  return Promise.reject(error && error.message);
}
