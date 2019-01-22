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
        let encuesta: any;

        $(document).ready(function () {
            encuesta = JSON.parse(localStorage.getItem("itemsArray"));

            $('#main-area').bind("mouseenter mouseleave", function () {
            });

            function answerPosition(){
                        $("#main-area").children("div").each(function (i) {
                            $(this).find(".q").html("Pregunta " + (++i))
                        });

            }
            
            function countPosition (){
                    $("#main-area").children("div").each(function (i) {
                        $(this).find(".po").html((i++))
                    });
            }
           
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
                    countPosition();
                    answerPosition();
                },
                stop: function (ev, ui) {
                    getPreview();
                    countPosition();
                    answerPosition();
                }
            });
            $(".form_builder_area").disableSelection();
            // function countparent(field) {
                
            //     console.log($("#main-area").children("div").find(".child").length);
            // }


            $("#sendSurvey").on("click", function () {
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
                    } else {
                        console.log("no enviado");
                    }
                });

                localStorage.clear();                                          
            });
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
                var count = getNumberQuestion()
                return '<div class="row"> ' +
                       '    <div class="col-2 p' + field + '" class="col-2 "> ' +
                       '        <span class="child" style="display:none;">Q'+count+'</span>' +
                       '        <span class="q" style="font-size: 8pt"></span>' +
                       '        <span class="po" style="display:block;"></span>' +
                       '    </div>' +
                       '    <div class="col-8">' + icon + ' ' + text + '</div>' +
                       '    <div class="col-2">' +
                       '    <button type="button"  class="btn btn-danger btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button> ' +
                       '    <button type="button"  style="position: relative; right: 8px" class="btn btn-success edit_bal_field btn-sm pull-right" data-field="' + field + '"><i class="fa fa-edit"></i></button> ' +
                       '    </div>' +
                       '</div>'
            }
            function getNumberQuestion() {
                // return $("#main-area").children().length + 1
                return $("#main-area").children("div").find(".child").length + 1
            }
            function getTitleFieldHTML() {
                // $("#contain_" + field).hide();
                var field = generateField();
                $.ajax({
                    url: "http://10.89.49.10:8093/getComponents",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        $.each(data[3].validations, function (key, item) {
                            // console.log(item.tipo);
                            if (item.tipo === "checkbox") {
                                var checkBox = "<div class='ckeckbox' ><label style='color:#fff'><input  id='" + item.validation_id + "' class='input_" + field + "' type='checkbox' name='selector" + field + "[]' value='" + item.validation_id + "' />" + item.titulo + "</label></div>";
                                $(checkBox).appendTo('#check_' + field);

                            }
                        });
                    }
                });
                $(document).ready(function () {
                    $("#summaryInput").hide();
                }).on("change", "#20", function () {
                    if (this.checked) {
                        $("#summaryInput").show();
                    } else {
                        $("#summaryInput").hide();
                    }
                });

              

                $(document).ready(function () {
                }).one("submit", ".sendText_" + field, function (e) {
                    e.preventDefault();
                    // alert(this.id);return;
                    // var id = "#sendText" + this.id.split("_")[1];
                    var test = localStorage.getItem("informativeText" + field);
                    var validations = [];
                    var listForm = [];
                   
                    $("input[name^='selector" + field + "']").each(function () {
                        // $("input[type=checkbox]").each(function(){
                        if (this.checked) {
                            validations.push({ validation_id: this.id, value: 1 });
                        }
                    });

                    // if(  $('#check_'+field).find("#20").checked ){
                    //         console.log("true");

                    // }else{
                    //     console.log("false");
                    // }


                    var model = {
                        question_id: null,
                        section_id: null,
                        question_subtype_id: 23,
                        text: $("#title_" + field).val(),
                        instructions: null,
                        alias: $(".p" + field).find(".child").html(),
                        position: $(".p" + field).find(".po").html(),
                        level: 1,
                        validations: validations
                    };

                    
                    encuesta.sections[0].questions.push(model);
                    localStorage.setItem("itemsArray", JSON.stringify(encuesta));

                    if (test) {
                        listForm = JSON.parse(test);
                    }
                    listForm.push(model);
                    localStorage.setItem("informativeText" + field, JSON.stringify(listForm));

                    Swal({
                        type: 'success',
                        title: 'Pregunta Guardada',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    localStorage.removeItem("informativeText" + field);
                    $("#contain_" + field).hide();
                });

                var html = '<div class="all_div">' +
                    '<div class="row li_row" >' +
                    '<div class="col-12" >'
                    + getHeader(4, field) +
                    '</div>' +
                    '<h6 id="result_' + field + '" class="col-12" ></h6> ' +

                    '</div>' +
                    '</div> ' +
                    '<script>' +
                    '    function myFunction() {' +
                    '        document.getElementById("result_' + field + '").innerHTML = document.getElementById("title_' + field + '").value' +
                    '     }' +
                    '</script>' +
                    '<style>' +
                    '     .titl{' +
                    '         cursor: pointer;' +
                    '         font-size: 30px;' +
                    '         width: 48px;' +
                    '         text-align: center;' +
                    '         color: #fff;' +
                    '         right: 0px;' +
                    '         position: absolute;' +
                    '         top: 10px;' +
                    '         }' +
                    '     .contain{' +
                    '         z-index: 1;' +
                    '         overflow-y: scroll; height: 500px;' +
                    '         position: fixed;' +
                    '         float: right;' +
                    '         right: 0px;' +
                    '         top: 57px;' +
                    '         width: 35%;' +
                    '         background: #3e4652;' +
                    '         line-height: 18px !important;' +
                    '         margin: 0 !important;' +
                    '         padding: 16px 48px 14px 18px;' +
                    '     }' +
                    ' </style>' +
                    ' <div id="contain_' + field + '" class="contain">' +
                    '     <h4>' +
                    '         <span style="color:#fff;font-weight: 350;">Configuración de campo</span>' +
                    '         <span data-field="' + field + '" class="hidden_bal_field titl">' +
                    '             <i class="fas fa-times"></i>' +
                    '         </span>' +
                    '     </h4>' +
                    '     <hr />' +
                    '     <form id="form_' + field + '" class="sendText_' + field + '">' +
                    '         <div class="row li_row form_output" data-type="radio" data-field="' + field + '">' +
                    '             <div class="col-md-12">' +
                    '                <div class="form-group"> ' +
                    '                    <input id="title_' + field + '"  value="" onkeyup="myFunction()" type="text" name="label_' + field + '" class="form-control form_input_label" placeholder="Texto informativo" data-field="' + field + '"/> ' +
                    '             </div>' +
                    '             </div>' +
                    '             <div class="col-md-12">' +
                    '                <div id="check_' + field + '"></div>' +
                    '             </div>' +
                    '             <div id="summaryInput" class="form-group"> ' +
                    '                <div class="col-md-12"> ' +
                    '                    <span style="color:#fff;font-size: 11pt;position: relative;left: 0px;top: 0px;"> ' +
                    '                            Alias para pregunta en resumen de inventario</span>' +
                    '                    <input id="remplace_'+field+'" type="text" name="inventario" class="form-control form_input_label" placeholder="Texto informativo" /> ' +
                    '                </div>' +
                    '             </div> ' +
                    '         </div>' +
                    '         <div class="col-md-12">' +
                    '            <button id="submit_' + field + '" type="submit" class="btn btn-success">Guardar Pregunta</button>' +
                    '         </div>' +
                    '     </form>' +
                    ' </div>';
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
                        $.each(data[2].validations, function (key, item) {
                            if (item.tipo === "checkbox") {
                                var checkBox = "<div class='ckeckbox' ><label style='color:#fff'><input  id='" + item.validation_id + "' class='input_" + field + " ' type='checkbox' name='selector" + field + "[]' value='" + item.validation_id + "' />" + item.titulo + "</label></div>";
                                $(checkBox).appendTo('#check_' + field);
                            } else if (item.validation_id === 22) {
                                var place = "<div class='ckeckbox' ><input  id='" + item.validation_id + "' placeholder='" + item.placeholder + "' class='place" + field + " form-control form_input_placeholder' type='text' data-field='" + field + "' name='placeholder_" + field + "' /></div>";
                                $(place).appendTo('#place_' + field);
                            } else if (item.tipo === "input") {
                                var input = "<div class='ckeckbox' ><label style='color:#fff'>" + item.titulo + "</label></br><input  id='" + item.validation_id + "' placeholder='" + item.placeholder + "' class='inputs_" + field + " form-control' type='" + item.tipo_input + "' name='titles_" + field + "[]' /></div>";
                                $(input).appendTo('#input_' + field);
                            } else if (item.tipo === "select") {
                                var select = "<div class='ckeckbox' ><label style='color:#fff'>Tipo de Pregunta</label></br><select id='selectOption" + field + "' class='form-control' name='select" + field + "[]' ><option value='' disabled selected>" + item.placeholder + "</option><option value='" + item.lregexps[0].value + "'>" + item.lregexps[0].key + "</option><option value='" + item.lregexps[1].value + "'>" + item.lregexps[1].key + "</option><option value='" + item.lregexps[2].value + "'>" + item.lregexps[2].key + "</option></select></div>";
                                $(select).appendTo('#select_' + field);
                            }
                        });
                    }
                });
                $(document).ready(function () {
                    $("#summaryInput").hide();
                }).on("change", "#20", function () {
                    if (this.checked) {
                        $("#summaryInput").show();
                    } else {
                        $("#summaryInput").hide();
                    }
                });
                $(document).ready(function () {
                }).one("submit", ".sendText_" + field, function (e) {
                    e.preventDefault();
                    var test = localStorage.getItem("questionOpen" + field);
                    var validations = [];
                    var listForm = [];
                    $("input[name^='selector" + field + "']").each(function () {
                        if (this.checked) {
                            validations.push({ validation_id: this.id, value: 1 });
                        }
                    });


                    $('input[name^=placeholder_' + field + ']').each(function () {
                        if ($(this).val()) {
                            validations.push({
                                validation_id: this.id,
                                value: $(this).val()
                            });

                        }
                    });

                    $("input[name^='titles_" + field + "']").each(function () {
                        if ($(this).val()) {
                            validations.push({
                                validation_id: this.id,
                                value: $(this).val()
                            });
                        }
                    });

                    validations.push({
                        validation_id: 21,
                        value: $("select[name^='select" + field + "']").val()
                    });



                    var model = {
                        question_id: null,
                        section_id: null,
                        question_subtype_id: 23,
                        text: $("#title_" + field).val(),
                        instructions: null,
                        alias: $(".p" + field).find(".child").html(),
                        position: $(".p" + field).find(".po").html(),
                        level: 1,
                        validations: validations
                    };

                    // console.log(model);

                    encuesta.sections[0].questions.push(model);
                    localStorage.setItem("itemsArray", JSON.stringify(encuesta));

                    if (test) {
                        listForm = JSON.parse(test);
                    }
                    listForm.push(model);
                    localStorage.setItem("questionOpen" + field, JSON.stringify(listForm));
                    Swal({
                        type: 'success',
                        title: 'Pregunta Guardada',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    localStorage.removeItem("questionOpen" + field);
                    $("#contain_" + field).hide();
                });

                var html = '<div class="all_div" style="z-index:2">' +
                    '<div class="row li_row" >' +
                    '<div class="col-12" >'
                    + getHeader(1, field) +
                    '</div>' +
                    '<h6 id="result_' + field + '" class="col-12" ></h6> ' +

                    '</div>' +
                    '</div> ' +
                    '<script>' +
                    'function myFunction() { ' +
                    'document.getElementById("result_' + field + '").innerHTML = document.getElementById("title_' + field + '").value ' +
                    '} ' +
                    '</script>' +
                    '<style>' +
                    '</style>' +
                    '<div id="contain_' + field + '" class="form_builder"' +
                    'style=" position: fixed; ' +
                    'float: right; ' +
                    'overflow-y: scroll; height: 500px;' +
                    'right: 0px;' +
                    'top: 57px;' +
                    'width: 35%;' +
                    'background: #3e4652; ' +
                    'line-height: 18px !important; ' +
                    'margin: 0 !important; ' +
                    'padding: 16px 48px 14px 18px; "> ' +
                    '<h4>' +
                    '<span style="color:#fff;font-weight: 350;">Configuración de campo</span>' +
                    '<span data-field="' + field + '"  class="hidden_bal_field"  ' +
                    'style="cursor: pointer;' +
                    'font-size: 30px;' +
                    'width: 48px;' +
                    'text-align: center; ' +
                    'color: #fff; ' +
                    'right: 0px; ' +
                    'position: absolute; ' +
                    'top: 10px;">' +
                    '<i class="fas fa-times"></i>' +
                    '</span>' +
                    '</h4>' +
                    '<legend></legend>' +
                    '<form id="sendText' + field + '" class="sendText_' + field + '">' +
                    '    <div class="row li_row form_output" data-type="text" data-field="' + field + '" style="">' +
                    '        <div class="col-md-12">' +
                    '            <div class="form-group">' +
                    '                <input type="text" id="title_' + field + '" onkeyup="myFunction()" name="label_' + field + '" class="form-control form_input_label tit"' +
                    '                    value="" placeholder="Título de la pregunta" data-field="' + field + '" />' +
                    '            </div>' +
                    '        </div>' +
                    '        <div class="col-md-12">' +
                    '               <div id="place_' + field + '"></div>' +
                    '        </div>' +
                    '<legend></legend>' +
                    '        <div class="col-md-12 m-1">' +
                    '            <div id="select_' + field + '"></div>' +
                    '        </div>' +
                    '<legend></legend>' +
                    '        <div class="col-md-12">' +
                    '               <div id="check_' + field + '"></div>' +
                    '        </div>' +
                    '        <div id="summaryInput" class="form-group"> ' +
                    '               <div class="col-md-12"> ' +
                    '                   <span style="color:#fff;font-size: 11pt;position: relative;left: 0px;top: 0px;"> ' +
                    '                       Alias para pregunta en resumen de inventario</span>' +
                    '                       <input type="text" name="inventario" class="form-control form_input_label" placeholder="Texto informativo" /> ' +
                    '               </div>' +
                    '       </div> ' +
                    '        <div class="col-md-12">' +
                    '               <div id="input_' + field + '"></div>' +
                    '        </div>' +
                    '<legend></legend>' +
                    '        <div class="col-md-12">' +
                    '            <button id="submit' + field + '" type="submit" class="btn btn-success">Guardar Pregunta</button>' +
                    '        </div>' +
                    '    </div>' +
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

                $.ajax({
                    url: "http://10.89.49.10:8093/getComponents",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        $.each(data[0].validations, function (key, item) {
                            if (item.tipo === "checkbox") {
                                var checkBox = "<div class='ckeckbox' ><label style='color:#fff'><input  id='" + item.validation_id + "' class='input_" + field + " ' type='checkbox' name='selector" + field + "[]' value='" + item.validation_id + "' />" + item.placeholder + "</label></div>";
                                $(checkBox).appendTo('#check_' + field);
                            }
                        });
                    }
                });
                $(document).ready(function () {
                    $("#summaryInput").hide();
                }).on("change", "#20", function () {
                    if (this.checked) {
                        $("#summaryInput").show();
                    } else {
                        $("#summaryInput").hide();
                    }
                });
                $(document).ready(function () {
                }).one("submit", ".sendText_" + field, function (e) {
                    e.preventDefault();
                    var test = localStorage.getItem("questionOnly" + field);
                    var validations = [];
                    var answerOptions = [];
                    var value = [];
                    var valueR_: any = [];
                    var listForm = [];
                    $("input[name^='selector" + field + "']").each(function () {
                        if (this.checked) {
                            validations.push({
                                validation_id: this.id,
                                value: 1
                            });
                        }
                    });


                    $("input[name^='valueR" + field + "']").each(function () {
                        if ($(this).val()) {
                            value.push(
                                $(this).val()
                            );
                        }
                    });

                    $('input[name^=optionR' + field + ']').each(function () {
                        if ($(this).val()) {
                            answerOptions.push({
                                answer_option_id: 1,
                                question_id: 3,
                                text: $(this).val(),
                                alias: "A1",
                                value: value[0],
                                icon: null,
                                position: 0,
                                status: 1
                            });
                        }
                    });


                    $("input[name^='valueR_" + field + "']").each(function (i) {
                        if ($(this).val()) {
                            valueR_.push(
                                $(this).val()
                            );
                        }
                    });

                    $('input[name^=optionR_' + field + ']').each(function (i) {
                        if ($(this).val()) {
                            answerOptions.push({
                                answer_option_id: 2,
                                question_id: 3,
                                text: $(this).val(),
                                alias: $(this).data('alias'),
                                value: valueR_[i],
                                icon: null,
                                position: $(this).data('r'),
                                status: 1
                            });
                        }
                    });
                    // console.log(answerOptions);


                    var model = {
                        question_id: null,
                        section_id: null,
                        question_subtype_id: 18,
                        text: $("#title_" + field).val(),
                        instructions: null,
                        alias: $(".p" + field).find(".child").html(),
                        position: $(".p" + field).find(".po").html(),
                        level: 0,
                        status: 1,
                        answerOptions: answerOptions,
                        validations: validations
                    };

                    // console.log(model);

                    encuesta.sections[0].questions.push(model);
                    localStorage.setItem("itemsArray", JSON.stringify(encuesta));

                    if (test) {
                        listForm = JSON.parse(test);
                    }
                    listForm.push(model);
                    localStorage.setItem("questionOnly" + field, JSON.stringify(listForm));
                    Swal({
                        type: 'success',
                        title: 'Pregunta Guardada',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    localStorage.removeItem("questionOnly" + field);
                    $("#contain_" + field).hide();
                });


                var html = '<div class="all_div">' +
                    '<div class="row li_row" >' +
                    '<div class="col-12" >'
                    + getHeader(2, field) +
                    '</div>' +
                    '<h6 id="result_' + field + '" class="col-12" ></h6> ' +

                    '</div>' +
                    '</div> ' +
                    '<script>' +
                    '    function myFunction() {' +
                    '        document.getElementById("result_' + field + '").innerHTML = document.getElementById("title_' + field + '").value' +
                    '     }' +
                    '</script>' +
                    '<style>' +
                    '     .titl{' +
                    '         cursor: pointer;' +
                    '         font-size: 30px;' +
                    '         width: 48px;' +
                    '         text-align: center;' +
                    '         color: #fff;' +
                    '         right: 0px;' +
                    '         position: absolute;' +
                    '         top: 10px;' +
                    '         }' +
                    '     .contain{' +
                    '         z-index: 1;' +
                    '         overflow-y: scroll; height: 500px;' +
                    '         position: fixed;' +
                    '         float: right;' +
                    '         right: 0px;' +
                    '         top: 57px;' +
                    '         width: 35%;' +
                    '         background: #3e4652;' +
                    '         line-height: 18px !important;' +
                    '         margin: 0 !important;' +
                    '         padding: 16px 48px 14px 18px;' +
                    '     }' +
                    ' </style>' +
                    ' <div id="contain_' + field + '" class="contain">' +
                    '     <h4>' +
                    '         <span style="color:#fff;font-weight: 350;">Configuración de campo</span>' +
                    '         <span data-field="' + field + '" class="hidden_bal_field titl">' +
                    '             <i class="fas fa-times"></i>' +
                    '         </span>' +
                    '     </h4>' +
                    '     <hr />' +
                    '     <form id="form_' + field + '" class="sendText_' + field + '">' +
                    '         <div class="row li_row form_output" data-type="radio" data-field="' + field + '">' +
                    '             <div class="col-md-12">' +
                    '                <div class="form-group"> ' +
                    '                    <input id="title_' + field + '"  value="" onkeyup="myFunction()" type="text" name="label_' + field + '" class="form-control form_input_label" placeholder="Texto informativo" data-field="' + field + '"/> ' +
                    '             </div>' +
                    '             </div>' +
                    '             <div class="col-md-12">' +
                    '                 <div class="form-group"></div>' +
                    '             </div>' +
                    '             <div class="col-md-12">' +
                    '                <div id="check_' + field + '"></div>' +
                    '             </div>' +
                    '             <div id="summaryInput" class="form-group"> ' +
                    '                <div class="col-md-12"> ' +
                    '                    <span style="color:#fff;font-size: 11pt;position: relative;left: 0px;top: 0px;"> ' +
                    '                            Alias para pregunta en resumen de inventario</span>' +
                    '                    <input type="text" name="inventario" class="form-control form_input_label" placeholder="Texto informativo" /> ' +
                    '                </div>' +
                    '             </div> ' +
                    //    '             <div class="col-md-12">'+
                    //    '                 <div class="form-group">'+
                    //    '                     <div class="mt-radio-list radio_list_' + field + '"><label class="mt-radio mt-radio-outline">'+
                    //    '                             <input data-opt="' + opt1 + '" type="radio" name="radio_' + field + '" value="Value">'+
                    //    '                             <p class="r_opt_name_' + opt1 + '" style="color:#fff;">Opción</p><span></span>'+
                    //    '                         </label></div>'+
                    //    '                 </div>'+
                    //    '             </div>'+
                    //    '         </div>'+
                    '         <div  class="row li_row">' +
                    '             <div class="col-md-12">' +
                    '                 <div  id="father_' + field + '" class="field_extra_info_' + field + ' ">' +
                    '                     <div data-field="' + field + '" class="row radio_row_' + field + '" data-opt="' + opt1 + '">' +
                    '                         <div class="col-md-2">' +
                    '                                <h5 style="color:#fff; padding-left: 10px;">' +
                    '                                    1' +
                    '                                </h5>' +
                    '                         </div>' +
                    '                         <div class="col-md-4">' +
                    '                             <div class="form-group"><input id="optionR' + field + '" type="text" value="" name="optionR' + field + '[]" placeholder="Opción" class="r_opt form-control" /></div>' +
                    '                         </div>' +
                    '                         <div class="col-md-4">' +
                    '                             <div class="form-group"><input id="valueR' + field + '" type="number" value="" name="valueR' + field + '[]" placeholder="Valor" class="r_val form-control" /></div>' +
                    '                         </div>' +
                    '                         <div class="col-md-2">' +
                    '                             <i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_radio" data-field="' + field + '" ' +
                    '                                 style="color:#fff;"></i>' +
                    '                         </div>' +
                    '                     </div>' +
                    '                 </div>' +
                    '             </div>' +
                    '         </div>' +
                    '         <div class="col-md-12">' +
                    '            <button id="submit_' + field + '" type="submit" class="btn btn-success">Guardar Pregunta</button>' +
                    '         </div>' +
                    '     </form>' +
                    ' </div>';
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
                $.ajax({
                    url: "http://10.89.49.10:8093/getComponents",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        $.each(data[1].validations, function (key, item) {
                            if (item.tipo === "checkbox") {
                                var checkBox = "<div class='ckeckbox' ><label style='color:#fff'><input  id='" + item.validation_id + "' class='input_" + field + " ' type='checkbox' name='selector" + field + "[]' value='" + item.validation_id + "' />" + item.titulo + "</label></div>";
                                $(checkBox).appendTo('#check_' + field);
                            } else if (item.tipo === "input") {
                                var input = "<div class='ckeckbox' ><label style='color:#fff'>" + item.titulo + "</label></br><input  id='" + item.validation_id + "' placeholder='" + item.placeholder + "' class='inputs_" + field + " form-control' type='" + item.tipo_input + "' name='titles_" + field + "[]' /></div>";
                                $(input).appendTo('#input_' + field);
                            }
                            // else if( item.tipo === "select"){
                            //     var select =  "<div class='ckeckbox' ><label style='color:#fff'>Tipo de Pregunta</label></br><select id='selectOption"+field+"' class='form-control' name='select"+field+"[]' ><option value='' disabled selected>"+item.placeholder+"</option><option value='"+item.lregexps[0].value+"'>"+item.lregexps[0].key+"</option><option value='"+item.lregexps[1].value+"'>"+item.lregexps[1].key+"</option><option value='"+item.lregexps[2].value+"'>"+item.lregexps[2].key+"</option></select></div>";
                            //     $(select).appendTo('#select_'+field);
                            // }
                        });
                    }
                });
                $(document).ready(function () {
                    $("#summaryInput").hide();
                }).on("change", "#20", function () {
                    if (this.checked) {
                        $("#summaryInput").show();
                    } else {
                        $("#summaryInput").hide();
                    }
                });

                $(document).ready(function () {
                }).one("submit", ".sendText_" + field, function (e) {
                    e.preventDefault();
                    var test = localStorage.getItem("questionMultiple" + field);
                    var validations = [];
                    var answerOptions = [];
                    var value = [];
                    var valueM_: any = [];
                    var listForm = [];
                    $("input[name^='selector" + field + "']").each(function () {
                        if (this.checked) {
                            validations.push({ validation_id: this.id, value: 1 });
                        }
                    });

                    $("input[name^='valueM" + field + "']").each(function () {
                        if ($(this).val()) {
                            value.push(
                                $(this).val()
                            );
                        }
                    });

                    $('input[name^=optionM' + field + ']').each(function () {
                        if ($(this).val()) {
                            answerOptions.push({
                                answer_option_id: 1,
                                question_id: 3,
                                text: $(this).val(),
                                alias: "A1",
                                value: value[0],
                                icon: null,
                                position: 0,
                                status: 1
                            });
                        }
                    });

                    $("input[name^='valueM_" + field + "']").each(function (i) {
                        if ($(this).val()) {
                            valueM_.push(
                                $(this).val()
                            );
                        }
                    });

                    $('input[name^=optionM_' + field + ']').each(function (i) {
                        if ($(this).val()) {
                            answerOptions.push({
                                answer_option_id: 2,
                                question_id: 3,
                                text: $(this).val(),
                                alias: $(this).data('aliasm'),
                                value: valueM_[i],
                                icon: null,
                                position: $(this).data('m'),
                                status: 1
                            });
                        }
                    });

                    $("input[name^='titles_" + field + "']").each(function () {
                        if ($(this).val()) {
                            validations.push({
                                validation_id: this.id,
                                value: $(this).val()
                            });
                        }
                    });

                    // validations.push({
                    //     validation_id: 21,
                    //     value: $("select[name^='select" + field + "']").val()
                    // });

                    var model = {
                        question_id: null,
                        section_id: null,
                        question_subtype_id: 20,
                        text: $("#title_" + field).val(),
                        instructions: null,
                        alias: $(".p" + field).find(".child").html(),
                        position: $(".p" + field).find(".po").html(),
                        level: 1,
                        answerOptions: answerOptions,
                        validations: validations
                    };

                    // console.log(model);

                    encuesta.sections[0].questions.push(model);
                    localStorage.setItem("itemsArray", JSON.stringify(encuesta));

                    if (test) {
                        listForm = JSON.parse(test);
                    }
                    listForm.push(model);
                    localStorage.setItem("questionMultiple" + field, JSON.stringify(listForm));
                    Swal({
                        type: 'success',
                        title: 'Pregunta Guardada',
                        showConfirmButton: false,
                        timer: 2000
                    })

                      localStorage.removeItem("questionMultiple"+field);
                        $("#contain_"+field).hide();
                });

                var html = '<div class="all_div">' +
                    '<div class="row li_row" >' +
                    '<div class="col-12" >'
                    + getHeader(3, field) +
                    '</div>' +
                    '<h6 id="result_' + field + '" class="col-12" ></h6> ' +

                    '</div>' +
                    '</div> ' +
                    '<script>' +
                    '    function myFunction() {' +
                    '        document.getElementById("result_' + field + '").innerHTML = document.getElementById("title_' + field + '").value ' +
                    '    }' +
                    '</script>' +
                    '<style>' +
                    '    .titl{' +
                    '        cursor: pointer;' +
                    '         font-size: 30px;' +
                    '         width: 48px;' +
                    '         text-align: center;' +
                    '         color: #fff;' +
                    '         right: 0px;' +
                    '         position: absolute;' +
                    '         top: 10px;' +
                    '     }' +
                    '     .contain{' +
                    '         position: fixed;' +
                    '         z-index: 1;' +
                    '         overflow-y: scroll; height: 500px;' +
                    '         float: right;' +
                    '         right: 0px;' +
                    '         top: 57px;' +
                    '         width: 35%;' +
                    '         background: #3e4652;' +
                    '         line-height: 18px !important;' +
                    '         margin: 0 !important;' +
                    '         padding: 16px 48px 14px 18px;' +
                    '     }' +
                    '</style>' +
                    '<div id="contain_' + field + '" class="form_builder contain">' +
                    '    <h4>' +
                    '        <span style="color:#fff;font-weight: 350;">Configuración de campo</span>' +
                    '        <span data-field="' + field + '" class="hidden_bal_field titl">' +
                    '            <i class="fas fa-times"></i>' +
                    '        </span>' +
                    '    </h4>' +
                    '    <hr />' +
                    '    <form id="form_' + field + '" class="sendText_' + field + '">' +
                    '        <div class="row li_row form_output" data-type="checkbox" data-field="' + field + '">' +
                    '            <div class="col-md-12">' +
                    '                <div class="form-group">' +
                    '                    <input type="text" type="text" id="title_' + field + '" onkeyup="myFunction()" name="label_' + field + '" class="form-control form_input_label" value="" placeholder="Título de la pregunta" data-field="' + field + '" />' +
                    '                </div>' +
                    '            </div>' +
                    '        <div class="col-md-12">' +
                    '               <div id="check_' + field + '"></div>' +
                    '        </div>' +
                    '        <div id="summaryInput" class="form-group"> ' +
                    '               <div class="col-md-12"> ' +
                    '                   <span style="color:#fff;font-size: 11pt;position: relative;left: 0px;top: 0px;"> ' +
                    '                       Alias para pregunta en resumen de inventario</span>' +
                    '                       <input type="text" name="inventario" class="form-control form_input_label" placeholder="Texto informativo" /> ' +
                    '               </div>' +
                    '        </div> ' +
                    '        <div class="col-md-12">' +
                    '               <div id="input_' + field + '"></div>' +
                    '        </div>' +
                    '        <div class="m-3 row li_row">' +
                    '            <div class="col-md-12">' +
                    '                <div id="father_' + field + '" class="field_extra_info_' + field + '">' +
                    '                    <div data-field="' + field + '" class="row checkbox_row_' + field + '" data-opt="' + opt1 + '">' +
                    '                        <div class="col-md-2">' +
                    '                            <h5 style="color:#fff; padding-left: 10px;">' +
                    '                                1' +
                    '                            </h5>' +
                    '                        </div>' +
                    '                        <div class="col-md-4">' +
                    '                            <div class="form-group">' +
                    '                                <input type="text" id="optionM' + field + '" name="optionM' + field + '[]" value="" placeholder="Opción" class="c_opt form-control" />' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="col-md-4">' +
                    '                            <div class="form-group">' +
                    '                                <input type="number" id="valueM' + field + '" name="valueM' + field + '[]" value="" placeholder="Valor" class="c_val form-control" />' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="col-md-2">' +
                    '                            <i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_checkbox" data-field="' + field + '" style="color:#fff;">' +
                    '                            </i>' +
                    '                        </div>' +
                    '                    </div>' +
                    '                </div>' +
                    '            </div>' +
                    '        </div>' +
                    '        <div class="col-md-12">' +
                    '            <button id="submit_' + field + '" type="submit" class="btn btn-success">Guardar Pregunta</button>' +
                    '        </div>' +
                    '    </form>' +
                    '</div>';
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
                var count = $("#father_" + field).find(".answerChild_" + field).length + 2;
                var countR = $("#father_" + field).find(".answerChild_" + field).length + 1;
                var option = generateField();
                $('.field_extra_info_' + field).append(
                    '<div  data-opt="' + option + '" data-field="' + field + '" class="row radio_row_' + field + '">' +
                    '   <div class="col-md-2">' +
                    '      <h5 class="answerChild_' + field + '" style="color:#fff; padding-left: 10px;">' +
                    '        <span class="a">' + count + '</span>' +
                    '        <span style="display:none">A' + count + '</span>' +
                    '      </h5>' +
                    '   </div>' +
                    '   <div class="col-md-4">' +
                    '       <div class="form-group">' +
                    '           <input id="optionR_' + field + '" data-r="'+countR+'" data-alias="A' + count + '" name="optionR_' + field + '[]" type="text" value="" placeholder="Opción"  class="r_opt form-control"/>' +
                    '        </div>' +
                    '    </div>' +
                    '    <div class="col-md-4">' +
                    '        <div class="form-group">' +
                    '            <input id="valueR_' + field + ' " name="valueR_' + field + '[]" type="number" value="" placeholder="Valor" class="r_val form-control"/>' +
                    '        </div>' +
                    '    </div>' +
                    '    <div class="" style="position: absolute; right: 0px; padding-top: 5px;">' +
                    '        <i style="color:#fff;" class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_radio" data-field="' + field + '">' +
                    '        </i>' +
                    '        <i style="color:#fff;" class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_radio" data-field="' + field + '">' +
                    '        </i>' +
                    '    </div>' +
                    '</div>');
                var options = '';
                $('.radio_row_' + field).each(function () {
                    var opt = $(this).find('.r_opt').val();
                    var val = $(this).find('.r_val').val();
                    var s_opt = $(this).attr('data-opt');
                    options += '<label class="mt-radio mt-radio-outline"><input data-opt="' + s_opt + '" type="number" name="radio_' + field + '" value="' + val + '"> <p style="color:#fff;" class="r_opt_name_' + s_opt + '">' + ' ' + opt + '</p><span></span></label>';
                });
                $('.radio_list_' + field).html(options);
                getPreview();
            });

            $(document).on('click', '.add_more_checkbox', function () {
                $(this).closest('.form_builder_field').css('height', 'auto');
                var field = $(this).attr('data-field');
                var count = $("#father_" + field).find(".answerChild_" + field).length + 2;
                var countM = $("#father_" + field).find(".answerChild_" + field).length + 1;
                var option = generateField();
                $('.field_extra_info_' + field).append(
                    '<div data-opt="' + option + '" data-field="' + field + '" class="row checkbox_row_' + field + '">' +
                    '   <div class="col-md-2">' +
                    '      <h5 class="answerChild_' + field + '" style="color:#fff; padding-left: 10px;">' +
                    '        <span class="a">' + count + '</span>' +
                    '        <span style="display:none">A' + count + '</span>' +
                    '      </h5>' +
                    '   </div>' +
                    '   <div class="col-md-4">' +
                    '       <div class="form-group">' +
                    '           <input id="optionM_' + field + '" data-m="'+countM+'" data-aliasM="A'+count+'" name="optionM_' + field + '[]" type="text" value="" placeholder="Opción" class="c_opt form-control"/>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div class="col-md-4">' +
                    '       <div class="form-group">' +
                    '           <input id="valueM_' + field + ' "  name="valueM_' + field + '[]" type="number" value="" placeholder="Valor" class="c_val form-control"/>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div class="" style="position: absolute; right: 0px; padding-top: 5px;">' +
                    '       <i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_checkbox" style="color:#fff;" data-field="' + field + '"></i>' +
                    '       <i style="color:#fff;" class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_checkbox" data-field="' + field + '"></i>' +
                    '   </div>' +
                    '</div>');
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
                if (idd == idd) {
                    $('#contain_' + field).hide();
                }
            });
            $(document).on('click', '.edit_bal_field', function (e) {
                e.preventDefault();
                var field = $(this).attr('data-field');
                var field2 = 'contain_';
                var idd = field2 + field;
                if (idd == idd) {
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
