document.addEventListener('DOMContentLoaded', () => {
  const tvKnobs = document.querySelectorAll('.tv-knob');
  const pages = document.querySelectorAll('.page-container');

  function showPage(pageId, pushToHistory = true) {
    tvKnobs.forEach(k => {
      k.classList.toggle('active', k.getAttribute('data-page') === pageId);
    });

    pages.forEach(page => {
      page.classList.toggle('page-active', page.id === pageId);
    });

    if (pushToHistory) {
      history.pushState({ page: pageId }, '', `#${pageId}`);
    }
  }

  tvKnobs.forEach(knob => {
    knob.addEventListener('click', () => {
      const pageId = knob.getAttribute('data-page');
      if (!pageId) return;
      showPage(pageId, true);
    });
  });

  window.addEventListener('popstate', (event) => {
    const pageId = (event.state && event.state.page) || window.location.hash.replace('#', '') || 'intro';
    if (document.getElementById(pageId)) {
      showPage(pageId, false);
    }
  });

  const initial = window.location.hash.replace('#', '') || 'intro';
  if (document.getElementById(initial)) {
    showPage(initial, false);
    history.replaceState({ page: initial }, '', `#${initial}`);
  } else {
    showPage('intro', false);
    history.replaceState({ page: 'intro' }, '', '#intro');
  }

  // Tombol trivia + loading
  const triviaButtons = document.querySelectorAll('.trivia-btn');
  triviaButtons.forEach(button => {
    button.addEventListener('click', () => {
      const character = button.getAttribute('data-character');
      const contentDiv = button.nextElementSibling;
      if (!contentDiv) return;

      // Tampilkan spinner/loading
      contentDiv.classList.remove('hidden');
      contentDiv.innerHTML = `
        <div class="flex items-center space-x-2 text-sm text-gray-500 animate-pulse">
          <svg class="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"/>
          </svg>
          <span>Loading trivia...</span>
        </div>
      `;

      // Setelah 1.5 detik tampilkan trivia
      setTimeout(() => {
        contentDiv.innerHTML = `
          <div class="bg-blue-100 p-4 rounded">
            <h4 class="font-bold mb-2">Did you know?</h4>
            <p>${getCharacterTrivia(character)}</p>
          </div>
        `;
      }, 1500);
    });
  });
});

// Trivia karakter
function getCharacterTrivia(character) {
  const triviaMap = {
    'truman': "Jim Carrey prepared for his role by isolating himself from the public and watching episodes of 'The Twilight Zone' for inspiration.",
    'christof': "Ed Harris, who played Christof, was nominated for an Academy Award for Best Supporting Actor for his role in the film.",
    'meryl': "Laura Linney (Meryl) based her performance on 1950s sitcom housewives and TV commercial actresses.",
    'marlon': "Noah Emmerich (Marlon) has said that the scene where he tells Truman about his father's return was the most challenging of his career.",
    'sylvia': "Natascha McElhone (Sylvia/Lauren) had to film all her scenes in just two weeks due to scheduling conflicts.",
    'kirk': "Brian Delate, who played Kirk Burbank, also appeared in another film questioning reality - 'The Manchurian Candidate'."
  };
  return triviaMap[character] || "This is a prototype, continue building to see the full version.";
}
