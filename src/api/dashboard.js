import Axios from "axios";
import * as Constants from "../utils/constants";
import { headers } from "../utils/utils";

export async function FetchTopEntries() {
    try {
      var res = await Axios({
        method: "post",
        headers: headers(),
        url: Constants.BASE_URL + "/reports/get_top_entries_by_category.php",
        validateStatus: () => true,
        data: {
          interval: "month"
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

