import Axios from "axios";
import * as Constants from "../utils/constants";
import { headers } from "../utils/utils";

export async function FetchTopEntries(val) {
  try {
    var res = await Axios({
      method: "post",
      headers: headers(),
      url: Constants.BASE_URL + "/reports/get_top_entries_by_category.php",
      validateStatus: () => true,
      data: {
        interval: val
        // interval: interval
      }
    });
    console.log(res);
    if (!res.data["error"]) {

      return res.data["data"];
    } else {
      console.log("Error sya")
      return null;
    }
  } catch (error) {
    console.log("Error sa API")
    return null;
  }
}

export async function FetchSales() {
  try {
    var res = await Axios({
      method: "get",
      headers: headers(),
      url: Constants.BASE_URL + "/reports/get_sales.php",
      validateStatus: () => true,
    });
    console.log(res);
    if (!res.data["error"]) {

      return res.data["data"];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}


