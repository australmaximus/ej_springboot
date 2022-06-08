// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
  });
  
  async function iniciarSesion(){
      let datos = {};
      datos.email = document.getElementById('txtEmail').value;
      datos.password = document.getElementById('txtPassword').value;

      const request = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      const respuesta = await request.text();

      if(respuesta != "FAIL"){
        localStorage.email = datos.email;
        localStorage.token = respuesta;
        window.location.href = "usuarios.html";
      }else{
          Swal.fire("Error","Las credenciales son incorrectas", "error");
      }

  }
  