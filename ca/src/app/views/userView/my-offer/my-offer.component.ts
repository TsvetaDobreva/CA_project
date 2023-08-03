import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import jsPDF from 'jspdf';
import { IPositionPrice } from 'src/app/shared/interfaces/offerRequest';
import { IRowInMyOfferTable } from 'src/app/shared/interfaces/offer';

@Component({
  selector: 'app-my-offer',
  templateUrl: './my-offer.component.html',
  styleUrls: ['./my-offer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class MyOfferComponent implements OnInit {
  dataSource: IRowInMyOfferTable[] = [];
  columnsToDisplay = ['position', 'price', 'date'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: IRowInMyOfferTable  | null = null;

  constructor(private dataStore: ContactService) { }

  ngOnInit(): void {
    this.dataStore.getMyOfferBack().then((data) => {
      this.dataSource = data;
      let totalPrice = 0;
      data.forEach( (record: any, index: number) => {
        record.positionData.forEach((postData: any) => {
      
          totalPrice += Number(postData.price);
        })
        record.price = totalPrice + 'лв';
        totalPrice = 0;
      }) 
    })
  }

  generateData(positionData: IPositionPrice[]) {
    const result = [];

    for (let i = 0; i < positionData.length; i++) {
      const data: any = positionData[i];
      data.position = (i + 1).toString();
      result.push(Object.assign({}, data));
    }

    return result;
  };

  createHeaders(keys: any) {
    const result = [];
    for (let i = 0; i < keys.length; i++) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: i == 1 ? 132 : i == 2 ? 60 : 30,
        align: "center",
        padding: 5,
        columnStyles: {
          2: {cellWidth: 30},                           
      }    
      });
    }

    return result;
  }

  generatePdf(row: any) {
    let pdf = new jsPDF('p', 'mm', 'a4');

    pdf.setFont('../../../../assets/fonts/pt.ttf', "bold");
    pdf.text("Offer", 105, 40, undefined, "center");
    pdf.setFont('../../../../assets/fonts/pt.ttf', "regular");
    pdf.text("for", 105, 50, undefined, "center");
    pdf.text(`${row.name}`, 105, 60, undefined, "center");
    pdf.text("C.A. Agenda Ltd are presenting to your attention ", 105, 80, undefined, "center");
    pdf.text("an offer based on the parameters you set:", 105, 90, undefined, "center");
    
    const headers: any = this.createHeaders([
      "position",
      "measure",
      "price"
    ]);

    const data = this.generateData(row.positionData)
    pdf.table(20, 100, data, headers, {});
    pdf.save('string-test.pdf')
  }

  confirmOrder(element: IRowInMyOfferTable) {
    

  }
}

