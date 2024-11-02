document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var events = []; // Array para almacenar los eventos

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek", // Vistas disponibles
    },
    dateClick: function (info) {
      // Abrir el modal al hacer clic en una fecha del calendario
      $("#eventModal").modal("show");
      document.getElementById("eventDate").value = info.dateStr; // Establecer la fecha en el campo del modal
    },
    events: function (fetchInfo, successCallback, failureCallback) {
      // Retornar todos los eventos del array
      successCallback(events);
    },
  });

  calendar.render();

  // Guardar el evento cuando se hace clic en el botón "Guardar Evento"
  document.getElementById("saveEvent").addEventListener("click", function () {
    var title = document.getElementById("eventTitle").value;
    var date = document.getElementById("eventDate").value;

    // Agregar el evento al array
    events.push({
      title: title,
      start: date,
      allDay: true,
    });

    // Agregar el evento al calendario
    calendar.addEvent({
      title: title,
      start: date,
      allDay: true,
    });

    // Cerrar el modal y limpiar los campos
    $("#eventModal").modal("hide");
    document.getElementById("eventForm").reset();
  });
});

const doctores = [
    {
        especialidad: "Cardiología",
        doctor: "Dr. Victor Talledo",
        intervalos: [
            { tiempo: "10:00 am a 12:00 pm", disponible: true },
            { tiempo: "02:00 pm a 03:00 pm", disponible: true },
            { tiempo: "05:00 pm a 06:30 pm", disponible: true },
        ],
    },
    {
        especialidad: "Pediatría",
        doctor: "Dr. Ana López",
        intervalos: [
            { tiempo: "09:00 am a 11:00 am", disponible: true },
            { tiempo: "01:00 pm a 02:30 pm", disponible: true },
            { tiempo: "03:30 pm a 05:00 pm", disponible: false },
        ],
    },
    {
        especialidad: "Dermatología",
        doctor: "Dr. Carlos Fernández",
        intervalos: [
            { tiempo: "11:00 am a 01:00 pm", disponible: true },
            { tiempo: "03:00 pm a 04:30 pm", disponible: true },
            { tiempo: "05:30 pm a 07:00 pm", disponible: false },
        ],
    },
    {
        especialidad: "Neurología",
        doctor: "Dr. María García",
        intervalos: [
            { tiempo: "08:30 am a 10:30 am", disponible: true },
            { tiempo: "12:00 pm a 01:30 pm", disponible: true },
            { tiempo: "04:00 pm a 06:00 pm", disponible: true },
        ],
    },
    {
        especialidad: "Oftalmología",
        doctor: "Dr. Juan Pérez",
        intervalos: [
            { tiempo: "09:30 am a 11:30 am", disponible: true },
            { tiempo: "02:00 pm a 03:30 pm", disponible: false },
            { tiempo: "06:00 pm a 07:30 pm", disponible: true },
        ],
    },
    {
        especialidad: "Ginecología",
        doctor: "Dra. Laura Rodríguez",
        intervalos: [
            { tiempo: "10:00 am a 12:00 pm", disponible: false },
            { tiempo: "01:30 pm a 03:00 pm", disponible: true },
            { tiempo: "04:30 pm a 06:00 pm", disponible: true },
        ],
    },
    {
        especialidad: "Medicina General",
        doctor: "Dr. Javier Martínez",
        intervalos: [
            { tiempo: "08:00 am a 10:00 am", disponible: true },
            { tiempo: "11:00 am a 01:00 pm", disponible: true },
            { tiempo: "03:00 pm a 05:00 pm", disponible: false },
        ],
    },
    {
        especialidad: "Traumatología",
        doctor: "Dr. Luis Sánchez",
        intervalos: [
            { tiempo: "09:00 am a 11:00 am", disponible: true },
            { tiempo: "01:00 pm a 02:30 pm", disponible: true },
            { tiempo: "03:30 pm a 05:00 pm", disponible: false },
        ],
    },
    {
        especialidad: "Psiquiatría",
        doctor: "Dr. Sofía Torres",
        intervalos: [
            { tiempo: "11:00 am a 12:30 pm", disponible: true },
            { tiempo: "02:00 pm a 03:30 pm", disponible: true },
            { tiempo: "05:00 pm a 06:30 pm", disponible: false },
        ],
    },
    {
        especialidad: "Oncología",
        doctor: "Dr. Pablo Díaz",
        intervalos: [
            { tiempo: "09:00 am a 10:30 am", disponible: true },
            { tiempo: "12:00 pm a 01:30 pm", disponible: true },
            { tiempo: "04:00 pm a 05:30 pm", disponible: true },
        ],
    },
];

const especialidades = [
  "Cardiología",
  "Pediatría",
  "Dermatología",
  "Neurología",
  "Oftalmología",
  "Ginecología",
  "Medicina General",
  "Traumatología",
  "Psiquiatría",
  "Oncología",
];

let citas = [];

// Rellenar el combo de especialidades
document.addEventListener('DOMContentLoaded', () => {
    const selectEspecialidades = document.getElementById('especialidades');
    doctores.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc.especialidad;
        option.textContent = doc.especialidad;
        selectEspecialidades.appendChild(option);
    });
});

// Función para mostrar el doctor y los horarios según la especialidad seleccionada
function mostrarDoctor() {
    const selectEspecialidades = document.getElementById('especialidades');
    const especialidadSeleccionada = selectEspecialidades.value;
    const doctorInput = document.getElementById('doctor');
    const horariosContainer = document.getElementById('horariosContainer');
    const horariosSelect = document.getElementById('horarios');

    // Limpiar el select de horarios
    horariosSelect.innerHTML = '<option value="">Seleccione un horario</option>';

    const doctorEncontrado = doctores.find(doc => doc.especialidad === especialidadSeleccionada);
    
    if (doctorEncontrado) {
        doctorInput.value = doctorEncontrado.doctor;

        // Agregar horarios al select
        doctorEncontrado.intervalos.forEach(intervalo => {
            const option = document.createElement('option');
            option.value = intervalo.tiempo;
            option.textContent = intervalo.tiempo;
            option.style.color = intervalo.disponible ? 'black' : 'gray'; // Cambiar el color del texto

            // Deshabilitar la opción si no está disponible
            if (!intervalo.disponible) {
                option.disabled = true;
            }

            horariosSelect.appendChild(option);
        });

        horariosContainer.style.display = 'block';
    } else {
        doctorInput.value = '';
        horariosContainer.style.display = 'none';
    }
}

// Función para guardar la información de las citas
function guardarCita() {
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;
    const especialidad = document.getElementById('especialidades').value;
    const doctor = document.getElementById('doctor').value;
    const horario = document.getElementById('horarios').value;

    // Validar que todos los campos estén llenos
    if (!eventTitle || !eventDate || !especialidad || !doctor || !horario) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear un objeto de cita
    const cita = {
        title: eventTitle,
        date: eventDate,
        especialidad: especialidad,
        doctor: doctor,
        horario: horario,
    };

    // Agregar la cita al arreglo
    citas.push(cita);

    // Limpiar el formulario
    document.getElementById('eventForm').reset();
    document.getElementById('horariosContainer').style.display = 'none';

    // Mostrar un mensaje de confirmación
    alert("Cita guardada con éxito.");
}