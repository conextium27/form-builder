import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Routes, RouterModule } from "@angular/router";
import { HeroService } from '../services/hero.service';
import { CoCatalog } from '../../models/co-catalog';
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

        
        
        // $('#main-area').bind("DOMNodeInserted DOMNodeRemoved",function(){
            
        //     countparent();
        //     console.log("entra");
        //    });

      $("#25").draggable({
          helper: function (e) {
              e.stopPropagation();
              return getTitleFieldHTML();
          },
          connectToSortable: ".form_builder_area"
      });
      $("#24").draggable({
          helper: function () {
              return getTextFieldHTML();
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
              console.log("P" + i);
          })
           
      }

      

    function getNumberQuestion() {
       return $("#main-area").children().length
    }


      function getTitleFieldHTML() {
        // $("#contain_" + field).hide();
          var field = generateField();
         
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
                        'console.log("entra ");'+
                        'document.getElementById("result_'+ field +'").innerHTML = document.getElementById("title_'+ field +'").value '+ 
                      '} '+
                      '</script>'+
                        '<div id="contain_' + field + '" class="form_builder" ' +
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
                                        '<span style="color:#fff;font-size: 15pt;position: relative;left: -100px;top: -10px;">Título</span>' +
                                        '<div class="row li_row form_output" data-type="title" data-field="' + field + '"> ' +
                                            '<div class="col-md-12"> ' +
                                                '<div class="form-group"> '+
                                                    '<input id="title_'+ field +'" onkeyup="myFunction()" type="text" name="label_' + field + '" class="form-control form_input_label" placeholder="Texto informativo" data-field="' + field + '"/> ' +
                                                '</div>'+
                                            '</div> ' +
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
      

      function getTextFieldHTML() {

          var field = generateField();
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
                          '<div class="row li_row form_output" data-type="text" data-field="' + field + '">'+
                              '<div class="col-md-12">'+
                                  '<div class="form-group">'+
                                      '<input type="text"id="title_'+ field +'" onkeyup="myFunction()" name="label_' + field + '" class="form-control form_input_label" value="" placeholder="Título de la pregunta" data-field="' + field + '"/>'+
                                  '</div>'+
                              '</div>'+
                          '<div class="col-md-12">'+
                              '<div class="form-group">'+
                                  '<input type="text" name="placeholder_' + field + '" data-field="' + field + '" class="form-control form_input_placeholder" placeholder="Ayuda de la pregunta"/>'+
                              '</div>'+
                          '</div>'+
                          '<div class="col-12">'+
                          ' <div class="">'+
                            '<input type="checkbox">'+
                            '<span style="color:#fff;">Requerido</span>'+
                          '</div>'+
                          '</div>'+
                          '<div class="col-md-12 m-2">' +
                              '<div class="form-group">'+
                                  '<div class="control-group">' +
                                      '<label class="control-label" for="multipleradios-0" style="color:#fff">Tipo de Pregunta</label>' +
                                      '<select class="form-control"><option>Texto</option><option>Números enteros</option><option>Números decimales</option></select>'
                                  '</div>'+
                              '</div>' +
                          '</div>'+
                          '<div class="col-md-12">'+
                              '<div class="form-check">'+
                                  '<label class="form-check-label">'+
                                      '<input data-field="' + field + '" type="checkbox" class="form-check-input form_input_req">Required</label>'+
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
          // console.log(field)
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
          var count = getNumberQuestion();
          console.log(count);
          return '<div class="row"> ' + 
                    '<div class="col-2 "> ' + 
                        '<h5 class="child"> P' + count + '</h5>' +
                    '</div>' +
                    '<div class="col-8">'+ icon + ' ' + text +'</div>' +
                    '<div class="col-2">' +
                        '<button type="button"  class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button> ' +
                        '<button type="button"  style="position: relative; right: 8px" class="btn btn-success edit_bal_field btn-sm pull-right" data-field="' + field + '"><i class="fa fa-edit"></i></button> ' +
                    '</div>' +
                        //   ' <button type="button" style="position: relative; right: 13px" class="btn btn-info hidden_bal_field btn-sm pull-right" data-field="' + field + '"><i class="far fa-eye-slash"></i></button> ' +
                 '</div>' 
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
