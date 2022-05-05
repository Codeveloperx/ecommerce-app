function mostrarProductoId(data, container) {
  container.innerHTML = "";
  data.forEach((value) => {
    const { id, name, img, price, description } = value;
    const div = document.createElement("div");
    div.classList.add("contenido");
    div.setAttribute("id", id);

    div.innerHTML = `
            <div id="img">
              <img src=${img}>
            </div>

            <div class="details_description">
                <div class="box1">
                  <h1>${name}</h1>
                  <span><b id="precio">$${price}</b></span>
                  <button class="buy-button btn-select" id="${id}">Agregar al carrito</button>
                </div>
                  
                <div class="box2">
                    <h2>Product Details</h2>
                    <p>${description}</p>
                </div>
            </div>`;

    container.appendChild(div);
  });
}

export default mostrarProductoId;
