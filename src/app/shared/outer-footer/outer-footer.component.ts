import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outer-footer',
  templateUrl: './outer-footer.component.html',
  styleUrls: ['./outer-footer.component.css']
})
export class OuterFooterComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  navigate(type){
    console.log('svch');
    switch(type){
      case 'login':
        this.route.navigate(['/authentication/login'])
      break;
      case 'register':
      this.route.navigate(['/authentication/signup'])
    }
    
  }
}
