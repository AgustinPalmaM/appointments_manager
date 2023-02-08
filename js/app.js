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

class UI {
  printAlert( message, typeAlert ) {
    const mainContainer = document.querySelector('#contenido');
    
    while(mainContainer.firstElementChild.classList.contains('alert')){
      mainContainer.firstElementChild.remove();
    }
    const divMessage = document.createElement('DIV');
    divMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');
    divMessage.textContent = message;

    if( typeAlert === 'error' ) {
      divMessage.classList.add('alert-danger')
    } else {
      divMessage.classList.add('alert-success')
    }

    // add alert to the DOM
    mainContainer.insertBefore(divMessage, document.querySelector('.agregar-cita'))

    setTimeout(() => {
      divMessage.remove();
    }, 3000 )
  }
}

class Appointment {
  constructor() {
    this.appointments = [];
  }
}

const ui = new UI();
const manageAppointments = new Appointment();

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

  form.addEventListener( 'submit', newAppointment );
}

// add info to appointment object
function appointmentData(e) {
  appointmentObject[e.target.name] = e.target.value;
  console.log(appointmentObject);
}

// validate and fill new appointment to appointment class
function newAppointment(e) {
  e.preventDefault();

  // extract dara from appointment object
  const { pet, owner, phone, date, hour, symptoms } = appointmentObject;

  if ( pet === '' || owner === '' || phone ==='' || date === '' || hour === '' || symptoms === '' ) {
    ui.printAlert( 'All of the fields are required', 'error' );
    return;
  }

}