function mostrarProductos(data, container){
    container.innerHTML = '';
    data.forEach((productos) => {
        const {id, name, img, price, description } = productos;
        const div = document.createElement('div');
        div.classList.add('product-container');
        div.setAttribute('id', id)

        div.innerHTML = `
        <div class="card">
            <div class="title">${name}</div>
            <div class="image">
              <img src=${img} />
            </div>
          <button id="${id}"class="buy-button details">Ver Detalle</button>
        </div>`

    container.appendChild(div);

        
    });

}

export default mostrarProductos;