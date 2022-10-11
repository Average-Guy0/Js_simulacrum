// tutorial
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

// funcion para simular dados, son dos dados de 6 que funcionaran para decidir el resultado del usuario

const dos_d6 = () => { return Math.ceil(Math.random() * 6) + Math.ceil(Math.random() * 6) }
// esta funcion es la que permite determinar el exito o fracaso de los encuentros que el usuario encuentra, 
// basicamente tira dos dados de 6 y le suma el bonus poder del usuario y resta la dificultad
// >=10 exito
// 7-9 pequeño exito
// <=6 fracaso
function roll(dificultad) {
    return dos_d6() + user_doll.power - dificultad
}

// classe para contruir oponentes, no estoy seguro si le encontrare alguna utilidad
class doll {
    constructor(name, hit_points, damage, dificultad) {
        this.name = name
        this.hp = hit_points
        this.dmg = damage
        this.dificultad = dificultad
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

    let raza = parseInt(prompt("¿cual es tu raza? \n1-Humano - la unica raza que evoluciono en Gaia, y la que los dioses le permiten mayor libertad \n \n2-Elfos - Desde el principio los dioses han estado fancinados con los elfos, y fueron creados para ser la hermosa raza de hombres y mujeres que los dioses tenian en mente devido a esta atencion los elfos son una raza diseñada para entretener a los dioses  \n \n3-Orcos - los dioses al principio querian una raza para que sea enemigo del resto del mundo, afortunadamente se dieron cuenta rapidamente del terrible error que hicieron cuando tuvieron que saltar a defender a los orcos de la ira del resto del mundo, demostrando que crear una raza malvada desde el principio era una terrible idea\n \n4-Hombres Bestia - las tribus de hombres animales son varias pero todas unicas, los dioses los crearon por su facinacion a los animales, muchas tribus ya estan extintas, pero algunas se mantienen fuerte bajo la proteccion de los dioses que las protejen "))

    switch (raza) {
        case 1:
            race_name = "Humano",
                race_hp = 10,
                race_power = 2;
            raza_elegida += 1
            race_choice = [race_name, race_hp, race_power];

            return race_choice;
        case 2:
            race_name = "Elfo"
            race_hp = 5
            race_power = 1
            raza_elegida += 2
            race_choice = [race_name, race_hp, race_power]

            return race_choice;
        case 3:
            race_name = "Orco"
            race_hp = 20
            race_power = 3
            raza_elegida += 3
            race_choice = [race_name, race_hp, race_power]

            return race_choice;
        case 4:
            race_name = "Hombres bestia"
            race_hp = 15
            race_power = 2
            raza_elegida += 4
            race_choice = [race_name, race_hp, race_power]

            return race_choice;


        default:
            alert("Elije la raza con un numero del 1 al 4")
            break;
    }

    while (raza != 1 && raza != 2 && raza != 3 && raza != 4) {
        raza = parseInt(prompt("¿cual es tu raza? \n1-Humano - la unica raza que evoluciono en Gaia, y la que los dioses le permiten mayor libertad \n \n2-Elfos - Desde el principio los dioses han estado fancinados con los elfos, y fueron creados para ser la hermosa raza de hombres y mujeres que los dioses tenian en mente devido a esta atencion los elfos son una raza diseñada para entretener a los dioses  \n \n3-Orcos - los dioses al principio querian una raza para que sea enemigo del resto del mundo, afortunadamente se dieron cuenta rapidamente del terrible error que hicieron cuando tuvieron que saltar a defender a los orcos de la ira del resto del mundo, demostrando que crear una raza malvada desde el principio era una terrible idea\n \n4-Hombres Bestia - las tribus de hombres animales son varias pero todas unicas, los dioses los crearon por su facinacion a los animales, muchas tribus ya estan extintas, pero algunas se mantienen fuerte bajo la proteccion de los dioses que las protejen "))

        switch (raza) {
            case 1:
                race_name = "Humano"
                race_hp = 10
                race_power = 2
                raza_elegida += 1
                race_choice = [race_name, race_hp, race_power]

                return race_choice;
            case 2:
                race_name = "Elfo"
                race_hp = 5
                race_power = 1
                raza_elegida += 2
                race_choice = [race_name, race_hp, race_power]

                return race_choice;
            case 3:
                race_name = "orco"
                race_hp = 20
                race_power = 3
                raza_elegida += 3
                race_choice = [race_name, race_hp, race_power]

                return race_choice;
            case 4:
                race_name = "Hombre Bestia"
                race_hp = 15
                race_power = 2
                raza_elegida += 4
                race_choice = [race_name, race_hp, race_power]

                return race_choice;


            default:
                alert("Elije la raza con un numero del 1 al 4")
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
            backstory = parseInt(prompt("Historia \n 1-Mercader \n 2-Sabio\n 3-Esclavo \n 4-Soldado"))
            raza = "human"
            break;
        case 2:
            backstory = parseInt(prompt("Historia \n 1-Blade dancer \n 2-Sirviente \n 3-Concubino \n 4-Exiliado"))
            raza = "elf"
            break;
        case 3:
            backstory = parseInt(prompt("Historia \n 1-Jefe \n 2-Berserker\n 3-Explorador \n 4-Cháman"))
            raza = "orc"
            break;
        case 4:
            backstory = parseInt(prompt("Historia \n 1-gente perro \n 2- gente gato\n 3-gente pájaro \n 4-gente conejo"))
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
                alert("Elije la historia con un numero del 1 al 4")
                break;
        }
        // este while permite re ingresar la historia en caso de que el usuario ingreso otro numero
        while (backstory != 1 && backstory != 2 && backstory != 3 && backstory != 4) {

            backstory = parseInt(prompt("Historia \n 1-Mercader \n 2-Sabio\n 3-Esclavo \n 4-Soldado"))

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
                    alert("Elije la historia con un numero del 1 al 4")
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
                alert("Elije la historia con un numero del 1 al 4")
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
                    alert("Elije la historia con un numero del 1 al 4")
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
                alert("Elije la historia con un numero del 1 al 4")
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
                    alert("Elije la historia con un numero del 1 al 4")
                    break;
            }
        }
        // este if == beastmen solo esta aqui para poder identificar rapidamente la seccion de beastmen
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
                alert("Elije la historia con un numero del 1 al 4")
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
                    alert("Elije la historia con un numero del 1 al 4")
                    break;
            }
        }

    }

}


