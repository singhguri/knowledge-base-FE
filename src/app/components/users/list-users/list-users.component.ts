import { Subscription } from 'rxjs';
import { GlobalsX } from './../../../services/globals';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  usersList: any;

  isSelectedAll: boolean = false;
  selectedOn: boolean;
  toggleStatus: boolean;
  subscribe: Subscription[] = [];

  constructor(
    private srv: AuthService,
    private gl: GlobalsX,
    private router: Router
  ) {
    gl.addUser = false;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.subscribe.push(
      this.srv.GetAll().subscribe((m) => {
        if (m.respStatus) {
          this.usersList = m.lstModel;
          console.log(this.usersList);
        }
      })
    );
  }

  toggleAll() {
    // console.log(this.usersList);

    this.toggleStatus = !this.isSelectedAll;
    if (this.usersList.length > 0) {
      this.usersList.forEach((user) => {
        user.selected = this.toggleStatus;
      });
    }
    this.isSelectedAll = this.usersList.every((user) => user.selected === true);
    // if (this.isSelectedAll) {
    //   this.ordersToBeShipped = [];
    //   this.usersList.forEach((element) => {
    //     // this.ordersToBeShipped.push({orderId:element.orderId})
    //     this.ordersToBeShipped.push(element);
    //   });
    // } else {
    //   this.ordersToBeShipped = [];
    // }
    this.selectedOn = this.usersList.every((user) => user.selected === false);
    ////console.log(this.isSelectedAll ? !this.isSelectedAll : this.selectedOn)
  }

  toggleOne(event, order) {
    ////console.log(event, 'event');
    this.selectedOn = !event;
    // this.fillArrayTobeShipped(order);
    this.checkForSelection();

    this.isSelectedAll = this.usersList.every((user) => user.selected === true);

    // this.VolumetricWeight = order.dimension.volumetric;
    // this.weight = order.dimension.weight;
    // // console.log("this.orders_list", this.orders_list);
    // this.enableBulkShip = this.ordersToBeShipped.every(
    //   (order) =>
    //     order.dimension?.volumetric < 10 && order.dimension?.weight < 10
    // );
    // console.log("this.ordersToBeShipped", this.ordersToBeShipped);
  }

  checkForSelection() {
    this.selectedOn = this.usersList.every((user) => user.selected === false);
  }

  editUser(user) {
    this.gl.user = user;
    this.router.navigate(['/users/add-user']);
  }

  ngOnDestroy() {
    this.subscribe.forEach((el) => el.unsubscribe());
  }
}
