// alert("Para que este programa funcione bien, tienes que presionar un número para elegir una opción. Por ejemplo si la prompt dice \n 1- opción 1 \n 2-opción 2 \n Para elegir opción 1 tienes que solo poner '1' en la prompt")

// functions 
function levantarse() {
    let levantar = false

    while (!levantar) {
        let moverse = prompt("Presiona un número para elegir una opción \n1- Para levantarse")
        if (moverse == 1) {
            levantar = true
        } else {
            alert("'Vamos puedes hacer algo mejor que eso, levántate'")
        }

    };
    alert("Con mayor esfuerzo del que esperaba logro levantarme");
    alert("'Bien hecho' dice mientras su atención está en escribir algo en una tabla negra que tiene en la mano")
};


class doll {
    constructor(name, hit_points, damage) {
        this.name = name
        this.hp = hit_points
        this.dmg = damage
    };
};

function gender() {

    let gender = parseInt(prompt(" genero \n 1 - Hombre \n 2 - Mujer"));

    if (gender == 1) {
        return "male"
    } else if (gender == 2) {
        return "female"
    } else {
        alert("invalid choice");
    }

    while (gender != 1 && gender != 2) {

        gender = parseInt(prompt(" genero \n 1 - Hombre \n 2 - Mujer"))

        switch (gender) {
            case 1:
                return "male"
            case 2:
                return "female"
            default:
                alert("no valido");
                break;
        };
    };
};
// esta variable existe para poder utilizarla en la funcion de background la creo a fuera para que sea una variable global, pero sera modificada por la funcion race() ya que esa decide cuales historias son aplicables al usario dependiendo de la raza que eligio
let raza_elegida = 0

function race() {
    let raza = parseInt(prompt("¿cual es tu raza? \n1-Human\n2-Elfos\n3-Orcos\n4-Hombres Bestia"))

    switch (raza) {
        case 1:
            race_name = "humano",
                race_hp = 10,
                race_power = 2;
            raza_elegida += 1
            race_choice = [race_name, race_hp, race_power];

            return race_choice;
        case 2:
            race_name = "elves"
            race_hp = 5
            race_power = 1
            raza_elegida += 2
            race_choice = [race_name, race_hp, race_power]

            return race_choice;
        case 3:
            race_name = "orcs"
            race_hp = 20
            race_power = 3
            raza_elegida += 3
            race_choice = [race_name, race_hp, race_power]

            return race_choice;
        case 4:
            race_name = "beast man"
            race_hp = 15
            race_power = 2
            raza_elegida += 4
            race_choice = [race_name, race_hp, race_power]

            return race_choice;


        default:
            alert("not a valid option")
            break;
    }

    while (raza != 1 && raza != 2 && raza != 3 && raza != 4) {
        raza = parseInt(prompt("¿cual es tu raza? \n1-Human\n2-Elfos\n3-Orcos\n4-Hombres Bestia"))

        switch (raza) {
            case 1:
                race_name = "humano"
                race_hp = 10
                race_power = 2
                raza_elegida += 1
                race_choice = [race_name, race_hp, race_power]

                return race_choice;
            case 2:
                race_name = "elves"
                race_hp = 5
                race_power = 1
                raza_elegida += 2
                race_choice = [race_name, race_hp, race_power]

                return race_choice;
            case 3:
                race_name = "orcs"
                race_hp = 20
                race_power = 3
                raza_elegida += 3
                race_choice = [race_name, race_hp, race_power]

                return race_choice;
            case 4:
                race_name = "beast man"
                race_hp = 15
                race_power = 2
                raza_elegida += 4
                race_choice = [race_name, race_hp, race_power]

                return race_choice;


            default:
                alert("not a valid option")
                break;
        }
    }
}

