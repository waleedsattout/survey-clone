import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css'
})
export class RadioComponent implements OnInit {
  @Input() name: string = "name";
  @Input() label: string = "label";
  @Input() value: string = "value";
  @Input() content: string | any;
  @Input() checked = false;
  @Input() data: any;
  @Input() class: any;
  @Output() valueEmiter = new EventEmitter<any>()

  time: any

  constructor(private sanitizer: DomSanitizer,
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) { }

  ngOnInit() {
    this.time = Math.random()
    if (this.content)
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.content)
    if (this.data != undefined)
      this.renderer.addClass(this.elementRef.nativeElement, this.class);
  }

  emit(e: any) {
    this.valueEmiter.emit((e.target as HTMLInputElement).value);
  }
}
