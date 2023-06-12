import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @ContentChild('rows') rows!: TemplateRef<any>;
}
