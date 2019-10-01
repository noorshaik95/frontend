import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]

})

export class OrderComponent implements OnInit {
  orders: Order[] = [{
    orderNumber: 1,
    orderDueDate: '2019-10-25',
    customerBuyerName: 'Noor Shaik',
    customerAddress: 'Hyderabad',
    customerPhoneNumber: '7799532581',
    orderTotal: 125000
  }];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  modalReference: NgbModalRef;
  headers = ['Order Number', 'Order Due Date', 'Customer Buyer Name', 'Customer Address', 'Customer Phone', 'Order Total', 'Actions'];
  formType: string;
  orderForm: FormGroup;
  phoneNumberRegex = /^[6789]\d{9}$/;
  currentIndex: number;
  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.defaultForm();
  }
  addNew(modal) {
    this.formType = 'Add';
    this.defaultForm();
    this.openForm(modal);
  }
  openEditForm(modal, index) {
    this.formType = 'Update';
    this.currentIndex = index;
    this.orderForm.setValue({...this.orders[index], orderDueDate: new Date(this.orders[index].orderDueDate)});
    this.openForm(modal);
  }
  openForm(modal) {
    this.modalReference = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }
  defaultForm() {
    this.orderForm = new FormGroup({
      orderNumber: new FormControl(null, [Validators.required]),
      orderDueDate: new FormControl(null, [Validators.required]),
      customerBuyerName: new FormControl(null, [Validators.required]),
      customerPhoneNumber: new FormControl(null, [Validators.required, Validators.pattern(this.phoneNumberRegex)]),
      orderTotal: new FormControl(null, [Validators.required]),
      customerAddress: new FormControl(null, [Validators.required])
    });
  }
  submitForm() {
    if (this.formType === 'Add') {
      this.orders.push(this.orderForm.value);
    } else {
      this.orders[this.currentIndex] = this.orderForm.value;
    }
    this.defaultForm();
    this.modalReference.close();
  }
  deleteOrder(index) {
    this.orders.splice(index, 1);
  }
  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login'])
  }
}
