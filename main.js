// Datos de doctores
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

let citas = [];

document.addEventListener("DOMContentLoaded", function () {
    var calendarEl = document.getElementById("calendar");
    var events = []; // Array para almacenar los eventos
  
    calendar = new FullCalendar.Calendar(calendarEl, {
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
      eventClick: function (info) {
        // Mostrar los detalles de la cita al hacer clic en el evento
        const event = info.event; // Obtener el evento clicado
    
        // Validar que el evento tenga las propiedades start y end
        if (!event.start) {
            console.error("El evento no tiene una fecha de inicio válida.");
            return; // Salir de la función si no hay fecha de inicio
        }
    
        const startTime = event.start;
        const endTime = event.end || startTime; // Usar start como end si end es nulo
    
        // Formatear las horas
        const startFormatted = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endFormatted = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
        const eventDetails = `
          <strong>Título:</strong> ${event.title}<br>
          <strong>Fecha:</strong> ${startTime.toISOString().split('T')[0]}<br>
          <strong>Hora:</strong> ${startFormatted} - ${endFormatted}<br>
          <strong>Especialidad:</strong> ${event.extendedProps.especialidad}<br>
          <strong>Doctor:</strong> ${event.extendedProps.doctor}<br>
        `;
    
        // Asegúrate de tener un contenedor para mostrar los detalles
        document.getElementById("eventDetails").innerHTML = eventDetails;
        $("#eventDetailsModal").modal("show"); // Muestra el modal de detalles
    },
    });
  
    calendar.render();
  
    // Añadir evento al botón de guardar dentro de DOMContentLoaded
    const guardarCitaBtn = document.getElementById("guardarCitaBtn");
    if (guardarCitaBtn) {
      guardarCitaBtn.addEventListener("click", guardarCita);
    } else {
      console.error("No se encontró el botón 'guardarCitaBtn'.");
    }
  
    // Rellenar el combo de especialidades
    const selectEspecialidades = document.getElementById("especialidades");
    doctores.forEach((doc) => {
      const option = document.createElement("option");
      option.value = doc.especialidad;
      option.textContent = doc.especialidad;
      selectEspecialidades.appendChild(option);
    });
  
    // Agregar evento de cambio al select de especialidades
    selectEspecialidades.addEventListener("change", mostrarDoctor);
  });
  
  // Función para mostrar el doctor y los horarios según la especialidad seleccionada
  function mostrarDoctor() {
    const selectEspecialidades = document.getElementById("especialidades");
    const especialidadSeleccionada = selectEspecialidades.value;
    const doctorInput = document.getElementById("doctor");
    const horariosContainer = document.getElementById("horariosContainer");
    const horariosSelect = document.getElementById("horarios"); // Asegúrate de que este ID sea correcto
  
    // Limpiar el select de horarios
    horariosSelect.innerHTML = '<option value="">Seleccione un horario</option>';
  
    const doctorEncontrado = doctores.find(
      (doc) => doc.especialidad === especialidadSeleccionada
    );
  
    if (doctorEncontrado) {
      doctorInput.value = doctorEncontrado.doctor;
  
      // Agregar horarios al select
      doctorEncontrado.intervalos.forEach((intervalo) => {
        const option = document.createElement("option");
        option.value = intervalo.tiempo;
        option.textContent = intervalo.tiempo;
        option.style.color = intervalo.disponible ? "black" : "gray"; // Cambiar el color del texto
  
        // Deshabilitar la opción si no está disponible
        if (!intervalo.disponible) {
          option.disabled = true;
        }
  
        horariosSelect.appendChild(option);
      });
  
      horariosContainer.style.display = "block";
    } else {
      doctorInput.value = "";
      horariosContainer.style.display = "none";
    }
  }
  
  // Función para convertir de formato de 12 horas a 24 horas
  function convertTo24HourFormat(time12h) {
    const [time, modifier] = time12h.trim().split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "pm" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === "am" && hours === "12") {
      hours = "00";
    }
    return `${hours}:${minutes}`;
  }
  
  // Función para guardar la información de las citas
  function guardarCita() {
    const eventTitle = document.getElementById("eventTitle").value;
    const eventDate = document.getElementById("eventDate").value;
    const especialidad = document.getElementById("especialidades").value;
    const doctor = document.getElementById("doctor").value;
    const horariosSelect = document.getElementById("horarios"); // Mover aquí la definición de horariosSelect
    const horario = horariosSelect.value;
  
    // Validar que todos los campos estén llenos
    if (!eventTitle || !eventDate || !especialidad || !doctor || !horario) {
      alert("Por favor, complete todos los campos.");
      return;
    }
  
    // Extraer la hora de inicio del horario seleccionado
    const horaInicio12 = horario.split(" a ")[0]; // Toma solo el primer intervalo
    const horaInicio = convertTo24HourFormat(horaInicio12); // Convierte a formato de 24 horas
  
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
    console.log("citas", citas);
  
    // Agregar el evento al calendario con propiedades extendidas
    calendar.addEvent({
      title: `${eventTitle} - ${especialidad}`,
      start: `${eventDate}T${horaInicio}`, // Usar la hora convertida
      allDay: false,
      extendedProps: {
        especialidad: especialidad,
        doctor: doctor,
      },
    });
  
    // Limpiar el formulario
    document.getElementById("eventTitle").value = "";
    document.getElementById("especialidades").value = "";
    document.getElementById("doctor").value = "";
    horariosSelect.innerHTML = '<option value="">Seleccione un horario</option>';
    horariosContainer.style.display = "none"; // Ocultar los horarios
    $('#eventModal').modal('hide'); // Cerrar el modal
  }