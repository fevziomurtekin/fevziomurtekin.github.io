// Language switching functionality
function getLanguageFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('lang') || 'en';
}

function setLanguage(lang) {
  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url);
  
  // Reload the page to apply language changes
  window.location.reload();
}

// Handle language switcher clicks
document.addEventListener('DOMContentLoaded', function() {
  const langLinks = document.querySelectorAll('.lang-link');
  
  langLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.textContent.toLowerCase();
      setLanguage(lang);
    });
  });
  
  // Set current language based on URL parameter
  const currentLang = getLanguageFromURL();
  if (currentLang === 'tr') {
    document.documentElement.lang = 'tr';
  } else {
    document.documentElement.lang = 'en';
  }
});

(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);
})(document);
