//Funcion para enviar el correo
document.getElementById("Formulario").addEventListener("submit", function(event){
    event.preventDefault();  //evita el comportamiento por defecto del formulario

    const form = event.target;
    const formData = {
        nombre: form.nombre.value,
        email: form.email.value,
        mensaje: form.mensaje.value
    };

    const resultadoDiv = document.getElementById('resultado')
    resultadoDiv.innerText = 'Enviando...';
    resultadoDiv.style.color = 'blue';

    //se manda la solicitud del POST al servidor
    fetch('http://localhost:8081/api/contacto',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {  // Cambiado de 'data' a 'response'
        if(!response.ok){
            throw new Error('Error en la solicitud');
        }
        return response.text();
    })
    .then(data => {
        resultadoDiv.innerText = 'Mensaje enviado correctamente';  // Mensaje fijo en lugar de data.mensaje
        resultadoDiv.style.color = 'green';
        form.reset(); //resetea el formulario
    })
    .catch(error => {
        resultadoDiv.innerText = 'Error al enviar el mensaje. Intente nuevamente.';
        resultadoDiv.style.color = 'red';
        console.error('Error:', error);
    })
})