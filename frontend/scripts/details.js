import { GetDataById } from "../helpers/getProductId.js";
import { GetData } from "../helpers/getProducts.js";
import mostrarProductoId from "../modules/showDetails.js";


let details = [];
let contenedor = document.querySelector('.detalles');

document.addEventListener('DOMContentLoaded', async ()=>{
    let idcard = localStorage.getItem('id_card');
    let card = await GetDataById(idcard);
    details.push(card);
    mostrarProductoId(details, contenedor);
    
})

document.addEventListener('click', async ({target}) => {
  if(target.classList.contains("btn-select")){
    let id = target.id;
    let data = await GetData('products');
    let search = data.find(item => (item.id == id));

    fetch('https://app-ecommerce-geek.herokuapp.com/carrito', {
      method: 'POST',
      body: JSON.stringify(search),
      headers: {
        "Content-type": "application/json"}
    })
    .then(res => alert("Articulo Agregado al carrito"))
    .catch(err => console.log(err));
  }
})

document.getElementById('salir').addEventListener('click', ()=>{
  window.location.href = "/index.html"
})