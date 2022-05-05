export const GetDataById = async (id) =>{
    const URL = 'https://app-ecommerce-geek.herokuapp.com/products';

    let res = await fetch(`${URL}/${id}`);
    let data = await res.json();
    return data;
}