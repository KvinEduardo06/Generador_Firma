function generateQRCode() {
  let website = document.getElementById("website").value;
  if (website) {
    let qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";

    // Create the QR code with options for error correction and a custom logo
    let qrcode = new QRCode(qrcodeContainer, {
      text: website,
      width: 300, // Adjust width as needed
      height: 300, // Adjust height as needed
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H, // High error correction
      logo: document.getElementById("logo").src,
      logoWidth: 40, // Adjust logo size as needed
      logoHeight: 40 // Adjust logo size as needed
    });

    document.getElementById("qrcode-container").style.display = "block";
  } else {
    alert("Please enter a valid URL");
  }
}


// function downloadQRCode() {
//   let qrcodeContainer = document.getElementById("qrcode-container");
//   let imageDataURI = qrcodeContainer.querySelector("canvas").toDataURL("image/png");


//   let link = document.createElement("a");
//   link.href = imageDataURI;
//   link.download = "qrcode.png";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }


function downloadQRCode() {
  var sucursal = document.getElementById("sucursal").value;
  var nombreArchivo = "QR_" + sucursal.replace(/\s/g, "_") + ".png"; // Reemplaza espacios con guiones bajos

  // Utiliza html2canvas para convertir el contenedor del QR en una imagen
  html2canvas(document.getElementById("qrcode-container")).then(function (canvas) {
    var image = canvas.toDataURL("image/png");

    // Crea un enlace para descargar la imagen con el nombre de archivo generado
    var link = document.createElement('a');
    link.href = image;
    link.download = nombreArchivo;
    link.click();
  });
}
