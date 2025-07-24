
export const getIfAllObjectKeysAreValid = (obj) => {

    let objectValuesValidCount = 0;
    let objectLength = 0;
    

    Object.entries(obj).forEach(
        ([key, value]) => {
            if(value !== '') {
                objectValuesValidCount++;
            }
            objectLength++;
        }
    )

    return !!(objectValuesValidCount === objectLength);
}

export const generateSearchParamsFromObj = (dataObj) => {

    let searchString = '';
    let objectLength = Object.keys(dataObj).length;
    console.log("objectLength: ",objectLength);

    Object.entries(dataObj).forEach(([key, value], index) => {
        if(index + 1 !== objectLength) {
            if(value !== '') {
                searchString += `${key}=${value}&`;
            }
        } else {
            if(value !== '') {
                searchString += `${key}=${value}`;
            }
        }
    });

    return searchString;
}

export const createObjWithValidKeys = (obj) => {

    let tempObj = {};

    Object.entries(obj).forEach(([key, value]) => {
        if(value !== '') {
            tempObj[key] = value;
        }
    });

    return tempObj;
}
