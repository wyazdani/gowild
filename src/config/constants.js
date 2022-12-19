//export const API_URL = "http://127.0.0.1:8000/api";
export const API_URL = "https://api.gowild.appscorridor.com/api/v1";
export const KEY =
    "YW1Gb1lXNTZZV2xpTG1GemJHRnRMbTFsYUdGeVFHZHRZV2xzTG1OdmJUb3lZV2RoYVc0PQ==";


export const ENDPOINT = {
    login: `${API_URL}/auth/login`,
    forgetpassword: `${API_URL}/auth/forgot/password`,
    user_me: `${API_URL}/auth/me`,
    dashboard: `${API_URL}/dashboard/users-info`,
    admin_user: `${API_URL}/admin/users`,



    sub_admin :{
        listing : `${API_URL}/sub-admin`,
        active : `${API_URL}/sub-admin/active-inActive/true`,
        inactive: `${API_URL}/sub-admin/active-inActive/false`,
        delete: {
            url:`${API_URL}/sub-admin/`,
            id:null
        },
        add_user: `${API_URL}/sub-admin`,
        edit_user: {
            url : `${API_URL}/sub-admin/`,
            id  : null
        },
    }

};