document.addEventListener("DOMContentLoaded", function() {
    const comprarBtn = document.querySelectorAll(".btnorange");
    const totalElement = document.getElementById("total");
    const removeButtons = document.querySelectorAll(".remove");
    let selectedItems = [];

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
            <li><a href="#" id="closeBtn" class="list-group-item btn btn-danger remove flex-fill" >x</a></li>
            `;
            const productInfoContainer = document.getElementById("product-info-container"); 
            
            // boton de borrar
            const closeBtn = productInfoElement.querySelector("#closeBtn");
            closeBtn.addEventListener("click", function() {
            productInfoElement.remove();
            });

            productInfoContainer.appendChild(productInfoElement);
           
            // me fijo si hayy un item ya existente
            const existingItemIndex = selectedItems.findIndex(item => item.name === productName);
            if (existingItemIndex !== -1) {
                selectedItems[existingItemIndex].quantity++;
                selectedItems[existingItemIndex].totalPrice += productValor;
            } else {
                selectedItems.push({
                    name: productName,
                    price: productValor,
                    quantity: 1,
                    totalPrice: productValor,
                });
            }
            const total = selectedItems.reduce((accumulator, item) => accumulator + item.totalPrice, 0);
            totalElement.textContent = `$${total.toFixed(2)}`;

            // document.addEventListener("click", function(event) {
            //     if (event.target.classList.contains("btn-danger")) {
            //         const productName = event.target.getAttribute("data-name");
            //         const existingItemIndex = selectedItems.findIndex(item => item.name === productName);
            //         if (existingItemIndex !== -1) {
            //             const productValor2 = selectedItems[existingItemIndex].price;
            //             const productQuantity = selectedItems[existingItemIndex].quantity;
            //             selectedItems.splice(existingItemIndex, 1);
            //             const total = parseFloat(totalElement.textContent.substring(1)) - productValor2 * productQuantity;
            //             totalElement.textContent = `$${total.toFixed(2)}`;
            //             event.target.closest(".card").remove();
            //         }
            //     }
            // });

        });
    });
});