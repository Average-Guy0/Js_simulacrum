// // index:
// -dom
// -Variables
// -functions
// -arrays
// -eventos

// mientras no haya un usuario logueado la alerta se dispara para informar que usuario puede usar para jugar
(localStorage.getItem("user") == null) && Swal.fire({ title: 'log in', titleText: 'Dollhouse usa una base de datos falsa para operar, puedes ingresar con el siguiente usuario', html: 'Usuario: salami dave <br> Contraseña: contraseña', icon: 'info', confirmButtonText: 'Entendio' });

// // dom
const log_user = document.querySelector("#user"),
    log_pass = document.querySelector("#pass"),
    log_btn = document.querySelector("#btn_log"),
    log_out_btn = document.querySelector("#btn_log_out"),
    toggles = document.querySelectorAll(".toggle"),
    box_text = document.querySelector("#box-text"),
    box_btn = document.querySelector("#box-btn"),
    start_btn = document.querySelector("#start"),
    clear_achv = document.querySelector("#clear-achv");

// // Variables
// este objeto representa el equipo y/o bendiciones que el usuario recibe en el juego
let doll_status = {}
let questions = 1
// // functions 

// esta funcion revisa la falsa base de datos para  loggearse en el sitio
function validation(user, password) {
    let match = fake_DB.find(fake_DB => fake_DB.user == user);

    if (typeof match == "undefined") {
        return false;
    } else if (match.password != password) {
        return false;
    } else {
        return match;
    };
};

// esta guarda el usuario que se esta usando de la false base de datos en el local storage considerandolo como usuario activo
function saving_user(db_user) {
    const user = {
        user: db_user.user,
        password: db_user.password,
        achivement: db_user.achivement
    };

    localStorage.setItem("user", JSON.stringify(user));
};

function clear_storage() {
    localStorage.clear();
    sessionStorage.clear();
};
// esta funcion esta diseñada para borrar los logros que el usuario posee, en caso de que quiera adquirirlos nuevamente
function clear_record() {
    let user = loot_user();
    user.achivement = 0;
    localStorage.setItem("user", JSON.stringify(user));
};

// cambia los display: none; del html para mostrar la barra superior con el boton de log out
function change_display() {
    toggles.forEach(tag => {
        tag.classList.toggle("d-none");
    });
};

// esta funcion permite recuperar el user del local storage donde fue guardado
function loot_user() {
    let looted_user = JSON.parse(localStorage.getItem("user"));
    return looted_user;
};

// esta funcion se aplica al cargarse la pagina para saltear el logueo de nuevo
function logged_user(user) {
    user && change_display();
};

// permite mostrar el boton en caso de que no requiera nada o el usuario posea algo especifico en su status
function show_btn(button) {
    return button.require_status == null || button.require_status(doll_status);
};

function pick_button(button) {
    
    // del boton elegido guardamos el id que esta en el atributo next_scene
    const next_scene_id = button.next_scene;

    // este flujo de control existe para reiniciar el juego en caso de que sea necesario
    (next_scene_id > 0) && begin();

    // si el boton tiene una funcion, la ejecuta
    button.event && button.event();

    // actualiza el estatus acorde
    doll_status = Object.assign(doll_status, button.add_status);

    // funcion para mostrar la siguenten escena
    show_scene(next_scene_id);
};

// funcion que muestra la situacion y renderiza los botones al usuario
function show_scene(id) {
    // primero guarda la escena(que es un objeto) que tenga el id que este como parametro
    const new_scene = scenes.find(object => object.id === id);
    // cambia el html con el html de la escena
    // si el objeto tiene .new_html se remplaza el html existente por el nuevo
    // si el objeto tiene .html se agrega al html existente
    if (new_scene.new_html) {
        box_text.innerHTML = new_scene.new_html;
    } else {
        box_text.innerHTML += new_scene.html;
    }

    // borra todo los botones presentes
    while (box_btn.firstChild) {
        box_btn.removeChild(box_btn.firstChild);
    };
    // agrega botones nuevos por cada objeto dentro del array de botones
    new_scene.buttons.forEach(option => {
        if (show_btn(option)) {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.classList = `btn btn-outline-light btn-sm m-2`;
            button.onclick = () => { pick_button(option) };
            box_btn.appendChild(button);
        };
    });
};



