import md5 from 'md5';

const apiRoot = process.env.VUE_APP_API_ROOT || "http://ws.audioscrobbler.com/2.0/";
const apiKey = process.env.VUE_APP_API_KEY;
const secret = process.env.VUE_APP_API_SECRET;

function sign(obj) {
  const request = {
    api_key: apiKey,
    ...obj
  };

  const string = Object.keys(request)
    .sort()
    .reduce((string, key) => string + key + request[key], '');
  const api_sig = md5(`${encodeURIComponent(string)}${secret}`);

  return { api_sig, ...request };
}
  // http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&api_key=xxx
function getUrl(request) {
  return Object.entries({
    format: 'json',
    ...sign(request)
  })
  .reduce((a, b) => a + '&' + b.join('='), `${apiRoot}?`);
}
const api = {
  sign,
  getUrl,
  apiRoot,
  apiKey,
  secret
}
export default api;