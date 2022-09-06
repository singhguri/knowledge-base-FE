import { Subject, BehaviorSubject } from 'rxjs';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  subject = new Subject();
  userId;
  ewayBill: boolean = false;
  status: boolean;
  showOrderIdInfo: boolean = false;
  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();
  private modalSource = new BehaviorSubject({});
  modalMessage = this.modalSource.asObservable();
  private order_form = new BehaviorSubject({});
  order_form_message = this.order_form.asObservable();
  private loginSatus = new BehaviorSubject(null);
  loginstatus = this.loginSatus.asObservable();
  public modalClosed = new Subject<boolean>();
  modalIsClosed = this.modalClosed.asObservable();
  public paymentModal = new Subject<boolean>();
  payment = this.paymentModal.asObservable();
  public shipOrder = new BehaviorSubject({});
  shipDetails = this.shipOrder.asObservable();
  public walletBal = new BehaviorSubject({});
  balance = this.walletBal.asObservable();
  public id = new BehaviorSubject(null);
  requestId = this.id.asObservable();
  public errorStatus = new BehaviorSubject({
    success: 0,
    failure: 0,
    data: [],
  });
  response = this.errorStatus.asObservable();
  public sendPassword = new BehaviorSubject('');
  password = this.sendPassword.asObservable();
  public downLoad = new BehaviorSubject('');
  downLoadData = this.downLoad.asObservable();
  public balanceUpdate = new BehaviorSubject('');
  balanceAmount = this.balanceUpdate.asObservable();
  public PassDate = new BehaviorSubject('');
  datePass = this.PassDate.asObservable();
  public reqId = new BehaviorSubject('');
  reqIdData = this.reqId.asObservable();
  public customerDetails = new BehaviorSubject({});
  customerDetails$ = this.customerDetails.asObservable();
  private renderer2: Renderer2;
  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer2 = rendererFactory.createRenderer(null, null);
  }
  getMessage(status) {
    this.loginSatus.next(status);
  }
  getUserId() {
    let data = JSON.parse(localStorage.getItem('data'));
    return data.id;
  }
  getUserData() {
    let data = JSON.parse(localStorage.getItem('data'));
    return data;
  }
  setLocalStorageOnlogin(resp) {
    localStorage.setItem('token', resp.respMsg);
    localStorage.setItem('data', JSON.stringify(resp.model));
    sessionStorage.setItem('token', resp.respMsg);
    sessionStorage.setItem('data', JSON.stringify(resp.model));
  }
  postFormSatus(status) {
    ////console.log('this.status',status)
    this.status = status;
    this.messageSource.next(this.status);
  }
  openRazor(data) {
    ////console.log('data',data);
    this.modalSource.next(data);
  }
  accordion(accStatus) {
    ////console.log('accStatus',accStatus)
    this.order_form.next(accStatus);
  }
  renderAddressList() {
    return this.modalClosed.next(true);
  }
  openPaymentModal() {
    ////console.log('open==>')
    return this.paymentModal.next(true);
  }
  sendShipDetails(data) {
    return this.shipOrder.next(data);
  }
  sendWalletBalance(data) {
    this.walletBal.next(data);
  }
  sendRequestId(data) {
    this.id.next(data);
  }
  errorResp(data) {
    this.errorStatus.next(data);
  }
  sendPass(password) {
    this.sendPassword.next(password);
  }
  downloadData(data) {
    this.downLoad.next(data);
  }
  updateBalance(data) {
    this.balanceUpdate.next(data);
  }
  passDate(data) {
    this.PassDate.next(data);
  }
  passRequestData(data) {
    this.reqId.next(data);
  }
  sendCustomerDetails(data) {
    this.customerDetails.next(data);
  }
  addTrackingSchema() {
    let script = this.renderer2.createElement('script');
    script.type = `application/ld+json`;
    script.id = 'schemaTracking';
    script.text = `
        { "@context": "http://schema.org",
        "@type": "Organization",
        "url":"https://app.bigship.in/shipment-tracking", "name":"Bigship Courier Aggregator",

        "contactPoint":[
        {"@type": "ContactPoint",
        "email": [ "reachus@bigship.in" ],

        "telephone": "+91 9971231073",
        "contactType":"Shipment Tracking",
        "areaServed": "India"
        }

        ],

        "address":{
        "@type": "PostalAddress",
        "streetAddress":"146-B/12, Guru Nanak Pura, Laxmi Nagar",
        "addressLocality":"New Delhi",
        "addressRegion":"Delhi NCR",
        "addressCountry":"India",
        "postalCode":"110092"
        }
        }
        `;

    this.renderer2.appendChild(this.document.body, script);
  }
  removeSchemaTracking() {
    const script = document.querySelector('#schemaTracking');
    this.renderer2.removeChild(this.document.body, script);
  }
  chatBotLoad() {
    if (document.getElementsByClassName('iticks-pop-button')[0]) {
      this.renderer2.setStyle(
        document.getElementsByClassName('iticks-pop-button')[0],
        'display',
        'block'
      );
    }
    setTimeout(() => {
      if (document.getElementsByClassName('iticks-last-container')[0]) {
        this.renderer2.setStyle(
          document.getElementsByClassName('iticks-last-container')[0],
          'display',
          'block'
        );
      }
      if (document.getElementsByClassName('iticks-notif-msg')[0]) {
        this.renderer2.setStyle(
          document.getElementsByClassName('iticks-notif-msg')[0],
          'display',
          'block'
        );
      }
    });
    // this.chatBot = this.renderer2.createElement('script');
    // this.chatBot.type = 'text/javascript';
    // this.chatBot.text = `(function(I, L, T, i, c, k, s) {if(I.iticks) return;I.iticks = {host:c, settings:s, clientId:k, cdn:L, queue:[]};var h = T.head || T.documentElement;var e = T.createElement(i);var l = I.location;e.async = true;e.src = (L||c)+'/client/inject-v2.min.js';h.insertBefore(e, h.firstChild);I.iticks.call = function(a, b) {I.iticks.queue.push([a, b]);};})(window, 'https://cdn.intelliticks.com/prod/common', document, 'script', 'https://app.intelliticks.com', '6cywwgHNSS7j7jv4H_c', {});`;
    // this.renderer2.appendChild(this.document.body, this.chatBot);
  }
  destroyChatBot() {
    if (document.getElementsByClassName('iticks-pop-button')[0]) {
      this.renderer2.setStyle(
        document.getElementsByClassName('iticks-pop-button')[0],
        'display',
        'none'
      );
    }
    console.log(document.getElementsByClassName('iticks-last-container')[0]);
    setTimeout(() => {
      this.renderer2.setStyle(
        document.getElementsByClassName('iticks-last-container')[0],
        'display',
        'none'
      );
      this.renderer2.setStyle(
        document.getElementsByClassName('iticks-notif-msg')[0],
        'display',
        'none'
      );
    });
  }
  addScriptGTag(userId) {
    const chatBot = this.renderer2.createElement('script');
    chatBot.type = 'text/javascript';
    chatBot.text = ` dataLayer = [{'event': 'successful-signup','registration-id': '${userId}',}];`;
    const gtag = document.getElementById('gtag');
    this.renderer2.insertBefore(this.document.head, chatBot, gtag);
  }
  loadScript(type: string) {
    // console.log('preparing to load...')
    // this.removeIntelliJ()
    const chatBot = this.renderer2.createElement('script');
    chatBot.async = true;
    chatBot.type = 'text/javascript';
    if (type === 'local') {
      chatBot.id = 'chatBotScript';
      chatBot.text = `(function(w,d,s,c,r,a,m){
        w['KiwiObject']=r;
        w[r]=w[r] || function () {
          (w[r].q=w[r].q||[]).push(arguments)};
        w[r].l=1*new Date();
          a=d.createElement(s);
          m=d.getElementsByTagName(s)[0];
        a.async=1;
        a.src=c;
        m.parentNode.insertBefore(a,m)
      })(window,document,'script',"https://app.interakt.ai/kiwi-sdk/kiwi-sdk-17-prod-min.js?v="+ new Date().getTime(),'kiwi');
      window.onload = function () {
        kiwi.init('', 'wXf9dYc9y8XQGUuFAayd4Xu85Lm4YroO', {});
      }`;
    } else if (type === 'intl') {
      chatBot.id = 'chatBotIntlScript';
      chatBot.text = `(function(w,d,s,c,r,a,m){
        w['KiwiObject']=r;
        w[r]=w[r] || function () {
          (w[r].q=w[r].q||[]).push(arguments)};
        w[r].l=1*new Date();
          a=d.createElement(s);
          m=d.getElementsByTagName(s)[0];
        a.async=1;
        a.src=c;
        m.parentNode.insertBefore(a,m)
      })(window,document,'script',"https://app.interakt.ai/kiwi-sdk/kiwi-sdk-17-prod-min.js?v="+ new Date().getTime(),'kiwi');
      window.onload = function () {
        kiwi.init('', 'wXf9dYc9y8XQGUuFAayd4Xu85Lm4YroO', {});
      }`;
    }
    this.renderer2.appendChild(this.document.head, chatBot);
  }
  loadMetaTag(content) {
    let meta = null;
    if (!document.querySelector('#pageMeta')) {
      meta = this.renderer2.createElement('meta');
      meta.name = 'description';
      meta.id = '#pageMeta';
    } else {
      meta = document.querySelector('#pageMeta');
    }
    this.loadContent(meta, content);
  }
  loadContent(meta, content) {
    meta.content = content;
  }
  removeIntelliJ() {
    const chatBot = this.document.head;
    const elements = this.document.getElementsByTagName('style');
    Array.from(elements).forEach((element) => {
      this.renderer2.removeChild(chatBot, element);
    });
  }
  remove() {
    const chatBot = this.document.head;
    const elements = document.getElementById('chatBotScript');
    this.renderer2.removeChild(chatBot, elements);
  }
  addMetaTag(route: string) {
    const oldMetaTag = this.document.querySelectorAll('meta');
    this.renderer2.removeChild(
      this.document.head,
      oldMetaTag[oldMetaTag.length - 1]
    );
    if (route === '/authentication/heavy-shipment') {
      const metaTag = this.renderer2.createElement('meta');
      metaTag.title =
        'LTL & FTL Shipment | Truck Transportaion | Heavy Shipment | Bigship';
      metaTag.name = 'description';
      metaTag.content =
        'Bigship is now making it seamless to deliver B2B or any heavy shipments Less than truck load and Full truck load (FTL & LTL) anywhere in India at cost-effective prices.';
      this.renderer2.appendChild(this.document.head, metaTag);
    } else if (route === '/authentication/signup') {
      const metaTag = this.renderer2.createElement('meta');
      metaTag.title = 'Bigship | Register | Signup | New User';
      metaTag.name = 'description';
      metaTag.content =
        'Get register your self at bigship registration page for free with you name, mobile number, email, password to eassy access your shipping Account.';
      this.renderer2.appendChild(this.document.head, metaTag);
    } else if (route === '/shipment-tracking') {
      const metaTag = this.renderer2.createElement('meta');
      metaTag.title =
        'Track Shipment or Orders | Bigship Courier Tracking | Consignment Status';
      metaTag.name = 'description';
      metaTag.content =
        'Track the current status of your shipment order/consignment with Bigship order tracking. Get real-time tracking information of your shipment. Just enter your AWB No. or Order ID in the online tool.';
      this.renderer2.appendChild(this.document.head, metaTag);
    }
  }
  removeMetaTag() {}
  // addTruckLoadGScript(){
  //   // this.remove();

  //   const chatBot = this.renderer2.createElement('script');
  //   chatBot.async = true;
  //   chatBot.type = 'text/javascript';
  //   chatBot.id = "chatBotTruckPageScript";
  //   chatBot.text = `(function(I, L, T, i, c, k, s) {if(I.iticks) return;I.iticks = {host:c, settings:s, clientId:k, cdn:L, queue:[]};var h = T.head || T.documentElement;var e = T.createElement(i);var l = I.location;e.async = true;e.src = (L||c)+'/client/inject-v2.min.js';h.insertBefore(e, h.firstChild);I.iticks.call = function(a, b) {I.iticks.queue.push([a, b]);};})(window, 'https://cdn.intelliticks.com/prod/common', document, 'script', 'https://app.intelliticks.com', '3JCWGPx64SbmveZge_c', {});`;
  //   this.renderer2.appendChild(this.document.head,chatBot);
  // }
  removeTruckLoadGScript() {
    const chatBot = this.document.head;
    const element = this.document.getElementById('chatBotTruckPageScript');
    this.renderer2.removeChild(chatBot, element);
  }
  removeChatBotScript() {
    const chatBot = this.document.head;
    const element = this.document.getElementById('chatBotScript');
    this.renderer2.removeChild(chatBot, element);
  }
}
