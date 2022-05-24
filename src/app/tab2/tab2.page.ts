import { Component } from '@angular/core';
import { DataService} from '../services/data.service';
import { ModalService } from '../modal/modal.service';
import { BookservicePage } from './bookservice/bookservice.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  allServices: any[];

  render = '';
  constructor(
    private dataService : DataService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
  
      this.getAllServices();
      
    
  }
  bookService(service) {
    console.log(" Btn Click working");
    this.modalService.presentModal(
      BookservicePage,
      {
        service: service,
      }
    );

  }
  getAllServices() {
    this.dataService.getAllServices().on('value', (snapshot) => {
      // this.render = 'render here'
      console.log('snapshot', snapshot);

      this.allServices = this.dataService.extractServices(snapshot);
      
    });

    console.log('get all Services', this.allServices);
  }
}
