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

const paymentSteps = [
  {
    kicker: 'ANTES DE GIRAR',
    title: 'Autorizar el pago',
    text: 'El área responsable confirma que la obligación existe, revisa la factura o el contrato y deja constancia de quién aprobó el desembolso.',
    check: 'Beneficiario, valor y vencimiento coinciden con la obligación.',
  },
  {
    kicker: 'TESORERÍA EN ACCIÓN',
    title: 'Realizar el desembolso',
    text: 'Tesorería paga por el medio definido y conserva el soporte de la operación: comprobante de transferencia, cheque o recibo de caja.',
    check: 'El pago llegó al beneficiario correcto y por el valor autorizado.',
  },
  {
    kicker: 'EL ASIENTO CUENTA LO OCURRIDO',
    title: 'Registrar la salida',
    text: 'El comprobante interno relaciona el pago con su asiento contable. Se debita la obligación o cuenta que corresponda y se acredita el medio de pago.',
    check: 'Débitos y créditos cuadran y se vinculan con el pago realizado.',
  },
  {
    kicker: 'LISTO PARA CONSULTAR',
    title: 'Conservar la trazabilidad',
    text: 'La organización archiva el comprobante junto con la autorización, la evidencia del pago y los documentos contables o fiscales relacionados.',
    check: 'Cada soporte se puede consultar desde el comprobante y su consecutivo.',
  },
];

const flowButtons = [...document.querySelectorAll('.flow-step')];
const flowDetail = document.querySelector('.flow-detail');

flowButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const step = paymentSteps[index];
    if (!step || !flowDetail) return;

    flowButtons.forEach((item, itemIndex) => {
      const active = itemIndex === index;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    flowDetail.classList.add('is-changing');
    window.setTimeout(() => {
      document.querySelector('#flow-detail-number').textContent = String(index + 1).padStart(2, '0');
      document.querySelector('#flow-detail-kicker').textContent = step.kicker;
      document.querySelector('#flow-detail-title').textContent = step.title;
      document.querySelector('#flow-detail-text').textContent = step.text;
      document.querySelector('#flow-detail-check').textContent = step.check;
      const detailIcon = document.querySelector('#flow-detail-icon');
      const selectedIcon = button.querySelector('svg');
      if (detailIcon && selectedIcon) detailIcon.replaceChildren(...[...selectedIcon.cloneNode(true).childNodes]);
      flowDetail.classList.remove('is-changing');
    }, 120);
  });
});

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealItems.length) {
  document.documentElement.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
