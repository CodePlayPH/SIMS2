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
    var response = await Axios({
      method: "post",
      headers: headers(),
      url: Constants.BASE_URL + "/products/add_product.php",
      data: {
        product_name: data["product_name"],
        product_price: data["product_price"],
        size_id: data["size_id"],
        category_id: data["category_id"],
      },

      
      validateStatus: () => true,
    });
    console.log("API: " + response.data);

    return response.data;
  } catch (error) {
    console.log("API Error: " + error.response.data);
    return error.response.data;
  }
}
