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

    //se manda la solicitud del POST al servidor - CAMBIADA LA URL
    fetch('https://senalestudios.onrender.com/api/contacto',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Error en la solicitud');
        }
        return response.json(); // Cambiado a JSON para obtener el mensaje del servidor
    })
    .then(data => {
        resultadoDiv.innerText = data.mensaje || 'Mensaje enviado correctamente';
        resultadoDiv.style.color = 'green';
        form.reset(); //resetea el formulario
    })
    .catch(error => {
        resultadoDiv.innerText = 'Error al enviar el mensaje. Intente nuevamente.';
        resultadoDiv.style.color = 'red';
        console.error('Error:', error);
    })
})