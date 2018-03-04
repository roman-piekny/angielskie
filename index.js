(function () {
  const BASE_URL = 'https://od-api.oxforddictionaries.com/api/v1';
  const APP_ID = '6f6b02bb';
  const APP_KEY = 'c9992070793f4cd646520c081fc8fb28';
  axios.defaults.headers.common['app_id'] = APP_ID;
  axios.defaults.headers.common['app_key'] = APP_KEY;

  const form = document.getElementById('wordsForm');
  const translationsWrapper = document.getElementById('translations');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const baseText = e.target.elements[0].value || '';
    const words = baseText.split('\n');

    Promise.all(words.map(getEntry)).then((translations) => {
      console.log(translations);
    });
  });

  function getEntry(word) {
    return axios.get(`${BASE_URL}/entries/en/${encodeWord(word)}`);
  }

  function encodeWord(word) {
    return encodeURIComponent(word);
  }

})();