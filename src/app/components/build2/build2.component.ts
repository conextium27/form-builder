import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Routes, RouterModule } from "@angular/router";
import { HeroService } from '../services/hero.service';
import { CoCatalog } from '../../models/co-catalog';
import Swal from 'sweetalert2';
import * as swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-build2',
  templateUrl: './build2.component.html',
  styleUrls: ['./build2.component.sass']
})
export class Build2Component implements OnInit {


  dataModel: CoCatalog[];

  ques: any[] = [{
    "id": 25,
    "name": "Texto informativo",
    "icon": "fa-heading"
  },
  {
    "id": 24,
    "name": "Texto",
    "icon": "fa-text-width"
  },
  {
    "id": 19,
    "name": "Opción única",
    "icon": "fa-check-circle"
  },
  {
    "id": 20,
    "name": "Opción multiple",
    "icon": "fa-check-double"
  }
  ];


  constructor(
    private configService: HeroService
  ) {
    this.getCoCatalog();
  }

  ngOnInit() {
    this.configService.classMenu = 'close_nav';
    
    $(document).ready(function () {
    var encuesta:any = {};
    var data = [];
    var count = 1;

    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        ((''+month).length<2 ? '0' : '') + month + '-' +
        ((''+day).length<2 ? '0' : '') + day;

            encuesta = {
                                "survey_id": null,
                                "survey_type_id": 2,
                                "status": 1,
                                "name": "Test Zeus",
                                "creation_date": output,
                                "environment": 2,
                                "locked_user_id": 777,
                                "owner_id": 4,
                                "platform": 7,
                                "sections": [
                                    {
                                        "section_id": null,
                                        "survey_id": null,
                                        "title": "Sección I",
                                        "alias": "S1",
                                        "position": 1,
                                        "status": 1,
                                        "questions": []
                                    }
                                ]

            };

            data.push(encuesta);
            localStorage.setItem('itemsArray', JSON.stringify(data));

      $('#main-area').bind("mouseenter mouseleave",function(){
          countparent();
      });
      $("#25").draggable({
          helper: function () {
              return getTitleFieldHTML();
          },
          connectToSortable: ".form_builder_area"
      });
      $("#24").draggable({
          helper: function () {
              return questionTextopen();
          },
          connectToSortable: ".form_builder_area"
      });
      $("#19").draggable({
          helper: function () {
              return getRadioFieldHTML();
          },
          connectToSortable: ".form_builder_area"
      });
      $("#20").draggable({
          helper: function () {
              return getCheckboxFieldHTML();
          },
          connectToSortable: ".form_builder_area"
      });

      $(".form_builder_area").sortable({
          cursor: 'move',
          placeholder: "placeholder",
          addClasses: true,
          start: function (e, ui) {
              ui.placeholder.height(ui.helper.outerHeight());
          },
          stop: function (ev, ui) {
              getPreview();
          }
      });
      $(".form_builder_area").disableSelection();
      function countparent(){
          $("#main-area").children("div").each(function(i){
              $(this).find(".child").html("P" + (++i))
          });
           
      }

      $("#sendSurvey").on("click", function(){
        var item = JSON.parse(localStorage.getItem("itemsArray"));
        console.log(item);
                Swal({
                    title: '¿Estas seguro de enviar la encuesta?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Enviar!'
                }).then((result) => {
                    if (result.value) {
                        Swal(
                            'Enviado!',
                            'tu encuesta ha sido enviada con exito.',
                            'success'
                          )
                      console.log("enviado");
                    //    $.ajax({                                       
                    //     url: "http://10.89.49.10:8093/save",         
                    //     type : "POST",                              
                    //     dataType : "json",                                              
                    //     contentType : "application/json",          
                    //     data : JSON.stringify(item),                                            
                    //     success : function(response) {               
                    //       console.log(response);                   
                    //     },                                         
                    //     error: function(response) {         
                    //       console.log(response);          
                    //     }                                          
                    // }) ;
                    }else{
                        console.log("no enviado");
                    }
                }); 
               
            localStorage.clear();                                          
      });
      function getTitleFieldHTML() {
        // $("#contain_" + field).hide();
          var field = generateField();
          $.ajax({
                        url: "http://10.89.49.10:8093/getComponents", 
                        type: "GET", 
                        dataType: "json", 
                        success: function (data) {
                            $.each(data[3].validations, function(key, item) {
                                    var checkBox = "<input  id='" + item.validation_id + "' type='checkbox' name='selector[]'value='" + item.validation_id + "' />" + "<div style='color:#fff'>" + item.descripcion + "</div>";
                                    $(checkBox).appendTo('#check');
                            });
                        } 
          });  
            $(document).ready(function(){         
                $("#summaryInput").hide();
            }).on("change", "#20", function() {
                if(this.checked) {
                    $("#summaryInput").show();
                } else {  
                    $("#summaryInput").hide();
                }
            });

            $(document).ready(function(){
            }).on("submit", ".sendText", function(e) {
                e.preventDefault();
                alert(this.id);return;
                var id = "#sendText" + this.id.split("_")[1];
                var validations = [];
                var listForm = [];                                    
                
                $(id + " input[type=checkbox]").each(function(){
                    if( this.checked ) {
                        validations.push({validation_id: this.id, value: 1});
                    } 
                });
                
                var model = {
                    question_id: 25,                       
                    section_id: 1,                        
                    question_subtype_id: 23,              
                    text: $(id + " .tit").val(),                
                    instructions: null,                   
                    alias: $(".child").html(),            
                    position: 1,                          
                    level: 1  ,                           
                    validations: validations                    
                };     
                                
                encuesta.sections[0].questions.push(model);
                localStorage.setItem("itemsArray", JSON.stringify(encuesta));

                Swal({
                    type: 'success',
                    title: 'Pregunta Guardada',
                    showConfirmButton: false,
                    timer: 2000
                  })
                  localStorage.removeItem("informativeText");
            });

    
           
        
          var html =  '<div class="all_div">' +
                          '<div class="row li_row" >' +
                              '<div class="col-12" >'
                                  + getHeader(4, field) + 
                              '</div>'+
                              '<h6 id="result_' + field + '" class="col-12" ></h6> '+
                          '</div>'+
                      '</div> ' +
                      '<div> ' +
                      '<script>' +
                      'function myFunction() { ' +
                        'document.getElementById("result_'+ field +'").innerHTML = document.getElementById("title_'+ field +'").value '+ 
                      '} '+
                      '</script>'+
                      
                        '<div  id="contain_' + field + '" class="form_builder " ' +
                            'style=" position: fixed; ' + 
                            'float: right; '+
                            'right: 0px;'+
                            'top: 57px;'+ 
                            'width: 25%;' +
                            'background: #3e4652; '+
                            'line-height: 18px !important; ' +
                            'margin: 0 !important; ' +
                            'padding: 16px 48px 14px 18px; "> ' +
                            
                            '<div class="row">' +
                                '<div class="col-md-12">' +
                                    '<div class="">' +
                                        '<h4>' +
                                            '<span style="color:#fff;font-weight: 350;">Configuración de campo</span>' +
                                            '<span data-field="' + field + '"  class="hidden_bal_field"  ' +
                                                 'style="cursor: pointer;'+
                                                 'font-size: 30px;'+
                                                 'width: 48px;'+
                                                 'text-align: center; '+
                                                 'color: #fff; '+
                                                 'right: -40px; '+
                                                 'position: absolute; '+
                                                 'top: -4px;">' +
                                            '<i class="fas fa-times"></i>' +
                                            '</span>' +
                                        '</h4>' +
                                        '<div >' +
                                        '<hr/> '+
                                        
                                        '<form id="sendText' + field + '" class="sendText">'+
                                        '<span style="color:#fff;font-size: 15pt;position: relative;left: -100px;top: -10px;">Título</span>' +
                                        '<div class="row li_row form_output" data-type="title" data-field="' + field + '"> ' +
                                            '<div class="col-md-12"> ' +
                                                '<div class="form-group"> '+
                                                    '<input id="title_'+ field +'"  value="" onkeyup="myFunction()" type="text" name="label_' + field + '" class="form-control form_input_label tit" placeholder="Texto informativo" data-field="' + field + '"/> ' +
                                                '</div>'+
                                            '</div> ' +
                                            '<div class="col-md-12">'+
                                                     '<div id="check"></div>'+
                                            '</div>'+
                                                '<div id="summaryInput" class="form-group"> ' +
                                                    '<div class="col-md-12"> '+
                                                        '<span style="color:#fff;font-size: 11pt;position: relative;left: 0px;top: 0px;"> '+ 
                                                            'Alias para pregunta en resumen de inventario</span>' +
                                                         '<input type="text" name="inventario" class="form-control form_input_label" placeholder="Texto informativo" /> ' +
                                                     '</div>'+
                                                '</div> ' +
                                            '<div class="col-md-12">'+
                                                    '<button id="submit_' + field + '" type="submit" class="btn btn-success">Guardar Pregunta</button>'+
                                                    '</div>'+
                                            '</div>'+
                                        '</form>'+
                                        '</div>'+
                                        '</div>' +
                                    '</div>'
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' ;
                    
                     return $('<div>').addClass('li_' + field)
                    .css('background', '#eee')
                    .css('padding', '10px')
                    .css('margin-top', '10px')
                    .css('height', 'auto')
                    .css('width', '100%').html(html);
                    
                    
                    
          
      }
      function questionTextopen() {

          var field = generateField();
          $.ajax({
            url: "http://10.89.49.10:8093/getComponents", 
            type: "GET", 
            dataType: "json", 
            success: function (data) {
                $.each(data[2].validations, function(key, item) {
                        var checkBox = "<input  id='" + item.validation_id + "' type='checkbox' name='selector[]'value='" + item.validation_id + "' />" + "<div style='color:#fff'>" + item.descripcion + "</div>";
                        $(checkBox).appendTo('#check');
                });
            } 
          }); 
          $(document).ready(function(){         
            $("#summaryInput").hide();
        }).on("change", "#21", function() {
            if(this.checked) {
                $("#summaryInput").show();
            } else {  
                $("#summaryInput").hide();
            }
        }); 
        $(document).ready(function(){
        }).on("submit", "#sendText", function(e) {      
            e.preventDefault();
            var test = localStorage.getItem("questionOpen");         
            var validations = [];
            var listForm = [];                                    
            $("input[type=checkbox]").each(function(){ if( this.checked ) {validations.push({validation_id: this.id, value: 1});} });
            var model = {
                        question_id: 25,                       
                        section_id: 1,                        
                        question_subtype_id: 23,              
                        text: $(".tit").val(),                
                        instructions: null,                   
                        alias: $(".child").html(),            
                        position: 1,                          
                        level: 1  ,                           
                        validations: validations                    
                };     
                            
                encuesta.sections[0].questions.push(model);
                localStorage.setItem("itemsArray", JSON.stringify(encuesta));

            if(test){                                       
            listForm= JSON.parse(test);                  
            }                                                 
            listForm.push(model);
            localStorage.setItem("questionOpen",JSON.stringify(listForm));  
            Swal({
                type: 'success',
                title: 'Pregunta Guardada',
                showConfirmButton: false,
                timer: 2000
              })

              localStorage.removeItem("questionOpen");
        });

        var html = '<div class="all_div">' +
                        '<div class="row li_row" >' +
                            '<div class="col-12" >'
                                + getHeader(4, field) + 
                            '</div>'+
                            '<h6 id="result_' + field + '" class="col-12" ></h6> '+
                            
                        '</div>'+
                    '</div> ' +
                    '<script>' +
                'function myFunction() { ' +
                    'document.getElementById("result_'+ field +'").innerHTML = document.getElementById("title_'+ field +'").value '+ 
                '} '+
                '</script>'+
                '<div id="contain_' + field + '" '+ 
                    'style=" position: fixed; ' + 
                    'float: right; '+
                    'right: 0px;'+
                    'top: 57px;'+ 
                    'width: 25%;' +
                    'background: #3e4652; '+
                    'line-height: 18px !important; ' +
                    'margin: 0 !important; ' +
                    'padding: 16px 48px 14px 18px; "> ' +
                    '<h4>' +
                    '<span style="color:#fff;font-weight: 350;">Configuración de campo</span>' +
                    '<span data-field="' + field + '"  class="hidden_bal_field"  ' +
                        'style="cursor: pointer;'+
                        'font-size: 30px;'+
                        'width: 48px;'+
                        'text-align: center; '+
                        'color: #fff; '+
                        'right: 0px; '+
                        'position: absolute; '+
                        'top: 10px;">' +
                    '<i class="fas fa-times"></i>' +
                    '</span>' +
                    '</h4>' +
                    '<hr/>'+
                    '<form id="sendText' + field + '" class="sendText">'+
                    '    <div class="row li_row form_output" data-type="text" data-field="' + field + '" style=" overflow-y: scroll; height: 500px; overflow-x: hidden; ">'+                                                                    
                    '        <div class="col-md-12">'+                                                                                                                                
                    '            <div class="form-group">'+
                    '                <input type="text" id="title_'+ field +'" onkeyup="myFunction()" name="label_' + field + '" class="form-control form_input_label tit"'+
                    '                    value="" placeholder="Título de la pregunta" data-field="' + field + '" />'+
                    '            </div>'+
                    '        </div>'+
                    '        <div class="col-md-12">'+
                    '            <div class="form-group">'+
                    '                <input type="text" name="placeholder_' + field + '" data-field="' + field + '" class="form-control form_input_placeholder"'+
                    '                    placeholder="Ayuda de la pregunta" />'+
                    '            </div>'+
                    '        </div>'+
                    '        <div class="col-md-12 m-1">'+
                    '            <div class="form-group">'+
                    '                <div class="control-group">'+
                    '                    <label class="control-label" for="multipleradios-0" style="color:#fff">Tipo de Pregunta</label>'+
                    '                    <select class="form-control">'+
                    '                        <option>Texto</option>'+
                    '                        <option>Números enteros</option>'+
                    '                        <option>Números decimales</option>'+
                    '                    </select>'+
                    '                </div>'+
                    '            </div>'+
                    '        </div>'+
                    '        <div class="col-md-12">'+
                    '            <div id="check"></div>'+
                    '        </div>'+
                    '        <div id="summaryInput" class="form-group"> ' +
                    '               <div class="col-md-12"> '+
                    '                   <span style="color:#fff;font-size: 11pt;position: relative;left: 0px;top: 0px;"> '+ 
                    '                       Alias para pregunta en resumen de inventario</span>' +
                    '                       <input type="text" name="inventario" class="form-control form_input_label" placeholder="Texto informativo" /> ' +
                    '               </div>'+
                    '       </div> ' +
                    '        <div class="col-md-12">'+
                    '            <button id="submit" type="submit" class="btn btn-success">Guardar Pregunta</button>'+
                    '        </div>'+
                    '    </div>'+
                    '</form>';

          return $('<div>').addClass('li_' + field)
          .css('background', '#eee')
          .css('padding', '10px')
          .css('margin-top', '10px')
          .css('height', 'auto')
          .css('width', '100%').html(html);
      }
      function getRadioFieldHTML() {
          var field = generateField();
          var opt1 = generateField();
          var html = '<div class="all_div">' +
          '<div class="row li_row" >' +
          '<div class="col-12" >'
                                + getHeader(4, field) + 
                            '</div>'+
                            '<h6 id="result_' + field + '" class="col-12" ></h6> '+
                            
                        '</div>'+
                    '</div> ' +
                    '<script>' +
                    'function myFunction() { ' +
                    'document.getElementById("result_'+ field +'").innerHTML = document.getElementById("title_'+ field +'").value '+ 
                    '} '+
                    '</script>'+
                    '<div id="contain_' + field + '" '+ 
                    'style=" position: fixed; ' + 
                    'float: right; '+
                    'right: 0px;'+
                    'top: 57px;'+ 
                    'width: 25%;' +
                    'background: #3e4652; '+
                    'line-height: 18px !important; ' +
                    'margin: 0 !important; ' +
                    'padding: 16px 48px 14px 18px; "> ' +
                    '<h4>' +
                    '<span style="color:#fff;font-weight: 350;">Configuración de campo</span>' +
                    '<span data-field="' + field + '"  class="hidden_bal_field"  ' +
                        'style="cursor: pointer;'+
                        'font-size: 30px;'+
                        'width: 48px;'+
                        'text-align: center; '+
                        'color: #fff; '+
                        'right: 0px; '+
                        'position: absolute; '+
                        'top: 10px;">' +
                    '<i class="fas fa-times"></i>' +
                    '</span>' +
                    '</h4>' +
              '<hr />'+
              '<div class="row li_row form_output" data-type="radio" data-field="' + field + '">'+
                  '<div class="col-md-12">'+
                      '<div class="form-group"><input type="text" type="text"id="title_'+ field +'" onkeyup="myFunction()" name="label_' + field + '" class="form-control form_input_label" '+
                             ' value="" placeholder="Título de la pregunta" data-field="' + field + '" /></div>'+
                  '</div>'+
                  '<div class="col-md-12">'+
                      '<div class="form-group"></div>'+
                  '</div>'+
                  '<div class="col-md-12">'+
                      '<div class="form-group">'+
                          '<div class="mt-radio-list radio_list_' + field + '"><label class="mt-radio mt-radio-outline">'+
                              '<input data-opt="' + opt1 + '" type="radio" name="radio_' + field + '" value="Value">'+
                                  '<p class="r_opt_name_' + opt1 + '" style="color:#fff;">Opción</p><span></span>'+
                              '</label></div>'+
                      '</div>'+
                  '</div>'+
              '</div>'+
              '<div class="row li_row">'+
                  '<div class="col-md-12">'+
                      '<div class="field_extra_info_' + field + '">'+
                          '<div data-field="' + field + '" class="row radio_row_' + field + '" data-opt="' + opt1 + '">'+
                              '<div class="col-md-4">'+
                                  '<div class="form-group"><input type="text" value="" placeholder="Opción"  class="r_opt form-control" /></div>'+
                              '</div>'+
                              '<div class="col-md-4">'+
                                  '<div class="form-group"><input type="text" value="" placeholder="Value"  class="r_val form-control"  /></div>'+
                              '</div>'+
                              '<div class="col-md-4">'+
                                  '<i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_radio" '+
                                     ' data-field="' + field + '" style="color:#fff;"></i>'+
                              '</div>'+
                          '</div>'+
                      '</div>'+
                  '</div>'+
              '</div>'+
          '</div>';
          return $('<div>').addClass('li_' + field)
          .css('background', '#eee')
          .css('padding', '10px')
          .css('margin-top', '10px')
          .css('height', 'auto')
          .css('width', '100%').html(html);
      }
      function getCheckboxFieldHTML() {
          var field = generateField();
          var opt1 = generateField();
          var html =  '<div class="all_div">' +
                        '<div class="row li_row" >' +
                            '<div class="col-12" >'
                                + getHeader(4, field) + 
                            '</div>'+
                            '<h6 id="result_' + field + '" class="col-12" ></h6> '+
                            
                        '</div>'+
                    '</div> ' +
                    '<script>' +
                    'function myFunction() { ' +
                    'document.getElementById("result_'+ field +'").innerHTML = document.getElementById("title_'+ field +'").value '+ 
                    '} '+
                    '</script>'+
              '<div id="contain_' + field + '" '+ 
          'style=" position: fixed; ' + 
          'float: right; '+
          'right: 0px;'+
          'top: 57px;'+ 
          'width: 25%;' +
          'background: #3e4652; '+
          'line-height: 18px !important; ' +
          'margin: 0 !important; ' +
          'padding: 16px 48px 14px 18px; "> ' +
          '<h4>' +
          '<span style="color:#fff;font-weight: 350;">Configuración de campo</span>' +
          '<span data-field="' + field + '"  class="hidden_bal_field"  ' +
               'style="cursor: pointer;'+
               'font-size: 30px;'+
               'width: 48px;'+
               'text-align: center; '+
               'color: #fff; '+
               'right: 0px; '+
               'position: absolute; '+
               'top: 10px;">' +
          '<i class="fas fa-times"></i>' +
          '</span>' +
          '</h4>' +
                  '<hr />'+
                  '<div class="row li_row form_output" data-type="checkbox" data-field="' + field + '">'+
                      '<div class="col-md-12">'+
                          '<div class="form-group">'+
                              '<input type="text" type="text"id="title_'+ field +'" onkeyup="myFunction()" name="label_' + field + '" class="form-control form_input_label" '+
                                '  value="" placeholder="Título de la pregunta" data-field="' + field + '" />'+
                          '</div>'+
                      '</div>'+
                      '<div class="col-md-12">'+
                          '<div class="form-group"></div>'+
                      '</div>'+
                      '<div class="col-md-12">'+
                          '<div class="form-group">'+
                              '<div class="mt-checkbox-list checkbox_list_' + field + '">'+
                                  '<label class="mt-checkbox mt-checkbox-outline">'+
                                      '<input data-opt="' + opt1 + '" type="checkbox" name="checkbox_' + field + '" value="Value">'+
                                      '<p class="c_opt_name_' + opt1 + '" style="color:#fff;">Opción</p><span></span>'+
                                  '</label>'+
                              '</div>'+
                          '</div>'+
                      '</div>'+
                  '</div>'+
                  '<div class="row li_row">'+
                      '<div class="col-md-12">'+
                          '<div class="field_extra_info_' + field + '">'+
                              '<div data-field="' + field + '" class="row checkbox_row_' + field + '" data-opt="' + opt1 + '">'+
                                  '<div class="col-md-4">'+
                                      '<div class="form-group">'+
                                          '<input type="text" value="" placeholder="Opción" class="c_opt form-control" />'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-md-4">'+
                                      '<div class="form-group">'+
                                          '<input type="text" value=""  placeholder="Value" class="c_val form-control" />'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-md-4">'+
                                      '<i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_checkbox" '+
                                         ' data-field="' + field + '" style="color:#fff;">'+
                                      '</i>'+
                                  '</div>'+
                              '</div>'+
                          '</div>'+
                      '</div>'+
                  '</div>'+
              '</div>';
          // return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
          return $('<div>').addClass('li_' + field)
          .css('background', '#eee')
          .css('padding', '10px')
          .css('margin-top', '10px')
          .css('height', 'auto')
          .css('width', '100%').html(html);
      }
      function getHeader(type, field) {
        var icon = ""
        var text = ""
        if (type == 1) {
            icon = '<i class="fas fa-text-width"></i>'
            text = " Texto "
        } else if (type == 2) {
            icon = '<i class="far fa-check-circle"></i>'
            text = " Opción unica "
        }
        else if (type == 3) {
            icon = '<i class="fas fa-check-double"></i>'
            text = " Opción multiple "
        } else if (type == 4) {
            icon = '<i class="far fa-comment"></i>'
            text = "Texto informativo"
        }
        return '<div class="row"> ' + 
                  '<div class="col-2 "> ' + 
                      '<h5 class="child"></h5>' +
                  '</div>' +
                  '<div class="col-8">'+ icon + ' ' + text +'</div>' +
                  '<div class="col-2">' +
                      '<button type="button"  class="btn btn-danger btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button> ' +
                      '<button type="button"  style="position: relative; right: 8px" class="btn btn-success edit_bal_field btn-sm pull-right" data-field="' + field + '"><i class="fa fa-edit"></i></button> ' +
                  '</div>' +
               '</div>' 
      }
      $(document).on('click', '.add_more_radio', function () {
          $(this).closest('.form_builder_field').css('height', 'auto');
          var field = $(this).attr('data-field');
          var option = generateField();
          $('.field_extra_info_' + field).append('<div data-opt="' + option + '" data-field="' + field + '" class="row radio_row_' + field + '"><div class="col-md-4"><div class="form-group"><input type="text" value="" placeholder="Opción"  class="r_opt form-control"/></div></div><div class="col-md-4"><div class="form-group"><input type="text" value="" placeholder="Value" class="r_val form-control"/></div></div><div class="col-md-4"><i style="color:#fff;" class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_radio" data-field="' + field + '"></i><i style="color:#fff;" class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_radio" data-field="' + field + '"></i></div></div>');
          var options = '';
          $('.radio_row_' + field).each(function () {
              var opt = $(this).find('.r_opt').val();
              var val = $(this).find('.r_val').val();
              var s_opt = $(this).attr('data-opt');
              options += '<label class="mt-radio mt-radio-outline"><input data-opt="' + s_opt + '" type="radio" name="radio_' + field + '" value="' + val + '"> <p style="color:#fff;" class="r_opt_name_' + s_opt + '">' + ' ' + opt + '</p><span></span></label>';
          });
          $('.radio_list_' + field).html(options);
          getPreview();
      });
      $(document).on('click', '.add_more_checkbox', function () {
          $(this).closest('.form_builder_field').css('height', 'auto');
          var field = $(this).attr('data-field');
          var option = generateField();
          $('.field_extra_info_' + field).append('<div data-opt="' + option + '" data-field="' + field + '" class="row checkbox_row_' + field + '"><div class="col-md-4"><div class="form-group"><input type="text" value="" placeholder="Opción" class="c_opt form-control"/></div></div><div class="col-md-4"><div class="form-group"><input type="text" value="" placeholder="Value" class="c_val form-control"/></div></div><div class="col-md-4"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_checkbox" style="color:#fff;" data-field="' + field + '"></i><i style="color:#fff;" class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_checkbox" data-field="' + field + '"></i></div></div>');
          var options = '';
          $('.checkbox_row_' + field).each(function () {
              var opt = $(this).find('.c_opt').val();
              var val = $(this).find('.c_val').val();
              var s_opt = $(this).attr('data-opt');
              options += '<label class="mt-checkbox mt-checkbox-outline"><input data-opt="' + s_opt + '" name="checkbox_' + field + '" type="checkbox" value="' + val + '"> <p style="color:#fff;" class="c_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
          });
          $('.checkbox_list_' + field).html(options);
          getPreview();
      });
      $(document).on('keyup', '.s_opt', function () {
          var op_val = $(this).val();
          var field = $(this).closest('.row').attr('data-field');
          var option = $(this).closest('.row').attr('data-opt');
          $('select[name=select_' + field + ']').find('option[data-opt=' + option + ']').html(op_val);
          getPreview();
      });
      $(document).on('keyup', '.s_val', function () {
          var op_val = $(this).val();
          var field = $(this).closest('.row').attr('data-field');
          var option = $(this).closest('.row').attr('data-opt');
          $('select[name=select_' + field + ']').find('option[data-opt=' + option + ']').val(op_val);
          getPreview();
      });
      $(document).on('keyup', '.r_opt', function () {
          var op_val = $(this).val();
          var field = $(this).closest('.row').attr('data-field');
          var option = $(this).closest('.row').attr('data-opt');
          $('.radio_list_' + field).find('.r_opt_name_' + option).html(op_val);
          getPreview();
      });
      $(document).on('keyup', '.r_val', function () {
          var op_val = $(this).val();
          var field = $(this).closest('.row').attr('data-field');
          var option = $(this).closest('.row').attr('data-opt');
          $('.radio_list_' + field).find('input[data-opt=' + option + ']').val(op_val);
          getPreview();
      });
      $(document).on('keyup', '.c_opt', function () {
          var op_val = $(this).val();
          var field = $(this).closest('.row').attr('data-field');
          var option = $(this).closest('.row').attr('data-opt');
          $('.checkbox_list_' + field).find('.c_opt_name_' + option).html(op_val);
          getPreview();
      });
      $(document).on('keyup', '.c_val', function () {
          var op_val = $(this).val();
          var field = $(this).closest('.row').attr('data-field');
          var option = $(this).closest('.row').attr('data-opt');
          $('.checkbox_list_' + field).find('input[data-opt=' + option + ']').val(op_val);
          getPreview();
      });
      $(document).on('click', '.edit_bal_textfield', function () {
          var field = $(this).attr('data-field');
          var el = $('.field_extra_info_' + field);
          el.html('<div class="form-group"><input type="text" name="label_' + field + '" class="form-control" placeholder="Enter Text Field Label"/></div><div class="mt-checkbox-list"><label class="mt-checkbox mt-checkbox-outline"><input name="req_' + field + '" type="checkbox" value="1"> Required<span></span></label></div>');
          getPreview();
      });
      $(document).on('click', '.remove_bal_field', function (e) {

          e.preventDefault();
          var field = $(this).attr('data-field');
          $(this).closest('.li_' + field).hide('400', function () {
              $(this).remove();
              getPreview();
              $("#arrow").show();

          });
      });
      $(document).on('click', '.hidden_bal_field', function (e) {
          e.preventDefault();
          // $('#contain').hide();
          var field = $(this).attr('data-field');
          var field2 = 'contain_';
          var idd = field2 + field;
          if(idd == idd){
              $('#contain_' + field).hide();
          }
      });
      $(document).on('click', '.edit_bal_field', function (e) {
          e.preventDefault();
          var field = $(this).attr('data-field');
          var field2 = 'contain_';
          var idd = field2 + field;
          if(idd == idd){
              $('#contain_' + field).show();
          }
      });
      $(document).on('click', '.remove_more_radio', function () {
          var field = $(this).attr('data-field');
          $(this).closest('.radio_row_' + field).hide('400', function () {
              $(this).remove();
              var options = '';
              $('.radio_row_' + field).each(function () {
                  var opt = $(this).find('.r_opt').val();
                  var val = $(this).find('.r_val').val();
                  var s_opt = $(this).attr('data-opt');
                  options += '<label class="mt-radio mt-radio-outline"><input data-opt="' + s_opt + '" type="radio" name="radio_' + field + '" value="' + val + '"> <p style="color:#fff;" class="r_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
              });
              $('.radio_list_' + field).html(options);
              getPreview();
          });
      });
      $(document).on('click', '.remove_more_checkbox', function () {
          var field = $(this).attr('data-field');
          $(this).closest('.checkbox_row_' + field).hide('400', function () {
              $(this).remove();
              var options = '';
              $('.checkbox_row_' + field).each(function () {
                  var opt = $(this).find('.c_opt').val();
                  var val = $(this).find('.c_val').val();
                  var s_opt = $(this).attr('data-opt');
                  options += '<label class="mt-checkbox mt-checkbox-outline"><input data-opt="' + s_opt + '" name="checkbox_' + field + '" type="checkbox" value="' + val + '"> <p style="color:#fff;" class="r_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
              });
              $('.checkbox_list_' + field).html(options);
              getPreview();
          });
      });
      $(document).on('keyup', '.form_input_button_class', function () {
          getPreview();
      });
      $(document).on('keyup', '.form_input_button_value', function () {
          getPreview();
      });
      $(document).on('change', '.form_input_req', function () {
          getPreview();
      });
      $(document).on('keyup', '.form_input_placeholder', function () {
          getPreview();
      });
      $(document).on('keyup', '.form_input_label', function () {
          getPreview();
      });
      $(document).on('keyup', '.form_input_name', function () {
          getPreview();
      });
      function generateField() {
          return Math.floor(Math.random() * (100000 - 1 + 1) + 57);
      }
      function getPreview(plain_html = '') {
          var el = $('.form_builder_area .form_output');
          $("#arrow").hide();
          var html = '';
          el.each(function () {
              var data_type = $(this).attr('data-type');
              //var field = $(this).attr('data-field');
              var label = $(this).find('.form_input_label').val();
              var name = $(this).find('.form_input_name').val();
              if (data_type === 'title') {
                  var placeholder = $(this).find('.form_input_placeholder').val();
                  var checkbox = $(this).find('.form-check-input');
                  var required = '';
                  if (checkbox.is(':checked')) {
                      required = 'required';
                  }
                  html += '<div class="form-group"><label class="control-label">' + label + '</label></div>';
              }
              if (data_type === 'text') {
                  var placeholder = $(this).find('.form_input_placeholder').val();
                  var checkbox = $(this).find('.form-check-input');
                  var required = '';
                  if (checkbox.is(':checked')) {
                      required = 'required';
                  }
                  html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="text" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
              }
              // if (data_type === 'number') {
              //     var placeholder = $(this).find('.form_input_placeholder').val();
              //     var checkbox = $(this).find('.form-check-input');
              //     var required = '';
              //     if (checkbox.is(':checked')) {
              //         required = 'required';
              //     }
              //     html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="number" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
              // }
              // if (data_type === 'email') {
              //     var placeholder = $(this).find('.form_input_placeholder').val();
              //     var checkbox = $(this).find('.form-check-input');
              //     var required = '';
              //     if (checkbox.is(':checked')) {
              //         required = 'required';
              //     }
              //     html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="email" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
              // }
              // if (data_type === 'password') {
              //     var placeholder = $(this).find('.form_input_placeholder').val();
              //     var checkbox = $(this).find('.form-check-input');
              //     var required = '';
              //     if (checkbox.is(':checked')) {
              //         required = 'required';
              //     }
              //     html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="password" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
              // }
              // if (data_type === 'textarea') {
              //     var placeholder = $(this).find('.form_input_placeholder').val();
              //     var checkbox = $(this).find('.form-check-input');
              //     var required = '';
              //     if (checkbox.is(':checked')) {
              //         required = 'required';
              //     }
              //     html += '<div class="form-group"><label class="control-label">' + label + '</label><textarea rows="5" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
              // }
              // if (data_type === 'date') {
              //     var checkbox = $(this).find('.form-check-input');
              //     var required = '';
              //     if (checkbox.is(':checked')) {
              //         required = 'required';
              //     }
              //     html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="date" name="' + name + '" class="form-control" ' + required + '/></div>';
              // }
            //   if (data_type === 'button') {
            //       var btn_class = $(this).find('.form_input_button_class').val();
            //       var btn_value = $(this).find('.form_input_button_value').val();
            //       html += '<button name="' + name + '" type="submit" class="' + btn_class + '">' + btn_value + '</button>';
            //   }
              if (data_type === 'select') {
                  var option_html = '';
                  $(this).find('select option').each(function () {
                      var option = $(this).html();
                      var value = $(this).val();
                      option_html += '<option value="' + value + '">' + option + '</option>';
                  });
                  html += '<div class="form-group"><label class="control-label">' + label + '</label><select class="form-control" name="' + name + '">' + option_html + '</select></div>';
              }
              if (data_type === 'radio') {
                  var option_html = '';
                  $(this).find('.mt-radio').each(function () {
                      var option = $(this).find('p').html();
                      var value = $(this).find('input[type=radio]').val();
                      option_html += '<div class="form-check"><label class="form-check-label"><input type="radio" class="form-check-input" name="' + name + '" value="' + value + '">' + option + '</label></div>';
                  });
                  html += '<div class="form-group"><label class="control-label">' + label + '</label>' + option_html + '</div>';
              }
              if (data_type === 'checkbox') {
                  var option_html = '';
                  $(this).find('.mt-checkbox').each(function () {
                      var option = $(this).find('p').html();
                      var value = $(this).find('input[type=checkbox]').val();
                      option_html += '<div class="form-check"><label class="form-check-label"><input type="checkbox" class="form-check-input" name="' + name + '[]" value="' + value + '">' + option + '</label></div>';
                  });
                  html += '<div class="form-group"><label class="control-label">' + label + '</label>' + option_html + '</div>';
              }
              html += "<hr>"
          });


          if (html.length) {
              $('.export_html').show();
          } else {
              $('.export_html').hide();
          }
          if (plain_html === 'html') {
              $('.preview').hide();
              $('.plain_html').show().find('textarea').val(html);
          } else {
              $('.plain_html').hide();
              $('.preview').html(html).show();
          }
      }
      $(document).on('click', '.export_html', function () {
          getPreview('html');
      });
    });

  }


  
  getCoCatalog(): void {
    this.configService.getData().subscribe(data => {
      this.dataModel = data;
      console.log(this.dataModel);
    })
  }




}
