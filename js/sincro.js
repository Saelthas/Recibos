jQuery(document).ready(function() {
  saludo();
  //alert("alerta");
  var farmacia;
  var detid;
  var vendedorID = $('#codusuario').text();
  console.log('Codug usuario:' + vendedorID);

  function detalle(prodid, factid, cant, precio, desc) {
    this.prodid = prodid;
    this.factid = factid;
    this.cant = cant;
    this.precio = precio;
    this.desc = desc;
  }

  jQuery('#sincro').on('click', function(e) {
    //alert("Registro Adicionado");
    //Obtienes el contexto del canvas, y lees la imagen codificada en Base64:
    //console.log(urlEnvio);

    var credencial = $('#credencial').val();
    var nombre = $('#nombre').val();
    var telefono = $('#telefono').val();
    var hab = 1;

    var datos = {
      //"ajaxEnvio": urlEnvio,
      "credencial": credencial
    };
    uno(datos);
    dos(datos);
    tres(datos);


  });

  function uno(datos) {

    //*****llenado de farmacias en la db*******

    jQuery.ajax({
      url: "http://192.168.128.51/p/b/farmaciasJSON.php",

      //url: "http://192.161.0.20/p/listarSIN.php",
      type: "post",
      data: datos,
      beforeSend: function() {
        $("#resultado").html('<p><strong>Estoy descargando Farmacias</strong></p>');
      },
      success: function(response) {
        farmacia = $.parseJSON(response);
        vaciarFarmacia();
        //for(var i in farmacia)
        var db = window.openDatabase("markdisdb", "1.0", "Cordova Demo", 200000);
        db.transaction(
          function insefarm(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Farmacia (CLIENTEID unique, NIT, CLIENTE, DIRECCION)');
            for (var i = 0; i < (farmacia.length); i++) //for(var i=0;i<(farmacia.length/2);i++)
            {
              tx.executeSql("INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE, DIRECCION) VALUES (?,?,?,?)", [farmacia[i].CLIENTEID, farmacia[i].NIT, farmacia[i].CLIENTE, farmacia[i].DIRECCION]);
              //tx.executeSql('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE, DIRECCION) VALUES ("'+farmacia[i].CLIENTEID+'","'+farmacia[i].NIT+'","'+farmacia[i].CLIENTE+'","'+farmacia[i].DIRECCION+'")');
              console.log('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE, DIRECCION) VALUES ("' + farmacia[i].CLIENTEID + '","' + farmacia[i].NIT + '","' + farmacia[i].CLIENTE + '","' + farmacia[i].DIRECCION + '")');
              //if(i==(farmacia.length/2)-1)
              //alert('primer corte de la base de datos finalizado');

            }
            //tx.executeSql('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE) VALUES ("'+farmacia[i].CLIENTEID+'","'+farmacia[i].NIT+'","'+farmacia[i].CLIENTE+'")');
            //alert(j);
            //alert('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE) VALUES ("'+farmacia[i].CLIENTEID+'","'+farmacia[i].NIT+'","'+farmacia[i].CLIENTE+'")');
          }, errorCB);

        $("#resultado").html('<p><strong></strong></p>');
        $("#log").append('<p><strong>Farmacias descargadas satisfactoriamente</strong></p>');
        //alert(response);
        //alert('Base de datos farmacia completado con exito');
      }
    });
  }

  function dos(datos) {
    //*****llenado de beneficiaros a la db*****
    jQuery.ajax({
      url: "http://192.168.128.51/p/b/beneficiarioJSON.php",

      //url: "http://192.161.0.20/p/listarSIN.php",
      type: "post",
      data: datos,
      beforeSend: function() {
        $("#resultado").html('<p><strong>Estoy descargando Beneficiarios</strong></p>');
      },
      success: function(response) {
        beneficiarios = $.parseJSON(response);
        vaciarbeneficiarios();

        var db = window.openDatabase("markdisdb", "1.0", "Cordova Demo", 200000);
        db.transaction(
          function insefarm(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Beneficiarios (BENEFICIARIOID unique, CLIENTEID, NIT, NOMBRE)');
            for (var i = 0; i < (beneficiarios.length); i++) //for(var i=0;i<(farmacia.length/2);i++)
            {
              tx.executeSql('INSERT INTO Beneficiarios (BENEFICIARIOID, CLIENTEID, NIT, NOMBRE) VALUES ("' + beneficiarios[i].BENEFICIARIOID + '","' + beneficiarios[i].CLIENTEID + '","' + beneficiarios[i].NIT + '","' + beneficiarios[i].NOMBRE + '")');
              //alert('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE) VALUES ("'+farmacia[i].CLIENTEID+'","'+farmacia[i].NIT+'","'+farmacia[i].CLIENTE+'")');
              //if(i==(farmacia.length/2)-1)
              //alert('primer corte de la base de datos finalizado');

            }
            //tx.executeSql('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE) VALUES ("'+farmacia[i].CLIENTEID+'","'+farmacia[i].NIT+'","'+farmacia[i].CLIENTE+'")');
            //alert(j);
            //alert('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE) VALUES ("'+farmacia[i].CLIENTEID+'","'+farmacia[i].NIT+'","'+farmacia[i].CLIENTE+'")');
          }, errorCB);

        $("#resultado").html('<p><strong></strong></p>');
        $("#log").append('<p><strong>Beneficiarios descargados satisfactoriamente</strong></p>');
        //alert(response);
        //alert('Base de datos farmacia completado con exito');



      }
    });
  }

  function tres(datos) {
    //*****llenado de productos a la db*****
    jQuery.ajax({
      url: "http://192.168.128.51/p/b/productoJSON.php",

      //url: "http://192.161.0.20/p/listarSIN.php",
      type: "post",
      data: datos,
      beforeSend: function() {
        $("#resultado").html('<p><strong>Estoy descargando Productos</strong></p>');
      },
      success: function(response) {

        productos = $.parseJSON(response);
        vaciarProductos();

        var db = window.openDatabase("markdisdb", "1.0", "Cordova Demo", 200000);
        db.transaction(
          function insefarm(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Productos (PRODUCTOID unique, NOMBRECOMERCIAL, DETALLES, PRECIOCOMPRA)');
            for (var i = 0; i < (productos.length); i++) //for(var i=0;i<(farmacia.length/2);i++)
            {
              tx.executeSql('INSERT INTO Productos (PRODUCTOID, NOMBRECOMERCIAL, DETALLES, PRECIOCOMPRA) VALUES ("' + productos[i].PRODUCTOID + '","' + productos[i].NOMBRECOMERCIAL + '","' + productos[i].DETALLES + '","' + productos[i].PRECIOCOMPRA + '")');
              //alert('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE) VALUES ("'+farmacia[i].CLIENTEID+'","'+farmacia[i].NIT+'","'+farmacia[i].CLIENTE+'")');
              //if(i==(farmacia.length/2)-1)
              //alert('primer corte de la base de datos finalizado');

            }
            //tx.executeSql('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE) VALUES ("'+farmacia[i].CLIENTEID+'","'+farmacia[i].NIT+'","'+farmacia[i].CLIENTE+'")');
            //alert(j);
            //alert('INSERT INTO Farmacia (CLIENTEID, NIT, CLIENTE) VALUES ("'+farmacia[i].CLIENTEID+'","'+farmacia[i].NIT+'","'+farmacia[i].CLIENTE+'")');
          }, errorCB);

        $("#resultado").html('<p><strong></strong></p>');
        $("#log").append('<p><strong>Productos descargados satisfactoriamente</strong></p>');
        //alert(response);
        //alert('Base de datos farmacia completado con exito');                       

      }
    });
  }
  //subida de datos a la DB
  jQuery("#subir").on('click', function(e) {
    $.blockUI({
      message: "<h2>Espere mientras subimos los nuevos pedidos al sistema.</h2>"
    });
    var db = window.openDatabase("markdisdb", "1.0", "Cordova Demo", 200000);
    //verificamos la cantidad de productos solicitados a la base de datos.
    db.transaction(
      function extFact(tx) {
        tx.executeSql('SELECT * FROM Factura WHERE Factura.SUBIDO=0', [], listFac, errorCB);
      }, errorCB);
    db.transaction(
      function subFact(tx) {
        tx.executeSql('SELECT * FROM Factura WHERE Factura.SUBIDO=0', [], subpeds, errorCB);
      }, errorCB)

    function listFac(tx, results) {
      var len = results.rows.length;

      console.log("Facturas tabla: " + len + " rows found.");
      //


      var db = window.openDatabase("markdisdb", "1.0", "Cordova Demo", 200000);
      db.transaction(
        function extDet(tx) {
          for (var i = 0; i < len; i++) {
            detid = results.rows.item(i).FACTURAID;
            var sql = "select Detalle.PRODUCTOID, Detalle.FACTURAID, Detalle.CANTIDAD, Detalle.PRECIO, Detalle.DESCUENTO from Factura inner join Detalle on Factura.FACTURAID=Detalle.FACTURAID and Factura.FACTURAID=" + detid; //detid;
            console.log('consulta: ' + sql);
            tx.executeSql(sql, [],
              function listDet(tx, results) {
                var len = results.rows.length;

                console.log("Detalle tabla: " + len + " rows found.");
                var costot = 0;
                var costocd = 0;
                var desc = 0;
                var sumdesc = 0;
                //verificamos si exsiste la cantidad de productos solicitada.
                for (var i = 0; i < len; i++) {
                  //

                  console.log("Row = " + i + " PRODUCTOID = " + results.rows.item(i).PRODUCTOID + " FACTURAID =  " + results.rows.item(i).FACTURAID + " CANTIDAD =  " + results.rows.item(i).CANTIDAD + " PRECIO =  " + results.rows.item(i).PRECIO + " DESCUENTO =  " + results.rows.item(i).DESCUENTO);

                  var cant = results.rows.item(i).CANTIDAD;
                  var prodjson = results.rows.item(i).PRODUCTOID;
                  var factjson = results.rows.item(i).FACTURAID;

                  jQuery.ajax({
                    url: 'http://192.168.128.51/p/b/verificador.php',
                    type: "post",
                    data: {
                      "prod": prodjson
                    },
                    async: false,

                    beforeSend: function() {
                      console.log('enviado');


                    },
                    success: function(response) {
                      //console.log('hay: '+response+' unidades del producto '+prodjson);
                      var resp = parseInt(response);
                      //console.log("Respueta"+ resp);


                      if (cant > resp) {
                        $.unblockUI();
                        console.log('No existe la cantidad solicitada');
                        console.log('Solo existen : ' + response + ' unidades del producto ' + prodjson + ", de los: " + cant + " que requiere");
                        var conf = confirm("Solo existen : " + response + " unidades del producto " + prodjson + ", de los: " + cant + " que requiere \nDesea modificar el producto a la cantidad existente?");
                        if (conf == true) {
                          alert('aceptaste hacer la factura con lo existente');
                          db.transaction(function temporal(tx) {
                            tx.executeSql("update Detalle set CANTIDAD='" + resp + "' WHERE PRODUCTOID='" + prodjson + "'and FACTURAID=" + factjson + "");
                          }, errorCB);

                        } else {
                          alert('Eliminaste el poducto');
                          db.transaction(function temporal(tx) {
                            tx.executeSql("delete from Detalle  WHERE PRODUCTOID='" + prodjson + "'and FACTURAID=" + factjson + "");
                          }, errorCB);
                        }
                      }

                    }
                  });
                  costot = costot + (results.rows.item(i).PRECIO * results.rows.item(i).CANTIDAD);
                  desc = ((results.rows.item(i).PRECIO * results.rows.item(i).CANTIDAD * results.rows.item(i).DESCUENTO));
                  console.log('Descuento de la factura: ' + desc);
                  sumdesc = sumdesc + desc;


                  $.unblockUI();



                }
                console.log('Precio de la factura: ' + costot);
                if (sumdesc != 0)
                  costocd = costot - sumdesc;
                console.log('Descuento de la factura: ' + costocd);

                console.log('----------------------------------');
              }, errorCB);


          }

        }, errorCB);


    }

    function subpeds(tx, results) {
      var len = results.rows.length;



      console.log("Facturas tabla: " + len + " rows found.");
      if (len == 0) {
        $.unblockUI();
        alert("no hay pedidos nuevos que sincronizar");
      };
      //


      var db = window.openDatabase("markdisdb", "1.0", "Cordova Demo", 200000);
      db.transaction(
        function extDet(tx) {
          for (var i = 0; i < len; i++) {
            //necesario para generar el codigo de control

            console.log("detid = " + detid + "");
            var MONTOFACT;
            var MONTOREAL;
            //datos para factura



            var sql = "select Factura.NIT,Detalle.PRODUCTOID, Detalle.FACTURAID, Detalle.CANTIDAD, Detalle.PRECIO, Detalle.DESCUENTO from Factura inner join Detalle on Factura.FACTURAID=Detalle.FACTURAID and Factura.FACTURAID=" + detid; //detid;
            console.log('consulta: ' + sql);


            tx.executeSql("select Factura.FACTURAID,Factura.NIT,Factura.CLIENTEID,Factura.VENDEDORID,Factura.BENEFICIARIOID,Detalle.PRODUCTOID, Detalle.FACTURAID, Detalle.CANTIDAD, Detalle.PRECIO, Detalle.DESCUENTO from Factura inner join Detalle on Factura.FACTURAID=Detalle.FACTURAID and Factura.FACTURAID=" + results.rows.item(i).FACTURAID, [],
              function listDet(tx, results2) {
                var len = results2.rows.length;


                else {


                  //console.log("Detalle tabla: " + len + " rows found.");
                  var listaDetalle = [];
                  var costot = 0;
                  var costocd = 0;
                  var desc = 0;
                  var sumdesc = 0;
                  var facturaNIT = 0;
                  var detid = results2.rows.item(i).FACTURAID;
                  var FACTnit = String(results2.rows.item(i).NIT);
                  var FACTcliID = results2.rows.item(i).CLIENTEID;
                  var FACTvendID = results2.rows.item(i).VENDEDORID;
                  var FACTbenefID = results2.rows.item(i).BENEFICIARIOID;
                  //verificamos si exsiste la cantidad de productos solicitada.
                  for (var i = 0; i < len; i++) {
                    //
                    //alert("Row = " + i + " PRODUCTOID = " + results2.rows.item(i).PRODUCTOID + " FACTURAID =  " + results2.rows.item(i).FACTURAID+ " CANTIDAD =  " + results2.rows.item(i).CANTIDAD+ " PRECIO =  " + results2.rows.item(i).PRECIO+ " DESCUENTO =  " + results2.rows.item(i).DESCUENTO);
                    console.log("Row = " + i + " PRODUCTOID = " + results2.rows.item(i).PRODUCTOID + " FACTURAID =  " + results2.rows.item(i).FACTURAID + " CANTIDAD =  " + results2.rows.item(i).CANTIDAD + " PRECIO =  " + results2.rows.item(i).PRECIO + " DESCUENTO =  " + results2.rows.item(i).DESCUENTO);

                    var cant = results2.rows.item(i).CANTIDAD;
                    var prodjson = results2.rows.item(i).PRODUCTOID;
                    var factjson = results2.rows.item(i).FACTURAID;
                    facturaNIT = results2.rows.item(i).NIT;


                    costot = costot + (results2.rows.item(i).PRECIO * results2.rows.item(i).CANTIDAD);
                    desc = ((results2.rows.item(i).PRECIO * results2.rows.item(i).CANTIDAD * results2.rows.item(i).DESCUENTO));
                    console.log('Descuento de la factura: ' + desc);
                    sumdesc = sumdesc + desc;
                    var det = new detalle(results2.rows.item(i).PRODUCTOID, results2.rows.item(i).FACTURAID, results2.rows.item(i).CANTIDAD, results2.rows.item(i).PRECIO, results2.rows.item(i).DESCUENTO);
                    listaDetalle.push(det);



                    $.unblockUI();



                  }
                  var detalleJson = JSON.stringify(listaDetalle);
                  console.log("detalle " + JSON.parse(detalleJson));
                  console.log('Precio de la factura: ' + costot);
                  if (sumdesc != 0) {
                    costocd = costot - sumdesc;
                  } else
                    costocd = costot;
                  console.log('Descuento de la factura: ' + costocd);
                  MONTOFACT = costot - sumdesc;
                  MONTOREAL = costot;



                  //console.log("Monto"+datos.montoAFact);
                  console.log('----------------------------------');
                  datos = {
                    "nit": FACTnit,
                    "montoAFact": MONTOFACT
                  };
                  alert("Nit: " + datos.nit + "\nMonto: " + datos.montoAFact);

                  jQuery.ajax({
                    url: 'http://192.168.128.51/p/b/gCodSeg.php',
                    type: "post",
                    data: datos,
                    async: false,

                    beforeSend: function() {
                      console.log('enviado para el codigo de seguridad');


                    },
                    success: function(response) {
                      //console.log('hay: '+response+' unidades del producto '+prodjson);
                      //var resp= parseInt(response);
                      var codSeg = response;
                      alert(codSeg);
                      vendedorID = document.getElementById('codusuario').innerHTML;
                      console.log(vendedorID);

                      datosFact = {
                        "nit": FACTnit,
                        "codSeg": codSeg,
                        "cliID": FACTcliID,
                        "venID": vendedorID,
                        "benefID": FACTbenefID,


                        "montoAFact": MONTOFACT,
                        "montoAFactreal": MONTOREAL
                      };
                      console.log("CodigoSeguridad " + datosFact.nit + ", " + datosFact.codSeg + ", " + datosFact.cliID + ", " + datosFact.venID + ", " + datosFact.benefID + ", " + datosFact.montoAFact + ", " + datosFact.montoAFactreal + "");
                      //enviamos para q se cree la factura
                      jQuery.ajax({
                        url: 'http://192.168.128.51/p/sincro.php',
                        type: "post",
                        data: datosFact,
                        async: false,

                        beforeSend: function() {
                          console.log('enviado');
                        },
                        success: function(response2) {
                          //console.log('codigo: '+cod);
                          //var resp= parseInt(response);

                          alert(response2);
                          var idfactinser = response2;
                          console.log(detalleJson);
                          db.transaction(function temporal(tx) {
                            tx.executeSql("update Factura set SUBIDO=1 where FACTURAID=" + detid + "");
                            console.log("update Factura set SUBIDO=1 where FACTURAID=" + detid + "");
                          }, errorCB);
                          //subimos los detalles de la factura
                          $.post('http://192.168.128.51/p/b/detalle.php', {
                            detalle: detalleJson,
                            idfactinser: idfactinser
                          }, function(respuesta) {
                            /*optional stuff to do after success */
                            alert(respuesta);

                          }).error(function() {
                            /* Act on the event */
                            alert("no se ejecuto la peticion");
                          });

                        }
                      });


                    }
                  });
                }
              }, errorCB);
            //generamos codigo de control 


          }

        }, errorCB);
    }



  });


});