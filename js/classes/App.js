import { appointmentData, newAppointment } from "../functions.js";
import { petInput, ownerInput, phoneInput, dateInput, hourInput, symptomsInput, form } from "../selectors.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    petInput.addEventListener( 'change', appointmentData );
    ownerInput.addEventListener( 'change', appointmentData );
    phoneInput.addEventListener( 'change', appointmentData );
    dateInput.addEventListener( 'change', appointmentData );
    hourInput.addEventListener( 'change', appointmentData );
    symptomsInput.addEventListener( 'change', appointmentData );

    form.addEventListener( 'submit', newAppointment );

  }
}

export default App;