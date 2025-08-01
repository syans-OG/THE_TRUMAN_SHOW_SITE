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
});