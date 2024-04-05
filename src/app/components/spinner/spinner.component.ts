import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @ViewChild('parent') parent: ElementRef | undefined;

  @Input() ativo: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (!this.ativo) {
      this.desativar();
    } else {
      this.ativar();
    }
  }

  ativar(): void {
    if (!this.parent) return;

    this.parent.nativeElement.parentElement.style.display = '';
  }

  desativar(): void {
    if (!this.parent) return;

    this.parent.nativeElement.parentElement.style.display = 'none';
  }

}