function backstory() {

    let backstory = 0
    let raza = ""
    // este primer switch funciona para elegir la historia del usuario depende de la raza que eligio en la funcion anterior
    switch (raza_elegida) {
        case 1:
            backstory = parseInt(prompt("backstory \n 1-merchant \n 2-sage\n 3-slave \n 4-soldier"))
            raza = "human"
            break;
        case 2:
            backstory = parseInt(prompt("backstory \n 1-Blade dancer \n 2-atendant \n 3-concubine \n 4-exiled"))
            raza = "elf"
            break;
        case 3:
            backstory = parseInt(prompt("backstory \n 1-chief \n 2-beserker\n 3-ranger \n 4-shaman"))
            raza = "orc"
            break;
        case 4:
            backstory = parseInt(prompt("backstory \n 1-gente perro \n 2- gente gato\n 3-gente pájaro \n 4-gente conejo"))
            raza = "beastmen"
            break;

        default:
            break;
    }

    if (raza == "human") {
        switch (backstory) {
            case 1:
                backstory_name = "mercader"
                backstory_hp = 10
                backstory_power = 1

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 2:
                backstory_name = "sabio"
                backstory_hp = 10
                backstory_power = 2

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 3:
                backstory_name = "esclavo"
                backstory_hp = 5
                backstory_power = 2

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 4:
                backstory_name = "soldado"
                backstory_hp = 20
                backstory_power = 3

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            default:
                alert("invalid option")
                break;
        }
        while (backstory != 1 && backstory != 2 && backstory != 3 && backstory != 4) {

            backstory = parseInt(prompt("backstory \n 1-merchant \n 2-sage\n 3-slave \n 4-soldier"))

            switch (backstory) {
                case 1:
                    backstory_name = "mercader"
                    backstory_hp = 10
                    backstory_power = 1

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 2:
                    backstory_name = "sabio"
                    backstory_hp = 10
                    backstory_power = 2

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 3:
                    backstory_name = "esclavo"
                    backstory_hp = 5
                    backstory_power = 2

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 4:
                    backstory_name = "soldado"
                    backstory_hp = 15
                    backstory_power = 3

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                default:
                    alert("invalid option")
                    break;
            }
        }
    } else if (raza == "elf") {
        switch (backstory) {
            case 1:
                backstory_name = "Blade Dancer"
                backstory_hp = 15
                backstory_power = 3

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 2:
                backstory_name = "asistente"
                backstory_hp = 5
                backstory_power = 1

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 3:
                backstory_name = "concubino"
                backstory_hp = 10
                backstory_power = 1

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 4:
                backstory_name = "Exiliado"
                backstory_hp = 20
                backstory_power = 3

                story = [backstory_name, backstory_hp, backstory_power]
                return story;

            default:
                alert("invalid option")
                break;
        }
        while (backstory != 1 && backstory != 2 && backstory != 3 && backstory != 4) {

            backstory = parseInt(prompt("backstory \n 1-Blade dancer \n 2-atendant \n 3-concubine \n 4-exiled"))

            switch (backstory) {
                case 1:
                    backstory_name = "Blade Dancer"
                    backstory_hp = 15
                    backstory_power = 3

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 2:
                    backstory_name = "asistente"
                    backstory_hp = 5
                    backstory_power = 1

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 3:
                    backstory_name = "concubino"
                    backstory_hp = 10
                    backstory_power = 1

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 4:
                    backstory_name = "Exiliado"
                    backstory_hp = 20
                    backstory_power = 3

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;

                default:
                    alert("invalid option")
                    break;
            }
        }

    } else if (raza == "orc") {
        switch (backstory) {
            case 1:
                backstory_name = "Jefe"
                backstory_hp = 15
                backstory_power = 2

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 2:
                backstory_name = "Beserker"
                backstory_hp = 30
                backstory_power = 1

                story = [backstory_name, backstory_hp, backstory_power]
                return story;

            case 3:
                backstory_name = "Explorador"
                backstory_hp = 20
                backstory_power = 2

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 4:
                backstory_name = "chamán"
                backstory_hp = 5
                backstory_power = 1

                story = [backstory_name, backstory_hp, backstory_power]
                return story;

            default:
                alert("invalid option")
                break;
        }
        while (backstory != 1 && backstory != 2 && backstory != 3 && backstory != 4) {

            backstory = parseInt(prompt("backstory \n 1-Jefe \n 2-Beserker\n 3-Explorador \n 4-Chamán"))

            switch (backstory) {
                case 1:
                    backstory_name = "Jefe"
                    backstory_hp = 15
                    backstory_power = 2

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 2:
                    backstory_name = "Beserker"
                    backstory_hp = 30
                    backstory_power = 1

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;

                case 3:
                    backstory_name = "Explorador"
                    backstory_hp = 20
                    backstory_power = 2

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 4:
                    backstory_name = "chamán"
                    backstory_hp = 5
                    backstory_power = 1

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;

                default:
                    alert("invalid option")
                    break;
            }
        }

    } else if (raza == "beastmen") {
        switch (backstory) {
            case 1:
                backstory_name = "Gente Perro"
                backstory_hp = 10
                backstory_power = 2

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 2:
                backstory_name = "Gente Gato"
                backstory_hp = 10
                backstory_power = 2

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 3:
                backstory_name = "Gente Pájaro"
                backstory_hp = 15
                backstory_power = 3

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            case 4:
                backstory_name = "Gente Conejo"
                backstory_hp = 5
                backstory_power = 1

                story = [backstory_name, backstory_hp, backstory_power]
                return story;
            default:
                alert("invalid option")
                break;
        }
        while (backstory != 1 && backstory != 2 && backstory != 3 && backstory != 4) {

            backstory = parseInt(prompt("backstory \n 1-gente perro \n 2- gente gato\n 3-gente pájaro \n 4-gente conejo"))

            switch (backstory) {
                case 1:
                    backstory_name = "Gente Perro"
                    backstory_hp = 10
                    backstory_power = 2

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 2:
                    backstory_name = "Gente Gato"
                    backstory_hp = 10
                    backstory_power = 2

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 3:
                    backstory_name = "Gente Pájaro"
                    backstory_hp = 15
                    backstory_power = 3

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                case 4:
                    backstory_name = "Gente Conejo"
                    backstory_hp = 5
                    backstory_power = 1

                    story = [backstory_name, backstory_hp, backstory_power]
                    return story;
                default:
                    alert("invalid option")
                    break;
            }
        }

    }

}


