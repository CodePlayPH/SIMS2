import Axios from 'axios';
import * as Constants from "../utils/constants"
import { headers } from '../utils/utils';

export async function AddEntries(data) {
    try {
        var res = await Axios({
            method: 'post',
            headers: headers(),
            url: Constants.BASE_URL + "/entries/add_entries.php",
            validateStatus: () => true,
            data: {
                data: data
            }
        });

        // if (!res.data['error']) {
        //     return res.data['data'];
        // } else {
        //     return null;
        // }
        console.log(res)
        return null
        // return response.data
        // alert(res);
    } catch (error) {
        // console.log(res);
        return null;
    }
}


