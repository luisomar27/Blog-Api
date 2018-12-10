$(document).ready(function () {
    validar_sesion();
    var id = localStorage.getItem('post_id');
    cargar_posts("", id);
    cargar_comentarios(id);
  


   

    $('#btncomentar').click(function(e){
        var body=$('#comment').val();
        var data = {         
           'body':body,
        };
        let token = JSON.parse(localStorage.getItem('datosuser')).token;
        var post_id = localStorage.getItem('post_id');

        url = "http://68.183.27.173:8080/post/" + post_id + "/comment";
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
                'Authorization' : 'Bearer '+token
            }
          }).then(function(response){
            $('#msg').html(mostrar_mensaje('success', 'Se ha publicado el comentario correctamente.'));
            cargar_comentarios(post_id);$('#comment').val('');

          })
          .catch(error =>   $('#msg').html(mostrar_mensaje('danger', 'Error Creando el comentario')));
    });


});

function cargar_comentarios(post_id) {
    url = "http://68.183.27.173:8080/post/" + post_id + "/comment";

    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer bdce2be1-ff37-45e1-ab60-1cd67c2c1e41'
            }
        }).then(res => res.json())
        .then(response => {
            if (response == null) {

            } else {
                comentario = ` 
              `;

                if (Array.isArray(response)) {
                    response.forEach(function (item) {

                        //Fecha
            var fecha = new Date(item.createdAt);
            fecha = fecha.toLocaleDateString();

                        comentario += `  <!-- panel de comentario usuario -->
                                                <div class="card border-light mb-3">
                                                <div class="card-header">
                                                    <ion-icon name="person"></ion-icon> `+item.userName+` (`+item.userEmail+`) <span class="float-right">`+fecha+`</span>
                                                </div>
                                                <div class="card-body">
                                                    <blockquote>
                                                    <p>`+item.body+`</p>

                                                    </blockquote>
                                                </div>
                                                </div>
                                         <!-- fin panel de comentario usuario -->`;
                    });

                 
                }

                $('#comentarios').html(comentario);
            }

        })
        .catch(error => console.log(error));


}