const dolls = []

// alert("Abro mis ojos, y la tenue luz del piso asalta mis ojos como si fuera el sol. Con considerable esfuerzo logro mover mi cabeza para no tener que mirar directo al suelo")

// alert("Mi cuerpo se siente pesado y letárgico, como si hubiera dormido por meses. A pesar de esto, logro levantar mi cabeza para examinar mis alrededores")

// alert("Me encuentro en una especie de santuario, adentro de un círculo en una especie de pileta en medio de la habitación, la elevación del círculo hace que la profundidad del agua sea unos centímetros nomas, seria difícil ahogarme adentro del círculo incluso inconsciente")

// alert("'Levántate bella durmiente, hay trabajo que hacer'")

// alert("Un hombre se encuentra enfrente mío, alto, con pelo corto, pero bien cuidado, su lenguaje corporal demostraba confianza y elegancia, ojos azules que parecían brillar en la oscuridad de este santuario. está vestido con una túnica extraña de color blanco, con parches dos a los costados de la cadera y uno en el lado derecho del pecho, los parches no estaban cocidos en la parte superior, su túnica está abierta, pero él no parece molestarle, tiene botas chicas que se ajustan al pie de color negro y no pasan el tobillo tiene pantalones de color marrón y una camisa debajo de la túnica, es la vestimenta más extraña que he visto, pero me puedo dar cuenta que es de la más alta calidad")

// alert("'Empecemos con algo básico, levántate'. Su voz es imponente, me encuentro intentando levantarme antes de darme cuenta")

// levantarse();


// alert("'Okay, es hora de continuar, hay varias pruebas que vas a realizar y no tengo todo el día'")

// alert("'Soy Vulion, Dios de los Constructos, estoy encargado de aportar oponentes y obstáculos para la siguiente juego de héroes que se hace cada 10 años, y tú me vas a ayudar a probarlos'")

// alert("'Como dije antes no tengo todo el día, pero veo en tu cara que tienes preguntas, así que te dejaré hacer 3 preguntas antes de que continuemos'")
// // la variable q representa las preguntas que le quedan al usuario
// let q = 3;

// // la variable input representa la eleccion de pregunta del usuario
// let input = prompt("Presiona un número para elegir una opción \n 1-¿Tú eres el Dios de los Constructos? \n 2-¿Dónde estoy? \n 3-¿Qué es el Juego de Héroes? \n 4-¿Por qué yo?");

// for (let i = q; i > 0; i--) {

//     //  se le resta 1 a la variable q para representar que ya hizo una pregunta
//     q -= 1;

