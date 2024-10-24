import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent {
  @ViewChild('search') searchTextBox!: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues = [];
  @Input() data: string[] = [
    'A1',
    'A2',
    'A3',
    'B1',
    'B2',
    'B3',
    'C1',
    'C2',
    'C3',
  ];

  filteredOptions!: Observable<any[]>;

  ngOnInit() {
    /**
     * Set filter event based on value changes
     */
    this.filteredOptions = this.searchTextboxControl.valueChanges.pipe(
      startWith<string>(''),
      map((name) => this._filter(name))
    );
  }

  /**
   * Used to filter data based on search input
   */
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.data.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
    return filteredList;
  }

  /**
   * Remove from selected values based on uncheck
   */
  selectionChange(event: { isUserInput: any; source: any }) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(<never>event.source.value);
      this.selectedValues.splice(index, 1);
    }
  }

  openedChange(e: boolean) {
    // Set search textbox value as empty while opening selectbox
    this.searchTextboxControl.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  /**
   * Clearing search textbox value
   */
  clearSearch(event: { stopPropagation: () => void }) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  /**
   * Set selected values to retain the state
   */
  setSelectedValues() {
    if (
      this.selectFormControl.value &&
      this.selectFormControl.value.length > 0
    ) {
      this.selectFormControl.value.forEach((e: never) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }
}
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
