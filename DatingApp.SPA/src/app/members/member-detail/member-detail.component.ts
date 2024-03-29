import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/User';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user: User;
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute) {

   }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user);
    });
    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });


    // this.galleryOptions = [
    //   {
    //     width: '500px',
    //     height: '500px',
    //     imagePercent: 100,
    //     thumbnailsColumns: 4,
    //     imageAnimation: NgxGalleryAnimation.Slide,
    //     preview: false
    //   }
    // ];

    // this.galleryImages = this.getImages();
  }

  selectedTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }




  // getImages() {
  //   const imageUrls = [];
  //   for (let i = 0; this.user.photos.length; i++) {
  //     imageUrls.push({
  //       small: this.user.photos[0].url,
  //       medium: this.user.photos[0].url,
  //       big: this.user.photos[0].url,
  //       description: this.user.photos[0].description
  //     });
  //   }
  //   return imageUrls;
  // }

}
