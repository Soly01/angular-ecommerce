import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  sidebarVisible1: boolean = false;
  constructor() {}
  sideBarOpen() {
    this.sidebarVisible1 = !this.sidebarVisible1;
  }
}