//     if (input == 1) {
//         alert("Si")
//         break
//     } else if (input == 2) {
//         alert("Ahora estás en la cámara del despertar, con respecto a donde estás en el mundo, estás en la Fosa, mi propio dominio, en mi propio estudio, donde puedo experimentar y ejercer mis poderes sin límites o la regulación del panteón de Oshera")
//     } else if (input == 3) {
//         alert("El Juego de Héroes es una especie de evento internacional multidisciplinario, donde participan campeones, caballeros y santos con el objetivo de ganar riquezas y favores con los dioses, o en caso de algunos santos para traer gloria a sus respectivos dioses")
//     } else if (input == 4) {
//         alert("Ah, eso es simple, porque lo digo yo")
//     } else {
//         alert("'Perdón, no entendí tu pregunta. Pero te la cobro igual, no tengo todo el día'")
//     }

//     if (i != 1) {
//         input = prompt("Presiona un número para elegir una opción \n 1-¿Tú eres el Dios de los Constructos? \n 2-¿Dónde estoy? \n 3-¿Qué es el Juego de Héroes? \n 4-¿Por qué yo?");
//     }
// }

// if (input == 1 && q > 0) {

//     input = prompt("Presiona un número para elegir una opción  \n 1-¿En serio? \n 2-¿Dónde estoy? \n 3-¿Qué es el Juego de Heroes? \n 4-¿Por qué yo?");

//     for (let i = q; i > 0; i--) {

//         //  se le resta 1 a la variable q para representar que ya hizo una pregunta
//         q -= 1;

//         if (input == 1) {
//             alert("Si")
//             break
//         } else if (input == 2) {
//             alert("Ahora estás en la cámara del despertar, con respecto a donde estás en el mundo, estás en la Fosa, mi propio dominio, en mi propio estudio, donde puedo experimentar y ejercer mis poderes sin límites o la regulación del panteón de Oshera")
//         } else if (input == 3) {
//             alert("El Juego de Héroes es una especie de evento internacional multidisciplinario, donde participan campeones, caballeros y santos con el objetivo de ganar riquezas y favores con los dioses, o en caso de algunos santos para traer gloria a sus respectivos dioses")
//         } else if (input == 4) {
//             alert("Ah, eso es simple, porque lo digo yo")
//         } else {
//             alert("'Perdón, no entendí tu pregunta. Pero te la cobro igual, no tengo todo el día'")
//         }

//         if (i != 1) {
//             input = prompt("Presiona un número para elegir una opción  \n 1-¿En serio? \n 2-¿Donde estoy? \n 3-¿Que es el Juego de Heroes? \n 4-¿Porque yo?");
//         }

//     }
// }

// if (input == 1 && q > 0) {

//     input = prompt("Presiona un número para elegir una opción  \n 1-¿Usted? \n 2-¿Dónde estoy? \n 3-¿Qué es el Juego de Heroes? \n 4-¿Por qué yo?");

//     for (let i = q; i > 0; i--) {
//         //  se le resta 1 a la variable q para representar que ya hizo una pregunta
//         q -= 1;

//         if (input == 1) {
//             alert("Asi es")
//         } else if (input == 2) {
//             alert("Ahora estás en la cámara del despertar, con respecto a donde estás en el mundo, estás en la Fosa, mi propio dominio, en mi propio estudio, donde puedo experimentar y ejercer mis poderes sin límites o la regulación del panteón de Oshera")
//         } else if (input == 3) {
//             alert("El Juego de Héroes es una especie de evento internacional multidisciplinario, donde participan campeones, caballeros y santos con el objetivo de ganar riquezas y favores con los dioses, o en caso de algunos santos para traer gloria a sus respectivos dioses")
//         } else if (input == 4) {
//             alert("Ah, eso es simple, porque lo digo yo")
//         } else {
//             alert("'Perdón, no entendí tu pregunta. Pero te la cobro igual, no tengo todo el día'")
//         }

//     }
// }

// if (input == 1) {
//     input = prompt("'Okay, hora de empezar' \n 1-Pero..")
// };

// alert("'Okay, hora de empezar'");

alert("'Bueno, como primer punto tengo unas preguntas para ti me ayudara a formar una buena idea de tus capacidades y aptitudes'")


const user_doll = {
    name: prompt("¿cual es tu nombre?"),
    sex: gender(),
    race: race()[0],
    background: backstory()[0],
    hp: 10 + race_choice[1]+ story[1],
    power: race_choice[2]+ story[2]
}
console.log(user_doll);
console.log(story);
// alert("'No te preocupes, la primera prueba es sencilla, solo tienes que elegir un dios...'");