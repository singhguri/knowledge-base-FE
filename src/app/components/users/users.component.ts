import { Router } from '@angular/router';
import { GlobalsX } from './../../services/globals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(public gl: GlobalsX, private router: Router) {}

  ngOnInit(): void {}

  addUser() {
    this.gl.user = null;
    this.router.navigate(['/users/add-user']);
  }
}
