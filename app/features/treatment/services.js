import API_CONFIG from "../../store/config/config";


export const services = {
  saveTreatment: saveTreatment,
  fetchTreatment: fetchTreatment,
  updateTreatmentMedicine: updateTreatmentMedicine,
  deleteMedicineFromTreatment: deleteMedicineFromTreatment,
  deleteTreatment:deleteTreatment,
  updateMedicineFromTreatment: updateMedicineFromTreatment
};


function fetchTreatment(access_token) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' ,
      'Authorization' : 'Bearer ' + access_token}
  };

  return fetch(API_CONFIG.TREATMENT, requestOptions)
    .then(handleResponse, handleError);
}

function saveTreatment(requestBody,access_token) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' ,
      'Authorization' : 'Bearer ' + access_token},
    body: JSON.stringify(requestBody)
  };

  return fetch(API_CONFIG.TREATMENT, requestOptions)
    .then(handleResponse, handleError);
}

function updateTreatmentMedicine(access_token,data, id) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' ,
      'Authorization' : 'Bearer ' + access_token},
    body: JSON.stringify(data)
  };

  let URL = `${API_CONFIG.TREATMENT}/${id}`;

  return fetch(URL, requestOptions)
    .then(handleResponse, handleError);
}
function updateMedicineFromTreatment(access_token,data, id) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' ,
      'Authorization' : 'Bearer ' + access_token},
    body: JSON.stringify(data)
  };

  let URL = `${API_CONFIG.TREATMENT}/${id}/medicine`;

  return fetch(URL, requestOptions)
    .then(handleResponse, handleError);
}
function deleteMedicineFromTreatment(access_token,data, id) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' ,
      'Authorization' : 'Bearer ' + access_token},
    body: JSON.stringify(data)
  };

  let URL = `${API_CONFIG.TREATMENT}/${id}/medicine`;

  return fetch(URL, requestOptions)
    .then(handleResponse, handleError);
}
function deleteTreatment(access_token, id) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' ,
      'Authorization' : 'Bearer ' + access_token}
  };

  let URL = `${API_CONFIG.TREATMENT}/${id}`;

  return fetch(URL, requestOptions)
    .then(handleResponse, handleError);
}


/*
Handlers
 */

function handleResponse(response: any) {
  return new Promise((resolve: any, reject: any) => {
    if (response.ok) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        response.json().then((json: any) => resolve(json));
      } else {
        resolve();
      }
    } else {
      response.text().then((text: string) => reject(text));
    }
  });
}

function handleError(error: any) {
  return Promise.reject(error && error.message);
}
