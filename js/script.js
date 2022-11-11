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
    clear_achv = document.querySelector("#clear-achv"),
    hidden_results = document.querySelector("#roll-results"),
    achivement_list = document.querySelector("#achivement-list"),
    achivement_btn = document.querySelector("#achivement-btn");

// // Variables

// este objeto representa el equipo y/o bendiciones que el usuario recibe en el juego
let doll_status = {}
// variable que determina que tan bueno es el usuario en sus rolls
let doll_bonus = 0

// esta variable permite hacer la funcion de 3 preguntas en la historia
let questions = 1

// booleanos que me permiten determina el exito o fracaso de un roll
let great_success = false,
    success = false,
    failure = false;

// api para rollear dados
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5a1884b800mshcbea0f545165affp1c80c0jsn9c5a5328a37b',
        'X-RapidAPI-Host': 'dice-roll.p.rapidapi.com'
    }
};

// url de la api
let url = 'https://dice-roll.p.rapidapi.com/roll/2/d/6'

// sacada de la libreria de sweet alert para utilizar simple toast
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})




// // functions 

// esta es la funcion asincronica que me permite trabajar con la api
async function dice_roll() {
    const response = await fetch(url, options),
        dice = await response.json(),
        // el unico valor importante aqui es el total que es guardado en roll y determinara ciertos resultados
        roll = dice.total
    // a este valor lo guardo en una tag span en el html(declararla en una variable no me funciona bien) que esta escondida, cuando lo necesiste que la puedo leer y determina el resultado
    // esto implica que el usuario vera los resultados del roll anterior y no del roll actual
    hidden_results.innerText = roll
}
// esta funcion me permite usar booleanos para determinar el exito o fracaso de una accion
function results(difficulty) {
    // primero reseteo los booleanos a falso
    great_success = false;
    success = false;
    failure = false;

    let result = parseInt(hidden_results.innerText) + doll_bonus - difficulty

    // luego determinando el roll  anterior, mas el bonus menos la dificultad uno de los booleanos se hace true que lo puedo usar en futuros condicionales

    // y finalmente vuelvo a rollear los dados para utilizar el siguente roll
    dice_roll();

    if (result > 9) {
        return great_success = true
    } else if (result < 10 && result > 6) {
        return success = true
    } else if (result < 7) {
        return failure = true
    };
}



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
    user.achivement = {};
    localStorage.setItem("user", JSON.stringify(user));
};

// function para agregar un achivement requiere el objeto como achivement a guardar
function add_record(object, toast) {
    let record = object
    let user = loot_user();
    if (!user.achivement.record) {
        Toast.fire({
            icon: 'success',
            title: 'Achivement: ' + toast
        })
    }
    user.achivement = Object.assign(user.achivement, record)
    localStorage.setItem("user", JSON.stringify(user));
}

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
    // (next_scene_id > 0) && begin();

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

// esta funcion permite grabar en el off canvas los logros del usuario registrado en el local storage 
function achivements_gained() {
    // saca el usuario
    const user = loot_user()
    // borro los logros ya escritos para evitar repeticiones
    while (achivement_list.firstChild) {
        achivement_list.removeChild(achivement_list.firstChild)
    }

    // aplica la propiedad keys para sacar un array del objeto del cual aplico el forEach para crear las li
    Object.keys(user.achivement).forEach(record => {
        const list = document.createElement("li");
        list.innerText = record + user.achivement[record];
        achivement_list.appendChild(list)
    })
}


// funcion para empezar el juego
function begin() {
    doll_status = {}
    show_scene("1")
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


// // array

// falsa base de datos
const fake_DB = [{
    user: "salami dave",
    password: "contraseña",
    achivement: {}
}, {
    user: "witch in the glass",
    password: "nothing",
    achivement: 100
}];




// // events

window.onload = () => {
    logged_user(loot_user());
    // achivements_gained();
};

achivement_btn.onclick = () => {
    achivements_gained();
}

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
            // achivements_gained();
            Swal.fire(
                'Exito',
                'tus logros han sido borrados',
                'success'
            );
        };
    });

};


start.onclick = () => {
    begin();
    dice_roll();
}


