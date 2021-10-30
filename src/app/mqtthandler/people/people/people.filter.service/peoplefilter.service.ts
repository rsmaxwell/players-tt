import { Injectable, OnInit } from '@angular/core';
import { PersonFilter } from 'src/app/model/personfilter';

@Injectable({
  providedIn: 'root'
})
export class PeopleFilterService implements OnInit {

  filters: PersonFilter[] = [
    { id: "all", name: "all", selected: false },
    { id: "players", name: "players", selected: false },
    { id: "inactive", name: "inactive", selected: false },
    { id: "suspended", name: "suspended", selected: false }
  ];
  
  default: PersonFilter = this.filters[1];

  
  ngOnInit(): void {   
    this.default.selected = true
    // console.log("PeopleFilterService.ngOnInit(): default: " + JSON.stringify(this.default))  
  }

  defaultFilter(): PersonFilter {
    // console.log("PeopleFilterService.defaultFilter(): " + JSON.stringify(this.default))     
    return this.default;
  }  

  allFilters(): PersonFilter[] {
    // console.log("PeopleFilterService.allFilters()")    
    return this.filters;
  }
}
