$(document).ready(function () {

  // Variable de estado para verificar si se está generando el código QR
  var generandoQR = false;

  // Cuando se cambia el texto, se genera el código QR
  $('#texto').on('input', function () {
    // Verificar si se está generando el código QR
    if (generandoQR) {
      // Si se está generando, no permitir cambios en el input
      $(this).val($(this).data('last-value')); // Restaurar el valor anterior
      return;
    }

    var texto = $(this).val();
    if (texto.trim() === '') {
      // Limpiar el código QR si el texto está vacío
      limpiarCodigoQR();
    } else {
      // Generar el código QR solo si hay texto
      generarCodigoQR(texto);
    }
  });


  // Botón para limpiar el input y el código QR
  $('#limpiar-input').click(function () {
    $('#texto').val(''); // Limpiar el contenido del input
    limpiarCodigoQR(); // Limpiar el código QR
  });

  // ... (tu código existente)

  function limpiarCodigoQR() {
    $('#codigo-qr').hide(); // Ocultar el contenedor del código QR
    $('#codigo-qr').empty(); // Vaciar el contenido del código QR
  }
  

  // Función para generar el código QR con logo
  function generarCodigoQR(texto) {
    // Mostrar contenedor de carga
    $('#loading-container').show();

    // Opciones para el código QR
    var opcionesQR = {
      text: texto,
      width: 350,
      height: 350
    };

    // Crear el código QR
    var qrCode = new QRCode(document.getElementById('codigo-qr'), opcionesQR);

    // Crear un nuevo elemento de imagen que contiene el código QR y el logo
    var img = new Image();
    img.src = 'IMG/Logo_QR.png'; // Ruta al logo
    img.onload = function () {
      // Dibujar el código QR en el lienzo
      var canvas = document.createElement('canvas');
      canvas.width = opcionesQR.width;
      canvas.height = opcionesQR.height;
      var context = canvas.getContext('2d');
      context.drawImage(qrCode._el.firstChild, 0, 0, opcionesQR.width, opcionesQR.height);

      // Dibujar el logo en el centro del código QR
      var logoSize = 0.3; // Ajusta el tamaño del logo en relación con el código QR
      var logoWidth = opcionesQR.width * logoSize;
      var logoHeight = opcionesQR.height * logoSize;
      context.drawImage(img, (opcionesQR.width - logoWidth) / 2, (opcionesQR.height - logoHeight) / 2, logoWidth, logoHeight);

      // Actualizar el contenido del elemento HTML
      qrCode._el.innerHTML = '';
      qrCode._el.appendChild(canvas);

      // Ocultar contenedor de carga después de cargar el QR y el logo
      $('#loading-container').hide();
      $('#codigo-qr').show(); // Mostrar el contenedor del código QR
    };
  }

  // Botón para guardar el código QR
  $('#guardar-qr').click(function () {
    // Obtener el texto ingresado por el usuario
    var texto = $('#texto').val().trim();

    // Verificar si el texto está vacío
    if (texto === '') {
      Swal.fire({
        title: "Ups!",
        text: "Debes ingresar una ruta valida para generar QR",
        icon: "error"
      }); return;
    }
    guardarQR();
  });


  // Función para guardar el código QR
  function guardarQR() {
    // Mostrar contenedor de carga
    $('#loading-container').show();

    html2canvas(document.getElementById('codigo-qr')).then(function (canvas) {
      var imgData = canvas.toDataURL('image/png');
      var a = document.createElement('a');
      a.href = imgData;
      a.download = 'codigo_qr.png';
      a.click();

      // Limpiar el contenido después de guardar el QR
      $('#codigo-qr').html('');
      $('#loading-container').hide();
      $('#texto').val(''); // Limpia el contenido del input de texto

      // Restablecer la variable de estado después de completar la generación
      generandoQR = false;
    });
  }
});