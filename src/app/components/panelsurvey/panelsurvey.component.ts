import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Routes, RouterModule } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-panelsurvey',
  templateUrl: './panelsurvey.component.html',
  styleUrls: ['./panelsurvey.component.sass']
})
export class PanelsurveyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  
  d  = new Date();

  month = this.d.getMonth() + 1;
  day = this.d.getDate();
  hours = this.d.getHours();
  minutes = this.d.getMinutes();
  seconds = this.d.getSeconds();


  output = this.d.getFullYear() + '-' +
      (('' + this.month).length < 2 ? '0' : '') + this.month + '-' +
      (('' + this.day).length < 2 ? '0' : '') + this.day + ' ' + this.hours + ':' + this.minutes + ':' + this.seconds;

  

  newSurvey(): void {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Crear',
      showCancelButton: true,
      progressSteps: ['1']
    }).queue([
      {
        title: 'Pregunta 1',
        text: '¿Como se llamará la encuesta?'
      }

    ]).then((result) => {
      if (result.value) {
        var api = "http://10.89.49.10:8091/";
        var nameSurvey = result.value[0];
        var survey: any = {};
        var data = [];

        survey = {
          // "survey_id": null,
          "survey_type_id": 1,
          "status": 1,  //
          "name": nameSurvey,  //
          "creation_date": this.output,  //
          "environment": 2,  //
          "locked_user_id": 7,   //
          "owner_id": 4,     //
          "platform": 1,   //
          // "sections": [
          //   {
          //     "section_id": null,
          //     "survey_id": null,
          //     "title": "Sección I",
          //     "alias": "S1",
          //     "position": 0,
          //     "status": 1,
          //     "questions": []
          //   }
          // ]

        };
        // localStorage.setItem('itemsArray', JSON.stringify(survey));
        // window.location.href = "build2";

        $.ajax({
          url: api + "save",         
          type : "POST",                              
          dataType : "json",                                              
          contentType : "application/json",          
          data : JSON.stringify(survey), 
          statusCode: {
              500: function(){
                console.log("duplicada");
                Swal(
                  'Error!',
                  'Nombre de encuesta duplicada.',
                  'error'
              ).then(function(){
                  // window.location.href = "panel";
                })  
              }
          },                                           
          success : function(response) { 
              console.log(response);
              Swal(
                  'Enviado!',
                  'tu encuesta ha sido enviada con exito.',
                  'success'
              ).then(function(){
                survey.survey_id = response.survey_id;
                   localStorage.setItem('itemsArray', JSON.stringify(survey));
                   window.location.href = "build2";
                })                   
          },                                         
          error: function(response) {  
            console.log("error");
            console.log(response);
              // Swal(
              //     'Error!',
              //     'Nombre de encuesta duplicada.',
              //     'error'
              // ).then(function(){
              //     // window.location.href = "panel";
              //   })         
          }                                        
      }) ;
      }
    })
  }

}
