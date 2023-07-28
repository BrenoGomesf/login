import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.css']
})
export class ErrorViewComponent {
  @Input('title')
  title?: any = '';

  @Input('description')
  description?: any = '';

  @Input('view')
  view?: boolean = false;
}
