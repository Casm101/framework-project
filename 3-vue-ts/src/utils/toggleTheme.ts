export const toggleTheme = () => {
  const htmlRoot = document.querySelector('html')?.classList;
  htmlRoot?.toggle('light');

  return htmlRoot?.contains('light') ? 'light' : 'dark';
};