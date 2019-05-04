
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'test1',
  templateUrl: 'test1.html',
})
export class Test1Page {

  calendarOptions:Object = {
    fixedWeekCount : true,
    defaultDate: '2016-09-12',
    header: { center: 'month,agendaWeek' },
    views: {
      dayGridMonth: { // name of view
        titleFormat: 'YYYY, MM, DD'
        // other view-specific options here
      }
    },

    editable: true,
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  onCalendarInit($event: boolean) {
    console.log($event);
  }
}






