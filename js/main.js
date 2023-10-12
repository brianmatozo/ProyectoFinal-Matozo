document.addEventListener("DOMContentLoaded", function() {
    const comprarBtn = document.querySelectorAll(".btnorange");
    const sumaTotal = document.getElementById("total");
    let arrayItems = [];

    comprarBtn.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const productName = button.getAttribute("data-name");
            const productValor = parseFloat(button.getAttribute("data-valor"));

            // crearitems
            const productInfoElement = document.createElement("ul");
            productInfoElement.className = "list-group list-group-horizontal";
            productInfoElement.innerHTML = 
            `
            <li class="list-group-item flex-fill">Product: ${productName} Price: ${productValor}</li>
            <li><a href="#" id="closeBtn" class="list-group-item btn btn-danger flex-fill" >x</a></li>
            `;
            const productInfoContainer = document.getElementById("product-info-container"); 
            
            // boton de borrar
            const closeBtn = productInfoElement.querySelector("#closeBtn");
            closeBtn.addEventListener("click", function() {
            productInfoElement.remove();
            });

            productInfoContainer.appendChild(productInfoElement);
           
            // me fijo si hayy un item ya existente
            const arrayItemsExistentes = arrayItems.findIndex(item => item.name === productName);
            if (arrayItemsExistentes !== -1) {
                arrayItems[arrayItemsExistentes].cantidad++;
                arrayItems[arrayItemsExistentes].totalPrice += productValor;
            } else {
                arrayItems.push({
                    name: productName,
                    price: productValor,
                    cantidad: 1,
                    totalPrice: productValor,
                });
            }
            const total = arrayItems.reduce((accumulator, item) => accumulator + item.totalPrice, 0);
            sumaTotal.textContent = `$${total.toFixed(2)}`;
        });
    });
});