// array que contiene toda la informacion de las scenas
const scenes = [
    {
        id: "End",
        new_html: `<p class="text-center">Gracias por jugar a Dollhouse</p>
        <p>Este es el fin de la versión 0.1</p>
        <p>Lista de cosas que pueden llegar en futuras versiones</p>
        <ul>
            <li>introducir la raza de hombres bestia con respectivas tribus (hombres perros, hombres gato, etc...)</li>
            <li>implementar nuevos dioses de los cuales tomar bendiciones</li>
            <li>implementar imagenes</li>
            <li>crear de forma dinamica pop ups que den informacion del mundo de gaia</li>
            <li>continuar con la exploracion de la Dollhouse</li>
        </ul>`,
        buttons: [
            {
                text: "Reiniciar",
                next_scene: "1"
            }
        ]
    },
    {
        id: "error",
        new_html: `<p>ERROR</p>`,
        buttons: []
    },
    {
        // id lo uso para llamar la escena
        id: "1",
        // html contiene el contenido que se renderizara en la pantalla
        new_html: `<p>Abro mis ojos, y la tenue luz del piso asalta mis ojos como si fuera el sol. Con considerable esfuerzo logro mover mi cabeza para no tener que mirar directo al suelo</p>
        <p>Mi cuerpo se siente pesado y letárgico, como si hubiera dormido por meses. A pesar de esto, logro levantar mi cabeza para examinar mis alrededores</p>
        <p>Me encuentro en una especie de santuario, adentro de un círculo, en una especie de pileta en medio de la habitación, la elevación del círculo hace que la profundidad del agua sea unos centímetros nomas, sería difícil ahogarme adentro del círculo incluso inconsciente</p>
        <p>"Levántate bella durmiente, hay trabajo que hacer"</p>
        <p>Un hombre se encuentra enfrente mío, alto, con pelo corto, pero bien cuidado, su lenguaje corporal demostraba confianza y elegancia, ojos azules que parecían brillar en la oscuridad de este santuario. está vestido con una túnica extraña de color blanco, con parches dos a los costados de la cadera y uno en el lado derecho del pecho, los parches no estaban cocidos en la parte superior, su túnica está abierta, pero él no parece molestarle, tiene botas chicas que se ajustan al pie de color negro y no pasan el tobillo tiene pantalones de color marrón y una camisa debajo de la túnica, es la vestimenta más extraña que he visto, pero me puedo dar cuenta que es de la más alta calidad</p>
        <p>"Empecemos con algo básico, levántate." Su voz es imponente, me encuentro intentando levantarme antes de darme cuenta</p>`,
        // bottones que contienen texto la escena a la que se mueven y posiblemente alteracion al estatus del usuario en el juego
        buttons: [
            {
                text: "levantarse",
                event: () => {
                    add_record({ 1: ": Baby Steps" }, "Baby Steps")
                },
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
                text: '"¿vos sos un dios?"',
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
                text: '"¿donde estoy?"',
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
                text: '"¿porque yo?"',
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
                text: '"¿que es el juego de heroes?"',
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
                text: '"¿En serio?"',
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
                text: '"¿donde estoy?"',
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
                text: '"¿porque yo?"',
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
                text: '"¿que es el juego de heroes?"',
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
                text: '"¿Usted?"',
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
                text: '"¿donde estoy?"',
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
                text: '"¿porque yo?"',
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
                text: '"¿que es el juego de heroes?"',
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
                text: '"pero-"',
                next_scene: "3"
            }
        ]
    },
    {
        id: "3",
        new_html: `<p>"¡Bueno, es momento de empezar!".</p>
        <p>Antes de la primera prueba necesito revisar unas cosas, acerca de ti, para determinar tú aptitudes y capacidades</p>
        <p>ahora responde responde:</p>
        <p>¿Genero?</p>`,
        buttons: [
            {
                text: '"Hombre"',
                add_status: { male: true },
                next_scene: "4"
            },
            {
                text: '"mujer"',
                add_status: { female: true },
                next_scene: "4"
            }
        ]
    },
    {
        id: "4",
        new_html: `<p>muy bien, ¿cual cual es tu raza?</p>`,
        buttons: [
            {
                text: '"humano"',
                require_status: (current) => current.male,
                next_scene: "4a"
            },
            {
                text: '"humana"',
                require_status: (current) => current.female,
                next_scene: "4a"
            },
            {
                text: '"Elfo"',
                require_status: (current) => current.male,
                next_scene: "4b"
            },
            {
                text: '"Elfa"',
                require_status: (current) => current.female,
                next_scene: "4b"
            },
            {
                text: '"Orco"',
                next_scene: "4c"
            }
        ]
    },
    {
        id: "4a",
        html: `<p>Humanos - la unica raza que evoluciono en Gaia, y la que los dioses le permiten mayor libertad</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "4"
            },
            {
                text: "confirmar",
                add_status: { human: true },
                event: () => { doll_bonus += 2 },
                next_scene: "5"
            }
        ]
    },
    {
        id: "4b",
        html: `<p>Elfos - Desde el principio los dioses han estado fascinados con los elfos, y fueron creados para ser la hermosa raza de hombres y mujeres que los dioses tenían en mente, debido a esta atención los elfos son una raza diseñada para entretener a los dioses.
        Son los perros de los dioses, fueron criados para servir a los dioses en todo lo que necesiten</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "4"
            },
            {
                text: "confirmar",
                add_status: { elven: true },
                event: () => { doll_bonus += 1 },
                next_scene: "5"
            }
        ]

    },
    {
        id: "4c",
        html: `<p>Orcos - los dioses al principio querían una raza para que sea enemigo del resto del mundo, afortunadamente se dieron cuenta rápidamente del terrible error que hicieron cuando tuvieron que saltar a defender a los orcos de la ira del resto del mundo(ya que fallaron cuando extinguieron a los enanos), demostrando que crear una raza malvada desde el principio era una terrible idea</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "4"
            },
            {
                text: "confirmar",
                add_status: { orc: true },
                event: () => { doll_bonus += 3 },
                next_scene: "5"
            }
        ]
    },
    {
        id: "5",
        new_html: `<p>Bueno con eso terminado cuentame sobre ti, cual es tu historia</p>`,
        buttons: [
            {
                text: '"Mercader"',
                require_status: (current) => current.human,
                next_scene: "5a"
            },
            {
                text: '"Erudito"',
                require_status: (current) => current.human && current.male,

                next_scene: "5b"
            },
            {
                text: '"Erudita"',
                require_status: (current) => current.human && current.female,
                next_scene: "5b"
            },
            {
                text: '"Soldado"',
                require_status: (current) => current.human,
                next_scene: "5c"
            },
            {
                text: '"Duelista"',
                require_status: (current) => current.elven,
                next_scene: "5d"
            },
            {
                text: '"Servidor"',
                require_status: (current) => current.elven && current.male,
                next_scene: "5e"
            },
            {
                text: '"Servidora"',
                require_status: (current) => current.elven && current.female,
                next_scene: "5e"
            },
            {
                text: '"concubino"',
                require_status: (current) => current.elven && current.male,
                next_scene: "5g"
            },
            {
                text: '"concubina"',
                require_status: (current) => current.elven && current.female,
                next_scene: "5g"
            },
            {
                text: '"Jefe"',
                require_status: (current) => current.orc && current.male,
                next_scene: "5h"
            },
            {
                text: '"Beserker"',
                require_status: (current) => current.orc,
                next_scene: "5i"
            },
            {
                text: '"Explorador"',
                require_status: (current) => current.orc && current.male,
                next_scene: "5j"
            },
            {
                text: '"Exploradora"',
                require_status: (current) => current.orc && current.male,
                next_scene: "5j"
            },
            {
                text: '"Chamán"',
                require_status: (current) => current.orc && current.female,
                next_scene: "5k"
            },
        ]
    },
    {
        id: "5a",
        html: `<p class="text-center">mercader</p>
        <p>Compraste tu posición, o favor de algún dios</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { merchant: true },
                next_scene: "6"
            }
        ]
    },
    {
        id: "5b",
        html: `<p class="text-center">Erudito</p>
        <p>Conoces más que la mayoría y tu inteligencia capto el ojo de algún dios</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { sage: true },
                event: () => { doll_bonus += 1 },
                next_scene: "6"
            }
        ]
    },
    {
        id: "5c",
        html: `<p class="text-center">Soldado</p>
        <p>Disciplina y poder físico, capas eres un caballero, o un campeón, o un simple soldado que un dios se apiadó</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { soldier: true },
                event: () => { doll_bonus += 2 },
                next_scene: "6"
            }
        ]
    },
    {
        id: "5d",
        html: `<p class="text-center">Duelista</p>
        <p>Como siempre una de los mejor entretenimiento es sangre y violencia</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { duelist: true },
                event: () => { doll_bonus += 2 },
                next_scene: "6"
            }
        ]
    },
    {
        id: "5e",
        html: `<p class="text-center">Servidor</p>
        <p>De toda una raza de sirviente vos sobresaliste sobre el resto, no es algo fácil de hacer</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { servant: true },
                event: () => { doll_bonus += 1 },
                next_scene: "6"
            }
        ]
    },
    {
        id: "5g",
        html: `<p class="text-center">Concubina</p>
        <p>Muchos dioses tienen sus favoritas en sus harems, mira que suertuda eres</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { concubine: true },
                next_scene: "6"
            }
        ]
    },
    {
        id: "5h",
        html: `<p class="text-center">Jefe</p>
        <p>Liderar una tribu es una trabajo duro y los dioses lo reconoces, a veces...</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { chief: true },
                next_scene: "6"
            }
        ]
    },
    {
        id: "5i",
        html: `<p class="text-center">Beserker</p>
        <p>Un guerrero bañado en sangre, el favor de los dioses marca tu éxito</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { beserker: true },
                event: () => { doll_bonus += 3 },
                next_scene: "6"
            }
        ]
    },
    {
        id: "5j",
        html: `<p class="text-center">Explorador</p>
        <p>Las sabanas de Gaia son brutales, necesitar ayuda divina, no es una debilidad es una bendición</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { explorer: true },
                event: () => { doll_bonus += 2 },
                next_scene: "6"
            }
        ]
    },
    {
        id: "5k",
        html: `<p class="text-center">Chaman</p>
        <p>Chamanes trabajan cerca con los dioses protectores, y su ayuda es muy agradecida</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "5"
            },
            {
                text: "confirmar",
                add_status: { chaman: true },
                event: () => { doll_bonus += 2 },
                next_scene: "6"
            }
        ]
    },
    {
        id: "6",
        new_html: `<p>"¿que es con esa mirada?"" pregunto de repente, "es solo, que no eres como me imaginaba un dios" respondi</p>
        <p>"oh ¿y que esperaba?, ¿ropa con luz, cuatro brazos, cuernos por ojos, piel roja?" dijo con una exasperada exprecion, pincho el templo de su nariz.</p>
        <p>"¿quieres una demostracion?¿eso te convenceria?" estaba por expresar que no era necesario pero el ya habia alzado su mano en direccion a la parte de atras del santuario, de repente rocas empezaron a levitar, y consolidarse en una forma humanoide, es masculino tiene incluso un pedaso de roca que representaba sus genitales, tiene la mitad de mi estatura, de repente se detuvo, y luego venas de luz aparecieron en su cuerpo por un momento, y asi cobro vida</p>
        <p>el pequeño golem miro al dios que lo creo, como esperando algo de el</p>
        <p>dios dijo "tu nombre es zed"</p>
        <p>Volviendo su mirada a mí dijo "ya que Zed esta aquí vamos a ver que tan bueno eres en una pelea" "¿que-" trate de preguntar, pero la repente aparición de armas flotante me interrumpen</p>
        <p>elije la arma que te sea comoda y enfrentate a Zed</p>`,
        buttons: [
            {
                text: "espada corta",
                add_status: { short_sword: true },
                event: () => {
                    // para determinar el resultado del combate primero agarro la escena siguiente
                    let test = scenes.find(escenas => escenas.id === "6a")
                    // usando la funcion results puedo determinar si tubo exito o no y luego redireccionar la scena siguiente dependiendo del resultado
                    switch (results(4)) {
                        case great_success:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7a";
                            })
                            break;
                        case success:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7b";
                            })
                            break;
                        case failure:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7c";
                            })
                            break;
                        default:
                            break;
                    }
                },
                next_scene: "6a"
            },
            {
                text: "espada larga",
                require_status: (current) => current.soldier,
                add_status: { long_sword: true },
                event: () => {
                    doll_bonus += 2
                    let test = scenes.find(escenas => escenas.id === "6b")

                    switch (results(4)) {
                        case great_success:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7d";
                            })
                            break;
                        case success:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7e";
                            })
                            break;
                        case failure:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7g";
                            })
                            break;
                        default:
                            break;
                    }
                },
                next_scene: "6b"
            },
            {
                text: "Estoque",
                require_status: (current) => current.duelist,
                add_status: { rapier: true },
                event: () => {
                    doll_bonus += 2
                    let test = scenes.find(escenas => escenas.id === "6c")

                    switch (results(4)) {
                        case great_success:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7h";
                            })
                            break;
                        case success:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7i";
                            })
                            break;
                        case failure:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7j";
                            })
                            break;
                        default:
                            break;
                    }
                },
                next_scene: "6c"
            },
            {
                text: "Hachas Doble",
                require_status: (current) => current.beserker,
                add_status: { dual_axes: true },
                event: () => {
                    doll_bonus += 1
                    let test = scenes.find(escenas => escenas.id === "6d")

                    switch (results(4)) {
                        case great_success:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7k";
                            })
                            break;
                        case success:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7l";
                            })
                            break;
                        case failure:
                            test.buttons.forEach(boton => {
                                boton.next_scene = "7n";
                            })
                            break;
                        default:
                            break;
                    }
                },
                next_scene: "6d"
            },
        ]
    },
    {
        id: "6a",
        html: `<p>Agarro la espada corta en frente mío, al mismo tiempo Zed se acerca rápidamente a golpearme</p>`,
        buttons: [
            {
                text: "atacar",
                next_scene: "error"
            }
        ]
    },
    {
        id: "6b",
        html: `<p>Agarro la espada Larga en frente mio, al mismo tiempo Zed se acerca rápidamente a golpearme</p>`,
        buttons: [
            {
                text: "atacar",
                next_scene: "error"
            }
        ]
    },
    {
        id: "6c",
        html: `<p>Agarro estoque en frente mio, al mismo tiempo Zed se acerca rápidamente a golpearme</p>`,
        buttons: [
            {
                text: "atacar",
                next_scene: "error"
            }
        ]
    },
    {
        id: "6d",
        html: `<p>Agarro las hachas en frente mio, al mismo tiempo Zed se acerca rápidamente a golpearme</p>`,
        buttons: [
            {
                text: "atacar",
                next_scene: "error"
            }
        ]
    },
    {
        id: "7a",
        html: `<p>Zed es más rápido de lo que parece, mi guardia es inútil porque no, él no estaba cargando contra mí, estaba tomando carrera. De repente Zed salta para golpearme en la cara, esto me toma de sorpresa haciendo que pierda el equilibrio, pero la suerte está de mi lado mi espada se alineó perfectamente con el cuerpo de Zed empalándolo en el pecho.</p>`,
        buttons: [
            {
                text: "levantarse",
                require_status: (current) => current.male,
                event: () => { add_record({ 2: ": zed's dead" }, "Zed's dead") },
                next_scene: "8m"
            },
            {
                text: "levantarse",
                require_status: (current) => current.female,
                event: () => { add_record({ 2: ": zed's dead" }, "Zed's dead") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7b",
        html: `<p>zed es más rápido de lo que parece, y noto que él no estaba cargando contra mí, estaba tomando carrera. De repente Zed salta para golpearme en la cara, rápidamente doy un paso a la derecha, habiendo leído sus movimientos correctamente. Zed cae de rodillas, y aprovechó que me dio la espalda para apuñalarlo por la espalda</p>`,
        buttons: [
            {
                text: "tomar aliento",
                require_status: (current) => current.male,
                event: () => { add_record({ 2: ": Primera sangre" }, " Primera sangre") },
                next_scene: "8m"
            },
            {
                text: "tomar aliento",
                require_status: (current) => current.female,
                event: () => { add_record({ 2: ": Primera sangre" }, " Primera sangre") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7c",
        html: `<p>zed es más rápido de lo que parece, me preparo para recibirlo de frente con espada apuntándolo. De repente Zed salta para golpearme en la cara, esto me toma de sorpresa, trato de levantar mi espada contra él, pero la suerte no está de mi lado, zed usa una de sus piernas para pisar la espada y su puño conecta directamente con mi cara.</p>
        <p>veo estrellas, y el mundo da vueltas</p>
        <p>no se muy bien que esta pasando pero si se lo que mi cuerpo esta sintiendo la golpiza que me esta dando zed</p>
        <p>"Muy bien zed, es suficiente" de repente el abuso se detiene</p>
        <p>"Bueno eso fue... infomativo" me dice mientras admiro el cielo del lugar </p>
        <p>"okay, esto me parece suficiente como introduccion"</p>`,
        buttons: [
            {
                text: "levantarme",
                require_status: (current) => current.male,
                event: () => { add_record({ 3: ": Damn a newborn kick your ass" }, " :Damn a newborn kick your ass") },
                next_scene: "8m"
            },
            {
                text: "levantarme",
                require_status: (current) => current.female,
                event: () => { add_record({ 3: ": Damn a newborn kick your ass" }, " :Damn a newborn kick your ass") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7d",
        html: `<p>Gracias a mi entrenamiento rápidamente entro en guardia, esperando el ataque del pequeño golem</p>
        <p>Cuando Zed salta, aprovechó y lo corto a la mitad en el medio del aire</p>
        <p>los dos pedazos que antes eran Zed salen volando</p>`,
        buttons: [
            {
                text: "Tomo aliento",
                require_status: (current) => current.male,
                event: () => { add_record({ 2: ": zed's dead" }, "Zed's dead") },
                next_scene: "8m"
            },
            {
                text: "Tomo aliento",
                require_status: (current) => current.female,
                event: () => { add_record({ 2: ": zed's dead" }, "Zed's dead") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7e",
        html: `<p><p>Gracias a mi entrenamiento rápidamente entro en guardia, esperando el ataque del pequeño golem</p>
        <p>cuando Zed salta, doy un paso a la derecha para evitarlo, Zed cae en el suelo, y aprobecho el momento en que se levanta para decapitarlo</p>`,
        buttons: [
            {
                text: "tomar aliento",
                require_status: (current) => current.male,
                event: () => { add_record({ 2: ": Primera sangre" }, " Primera sangre") },
                next_scene: "8m"
            },
            {
                text: "tomar aliento",
                require_status: (current) => current.female,
                event: () => { add_record({ 2: ": Primera sangre" }, " Primera sangre") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7g",
        html: `<p>Gracias a mi entrenamiento rápidamente entro en guardia, esperando el ataque del pequeño golem</p>
        <p>pero me confie, no espere que el golem saltara en el aire, y rapidamente siento el golpe en la cara</p>
        <p>veo estrellas, y el mundo da vueltas</p>
        <p>no se muy bien que esta pasando pero si se lo que mi cuerpo esta sintiendo la golpiza que me esta dando zed</p>
        <p>"Muy bien zed, es suficiente" de repente el abuso se detiene</p>
        <p>"Bueno eso fue... infomativo" me dice mientras admiro el cielo del lugar </p>
        <p>"okay, esto me parece suficiente como introduccion"</p>`,
        buttons: [
            {
                text: "levantarme",
                require_status: (current) => current.male,
                event: () => { add_record({ 3: ": Damn a newborn kick your ass" }, " :Damn a newborn kick your ass") },
                next_scene: "8m"
            },
            {
                text: "levantarme",
                require_status: (current) => current.female,
                event: () => { add_record({ 3: ": Damn a newborn kick your ass" }, " :Damn a newborn kick your ass") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7h",
        html: `<p>Gracias a mi entrenamiento rápidamente entro en guardia, me paro derecho con mi mano izquierda a mi espalda</p>
        <p>Veo a Zed saltar en el aire, la suerte esta de mi lado, doy un paso adelante y apuñalo con el estoque, atravezando a Zed directamente en el pecho</p>
        <p>mantengo esa posicion hasta que la vida de Zed desaparesca de su cuerpo</p>`,
        buttons: [
            {
                text: "Tomo aliento",
                require_status: (current) => current.male,
                event: () => { add_record({ 2: ": zed's dead" }, "Zed's dead") },
                next_scene: "8m"
            },
            {
                text: "Tomo aliento",
                require_status: (current) => current.female,
                event: () => { add_record({ 2: ": zed's dead" }, "Zed's dead") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7i",
        html: `<p>Gracias a mi entrenamiento rápidamente entro en guardia, me paro derecho con mi mano izquierda a mi espalda</p>
        <p>cuando Zed salta, doy un paso a la derecha para evitarlo, Zed cae en el suelo, y aprobecho el momento en que se levanta para atrabezar su cabeza con mi estoque</p>`,
        buttons: [
            {
                text: "tomar aliento",
                require_status: (current) => current.male,
                event: () => { add_record({ 2: ": Primera sangre" }, " Primera sangre") },
                next_scene: "8m"
            },
            {
                text: "tomar aliento",
                require_status: (current) => current.female,
                event: () => { add_record({ 2: ": Primera sangre" }, " Primera sangre") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7j",
        html: `<p>Gracias a mi entrenamiento rápidamente entro en guardia, esperando el ataque del pequeño golem</p>
        <p>pero me confie, no espere que el golem saltara en el aire, y rapidamente siento el golpe en la cara</p>
        <p>veo estrellas, y el mundo da vueltas</p>
        <p>no se muy bien que esta pasando pero si se lo que mi cuerpo esta sintiendo la golpiza que me esta dando zed</p>
        <p>"Muy bien zed, es suficiente" de repente el abuso se detiene</p>
        <p>"Bueno eso fue... infomativo" me dice mientras admiro el cielo del lugar </p>
        <p>"okay, esto me parece suficiente como introduccion"</p>`,
        buttons: [
            {
                text: "levantarme",
                require_status: (current) => current.male,
                event: () => { add_record({ 3: ": Damn a newborn kick your ass" }, " :Damn a newborn kick your ass") },
                next_scene: "8m"
            },
            {
                text: "levantarme",
                require_status: (current) => current.female,
                event: () => { add_record({ 3: ": Damn a newborn kick your ass" }, " :Damn a newborn kick your ass") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7k",
        html: `<p>Gracias a mi experiencia me preparo para la pelea</p>
        <p>Veo a Zed saltar en el aire, la suerte esta de mi lado, lanzo cuna de mis hachas directamente en su pecho, zed cae de espalda por el impacto</p>
        <p>Zed sigue vivo pero esta atontado, ahora me aprezuro y aplasto su cabeza con mi pie</p>`,
        buttons: [
            {
                text: "Tomo aliento",
                require_status: (current) => current.male,
                event: () => { add_record({ 2: ": zed's dead" }, "Zed's dead") },
                next_scene: "8m"
            },
            {
                text: "Tomo aliento",
                require_status: (current) => current.female,
                event: () => { add_record({ 2: ": zed's dead" }, "Zed's dead") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7l",
        html: `<p>Gracias a mi experiencia me preparo para la pelea</p>
        <p>Veo a Zed saltar en el aire, y lo recibo, bloque su golpe con mi frente, y ataco con mis hachas</p>
        <p>sufri unos meretones pero sali con la victoria de mi lado</p>`,
        buttons: [
            {
                text: "tomar aliento",
                require_status: (current) => current.male,
                event: () => { add_record({ 2: ": Primera sangre" }, " Primera sangre") },
                next_scene: "8m"
            },
            {
                text: "tomar aliento",
                require_status: (current) => current.female,
                event: () => { add_record({ 2: ": Primera sangre" }, " Primera sangre") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "7n",
        html: `<p>Gracias a mi experiencia me preparo para la pelea</p>
        <p>pero me confie, no espere que el golem saltara en el aire, y rapidamente siento el golpe en la cara</p>
        <p>veo estrellas, y el mundo da vueltas</p>
        <p>no se muy bien que esta pasando pero si se lo que mi cuerpo esta sintiendo la golpiza que me esta dando zed</p>
        <p>"Muy bien zed, es suficiente" de repente el abuso se detiene</p>
        <p>"Bueno eso fue... infomativo" me dice mientras admiro el cielo del lugar </p>
        <p>"okay, esto me parece suficiente como introduccion"</p>`,
        buttons: [
            {
                text: "levantarme",
                require_status: (current) => current.male,
                event: () => { add_record({ 3: ": Damn a newborn kick your ass" }, " :Damn a newborn kick your ass") },
                next_scene: "8m"
            },
            {
                text: "levantarme",
                require_status: (current) => current.female,
                event: () => { add_record({ 3: ": Damn a newborn kick your ass" }, " :Damn a newborn kick your ass") },
                next_scene: "8f"
            }
        ]
    },
    {
        id: "8m",
        new_html: `<p>"Okay antes de que te lance a las pruebas queda un último paso" con eso me dio la espalda y empezó a salir de la habitación, empece a seguirlo, cruzamos un pasillo con habitaciones parecidas a la que salimos, el aire aquí es frío y seco, hay un aroma general de madera seca, pensé que tendría más aroma a polvo con la apariencia de este lugar "así que estoy aquí para probar los obstáculos, ¿qué clase de obstáculos son?"</p>
        <p>"Generalmente, serán trampas, enemigos, tal vez algún enigma o acertijo" Vulion responde mientras caminaba con un paso calculado y medido, como alguien que recorre el mismo pasillo de su casa varias veces por día, pero hay algo raro en su movimiento, la forma en que se mueve en línea directa me recuerda a alguien que mantiene control sobre su cuerpo en todo momento</p>
        <p>"Estas pruebas suenan peligrosas, ¿qué pasa si muero en ellas?" " Entonces mueres" eso me hizo detener por un momento. La forma en que me respondió me hace pensar que ha sucedido antes, y no soy el primero en hacer esto</p>
        <p>"Pero no soy ningún héroe o campeón menos que todo un santo" "no te preocupes, no voy a probar a un don nadie. Llegamos"  nos acercamos a una enorme puerta pero dios la abre con mucha facilidad</p>`,
        buttons: [
            {
                text: "Entrar",
                next_scene: "9"
            }
        ]
    },
    {
        id: "8m",
        new_html: `<p>"Okay antes de que te lance a las pruebas queda un último paso" con eso me dio la espalda y empezó a salir de la habitación, empece a seguirlo, cruzamos un pasillo con habitaciones parecidas a la que salimos, el aire aquí es frío y seco, hay un aroma general de madera seca, pensé que tendría más aroma a polvo con la apariencia de este lugar "así que estoy aquí para probar los obstáculos, ¿qué clase de obstáculos son?"</p>
        <p>"generalmente, serán trampas, enemigos, tal vez algún enigma o acertijo" Vulion responde mientras caminaba con un paso calculado y medido, como alguien que recorre el mismo pasillo de su casa varias veces por día, pero hay algo raro en su movimiento, la forma en que se mueve en línea directa me recuerda a alguien que mantiene control sobre su cuerpo en todo momento</p>
        <p>"Estas pruebas suenan peligrosas, ¿qué pasa si muero en ellas?" ", entonces mueres" eso me hizo detener por un momento. La forma en que me respondió me hace pensar que ha sucedido antes, y no soy la primera en hacer esto</p>
        <p>"Pero no soy ninguna heroína o campeona menos que todo una santa" "no te preocupes, no voy a probar a un don nadie. Llegamos"  nos acercamos a una enorme puerta pero dios la habré con mucha facilidad</p>`,
        buttons: [
            {
                text: "Entrar",
                next_scene: "9"
            }
        ]
    },
    {
        id:"9",
        new_html: `<p>Entramos a una habitación circular con el símbolo del panteón de Oshera en el medio y varias estatuas apuntando en el centro, Vulion se apoya espalda contra una pared al lado de la puerta por donde entramos, y hace una moción para que continúe caminando, así que eso hago una vez parado en el centro me doy cuenta, las estatuas representan a los dioses de Oshera o por lo menos los dioses vivientes del panteón</p>
        <p>Miro a Vulion para descifrar que se supone que tengo que hacer aquí "Cada una de estas estatuas tienen un talismán cada uno de ellos permiten a alguien convertirse en un santo." él saca un cilindro de su túnica y lo pone en su boca, de repente genera fuego y quema un extremo del cilindro, me pregunto que será eso "elige un talismán, te dará la bendición del dios o diosa correspondiente y te ayudara a completar las pruebas diseñadas para santos"</p>
        <p>Dirijo mi mirada a las estatuas, y me acerco a...</p>`,
        buttons: [
            {
                text: "Una hermosa mujer con una espada",
                next_scene: "9a"
            },
            {
                text: "Un guerrero armado apuntado al cielo",
                next_scene: "9b"
            },
            {
                text: "Una bruja sentada con cuernos en sus ojos",
                next_scene: "9c"
            }
        ]
    },
    {
        id: "9a",
        html: `<p>Es la estatua de la cabeza del panteón, Aena, La conservadora de Civilización, Diosa del Gobierno</p>
        <p>Elegante y hermosa son las palabras que vienen a la mente al verla, un vestido decorado con espalda descubierta que enfatiza su figura y sus manos reposando en la cruz de una espada que apuntan hacia al suelo, a pesar que es la líder del panteón más fuerte de Gaia es sorprendentemente normal en comparación a los otros dioses</p>
        <p>En el mango de la espada cuelga el talismán</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "9"
            },
            {
                text: "tomar el talisman de Aena",
                add_status: {Aena_blessing: true},
                next_scene: "10"
            }
        ]
    },
    {
        id: "9b",
        html: `<p>El protector de la humanidad, Cenir, El guerrero de Cristal, Dios de la Justicia y el Orden</p>
        <p>Con una mano abierta y la otra apuntando su espada al cielo, al cielo, su cuerpo cubierto con una armadura de cristal que no exagera su físico, es la imagen perfecta de un paladín, en su cara una cálida sonrisa que asegura que todo estará bien</p>
        <p>En su mano abierta está el talismán</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "9"
            },
            {
                text: "tomar el talisman de Cenir",
                add_status: {Cenir_blessing: true},
                next_scene: "10"
            }
        ]
    },
    {
        id: "9c",
        html: `<p>La oveja negra del panteón, su nombre perdido en el tiempo, solo reconocida como la bruja cornuda y Diosa de la Calamidad</p>
        <p>Sentada en una manera muy femenina y conservadora, cuerpo delgado y como anormalidad entre las diosas unos pechos modesta, sus ojos remplazados por dos cuernos que curvan hacia el techo, pasando por su sombrero puntiagudo, un vestido sin mangas simple de lo que parece ser seda y unos tacos simples</p>
        <p>En uno de sus cuernos está el talismán colgando</p>`,
        buttons: [
            {
                text: "volver",
                next_scene: "9"
            },
            {
                text: "tomar el talisman de Cenir",
                add_status: {witch_blessing: true},
                next_scene: "10"
            }
        ]
    },
    {
        id: "10",
        html: `<p>"Muy bien, con ese talismán eres efectivamente un santo, sígueme, es hora de empezar"</p>`,
        buttons: [
            {
                text: "Seguirlo",
                next_scene: "End"
            }
        ]
    },

];