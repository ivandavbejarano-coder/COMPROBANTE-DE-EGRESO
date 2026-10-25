const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  navigation?.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
  });
});

document.querySelectorAll('.document-card').forEach((card) => {
  const summary = card.querySelector('summary');
  let pinnedOpen = false;

  card.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') card.open = true;
  });

  card.addEventListener('pointerleave', (event) => {
    if ((event.pointerType === 'mouse' || event.pointerType === 'pen') && !pinnedOpen && !card.matches(':focus-within')) {
      card.open = false;
    }
  });

  card.addEventListener('focusin', () => {
    card.open = true;
  });

  card.addEventListener('focusout', (event) => {
    if (!card.contains(event.relatedTarget) && !pinnedOpen && !card.matches(':hover')) card.open = false;
  });

  summary?.addEventListener('click', (event) => {
    event.preventDefault();
    pinnedOpen = !pinnedOpen;
    card.open = event.detail === 0 ? pinnedOpen : pinnedOpen || card.matches(':hover');
  });
});

const quizForm = document.querySelector('#quiz-form');
const feedback = document.querySelector('#quiz-feedback');

quizForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const answer = new FormData(quizForm).get('answer');

  if (!answer) {
    feedback.textContent = 'Selecciona una opción para continuar.';
    feedback.className = 'quiz-feedback is-wrong';
    return;
  }

  if (answer === 'documento-soporte') {
    feedback.textContent = 'Correcto. Si el proveedor no está obligado a facturar y la adquisición cumple las condiciones aplicables, el adquirente genera el documento soporte para respaldar la operación. El comprobante de egreso registra el pago y la evidencia bancaria muestra el movimiento.';
    feedback.className = 'quiz-feedback is-correct';
  } else {
    feedback.textContent = 'No exactamente. Ese documento cumple otra función: el comprobante de egreso registra el desembolso y la transferencia confirma el movimiento bancario. Para la adquisición a un sujeto no obligado, el comprador genera el documento soporte cuando corresponde.';
    feedback.className = 'quiz-feedback is-wrong';
  }
});
