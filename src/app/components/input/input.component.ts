import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Input, input, OnInit, Output, ViewChild, viewChild } from '@angular/core';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})

export class InputComponent implements OnInit {
  @ViewChild("arrow") arrow: any;
  @ViewChild("dropdownInput") dropdownInput: any;
  @ViewChild("container") container: any;
  @ViewChild('els') els: any;
  @ViewChild('elss') elss: any;
  @Input() type: string = "input";
  @Input() name: string = "name";
  @Input() placeholder: string = "";
  @Input() value: any;
  @Input() data: any;
  @Input() dataType: any;
  selectedCar: number = -1;
  selectedIndex: number = -1;

  @Output() valueEmiter = new EventEmitter<any>()

  ngOnInit(): void {
    if (this.data)
      this.data = JSON.parse(this.data);
  }

  select(e: Event) {
    this.selectedCar = +(e.target! as HTMLDivElement).id
    this.selectedIndex = +(e.target! as HTMLDivElement).id
    this.valueEmiter.emit(+(e.target! as HTMLDivElement).id);
    if (this.dataType === "cars")
      (this.dropdownInput.nativeElement! as HTMLInputElement).value = this.data[this.selectedIndex].make
    else
      (this.dropdownInput.nativeElement! as HTMLInputElement).value = this.data[this.selectedIndex]
  }

  show(e: Event) {
    if (this.container!.nativeElement.classList.contains("active")) {
      this.arrow!.nativeElement.classList.add("down");
      this.arrow!.nativeElement.classList.remove("up");
      this.container!.nativeElement.classList.remove('active')

    } else {
      this.arrow!.nativeElement.classList.remove("down");
      this.arrow!.nativeElement.classList.add("up");
      this.container!.nativeElement.classList.add('active')
    }
  }
  emit(e: Event) {
    this.valueEmiter.emit((e.target! as HTMLInputElement).value);
  }
}