document.addEventListener('DOMContentLoaded', () => {
    // Contenedor de los pacientes
    const container = document.getElementById('elements-container');
    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = "No hay ningún análisis realizado";
    noResultsMessage.style.display = 'none';
    noResultsMessage.id = 'noResults';
    container.appendChild(noResultsMessage);  // Añadir el mensaje al contenedor
  
    const searchBar = document.getElementById('searchBar');
  
    // Función para obtener todos los pacientes desde la base de datos
    async function getPatients() {
        try {
            const response = await fetch('https://malaria-xi.vercel.app/api/get-pacientes'); // Cambia por tu endpoint real
            const patients = await response.json();
            return patients; // Devolver la lista de pacientes
        } catch (error) {
            console.error('Error al obtener los pacientes:', error);
            return [];
        }
    }
  
    // Función para mostrar los resultados de la búsqueda
    function displayPatients(patients) {
        // Limpiar el contenedor de pacientes
        container.innerHTML = '';
        container.appendChild(noResultsMessage); // Asegurarse de que el mensaje siempre esté presente
  
        if (patients.length === 0) {
            // Mostrar mensaje si no hay resultados
            noResultsMessage.style.display = 'block';
        } else {
            // Ocultar el mensaje de "No hay resultados"
            noResultsMessage.style.display = 'none';
  
            // Crear cartas para cada paciente
            patients.forEach(patient => {
                const patientCard = createPatientCard(patient);
                container.appendChild(patientCard);
            });
        }
    }
  
    // Función para crear una carta de paciente
    function createPatientCard(patient) {
        const card = document.createElement('div');
        card.classList.add('cartas-separadas');
  
        const cardContent = `
            <div class="card ${patient.status}" id="cartaa">
                <div class="card_form">
                    <span>${patient.status === 'infectado' ? 'Infectado' : 'No Infectado'}</span>
                </div>
                <div class="card_data">
                    <div style="display: flex" class="data">
                        <div class="text">
                            <div class="cube text_s">
                                <label class="side front">${patient.nombre} ${patient.apellido}</label>
                                <label onclick="location.href='imagen-accedida-posta.html?id=${patient.id}'" class="side top">Acceder</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        card.innerHTML = cardContent;
        return card;
    }
  
    // Función para buscar pacientes
    async function searchPatients(query) {
        const patients = await getPatients();
        // Filtrar los pacientes que coincidan con el nombre o apellido
        const filteredPatients = patients.filter(patient =>
            patient.nombre.toLowerCase().includes(query.toLowerCase()) || 
            patient.apellido.toLowerCase().includes(query.toLowerCase())
        );
        displayPatients(filteredPatients);
    }
  
    // Evento de la barra de búsqueda
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.trim()) {
            searchPatients(query); // Buscar pacientes
        } else {
            // Si la búsqueda está vacía, mostrar todos los pacientes
            getPatients().then(displayPatients);
        }
    });
  
    // Mostrar todos los pacientes cuando la página se cargue
    getPatients().then(displayPatients);
  });
  