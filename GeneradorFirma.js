

// TODO: PARA LLENAR LA FIRMA CON LA INFORMACION DIGITADA EN EL FORM

function generarInformacion() {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const correoInput = document.getElementById('correo');
    const sucursalSelect = document.getElementById('sucursal');
    const telefonoInput = document.getElementById('telefono');
    const telefonoFijoInput = document.getElementById('telefono-fijo');

    const areaSelect = document.getElementById('area');

    // Obtener los valores en mayúsculas
    const nombre = nombreInput.value.toUpperCase();
    const apellido = apellidoInput.value.toUpperCase();
    const usuarioCorreo = correoInput.value; // Obtener el valor del usuario (sin la extensión)
    const area = areaSelect.options[areaSelect.selectedIndex].text; // Obtener el texto seleccionado del área
    const telefono = telefonoInput.value;
    const telefonoFijo = telefonoFijoInput.value;

    const sucursal = sucursalSelect.options[sucursalSelect.selectedIndex].text; // Obtener el texto seleccionado de la sucursal

    const correo = `${usuarioCorreo}@como.com.sv`;



    // Actualiza la información del empleado en el documento
    document.getElementById('name').innerHTML = `${nombre} <b class="last-name">${apellido}</b>`;
    document.getElementById('text-information-email').innerText = correo;

    // Agregar directamente la sucursal en la firma
    const sucursalTexto = document.getElementById('text-information-sucursal');
    sucursalTexto.innerText = `Sucursal: ${sucursal}`;

    document.getElementById('text-information-telefono').innerHTML = formatPhoneNumber(telefono);
    document.getElementById('text-information-fijo').innerHTML = formatPhoneNumber(telefonoFijo);

    document.getElementById('text-information-area').innerText = `${area} | Comercialización En Movimiento S.A de C.V `;

    // TODO PARA CAMBIAR EL QR DE Mapeo de sucursales a rutas de imágenes de QR
    const qrMap = {
        'Ahuachapán': 'QR_Ahuachapan.png',
        'San Salvador': 'QR_San_Salvador.png',
        'Santa Ana': 'QR_Santa_Ana.png',
        'Sonsonate': 'QR_Sonsonate.png',
        // ESTE ES EL MISMO PORQUE ES LA MISMA SUCURSAL
        'La Libertad': 'QR_San_Salvador.png',
        'Soyapango': 'QR_Soyapango.png',

        // FALTA SOYAPANGO
    };

    const qrUbicacion = document.querySelector('.Qr_Ubicacion-Generada');

    if (sucursal in qrMap) {
        // esta es la ubicacion de donde estan los qr de la ubicaciones
        qrUbicacion.src = `img/Ubicaciones_QR/${qrMap[sucursal]}`;
        qrUbicacion.style.display = 'block';  // Mostrar el QR
    } else {
        qrUbicacion.style.display = 'none';   // Ocultar el QR para otras sucursales
    }
    // FIN QR
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

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const correoInput = document.getElementById('correo');
    const sucursalSelect = document.getElementById('sucursal');
    const telefonoInput = document.getElementById('telefono');
    const telefonoFijoInput = document.getElementById('telefono-fijo');

    const areaSelect = document.getElementById('area');

    const nombre = nombreInput.value.toUpperCase();
    const apellido = apellidoInput.value.toUpperCase();
    const usuarioCorreo = correoInput.value; // Obtener el valor del usuario (sin la extensión)
    const sucursalOption = sucursalSelect.options[sucursalSelect.selectedIndex];
    const telefono = telefonoInput.value;
    const telefonoFijo = telefonoFijoInput.value;
    const areaOption = areaSelect.options[areaSelect.selectedIndex];
    const correo = `${usuarioCorreo}@como.com.sv`;

    // Validar que todos los campos estén completos y con valores válidos
    if (!nombre || !apellido || !correo || !sucursalOption.value || !areaOption.value) {
        // Mostrar un Sweet Alert indicando que los campos son obligatorios y deben tener valores válidos
        Swal.fire({
            icon: 'error',
            title: 'Campos obligatorios',
            text: 'Todos los campos deben estar completos y con valores válidos antes de generar la imagen.',
        });
        return; // Detener la ejecución de la función si los campos no están completos o con valores inválidos
    }1

    // Aplicar la clase de fondo borroso al contenedor principal
    const mainContainer = document.querySelector('.container-fluid');
    mainContainer.classList.add('blur-background');

    // Mostrar el spinner de carga mientras se genera la firma
    Swal.fire({
        title: 'Generando Firma...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: () => {
            // Quitar la clase de fondo borroso cuando se cierra Sweet Alert
            mainContainer.classList.remove('blur-background');
        },
    });

    // Obtener la imagen cargada
    const imagenSrc = document.querySelector('.correo-img').src;

    // TODO PARA CAMBIAR EL QR DE Mapeo de sucursales a rutas de imágenes de QR
    const qrMap = {
        'Ahuachapán': 'QR_Ahuchapan.png',
        'San Salvador': 'QR_San_Salvador.png',
        'Santa Ana': 'QR_Santa_Ana.png',
        'Sonsonate': 'QR_Sonsonate.png',
        // ESTE ES EL MISMO PORQUE ES LA MISMA SUCURSAL
        'La Libertad': 'QR_San_Salvador.png',
        // FALTA SOYAPANGO
    };

    // Obtener el contenedor de la firma generada
    const firmaContainer = document.getElementById('firma-generada');
    const tieneTelefono = telefono !== '';
    const telefonoInfo = tieneTelefono ? `
        <li>
            <i class="fa-solid fa-phone email-box-generador  m-2 p-2"></i>
            <span id="text-information-telefono" class="">${formatPhoneNumber(telefono)}</span>
        </li>` : 
        `
        <li>
            <i class="fa-solid fa-phone email-box m-2 p-2 sin-telefono" ></i>
            <span id="text-information-telefono" class="sin-telefono">${formatPhoneNumber(telefono)}</span>
        </li>`;

    const tieneTelefonoFijo = telefonoFijo !== '';
    const telefonoInfoFijo = tieneTelefonoFijo ? `
        <li>
            <i class="fa-solid fa-tty email-box-generador   m-2 p-2"></i>
            <span id="text-information-fijo" class="">${formatPhoneNumber(telefonoFijo)}</span>
        </li>` : 
        `
        <li>
            <i class="fa-solid fa-tty email-box m-2 p-2 sin-telefono"></i>
            <span id="text-information-fijo" class="sin-telefono">${formatPhoneNumber(telefonoFijo)}</span>
        </li>`;


    // Cambiar el QR según la sucursal seleccionada
    const qrUbicacion = document.querySelector('.Qr_Ubicacion-Generada');
    if (sucursalOption.text in qrMap) {
        qrUbicacion.src = `img/Ubicaciones_QR/${qrMap[sucursalOption.text]}`;
        qrUbicacion.style.display = 'block';  // Mostrar el QR
    } else {
        qrUbicacion.style.display = 'none';   // Ocultar el QR para otras sucursales
    }
    // FIN QR

    // Mostrar la firma generada en el contenedor
    firmaContainer.innerHTML = `
        <img src="${imagenSrc}" alt="" srcset="" class="correo-img">

        <div class="container-info-empleado-generado">
            <h1 id="name" class="name mt-2">${nombre} <b class="last-name mt-2">${apellido}</b></h1>
            <h2 id="text-information-area" class="area-generador">${areaOption.text} | Comercialización En Movimiento S.A de C.V</h2>

            <!-- Para información de empleado -->
            <ul class="information-generada mt-3">
                <li>
                    <i class="fas fa-envelope email-box-generador p-2 m-2 "></i>
                    <span id="text-information-email-generada" class="">${correo}</span>
                </li>

                <li>
                    <i class="fa-solid fa-location-pin email-box-generador m-2 p-2  "></i>
                    <span id="text-information-sucursal" class="">Sucursal: ${sucursalOption.text}</span>
                </li>
                
                ${telefonoInfo}
                ${telefonoInfoFijo}
           
            </ul>
            
        </div>
        <div class="Qr_Ubicacion">
                <img src="${qrUbicacion.src}" alt="" id="Qr_Ubicacion_img-generada">
            </div>
    `;

    // Ejemplo con html2canvas:
    html2canvas(firmaContainer).then(canvas => {
        // Convertir el canvas a una imagen
        const imageDataURL = canvas.toDataURL();
        // Guardar la imagen o hacer lo que necesites
        saveImage(imageDataURL, nombre, apellido, sucursalOption.text); // Utiliza sucursalOption.text aquí

        // Cerrar el spinner
        Swal.close();

        // Recargar la página después de un breve retraso (1000 milisegundos = 1 segundo)

        // Recargar la página después de un breve retraso (1000 milisegundos = 1 segundo)
        setTimeout(() => {
            location.reload();
        }, 2000);
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


// TODO: Esta funcion es para que le muestre al usuario que en el input correo solo debe ingresar el nombre de usuario, 
// todo:ya que lo demas del correo se agrega automaticamente
function mostrarMensajeCorreo() {
    const correoInput = document.getElementById('correo');
    const correoValue = correoInput.value.trim();

    // Obtener el contenedor del mensaje
    const mensajeContainer = document.getElementById('mensaje-correo');

    // Verificar si el correo tiene un formato válido (contiene '@')
    if (!correoValue.includes('@')) {
        // Crear un elemento span para mostrar el mensaje
        const mensajeSpan = document.createElement('span');
        mensajeSpan.innerHTML = `
            <strong>Sugerencia: </strong>Por favor, ingrese solo el nombre de usuario en este campo.
        `;
        mensajeSpan.classList.add('text-primary'); // Agregar clases de estilo si es necesario

        // Limpiar el contenedor antes de agregar el nuevo mensaje
        mensajeContainer.innerHTML = '';
        // Agregar el nuevo mensaje al contenedor
        mensajeContainer.appendChild(mensajeSpan);

        // Puedes agregar estilos adicionales al input para indicar que hay un error
        correoInput.classList.add('is-invalid');

        // Eliminar el mensaje después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
            mensajeContainer.innerHTML = '';
            correoInput.classList.remove('is-invalid');
        }, 4000);
    } else {
        // Limpiar el contenedor y quitar clases de estilo de error
        mensajeContainer.innerHTML = '';
        correoInput.classList.remove('is-invalid');
    }
}

