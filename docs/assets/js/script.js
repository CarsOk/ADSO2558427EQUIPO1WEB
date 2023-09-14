  function CancelEnter() {
      var key = event.keyCode;
      if (key === 13) {
          event.preventDefault();
      }
  }
  $("textarea[maxlength]").on("propertychange input", function() {
      if (this.value.length > this.maxlength) {
          this.value = this.value.substring(0, this.maxlength);
      }
  });

  function AsignaValoresDecimales(campo) {
      $("#" + campo).on({
          "focus": function(event) {
              $(event.target).select();
          },
          "keyup": function(event) {
              $(event.target).val(function(index, value) {
                  return value.replace(/\D/g, "").replace(/([0-9])([0-9]{2})$/, '$1.$2').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
              });
          }
      });
  }

  function Message(title, text, icon) {
      swal({
          title: title,
          text: text,
          icon: icon,
          buttons: {
              cancel: {
                  text: 'Cerrar',
                  value: true,
                  visible: true,
                  className: 'btn btn-primary',
                  closeModal: true
              }
          }
      });
  }

  function OnlyNumber(div) {
      $("#" + div).on("input", function(evt) {
          var self = $(this);
          self.val(self.val().replace(/\D/g, ""));
          if ((evt.which < 48 || evt.which > 57)) {
              evt.preventDefault();
          }
      });
  }

  function CalculaDV(nit) {
      if (nit == '') return false;
      $.ajax({
          type: "POST",
          url: "configuracion/empresas/calcula_dv.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "nit=" + nit,
          success: function(msg) {
              $("#EMPRESAS_dv").val(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function MunicipioCargado(IdDepartamento, municipio, id_campo) {
      $.ajax({
          type: "POST",
          url: "llenarComboMpo.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "IdDepartamento=" + IdDepartamento,
          success: function(msg) {
              $("#" + id_campo).html(msg);
              //$('#' + id_campo + ' option[value=' + municipio + ']').attr('selected', true);
              $("#" + id_campo).val(municipio).trigger('change');
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function buscarMunicipio(IdDepartamento, id_campo) {
      $.ajax({
          type: "POST",
          url: "llenarComboMpo.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "IdDepartamento=" + IdDepartamento,
          success: function(msg) {
              $("#" + id_campo).html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }
  //tipo gestion
  function TIPO_GESTION_Save() {
      var id_tipo_gestion = $("#id_tipo_gestion").val();
      var TIPO_GESTION_Detalle = $("#TIPO_GESTION_Detalle").val();
      if (TIPO_GESTION_Detalle == '') {
          Message("Digite el tipo de gestión", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/tipo_gestion/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "TIPO_GESTION_Detalle=" + TIPO_GESTION_Detalle + "&id_tipo_gestion=" + id_tipo_gestion,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  TIPO_GESTION_Clear();
              }
              TIPO_GESTION_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function TIPO_GESTION_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/tipo_gestion/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function TIPO_GESTION_Eliminar(id_tipo_gestion) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/tipo_gestion/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_tipo_gestion=" + id_tipo_gestion,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un tipo de gestión asociada a una obligación.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              TIPO_GESTION_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function TIPO_GESTION_Editar(id_tipo_gestion, detalle) {
      $("#id_tipo_gestion").val(id_tipo_gestion);
      $("#TIPO_GESTION_Detalle").val(detalle);
      $("#TIPO_GESTION_Detalle").focus();
  }

  function TIPO_GESTION_Clear() {
      $("#id_tipo_gestion").val('');
      $("#TIPO_GESTION_Detalle").val('');
  }
  //TIPO DE COMUNICACION
  function TIPO_COMUNICACION_Save() {
      var id_tipo_comunicacion = $("#id_tipo_comunicacion").val();
      var TIPO_COMUNICACION_Detalle = $("#TIPO_COMUNICACION_Detalle").val();
      if (TIPO_COMUNICACION_Detalle == '') {
          Message("Digite el tipo de comunicación", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/tipo_comunicacion/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "TIPO_COMUNICACION_Detalle=" + TIPO_COMUNICACION_Detalle + "&id_tipo_comunicacion=" + id_tipo_comunicacion,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  TIPO_COMUNICACION_Clear();
              }
              TIPO_COMUNICACION_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function TIPO_COMUNICACION_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/tipo_comunicacion/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function TIPO_COMUNICACION_Eliminar(id_tipo_comunicacion) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/tipo_comunicacion/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_tipo_comunicacion=" + id_tipo_comunicacion,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un tipo de comunicación asociada a una obligación.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              TIPO_COMUNICACION_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function TIPO_COMUNICACION_Editar(id_tipo_comunicacion, TIPO_COMUNICACION_Detalle) {
      $("#id_tipo_comunicacion").val(id_tipo_comunicacion);
      $("#TIPO_COMUNICACION_Detalle").val(TIPO_COMUNICACION_Detalle);
      $("#TIPO_COMUNICACION_Detalle").focus();
  }

  function TIPO_COMUNICACION_Clear() {
      $("#id_tipo_comunicacion").val('');
      $("#TIPO_COMUNICACION_Detalle").val('');
  }
  //PERFILES
  function PERFILES_Save() {
      var id_perfil = $("#id_perfil").val();
      var PERFILES_Detalle = $("#PERFILES_Detalle").val();
      if (PERFILES_Detalle == '') {
          Message("Digite el perfil", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/perfiles/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "PERFILES_Detalle=" + PERFILES_Detalle + "&id_perfil=" + id_perfil,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  PERFILES_Clear();
              }
              PERFILES_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function PERFILES_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/perfiles/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function PERFILES_Eliminar(id_perfil) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/perfiles/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_perfil=" + id_perfil,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un perfil asociado a un usuario.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              PERFILES_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function PERFILES_Editar(id_perfil, PERFILES_Detalle) {
      $("#id_perfil").val(id_perfil);
      $("#PERFILES_Detalle").val(PERFILES_Detalle);
      $("#PERFILES_Detalle").focus();
  }

  function PERFILES_Clear() {
      $("#id_perfil").val('');
      $("#PERFILES_Detalle").val('');
  }
  //usuarios
  function USUARIOS_Save() {
      var id_usuario = $("#id_usuario").val()
      var USUARIOS_primerNombre = $("#USUARIOS_primerNombre").val()
      var USUARIOS_segundo_nombre = $("#USUARIOS_segundo_nombre").val()
      var USUARIOS_primer_apellido = $("#USUARIOS_primer_apellido").val()
      var USUARIOS_segundo_apellido = $("#USUARIOS_segundo_apellido").val()
      var USUARIOS_pass = $("#USUARIOS_pass").val()
      var USUARIOS_confirmacion_pass = $("#USUARIOS_confirmacion_pass").val()
      var USUARIOS_email = $("#USUARIOS_email").val()
      var USUARIOS_idAliado = $("#USUARIOS_idAliado").val()
      var USUARIOS_Documento = $("#USUARIOS_Documento").val()
      var USUARIOS_Programa_academico = $("#USUARIOS_Programa_academico").val()
      var USUARIOS_horas_trabajo = $("#USUARIOS_horas_trabajo").val()
      var USUARIOS_porcentaje_descanso = $("#USUARIOS_porcentaje_descanso").val()
      var USUARIOS_total_descanso = $("#USUARIOS_total_descanso").val()
      var USUARIOS_Extension = $("#USUARIOS_Extension").val()
      if (USUARIOS_Documento == '') {
          Message("Digite el documento", "", "warning")
          return false;
      }
      if (USUARIOS_primerNombre == '') {
          Message("Digite el primer nombre", "", "warning")
          return false;
      }
      if (USUARIOS_primer_apellido == '') {
          Message("Digite el primer apellido", "", "warning")
          return false;
      }
      if (USUARIOS_horas_trabajo == '') {
          Message("Digite las horas de trabajo", "", "warning")
          return false;
      }
      if (USUARIOS_porcentaje_descanso == '') {
          Message("Digite el porcentaje de descanso", "", "warning")
          return false;
      }
      if (id_usuario == '') {
          if (USUARIOS_pass == '') {
              Message("Digite contraseña", "", "warning")
              return false;
          }
          if (USUARIOS_confirmacion_pass == '') {
              Message("Digite contraseña de confirmación", "", "warning")
              return false;
          }
          if (USUARIOS_pass != USUARIOS_confirmacion_pass) {
              Message("Las contraseñas no coinciden", "", "warning")
              return false;
          }
          if (USUARIOS_pass.length < 4) {
              Message("La contraseña debe tener mínimo 4 carácteres", "", "warning")
              return false;
          }
          if (USUARIOS_confirmacion_pass.length < 4) {
              Message("La contraseña debe tener mínimo 4 carácteres", "", "warning")
              return false;
          }
      }
      if (USUARIOS_email == '') {
          Message("Digite el email", "", "warning")
          return false;
      }
      if (USUARIOS_idAliado == '') {
          Message("Seleccione el aliado al que pertenece el usuario", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/usuarios/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "id_usuario=" + id_usuario + "&USUARIOS_primerNombre=" + USUARIOS_primerNombre + "&USUARIOS_segundo_nombre=" + USUARIOS_segundo_nombre + "&USUARIOS_primer_apellido=" + USUARIOS_primer_apellido + "&USUARIOS_segundo_apellido=" + USUARIOS_segundo_apellido + "&USUARIOS_pass=" + USUARIOS_pass + "&USUARIOS_confirmacion_pass=" + USUARIOS_confirmacion_pass + "&USUARIOS_email=" + USUARIOS_email + "&USUARIOS_idAliado=" + USUARIOS_idAliado + "&USUARIOS_Documento=" + USUARIOS_Documento + "&USUARIOS_Programa_academico=" + USUARIOS_Programa_academico + "&USUARIOS_horas_trabajo=" + USUARIOS_horas_trabajo + "&USUARIOS_porcentaje_descanso=" + USUARIOS_porcentaje_descanso + "&USUARIOS_total_descanso=" + USUARIOS_total_descanso + "&USUARIOS_Extension=" + USUARIOS_Extension,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  if (msg == 'existe') {
                      Message("El correo " + USUARIOS_email + " se encuentra registrado en el sistema. Verifique.", "", "warning")
                  } else {
                      if (msg == 'existe_cedula') {
                          Message("El documento " + USUARIOS_Documento + " se encuentra registrado en el sistema. Verifique.", "", "warning")
                      } else { //
                          if (msg == 'existe_extension') {
                              Message("La extensión " + USUARIOS_Extension + " se encuentra registrada en el sistema. Verifique.", "", "warning")
                          } else {
                              Message("Información procesada correctamente", "", "success")
                              USUARIOS_Clear();
                          }
                      }
                  }
              }
              USUARIOS_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function USUARIOS_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/usuarios/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function USUARIOS_Eliminar(id_usuario) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/usuarios/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_usuario=" + id_usuario,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un usuario con perfil asignado.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              USUARIOS_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function USUARIOS_Editar(id_usuario, USUARIOS_primerNombre, USUARIOS_segundo_nombre, USUARIOS_primer_apellido, USUARIOS_segundo_apellido, USUARIOS_email, USUARIOS_idAliado, USUARIOS_Documento, USUARIOS_Programa_academico, USUARIOS_horas_trabajo, USUARIOS_porcentaje_descanso, USUARIOS_total_descanso, USUARIOS_Extension) {
      $("#id_usuario").val(id_usuario)
      $("#USUARIOS_primerNombre").val(USUARIOS_primerNombre)
      $("#USUARIOS_segundo_nombre").val(USUARIOS_segundo_nombre)
      $("#USUARIOS_primer_apellido").val(USUARIOS_primer_apellido)
      $("#USUARIOS_segundo_apellido").val(USUARIOS_segundo_apellido)
      $("#USUARIOS_email").val(USUARIOS_email)
      $("#USUARIOS_idAliado").val(USUARIOS_idAliado).trigger('change')
      $("#USUARIOS_Documento").focus();
      $("#USUARIOS_Documento").val(USUARIOS_Documento)
      $("#USUARIOS_Programa_academico").val(USUARIOS_Programa_academico)
      $("#USUARIOS_horas_trabajo").val(USUARIOS_horas_trabajo)
      $("#USUARIOS_porcentaje_descanso").val(USUARIOS_porcentaje_descanso)
      $("#USUARIOS_total_descanso").val(USUARIOS_total_descanso)
      $("#USUARIOS_Extension").val(USUARIOS_Extension)
  }

  function USUARIOS_Clear() {
      $("#id_usuario").val('')
      $("#USUARIOS_primerNombre").val('')
      $("#USUARIOS_segundo_nombre").val('')
      $("#USUARIOS_primer_apellido").val('')
      $("#USUARIOS_segundo_apellido").val('')
      $("#USUARIOS_pass").val('')
      $("#USUARIOS_confirmacion_pass").val('')
      $("#USUARIOS_email").val('')
      $("#USUARIOS_Documento").val('');
      $("#USUARIOS_horas_trabajo").val('');
      $("#USUARIOS_porcentaje_descanso").val('');
      $("#USUARIOS_total_descanso").val('');
      $("#USUARIOS_Extension").val('');
      $("#USUARIOS_Programa_academico").val('')
      $("#USUARIOS_idAliado").val('').trigger('change')
  }

  function USUARIOS_CalculaTiempoDescanso(USUARIOS_horas_trabajo, USUARIOS_porcentaje_descanso) {
      $.ajax({
          type: "POST",
          url: "configuracion/usuarios/calcula_tiempo_descanso.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "USUARIOS_porcentaje_descanso=" + USUARIOS_porcentaje_descanso + "&USUARIOS_horas_trabajo=" + USUARIOS_horas_trabajo,
          success: function(msg) {
              $("#USUARIOS_total_descanso").val(msg)
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });
  }
  //opcion por perfil
  function changeProfile(id) {
      var perfil = id;
      if (perfil == '') {
          limpiarCheck(false);
          deshabilitaCheck(true);
          $("#selecciones_perfil").hide();
          $("#div_GuardarCancelar").hide();
          return false;
      }
      $("#selecciones_perfil").show();
      $("#div_GuardarCancelar").show();
      limpiarCheck(false);
      $("#rpta_perfiles").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/opcion_perfil/consulta_perfil_usuario.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "perfil=" + perfil,
          success: function(msg) {
              $("#rpta_perfiles").html(msg);
              deshabilitaCheck(false);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });
  }

  function limpiarCheck(estado) {
      $("input:checkbox").prop("checked", estado);
  }

  function deshabilitaCheck(estado) {
      $("input:checkbox").prop("disabled", estado);
  }

  function seleccionarTodos(opcion) {
      if (opcion == 0) {
          $("input:checkbox").prop("checked", true);
      }
      if (opcion == 1) {
          $("input:checkbox").prop("checked", false);
      }
  }

  function LimpiarForm() {
      deshabilitaCheck(true);
      $("#selecciones_perfil").hide();
      $("#div_GuardarCancelar").hide();
      $("input:checkbox").prop("checked", false);
      $("#perfiles").val('')
  }
  //PERFIL POR USUARIO
  function PERFIL_USUARIO_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/perfil_usuario/consultar_usuarios.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });
  }

  function PERFIL_USUARIO_Consultar2() {
      $.ajax({
          type: "POST",
          url: "configuracion/perfil_usuario/consultar_usuarios.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });
  }

  function PERFIL_USUARIO_Save(id_perfil, id_usuario) {
      $("#Span_select_" + id_usuario).hide();
      $("#span_loading_" + id_usuario).html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/perfil_usuario/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "id_perfil=" + id_perfil + "&id_usuario=" + id_usuario,
          success: function(msg) {
              $("#span_loading_" + id_usuario).html('');
              $("#Span_select_" + id_usuario).show();
              if (msg == 0) { //
                  Message("Algunos datos no se pudieron procesar. Por favor, revise.", "", "error")
              }
              if (msg == 'insert') { //
                  Message("Perfil actualizado.", "", "success")
                  PERFIL_USUARIO_Consultar2()
              }
              if (msg == 'update') { //
                  Message("Perfil actualizado.", "", "success")
                  PERFIL_USUARIO_Consultar2()
              }
              if (msg == 'delete') { //
                  Message("Perfil actualizado.", "", "success")
                  PERFIL_USUARIO_Consultar2()
              }
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });
  }
  //sms
  function AddSMSText(campo) {
      var SMS_idAliado = $("#SMS_idAliado").val()
      var SMS_Mensaje = $("#SMS_Mensaje").val()
      if (SMS_idAliado == '') {
          Message("Por favor, seleccione un aliado para realizar la configuración de la plantilla!", "", "warning")
          return false;
      }
      if (SMS_Mensaje == '') $("textarea#SMS_Mensaje").val("{" + campo + "}")
      else $("textarea#SMS_Mensaje").val(SMS_Mensaje + " " + "{" + campo + "}")
      $("#SMS_Mensaje").focus()
  }

  function AddSMSText2(campo) {
      //$("#SMS_Mensaje").summernote("code", "{" + campo + "}")
      var SMS_Mensaje = $("#SMS_Mensaje").val()
      if (SMS_Mensaje == '') $("#SMS_Mensaje").summernote("code", "{" + campo + "}")
      else $("#SMS_Mensaje").summernote("code", SMS_Mensaje + " " + "{" + campo + "}")
      $("#SMS_Mensaje").focus()
      /* if (SMS_Mensaje == '') 
       else $("textarea#SMS_Mensaje").val(SMS_Mensaje + " " + "{" + campo + "}")
       $("#SMS_Mensaje").focus()*/
  }

  function SMS_SaveInfo() {
      var SMS_IdSMS = $("#SMS_IdSMS").val()
      var SMS_idAliado = $("#SMS_idAliado").val()
      var SMS_descripcion = $("#SMS_descripcion").val()
      var SMS_Mensaje = $("#SMS_Mensaje").val()
      if (SMS_idAliado == '') {
          Message("Seleccione un aliado.", "", "warning")
          return false;
      }
      if (SMS_descripcion == '') {
          Message("Digite una descripción.", "", "warning")
          return false;
      }
      if (SMS_Mensaje == '') {
          Message("Digite un mensaje.", "", "warning")
          return false;
      }
      $("#BTN_SMS_Guardar").attr("disabled", true);
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/sms/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id=" + SMS_IdSMS + "&SMS_idAliado=" + SMS_idAliado + "&SMS_descripcion=" + SMS_descripcion + "&mensaje=" + SMS_Mensaje,
          processData: true,
          success: function(msg) {
              if (msg == 0) {
                  Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
              } else {
                  Message("Información registrada correctamente", "", "success")
                  $("#SMS_IdSMS").val(msg);
              }
              buscarPlanillaSMSALiado(SMS_idAliado)
              $("#BTN_SMS_Guardar").removeAttr("disabled", true);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $("#BTN_SMS_Guardar").removeAttr("disabled", true);
              $("#rpta").html('');
          }
      });
  }
  //correo
  function CORREO_SaveInfo() {
      var SMS_IdSMS = $("#SMS_IdSMS").val()
      var SMS_Mensaje = $("#SMS_Mensaje").val()
      var SMS_idAliado = $("#SMS_idAliado").val()
      var SMS_descripcion = $("#SMS_descripcion").val()
      var SMS_ASUNTO = $("#SMS_ASUNTO").val()
      if (SMS_idAliado == '') {
          Message("Seleccione un aliado.", "", "warning")
          return false;
      }
      if (SMS_ASUNTO == '') {
          Message("Digite un asunto para el correo.", "", "warning")
          return false;
      }
      if (SMS_descripcion == '') {
          Message("Digite una descripción.", "", "warning")
          return false;
      }
      if (SMS_Mensaje == '') {
          Message("Digite un mensaje.", "", "warning")
          return false;
      }
      var commentForm = document.getElementById("commentForm");
      SMS_Mensaje = SMS_Mensaje.replace(/\r?\n/g, '<br>', )
      $("#BTN_SMS_Guardar").attr("disabled", true);
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/plantilla_correo/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          data: new FormData($('#commentForm')[0]), //"id=" + SMS_IdSMS + "&SMS_idAliado=" + SMS_idAliado + "&mensaje=" + SMS_Mensaje + "&SMS_descripcion=" + SMS_descripcion + "&mensaje=" + SMS_Mensaje + "&SMS_ASUNTO=" + SMS_ASUNTO,
          processData: true,
          success: function(msg) {
              if (msg == 0) {
                  Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
              } else {
                  Message("Información registrada correctamente", "", "success")
                  $("#SMS_IdSMS").val(msg);
              }
              buscarPlanillaCORREOALiado(SMS_idAliado)
              $("#BTN_SMS_Guardar").removeAttr("disabled", true);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $("#BTN_SMS_Guardar").removeAttr("disabled", true);
              $("#rpta").html('');
          }
      });
  }
  //cargue masivo
  function CARGUE_MASIVO_CLIENTES_enviaInfo(usuario_sistema) {
      swal({
          title: "¿Desea enviar la información suministrada? Recuerde: Esta opción no se puede deshacer.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "cargue_masivo/clientes/send_info.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "usuario_sistema=" + usuario_sistema,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          Message("Información enviada correctamente. Por favor espere, el sistema está validando datos", "", "success")
                          setTimeout(SEND_Url(), 50000);
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }
  //cargue masivo obligaciones
  function CARGUE_MASIVO_OBLIGACIONES_enviaInfo(usuario_sistema) {
      swal({
          title: "¿Desea enviar la información suministrada? Recuerde: Esta opción no se puede deshacer.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "cargue_masivo/obligaciones/send_info.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "usuario_sistema=" + usuario_sistema,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          Message("Información enviada correctamente. Por favor espere, el sistema está validando datos", "", "success")
                          setTimeout(SEND_Url(), 50000);
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }
  //GESTION DE CLIENTE
  function SEND_Url() {
      window.location.href = window.location.href
  }

  function GESTION_ConsultarClientes() {
      $("#loadGestion").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/consultar_cliente.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#loadGestion").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });
  }

  function GESTION_IniciarGestion(id_cliente, identificacion, nombre_completo, celular, correo, ciudad, direccion, fecha_corte) {
      $("#loadGestion").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/form_gestion.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "id_cliente=" + id_cliente + "&identificacion=" + identificacion + "&nombre_completo=" + nombre_completo + "&celular=" + celular + "&correo=" + correo + "&ciudad=" + ciudad + "&direccion=" + direccion + "&fecha_corte=" + fecha_corte,
          success: function(msg) {
              $("#loadGestion").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });
  }

  function GESION_COPIAR_ObligacionAGestion(num_pagare) {
      swal({
          title: "¿Desea iniciar la gestión con el pagaré #: " + num_pagare + "?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "gestion/seguimiento/envia_info_obligaciones_a_gestion.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "num_pagare=" + num_pagare,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "No se pudo iniciar la obligación con # de pagaré: " + num_pagare + ". Por favor, revise.", "error")
                      } else {
                          var id_gestion = msg;
                          GESION_INICIAR_Obligacion(num_pagare, id_gestion)
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function GESION_INICIAR_Obligacion(num_pagare, id_gestion) {
      $("#divGestionCliente").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/form_obligacion.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "num_pagare=" + num_pagare + "&id_gestion=" + id_gestion,
          success: function(msg) {
              $("#divGestionCliente").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });
  }

  function GESTION_HabilitaTipoComunicacion(id_tipo_comunicacion) {
      switch (id_tipo_comunicacion) {
          case '1': //SMS
              $("#divFechaObservacion").hide()
              $("#divPlantillaSMS").show()
              $("#divPlantilaCORREO").hide()
              break;
          case '2': //LLAMADA
              $("#divFechaObservacion").show()
              $("#divPlantillaSMS").hide()
              $("#divPlantilaCORREO").hide()
              break;
          case '3': //COMPROMISO
              $("#divFechaObservacion").show()
              $("#divPlantillaSMS").hide()
              $("#divPlantilaCORREO").hide()
              break;
          case '4': //EMAIL
              $("#divFechaObservacion").hide()
              $("#divPlantillaSMS").hide()
              $("#divPlantilaCORREO").show()
              break;
          case '5': //NOTIFICACION JURIDICA
              $("#divFechaObservacion").show()
              $("#divPlantillaSMS").hide()
              $("#divPlantilaCORREO").hide()
              break;
          case '6': //whatsapp
              break;
          case '7': //NOTAS
              $("#divFechaObservacion").show()
              $("#divPlantillaSMS").hide()
              $("#divPlantilaCORREO").hide()
              break;
          case '8': //DOCUMENTO
              $("#divFechaObservacion").hide()
              $("#divPlantillaSMS").hide()
              $("#divPlantilaCORREO").hide()
              break;
          default:
              break;
      }
  }

  function OBLIGACION_LoadDocumentos(id_tipo_comunicacion, id_aliado) {
      var GESTION_GestionInicialRealizada = $("#GESTION_GestionInicialRealizada").val();
      if (id_tipo_comunicacion != 8) {
          $("#divrptaDocumentos").html('');
          return false;
      }
      $("#divrptaDocumentos").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/load_documentos_aliados.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "id_aliado=" + id_aliado + "&GESTION_GestionInicialRealizada=" + GESTION_GestionInicialRealizada,
          success: function(msg) {
              $("#divrptaDocumentos").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });;
  }

  function GESTION_ProcesarInformacion(id_aliado) {
      var GESTION_idTipoComunicacion = $("#GESTION_idTipoComunicacion").val();
      var GESTION_IdTipoGestion = $("#GESTION_idTipoComunicacion").val();
      var GESTION_NumeroPagare = $("#GESTION_NumeroPagare").val();
      var GESTION_IdGestionCliente = $("#GESTION_IdGestionCliente").val();
      var GESTION_DocumentoCliente = $("#GESTION_DocumentoCliente").val();
      switch (GESTION_idTipoComunicacion) {
          case '1': //SMS
              GESTION_sendSMS(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado)
              break;
          case '2': //LLAMADA
              GESTION_guardarInfo(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado)
              break;
          case '3': //COMPROMISO
              GESTION_guardarInfo(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado)
              break;
          case '4': //EMAIL
              GESTION_sendEMAIL(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado)
              break;
          case '5': //NOTIFICACION JURIDICA
              GESTION_guardarInfo(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado)
              break;
          case '6': //whatsapp
              break;
          case '7': //NOTAS
              GESTION_guardarInfo(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado)
              break;
          case '8': //DOCUMENTO
              // GESTION_guardarDocumento(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado)
              break;
          default:
              break;
      }
  }

  function GESTION_sendSMS(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado) {
      var GESTION_SMS = $("#GESTION_SMS").val();
      if (GESTION_SMS == '') {
          Message("Seleccione una plantilla", "", "warning")
          return false;
      }
      $("#divrptaObligacion").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/send_sms.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "GESTION_IdGestionCliente=" + GESTION_IdGestionCliente + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente + "&GESTION_idTipoComunicacion=" + GESTION_idTipoComunicacion + "&GESTION_IdTipoGestion=" + GESTION_IdTipoGestion + "&id_aliado=" + id_aliado + "&GESTION_SMS=" + GESTION_SMS,
          success: function(msg) {
              $("#divrptaObligacion").html('');
              if (msg == 1) {
                  Message("Notificación enviada por SMS de forma correcta", "", "success")
              } else {
                  Message("Ocurrió algo al momento de enviar el SMS", "", "warning")
              }
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });;
  }

  function GESTION_guardarInfo(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado) {
      var GESTION_Fecha = $("#GESTION_Fecha").val();
      var GESTION_ValorCompromiso = $("#GESTION_ValorCompromiso").val();
      var GESTION_Observacion = $("#GESTION_Observacion").val();
      $("#divrptaObligacion").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/guardar_seguimiento.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "GESTION_IdGestionCliente=" + GESTION_IdGestionCliente + "&GESTION_Fecha=" + GESTION_Fecha + "&GESTION_ValorCompromiso=" + GESTION_ValorCompromiso + "&GESTION_Observacion=" + GESTION_Observacion + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente + "&GESTION_idTipoComunicacion=" + GESTION_idTipoComunicacion + "&GESTION_IdTipoGestion=" + GESTION_IdTipoGestion + "&id_aliado=" + id_aliado,
          success: function(msg) {
              $("#divrptaObligacion").html('');
              if (msg == 1) {
                  Message("Información registrada correctamente", "", "success")
              } else {
                  Message("Ocurrió algo al momento de procesar la información", "", "warning")
              }
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });;
  }
  //aqui se comenta esta funcion porque voy a usarla con metodo async. Me permite enviar en segundo plano
  function GESTION_sendEMAIL(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado) {
      var GESTION_CORREO = $("#GESTION_CORREO").val();
      if (GESTION_CORREO == '') {
          Message("Seleccione una plantilla", "", "warning")
          return false;
      }
      $("#divrptaObligacion").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/send_mail.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "GESTION_IdGestionCliente=" + GESTION_IdGestionCliente + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente + "&GESTION_idTipoComunicacion=" + GESTION_idTipoComunicacion + "&GESTION_IdTipoGestion=" + GESTION_IdTipoGestion + "&GESTION_CORREO=" + GESTION_CORREO + "&id_aliado=" + id_aliado,
          success: function(msg) {
              $("#divrptaObligacion").html('');
              if (msg == 1) {
                  Message("Notificación enviada por correo de forma correcta", "", "success")
              } else {
                  Message("Ocurrió algo al momento de enviar el correo", "", "warning")
              }
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });
  }
  //esto es lo que estoy usando para enviar en segundo plano. Vlidar porque no funciona
  /*function GESTION_sendEMAIL(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion, id_aliado) {
      var GESTION_CORREO = $("#GESTION_CORREO").val();
      if (GESTION_CORREO == '') {
          Message("Seleccione una plantilla", "", "warning")
          return false;
      }
      $("#divrptaObligacion").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          url: 'gestion/seguimiento/send_mail.php',
          //async: true,
          type: 'POST',
          data: 'GESTION_IdGestionCliente=' + encodeURIComponent(GESTION_IdGestionCliente) + '&GESTION_NumeroPagare=' + encodeURIComponent(GESTION_NumeroPagare) + '&GESTION_NumeroPagare=' + encodeURIComponent(GESTION_NumeroPagare) + '&GESTION_DocumentoCliente=' + encodeURIComponent(GESTION_DocumentoCliente) + '&GESTION_idTipoComunicacion=' + encodeURIComponent(GESTION_idTipoComunicacion) + '&GESTION_IdTipoGestion=' + encodeURIComponent(GESTION_IdTipoGestion) + '&id_aliado=' + encodeURIComponent(id_aliado) + '&GESTION_CORREO=' + encodeURIComponent(GESTION_CORREO),
          success: function(response) {
              console.log('El correo electrónico se envió correctamente.');
              $("#divrptaObligacion").html('')
          },
          error: function(xhr, status, error) {
              console.error('Se produjo un error al enviar el correo electrónico: ' + error);
              $("#divrptaObligacion").html('')
          }
      });
  }*/
  /*function GESTION_guardarDocumento(GESTION_IdGestionCliente, GESTION_NumeroPagare, GESTION_DocumentoCliente, GESTION_idTipoComunicacion, GESTION_IdTipoGestion) {
      $("#divrptaObligacion").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      var fd = new FormData();
      var GESTION_NumeroPagare = GESTION_NumeroPagare;
      var files = $('#GESTION_DocumentoCargue')[0].files[0];
      fd.append('file', files);
      fd.append('text', GESTION_NumeroPagare);
      fd.append('GESTION_IdGestionCliente', GESTION_IdGestionCliente);
      fd.append('GESTION_idTipoComunicacion', GESTION_idTipoComunicacion);
      fd.append('GESTION_IdTipoGestion', GESTION_IdTipoGestion);
      if (files == undefined) {
          Message("Seleccione un documento para continuar", "", "warning")
          return false;
      }
      $.ajax({
          url: 'gestion/seguimiento/upload_file_externo.php',
          type: 'post',
          data: fd,
          contentType: false,
          processData: false,
          success: function(response) {
              $("#divrptaObligacion").html('');
              if (response != 0) {
                  Message("Información procesada correctamente", '', "success");
                  //loadDocumentosExternos(GESTION_NumeroPagare)
                  $("#GESTION_DocumentoCargue").val('');
              } else {
                  Message("No se pudo cargar el archivo. Intenta nuevamente.", '', "error");
              }
          },
      });
  }*/
  function GESTION_guardarDocumento(id_aliado, id_documento) {
      $("#divrptaObligacion").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      var GESTION_DocumentoCliente = $("#GESTION_DocumentoCliente").val();
      var GESTION_NumeroPagare = $("#GESTION_NumeroPagare").val();
      var GESTION_IdGestionCliente = $("#GESTION_IdGestionCliente").val();
      var GESTION_IdTipoGestion = $("#GESTION_GestionInicialRealizada").val();
      var GESTION_idTipoComunicacion = $("#GESTION_idTipoComunicacion").val();
      var fd = new FormData();
      var GESTION_NumeroPagare = GESTION_NumeroPagare;
      var files = $('#GESTION_DocumentoCargue_' + id_documento)[0].files[0];
      fd.append('file', files);
      fd.append('GESTION_NumeroPagare', GESTION_NumeroPagare);
      fd.append('id_aliado', id_aliado);
      fd.append('id_documento', id_documento);
      fd.append('GESTION_DocumentoCliente', GESTION_DocumentoCliente);
      fd.append('GESTION_IdGestionCliente', GESTION_IdGestionCliente);
      fd.append('GESTION_IdTipoGestion', GESTION_IdTipoGestion);
      fd.append('GESTION_idTipoComunicacion', GESTION_idTipoComunicacion);
      if (files == undefined) {
          Message("Seleccione un documento para continuar", "", "warning")
          $("#divrptaObligacion").html('');
          return false;
      }
      $.ajax({
          url: 'gestion/seguimiento/upload_file_externo.php',
          type: 'post',
          data: fd,
          contentType: false,
          processData: false,
          success: function(response) {
              $("#divrptaObligacion").html('');
              if (response != 0) {
                  Message("Información procesada correctamente", '', "success");
                  //loadDocumentosExternos(GESTION_NumeroPagare)
                  //$("#GESTION_DocumentoCargue_").val('');
              } else {
                  Message("No se pudo cargar el archivo. Intenta nuevamente.", '', "error");
              }
          },
      });
  }
  //ALIADOS
  function ALIADOS_Save() {
      var id_aliado = $("#id_aliado").val();
      var ALIADOS_Detalle = $("#ALIADOS_Detalle").val();
      if (ALIADOS_Detalle == '') {
          Message("Digite el nombre del aliado", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/aliados/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "ALIADOS_Detalle=" + ALIADOS_Detalle + "&id_aliado=" + id_aliado,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  ALIADOS_Clear();
              }
              ALIADOS_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function ALIADOS_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/aliados/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function ALIADOS_Eliminar(id_aliado) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/aliados/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_aliado=" + id_aliado,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un aliado asociado a un cliente.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              ALIADOS_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function ALIADOS_Editar(id_aliado, ALIADOS_Detalle) {
      $("#id_aliado").val(id_aliado);
      $("#ALIADOS_Detalle").val(ALIADOS_Detalle);
      $("#ALIADOS_Detalle").focus();
  }

  function ALIADOS_Clear() {
      $("#id_aliado").val('');
      $("#ALIADOS_Detalle").val('');
  }
  //conf. SMS nueva version
  function buscarPlanillaSMSALiado(id_aliado) {
      if (id_aliado == '') {
          $("#rpta").html('');
          return false;
      }
      $("#SMS_IdSMS").val('');
      $("#SMS_descripcion").val('');
      $("#SMS_Mensaje").val('');
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/sms/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado,
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function SMS_Clear(id_aliado) {
      $("#SMS_IdSMS").val('');
      $("#SMS_descripcion").val('');
      $("#SMS_Mensaje").val('');
      $("#SMS_idAliado").val(id_aliado).trigger('change')
  }

  function SMS_Editar(SMS_IdSMS, SMS_descripcion, SMS_Mensaje) {
      $("#SMS_IdSMS").val(SMS_IdSMS);
      $("#SMS_descripcion").val(SMS_descripcion);
      $("#SMS_Mensaje").val(SMS_Mensaje);
      $("#SMS_descripcion").focus();
  }

  function SMS_Eliminar(SMS_IdSMS, id_aliado) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/sms/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "SMS_IdSMS=" + SMS_IdSMS,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un aliado asociado a un cliente.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              buscarPlanillaSMSALiado(id_aliado)
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }
  //conf. CORREO nueva version
  function buscarPlanillaCORREOALiado(id_aliado) {
      if (id_aliado == '') {
          $("#rpta").html('');
          return false;
      }
      $("#SMS_IdSMS").val('');
      $("#SMS_descripcion").val('');
      //$("#SMS_Mensaje").val('');
      $('#SMS_Mensaje').summernote('code', "");
      $("#SMS_ASUNTO").val('')
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/plantilla_correo/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado,
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function buscarPlanillaCORREOALiado2(id_aliado) {
      if (id_aliado == '') {
          $("#rpta").html('');
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/plantilla_correo/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado,
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function CORREO_Clear(id_aliado) {
      $("#SMS_IdSMS").val('');
      $("#SMS_descripcion").val('');
      $("#SMS_Mensaje").val('');
      $("#SMS_ASUNTO").val('');
      $("#SMS_idAliado").val(id_aliado).trigger('change')
      $('#SMS_Mensaje').summernote('code', "");
  }

  function CORREO_Editar(SMS_IdSMS, SMS_descripcion, SMS_ASUNTO, SMS_Mensaje, id_aliado) {
      SMS_Mensaje = SMS_Mensaje.replace(/<br ?\/?>/g, "\n")
      $("#SMS_IdSMS").val(SMS_IdSMS);
      $("#SMS_descripcion").val(SMS_descripcion);
      //$("#SMS_Mensaje").val(SMS_Mensaje);
      $('#SMS_Mensaje').summernote('code', SMS_Mensaje);
      $("#SMS_ASUNTO").val(SMS_ASUNTO);
      $("#SMS_descripcion").focus();
      /*$.ajax({
          type: "POST",
          url: "configuracion/plantilla_correo/load_sms.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "SMS_IdSMS=" + SMS_IdSMS + "&id_aliado=" + id_aliado,
          success: function(msg) {
              $('#SMS_Mensaje').summernote('code');
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor. " + thrownError, "error")
          }
      });*/
  }

  function CORREO_Eliminar(SMS_IdSMS, id_aliado) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/plantilla_correo/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "SMS_IdSMS=" + SMS_IdSMS,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un aliado asociado a un cliente.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              buscarPlanillaCORREOALiado(id_aliado)
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }
  //documentos
  function DOCUMENTOS_SaveInfo() {
      var DOCUMENTOS_Id = $("#DOCUMENTOS_Id").val();
      var DOCUMENTOS_idAliado = $("#DOCUMENTOS_idAliado").val();
      var DOCUMENTOS_descripcion = $("#DOCUMENTOS_descripcion").val();
      var DOCUMENTOS_IdTipoGestion = $("#DOCUMENTOS_IdTipoGestion").val();
      if (DOCUMENTOS_idAliado == '') {
          Message("Seleccione el aliado", "", "warning")
          return false;
      }
      if (DOCUMENTOS_descripcion == '') {
          Message("Digite el nombre del documento", "", "warning")
          return false;
      }
      if (DOCUMENTOS_IdTipoGestion == '') {
          Message("Seleccione el tipo de gestión", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/documentos/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "DOCUMENTOS_Id=" + DOCUMENTOS_Id + "&DOCUMENTOS_idAliado=" + DOCUMENTOS_idAliado + "&DOCUMENTOS_descripcion=" + DOCUMENTOS_descripcion + "&DOCUMENTOS_IdTipoGestion=" + DOCUMENTOS_IdTipoGestion,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  DOCUMENTOS_Clear(DOCUMENTOS_idAliado);
              }
              DOCUMENTOS_Consultar(DOCUMENTOS_idAliado);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function buscarDOCUMENTOSAliado(DOCUMENTOS_idAliado) {
      DOCUMENTOS_Consultar(DOCUMENTOS_idAliado)
  }

  function DOCUMENTOS_Consultar(DOCUMENTOS_idAliado) {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/documentos/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + DOCUMENTOS_idAliado,
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function DOCUMENTOS_Eliminar(id_documento, id_aliado) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/documentos/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_documento=" + id_documento,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un aliado asociado a un cliente.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              DOCUMENTOS_Consultar(id_aliado)
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function DOCUMENTOS_Editar(id_documento, id_aliado, documento, id_tipo_gestion) {
      $("#DOCUMENTOS_Id").val(id_documento);
      $("#DOCUMENTOS_idAliado").val(id_aliado).trigger('change');
      $("#DOCUMENTOS_descripcion").val(documento);
      $("#DOCUMENTOS_IdTipoGestion").val(id_tipo_gestion).trigger('change');
      $("#DOCUMENTOS_descripcion").focus();
  }

  function DOCUMENTOS_Clear(id_aliado) {
      $("#DOCUMENTOS_Id").val('');
      $("#DOCUMENTOS_idAliado").val(id_aliado).trigger('change');
      $("#DOCUMENTOS_descripcion").val('');
      $("#DOCUMENTOS_IdTipoGestion").val('').trigger('change');
      $("#rpta").html('');
  }
  //preview
  function ViewModalPreviewSMS(id_aliado) {
      var GESTION_SMS = $("#GESTION_SMS").val()
      var GESTION_NumeroPagare = $("#GESTION_NumeroPagare").val();
      var GESTION_DocumentoCliente = $("#GESTION_DocumentoCliente").val();
      if (GESTION_SMS == '') {
          Message("Seleccione una plantilla para tener una vista previa", "", "warning")
          return false;
      }
      $("#modal-preview-sms").modal('show')
      $("#divBodyVistaPreviaEnvioSMS").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Cargando información... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/previewSMS.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado + "&id_mensaje=" + GESTION_SMS + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente,
          processData: true,
          success: function(msg) {
              $("#divBodyVistaPreviaEnvioSMS").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }

  function SMS_PREVIEW_SendDemo(id_aliado, id_sms) {
      var PREVIEW_NumDemo = $("#PREVIEW_NumDemo").val();
      var GESTION_NumeroPagare = $("#GESTION_NumeroPagare").val();
      var GESTION_DocumentoCliente = $("#GESTION_DocumentoCliente").val();
      var GESTION_IdGestionCliente = $("#GESTION_IdGestionCliente").val();
      if (PREVIEW_NumDemo == '') {
          Message("Digite un número para realizar el envío de prueba.", "", "warning")
          return false;
      }
      if (PREVIEW_NumDemo.length < 12) {
          Message("El teléfono debe contener 12 números. Ejemplo: (57) 302-3003300", "", "warning")
          return false;
      }
      $("#previewSendSMS").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Realizando envío... Espere </div> </div> </div>');
      $("#BTN_PREVIEW_sendMSG").attr("disabled", true)
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/send_sms_demo.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado + "&id_mensaje=" + id_sms + "&PREVIEW_NumDemo=" + PREVIEW_NumDemo + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente + "&GESTION_IdGestionCliente=" + GESTION_IdGestionCliente,
          processData: true,
          success: function(msg) {
              $("#previewSendSMS").html('');
              $("#BTN_PREVIEW_sendMSG").removeAttr("disabled", false)
              if (msg == 1) {
                  Message("Mensaje de prueba enviado correctamente.", "", "success")
                  return false;
              } else {
                  Message("Ocurrió algo al momento de enviar el mensaje.", "", "error")
                  return false;
              }
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
              $("#BTN_PREVIEW_sendMSG").removeAttr("disabled", true)
          }
      });
  }

  function ViewModalPreviewCORREO(id_aliado) {
      var GESTION_CORREO = $("#GESTION_CORREO").val()
      var GESTION_NumeroPagare = $("#GESTION_NumeroPagare").val();
      var GESTION_DocumentoCliente = $("#GESTION_DocumentoCliente").val();
      if (GESTION_CORREO == '') {
          Message("Seleccione una plantilla para tener una vista previa", "", "warning")
          return false;
      }
      $("#modal-preview-correo").modal('show')
      $("#divBodyVistaPreviaEnvioCORREO").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Cargando información... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/previewCORREO.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado + "&id_mensaje=" + GESTION_CORREO + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente,
          processData: true,
          success: function(msg) {
              $("#divBodyVistaPreviaEnvioCORREO").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }

  function CORREO_PREVIEW_SendDemo(id_aliado, id_sms) {
      var PREVIEW_Mail = $("#PREVIEW_Mail").val();
      var GESTION_NumeroPagare = $("#GESTION_NumeroPagare").val();
      var GESTION_DocumentoCliente = $("#GESTION_DocumentoCliente").val();
      var GESTION_IdGestionCliente = $("#GESTION_IdGestionCliente").val();
      if (PREVIEW_Mail == '') {
          Message("Digite un número para realizar el envío de prueba.", "", "warning")
          return false;
      }
      $("#previewSendMAIL").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Realizando envío... Espere </div> </div> </div>');
      $("#BTN_PREVIEW_sendMail").attr("disabled", true)
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/send_mail_demo.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado + "&id_mensaje=" + id_sms + "&PREVIEW_Mail=" + PREVIEW_Mail + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente + "&GESTION_IdGestionCliente=" + GESTION_IdGestionCliente,
          processData: true,
          success: function(msg) {
              $("#previewSendMAIL").html('');
              $("#BTN_PREVIEW_sendMail").removeAttr("disabled", false)
              if (msg == 1) {
                  Message("Mensaje de prueba enviado correctamente.", "", "success")
                  return false;
              } else {
                  Message("Ocurrió algo al momento de enviar el mensaje.", "", "error")
                  return false;
              }
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
              $("#BTN_PREVIEW_sendMail").removeAttr("disabled", true)
          }
      });
  }
  //asginación de aliados.
  function ALIADO_BuscarClientes() {
      $("#loadClientAliado").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Realizando envío... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/asignar_aliado/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#loadClientAliado").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }

  function AsginarUsuarioAliadoSave() {
      swal({
          title: "¿Desea agregar los usuarios al aliado seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              var ALIADO_IdAliado = $("#ALIADO_IdAliado").val()
              var checkbox = GetItemsCheckbox();
              if (ALIADO_IdAliado == '') {
                  Message("Seleccione un aliado para asociarle los clientes", "", "warning")
                  return false;
              }
              if (checkbox == ',') {
                  Message("Seleccione por lo menos un cliente para asociar al aliado", "", "warning")
                  return false;
              }
              $("#loadClientAliado").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Processing information... Please wait </div> </div> </div>');
              $.ajax({
                  type: "POST",
                  url: "gestion/asignar_aliado/guardar.php",
                  contentType: "application/x-www-form-urlencoded",
                  data: "ALIADO_IdAliado=" + ALIADO_IdAliado + "&checkbox=" + checkbox,
                  processData: true,
                  success: function(msg) {
                      if (msg == 1) {
                          Message("Clientes asignados correctamente al aliado seleccionado", "", "success")
                          ALIADO_BuscarClientes()
                      } else {
                          Message("No se pudo asociar el cliente al aliado seleccionado.", "", "error")
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Server error. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function GetItemsCheckbox() {
      var CheckSelect = ',';
      $("input[name=config_trasnfer]").each(function(index) {
          if ($(this).is(':checked')) {
              if (CheckSelect == ',') {
                  CheckSelect = $(this).val();
              } else {
                  CheckSelect += "," + $(this).val();
              }
          }
      });
      return CheckSelect;
  }
  //historial
  function GESTION_HISTORIAL_Cliente(num_pagare, documento, id_aliado) {
      //$("#modal-historial").modal("show")
      $("#divGestionCliente").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Cargando información... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "gestion/seguimiento/historial.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado + "&num_pagare=" + num_pagare + "&documento=" + documento,
          processData: true,
          success: function(msg) {
              $("#divGestionCliente").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }

  function HISTORIAL_Clear() {
      $("#divGestionCliente").html("");
  }
  //envio masivo
  //preview
  function ViewModalPreviewSMS_EnvioMasivo(id_aliado) {
      var GESTION_SMS = $("#GESTION_SMS").val()
      if (GESTION_SMS == '') {
          Message("Seleccione una plantilla para tener una vista previa", "", "warning")
          return false;
      }
      $("#modal-preview-sms").modal('show')
      $("#divBodyVistaPreviaEnvioSMS").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Cargando información... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "envio_masivo/sms/previewSMS.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado + "&id_mensaje=" + GESTION_SMS,
          processData: true,
          success: function(msg) {
              $("#divBodyVistaPreviaEnvioSMS").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }

  function buscarPlanillaSMSALiado_EnvioMasivo(id_aliado) {
      if (id_aliado == '') {
          $("#rpta").html('');
          return false;
      }
      $("#loadGestion_EnvioMasivo").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "envio_masivo/sms/loadComboSMS.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado,
          processData: true,
          success: function(msg) {
              $("#GESTION_SMS").html(msg);
              $("#loadGestion_EnvioMasivo").html('');
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function buscarPlanillaMAIL_ALiado_EnvioMasivo(id_aliado) {
      if (id_aliado == '') {
          $("#rpta").html('');
          return false;
      }
      $("#loadGestion_EnvioMasivo").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "envio_masivo/correo/loadComboMAIL.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado,
          processData: true,
          success: function(msg) {
              $("#GESTION_SMS").html(msg);
              $("#loadGestion_EnvioMasivo").html('');
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function ENVIO_MASIVO_SMS_ProcesarInformacion(id_aliado) {
      var SMS_idAliado = $("#SMS_idAliado").val()
      var GESTION_SMS = $("#GESTION_SMS").val()
      var ENVIO_Masivo_RangoMora = $("#ENVIO_Masivo_RangoMora").val()
      var ENVIO_MASIVO_DiasMora = $("#ENVIO_MASIVO_DiasMora").val()
      if (SMS_idAliado == '') {
          Message("Seleccione aliado", "", "warning")
          return false;
      }
      if (GESTION_SMS == '') {
          Message("Seleccione una plantilla", "", "warning")
          return false;
      }
      if (ENVIO_Masivo_RangoMora == '') {
          Message("Seleccione un rango de mora", "", "warning")
          return false;
      }
      if ((ENVIO_MASIVO_DiasMora == '') || (ENVIO_MASIVO_DiasMora == 0)) {
          Message("Los días de mora deben ser mayor a cero", "", "warning")
          return false;
      }
      $("#loadGestion_EnvioMasivo").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "envio_masivo/sms/consulta_info_envio.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + SMS_idAliado + "&id_mensaje=" + GESTION_SMS + "&ENVIO_Masivo_RangoMora=" + ENVIO_Masivo_RangoMora + "&ENVIO_MASIVO_DiasMora=" + ENVIO_MASIVO_DiasMora,
          processData: true,
          success: function(msg) {
              $("#loadGestion_EnvioMasivo").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function ENVIO_MASIVO_CORREO_ProcesarInformacion(id_aliado) {
      var SMS_idAliado = $("#SMS_idAliado").val()
      var GESTION_SMS = $("#GESTION_SMS").val()
      var ENVIO_Masivo_RangoMora = $("#ENVIO_Masivo_RangoMora").val()
      var ENVIO_MASIVO_DiasMora = $("#ENVIO_MASIVO_DiasMora").val()
      if (SMS_idAliado == '') {
          Message("Seleccione aliado", "", "warning")
          return false;
      }
      if (GESTION_SMS == '') {
          Message("Seleccione una plantilla", "", "warning")
          return false;
      }
      if (ENVIO_Masivo_RangoMora == '') {
          Message("Seleccione un rango de mora", "", "warning")
          return false;
      }
      if ((ENVIO_MASIVO_DiasMora == '') || (ENVIO_MASIVO_DiasMora == 0)) {
          Message("Los días de mora deben ser mayor a cero", "", "warning")
          return false;
      }
      $("#loadGestion_EnvioMasivo").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "envio_masivo/correo/consulta_info_envio.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + SMS_idAliado + "&id_mensaje=" + GESTION_SMS + "&ENVIO_Masivo_RangoMora=" + ENVIO_Masivo_RangoMora + "&ENVIO_MASIVO_DiasMora=" + ENVIO_MASIVO_DiasMora,
          processData: true,
          success: function(msg) {
              $("#loadGestion_EnvioMasivo").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function SMS_SEND_MASIVO_Send() {
      swal({
          title: "¿Seguro que desea realizar el envío masivo?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              var SMS_idAliado = $("#SMS_idAliado").val()
              var GESTION_SMS = $("#GESTION_SMS").val()
              var ENVIO_Masivo_RangoMora = $("#ENVIO_Masivo_RangoMora").val()
              var ENVIO_MASIVO_DiasMora = $("#ENVIO_MASIVO_DiasMora").val()
              $('#modal-load').modal({
                  backdrop: 'static',
                  keyboard: false
              });
              $("#modal-load").modal("show");
              $.ajax({
                  type: "POST",
                  url: "envio_masivo/sms/send_sms.php",
                  contentType: "application/x-www-form-urlencoded",
                  data: "id_aliado=" + SMS_idAliado + "&id_mensaje=" + GESTION_SMS + "&ENVIO_Masivo_RangoMora=" + ENVIO_Masivo_RangoMora + "&ENVIO_MASIVO_DiasMora=" + ENVIO_MASIVO_DiasMora,
                  processData: true,
                  success: function(msg) {
                      if (msg == 1) {
                          Message("Mensajes enviados correctamente", "", "success")
                          setTimeout(function() {
                              $("#modal-load").modal("hide");
                          }, 3000);
                      }
                      setTimeout(function() {
                          $("#modal-load").modal("hide");
                      }, 3000);
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor", "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function CORREO_SEND_MASIVO_Send() {
      swal({
          title: "¿Seguro que desea realizar el envío masivo?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              var SMS_idAliado = $("#SMS_idAliado").val()
              var GESTION_SMS = $("#GESTION_SMS").val()
              var ENVIO_Masivo_RangoMora = $("#ENVIO_Masivo_RangoMora").val()
              var ENVIO_MASIVO_DiasMora = $("#ENVIO_MASIVO_DiasMora").val()
              $('#modal-load').modal({
                  backdrop: 'static',
                  keyboard: false
              });
              $("#modal-load").modal("show");
              $.ajax({
                  type: "POST",
                  url: "envio_masivo/correo/send_mail.php",
                  contentType: "application/x-www-form-urlencoded",
                  data: "id_aliado=" + SMS_idAliado + "&id_mensaje=" + GESTION_SMS + "&ENVIO_Masivo_RangoMora=" + ENVIO_Masivo_RangoMora + "&ENVIO_MASIVO_DiasMora=" + ENVIO_MASIVO_DiasMora,
                  processData: true,
                  success: function(msg) {
                      if (msg == 1) {
                          Message("Mensajes enviados correctamente", "", "success")
                          setTimeout(function() {
                              $("#modal-load").modal("hide");
                          }, 3000);
                      }
                      setTimeout(function() {
                          $("#modal-load").modal("hide");
                      }, 3000);
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor", "error")
                  }
              });
          } else {
              return false;
          }
      });
  }
  //
  //preview
  function ViewModalPreviewSMS_SendInfoMasivo(id_aliado, GESTION_SMS, GESTION_NumeroPagare, GESTION_DocumentoCliente) {
      $("#modal-preview-sms").modal('show')
      $("#divBodyVistaPreviaEnvioSMS").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Cargando información... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "envio_masivo/sms/previewSMS.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado + "&id_mensaje=" + GESTION_SMS + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente,
          processData: true,
          success: function(msg) {
              $("#divBodyVistaPreviaEnvioSMS").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }

  function ViewModalPreviewMAIL_SendInfoMasivo(id_aliado, GESTION_SMS, GESTION_NumeroPagare, GESTION_DocumentoCliente) {
      $("#modal-preview-correo").modal('show')
      $("#divBodyVistaPreviaEnvioCORREO").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Cargando información... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "envio_masivo/correo/previewMAIL.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado + "&id_mensaje=" + GESTION_SMS + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente,
          processData: true,
          success: function(msg) {
              $("#divBodyVistaPreviaEnvioCORREO").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }
  /*function ViewModalPreviewMAIL_SendInfoMasivo(id_aliado, GESTION_SMS, GESTION_NumeroPagare, GESTION_DocumentoCliente) {
      $("#modal-preview-sms").modal('show')
      $("#divBodyVistaPreviaEnvioSMS").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Cargando información... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "envio_masivo/sms/previewMAIL.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_aliado=" + id_aliado + "&id_mensaje=" + GESTION_SMS + "&GESTION_NumeroPagare=" + GESTION_NumeroPagare + "&GESTION_DocumentoCliente=" + GESTION_DocumentoCliente,
          processData: true,
          success: function(msg) {
              $("#divBodyVistaPreviaEnvioSMS").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }*/
  function CLEAR_ENVIO_MASIVO_sms() {
      $("#GESTION_SMS").val('')
      $("#ENVIO_Masivo_RangoMora").val('')
      $("#ENVIO_MASIVO_DiasMora").val('')
      $("#loadGestion_EnvioMasivo").html('');
  }
  //win sports
  //NARRADORES
  function NARRADORES_Save() {
      var id_narrador = $("#id_narrador").val();
      var NARRADORES_Detalle = $("#NARRADORES_Detalle").val();
      if (NARRADORES_Detalle == '') {
          Message("Digite el nombre del narrador", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/narradores/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "NARRADORES_Detalle=" + NARRADORES_Detalle + "&id_narrador=" + id_narrador,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  NARRADORES_Clear();
              }
              NARRADORES_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function NARRADORES_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/narradores/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function NARRADORES_Eliminar(id_narrador) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/narradores/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_narrador=" + id_narrador,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un narrador asociado a un evento.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              NARRADORES_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function NARRADORES_Editar(id_narrador, NARRADORES_Detalle) {
      $("#id_narrador").val(id_narrador);
      $("#NARRADORES_Detalle").val(NARRADORES_Detalle);
      $("#NARRADORES_Detalle").focus();
  }

  function NARRADORES_Clear() {
      $("#id_narrador").val('');
      $("#NARRADORES_Detalle").val('');
  }
  //COMENTARISTAS
  function COMENTARISTA_Save() {
      var id_comentarista = $("#id_comentarista").val();
      var COMENTARISTA_Detalle = $("#COMENTARISTA_Detalle").val();
      if (COMENTARISTA_Detalle == '') {
          Message("Digite el nombre del comentarista", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/comentaristas/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "COMENTARISTA_Detalle=" + COMENTARISTA_Detalle + "&id_comentarista=" + id_comentarista,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  COMENTARISTA_Clear();
              }
              COMENTARISTA_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function COMENTARISTA_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/comentaristas/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function COMENTARISTA_Eliminar(id_comentarista) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/comentaristas/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_comentarista=" + id_comentarista,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un comentarista asociado a un evento.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              COMENTARISTA_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function COMENTARISTA_Editar(id_comentarista, COMENTARISTA_Detalle) {
      $("#id_comentarista").val(id_comentarista);
      $("#COMENTARISTA_Detalle").val(COMENTARISTA_Detalle);
      $("#COMENTARISTA_Detalle").focus();
  }

  function COMENTARISTA_Clear() {
      $("#id_comentarista").val('');
      $("#COMENTARISTA_Detalle").val('');
  }
  //PLANTA BAJA
  function PLANTA_BAJA_Save() {
      var id_planta_baja = $("#id_planta_baja").val();
      var PLANTA_BAJA_Detalle = $("#PLANTA_BAJA_Detalle").val();
      if (PLANTA_BAJA_Detalle == '') {
          Message("Digite el nombre del planta baja", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/planta_baja/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "PLANTA_BAJA_Detalle=" + PLANTA_BAJA_Detalle + "&id_planta_baja=" + id_planta_baja,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  PLANTA_BAJA_Clear();
              }
              PLANTA_BAJA_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function PLANTA_BAJA_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/planta_baja/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function PLANTA_BAJA_Eliminar(id_planta_baja) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/planta_baja/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_planta_baja=" + id_planta_baja,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un planta baja asociado a un evento.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              PLANTA_BAJA_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function PLANTA_BAJA_Editar(id_planta_baja, PLANTA_BAJA_Detalle) {
      $("#id_planta_baja").val(id_planta_baja);
      $("#PLANTA_BAJA_Detalle").val(PLANTA_BAJA_Detalle);
      $("#PLANTA_BAJA_Detalle").focus();
  }

  function PLANTA_BAJA_Clear() {
      $("#id_planta_baja").val('');
      $("#PLANTA_BAJA_Detalle").val('');
  }
  //DIRECTOR DE CAMARAS
  function DIR_CAMARAS_Save() {
      var id_camara = $("#id_camara").val();
      var DIR_CAMARAS_Detalle = $("#DIR_CAMARAS_Detalle").val();
      if (DIR_CAMARAS_Detalle == '') {
          Message("Digite el nombre del director de cámaras", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/dir_camaras/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "DIR_CAMARAS_Detalle=" + DIR_CAMARAS_Detalle + "&id_camara=" + id_camara,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  DIR_CAMARAS_Clear();
              }
              DIR_CAMARAS_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function DIR_CAMARAS_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/dir_camaras/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function DIR_CAMARAS_Eliminar(id_camara) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/dir_camaras/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_camara=" + id_camara,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un director de cámaras asociado a un evento.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              DIR_CAMARAS_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function DIR_CAMARAS_Editar(id_camara, DIR_CAMARAS_Detalle) {
      $("#id_camara").val(id_camara);
      $("#DIR_CAMARAS_Detalle").val(DIR_CAMARAS_Detalle);
      $("#DIR_CAMARAS_Detalle").focus();
  }

  function DIR_CAMARAS_Clear() {
      $("#id_camara").val('');
      $("#DIR_CAMARAS_Detalle").val('');
  }
  //PERIODISTAS
  function PERIODISTAS_Save() {
      var id_periodista = $("#id_periodista").val();
      var PERIODISTAS_Detalle = $("#PERIODISTAS_Detalle").val();
      if (PERIODISTAS_Detalle == '') {
          Message("Digite el nombre del periodista", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/periodistas/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "PERIODISTAS_Detalle=" + PERIODISTAS_Detalle + "&id_periodista=" + id_periodista,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  PERIODISTAS_Clear();
              }
              PERIODISTAS_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function PERIODISTAS_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/periodistas/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function PERIODISTAS_Eliminar(id_periodista) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/periodistas/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_periodista=" + id_periodista,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un periodista asociado a un evento.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              PERIODISTAS_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function PERIODISTAS_Editar(id_periodista, PERIODISTAS_Detalle) {
      $("#id_periodista").val(id_periodista);
      $("#PERIODISTAS_Detalle").val(PERIODISTAS_Detalle);
      $("#PERIODISTAS_Detalle").focus();
  }

  function PERIODISTAS_Clear() {
      $("#id_periodista").val('');
      $("#PERIODISTAS_Detalle").val('');
  }
  //DEPORTES
  function DEPORTES_Save() {
      var id_deporte = $("#id_deporte").val();
      var DEPORTES_Detalle = $("#DEPORTES_Detalle").val();
      if (DEPORTES_Detalle == '') {
          Message("Digite el nombre del deporte", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/deportes/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "DEPORTES_Detalle=" + DEPORTES_Detalle + "&id_deporte=" + id_deporte,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  DEPORTES_Clear();
              }
              DEPORTES_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function DEPORTES_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/deportes/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function DEPORTES_Eliminar(id_deporte) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/deportes/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_deporte=" + id_deporte,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un deporte asociado a un equipo.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              DEPORTES_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function DEPORTES_Editar(id_deporte, DEPORTES_Detalle) {
      $("#id_deporte").val(id_deporte);
      $("#DEPORTES_Detalle").val(DEPORTES_Detalle);
      $("#DEPORTES_Detalle").focus();
  }

  function DEPORTES_Clear() {
      $("#id_deporte").val('');
      $("#DEPORTES_Detalle").val('');
  }

  function DEPORTES_ModalEquipos(id_deporte, DEPORTES_Detalle) {
      $("#modal-preview-equipos").modal('show')
      $("#divBodyVistaPreviaEnvioSMS").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Cargando información... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/deportes/form_equipos.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_deporte=" + id_deporte + "&DEPORTES_Detalle=" + DEPORTES_Detalle,
          processData: true,
          success: function(msg) {
              $("#divBodyEquipos").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }

  function DEPORTES_DETALLE_SaveInfo(id_deporte) {
      var DEPORTES_DETALLE_IdEquipo = $("#DEPORTES_DETALLE_IdEquipo").val();
      var DEPORTES_DETALLE_NombreEquipo = $("#DEPORTES_DETALLE_NombreEquipo").val();
      if (DEPORTES_DETALLE_NombreEquipo == '') {
          Message("Digite el nombre del equipo", "", "warning")
          return false;
      }
      $("#div_DEPORTES_DETALLE_Equipos").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/deportes/guardar_equipos.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "DEPORTES_DETALLE_NombreEquipo=" + DEPORTES_DETALLE_NombreEquipo + "&DEPORTES_DETALLE_IdEquipo=" + DEPORTES_DETALLE_IdEquipo + "&id_deporte=" + id_deporte,
          success: function(msg) {
              $("#div_DEPORTES_DETALLE_Equipos").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  DEPORTES_Consultar()
                  DEPORTES_DETALLE_Clear();
              }
              DEPORTES_DETALLE_ConsultarEquipo(id_deporte);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error", "error")
          }
      });
  }

  function DEPORTES_DETALLE_ConsultarEquipo(id_deporte) {
      $("#div_DEPORTES_DETALLE_Equipos").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" >Cargando información... Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/deportes/form_consulta_equipos.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_deporte=" + id_deporte,
          processData: true,
          success: function(msg) {
              $("#div_DEPORTES_DETALLE_Equipos").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Server error. " + thrownError, "error")
          }
      });
  }

  function DEPORTES_DETALLE_Editar(id_equipo, nombre_equipo) {
      $("#DEPORTES_DETALLE_IdEquipo").val(id_equipo);
      $("#DEPORTES_DETALLE_NombreEquipo").val(nombre_equipo);
      $("#DEPORTES_DETALLE_NombreEquipo").focus();
  }

  function DEPORTES_DETALLE_Eliminar(id_equipo, id_deporte) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/deportes/eliminar_equipo.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_equipo=" + id_equipo,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un equipo asociado a un evento.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              DEPORTES_DETALLE_ConsultarEquipo(id_deporte)
                              DEPORTES_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function DEPORTES_DETALLE_Clear() {
      $("#DEPORTES_DETALLE_IdEquipo").val('');
      $("#DEPORTES_DETALLE_NombreEquipo").val('');
      $("#DEPORTES_DETALLE_NombreEquipo").focus();
  }
  //TELEVISIÓN
  function TV_Save() {
      var id_television = $("#id_television").val();
      var TV_Detalle = $("#TV_Detalle").val();
      if (TV_Detalle == '') {
          Message("Digite el nombre del canal de T.V.", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/tv/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "TV_Detalle=" + TV_Detalle + "&id_television=" + id_television,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  TV_Clear();
              }
              TV_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function TV_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/tv/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function TV_Eliminar(id_television) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/tv/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_television=" + id_television,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un canal de T.V. asociado a un evento.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              TV_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function TV_Editar(id_television, TV_Detalle) {
      $("#id_television").val(id_television);
      $("#TV_Detalle").val(TV_Detalle);
      $("#TV_Detalle").focus();
  }

  function TV_Clear() {
      $("#id_television").val('');
      $("#TV_Detalle").val('');
  }
  //ESTADIO
  function ESTADIO_Save() {
      var id_estadio = $("#id_estadio").val();
      var ESTADIO_Detalle = $("#ESTADIO_Detalle").val();
      var ESTADIO_CierraForm = $("#ESTADIO_CierraForm").val();
      var ESTADIO_Color = $("#ESTADIO_Color").val();
      if (ESTADIO_Detalle == '') {
          Message("Digite el nombre del estado", "", "warning")
          return false;
      }
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/estado_llamadas/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "ESTADIO_Detalle=" + ESTADIO_Detalle + "&id_estadio=" + id_estadio + "&ESTADIO_CierraForm=" + ESTADIO_CierraForm + "&ESTADIO_Color=" + ESTADIO_Color,
          success: function(msg) {
              $("#rpta").html('');
              if (msg == 0) {
                  Message("No se pudo procesar la información", "", "warning")
              } else {
                  Message("Información procesada correctamente", "", "success")
                  ESTADIO_Clear();
              }
              ESTADIO_Consultar();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function ESTADIO_Consultar() {
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "configuracion/estado_llamadas/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor", "error")
          }
      });
  }

  function ESTADIO_Eliminar(id_estadio) {
      swal({
          title: "¿Seguro de eliminar el registro seleccionado?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "configuracion/estado_llamadas/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_estadio=" + id_estadio,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No se puede eliminar un estado.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              ESTADIO_Consultar()
                          }
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function ESTADIO_Editar(id_estadio, ESTADIO_Detalle, ESTADIO_CierraForm, ESTADIO_Color) {
      $("#id_estadio").val(id_estadio);
      $("#ESTADIO_Detalle").val(ESTADIO_Detalle);
      $("#ESTADIO_CierraForm").val(ESTADIO_CierraForm);
      $("#ESTADIO_Color").val(ESTADIO_Color);
      $("#ESTADIO_Detalle").focus();
  }

  function ESTADIO_Clear() {
      $("#id_estadio").val('');
      $("#ESTADIO_Detalle").val('');
  }
  //metodos modulo: preguntas
  function PREGUNTAS_ConsultarPreguntas() {
      $.ajax({
          type: "POST",
          url: "campana/general/consultar.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          success: function(msg) {
              $("#rpta").html('');
              $("#consulta").html(msg);
              $("#BTN_PREGUNTAS_Guardar").removeAttr("disabled", true);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $("#BTN_PREGUNTAS_Guardar").removeAttr("disabled", true);
              $("#rpta").html('');
          }
      });
  }

  function PREGUNTAS_ClearForm() {
      $("#PREGUNTAS_id").val('')
      $("#PREGUNTAS_pregunta").val('')
  }

  function PREGUNTAS_SaveInfo() {
      var PREGUNTAS_id = $("#PREGUNTAS_id").val()
      var PREGUNTAS_pregunta = $("#PREGUNTAS_pregunta").val()
      if (PREGUNTAS_pregunta == '') {
          Message("Atención!", "Por favor, digite el nombre de la campaña.", "warning");
          return false;
      }
      $("#BTN_PREGUNTAS_Guardar").attr("disabled", true);
      $("#BTN_PREGUNTAS_Cancelar").attr("disabled", true);
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "campana/general/guardar.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id=" + PREGUNTAS_id + "&pregunta=" + PREGUNTAS_pregunta,
          processData: true,
          success: function(msg) {
              if (msg == 0) {
                  Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
              } else {
                  Message("Información registrada correctamente", "", "success")
                  $("#PREGUNTAS_id").val(msg);
                  PREGUNTAS_ConsultarPreguntas()
                  PREGUNTAS_ClearForm()
              }
              $("#rpta").html('');
              $("#BTN_PREGUNTAS_Guardar").removeAttr("disabled", true);
              $("#BTN_PREGUNTAS_Cancelar").removeAttr("disabled", true);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $("#BTN_PREGUNTAS_Guardar").removeAttr("disabled", true);
              $("#BTN_PREGUNTAS_Cancelar").removeAttr("disabled", true);
              $("#rpta").html('');
          }
      });
  }

  function UpdateEstadoPregunta(valor, id_pregunta) {
      $("#BTN_PREGUNTAS_Guardar").attr("disabled", true);
      $("#BTN_PREGUNTAS_Cancelar").attr("disabled", true);
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "campana/general/updateEstadoPregunta.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "id_pregunta=" + id_pregunta + "&valor=" + valor,
          success: function(msg) {
              if (msg == 0) {
                  Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
              } else {
                  Message("Información registrada correctamente", "", "success")
                  PREGUNTAS_ConsultarPreguntas();
              }
              $("#BTN_PREGUNTAS_Guardar").removeAttr("disabled", true);
              $("#BTN_PREGUNTAS_Cancelar").removeAttr("disabled", true);
              $("#rpta").html('')
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $("#BTN_PREGUNTAS_Guardar").removeAttr("disabled", true);
              $("#BTN_PREGUNTAS_Cancelar").removeAttr("disabled", true);
              $("#rpta").html('')
          }
      });
  }

  function PREGUNTAS_eliminar(id_pregunta, valor) {
      swal({
          title: "¿Seguro de eliminar esta plantilla?",
          text: valor,
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $("#BTN_PREGUNTAS_Guardar").attr("disabled", true);
              $("#BTN_PREGUNTAS_Cancelar").attr("disabled", true);
              $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
              $.ajax({
                  type: "POST",
                  url: "campana/general/eliminar.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_pregunta=" + id_pregunta,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          if (msg == 3) {
                              Message("No puede eliminar una plantilla DISPONIBLE.", "", "warning")
                          } else {
                              Message("Información eliminada correctamente", "", "success")
                              PREGUNTAS_ConsultarPreguntas();
                          }
                      }
                      $("#BTN_PREGUNTAS_Guardar").removeAttr("disabled", true);
                      $("#BTN_PREGUNTAS_Cancelar").removeAttr("disabled", true);
                      $("#rpta").html('')
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor.", "error")
                      $("#BTN_PREGUNTAS_Guardar").removeAttr("disabled", true);
                      $("#BTN_PREGUNTAS_Cancelar").removeAttr("disabled", true);
                      $("#rpta").html('')
                  }
              });
          } else {
              return false;
          }
      });
  }

  function PREGUNTAS_editar(id_pregunta, valor) {
      $("#PREGUNTAS_id").val(id_pregunta)
      $("#PREGUNTAS_pregunta").val(valor)
      $("#PREGUNTAS_pregunta").focus()
  }
  //funcion que arma el modal de las preguntas a rellenar para que salgan al usuario final
  function PREGUNTAS_LoadForms(IdPlantilla, Plantilla) {
      $('#myModal_forms').modal('show');
      $('#body_ModalPreguntas').html('');
      $.ajax({
          type: "POST",
          url: "campana/general/new_forms.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "IdPlantilla=" + IdPlantilla + "&Plantilla=" + Plantilla,
          success: function(msg) {
              $('#body_ModalPreguntas').html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $('#myModal_forms').modal('hide');
              $('#body_ModalPreguntas').html('');
          }
      });
  }

  function SaveInfoPlantillaE() {
      Message("Información registrada correctamente", "", "success")
  }

  function PREGUNTAS_LoadFormCargaArchivo(IdPlantilla, Plantilla) {
      $('#myModal_formsUpload').modal('show');
      $('#body_ModalLoadArchivo').html('');
      $.ajax({
          type: "POST",
          url: "campana/general/form_upload_archivo.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "IdPlantilla=" + IdPlantilla + "&Plantilla=" + Plantilla,
          success: function(msg) {
              $('#body_ModalLoadArchivo').html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $('#myModal_forms').modal('hide');
              $('#body_ModalPreguntas').html('');
          }
      });
  }
  //CONSOLA DE AGENTES
  function CONSOLA_AGENTE_ValidaPassword(extension_logueada, id_usuario_logueado) {
      var CONSOLA_AGENTE_Passw = $("#CONSOLA_AGENTE_Passw").val()
      if (CONSOLA_AGENTE_Passw == '') {
          Message("Digite la contraseña para continuar", "", "warning")
          return false;
      }
      $("#BTN_loginConsola").attr("disabled", true)
      $.ajax({
          type: "POST",
          url: "consola/agentes/valida_inicio_sesion.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "extension_logueada=" + extension_logueada + "&CONSOLA_AGENTE_Passw=" + CONSOLA_AGENTE_Passw,
          success: function(msg) {
              if (msg == 0) { //no-login
                  Message("No se pudo validar este usuario. Verifique", "", "warning")
              } else { //login
                  if (msg == 'sesion_activa') {
                      swal({
                          title: "Actualmente tiene una sesión activa. Al continuar se cerrará e iniciará una nueva.",
                          icon: "warning",
                          buttons: true,
                          dangerMode: true,
                      }).then((isConfirm) => {
                          if (isConfirm) {
                              $.ajax({
                                  type: "POST",
                                  url: "consola/agentes/cerrar_sesion.php",
                                  contentType: "application/x-www-form-urlencoded",
                                  processData: true,
                                  data: "id_usuario_logueado=" + id_usuario_logueado,
                                  success: function(msg) {
                                      if (msg == 0) {
                                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                                      } else {
                                          Message("Información procesada correctamente", "", "success")
                                      }
                                  },
                                  error: function(xhr, ajaxOptions, thrownError) {
                                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                                  }
                              });
                          } else {
                              return false;
                          }
                      });
                  } else {
                      Message("Bienvenido. Ahora puede realizar llamadas.", "", "success")
                      $("#PanelPrincipalConsolaAgente").html("");
                      msg = msg.split(",");
                      var id_sesion = msg[0];
                      var time_login = msg[1];
                      CONSOLA_AGENTE_LoadConsolaPostLogin(extension_logueada, id_sesion, time_login)
                  }
              }
              $("#BTN_loginConsola").removeAttr("disabled", true)
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $("#BTN_loginConsola").removeAttr("disabled", true)
          }
      });
  }

  function CONSOLA_AGENTE_LoadConsolaPostLogin(extension_logueada, id_sesion, time_login) {
      $("#PanelPrincipalConsolaAgente").html("<center><div class='fa-3x'><i class='fas fa-spinner fa-spin'></i> </div><br><h3>Cargando Información... Espere.</h3></center>");
      $.ajax({
          type: "POST",
          url: "consola/agentes/consultar_asignaciones.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "extension_logueada=" + extension_logueada + "&id_sesion=" + id_sesion + "&time_login=" + time_login,
          success: function(msg) {
              $('#PanelPrincipalConsolaAgente').html(msg);
              $("#ExpanConsolaAgente").click();
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
          }
      });
  }

  function CONSOLA_AGENTE_LoadDatosEstudiantes(extension) {
      $("#loadDatosAgenteUsuarios").html("<center><div class='fa-3x'><i class='fas fa-spinner fa-spin'></i> </div><br><h3>Cargando Información... Espere.</h3></center>");
      $.ajax({
          type: "POST",
          url: "consola/agentes/consultar_datos_por_extension.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "extension=" + extension,
          success: function(msg) {
              $('#loadDatosAgenteUsuarios').html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
          }
      });
  }

  function CONSOLA_AGENTE_LoadFormEstadoLlamadas(id_dato_estudiante, extension, id_plantilla, celular, nombre_estudiante, programa_terminal, periodo_ingreso, semestre, tipo_estudiante, estado_matricula) {
      $('#body_ModalEstadoLlamada').html("<center><div class='fa-2x'><i class='fas fa-spinner fa-spin'></i> </div><br><h3>Realizando llamada... Espere.</h3></center>");
      $('#myModal_FormEstadoLlamada').modal({
          backdrop: 'static',
          keyboard: false
      });
      $('#myModal_FormEstadoLlamada').modal('show');
      $.ajax({
          type: "POST",
          url: "consola/agentes/form_estado_llamadas.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "id_plantilla=" + id_plantilla + "&id_dato_estudiante=" + id_dato_estudiante + "&extension=" + extension + "&celular=" + celular + "&nombre_estudiante=" + nombre_estudiante + "&programa_terminal=" + programa_terminal + "&periodo_ingreso=" + periodo_ingreso + "&semestre=" + semestre + "&tipo_estudiante=" + tipo_estudiante + "&estado_matricula=" + estado_matricula,
          success: function(msg) {
              $('#body_ModalEstadoLlamada').html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $('#myModal_FormEstadoLlamada').modal('hide');
          }
      });
  }

  function CONSOLA_AGENTE_AbreFormPreguntas(id_dato_estudiante, id_plantilla, extension) {
      var CONSOLA_AGENTE_EstadoLlamada = $("#CONSOLA_AGENTE_EstadoLlamada").val()
      if (CONSOLA_AGENTE_EstadoLlamada == '') {
          Message("Seleccione un estado de llamada para continuar", "", "warning")
          return false;
      }
      CONSOLA_AGENTE_EstadoLlamada = CONSOLA_AGENTE_EstadoLlamada.split(',');
      var id_estado_llamada = CONSOLA_AGENTE_EstadoLlamada[0];
      var abre_form = CONSOLA_AGENTE_EstadoLlamada[1];
      switch (abre_form) {
          case 'SI':
              $.ajax({
                  type: "POST",
                  url: "consola/agentes/save_estado_llamada_no.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_estado_llamada=" + id_estado_llamada + "&id_dato_estudiante=" + id_dato_estudiante + "&id_plantilla=" + id_plantilla,
                  success: function(msg) {
                      if (msg == 1) {
                          $('#myModal_FormEstadoLlamada').modal('hide'); //cierro el formulario de estado de contacto y abro el de preguntas
                          CONSOLA_AGENTE_LoadDatosEstudiantes(extension) //actualizo la info en la parte de atrás la general.
                          //aqui abro el formulario de preguntas
                          CONSOLA_AGENTE_openFormPlantillaPreguntas(id_dato_estudiante, id_plantilla, extension);
                      } else {
                          Message("Ocurrió algo al momento de procesar la información!", "", "error")
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor.", "error")
                  }
              });
              break;
          case 'NO': //si la respuesta es no, solo guardo el estado de la llamada y cierro el formulario
              $.ajax({
                  type: "POST",
                  url: "consola/agentes/save_estado_llamada_no.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_estado_llamada=" + id_estado_llamada + "&id_dato_estudiante=" + id_dato_estudiante + "&id_plantilla=" + id_plantilla,
                  success: function(msg) {
                      if (msg == 1) {
                          Message("Información procesada correctamente!", "", "success")
                          $('#myModal_FormEstadoLlamada').modal('hide');
                          CONSOLA_AGENTE_LoadDatosEstudiantes(extension)
                      } else {
                          Message("Ocurrió algo al momento de procesar la información!", "", "error")
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor.", "error")
                  }
              });
              break;
      }
  }

  function CONSOLA_AGENTE_openFormPlantillaPreguntas(id_dato_estudiante, id_plantilla, extension) {
      $('#body_ModalformPreguntas').html("<center><div class='fa-2x'><i class='fas fa-spinner fa-spin'></i> </div><br><h3>Cargando datos del formulario... Espere.</h3></center>");
      $('#myModal_FormularioPreguntas').modal({
          backdrop: 'static',
          keyboard: false
      });
      $('#myModal_FormularioPreguntas').modal('show');
      $("#myModal_FormularioPreguntas").css("padding-left", "20%");
      /*var myOffcanvas = document.getElementById('offcanvasEstudiantes')
      var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
      bsOffcanvas.show()*/
      //$("#offcanvasEstudiantes").addClass("show");
      //("#offcanvasEstudiantes").removeClass("show");
      $.ajax({
          type: "POST",
          url: "consola/agentes/form_preguntas_plantilla.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "extension=" + extension + "&id_dato_estudiante=" + id_dato_estudiante + "&id_plantilla=" + id_plantilla,
          success: function(msg) {
              $("#body_ModalformPreguntas").html(msg);
              //$("#offcanvasEstudiantes").addClass("show");
              var myOffcanvas = document.getElementById('offcanvasEstudiantes')
              var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
              bsOffcanvas.show()
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
          }
      });
  }

  function CONSOLA_AGENTE_CerrarSesion(id_sesion) {
      swal({
          title: "¿Desea cerrar la sesión?.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      }).then((isConfirm) => {
          if (isConfirm) {
              $.ajax({
                  type: "POST",
                  url: "consola/agentes/cerrar_sesion_agente.php",
                  contentType: "application/x-www-form-urlencoded",
                  processData: true,
                  data: "id_sesion=" + id_sesion,
                  success: function(msg) {
                      if (msg == 0) {
                          Message("Error!", "Algunos datos no se pudieron procesar. Por favor, revise.", "error")
                      } else {
                          Message("Se ha finalizado su sesión. Por favor, espere unos segundos.", "", "success")
                          //window.location.href = window.location.href
                          setTimeout(function() {
                              window.location.href = window.location.href
                          }, 4000);
                      }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                      Message("UPS!", "Error en el servidor. " + thrownError, "error")
                  }
              });
          } else {
              return false;
          }
      });
  }

  function CONSOLA_AGENTE_ActivaDescanso(extension, total_descanso) {
      $("#loadDatosAgenteUsuarios").html("<center><div class='fa-3x'><i class='fas fa-spinner fa-spin'></i> </div><br><h3>Cargando Información... Espere.</h3></center>");
      $.ajax({
          type: "POST",
          url: "consola/agentes/form_descanso.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "extension=" + extension + "&total_descanso=" + total_descanso,
          success: function(msg) {
              $('#loadDatosAgenteUsuarios').html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
          }
      });
  }

  function CONSOLA_AGENTE_HistorialLlamadas(id_dato_estudiante, id_plantilla) {
      $("#DivHistorialLlamadas").html("<center><div class='fa-3x'><i class='fas fa-spinner fa-spin'></i> </div><br><h3>Cargando Información... Espere.</h3></center>");
      $.ajax({
          type: "POST",
          url: "consola/agentes/form_historial.php",
          contentType: "application/x-www-form-urlencoded",
          processData: true,
          data: "id_dato_estudiante=" + id_dato_estudiante + "&id_plantilla=" + id_plantilla,
          success: function(msg) {
              $('#DivHistorialLlamadas').html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
          }
      });
  }

  function saveInfoUserEncuesta(id_dato_estudiante, extension, id_plantilla) {
      var radio_coma = ',';
      var checkbox_coma = ',';
      var select_coma = ',';
      var text_coma = ',';
      $('input:radio').each(function() {
          if ($(this).is(':checked')) {
              radio = $(this).attr('id');
              if ((radio != 'tarea') && (radio != 'reunion')) {
                  if (radio_coma == ',') {
                      radio_coma = $(this).attr('id');
                  } else {
                      radio_coma = radio_coma + ',' + $(this).attr('id');
                  }
              }
          }
      });
      $("input:checkbox:checked").each(function() {
          if (checkbox_coma == ',') {
              checkbox_coma = $(this).attr('id');
          } else {
              checkbox_coma = checkbox_coma + ',' + $(this).attr('id');
          }
      });
      $("select[name=select_respuesta]").each(function(idx) {
          var id_select = $(this).attr('id'); //OBTENGO EL ID DEL SELECT
          var value_select = $("#" + id_select).val(); //AQUI SE OBTIENE EL VALOR DEL SELECT SELECCIONADO
          if (value_select != '') { //aqui va todo
              if (select_coma == ',') {
                  select_coma = id_select + '_' + value_select;
              } else {
                  select_coma = select_coma + ',' + id_select + '_' + value_select;
              }
          } //fin if value_select
      });
      $("input[name=text_group]").each(function(idx) {
          var id_text = $(this).attr('id'); //OBTENGO EL ID DEL SELECT
          var value_text = $("#" + id_text).val(); //AQUI SE OBTIENE EL VALOR DEL SELECT SELECCIONADO
          if (value_text != '') { //aqui va todo
              if (text_coma == ',') {
                  text_coma = id_text + '_' + value_text;
              } else {
                  text_coma = text_coma + ',' + id_text + '_' + value_text;
              }
          } //fin if value_select
      });
      var observaciones = $("#observacionesUser").val()
      $("#rpta").html('<div class="col-md-12"><div class = "progress rounded-pill mb-2" > <div class = "progress-bar bg-red progress-bar-striped progress-bar-animated rounded-pill fs-10px fw-bold" style = "width: 100%" > Procesando informacion...Espere </div> </div> </div>');
      $.ajax({
          type: "POST",
          url: "consola/agentes/guardar_respuestas.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_dato_estudiante=" + id_dato_estudiante + "&extension=" + extension + "&id_plantilla=" + id_plantilla + "&radio_coma=" + radio_coma + "&checkbox_coma=" + checkbox_coma + "&select_coma=" + select_coma + "&text_coma=" + text_coma + "&observaciones=" + observaciones,
          processData: true,
          success: function(msg) {
              if (msg == 3) {
                  Message("Ya registró la encuesta para la cita seleccionada!", "", "warning")
              } else {
                  if (msg == 1) {
                      Message("Información procesada correctamente!", "", "success")
                      CONSOLA_AGENTE_LoadObservaciones();
                      $("#observacionesUser").val('');
                  } else {
                      Message("Ocurrió algo al momento de procesar la informacion", "", "error")
                  }
              }
              $("#rpta").html('');
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $("#rpta").html('')
          }
      });
  }

  function CONSOLA_AGENTE_Agendamiento(id_dato_estudiante, extension, id_plantilla) {
      $('#myModal_FormAgendamiento').modal({
          backdrop: 'static',
          keyboard: false
      });
      $('#myModal_FormAgendamiento').modal('show');
      $('#body_ModalAgendamiento').html("<center><div class='fa-2x'><i class='fas fa-spinner fa-spin'></i> </div><br><h3>Cargando información... Espere.</h3></center>");
      $.ajax({
          type: "POST",
          url: "consola/agentes/form_agendamiento.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_dato_estudiante=" + id_dato_estudiante + "&extension=" + extension + "&id_plantilla=" + id_plantilla,
          processData: true,
          success: function(msg) {
              $("#body_ModalAgendamiento").html(msg);
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $('#myModal_FormAgendamiento').modal('hide');
          }
      });
  }

  function getFechaJquery() {
      var fechaActual = new Date();
      // Obtenemos los componentes de la fecha (día, mes y año)
      var dia = fechaActual.getDate();
      var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses comienzan en 0
      var anio = fechaActual.getFullYear();
      // Formateamos la fecha como "dd/mm/yyyy" (puedes cambiar el formato según tus preferencias)
      var fechaFormateada = anio + '-' + mes + '-' + dia;
      // Mostramos la fecha en el elemento con id "fecha_actual"
      //$('#fecha_actual').text('Fecha actual: ' + fechaFormateada);
      return fechaFormateada;
  }

  function CONSOLA_AGENTE_SaveAgendamiento(id_dato_estudiante, extension, id_plantilla) {
      var CONSOLDA_AGENDAMIENTO_fechaagenda = $("#CONSOLDA_AGENDAMIENTO_fechaagenda").val();
      var CONSOLDA_AGENDAMIENTO_horainicial_hora = $("#CONSOLDA_AGENDAMIENTO_horainicial_hora").val();
      var CONSOLDA_AGENDAMIENTO_horainicial_minutos = $("#CONSOLDA_AGENDAMIENTO_horainicial_minutos").val();
      var CONSOLDA_AGENDAMIENTO_horafinal_hora = $("#CONSOLDA_AGENDAMIENTO_horafinal_hora").val();
      var CONSOLDA_AGENDAMIENTO_horafinal_minutos = $("#CONSOLDA_AGENDAMIENTO_horafinal_minutos").val();
      if (CONSOLDA_AGENDAMIENTO_fechaagenda < getFechaJquery()) {
          Message("La fecha de agendamiento debe ser mayor o igual a la de hoy", "", "warning")
          return false;
      }
      if (CONSOLDA_AGENDAMIENTO_horainicial_hora > CONSOLDA_AGENDAMIENTO_horafinal_hora) {
          Message("La hora inicial no puede ser mayor a la final", "", "warning")
          return false;
      }
      if (CONSOLDA_AGENDAMIENTO_horainicial_minutos > CONSOLDA_AGENDAMIENTO_horafinal_minutos) {
          Message("La hora inicial no puede ser mayor a la final", "", "warning")
          return false;
      }
      $("#BTN_PREGUNTAS_GuardarAgendamiento").attr('disabled', true)
      //
      $('#rptaAgendamiento').html("<center><div class='fa-2x'><i class='fas fa-spinner fa-spin'></i> </div><br><h3>Procesando información... Espere.</h3></center>");
      $.ajax({
          type: "POST",
          url: "consola/agentes/save_agendamiento.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_dato_estudiante=" + id_dato_estudiante + "&extension=" + extension + "&id_plantilla=" + id_plantilla + "&CONSOLDA_AGENDAMIENTO_fechaagenda=" + CONSOLDA_AGENDAMIENTO_fechaagenda + "&CONSOLDA_AGENDAMIENTO_horainicial_hora=" + CONSOLDA_AGENDAMIENTO_horainicial_hora + "&CONSOLDA_AGENDAMIENTO_horainicial_minutos=" + CONSOLDA_AGENDAMIENTO_horainicial_minutos + "&CONSOLDA_AGENDAMIENTO_horafinal_hora=" + CONSOLDA_AGENDAMIENTO_horafinal_hora + "&CONSOLDA_AGENDAMIENTO_horafinal_minutos=" + CONSOLDA_AGENDAMIENTO_horafinal_minutos,
          processData: true,
          success: function(msg) {
              if (msg == 1) {
                  Message("Agendamiento realizado correctamente", "", "success")
                  CONSOLA_AGENTE_LoadDatosEstudiantes(extension)
                  $('#myModal_FormAgendamiento').modal('hide');
              } else {
                  if (msg == 2) {
                      Message("Ya se encuentra un agendamiento para los datos seleccionados. Verifique", "", "warning")
                  } else {
                      Message("No se pudo agendar.", "", "error")
                  }
              }
              $("#rptaAgendamiento").html('');
              $("#BTN_PREGUNTAS_GuardarAgendamiento").removeAttr('disabled', true)
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
              $('#myModal_FormAgendamiento').modal('hide');
              $("#BTN_PREGUNTAS_GuardarAgendamiento").removeAttr('disabled', true)
          }
      });
  }

  function CONSOLA_AGENTES_ACtualizaAgendamiento(id_agendamiento, extension) {
      $.ajax({
          type: "POST",
          url: "consola/agentes/update_estado_agendamiento.php",
          contentType: "application/x-www-form-urlencoded",
          data: "id_agendamiento=" + id_agendamiento,
          processData: true,
          success: function(msg) {
              if (msg == 1) {
                  Message("Agendamiento actualizado correctamente", "", "success")
                  CONSOLA_AGENTE_LoadDatosEstudiantes(extension)
              } else {
                  Message("No se pudo actualizar el estado de la agenda.", "", "error")
              }
          },
          error: function(xhr, ajaxOptions, thrownError) {
              Message("UPS!", "Error en el servidor.", "error")
          }
      });
  }

  //DIGITURNO 

 function LoadInformacionSetup(url,div){
    $("#"+div).html(' <span class="text-center"> <div class="fa-3x"> <i class="fas fa-spinner fa-pulse"></i> </div> <span class="text-warning"><h2> Cargando... Espere... </h2> </span> </span>');
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/x-www-form-urlencoded",
        //data: "opcion=" + opcion + "&lang=" + lang,
        processData: true,
        success: function(msg) {
            $("#"+div).html(msg);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            Message("UPS!", "Server Error ", "error")
        }
    });
}

function guardarEmpresas(){

}

function eliminarEmpresas(id_empresa){

}

function BuscarEmpresas(){
    $("#modalEmpresas").modal('show');
    $("#divModalFormEmpresas").html(' <span class="text-center"> <div class="fa-3x"> <i class="fas fa-spinner fa-pulse"></i> </div> <span class="text-warning"><h2> Cargando... Espere... </h2> </span> </span>');
    $.ajax({
        type: "POST",
        url: "configuracion/setup/empresas/consultar.php",
        contentType: "application/x-www-form-urlencoded",
        //data: "opcion=" + opcion + "&lang=" + lang,
        processData: true,
        success: function(msg) {
            $("#divModalFormEmpresas").html(msg);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            Message("UPS!", "Server Error ", "error")
        }
    });
}


function validaCamposEmpresas(){
    var nit_empresa = $("#nit_empresa").val()
    if(nit_empresa==""){
        alert("digite nit")
        return false;
    }
}

function PasarASedes(){
   // if(validaCamposEmpresas()) return false;
    //alert("Voy pa la sede")
    $("#tab_empresa").removeClass("active");
    $("#default-tab-1").removeClass("active show");


    $("#tab_sedes").addClass("active");
    $("#default-tab-2").addClass("active show");
    
}

function PasarAEmpresas(){
    $("#tab_sedes").removeClass("active");
    $("#default-tab-2").removeClass("active show");
    $("#tab_empresa").addClass("active");
    $("#default-tab-1").addClass("active show");
  }