// funcion para empezar el juego
function begin() {
    doll_status = {}
    show_scene("1")
}




// funcion para simular dados, son dos dados de 6 que funcionaran para decidir el resultado del usuario

const dos_d6 = () => { return Math.ceil(Math.random() * 6) + Math.ceil(Math.random() * 6) }
// esta funcion es la que permite determinar el exito o fracaso de los encuentros que el usuario encuentra, 
// basicamente tira dos dados de 6 y le suma el bonus poder del usuario y resta la dificultad
// >=10 exito
// 7-9 pequeño exito
// <=6 fracaso
function roll(dificultad) {
    return dos_d6() + user_doll.power - dificultad;
};
function test(string) {
    alert("test" + string)
}
// classe para contruir oponentes
class Doll {
    constructor(name, hit_points, damage, dificultad) {
        this.name = name
        this.hp = hit_points
        this.dmg = damage
        this.dificultad = dificultad;
    };
};

// function gender() {

//     let gender = parseInt(prompt(" genero \n 1 - Hombre \n 2 - Mujer"));

//     if (gender == 1) {
//         return "male"
//     } else if (gender == 2) {
//         return "female"
//     } else {
//         alert("invalid choice");
//     }

//     while (gender != 1 && gender != 2) {

//         gender = parseInt(prompt(" genero \n 1 - Hombre \n 2 - Mujer"))

//         switch (gender) {
//             case 1:
//                 return "male"
//             case 2:
//                 return "female"
//             default:
//                 alert("no valido");
//                 break;
//         };
//     };
// };

// // esta variable existe para poder utilizarla en la funcion de background la creo a fuera para que sea una variable global, pero sera modificada por la funcion race() ya que esa decide cuales historias son aplicables al usario dependiendo de la raza que eligio
// let raza_elegida = 0

// function race() {

//     let raza = parseInt(prompt("¿cual es tu raza? \n1-Humano - la unica raza que evoluciono en Gaia, y la que los dioses le permiten mayor libertad \n \n2-Elfos - Desde el principio los dioses han estado fancinados con los elfos, y fueron creados para ser la hermosa raza de hombres y mujeres que los dioses tenian en mente devido a esta atencion los elfos son una raza diseñada para entretener a los dioses  \n \n3-Orcos - los dioses al principio querian una raza para que sea enemigo del resto del mundo, afortunadamente se dieron cuenta rapidamente del terrible error que hicieron cuando tuvieron que saltar a defender a los orcos de la ira del resto del mundo, demostrando que crear una raza malvada desde el principio era una terrible idea\n \n4-Hombres Bestia - las tribus de hombres animales son varias pero todas unicas, los dioses los crearon por su facinacion a los animales, muchas tribus ya estan extintas, pero algunas se mantienen fuerte bajo la proteccion de los dioses que las protejen "))

//     switch (raza) {
//         case 1:
//             race_name = "Humano",
//                 race_hp = 10,
//                 race_power = 2;
//             raza_elegida += 1
//             race_choice = [race_name, race_hp, race_power];

//             return race_choice;
//         case 2:
//             race_name = "Elfo"
//             race_hp = 5
//             race_power = 1
//             raza_elegida += 2
//             race_choice = [race_name, race_hp, race_power]

//             return race_choice;
//         case 3:
//             race_name = "Orco"
//             race_hp = 20
//             race_power = 3
//             raza_elegida += 3
//             race_choice = [race_name, race_hp, race_power]

//             return race_choice;
//         case 4:
//             race_name = "Hombres bestia"
//             race_hp = 15
//             race_power = 2
//             raza_elegida += 4
//             race_choice = [race_name, race_hp, race_power]

//             return race_choice;


