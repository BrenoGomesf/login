import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-view',
  templateUrl: './success-view.component.html',
  styleUrls: ['./success-view.component.css']
})
export class SuccessViewComponent {
  @Input('title')
  title?: any = '';

  @Input('description')
  description?: any = '';

  @Input()
  view?: boolean = false;

}
