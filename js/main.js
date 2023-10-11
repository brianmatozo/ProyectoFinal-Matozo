// function ivacalc(){ 
//     let ivacal = prompt("quieres calcular el iva?")
//     if (ivacal == "SI") {
//         valoritemiva = valoritem*1.21
//         console.log("aca el valor con iva", valoritemiva)
//     }
//     else if (ivacal == "NO"){
//         console.log("aca el valor sin iva", valoritem);
//     }
//     else{
//         prompt("profavor ingresa SI o NO")
//     }
//     }
// let compra = parseInt(prompt("Que item quiere comprar (1, 2, 3, ESC)"));
// while(compra != "ESC"){
//     switch (compra){
//         case "1":
//         valoritem = 6995.5
//         ivacalc();
//         break;
//         case "2":
//         valoritem = 10495
//         ivacalc();
//         break;
//         case "3":
//         valoritem = 13994.5
//         ivacalc();
//         break;
//         default:
//             alert("default")
//         break;
//     }
//     compra = prompt("Que item quiere comprar (1, 2, 3, ESC)");
// }

// Toggle the cart when the "Cart" button is clicked
$(document).ready(function () {
    $("#cart-toggle").click(function () {
        $(".floating-cart").toggleClass("show");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const comprarBtn = document.querySelectorAll(".btnorange");
    const totalElement = document.getElementById("total");
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
            <li><a href="#" id="closeBtn" class="list-group-item btn btn-danger flex-fill" >x</a></li>
            `;
            const productInfoContainer = document.getElementById("product-info-container"); 
            
            // boton de borrar
            const closeBtn = productInfoElement.querySelector("#closeBtn");
            closeBtn.addEventListener("click", function() {
            productInfoElement.remove();
            });

            productInfoContainer.appendChild(productInfoElement);
           
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
        });
    });
});