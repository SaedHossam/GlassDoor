import { ApplicationDto } from './../../models/application-dto';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css'],
})
export class JobApplicationsComponent implements OnInit {
  applications: ApplicationDto[];

  constructor(
    private _applicationService: ApplicationService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((p) => {
      this._applicationService.getAllJobApplications(p.id).subscribe((a) => {
        console.log(a);
        this.applications = a;
      });
    });
  }
}
