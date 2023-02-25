import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { PersonFilter } from 'src/app/model/personfilter';
import { PeopleFilterService } from '../people.filter.service/peoplefilter.service';

@Component({
  selector: 'peoplefilter',
  templateUrl: './peoplefilter.component.html',
  styleUrls: ['./peoplefilter.component.scss']
})
export class PeopleFilterComponent implements OnInit {

  currentFilter!: PersonFilter;

  @Output() filterEvent = new EventEmitter<PersonFilter>();

  constructor(
    private peopleFilterService: PeopleFilterService
  ) {}


  ngOnInit(): void {
    console.log("PeopleFilterComponent.ngOnInit")

    for (var filter of this.allFilters()) {
      filter.selected = false
    }

    this.currentFilter = this.peopleFilterService.defaultFilter()
    this.select(this.currentFilter)
  }

  isCurrentFilter(filter: PersonFilter) {
    return (filter.id == this.currentFilter.id)
  }

  select(filter: PersonFilter): void {
    console.log("PeopleFilterComponent.select: filter: " + JSON.stringify(filter))

    this.currentFilter.selected = false
    this.currentFilter = filter
    this.currentFilter.selected = true

    this.filterEvent.emit(filter)
  }

  allFilters(): PersonFilter[] {
    return this.peopleFilterService.allFilters();
  }
}
