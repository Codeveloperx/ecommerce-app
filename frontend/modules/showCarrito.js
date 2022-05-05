function carritoCompras(data, container){
    container.innerHTML = '';
    data.forEach((productos) => {
        const {id, name, img, price } = productos;
        const div = document.createElement('div');
        div.classList.add('box');
        div.setAttribute('id', id)

        div.innerHTML = `
        <i class="fas fa-trash borrar" id=${id}></i>
          <img src=${img} alt="" />
          <div class="content">
            <h3>${name}</h3>
            <span class="price">${price}</span>
            <span class="quantity">qty : 1</span>
          </div>
        </div>`

    container.appendChild(div);

        
    });

}

export default carritoCompras;