//         default:
//             alert("Elije la raza con un numero del 1 al 4")
//             break;
//     };

//     while (raza != 1 && raza != 2 && raza != 3 && raza != 4) {
//         raza = parseInt(prompt("¿cual es tu raza? \n1-Humano - la unica raza que evoluciono en Gaia, y la que los dioses le permiten mayor libertad \n \n2-Elfos - Desde el principio los dioses han estado fancinados con los elfos, y fueron creados para ser la hermosa raza de hombres y mujeres que los dioses tenian en mente devido a esta atencion los elfos son una raza diseñada para entretener a los dioses  \n \n3-Orcos - los dioses al principio querian una raza para que sea enemigo del resto del mundo, afortunadamente se dieron cuenta rapidamente del terrible error que hicieron cuando tuvieron que saltar a defender a los orcos de la ira del resto del mundo, demostrando que crear una raza malvada desde el principio era una terrible idea\n \n4-Hombres Bestia - las tribus de hombres animales son varias pero todas unicas, los dioses los crearon por su facinacion a los animales, muchas tribus ya estan extintas, pero algunas se mantienen fuerte bajo la proteccion de los dioses que las protejen "))

//         switch (raza) {
//             case 1:
//                 race_name = "Humano"
//                 race_hp = 10
//                 race_power = 2
//                 raza_elegida += 1
//                 race_choice = [race_name, race_hp, race_power]

//                 return race_choice;
//             case 2:
//                 race_name = "Elfo"
//                 race_hp = 5
//                 race_power = 1
//                 raza_elegida += 2
//                 race_choice = [race_name, race_hp, race_power]

//                 return race_choice;
//             case 3:
//                 race_name = "orco"
//                 race_hp = 20
//                 race_power = 3
//                 raza_elegida += 3
//                 race_choice = [race_name, race_hp, race_power]

//                 return race_choice;
//             case 4:
//                 race_name = "Hombre Bestia"
//                 race_hp = 15
//                 race_power = 2
//                 raza_elegida += 4
//                 race_choice = [race_name, race_hp, race_power]

//                 return race_choice;


//             default:
//                 alert("Elije la raza con un numero del 1 al 4")
//                 break;
//         };
//     };
// };

// function backstory() {

//     let backstory = 0
//     let raza = ""
//     // este primer switch funciona para elegir la historia del usuario depende de la raza que eligio en la funcion anterior
//     switch (raza_elegida) {
//         case 1:
//             backstory = parseInt(prompt("Historia \n 1-Mercader \n 2-Sabio\n 3-Esclavo \n 4-Soldado"))
//             raza = "human"
//             break;
//         case 2:
//             backstory = parseInt(prompt("Historia \n 1-Blade dancer \n 2-Sirviente \n 3-Concubino \n 4-Exiliado"))
//             raza = "elf"
//             break;
//         case 3:
//             backstory = parseInt(prompt("Historia \n 1-Jefe \n 2-Berserker\n 3-Explorador \n 4-Cháman"))
//             raza = "orc"
//             break;
//         case 4:
//             backstory = parseInt(prompt("Historia \n 1-gente perro \n 2- gente gato\n 3-gente pájaro \n 4-gente conejo"))
//             raza = "beastmen"
//             break;

//         default:
//             break;
//     }

//     if (raza == "human") {

//         switch (backstory) {
//             case 1:
//                 backstory_name = "mercader"
//                 backstory_hp = 10
//                 backstory_power = 1

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 2:
//                 backstory_name = "sabio"
//                 backstory_hp = 10
//                 backstory_power = 2

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 3:
//                 backstory_name = "esclavo"
//                 backstory_hp = 5
//                 backstory_power = 2

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 4:
//                 backstory_name = "soldado"
//                 backstory_hp = 20
//                 backstory_power = 3

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             default:
//                 alert("Elije la historia con un numero del 1 al 4")
//                 break;
//         }
//         // este while permite re ingresar la historia en caso de que el usuario ingreso otro numero
//         while (backstory != 1 && backstory != 2 && backstory != 3 && backstory != 4) {

