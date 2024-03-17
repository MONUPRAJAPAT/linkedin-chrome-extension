document.addEventListener('DOMContentLoaded', function() {
    const popupContent = document.getElementById('popupContent');
    const stretchedContent = document.getElementById('stretchedContent');
    const closeBtn = document.getElementById('closeBtn');
    const stretchBtn = document.getElementById('stretchBtn');
  
    closeBtn.addEventListener('click', function() {
      window.close();
    });
  
    stretchBtn.addEventListener('click', function() {
      popupContent.style.display = 'none';
      stretchedContent.style.display = 'block';
    });
  });
  