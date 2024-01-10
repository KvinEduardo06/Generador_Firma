

// TODO: PARA LLENAR LA FIRMA CON LA INFORMACION DIGITADA EN EL FORM

function generarInformacion() {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const correoInput = document.getElementById('correo');
    const sucursalSelect = document.getElementById('sucursal');
    const telefonoInput = document.getElementById('telefono');
    const areaSelect = document.getElementById('area');

    // Obtener los valores en mayúsculas
    const nombre = nombreInput.value.toUpperCase();
    const apellido = apellidoInput.value.toUpperCase();
    const usuarioCorreo = correoInput.value; // Obtener el valor del usuario (sin la extensión)
    const area = areaSelect.options[areaSelect.selectedIndex].text; // Obtener el texto seleccionado del área
    const telefono = telefonoInput.value;
    const sucursal = sucursalSelect.options[sucursalSelect.selectedIndex].text; // Obtener el texto seleccionado de la sucursal

    const correo = `${usuarioCorreo}@como.com.sv`;

    // Actualiza la información del empleado en el documento
    document.getElementById('name').innerHTML = `${nombre} <b class="last-name">${apellido}</b>`;
    document.getElementById('text-information-email').innerText = correo;

    // Agregar directamente la sucursal en la firma
    const sucursalTexto = document.getElementById('text-information-sucursal');
    sucursalTexto.innerText = `Sucursal: ${sucursal}`;

    document.getElementById('text-information-telefono').innerHTML = formatPhoneNumber(telefono);
    document.getElementById('text-information-area').innerText = `${area} | Comercialización En Movimiento S.A de C.V `;

}


// Función para dar formato al número de teléfono
function formatPhoneNumber(phoneNumber) {
    // Verificar si phoneNumber es una cadena de texto
    if (typeof phoneNumber === 'string') {
        // Eliminar todos los caracteres no numéricos del número de teléfono
        const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

        // Verificar si el número tiene al menos 4 dígitos
        if (numericPhoneNumber.length >= 4) {
            // Dividir el número en grupos de 4 dígitos y unirlos con guiones
            const formattedPhoneNumber = numericPhoneNumber.match(/.{1,4}/g).join('-');
            return formattedPhoneNumber;
        } else {
            return phoneNumber; // Devolver el número original si tiene menos de 4 dígitos
        }
    } else {
        return phoneNumber; // Devolver el número original si no es una cadena de texto
    }
}



function generarImagenFirma() {
    // Genera la información primero
    generarInformacion();
    // Llama a cambiarFondo para actualizar la imagen si es necesario
    cambiarFondo();

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const correoInput = document.getElementById('correo');
    const sucursalSelect = document.getElementById('sucursal');
    const telefonoInput = document.getElementById('telefono');
    const areaSelect = document.getElementById('area');

    const nombre = nombreInput.value.toUpperCase();
    const apellido = apellidoInput.value.toUpperCase();
    const correo = correoInput.value;
    const sucursalOption = sucursalSelect.options[sucursalSelect.selectedIndex];
    const telefono = telefonoInput.value;
    const areaOption = areaSelect.options[areaSelect.selectedIndex];

    // Validar que todos los campos estén completos y con valores válidos
    if (!nombre || !apellido || !correo || !sucursalOption.value || !areaOption.value ) {
        // Mostrar un Sweet Alert indicando que los campos son obligatorios y deben tener valores válidos
        Swal.fire({
            icon: 'error',
            title: 'Campos obligatorios',
            text: 'Todos los campos deben estar completos y con valores válidos antes de generar la imagen.',
        });
        return; // Detener la ejecución de la función si los campos no están completos o con valores inválidos
    }


    // Obtener la imagen cargada
    const imagenSrc = document.querySelector('.correo-img').src;

    // Crear la firma
    const firmaHTML = `
        <div>
            <div class="container-img">
                <img src="${imagenSrc}" alt="" srcset="" class="correo-img">
            </div>

            <div class="container-info-empleado-generado">
                <h1 class="name">${nombre} <b class="last-name">${apellido}</b></h1>
                <h5 id="text-information-area" class="area-generador">${areaOption.text} | Comercialización En Movimiento S.A de C.V</h5>

                <ul class="pt-3">
                    <li>
                        <i class="fas fa-envelope email-box-generador p-2 m-2 information-list"></i>
                        <span id="text-information-email" class="information-list">${correo}</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-location-pin email-box-generador m-2 p-2 information-list "></i>
                        <span id="text-information-sucursal" class="information-list">Sucursal: ${sucursalOption.text}</span>
                        </li>
                    <li>
                        <i class="fa-solid fa-phone email-box-generador m-2 p-2 information-list"></i>
                        <span id="text-information-telefono" class="information-list">${telefono}</span>
                    </li>
                </ul>
            </div>
        </div>
    `;

    // Mostrar la firma generada en el contenedor
    const firmaContainer = document.getElementById('firma-generada');
    firmaContainer.innerHTML = firmaHTML;

    // Mostrar u ocultar el icono y su contenedor según la presencia del teléfono
    const telefonoIcon = document.querySelector('.fa-phone');
    const telefonoContainer = document.querySelector('#text-information-telefono');

    if (telefono) {

    } else {
        telefonoIcon.style.display = 'none'; // Ocultar el icono
        telefonoContainer.style.display = 'none'; // Ocultar el contenedor
    }

    // Ejemplo con html2canvas:
    html2canvas(firmaContainer).then(canvas => {
        // Convertir el canvas a una imagen
        const imageDataURL = canvas.toDataURL();
        // Guardar la imagen o hacer lo que necesites
        saveImage(imageDataURL, nombre, apellido, sucursalOption.text); // Utiliza sucursalOption.text aquí

        // Recargar la página después de un breve retraso (1000 milisegundos = 1 segundo)
        setTimeout(() => {
            location.reload();
        }, 1000);
    });

    // Limpiar los campos de entrada
    nombreInput.value = '';
    apellidoInput.value = '';
    correoInput.value = '';
    sucursalSelect.value = '';  // Modificado para limpiar el campo 'sucursal'
    telefonoInput.value = '';
    areaSelect.value = '';
}


// TODO: Función para guardar la imagen (puedes personalizar según tus necesidades)
function saveImage(imageDataURL, nombre, apellido, sucursal) {
    const fileName = `${nombre}_${apellido}_${sucursal}.png`;

    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    link.href = imageDataURL;
    link.download = fileName; // Usar el nombre de archivo único
    // Simular un clic en el enlace para iniciar la descarga
    link.click();
}

// TODO: Funcion que me permite cambiar el fondo segun el fondo que haya seleccionado el usuario en el input 
function cambiarFondo() {
    // Obtén el valor seleccionado del elemento select
    const selectFondo = document.getElementById('selectFondo');
    const selectedOption = selectFondo.value;

    // Obtén la imagen que deseas cambiar
    const imagen = document.querySelector('.correo-img');

    // Cambia la fuente de la imagen según la opción seleccionada
    imagen.src = selectedOption;
}

