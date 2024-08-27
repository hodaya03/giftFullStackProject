
export async function GoToServer1(query, method, body) {
    const serverPath = "http://localhost:5000";
    let fullpath = serverPath + query;
    console.log("fullpath::", fullpath);

    const fetchOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    };

    if (method !== 'GET') {
        fetchOptions.body = JSON.stringify(body);
    }
    if (method === 'GET') {
        fetchOptions.body = null;
    }
    console.log("body", body);

    console.log('fetchOptions', fetchOptions);
    console.log('fetchOptions.body', fetchOptions.body);

    return fetch(fullpath, fetchOptions)
        .then((response) => {
            console.log("response", response);
            if (!response.ok) {
                return response.text().then((text) => {
                    throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
                });
            }
            return response.json();
        });
}

export function convertFormDataToArray(formData) {
    return Object.values(formData);
}

export function GoToServer(query, method = "GET", data = null) {
    const serverPath = "http://localhost:5000";
    let fullpath = serverPath + query;
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` 
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    
    const options = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : null
    };

    return fetch(fullpath, options)
        // .then(response => response.json());
        .then(response => {
            console.log('response', response);
            console.log('response.ok', response.ok);
            if (!response.ok) {
              return response.text().then((text) => {
                throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
              });
            }
            return response.json();
          });
}


// export async function GoToServer1(endpoint, method, data = null) {
//     const options = {
//         method,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };

//     if (data) {
//         options.body = JSON.stringify(data);
//     }

//     const response = await fetch(endpoint, options);
//     const responseData = await response.json();
//     return {
//         status: response.status,
//         data: responseData,
//     };
// }


































//////////לא טוב


// export default async function GoToServer(url, method, body = null) {
//     const options = {
//         method,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     if (body && method !== 'GET' && method !== 'HEAD') {
//         options.body = JSON.stringify(body);
//     }

//     try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error in GoToServer:', error);
//         throw error;
//     }
// }
