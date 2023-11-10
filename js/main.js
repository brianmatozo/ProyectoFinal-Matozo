document.addEventListener("DOMContentLoaded", function() {
    const comprarBtn = document.querySelectorAll(".btnorange");
    const sumaTotal = document.getElementById("total");
    const productInfoContainer = document.getElementById("product-info-container");
    const comprarComprar = document.querySelector('#comprarComprar')
    let arrayItems = [];

    loadCartData();

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
                event.preventDefault();
                productInfoElement.remove();
                subtractFromTotal(productName, productValor);
                
            });

            productInfoContainer.appendChild(productInfoElement);
           
            // me fijo si hayy un item ya existente
            const arrayItemsExistentes = arrayItems.findIndex(item => item.name === productName);
            if (arrayItemsExistentes !== -1) {
                arrayItems[arrayItemsExistentes].cantidad++;
                arrayItems[arrayItemsExistentes].totalPrice += productValor;
                updateCartView();
            } else {
                arrayItems.push({
                    name: productName,
                    price: productValor,
                    cantidad: 1,
                    totalPrice: productValor,
                });
                updateCartView();
            }
            const total = arrayItems.reduce((accumulator, item) => accumulator + item.totalPrice, 0);
            sumaTotal.textContent = `$${total.toFixed(2)}`;
            saveCartData();
        });
    });

    comprarComprar.addEventListener("click",()=>{
        Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        Swal.fire({
            title: "Estas Seguro?",
            text: "No hay reembolso",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, comprar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Felicitaciones!",
                text: "Haz realizado tu compra",
                icon: "success"
              });
              arrayItems.length=0;
              productInfoContainer.innerHTML = '';
              sumaTotal.textContent = `$0.00`;
              localStorage.removeItem("cartData");
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              Swal.fire({
                title: "Cancelado",
                text: "Haz elegido seguir comprando",
                icon: "error"
              });
            }
        });
    });

    function subtractFromTotal(productName, productValor) {
        const arrayItemsNew = arrayItems.findIndex(item => item.name === productName);
    
        if (arrayItemsNew !== -1) {
            arrayItems[arrayItemsNew].cantidad--;
    
            if (arrayItems[arrayItemsNew].cantidad === 0) {
                arrayItems.splice(arrayItemsNew, 1);
            } else {
                arrayItems[arrayItemsNew].totalPrice -= productValor;
            }
    
            const total = arrayItems.reduce((accumulator, item) => accumulator + item.totalPrice, 0);
            sumaTotal.textContent = `$${total.toFixed(2)}`;
        }
        saveCartData();
    }

    function saveCartData() {
        localStorage.setItem('cartData', JSON.stringify(arrayItems));
    }

    function loadCartData() {
        const cartDataJSON = localStorage.getItem('cartData');
        if (cartDataJSON) {
            arrayItems = JSON.parse(cartDataJSON);

            updateCartView();
        }
    }

    function updateCartView() {
        productInfoContainer.innerHTML = '';

        arrayItems.forEach(item => {
            const productInfoElement = document.createElement("ul");
            productInfoElement.className = "list-group list-group-horizontal";
            productInfoElement.innerHTML = `
                <li class="list-group-item flex-fill">Product: ${item.name} Price: ${item.price} Cantidad: ${item.cantidad}</li>
                <li><a href="#" id="closeBtn" class="list-group-item btn btn-danger flex-fill">x</a></li>
            `;

            const closeBtn = productInfoElement.querySelector("#closeBtn");
            closeBtn.addEventListener("click", function() {
                productInfoElement.remove();
                subtractFromTotal(productName, productValor);
                
            });

            productInfoContainer.appendChild(productInfoElement);
        });

        const total = arrayItems.reduce((accumulator, item) => accumulator + item.totalPrice, 0);
        sumaTotal.textContent = `$${total.toFixed(2)}`;
    }


});