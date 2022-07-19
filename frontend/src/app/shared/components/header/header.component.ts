import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getLoggedUser().subscribe((user: any) => {
      if (user) {
        this.username = user.name
      }
    })
  }

  logout() {
    localStorage.clear()
    this.dataService.setIsLoggedIn(false)
    this.router.navigate(['/auth'])
  }

}
