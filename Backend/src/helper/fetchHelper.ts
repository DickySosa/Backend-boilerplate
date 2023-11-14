/**
 * @param URL this is the URL where you want to make the API call
 * @param options 
 * @param method GET, POST, PUT, DELETE
 * @param headers if applicable: "Content-Type": "application/json"
 * @param body if applicable: JSON.stringify(formArguments)
*/
export const fetchHelper = async (URL: string, options: {method: string, headers?: { [key: string]: string },
    body?: string;} ) => {

    if(!options){
        throw new Error("Please complete the parameters")
    }

   return fetch(URL,options)
}