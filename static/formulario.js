// ============================
// 📁 script.js - Grupo FE
// ============================

// ======= Variables del DOM =======
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const addMemberBtn = document.getElementById('addMember');
const familyList = document.getElementById('familyList');
const form = document.getElementById('mainForm');

// ======= NAVBAR MÓVIL =======
if (menuToggle && navMenu && navOverlay) {
  // Abrir/cerrar menú
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuToggle.classList.toggle('active');
    navOverlay.classList.toggle('active');
  });

  // Cerrar al hacer clic fuera
  navOverlay.addEventListener('click', () => {
    navMenu.classList.remove('show');
    menuToggle.classList.remove('active');
    navOverlay.classList.remove('active');
  });

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      menuToggle.classList.remove('active');
      navOverlay.classList.remove('active');
    }
  });
}

// ======= SCROLL SUAVE =======
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function () {
    if (navMenu?.classList.contains('show')) {
      navMenu.classList.remove('show');
      menuToggle.classList.remove('active');
      navOverlay.classList.remove('active');
    }
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ======= FORMULARIO DINÁMICO =======
if (addMemberBtn && familyList) {
  const newFamilyRow = () => {
    const row = document.createElement('div');
    row.className = 'family-row';
    row.innerHTML = `
      <input type="text" name="f_nombre[]" placeholder="Nombre">
      <input type="text" name="f_parentesco[]" placeholder="Parentesco">
      <input type="number" name="f_edad[]" placeholder="Edad" min="0">
      <input type="text" name="f_ocupacion[]" placeholder="Ocupación">
      <input type="number" name="f_ingreso[]" placeholder="Ingreso mensual (₡)" min="0">
      <button type="button" class="small-btn remove-row">✖</button>
    `;
    return row;
  };

  addMemberBtn.addEventListener('click', () => {
    const count = familyList.querySelectorAll('.family-row').length;
    if (count >= 12) {
      alert('⚠️ Máximo 12 miembros permitidos.');
      return;
    }
    familyList.appendChild(newFamilyRow());
  });

  // Eliminar fila de miembro
  familyList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-row')) {
      e.target.closest('.family-row').remove();
    }
  });
}

// ======= CAMPOS CONDICIONALES =======
const gestacion = document.getElementById('gestacion');
const discapacidad = document.getElementById('discapacidad');
const estadoCivil = document.getElementById('estadoCivil');

if (gestacion) {
  gestacion.addEventListener('change', (e) => {
    document.getElementById('gestacionMeses').style.display =
      e.target.value === 'Si' ? 'block' : 'none';
  });
}

if (discapacidad) {
  discapacidad.addEventListener('change', (e) => {
    document.getElementById('discapacidadDetalle').style.display =
      e.target.value === 'Si' ? 'block' : 'none';
  });
}

if (estadoCivil) {
  estadoCivil.addEventListener('change', (e) => {
    document.getElementById('tiempoUnionWrapper').style.display =
      e.target.value === 'Union Libre' ? 'block' : 'none';
  });
}

// ======= BOTÓN "LLENAR EN LÍNEA" =======
const btnFillOnline = document.getElementById('btn-fill-online');
if (btnFillOnline && form) {
  btnFillOnline.addEventListener('click', () => {
    form.scrollIntoView({ behavior: 'smooth' });
  });
}

// ======= ENVÍO DE FORMULARIO POR CORREO =======
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!form.checkValidity()) {
      alert('⚠️ Por favor, complete todos los campos requeridos antes de enviar.');
      return;
    }

    // Confirmación al usuario
    alert('📧 Se abrirá tu cliente de correo para enviar la información. Revisa los datos antes de enviarlos.');

    const data = new FormData(form);
    let body = "----- FORMULARIO BONO FAMILIAR -----\n\n";
    data.forEach((v, k) => { body += `${k}: ${v}\n`; });

    const subject = 'Formulario Bono Familiar - Grupo Fe';
    const mailtoLink = `mailto:informaciongrupofe@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  });
}