//             backstory = parseInt(prompt("Historia \n 1-Mercader \n 2-Sabio\n 3-Esclavo \n 4-Soldado"))

//             switch (backstory) {
//                 case 1:
//                     backstory_name = "mercader"
//                     backstory_hp = 10
//                     backstory_power = 1

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 2:
//                     backstory_name = "sabio"
//                     backstory_hp = 10
//                     backstory_power = 2

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 3:
//                     backstory_name = "esclavo"
//                     backstory_hp = 5
//                     backstory_power = 2

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 4:
//                     backstory_name = "soldado"
//                     backstory_hp = 15
//                     backstory_power = 3

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 default:
//                     alert("Elije la historia con un numero del 1 al 4")
//                     break;
//             }
//         }
//     } else if (raza == "elf") {
//         switch (backstory) {
//             case 1:
//                 backstory_name = "Blade Dancer"
//                 backstory_hp = 15
//                 backstory_power = 3

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 2:
//                 backstory_name = "asistente"
//                 backstory_hp = 5
//                 backstory_power = 1

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 3:
//                 backstory_name = "concubino"
//                 backstory_hp = 10
//                 backstory_power = 1

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 4:
//                 backstory_name = "Exiliado"
//                 backstory_hp = 20
//                 backstory_power = 3

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;

//             default:
//                 alert("Elije la historia con un numero del 1 al 4")
//                 break;
//         }
//         while (backstory != 1 && backstory != 2 && backstory != 3 && backstory != 4) {

//             backstory = parseInt(prompt("backstory \n 1-Blade dancer \n 2-atendant \n 3-concubine \n 4-exiled"))

//             switch (backstory) {
//                 case 1:
//                     backstory_name = "Blade Dancer"
//                     backstory_hp = 15
//                     backstory_power = 3

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 2:
//                     backstory_name = "asistente"
//                     backstory_hp = 5
//                     backstory_power = 1

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 3:
//                     backstory_name = "concubino"
//                     backstory_hp = 10
//                     backstory_power = 1

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 4:
//                     backstory_name = "Exiliado"
//                     backstory_hp = 20
//                     backstory_power = 3

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;

//                 default:
//                     alert("Elije la historia con un numero del 1 al 4")
//                     break;
//             }
//         }

//     } else if (raza == "orc") {
//         switch (backstory) {
//             case 1:
//                 backstory_name = "Jefe"
//                 backstory_hp = 15
//                 backstory_power = 2

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 2:
//                 backstory_name = "Beserker"
//                 backstory_hp = 30
//                 backstory_power = 1

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;

//             case 3:
//                 backstory_name = "Explorador"
//                 backstory_hp = 20
//                 backstory_power = 2

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 4:
//                 backstory_name = "chamán"
//                 backstory_hp = 5
//                 backstory_power = 1

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;

//             default:
//                 alert("Elije la historia con un numero del 1 al 4")
//                 break;
//         }
//         while (backstory != 1 && backstory != 2 && backstory != 3 && backstory != 4) {

//             backstory = parseInt(prompt("backstory \n 1-Jefe \n 2-Beserker\n 3-Explorador \n 4-Chamán"))

//             switch (backstory) {
//                 case 1:
//                     backstory_name = "Jefe"
//                     backstory_hp = 15
//                     backstory_power = 2

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 2:
//                     backstory_name = "Beserker"
//                     backstory_hp = 30
//                     backstory_power = 1

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;

//                 case 3:
//                     backstory_name = "Explorador"
//                     backstory_hp = 20
//                     backstory_power = 2

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 4:
//                     backstory_name = "chamán"
//                     backstory_hp = 5
//                     backstory_power = 1

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;

