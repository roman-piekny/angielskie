(function () {
  const BASE_URL = 'http://localhost:5000';

  const form = document.getElementById('wordsForm');
  const translationsWrapper = document.getElementById('translations');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const baseText = e.target.elements[0].value || '';
    const words = baseText.split('\n');

    Promise.all(words.map(getEntry)).then((entries) => {
      translationsWrapper.innerHTML = entries.map((entry) => `
        <div class="ui segment">  
          <h3>${entry.word}</h3>
          <p>${entry.meaning}</p>
        </div>
      `).join('');
    });
  });

  function getEntry(word) {
    return axios({
      method: 'GET',
      url: `${BASE_URL}/words/${encodeWord(word)}`
    }).then((res) => ({
      word,
      meaning: res.data[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
    }));
  }

  function encodeWord(word) {
    return encodeURIComponent(word);
  }

})();