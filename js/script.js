// alert ("abro mis ojos y la tenue luz del piso asalta mis ojos como si fuera el sol. con considerable esfuerzo logro mover mi cabeza para no tener que mirar directo al suelo")
// alert("mi cuerpo se siente pesado y letargico, como si hubiera dormido por meses. A pesar de esto logro levantar mi cabeza para examinar mis alrededores")
// alert ("me encuentro en una especie de santuario, adentro de un circulo en una especie de pileta en medio de la habitacion, la elevacion del circulo hace que la profundidad del agua sea unos centimetros nomas, seria dificil ahogarme adentro del circulo incluso inconciente")
// alert('"Levantate bella durmiente, hay trabajo que hacer"')
// alert("un hombre se encuentra enfrente mio, alto, con pelo corto pero bien cuidado, su lenguaje corporal demostraba confianza y elegancia, ojos azules que parecian brillar en la oscuridad de este santuario. esta vestido con una tunica extraña de color blanco, con parches abiertos en la parte superior, dos a los costados de la cadera y uno en el lado derecho del pecho, su tunica esta abierta pero el no parece molestarle, tiene botas chicas que se ajustan al pie de color negro y no pasan el tobillo tiene pantalones de color marron y una camisa debajo de la tunica, es la vestimenta mas extraña que he visto pero me puedo dar cuenta que es de la mas alta calidad")
// alert('"Empezemos con algo basico, levantate." ')
// function levantarse() {
//     let levantar = false
    
//     while (!levantar) {
//         let moverse = prompt("1- para levantarse")
//         if (moverse == 1) {
//             levantar = true
//         } else {
//             alert("'vamos puedes hacer algo mejor que eso, levantate'")
//         }
        
//     };
//     alert ("con mayor esfuerzo del que esperaba logro levantarme");
//     alert ("'bien hecho' dice mientras su atención esta en escribir algo en una tabla negra que tiene en la mano")
// };

// levantarse();


// alert("'Okay, es hora de continuar, hay varias pruevas que vas a realizar'")
// alert("'Soy Vulion, Dios de los Constructos, estoy encargado de aportar oponentes y obstaculos para la siguiente juego de heroes que se hace cada 10 años, y tu me vas a ayudar a probarlos'")
alert("'como dije antes no tengo todo el dia, pero veo en tu cara que tenes preguntas, asi que te dejare hacer 3 preguntas antes de que continuemos'")
// la variable q representa las preguntas que le quedan al usuario
let q = 3

// la variable input representa la eleccion de pregunta del usuario
let input = prompt("here are your options \n 1-¿tu eres el Dios de los Constructos? \n ¿Donde estoy? \n ¿Que es el Juego de Heroes? \n ¿Porque yo?");

for (let i = q; i > 0; i--) {

    //  se le resta 1 a la variable q para representar que ya hizo una pregunta
    q -= 1
    
    if (input == 1) {
        alert("Si")
        break        
    } else if (input == 2) {
        alert("ahora estas en la camara del despertar, con respecto a donde estas en el mundo, estas en la Foza, mi propio dominio, en mi propio estudio donde puedo experimentar y ejercer mis poderes sin limites o la regulacion del panteon de Oshera")
    } else if (input == 3) {
        alert("El Juego de Heroes es una especie de evento internacional multidiciplinario, donde participan campeones, caballeros y santos con el objetivo de ganar riquezas, favores con los dioses, o en caso de algunos santos para traer gloria a sus respectivos dioses")
    } else if (input == 4) {
        alert("Ah, eso es simple, porque lo digo yo")
    } else {
        alert("'perdon, no entendi tu pregunta. pero te la cobro igual, no tengo todo el dia'")
    }

    if (i != 1) {
        input = prompt("here are your options \n 1-¿tu eres un Dios? \n ¿Donde estoy? \n ¿Que es el Juego de Heroes? \n ¿Que clase de pruebas estamos hablando?");
    }
}

if (input == 1 && q > 0) {

    input = prompt("here are your options \n 1-¿Enserio? \n ¿Donde estoy? \n ¿Que es el Juego de Heroes? \n ¿Que clase de pruebas estamos hablando?");

    for (let i = q; i > 0; i--) {
        
        //  se le resta 1 a la variable q para representar que ya hizo una pregunta
        q -= 1

        if (input == 1) {
            alert("Si")
            break
        } else if (input == 2) {
            alert("ahora estas en la camara del despertar, con respecto a donde estas en el mundo, estas en la Foza, mi propio dominio, en mi propio estudio donde puedo experimentar y ejercer mis poderes sin limites o la regulacion del panteon de Oshera")
        } else if (input == 3) {
            alert("El Juego de Heroes es una especie de evento internacional multidiciplinario, donde participan campeones, caballeros y santos con el objetivo de ganar riquezas y favores con los dioses, o en caso de algunos santos para traer gloria a sus respectivos dioses")
        } else if (input == 4) {
            alert("Ah, eso es simple, porque lo digo yo")
        } else {
            alert("'perdon, no entendi tu pregunta. pero te la cobro igual, no tengo todo el dia'")
        }

        if (i != 1) {
            input = prompt("here are your options \n 1-¿tu eres un Dios? \n ¿Donde estoy? \n ¿Que es el Juego de Heroes? \n ¿Que clase de pruebas estamos hablando?");
        }

    }
}

if (input == 1 && q > 0) {

    input = prompt("here are your options \n 1-¿Usted? \n ¿Donde estoy? \n ¿Que es el Juego de Heroes? \n ¿Que clase de pruebas estamos hablando?");

    for (let i = q; i > 0; i--) {
        //  se le resta 1 a la variable q para representar que ya hizo una pregunta
        q -= 1

        if (input == 1) {
            alert("Asi es")
        } else if (input == 2) {
            alert("ahora estas en la camara del despertar, con respecto a donde estas en el mundo, estas en la Foza, mi propio dominio, en mi propio estudio donde puedo experimentar y ejercer mis poderes sin limites o la regulacion del panteon de Oshera")
        } else if (input == 3) {
            alert("El Juego de Heroes es una especie de evento internacional multidiciplinario, donde participan campeones, caballeros y santos con el objetivo de ganar riquezas, favores con los dioses, o en caso de algunos santos para traer gloria a sus respectivos dioses")
        } else if (input == 4) {
            alert("Ah, eso es simple, porque lo digo yo")
        } else {
            alert("'perdon, no entendi tu pregunta. pero te la cobro igual, no tengo todo el dia'")
        }
        
    }
}

function doll (nombre, raza, hp) {
    this.nombre = nombre
    this.raza = raza
    this.vida = hp
}
