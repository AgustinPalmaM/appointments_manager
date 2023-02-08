// form variables
const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#telefono');
const dateInput = document.querySelector('#fecha');
const hourInput = document.querySelector('#hora');
const symptomsInput = document.querySelector('#sintomas');

// User interface
const form = document.querySelector('#nueva-cita');
const appointmentsContainer = document.querySelector('#citas');

// main object with appointment data
const appointmentObject = {
  pet: '',
  owner: '',
  phone: '',
  date: '',
  hour: '',
  symptoms: ''
}

// events
eventListeners();
function eventListeners() {
  petInput.addEventListener( 'change', appointmentData );
  ownerInput.addEventListener( 'change', appointmentData );
  phoneInput.addEventListener( 'change', appointmentData );
  dateInput.addEventListener( 'change', appointmentData );
  hourInput.addEventListener( 'change', appointmentData );
  symptomsInput.addEventListener( 'change', appointmentData );
}

// add info to appointment object
function appointmentData(e) {
  appointmentObject[e.target.name] = e.target.value;
  console.log(appointmentObject);
}

