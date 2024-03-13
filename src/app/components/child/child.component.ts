import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  constructor(private cd: ChangeDetectorRef) { }
  @Input() data!: string[];

  refresh() {
    this.cd.detectChanges();
  }
}
