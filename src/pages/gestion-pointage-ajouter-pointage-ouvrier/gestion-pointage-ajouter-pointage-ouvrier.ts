import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GestionPointageAjouterPointageOuvrierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-pointage-ajouter-pointage-ouvrier',
  templateUrl: 'gestion-pointage-ajouter-pointage-ouvrier.html',
})
export class GestionPointageAjouterPointageOuvrierPage {

  calendarOptions ={
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    selectable: true,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: function(info) {
      alert('clicked ' + info.dateStr);
    },
    select: function(info) {
      alert('selected ' + info.startStr + ' to ' + info.endStr);
    }
  };
/*
  calendarOptions:Object = {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    fixedWeekCount : true,
    defaultDate: '2016-09-12',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    views: {
      dayGridMonth: { // name of view
        titleFormat: 'YYYY, MM, DD'
        // other view-specific options here
      }
    },

    editable: true,
    selectable: true,
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    height: 600,
    contentHeight: 300,
    aspectRatio:1, //permet de definir le rapport entre le height et le width d une seule case correspondant a un jour
    eventLimit: true, // allow "more" link when too many events
    handleWindowResize: true,
    dayRender: function (date, cell) {

      if(date._d.toString() == new Date(Date.UTC(2016, 8, 1))){
        cell.css("background-color", "#ff0000a3");

      }
    },
    select: function(info) {
      alert('Clicked on: ' + info.dateStr);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('Current view: ' + info.view.type);
      // change the day's background color just for fun
      info.dayEl.style.backgroundColor = 'red';
    },
    events: [
      {
        title: 'Mrid',
        start: '2016-09-01',
        backgroundColor: "red"
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      },
      {
        id: 999,
        title: "Ka3i",
        start: '2016-09-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T10:30:00',
        end: '2016-09-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2016-09-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2016-09-12T20:00:00'
      },
      {
        title: 'Chta bezaf',
        start: '2016-09-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28'
      }
    ]
  };
*/


  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

  onCalendarInit($event: boolean) {
    console.log($event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionPointageAjouterPointageOuvrierPage');
  }

}
