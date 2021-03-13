function request(type) {
  const url = `http://localhost:3000/${type}`
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    const { status, readyState, response, responseText } = xmlHttp || {}

    if (readyState === 4 && status === 200) {
      console.info(`RESPONSE - ${url}`, response);
    } else {
      console.debug(`status=${status} ready=${readyState}`);
    }
  }
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.send();
}

module.exports = {
  request
}