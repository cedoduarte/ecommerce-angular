import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-textfield',
  standalone: true,
  imports: [MatInputModule,FormsModule],
  templateUrl: './search-textfield.component.html',
  styleUrl: './search-textfield.component.css'
})
export class SearchTextfieldComponent {
  @Output() searchTriggered = new EventEmitter<string>();
  searchText = "";  

  handleEnterKeyPressed() {
    this.searchTriggered.emit(this.searchText);
  }

  handleButtonClicked() {
    this.searchTriggered.emit(this.searchText);
  }
}
