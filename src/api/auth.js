import Axios from 'axios';
import * as Constants from "../utils/constants"
import { headers } from "../utils/utils"

export async function UserLogin(code) {
    try {
        var res = await Axios({
            method: 'post',
            url: Constants.BASE_URL + "/auth/login.php",
            validateStatus: () => true,
            data: {
                code: code
            }
        });
        if (!res.data['error']) {
            return res.data;
        } else {
            console.log(res.data['error'])
            return res.data['error'];
        }
    } catch (error) {
        return null;
    }
}

export async function UserRegister(data) {
    try {
        let response = await Axios
        .post(
            Constants.BASE_URL + "/auth/register.php",
            {
                full_name: data.full_name,
                position: data.position,
                access_type: data.access_type
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })

            return response.data

    } catch (error) {
        return error.response.data
    }
}

