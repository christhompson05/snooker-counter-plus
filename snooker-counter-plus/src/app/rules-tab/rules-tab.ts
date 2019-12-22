import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-tab2',
  templateUrl: 'rules-tab.html',
  styleUrls: ['rules-tab.scss']
})
export class RulesTab {
  youtubeLinkUrl = 'https://www.youtube.com/embed/CjSWUTkupQo';
  trustedLinkUrl: SafeResourceUrl;

  constructor(
      private domSanitizer: DomSanitizer
  ) {}

  ionViewWillEnter() {
    this.trustedLinkUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.youtubeLinkUrl);
  }
}