const dolls = [
    { name: "araña gigante", hp: 1, dmg: 2, dificultad: 3 },
    { name: "estatua animada", hp: 2, dmg: 2, dificultad: 2 },
    { name: "muñeca samurai", hp: 2, dmg: 3, dificultad: 3 },
    { name: "simulador de santo", hp: 3, dmg: 5, dificultad: 4 },
    { name: "manada de lobos", hp: 2, dmg: 4, dificultad: 2 },
]

// comienzo de la aventura

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

// alert("'Como primer punto tengo unas preguntas para ti me ayudara a formar una buena idea de tus capacidades y aptitudes'")


// const user_doll = {
//     name: prompt("¿cual es tu nombre?"),
//     sex: gender(),
//     race: race()[0],
//     background: backstory()[0],
//     // esto determina la vida que el usuario tiene al empezar la aventura, game over cuando llega a zero
//     hp: 10 + race_choice[1] + story[1],
//     // este atributo power representa el bonus del usuario a la hora de rollear
//     power: race_choice[2] + story[2]
// }
alert("'¿que es con esa mirada?' pregunto de repente, 'es solo, que no eres como me imaginaba un dios' respondi \n 'oh ¿y que esperaba?, ¿ropa con luz, cuatro brazos, cuernos por ojos, piel roja?' dijo con una exasperada exprecion, pincho el templo de su nariz.\n '¿quieres una demostracion?¿eso te convenceria?' estaba por expresar que no era necesario pero el ya habia alzado su mano en direccion a la parte de atras del santuario, de repente objetos empezaron a levitar, y consolidarse en una forma humanoide, es masculino tiene incluso un pedaso de roca que representaba sus genitales, tiene la mitad de mi estatura, de repente se detuvo, y luego venas de luz aparecieron en su cuerpo, y asi cobro vida")

let golem_dmg = parseInt(prompt("Dale un arma, un monton de armas voladoras aparecieron en un instante, flotando alrededor mio \n 1-pedazo de madera (daño=1) \n 2-un hacha (daño=2) \n 3-una ballesta (daño=3)"))

// esto en caso de que no pongan un numero valido
while (golem_dmg!=1&&golem_dmg!=2&&golem_dmg!=3){
    golem_dmg = parseInt(prompt("Dale un arma, un monton de armas voladoras aparecieron en un instante, flotando alrededor mio \n 1-pedazo de madera (daño=1) \n 2-un hacha (daño=2) \n 3-una ballesta (daño=3)"))
}

let golem_name = prompt("'finalmente dale el nombre que quieras' me dijo mientras escribia algo en su tabla negra")

const golem = new doll(golem_name,1,golem_dmg,1)

dolls.push(golem)
// funcion de busqueda para demostrar que se hacerlo
const find_doll = dolls.filter((el)=> el.name == golem_name)
console.log(find_doll);
console.log(dolls);
// alert("'No te preocupes, la primera prueba es sencilla, solo tienes que elegir un dios...'");