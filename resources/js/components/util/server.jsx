import axios from 'axios';

const token = document.querySelector('meta[name="csrf-token"]');
const postHeader = {'Content-Type': 'application/json', 'X-CSRF-TOKEN': token.content}
const getHeader = {'Content-Type': 'application/json'}
const storeJobApi = 'api/store-job';
const getPropertiesApi = 'api/properties';
const getUsersApi = 'api/users';
const getJobsApi = 'api/jobs';

export const getProperties = () => {
    return axios.get(getPropertiesApi, { headers: getHeader });
};

export const getUsers = () => {
    return axios.get(getUsersApi, { headers: getHeader });
};

export const storeJob = (summary, description, prop_id, status, user_id) => {
    let formData = new FormData();

    formData.append("summary", summary);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("prop_id", prop_id);
    formData.append("user_id", user_id);

    return axios.post(storeJobApi, formData,{headers: postHeader});
};

export const getJobs = () => {
    return axios.get(getJobsApi, { headers: getHeader });
};
