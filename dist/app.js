(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  const desktop = window.matchMedia('(min-width: 961px)');
  desktop.addEventListener('change', closeMenu);
  const form = document.querySelector('#contact-form');
  const interest = document.querySelector('#interesse');
  const fallback = document.querySelector('#whatsapp-fallback');
  const phone = document.querySelector('#telefone');
  document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
    interest.value = link.dataset.interest;
    interest.dispatchEvent(new Event('change', { bubbles: true }));
  }));
  phone.addEventListener('input', () => phone.setCustomValidity(''));
  form.addEventListener('input', () => { fallback.hidden = true; });
  form.addEventListener('change', () => { fallback.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const digits = phone.value.replace(/\D/g, '');
    const national = digits.startsWith('55') && digits.length > 11 ? digits.slice(2) : digits;
    phone.setCustomValidity(/^[1-9]{2}\d{8,9}$/.test(national) ? '' : 'Informe um WhatsApp válido com DDD, com 10 ou 11 dígitos.');
    for (const name of ['nome', 'empresa', 'necessidade']) {
      const field = form.elements.namedItem(name);
      field.setCustomValidity(field.value.trim() ? '' : 'Preencha este campo.');
      field.oninput = () => field.setCustomValidity('');
    }
    if (!form.reportValidity()) return;
    const value = name => form.elements.namedItem(name).value.trim();
    const lines = ['Olá, Lorena! Vim pelo seu site e gostaria de conversar.', '', `Nome: ${value('nome')}`, `Empresa: ${value('empresa')}`, `WhatsApp: ${value('telefone')}`];
    if (value('email')) lines.push(`E-mail: ${value('email')}`);
    lines.push(`Interesse: ${value('interesse')}`, '', 'Como você pode me ajudar:', value('necessidade'));
    const url = `https://wa.me/5563999396569?text=${encodeURIComponent(lines.join('\n'))}`;
    document.querySelector('#whatsapp-link').href = url;
    fallback.hidden = false;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