//                 default:
//                     alert("Elije la historia con un numero del 1 al 4")
//                     break;
//             }
//         }
//         // este if == beastmen solo esta aqui para poder identificar rapidamente la seccion de beastmen
//     } else if (raza == "beastmen") {
//         switch (backstory) {
//             case 1:
//                 backstory_name = "Gente Perro"
//                 backstory_hp = 10
//                 backstory_power = 2

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 2:
//                 backstory_name = "Gente Gato"
//                 backstory_hp = 10
//                 backstory_power = 2

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 3:
//                 backstory_name = "Gente Pájaro"
//                 backstory_hp = 15
//                 backstory_power = 3

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             case 4:
//                 backstory_name = "Gente Conejo"
//                 backstory_hp = 5
//                 backstory_power = 1

//                 story = [backstory_name, backstory_hp, backstory_power]
//                 return story;
//             default:
//                 alert("Elije la historia con un numero del 1 al 4")
//                 break;
//         }
//         while (backstory != 1 && backstory != 2 && backstory != 3 && backstory != 4) {

//             backstory = parseInt(prompt("backstory \n 1-gente perro \n 2- gente gato\n 3-gente pájaro \n 4-gente conejo"))

//             switch (backstory) {
//                 case 1:
//                     backstory_name = "Gente Perro"
//                     backstory_hp = 10
//                     backstory_power = 2

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 2:
//                     backstory_name = "Gente Gato"
//                     backstory_hp = 10
//                     backstory_power = 2

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 3:
//                     backstory_name = "Gente Pájaro"
//                     backstory_hp = 15
//                     backstory_power = 3

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 case 4:
//                     backstory_name = "Gente Conejo"
//                     backstory_hp = 5
//                     backstory_power = 1

//                     story = [backstory_name, backstory_hp, backstory_power]
//                     return story;
//                 default:
//                     alert("Elije la historia con un numero del 1 al 4")
//                     break;
//             }
//         }

//     }

// };

// // array

// falsa base de datos
const fake_DB = [{
    user: "salami dave",
    password: "contraseña",
    achivement: 0
}, {
    user: "witch in the glass",
    password: "nothing",
    achivement: 100
}];


