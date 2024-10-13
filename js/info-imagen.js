// Selecciona el botón de continuar
const continuarBtn = document.querySelector('.sparkle-button');

// Agrega un evento de clic al botón
continuarBtn.addEventListener('click', async () => {
    // Obtén los valores de los campos de entrada
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const file = document.getElementById('file').files[0];

    // Verifica si ambos campos están completos
    if (nombre && apellido && file) {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/analyze/uploadAnalyzePost', { // Corrected URL
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                // Redirige a la página de seleccionar-imagen.html
                window.location.href = 'seleccionar-imagen.html';
            } else {
                // Si hay un error, muestra un mensaje
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert(`Error al guardar los datos: ${error.message}`);
        }
    } else {
        // Si falta algún campo, muestra un mensaje de error
        alert('Por favor, completa todos los campos.');
    }
});