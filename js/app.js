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

  printAppointments( { appointments } ) {
    while( appointmentsContainer.firstElementChild ) {
      appointmentsContainer.firstElementChild.remove();
    }
    appointments.forEach(appointment => {
      const { pet, owner, phone, date, hour, symptoms, id } = appointment;
      
      const divAppointment = document.createElement('DIV');
      divAppointment.classList.add('cita', 'p-3');
      divAppointment.dataset.id = id;

      const namePet = document.createElement('H2');
      namePet.classList.add('card-title', 'font-weight-bolder');
      namePet.textContent = pet;

      const ownerPet = document.createElement('P');
      ownerPet.innerHTML = `
        <span class="font-weight-bolder">Owner: </span> ${owner}
      `;

      const phonePet = document.createElement('P');
      phonePet.innerHTML = `
        <span class="font-weight-bolder">Phone: </span> ${phone}
      `;

      const datePet = document.createElement('P');
      datePet.innerHTML = `
        <span class="font-weight-bolder">Date: </span> ${date}
      `;

      const hourPet = document.createElement('P');
      hourPet.innerHTML = `
        <span class="font-weight-bolder">Hour: </span> ${hour}
      `;

      const symptomsPet = document.createElement('P');
      symptomsPet.innerHTML = `
        <span class="font-weight-bolder">Symptoms: </span> ${symptoms}
      `;

      const deleteAppointmentButton = document.createElement('BUTTON');
      deleteAppointmentButton.classList.add('btn', 'btn-danger', 'mr-2');
      deleteAppointmentButton.innerHTML = `Delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
      deleteAppointmentButton.onclick = () => {
        deleteAppointment(id);
      }
    

      divAppointment.appendChild(namePet);
      divAppointment.appendChild(ownerPet);
      divAppointment.appendChild(phonePet);
      divAppointment.appendChild(datePet);
      divAppointment.appendChild(hourPet);
      divAppointment.appendChild(symptomsPet);
      divAppointment.appendChild(deleteAppointmentButton);
      appointmentsContainer.appendChild(divAppointment);
    });
  }
}

class Appointment {
  constructor() {
    this.appointments = [];
  }

  addAppointment(appointment) {
    this.appointments = [ ...this.appointments, appointment ]
  }

  deleteAppointment(id) {
    this.appointments = this.appointments.filter(appointment => appointment.id !== id );
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

  // add an unique id for each appointment
  appointmentObject.id = Date.now();

  // add new appointment to appointments array
  manageAppointments.addAppointment( {...appointmentObject} );

  // reset the form in the html
  form.reset();

  // reset the appointment object to add a new appointment
  resetObject();

  ui.printAppointments( manageAppointments );

}

// Reset appointment object to fill with new data
function resetObject() {
  appointmentObject.pet = '',
  appointmentObject.owner = '',
  appointmentObject.phone = '',
  appointmentObject.date = '',
  appointmentObject.hour = '',
  appointmentObject.symptoms = ''
}

function deleteAppointment(id) {
  manageAppointments.deleteAppointment(id);

  ui.printAlert('Appointment deleted ok');

  ui.printAppointments( manageAppointments );
}