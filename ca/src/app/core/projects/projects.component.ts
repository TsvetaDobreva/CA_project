import { Component } from '@angular/core';
import { IBuilding } from 'src/app/shared/interfaces/building';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})




export class ProjectsComponent {
  buildingInfo : IBuilding[] = dataSource;


}

  const dataSource = [
    { 
      name : 'Офис сграда Каменица',
      city : 'град Пловдив',
      description : 'Използвани системи : Schüco AF UDC 80 CV. <br>' +
                    'Дебелина на стъклопакета от 22 до 70 мм. <br>' +
                    'Напълно скрит обков.',
      backgroundImage: '../../../assets/buildings/kamenica.jpg'
    },
    { 
      name : 'Жилищна сграда М2',
      city : 'град София',
      description : 'Използвани системи : Schüco ASS 50.NI. <br>' + 
                    'С възможност за дебелина на стъклопакета между 8 мм и 32 мм. <br>' +
                    'Клас на защита от влизане с взлом RC 2',
      backgroundImage: '../../../assets/buildings/sofia-m-2.jpg'
    },    
    { 
      name : 'Виа парк север',
      city : 'град Варна',
      description : 'Използвани системи : Jansen VISS SG. <br>' + 
                    'Подходяща за изграждане на двоен или троен изолационен стъклопакет с големина до 70 мм. <br>' +
                    'Възможно покривно остъкляване при ъгъл от 7° до 90°.',
      backgroundImage: '../../../assets/buildings/home_photo.jpg'
    }
  ]