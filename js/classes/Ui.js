import { deleteAppointment, saveEditionAppointment } from "../functions.js";
import { appointmentsContainer } from "../selectors.js"

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
      deleteAppointmentButton.innerHTML = `Delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
      deleteAppointmentButton.onclick = () => {
        deleteAppointment(id);
      };

      const editAppointmentButton = document.createElement('BUTTON');
      editAppointmentButton.classList.add('btn', 'btn-info');
      editAppointmentButton.innerHTML = `Edit <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`;
      editAppointmentButton.onclick = () => {
        saveEditionAppointment(appointment);
      }
    

      divAppointment.appendChild(namePet);
      divAppointment.appendChild(ownerPet);
      divAppointment.appendChild(phonePet);
      divAppointment.appendChild(datePet);
      divAppointment.appendChild(hourPet);
      divAppointment.appendChild(symptomsPet);
      divAppointment.appendChild(deleteAppointmentButton);
      divAppointment.appendChild(editAppointmentButton);
      appointmentsContainer.appendChild(divAppointment);
    });
  }
}

export default UI;