// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#usuarios').DataTable();
  cargarEmailUsuario();
});

function cargarEmailUsuario(){
  let email = localStorage.email;
  document.getElementById('txt-email-usuario').outerHTML = email == "undefined" ? 'Invitado': email;
}

function getHeaders(){
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}

function cerrarSesion(){
  localStorage.clear();
  window.location.href = "/";
}

async function cargarUsuarios(){
    const request = await fetch('api/usuarios', {
      method: 'GET',
      headers: getHeaders()
    });
    const usuarios = await request.json();
  
    console.log(usuarios);

    let listadoHTML = '';
    
    for (let usuario of usuarios) {
      let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
      let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono;
      let usuarioHTML = '<tr><td>'+usuario.id+'</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>'
                    + usuario.email+'</td><td>'+telefonoTexto
                    + '</td><td>' + botonEliminar + '</td></tr>';
      listadoHTML += usuarioHTML;
    }

    document.querySelector('#usuarios tbody').outerHTML = listadoHTML;
}

async function eliminarUsuario(id){

  let resp = await Swal.fire({
    title: "¿Estás seguro que desea eliminar el usuario?",
    text: "Esta operación es irreversible",
    icon: "warning",
    showCancelButton: true
  });

  if(!resp.isConfirmed){
    return;
  }

  const request = await fetch('api/usuarios/'+id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  location.reload();
}