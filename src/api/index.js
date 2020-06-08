import md5 from 'md5';
import Config from './../../config.js';

function sign(obj) {
  const request = {
    api_key: Config.apiKey,
    ...obj
  };

  const string = Object.keys(request)
    .sort()
    .reduce((string, key) => string + key + request[key], '');
  const api_sig = md5(`${encodeURIComponent(string)}${Config.secret}`);

  return { api_sig, ...request };
}
  // http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&api_key=xxx
function getUrl(request) {
  return Object.entries({
    format: 'json',
    ...sign(request)
  })
  .reduce((a, b) => a + '&' + b.join('='), `${Config.apiRoot}?`);
}
const api = {
  sign,
  getUrl
}
export default api;