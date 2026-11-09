document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const recipient = document.querySelector('#contact-email').getAttribute('href');
  const subject = encodeURIComponent('Wayfarer visitor message');
  const body = encodeURIComponent(`From: ${form.get('name')} <${form.get('email')}>\n\n${form.get('message')}`);
  window.location.href = `${recipient}?subject=${subject}&body=${body}`;
});
