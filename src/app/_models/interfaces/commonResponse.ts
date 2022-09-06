export interface CommonApiResponse<T> {
  data: T;
  message: string;
  responseCode: number;
  success: boolean;
}

export interface CommonApiResponseNew<T> {
  lstModel: T[];
  model: T;
  respMsg: string;
  respStatus: boolean;
}

export interface LoginUserDetails {
  addedOn: string;
  companyName: string;
  emailId: string;
  firstName: string;
  isMobileVerifed: boolean;
  lastName: string;
  mobileNo: number;
  otp: string;
  planId: number;
  registeredBy: string;
  roleId: number;
  status: boolean;
  token: string;
  tokenExpiresIn: string;
  updatedOn: string;
  userId: number;
  userTypeId: number;
}
export interface ZoneChart {
  zoneAPercentage: number;
  zoneBPercentage: number;
  zoneCPercentage: number;
  zoneDPercentage: number;
  zoneEPercentage: number;
}

export interface Top5SateName {
  count: number;
  stateName: string;
}
export interface GetOrders {
  ordersResponseDTOs: [
    {
      attempt: { totalAttempts: number; currentAttemptStatus: number };
      currentAttemptStatus: number;
      totalAttempts: number;
      channel: string;
      customerDetails: {
        name: string;
        email: string;
        mobileNo: string;
        altMobileNo: string;
      };
      altMobileNo: string;
      email: string;
      mobileNo: string;
      name: string;
      deliveryDate: string;
      dimension: {
        weight: number;
        length: number;
        breadth: number;
        heigth: number;
        volumetric: number;
        entered: number;
      };
      breadth: number;
      entered: number;
      heigth: number;
      length: number;
      volumetric: number;
      weight: number;
      eddDate: string;
      lastUpdate: string;
      manifestDate: string;
      orderDate: string;
      orderId: number;
      payment: { amount: number; paymentMode: string };
      amount: number;
      paymentMode: string;
      pickupAddress: {
        pickUpAddressLine1: string;
        pickUpAddressLine2: string;
        pickupCity: string;
        pickupPinCode: number;
        pickupState: string;
        pickupCutOff: string;
        pickupDate: string;
      };
      productDetails: [{ itemName: string; quantity: number }];
      returnDeliveredDate: string;
      shippingDetails: {
        courierId: number;
        courierName: string;
        awbNumber: string;
      };
      awbNumber: string;
      courierId: number;
      courierName: string;
      status: string;
      userOrderId: string;
    }
  ];
  totalRecords: number;
}
export interface TrackingWithAwb {
  awbTrackingDetails: [
    {
      trackDate: string;
      trackTime: string;
      trackActivityStatus: string;
      trackActivityRemarks: string;
      trackLocation: string;
    }
  ];
  orderDetail: {
    courierImage: string;
    courierName: string;
    orderId: string;
    orderPlacedOn: string;
    orderStatus: string;
    trackingId: string;
  };
}
