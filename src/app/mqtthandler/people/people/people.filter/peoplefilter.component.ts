import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { PersonFilter } from 'src/app/model/personfilter';
import { PeopleFilterService } from '../people.filter.service/peoplefilter.service';

@Component({
  selector: 'peoplefilter',
  templateUrl: './peoplefilter.component.html',
  styleUrls: ['./peoplefilter.component.scss']
})
export class PeopleFilterComponent implements OnInit {

  currentItem!: PersonFilter;

  @Output() filterEvent = new EventEmitter<PersonFilter>();

  constructor(
    private peopleFilterService: PeopleFilterService
  ) { 
    this.currentItem = peopleFilterService.defaultFilter()
  }


  ngOnInit(): void {
    // console.log("PeopleFilterComponent.ngOnInit: filter: " + JSON.stringify(this.currentItem)) 

    for (var filter of this.filters()) {
      filter.selected = false
    }

    this.select(this.currentItem)
  }

  select(filter: PersonFilter): void {
    // console.log("PeopleFilterComponent.select: filter: " + JSON.stringify(filter))

    this.currentItem.selected = false
    this.currentItem = filter
    this.currentItem.selected = true

    this.filterEvent.emit(filter)
  }

  filters(): PersonFilter[] {
    return this.peopleFilterService.allFilters();
  }
}