// array de enemigos creados con la class Doll
const dolls = [
    new Doll("araña gigante", 1, 2, 3),
    new Doll("estatua animada", 2, 2, 2),
    new Doll("muñeca samurai", 2, 3, 3),
    new Doll("simulador de santo", 3, 5, 4),
    new Doll("manada de lobos", 2, 4, 2)
];
// array que contiene toda la informacion de las scenas
const scenes = [
    {
        // id lo uso para llamar la escena
        id: "1",
        // html contiene el contenido que se renderizara en la pantalla
        new_html: `<p>Abro mis ojos, y la tenue luz del piso asalta mis ojos como si fuera el sol. Con considerable esfuerzo logro mover mi cabeza para no tener que mirar directo al suelo</p>
        <p>Mi cuerpo se siente pesado y letárgico, como si hubiera dormido por meses. A pesar de esto, logro levantar mi cabeza para examinar mis alrededores</p>
        <p>Me encuentro en una especie de santuario, adentro de un círculo en una especie de pileta en medio de la habitación, la elevación del círculo hace que la profundidad del agua sea unos centímetros nomas, seria difícil ahogarme adentro del círculo incluso inconsciente</p>
        <p>"Levántate bella durmiente, hay trabajo que hacer"</p>
        <p>Un hombre se encuentra enfrente mío, alto, con pelo corto, pero bien cuidado, su lenguaje corporal demostraba confianza y elegancia, ojos azules que parecían brillar en la oscuridad de este santuario. está vestido con una túnica extraña de color blanco, con parches dos a los costados de la cadera y uno en el lado derecho del pecho, los parches no estaban cocidos en la parte superior, su túnica está abierta, pero él no parece molestarle, tiene botas chicas que se ajustan al pie de color negro y no pasan el tobillo tiene pantalones de color marrón y una camisa debajo de la túnica, es la vestimenta más extraña que he visto, pero me puedo dar cuenta que es de la más alta calidad</p>
        <p>"Empecemos con algo básico, levántate." Su voz es imponente, me encuentro intentando levantarme antes de darme cuenta</p>`,
        // bottones que contienen texto la escena a la que se mueven y posiblemente alteracion al estatus del usuario en el juego
        buttons: [
            {
                text: "levantarse",
                next_scene: "2"
            }
        ]
    },
    {
        id: "2",
        new_html: `<p>Con mayor esfuerzo del que esperaba logro levantarme</p>
        <p>"Bien hecho" dice mientras su atención está en escribir algo en una tabla negra que tiene en la mano</p>
        <p>"Okay, es hora de continuar, hay varias pruebas que vas a realizar y no tengo todo el día"</p>
        <p>"Soy Vulion, Dios de los Constructos, estoy encargado de aportar oponentes y obstáculos para la siguiente juego de héroes que se hace cada 10 años, y tú me vas a ayudar a probarlos"</p>
        <p>"Como dije antes no tengo todo el día, pero veo en tu cara que tienes preguntas, así que te dejaré hacer 3 preguntas antes de que continuemos"</p>`,
        buttons: [
            {
                text: "vos sos dios?",
                // esta funcion permite que el usuario solo haga 3 preguntas al dios antes de empezar
                event: () => {
                    if (questions >= 3) {
                        let test = scenes.find(escenas => escenas.id === "2a");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2a"
            },
            {
                text: "¿donde estoy?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2b"
            },
            {
                text: "¿porque yo?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                    console.log(questions);
                },
                next_scene: "2c"
            },
            {
                text: "¿que es el juego de heroes?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2d"
            }
        ]
    },
    {
        id: "2a",
        html: `<p>Si</p>`,
        buttons: [
            {
                text: "¿En serio?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2e");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2e"
            },
            {
                text: "¿donde estoy?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2b"
            },
            {
                text: "¿porque yo?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2c"
            },
            {
                text: "¿que es el juego de heroes?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2d"
            }
        ]
    },
    {
        id: "2b",
        new_html: `<p>Ahora estás en la cámara del despertar</p>
        <p>con respecto a donde estás en el mundo, estás en la Fosa, mi propio dominio, lo que otros dioses llaman Dollhouse, en mi propio estudio, donde puedo experimentar y ejercer mis poderes sin límites o la regulación del panteón de Oshera</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "2"
            }
        ]
    },
    {
        id: "2c",
        new_html: `<p>Ah, eso es simple. porque lo digo yo</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "2"
            }
        ]
    },
    {
        id: "2d",
        new_html: `<p>El Juego de Héroes es una especie de evento internacional multidisciplinario, donde participan campeones, caballeros y santos con el objetivo de ganar riquezas y favores con los dioses, o en caso de algunos santos para traer gloria a sus respectivos dioses</p>
        <p>Tu tomaras el lugar de un santo para probar los obstaculos y enemigos que diseñe</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "2"
            }
        ]
    },
    {
        id: "2e",
        html: `<p>Si</p>`,
        buttons: [
            {
                text: "¿Usted?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2f"
            },
            {
                text: "¿donde estoy?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2b"
            },
            {
                text: "¿porque yo?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2c"
            },
            {
                text: "¿que es el juego de heroes?",
                event: () => {
                    if (questions === 3) {
                        let test = scenes.find(escenas => escenas.id === "2");
                        test.buttons.forEach(boton => {
                            boton.next_scene = "3";
                        })
                    } else {
                        questions++;
                    };
                },
                next_scene: "2d"
            }
        ]
    },
    {
        id: "2f",
        html: `<p>Asi es.</p>
        <p>Bueno, es momento de empezar.</p>`,
        buttons: [
            {
                text: "pero-",
                next_scene: "3"
            }
        ]
    },
    {
        id: "3",
        new_html: `<p>¡Bueno, es momento de empezar!.</p>`,
        buttons: [

        ]
    }
];

// // events

window.onload = () => {
    logged_user(loot_user());
};


// funcion que primero revisa que esten los valores necesarios para log in y luego revisa que esten correctos
// una vez confirmado con la falsa base de datos, guarda el usuario en el storage, cambia el display y manda una alerta
log_btn.onclick = () => {
    // e.preventDefault();

    if (!log_user.value || !log_pass.value) {
        Swal.fire({
            text: "Falta usuario y/o contraseña correctos",
            icon: "error"
        });
    } else {
        let data = validation(log_user.value, log_pass.value);
        if (!data) {
            Swal.fire({
                text: "Falta usuario y/o contraseña correctos",
                icon: "error"
            });
        } else {
            saving_user(data);
            change_display();
            Swal.fire({
                title: "Log In Exitoso",
                icon: "success"
            });
        };
    };
};
// boton que permite desloguearse
log_out_btn.onclick = () => {
    change_display();
    clear_storage();
};

// boton que borra los logros del usuario
clear_achv.onclick = () => {
    Swal.fire({
        title: 'Borrar logros',
        text: "estas apunto de borrar los logros en dollhouse, ¿estas seguro que quieres proseguir?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralos'
    }).then((result) => {
        if (result.isConfirmed) {
            clear_record();
            Swal.fire(
                'Exito',
                'tus logros han sido borrados',
                'success'
            );
        };
    });
};


start.onclick = () => {
    begin()
}

// // comienzo de la aventura

// if (input == 1) {
//     input = prompt("'Okay, hora de empezar' \n 1-Pero..")
// };

// alert("'Okay, hora de empezar'");

// alert("'Como primer punto tengo unas preguntas para ti me ayudara a formar una buena idea de tus capacidades y aptitudes'");


// const user_doll = {
//     name: prompt("¿cual es tu nombre?"),
//     sex: gender(),
//     race: race()[0],
//     background: backstory()[0],
//     // esto determina la vida que el usuario tiene al empezar la aventura, game over cuando llega a zero
//     hp: 10 + race_choice[1] + story[1],
//     // este atributo power representa el bonus del usuario a la hora de rollear
//     power: race_choice[2] + story[2]
// };

// alert("'¿que es con esa mirada?' pregunto de repente, 'es solo, que no eres como me imaginaba un dios' respondi \n 'oh ¿y que esperaba?, ¿ropa con luz, cuatro brazos, cuernos por ojos, piel roja?' dijo con una exasperada exprecion, pincho el templo de su nariz.\n '¿quieres una demostracion?¿eso te convenceria?' estaba por expresar que no era necesario pero el ya habia alzado su mano en direccion a la parte de atras del santuario, de repente objetos empezaron a levitar, y consolidarse en una forma humanoide, es masculino tiene incluso un pedaso de roca que representaba sus genitales, tiene la mitad de mi estatura, de repente se detuvo, y luego venas de luz aparecieron en su cuerpo, y asi cobro vida");

// let golem_dmg = parseInt(prompt("Dale un arma, un monton de armas voladoras aparecieron en un instante, flotando alrededor mio \n 1-pedazo de madera (daño=1) \n 2-un hacha (daño=2) \n 3-una ballesta (daño=3)"));

// // esto en caso de que no pongan un numero valido
// while (golem_dmg != 1 && golem_dmg != 2 && golem_dmg != 3) {
//     golem_dmg = parseInt(prompt("Dale un arma, un monton de armas voladoras aparecieron en un instante, flotando alrededor mio \n 1-pedazo de madera (daño=1) \n 2-un hacha (daño=2) \n 3-una ballesta (daño=3)"));
// };

// let golem_name = prompt("'finalmente dale el nombre que quieras' me dijo mientras escribia algo en su tabla negra");

// const golem = new doll(golem_name, 1, golem_dmg, 1);

// dolls.push(golem);
// // funcion de busqueda para demostrar que se hacerlo
// let busqueda = prompt("escribe el nombre de la muñeca que buscas");
// const find_doll = dolls.filter((doll) => doll.name.includes(busqueda));
// console.log(find_doll);;
// alert("'No te preocupes, la primera prueba es sencilla, solo tienes que elegir un dios...'");