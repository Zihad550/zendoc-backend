import axios from "axios";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { IPaymentData } from "./ssl.interface";

const initPayment = async (paymentData: IPaymentData) => {
  try {
    const data = {
      store_id: config.SSL_STORE_ID,
      store_passwd: config.SSL_STORE_PASS,
      total_amount: paymentData.amount,
      currency: "BDT",
      tran_id: paymentData.transactionId, // use unique tran_id for each api call
      success_url: config.SSL_SUCCESS_URL,
      fail_url: config.SSL_FAIL_URL,
      cancel_url: config.SSL_CANCEL_URL,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "N/A",
      product_name: "Appointment",
      product_category: "Service",
      product_profile: "general",
      cus_name: paymentData.name,
      cus_email: paymentData.email,
      cus_add1: paymentData.address,
      cus_add2: "N/A",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: paymentData.phoneNumber,
      cus_fax: "01711111111",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: 1000,
      ship_country: "N/A",
    };

    const response = await axios({
      method: "post",
      url: config.SSL_PAYMENT_API,
      data: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data;
  } catch {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment error occured!");
  }
};

const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.SSL_VALIDATION_API}?val_id=${payload.val_id}&store_id=${config.SSL_STORE_ID}&store_passwd=${config.SSL_STORE_PASS}&format=json`,
    });

    return response.data;
  } catch {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed!");
  }
};

export const SSLServices = {
  initPayment,
  validatePayment,
};
