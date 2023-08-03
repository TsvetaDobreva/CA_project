import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ContactService } from 'src/app/services/contact.service';
import { IDialogShowOfferRequest, IOfferRequest, IPositionPrice, IShowNewOfferRequest } from 'src/app/shared/interfaces/offerRequest';
import { MatDialog } from '@angular/material/dialog';
import { NewOfferDialogComponent } from '../new-offer-dialog/new-offer-dialog.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})

export class NewOffersComponent implements OnInit{
  arrPosition: IDialogShowOfferRequest | undefined;

  dataSource: any[] = [];
  columnsToDisplay = ['position', 'email', 'date'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null = null;

  constructor(private dataStore: ContactService, public dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    this.dataStore.getNewRequest().then((data) => {
      this.dataSource = data;
    })
  }

    openDialog(element: IShowNewOfferRequest): void {
      const emptyInfo: IPositionPrice = {measure: '', price: ''}
      const emptyArray = [];
      for(let i = 0; i < element.count; i++) {
        emptyArray.push(JSON.parse(JSON.stringify(emptyInfo)))
      }
      emptyArray.map((value) => value = emptyInfo)
    const dialogRef = this.dialog.open(NewOfferDialogComponent, {
      data: Object.assign(element, {arrPosition: emptyArray})
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.dataStore.changeStatus(result.uid, 'send');
      this.dataStore.sendBackOffer(result);
      
    });
  }

  
  // public openPDF(): void {
  //   let pdf = new jsPDF('p','mm', 'a4');
  //   pdf.text('hello world', 20, 20);
  //   debugger
  //   pdf.save('string-test.pdf')
    

    // let DATA: any = document.getElementById('htmlData');
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 208;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   PDF.save('angular-demo.pdf');
    // });
  // }
}

