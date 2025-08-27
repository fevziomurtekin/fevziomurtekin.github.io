// Language switching functionality
function getLanguageFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('lang') || 'en';
}

function setLanguage(lang) {
  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url);
  
  // Update content dynamically instead of reloading
  updatePageContent(lang);
}

// Function to update page content based on language
function updatePageContent(lang) {
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update page titles
  updatePageTitles(lang);
  
  // Update post content if on main page
  if (document.querySelector('.posts')) {
    updatePostContent(lang);
  }
  
  // Update pagination text
  updatePaginationText(lang);
  
  // Update sidebar links
  updateSidebarLinks(lang);
}

// Update page titles
function updatePageTitles(lang) {
  const titleElements = document.querySelectorAll('[data-title-tr], [data-title-en]');
  titleElements.forEach(element => {
    if (lang === 'tr' && element.dataset.titleTr) {
      element.textContent = element.dataset.titleTr;
    } else if (lang === 'en' && element.dataset.titleEn) {
      element.textContent = element.dataset.titleEn;
    }
  });
}

// Update post content
function updatePostContent(lang) {
  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const titleElement = post.querySelector('.post-title a');
    const contentElement = post.querySelector('.post-content');
    
    if (titleElement) {
      const titleTr = titleElement.dataset.titleTr;
      const titleEn = titleElement.dataset.titleEn;
      
      if (lang === 'tr' && titleTr) {
        titleElement.textContent = titleTr;
      } else if (lang === 'en' && titleEn) {
        titleElement.textContent = titleEn;
      }
    }
    
    if (contentElement) {
      const contentTr = contentElement.dataset.contentTr;
      const contentEn = contentElement.dataset.contentEn;
      
      if (lang === 'tr' && contentTr) {
        contentElement.innerHTML = contentTr;
      } else if (lang === 'en' && contentEn) {
        contentElement.innerHTML = contentEn;
      }
    }
  });
}

// Update pagination text
function updatePaginationText(lang) {
  const olderElements = document.querySelectorAll('.pagination-item.older');
  const newerElements = document.querySelectorAll('.pagination-item.newer');
  
  olderElements.forEach(element => {
    if (lang === 'tr') {
      element.textContent = 'Eski';
    } else {
      element.textContent = 'Older';
    }
  });
  
  newerElements.forEach(element => {
    if (lang === 'tr') {
      element.textContent = 'Yeni';
    } else {
      element.textContent = 'Newer';
    }
  });
}

// Update sidebar links
function updateSidebarLinks(lang) {
  const sidebarLinks = document.querySelectorAll('.sidebar-nav-item');
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.includes('http')) {
      if (lang === 'tr' && !href.includes('?lang=tr')) {
        link.href = href + '?lang=tr';
      } else if (lang === 'en' && href.includes('?lang=tr')) {
        link.href = href.replace('?lang=tr', '');
      }
    }
  });
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
  
  // Set current language based on URL parameter
  const currentLang = getLanguageFromURL();
  if (currentLang === 'tr') {
    document.documentElement.lang = 'tr';
  } else {
    document.documentElement.lang = 'en';
  }
  
  // Initialize content with current language
  updatePageContent(currentLang);
});
