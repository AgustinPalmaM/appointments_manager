import Appointment from "./classes/Appointments.js";
import UI from "./classes/Ui.js";
import { petInput, ownerInput, phoneInput, dateInput, hourInput, symptomsInput, form } from "./selectors.js";

const ui = new UI();
const manageAppointments = new Appointment();

let editMode;

// main object with appointment data
const appointmentObject = {
  pet: '',
  owner: '',
  phone: '',
  date: '',
  hour: '',
  symptoms: ''
}

// add info to appointment object
export function appointmentData(e) {
  appointmentObject[e.target.name] = e.target.value;
  
}

// validate and fill new appointment to appointment class
export function newAppointment(e) {
  e.preventDefault();

  // extract dara from appointment object
  const { pet, owner, phone, date, hour, symptoms } = appointmentObject;

  if ( pet === '' || owner === '' || phone ==='' || date === '' || hour === '' || symptoms === '' ) {
    ui.printAlert( 'All of the fields are required', 'error' );
    return;
  }

  if (editMode) {
    console.log('editando');
    manageAppointments.editAppointment( {...appointmentObject} )

    form.querySelector('button[type="submit"]').textContent = 'Create Appointment';

    // print an alert with successfull action
    ui.printAlert('Appointment updated ok')

    editMode = false;
    
  } else {
    
    // add an unique id for each appointment
    appointmentObject.id = Date.now();
    
    // add new appointment to appointments array
    manageAppointments.addAppointment( {...appointmentObject} );

    // print an alert with successfull action
    ui.printAlert('Appointments added ok')
  }
  

  // reset the form in the html
  form.reset();

  // reset the appointment object to add a new appointment
  resetObject();

  ui.printAppointments( manageAppointments );

}

// Reset appointment object to fill with new data
export function resetObject() {
  appointmentObject.pet = '',
  appointmentObject.owner = '',
  appointmentObject.phone = '',
  appointmentObject.date = '',
  appointmentObject.hour = '',
  appointmentObject.symptoms = ''
}

export function deleteAppointment(id) {
  manageAppointments.deleteAppointment(id);

  ui.printAlert('Appointment deleted ok');

  ui.printAppointments( manageAppointments );
}

export function saveEditionAppointment(appointment) {
  
  const { pet, owner, phone, date, hour, symptoms, id } = appointment;

  // fill the inputs to edit each field
  petInput.value = pet;
  ownerInput.value = owner;
  phoneInput.value = phone;
  dateInput.value = date;
  hourInput.value = hour;
  symptomsInput.value = symptoms;

  // fill the object appointment 
  appointmentObject.pet = pet;
  appointmentObject.owner = owner;
  appointmentObject.phone = phone;
  appointmentObject.date = date;
  appointmentObject.hour = hour;
  appointmentObject.symptoms = symptoms;
  appointmentObject.id = id;

  form.querySelector('button[type="submit"]').textContent = 'Save changes';

  editMode = true;
}