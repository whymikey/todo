import './index.css'

document.getElementById('themeToggle')?.addEventListener('click', () => {
  document.documentElement.classList.toggle('theme-dark')
  document.documentElement.classList.toggle('theme-light')
})
