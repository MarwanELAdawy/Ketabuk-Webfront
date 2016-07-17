import { Component } from '@angular/core';

import { JournalsService } from './journals.service';
import { Journal } from './journal';

@Component({
    selector: 'my-journals',
    templateUrl: 'app/journals.component.html',
    providers: [
    JournalsService
  ]
})
export class JournalsComponent
{
    journals = ['test', 'testing', 'oh yeah'];
}