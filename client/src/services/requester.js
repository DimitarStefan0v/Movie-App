// the requester is only for get requests as I'm using a public API 

export const requester = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        console.log(response);
    }

    const data = await response.json();
    return data;
};