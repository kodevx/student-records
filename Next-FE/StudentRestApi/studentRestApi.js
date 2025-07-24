import axios from 'axios';
import { 
    GET_REQUEST_URL, 
    DELETE_REQUEST_URL, 
    PUT_REQUEST_URL,
    SEARCH_REQUEST_URL,
    UPDATE_REQUEST_URL
} from '@/constants/constants';

import { generateSearchParamsFromObj } from '@/utils/objectUtils';

export const handleGetRequest = async () => {

    let responseData;

    await axios.get(GET_REQUEST_URL, {
        responseType: 'json'
    })
    .then(result => {
        responseData = result;
        console.log("Get request response: ", result);
    });

    return responseData;
}

export const handleDeleteRequest = async (id) => { 

        let responseData;

        await axios.delete(
            `${DELETE_REQUEST_URL}${id}`,
            { responseType: 'json'}
        )
        .then(response => {
            responseData = response;
            console.log("delete request response: ",response)
        });

        return responseData;
}

export const handlePostRequest = async (data) => { 

        let responseData;

        await axios.post(
            `${PUT_REQUEST_URL}`,
            data
        )
        .then(response => {
            responseData = response;
            console.log("Put Request response: ",response);
        });

        return responseData;
}

export const handleUpdateRequest = async (data) => { 

        let responseData;

        const searchParamString = generateSearchParamsFromObj(data);

        console.log("searchParamString: ",searchParamString);

        await axios.put(
            `${UPDATE_REQUEST_URL}${data.id}?${searchParamString}`,
            data
        )
        .then(response => {
            responseData = response;
            console.log("Update Request response: ",response);
        });

        return responseData;
}

export const handleSearchRequest = async (data) => { 

        let responseData;

        console.log("search request form data: ",data);

        const searchParamString = generateSearchParamsFromObj(data);

        console.log("data: ",data);

        console.log("SearchStringParams: ",searchParamString);

        await axios.get(`${SEARCH_REQUEST_URL}?${searchParamString}`)
        .then(response => {
            responseData = response;
            console.log("Search GET Request response: ",response);
        });

        return responseData;
}
