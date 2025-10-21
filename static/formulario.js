// Variables del DOM
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const addMemberBtn = document.getElementById('addMember');
const familyList = document.getElementById('familyList');
const form = document.getElementById('mainForm');

// ======= Navbar móvil =======
menuToggle.addEventListener('click', ()=>{
  navMenu.classList.toggle('show');
  menuToggle.classList.toggle('active');
  navOverlay.classList.toggle('active');
});

navOverlay.addEventListener('click', ()=>{
  navMenu.classList.remove('show');
  menuToggle.classList.remove('active');
  navOverlay.classList.remove('active');
});

// Scroll suave solo para anclas internas
document.querySelectorAll('.navbar a').forEach(anchor=>{
  anchor.addEventListener('click', function(){
    if(navMenu.classList.contains('show')){
      navMenu.classList.remove('show');
      menuToggle.classList.remove('active');
      navOverlay.classList.remove('active');
    }
    const href = this.getAttribute('href');
    if(href.startsWith('#')){
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// ======= Formulario dinámico =======
// Agregar miembros
function newFamilyRow(){
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
}

addMemberBtn.addEventListener('click', ()=>{
  if(familyList.querySelectorAll('.family-row').length >= 12){
    return alert('Máximo 12 miembros.');
  }
  familyList.appendChild(newFamilyRow());
});

familyList.addEventListener('click', (e)=>{
  if(e.target.classList.contains('remove-row')){
    e.target.closest('.family-row').remove();
  }
});

// Mostrar/ocultar campos condicionales
document.getElementById('gestacion').addEventListener('change', e=>{
  document.getElementById('gestacionMeses').style.display = e.target.value==='Si'?'block':'none';
});
document.getElementById('discapacidad').addEventListener('change', e=>{
  document.getElementById('discapacidadDetalle').style.display = e.target.value==='Si'?'block':'none';
});
document.getElementById('estadoCivil').addEventListener('change', e=>{
  document.getElementById('tiempoUnionWrapper').style.display = e.target.value==='Union Libre'?'block':'none';
});

// Scroll al formulario al presionar "llenar en línea"
document.getElementById('btn-fill-online').addEventListener('click', ()=>{
  form.scrollIntoView({behavior:'smooth'});
});

// Enviar formulario vía Gmail
form.addEventListener('submit', e=>{
  e.preventDefault();
  const data = new FormData(form);
  let body = "----- FORMULARIO BONO FAMILIAR -----\n";
  data.forEach((v,k)=>{ body += `${k}: ${v}\n`; });
  const mailtoLink = `mailto:informaciongrupofe@gmail.com?subject=${encodeURIComponent('Formulario Bono Familiar - Grupo Fe')}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
});
