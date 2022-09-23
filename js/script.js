alert("you can ask 3 questions")
// la variable q representa las preguntas que le quedan al usuario
let q = 3

// la variable input representa la eleccion de pregunta del usuario
let input = prompt("here are your options /n 1-are you god? /n 2 /n 3 /n 4");

for (let i = q; i > 0; i--) {

    //  se le resta 1 a la variable q para representar que ya hizo una pregunta
    q -= 1
    
    if (input == 1) {
        break
        // el usuario tendra 3 opciones, pero si elige la primera salteara el programa para repetirlo con la pregunta numero 1 cambiada
    } else if (input == 2) {
        alert("you picked option 2")
    } else if (input == 3) {
        alert("you picked option 3")
    } else if (input == 4) {
        alert("you picked option 4")
    } else {
        alert("perdon, no entendi tu pregunta. pero te la cobro igual, no tengo todo el dia")
    }

    if (i != 1) {
        input = prompt("here are your options /n 1 /n 2 /n 3 /n 4");
    }
}

// alerta para responder a la pregunta 1
if (input == 1) {
    alert("yes soy dios")
}

if (input == 1 && q > 0) {

    input = prompt("here are your options /n enserio? /n 2 /n 3 /n 4");

    for (let i = q; i > 0; i--) {
        
        //  se le resta 1 a la variable q para representar que ya hizo una pregunta
        q -= 1

        if (input == 1) {
            break
        } else if (input == 2) {
            alert("you picked option 2")
        } else if (input == 3) {
            alert("you picked option 3")
        } else if (input == 4) {
            alert("you picked option 4")
        } else {
            alert("perdon, no entendi tu pregunta. pero te la cobro igual, no tengo todo el dia")
        }

        if (i != 1) {
            input = prompt("here are your options /n enserio? /n 2 /n 3 /n 4");
        }

    }
}

if (input == 1) {
    alert("asi es")
}

if (input == 1 && q > 0) {

    input = prompt("here are your options /n de veritas? /n 2 /n 3 /n 4");

    for (let i = q; i > 0; i--) {
        //  se le resta 1 a la variable q para representar que ya hizo una pregunta
        q -= 1

        if (input == 1) {
            break
        } else if (input == 2) {
            alert("you picked option 2")
        } else if (input == 3) {
            alert("you picked option 3")
        } else if (input == 4) {
            alert("you picked option 4")
        } else {
            alert("perdon, no entendi tu pregunta. pero te la cobro igual, no tengo todo el dia")
        }
        
    }
}

if (input == 1 && q > 0) {
    alert("es correcto")
}