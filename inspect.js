// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Function to check for specific shortcut keys
function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

// Disable Developer Tools shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U)
document.onkeydown = (e) => {
  if (
    event.keyCode === 123 || 
    ctrlShiftKey(e, 'I') || 
    ctrlShiftKey(e, 'J') || 
    ctrlShiftKey(e, 'C') || 
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  ) {
    return false;
  }
};
