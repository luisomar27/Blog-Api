function logout() {
  if (localStorage.getItem('datosuser') == null) {
    //cerrado forzoso
    localStorage.removeItem('datosuser');
    window.location = "login.html";
  } else {
    let token = JSON.parse(localStorage.getItem('datosuser')).token;
    fetch("http://68.183.27.173:8080/logout", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(function (response) {
        localStorage.removeItem('datosuser');
        window.location = "login.html";
      })
      .catch(error =>  window.location = "login.html");

  }
}

function validar_sesion() {

  if (localStorage.getItem("datosuser") == null) {

    logout();

  }else{
    let token = JSON.parse(localStorage.getItem('datosuser')).token;
    wsConnect(token);
  }
}

function mostrar_mensaje(tipo, texto) {
  var mensaje = '';
  if (tipo == 'success') {
    mensaje = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Correcto!</strong> ` + texto + `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;

  } else if (tipo == 'danger') {
    mensaje = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error!</strong> ` + texto + `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;

  }
  return mensaje;
}

function cargar_posts(uid, post_id) {
  let token = JSON.parse(localStorage.getItem('datosuser')).token;

  if (uid != '')
    url = "http://68.183.27.173:8080/post?userId=" + uid;
  else
    url = "http://68.183.27.173:8080/post/" + post_id;

  fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(res => res.json())
    .then(response => {
      if (response.estado && response.estado == 'error') {
        console.log('errordentro');
      } else {
        var post = '';
        if (Array.isArray(response)) {
          response.forEach(function (item) {

            //Fecha
            var fecha = new Date(item.createdAt);
            fecha = fecha.toLocaleDateString();

            //Like
            if (item.liked == true) {
              boton_like = "checked";
            } else {
              boton_like = "";
            }
            let tag = item.tags;
           // if(tag!='')
          //  var res= tag.split(',');
           

            post += `  
                  <!-- primer  post -->
                  <div class="card">
                       <div class="card-body">
                          <div class="row">
                              
  
                              <div class="col-md-12">
                                  <p>
                                    <h5 class="text-primary float-left"><strong>` + item.title + ` </strong></h5>
                                    <footer class="blockquote-footer float-right">Fecha Publicación: <cite title="Source Title">` + fecha + `</cite></footer><br>
                                    <span class="float-right text-primary"><a>Tags: ` + tag + `</a></span>
                                    
                      
                      
                                  </p>
                                  <div class="clearfix"></div>
  
                                  <p>` + item.body.substring(0, 50) + `</p>
                                  <p>
                                 
                                  <a alt="` + item.id + `" id="btn_vermas" class="btn btn-outline-info float-right" href="view_post.html" role="button"><ion-icon name="paper"></ion-icon>Ver Más</a>
                                    <button type="button" class="btn btn-outline-warning float-right">
                                      <ion-icon name="eye"></ion-icon><span id='articulo-view-` + item.id + `'>` + item.views + `</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-primary float-right">
                                      <ion-icon name="thumbs-up"></ion-icon><span id='articulo-like-` + item.id + `'>` + item.likes + `</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-success float-right">
                                      <ion-icon name="chatbubbles"></ion-icon><span id='articulo-comment-` + item.id + `'>` + item.comments + `</span>
                                    </button>
                                  <div style="margin-top:-20px;" class="float-right">
                               <span class="text-danger">   <ion-icon name="heart"></ion-icon>Like</span>
                                    <label class="switch ">
                                    <input ` + boton_like + ` type="checkbox" id="like" value="` + item.id + `">
                                    <span class="slider"></span>
                                </label>
                             
                                </div>
                                   
                                </div>
                                       
                              
                                        <footer class="blockquote-footer float-left"><a id="link_user" alt="` + item.userId + `" class="alert-link" href="view_usuario.html">By: ` + item.userName + `: <cite title="Source Title">` + item.userEmail + `</cite></a></footer><br>
                                 
                                 
                                  </p>
                      
                                </div>
                            </div>
                            
  
                             
                        
                              </div>
                            </div><br>
                                `;

          });
        } else {

          //Fecha
          var fecha = new Date(response.createdAt);
          fecha = fecha.toLocaleDateString();

          //Like
          if (response.liked == true) {
            boton_like = "checked";
          } else {
            boton_like = "";
          }

          post += `  
          <!-- primer  post -->
          <div class="card">
               <div class="card-body">
                  <div class="row">
                      

                      <div class="col-md-12">
                          <p>
                            <h5 class="text-primary float-left"><strong>` + response.title + ` </strong></h5>
                            <footer class="blockquote-footer float-right">Fecha Publicación: <cite title="Source Title">` + fecha + `</cite></footer><br>
                            <span class="float-right text-primary"><a>Tags: Javascript,Programacion,Web</a></span>
                            
              
              
                          </p>
                          <div class="clearfix"></div>

                          <p>` + response.body + `</p>
                          <p>
                         
                          <a alt="` + response.id + `" id="btn_vermas" class="btn btn-outline-info float-right" href="view_post.html" role="button"><ion-icon name="paper"></ion-icon> Ver Más</a>
                            <button type="button" class="btn btn-outline-warning float-right">
                              <ion-icon name="eye"></ion-icon><span id='articulo-view-` + response.id + `'>` + response.views + `</span>
                            </button>
                            <button type="button" class="btn btn-outline-primary float-right">
                              <ion-icon name="thumbs-up"></ion-icon><span id='articulo-like-` + response.id + `'>` + response.likes + `</span>
                            </button>
                            <button type="button" class="btn btn-outline-success float-right">
                              <ion-icon name="chatbubbles"></ion-icon><span id='articulo-comment-` + response.id + `'>` + response.comments + `</span>
                            </button>
                          <div style="margin-top:-20px;" class="float-right">
                       <span class="text-danger">   <ion-icon name="heart"></ion-icon>Like</span>
                            <label class="switch ">
                            <input ` + boton_like + ` type="checkbox" id="like" value="` + response.id + `">
                            <span class="slider"></span>
                        </label>
                     
                        </div>
                           
                        </div>
                               
                      
                                <footer class="blockquote-footer float-left"><a id="link_user" alt="` + response.userId + `" class="alert-link" href="view_usuario.html">By: ` + response.userName + `: <cite title="Source Title">` + response.userEmail + `</cite></a></footer><br>
                         
                         
                          </p>
              
                        </div>
                    </div>
                    

                     
                
                      </div>
                    </div><br>
                        `;
        }

        sc = ` <script> 
               $(document).on('click', '#link_user', function (e) {

                localStorage.setItem("user_sel", $(this).attr("alt"));
                alert($(this).attr("alt"));
              });
            
              $(document).on('click', '#btn_vermas', function (e) {
            
                localStorage.setItem("post_id", $(this).attr("alt"));
              });
            
              $(document).on('click', '#like', function (e) {
                metodo = "";
                if ($(this).prop('checked'))
                  metodo = "PUT";
                else
                  metodo = "DELETE";
            
            
                fetch("http://68.183.27.173:8080/post/" + $(this).val() + "/like", {
                    method: metodo,
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ` + token + `'
                    }
                  }).then(res => res.json())
                  .then(response => {
            
            
            
                  })
            
            
                  .catch(error => console.log(error));
            
            
            
              });</script>`;

        $('#listado').html(`` + post + sc);



      }

    })
    .catch(error => console.log(error));

}
function wsConnect(token) {
  // console.log("WS- connect ", token);
  var websocket = new WebSocket(`ws:68.183.27.173:8080/?token=${token}`);
  websocket.onopen = function (evt) {
      // console.log(evt)
  };
  websocket.onclose = function (evt) {
      // console.log(evt)
  };
  websocket.onerror = function (evt) {
      console.log(evt)
  };

  websocket.onmessage = function (evt) {
      var data = JSON.parse(evt.data);
       console.log(data);
      switch (data.type) {
          case "likes":
              $('#articulo-like-' + data.postId).text(data.likes);
              break;
          case "view-post":
          
              $('#articulo-view-' + data.postId).text(data.views);
              break;
          case "new-comment":
              $("#articulo-comment-"+data.postId).text(data.comments);
          
              break;

      }
  };
}