export const GetData = async (endpoint) =>{
    const URL = 'https://app-ecommerce-geek.herokuapp.com';

    let res = await fetch(`${URL}/${endpoint}`);
    let data = await res.json();
    return data;
}

