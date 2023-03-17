// import {BACKEND_BASE_URL} from "constants";
import axios from "axios";

const BACKEND_BASE_URL = "http://127.0.0.1:5000";
export const get_event_counts =async () => {
    // const headers = getHeaders();
    const res = await axios.get(
        `${BACKEND_BASE_URL}/transactions/1`);
    return res.data;
}

export const popular_uses =async () => {
    const res = await axios.get(
        `${BACKEND_BASE_URL}/transactions/4`);
    return res.data;
}


export const get_transactions_by_event = async (stashId:number, eventType:string) => {
    // const headers = getHeaders(); 
    const res = await axios.get(
        `${BACKEND_BASE_URL}/transactions/2?stashId=${stashId}&eventType=${eventType}`,
        // {stashId:stashId},
        // headers
    );
    console.log(res.data);
    return res.data;
}

export const get_stashes_by_user = async (userId: number) => {
    // const headers = getHeaders();
    const res = await axios.get(
        `${BACKEND_BASE_URL}/transactions/3?userId=${userId}`
        // {headers: headers}
    );
    console.log(res.data);
    return res.data;

}