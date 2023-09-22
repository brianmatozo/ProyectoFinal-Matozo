let valoritem = 1000
function ivacalc(){ 
    let ivacal = prompt("quieres calcular el iva?")
    if (ivacal == "SI") {
        valoritem*1.21
        console.log("aca el valor con iva")
    }
    else if (ivacal == "NO"){
        console.log("aca el valor sin iva");
    }
    else{
        prompt("profavor ingresa SI o NO")
    }
    }

let compra = prompt("Que item quiere comprar (1, 2, 3, ESC)");
while(compra != "ESC"){
    switch (compra){
        case "1":
        ivacalc();
        break;
        case "2":
        ivacalc();
        break;
        case "3":
        ivacalc();
        break;
        default:
            aler("default")
        break;
    }
    compra = prompt("Que item quiere comprar (1, 2, 3, ESC)");
}