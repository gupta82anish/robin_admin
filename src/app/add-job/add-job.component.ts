import { Component, OnInit } from '@angular/core';
import { SubnavService } from '../subnav.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  subnavItems:any = [
    {
      title:'Jobs',
      route:'/refr/jobs'
    },
    {
      title:'Candidate Applications',
      route:'/refr/candidate-applications'
    },
    {
      title:'Manage Users',
      route:'/refr/users'
    },
    {
      title:'Invitation Requests',
      route:'/refr/invitations'
    }
  ]
  constructor(private subnav:SubnavService) {
    this.subnav.subnavItems.next(this.subnavItems);

  }

  ngOnInit() {
    // this.router.navigate(['/robin/add-user'])
  }

  
}
