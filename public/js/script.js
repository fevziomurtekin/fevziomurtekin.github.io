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

// Handle header language switcher slider
document.addEventListener('DOMContentLoaded', function() {
  const headerLanguageToggle = document.getElementById('language-toggle');
  
  if (headerLanguageToggle) {
    // Set initial state based on current language
    const currentLang = getLanguageFromURL();
    if (currentLang === 'tr') {
      headerLanguageToggle.checked = true;
    }
    
    // Handle slider toggle
    headerLanguageToggle.addEventListener('change', function() {
      const lang = this.checked ? 'tr' : 'en';
      setLanguage(lang);
    });
  }
  
  // Handle main page language switcher clicks (only on main page)
  const langLinks = document.querySelectorAll('.language-switcher .lang-link');
  
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
