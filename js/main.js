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