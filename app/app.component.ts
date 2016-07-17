import { Component } from '@angular/core';

import { JournalsComponent } from './journals.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [JournalsComponent]
})
export class AppComponent { }