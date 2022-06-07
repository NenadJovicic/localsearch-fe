import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEqual } from 'lodash';
import { dayNames } from '../../models/day-names';
import {
  DisplayGroupedWorkingHours,
  OpeningHoursDto,
  OpeningHoursType,
  PlaceDto,
  WorkingHoursDto,
} from '../../models/place';
import { LsHttpService } from '../../services/ls-http.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit {
  private _place: PlaceDto | null = null;
  get place(): PlaceDto | null {
    return this._place;
  }

  set place(place: PlaceDto | null) {
    this._place = place;
    if (place) {
      this.groupedWorkingHours = this.createGroupedWorkingHours();
    }
  }

  groupedWorkingHours: DisplayGroupedWorkingHours[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly lsHttpService: LsHttpService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this.lsHttpService.getPlacePerId$(id).subscribe((place) => {
          this.place = place;
        });
      }
    });
  }

  private createGroupedWorkingHours(): DisplayGroupedWorkingHours[] {
    let arraysForGrouping: ArraysForGrouping = new ArraysForGrouping();
    this.place?.opening_hours.forEach(
      (currentDayOpeningHours, index, openingHours) => {
        let nextDayOpeningHours: OpeningHoursDto | null = null;
        if (index < 6) {
          nextDayOpeningHours = openingHours[index + 1];
        }
        arraysForGrouping = this.addCurrentDayAndCompareWithNext(
          currentDayOpeningHours,
          nextDayOpeningHours,
          arraysForGrouping
        );
      }
    );
    return this.groupDays(arraysForGrouping.daysWithSameWorkingHours);
  }

  private groupDays(
    daysWithSameWorkingHours: OpeningHoursDto[][]
  ): DisplayGroupedWorkingHours[] {
    return daysWithSameWorkingHours.map((groupedDays) => {
      const firstDay = groupedDays[0];
      let dayNamesCombined = dayNames[firstDay.day];
      if (groupedDays.length > 1) {
        const lastDay = groupedDays[groupedDays.length - 1];
        dayNamesCombined += ` - ${dayNames[lastDay.day]}`;
      }
      return {
        days: dayNamesCombined,
        workingHours: this.getWorkingHoursAsString(firstDay.working_hours),
      };
    });
  }

  private getWorkingHoursAsString(workingHours: WorkingHoursDto[]): string {
    const firstPartOfWorkingHours = workingHours[0];
    if (firstPartOfWorkingHours.type === OpeningHoursType.CLOSED) {
      return 'CLOSED';
    }
    return workingHours.reduce((hoursAsString, workingHoursPart, index) => {
      hoursAsString += `${workingHoursPart.start} - ${workingHoursPart.end}`;
      if (index < workingHours.length - 1) {
        return (hoursAsString += '\n');
      }
      return hoursAsString;
    }, '');
  }

  private addCurrentDayAndCompareWithNext(
    currentDayOpeningHours: OpeningHoursDto,
    nextDayOpeningHours: OpeningHoursDto | null,
    arraysForGrouping: ArraysForGrouping
  ): ArraysForGrouping {
    arraysForGrouping.currentLinkedDays.push(currentDayOpeningHours);
    if (
      nextDayOpeningHours &&
      isEqual(
        currentDayOpeningHours.working_hours,
        nextDayOpeningHours.working_hours
      )
    ) {
      return arraysForGrouping;
    } else {
      if (arraysForGrouping.currentLinkedDays.length > 0) {
        arraysForGrouping.daysWithSameWorkingHours.push(
          arraysForGrouping.currentLinkedDays
        );
        arraysForGrouping.currentLinkedDays = [];
      }
      return arraysForGrouping;
    }
  }
}

class ArraysForGrouping {
  daysWithSameWorkingHours: OpeningHoursDto[][] = [];
  currentLinkedDays: OpeningHoursDto[] = [];
}
