import Axios from "axios";
import * as Constants from "../utils/constants";
import { headers } from "../utils/utils";

export async function FetchProducts() {
  try {
    var res = await Axios({
      method: "get",
      headers: headers(),
      url: Constants.BASE_URL + "/products/get_products.php",
      validateStatus: () => true,
    });

    console.log(res);
    if (!res.data["error"]) {
      return res.data["data"];
    } else {
      return null;
    }
    // return response.data
    // alert(res);
  } catch (error) {
    // console.log(res);
    return null;
  }
}

export async function AddProducts(data) {
  try {
    let response = await Axios.post(
      Constants.BASE_URL + "/products/add_product.php",
      {
        product_name: data.product_name,
        product_price: data.product_price,
        size_id: data.size_id,
        category_id: data.category_id,
      },
      {
        headers: headers(),
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function UpdateProduct(data) {
  try {
    var res = await Axios({
      method: 'post',
      headers: headers(),
      url: Constants.BASE_URL + "/products/update_product.php",
      validateStatus: () => true,
      data: {
        product_id: data.product_id,
        product_name: data.product_name,
        product_price: data.product_price,
        category_id: data.category_id
      }
    })
    console.log('API: ', res)
  } catch (error) {
    console.log('API Error: ', error.res.data)
  }
}