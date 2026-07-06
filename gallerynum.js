document.querySelectorAll('.gallery-grid img').forEach((img, index) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'img-wrapper';
  
  img.parentNode.insertBefore(wrapper, img);
  wrapper.appendChild(img);
  
  const label = document.createElement('span');
  label.className = 'img-number';
  label.textContent = index + 1;
  wrapper.appendChild(label);
});