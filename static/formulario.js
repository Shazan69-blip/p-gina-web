// ============================
// 📁 formulario.js - Grupo FE
// ============================

// ==== MENU RESPONSIVO ====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navOverlay.classList.toggle('active');
});

navOverlay.addEventListener('click', () => {
  navMenu.classList.remove('active');
  navOverlay.classList.remove('active');
});

// ==== CAMPOS CONDICIONALES ====
const estadoCivil = document.getElementById('estadoCivil');
const tiempoUnionWrapper = document.getElementById('tiempoUnionWrapper');
estadoCivil.addEventListener('change', () => {
  tiempoUnionWrapper.style.display = estadoCivil.value === 'Union Libre' ? 'block' : 'none';
});

const gestacion = document.getElementById('gestacion');
const gestacionMeses = document.getElementById('gestacionMeses');
gestacion.addEventListener('change', () => {
  gestacionMeses.style.display = gestacion.value === 'Si' ? 'block' : 'none';
});

const discapacidad = document.getElementById('discapacidad');
const discapacidadDetalle = document.getElementById('discapacidadDetalle');
discapacidad.addEventListener('change', () => {
  discapacidadDetalle.style.display = discapacidad.value === 'Si' ? 'block' : 'none';
});

// ==== AÑADIR MIEMBROS FAMILIARES ====
const addMemberBtn = document.getElementById('addMember');
const familyList = document.getElementById('familyList');

addMemberBtn.addEventListener('click', () => {
  const members = familyList.querySelectorAll('.family-row');
  if (members.length >= 12) return alert('Máximo 12 miembros');

  const div = document.createElement('div');
  div.className = 'family-row';
  div.innerHTML = `
    <input type="text" name="f_nombre[]" placeholder="Nombre">
    <input type="text" name="f_parentesco[]" placeholder="Parentesco">
    <input type="number" name="f_edad[]" placeholder="Edad" min="0">
    <input type="text" name="f_ocupacion[]" placeholder="Ocupación">
    <input type="number" name="f_ingreso[]" placeholder="Ingreso mensual (₡)" min="0">
    <button type="button" class="small-btn remove-row">✖</button>
  `;
  familyList.appendChild(div);

  div.querySelector('.remove-row').addEventListener('click', () => div.remove());
});
