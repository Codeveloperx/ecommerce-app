//Importaciones del Helpers para realizar las peticiones
import { GetCarrito } from "../helpers/getCarrito.js";
import { GetData} from "../helpers/getProducts.js";

//Importaciones de modules para mandar los datos al HTML
import carritoCompras from "../modules/showCarrito.js";
import mostrarProductos from "../modules/showProducts.js";

//Obtener Clases de los elementos del DOM y las almaceni en variabes y constantes
let barraBusqueda = document.querySelector('.search-form');
let mostrarCarrito = document.querySelector('.shopping-cart');
let mostrarLogin = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');

const contenedor = document.querySelector('.container');
const container_card = document.querySelector('.shopping-cart');


//Obtengo un evento click para mostrar la barra de busqueda, carrito de coompras, agregar producto
document.querySelector('#search-btn').addEventListener('click', () => {
    barraBusqueda.classList.toggle('active');
    navbar.classList.remove('active');
    mostrarCarrito.classList.remove('active');
    mostrarLogin.classList.remove('active');
})

document.querySelector('#cart-btn').addEventListener('click', () => {
    mostrarCarrito.classList.toggle('active');
    navbar.classList.remove('active');
    barraBusqueda.classList.remove('active');
    mostrarLogin.classList.remove('active');
})

document.querySelector('#login-btn').addEventListener('click', () => {
    mostrarLogin.classList.toggle('active');
    navbar.classList.remove('active');
    barraBusqueda.classList.remove('active');
    mostrarCarrito.classList.remove('active');
})

document.querySelector('#menu-btn').addEventListener('click', () => {
    navbar.classList.toggle('active');
    barraBusqueda.classList.remove('active');
    mostrarCarrito.classList.remove('active');
    mostrarLogin.classList.remove('active');
})
//elimino las clases para ocultar mis elementos cuando le de click
// utilizo el onscroll para ocultar los elementos al hacer scroll a mi ventana
window.onscroll = () => {
    navbar.classList.remove('active');
    barraBusqueda.classList.remove('active');
    mostrarCarrito.classList.remove('active');
    mostrarLogin.classList.remove('active');
    
}




// Utilizo la libreria Swiper JS para realizar un slide con las experiencias de los usuarios
let swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});


//capturo los contenedores de los elementos
let car = document.querySelector('.contenedor-cart')

//llamo a la funcion GetData y le paso como parametro la ruta de mis productos
let productos = await GetData('products');
//ejecuto la funcion mostrar productos y le paso la data de productos que estoy llamando arriba y el contenedor
mostrarProductos(productos, contenedor);

//llamo a la funcion GetData y le paso como parametro la ruta de mi carrito de compras
let elementcarCar = await GetCarrito('carrito');

//genero unevento al DOM que me permita validar una clase para obtener su ID y luego guardarlo en localStorage
document.addEventListener('click', ({target}) => {
  if(target.classList.contains("details")){
    let id = target.id;
    localStorage.setItem('id_card', id)
    //Me desplazo hacia mi pagina detalles del producto
    window.location.href = "/frontend/pages/details.html"
    
    //Realizo un filter para filtrar mis productos por categoria, para ello
    //utilizo el evento click que escucha al DOM, en su atributo target
  }else if(target.classList.contains('categorias')){
    let id_categoria = target.id;
      let filtrar_categorias = productos.filter(value => (value.category == id_categoria))
      mostrarProductos(filtrar_categorias, contenedor);

  }else if(target.classList.contains("carrito")){
    carritoCompras(elementcarCar, car);

  }else if(target.classList.contains('borrar')){
    let idDelete = target.id;
    //Genero una peticion al servido tipo DELETE, para eliminar el elemento seleccionado
    fetch(`https://app-ecommerce-geek.herokuapp.com/carrito/${idDelete}`,{
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(()=>{
      alert("elemento eliminado");
      window.location.reload();
    })
  }
})

//Capturo el contenedor del formulario y genero un evento submit para obtener los valores
// y luego almacenarlos en un objeto y de tal manera realizo una peticion de tipo POST
let form = document.getElementById('formulario');
form.addEventListener('submit', (e)=>{
  e.preventDefault();

  let nombre = document.getElementById('nombre').value;
  let description = document.getElementById('descripcion').value;
  let precio = document.getElementById('precio').value;
  let poster = document.getElementById('URL').value;
  let categoria = document.getElementById('categorie').value;
  
  let objProducts = {
    name: nombre,
    description: description,
    price: precio,
    img: poster,
    category: categoria
  }

  fetch('http://localhost:4000/products', {
    method: 'POST',
    body: JSON.stringify(objProducts),
    headers: {
      "Content-type": "application/json"}
  })
  .then(res => alert("Producto agregado con exito!"))
  .catch(err => console.log(err));
  
  
})
