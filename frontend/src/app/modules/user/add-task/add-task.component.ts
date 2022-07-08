import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>;
  bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal() {
    this.bsModalRef = this.bsModalService.show(this.template)
  }

}
