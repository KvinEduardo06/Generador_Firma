// function generateQRCode() {
//   let website = document.getElementById("website").value;
//   if (website) {
//     let qrcodeContainer = document.getElementById("qrcode");
//     qrcodeContainer.innerHTML = "";

//     // Create the QR code with options for error correction and a custom logo
//     let qrcode = new QRCode(qrcodeContainer, {
//       text: website,
//       width: 300, // Adjust width as needed
//       height: 300, // Adjust height as needed
//       colorDark: "#000000",
//       colorLight: "#ffffff",
//       correctLevel: QRCode.CorrectLevel.H, // High error correction
//       logo: document.getElementById("logo").src,
//       logoWidth: 40, // Adjust logo size as needed
//       logoHeight: 40 // Adjust logo size as needed
//     });

//     document.getElementById("qrcode-container").style.display = "block";
//   } else {
//     alert("Please enter a valid URL");
//   }
// }


// // function downloadQRCode() {
// //   let qrcodeContainer = document.getElementById("qrcode-container");
// //   let imageDataURI = qrcodeContainer.querySelector("canvas").toDataURL("image/png");


// //   let link = document.createElement("a");
// //   link.href = imageDataURI;
// //   link.download = "qrcode.png";
// //   document.body.appendChild(link);
// //   link.click();
// //   document.body.removeChild(link);
// // }


// function downloadQRCode() {
//   var sucursal = document.getElementById("sucursal").value;
//   var nombreArchivo = "QR_" + sucursal.replace(/\s/g, "_") + ".png"; // Reemplaza espacios con guiones bajos

//   // Utiliza html2canvas para convertir el contenedor del QR en una imagen
//   html2canvas(document.getElementById("qrcode-container")).then(function (canvas) {
//     var image = canvas.toDataURL("image/png");

//     // Crea un enlace para descargar la imagen con el nombre de archivo generado
//     var link = document.createElement('a');
//     link.href = image;
//     link.download = nombreArchivo;
//     link.click();
//   });
// }
$(document).ready(function () {
  // Cuando se cambia el texto, se genera el código QR
  $('#texto').on('input', function () {
    var texto = $(this).val();
    generarCodigoQR(texto);
  });

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
      });      return;
    }
    guardarQR();
  });

  // Función para guardar el código QR

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

    });
  }
});