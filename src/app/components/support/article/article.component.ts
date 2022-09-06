import { Router } from '@angular/router';
import { GlobalsX } from './../../../services/globals';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: any;

  constructor(
    private gl: GlobalsX,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // if (!this.gl.article) this.router.navigateByUrl('/support');

    this.article = this.gl.article ?? {
      articleHeadingId: 1,
      content:
        '<article class="article-body" id="article-body" rel="image-enlarge">\n\t\t<p>You can connect with the Shiprocket support team via chat, email, or call&nbsp;</p><p><br></p><ul><li><strong><u>Chat</u></strong> \n\t\t- Say hello to us via chat for a faster resolution. It\'s available at the bottom-right corner of your Shiprocket panel.<br><br></li><li><strong><u>Email</u></strong> - We recommend you to write an email in case you wish to contact us during offline hours. You can also write to us if you have over one query.<br><br></li><li><strong><u>Call</u></strong> - We recommend you to connect over a call if you have a time-sensitive concern and it needs to be addressed immediately.<br><br></li><li><p><strong><u>Create a Ticket</u></strong> - You can also create a ticket from your Shiprocket panel if you are looking for fast resolutions on your query.</p><br></li></ul><p>Please note that the support team is available from <strong>Monday to Friday between 10:00 AM to 7:00 PM</strong> and <strong>Saturday between 10:00 AM to 6:00 PM</strong>.</p><p><br></p><p>Find the <strong>Shiprocket Support</strong> <strong>Escalation Matrix</strong> below for your reference:</p><p><br></p><table border="1" cellpadding="0" cellspacing="0" dir="ltr"><tbody><tr><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Help Desk Line\\t&quot;}" style="width: 10.7588%;"><strong>Help Desk Line</strong></td><td data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:9266623005}" style="width: 35.9003%;">9266623006</td><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Call from your registered mobile number&quot;}">Call from your registered mobile number</td></tr><tr><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Email Support&quot;}" style="width: 10.7588%;"><strong>Email Support</strong></td><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;support@shiprocket.in&quot;}" style="width: 35.9003%;">support@shiprocket.in</td><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Write us from your registered email id&quot;}">Write us from your registered email id</td></tr><tr><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Escalation Desk&quot;}" style="width: 10.7588%;"><strong>Escalation Desk</strong></td><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Escalation@kartrocket.com&quot;}" style="width: 35.9003%;">escalation@shiprocket.in</td><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Write us with Ticket number in case you are not \\nsatisified with reply shared on complaint.&quot;}">Write us with Ticket number in case you are not<br>satisfied with the reply shared by the support team.</td></tr><tr><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Feedback&quot;}" style="width: 10.7588%;"><strong>Feedback</strong></td><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;feedback@kartrocket.com&quot;}" style="width: 35.9003%;">feedback@shiprocket.in</td><td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Share your feedback if you are satisfied or \\nun-satisfied with Shiprocket support.&quot;}">Share your feedback if you are satisfied or<br>unsatisfied with the Shiprocket support.</td></tr></tbody></table><p><br></p><p><br></p>\n\t</article>',
      id: 1,
      isActive: true,
      selected: true,
      tags: null,
      title: 'How do I contact the Bigship support team?',
      updatedDate: '2022-07-23T02:18:49.7',
      version: '1.0',
      visitCount: null,
      wasHelpful: null,
    };

    if (this.article) {
      const contentHTML: HTMLElement =
        this.el.nativeElement.querySelector('#content');

      if (contentHTML) contentHTML.innerHTML = this.article.content;
    }
  }
}
