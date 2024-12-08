const key = "29be909876cd066890475beb3f70fd2f";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Inicialização do Firebase com a versão 8
const firebaseConfig = {
    apiKey: "AIzaSyCPCYjmA-LK5ruhzeXiacgiWJAznlwDiD4",
    authDomain: "mefs-336a1.firebaseapp.com",
    databaseURL: "https://mefs-336a1-default-rtdb.firebaseio.com/",
    projectId: "mefs-336a1",
    storageBucket: "mefs-336a1.appspot.com",
    messagingSenderId: "",
};

firebase.initializeApp(firebaseConfig);


// Acesso ao banco de dados usando a versão 8
const database = firebase.database();  // Método para acessar o banco de dados na versão 8
// Referências para os dados no Firebase
const gasRef = database.ref('dados/gas');  // Referência do banco de dados
const humRef = database.ref('dados/humidade');  // Referência do banco de dados
const uvRef = database.ref('dados/indice_uv');  // Referência do banco de dados
const irRef = database.ref('dados/luz_ir');  // Referência do banco de dados
const luzRef = database.ref('dados/luz_visivel');  // Referência do banco de dados
const aguaRef = database.ref('dados/nivel_agua');  // Referência do banco de dados
const pressaoRef = database.ref('dados/pressao');  // Referência do banco de dados
const temperaturaRef = database.ref('dados/temperatura');  // Referência do banco de dados
const velocidadeVentoRef=database.ref('dados/vento');  // Referência do banco de dados  
const estado_do_botaoRef=database.ref('dados/botao');  // Referência do banco de dados
const cargaRef=database.ref('dados/carga'); // Referência do banco de dados
const estado_do_releRef=database.ref('dados/estado_rele');  // Referência do banco de dados
// Função para enviar dados ao Firebase
let carga_bateria=0;
function botao_rele() {
 if(estado_botao0==0) {
    estado_botao0=1;
    enviarDadosFirebase(estado_botao0);
 }else if(estado_botao0==1){
    estado_botao0=0;
    enviarDadosFirebase(estado_botao0);
 }
}

function enviarDadosFirebase(Estado_botao) {
    // Enviando o estado do botão
    estado_do_botaoRef.set(Estado_botao)
        .then(() => {
            console.log("Estado do botão atualizado com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao atualizar estado do botão:", error);
        });
        velocidadeVentoRef.set(vento)
        .then(() => {
            console.log("Estado do botão atualizado com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao atualizar estado do botão:", error);
        });
}
function enviarDadosFirebase_Vento(vento) {
    velocidadeVentoRef.set(vento)
        .then(() => {
            console.log("Estado do botão atualizado com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao atualizar estado do botão:", error);
        });
}

let estado_botao0=0;
let estado_rele0=0;
// Função para ler dados do Firebase
function lerDadosFirebase() {
    // Leitura dos dados de temperatura
    temperaturaRef.on('value', (snapshot) => {
        const dadosTemperatura = snapshot.val();
        let temperatura_string = String(dadosTemperatura);
        document.querySelector(".tempo2").innerHTML = 'Temperatura: ' + temperatura_string+`C`;
    

    }, (error) => {
        console.error("Erro ao obter dados de temperatura:", error);
    });

    // Leitura dos dados de gas
    gasRef.on('value', (snapshot) => {
        const dadosGas = snapshot.val();
        gas_iaq=dadosGas;
        let gas_string = String(dadosGas);
        console.log("Dados de gas atualizados:", dadosGas);
        document.querySelector(".gas2").innerHTML ='Gas: ' + gas_string ;
    }, (error) => {
        console.error("Erro ao obter dados de gás:", error);
    });

    // Leitura dos dados de humidade
    humRef.on('value', (snapshot) => {
        const dadosHumidade = snapshot.val();
        let humidade_string = String(dadosHumidade);
        document.querySelector(".humidade2").innerHTML = 'Humidade '+humidade_string+`%`;
    }, (error) => {
        console.error("Erro ao obter dados de humidade:", error);
    });

    // Leitura dos dados de índice UV
    uvRef.on('value', (snapshot) => {
        const dadosIndiceUV = snapshot.val();
        let UV_string = String(dadosIndiceUV);
        document.querySelector(".UV2").innerHTML = 'UV: ' + UV_string;
    }, (error) => {
        console.error("Erro ao obter dados de índice UV:", error);
    });

    // Leitura dos dados de luz infravermelha
    irRef.on('value', (snapshot) => {
        const dadosLuzIR = snapshot.val();
        let IR_string = String(dadosLuzIR);
        document.querySelector(".LUZIR2").innerHTML ='IR: '+ IR_string +'lm';
    }, (error) => {
        console.error("Erro ao obter dados de luz IR:", error);
    });

    // Leitura dos dados de luz visível
    luzRef.on('value', (snapshot) => {
        const dadosLuzVisivel = snapshot.val();
        let LUZ_string = String(dadosLuzVisivel);
        document.querySelector(".LUZ2").innerHTML ='Luz_Visivel: '  + LUZ_string +'lm';
    }, (error) => {
        console.error("Erro ao obter dados de luz visível:", error);
    });

    // Leitura dos dados de nível de água
    aguaRef.on('value', (snapshot) => {
        const dadosNivelAgua = snapshot.val();
        let AG_string = String(dadosNivelAgua);
        document.querySelector(".agua2").innerHTML ='Agua: '+ AG_string;
    }, (error) => {
        console.error("Erro ao obter dados de nível de água:", error);
    });

    // Leitura dos dados de pressão
    pressaoRef.on('value', (snapshot) => {
        const dadosPressao = snapshot.val();
        let PRES_string = String(dadosPressao);
        document.querySelector(".pressao2").innerHTML = 'Pressão: ' + PRES_string +'kPa';
    }, (error) => {
        console.error("Erro ao obter dados de pressão:", error);
    });
    
    //Leitura dos dados da velocidade do vento
    velocidadeVentoRef.on('value', (snapshot) => {
        const dadosVelocidadeVento = snapshot.val();
        let VELOCIDADE_string = String(dadosVelocidadeVento);
        document.querySelector(".velocidadeVento2").innerHTML = 'Velocidade do Vento: ' + VELOCIDADE_string +'km/h';
    }, (error) => {
        console.error("Erro ao obter dados da velocidade do vento:", error);
    });

    estado_do_botaoRef.on('value', (snapshot) => {
        estado_botao0 = snapshot.val();

    }, (error) => {
        console.error("Erro ao obter dados do botão:", error);
    });

    estado_do_releRef.on('value', (snapshot) => {
        estado_rele0 = snapshot.val();
        atualizar_estado_rele(estado_rele0);

    }, (error) => {
        console.error("Erro ao obter dados do botão:", error);
    });






    cargaRef.on('value', (snapshot) => {
        carga_bateria = snapshot.val();
        escolher_Carga_da_Bateria(carga_bateria);


    }, (error) => {
        console.error("Erro ao obter dados do carga:", error);
    });


}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Função para inicializar a página
function iniciarPagina() {
    const iniciarLayout = document.getElementById('iniciar');
    const loginLayout = document.getElementById('login-layout');

    // Mostra o layout inicial e esconde o login
    iniciarLayout.style.display = 'block';
    loginLayout.style.display = 'none';

    console.log("Executando funções enquanto o layout inicial está carregando...");

    // Executa as funções imediatamente
    const cidade = "Coimbra";
    buscarCidade(cidade); // Função para buscar a cidade
    atualizarDataHora(); // Atualiza a data e hora
    lerDadosFirebase(); // Lê dados do Firebase
    exibirLayoutInicial(); // Exibe o layout inicial
    atualizarPrevisoes(); // Atualiza as previsões

    // Aguarda 30 segundos antes de trocar o layout
}




function abrir_menu_main(){
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'block';
    document.getElementById('Previsao-Layout').style.display = 'none';
    document.getElementById('Menu-Layout').style.display = 'block';
    document.getElementById('Carga_Bateria-Layout').style.display = 'none';
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'none';


}
function abrir_menu_previsao(){
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('Previsao-Layout').style.display = 'block';
    document.getElementById('Menu-Layout').style.display = 'block';
    document.getElementById('Carga_Bateria-Layout').style.display = 'none';
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'none';


}


function abrir_menu_carga(){
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('Previsao-Layout').style.display = 'none';
    document.getElementById('Menu-Layout').style.display = 'block';
    document.getElementById('Carga_Bateria-Layout').style.display = 'block';
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'none';


}

function button_close(){
 
    document.getElementById('Menu-Layout').style.display = 'none';
    
}

function button_Home(){
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'block';
    document.getElementById('Previsao-Layout').style.display = 'none';
    document.getElementById('Menu-Layout').style.display = 'none';
    document.getElementById('Carga_Bateria-Layout').style.display = 'none';
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'none';
    
}

function button_CargaDaBateria(){
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('Previsao-Layout').style.display = 'none';
    document.getElementById('Menu-Layout').style.display = 'none';
    document.getElementById('Carga_Bateria-Layout').style.display = 'block';
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'none';
    
}

function button_definicoes(){
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('Previsao-Layout').style.display = 'none';
    document.getElementById('Menu-Layout').style.display = 'none';
    document.getElementById('Carga_Bateria-Layout').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'block';
    document.getElementById('iniciar').style.display = 'none';
}
function button_deslogar(){
    document.getElementById('login-layout').style.display = 'block';
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('Previsao-Layout').style.display = 'none';
    document.getElementById('Menu-Layout').style.display = 'none';
    document.getElementById('Carga_Bateria-Layout').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'none'
    document.getElementById('iniciar').style.display = 'none';
}




function abrir_menu_rele(){
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('Previsao-Layout').style.display = 'none';
    document.getElementById('Menu-Layout').style.display = 'block';
    document.getElementById('Carga_Bateria-Layout').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'block';
    document.getElementById('iniciar').style.display = 'none';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let temperaturaMax = 0;
let temperaturaMin = 0;
let humidadeMax = 0;
let humidadeMin = 0;
let densidade = 0;

function colocarDadosNaTela(dados0, dados1, dados2, dados3,dados4) {
    // Acessando o índice UV da hora atual (ou de outra hora específica)
    const horaAtual = new Date().getHours(); // Obtém a hora atual (0-23)
    const indiceUV = dados0.hourly.uv_index[horaAtual]; // Obtém o índice UV da hora atual
    const indice_iaq = dados3.hourly.european_aqi[horaAtual];
    const weather_code = dados1.hourly.weather_code[horaAtual];
    let dia_noite = dados4.current.is_day;
    avaliar_condicoes_atuais(weather_code,dia_noite);
    document.querySelector(".iaq_valor").innerHTML = "IAQ: " + indice_iaq;
    document.querySelector(".indice-uv").innerHTML = "Índice UV: " + indiceUV;

    // Exibindo a temperatura atual
    const temperaturaAtual = dados1.hourly.temperature_2m[horaAtual];
    document.querySelector(".tempo").innerHTML = "Temperatura: " + temperaturaAtual + "°C";

    // Exibindo a umidade relativa atual
    const umidadeAtual = dados1.hourly.relative_humidity_2m[horaAtual];
    document.querySelector(".humidade").innerHTML = "Humidade: " + umidadeAtual + "%";

    // Calculando o máximo e o mínimo da umidade
    const tabela_umidade = dados1.hourly.relative_humidity_2m;
    humidadeMax = Math.max(...tabela_umidade);
    humidadeMin = Math.min(...tabela_umidade);

    // Exibindo a pressão atmosférica
    let pressao_atmosferica = dados1.hourly.surface_pressure[horaAtual] / 10; // Em hPa
    pressao_atmosferica = pressao_atmosferica.toFixed(2); // Limita a 2 casas decimais
    document.querySelector(".pressao_atm").innerHTML = "Pressão atmosférica: " + pressao_atmosferica + " kPa";

    // Exibindo a chuva
    const chuva = dados1.hourly.rain[horaAtual];
    document.querySelector(".chuva").innerHTML = "Chuva: " + chuva;

    // Exibindo a velocidade do vento
    const intensidade_vento = dados1.hourly.wind_speed_10m[horaAtual];
    enviarDadosFirebase_Vento(intensidade_vento );
    document.querySelector(".int_vento").innerHTML = "Velocidade do vento: " + intensidade_vento + " km/h";

    // Exibindo a direção do vento
    const angulo_vento = dados1.hourly.wind_direction_10m[horaAtual];
    document.querySelector(".ang_vento").innerHTML = "Direção do vento: " + angulo_vento + "°";

    // Temperaturas máximas e mínimas
    temperaturaMax = dados2.daily.temperature_2m_max[0];
    temperaturaMin = dados2.daily.temperature_2m_min[0];
    
    // Calculando a densidade do ar
    densidade = (pressao_atmosferica * 1000) / (287.05 * (temperaturaAtual + 273.15)); // Temperatura em Kelvin
}

let condicoes_atuais;

function avaliar_condicoes_atuais(weather_code,dia_noite) {
    if (weather_code == 0) {
        condicoes_atuais = "Céu Limpo"; // Céu limpo
    } else if (weather_code == 1) {
        condicoes_atuais = "Parcialmente claro"; // Principalmente claro
    } else if (weather_code == 2) {
        condicoes_atuais = "Parcialmente nublado"; // Parcialmente nublado
    } else if (weather_code == 3) {
        condicoes_atuais = "Nublado"; // Nublado
    } else if (weather_code == 45) {
        condicoes_atuais = "Nevoeiro"; // Neblina
    } else if (weather_code == 48) {
        condicoes_atuais = "Nevoeiro Gelado"; // Névoa de gelo
    } else if (weather_code == 51) {
        condicoes_atuais = "Chuvisco fraco"; // Chuva fraca
    } else if (weather_code == 53) {
        condicoes_atuais = "Chuvisco moderado"; // Chuva moderada
    } else if (weather_code == 55) {
        condicoes_atuais = "Chuvisco denso"; // Chuva densa
    } else if (weather_code == 61) {
        condicoes_atuais = "Chuva fraca"; // Chuva leve
    } else if (weather_code == 63) {
        condicoes_atuais = "Chuva moderada"; // Chuva moderada
    } else if (weather_code == 65) {
        condicoes_atuais = "Chuva forte"; // Chuva forte
    } else if (weather_code == 66) {
        condicoes_atuais = "Granizo fraco"; // Chuvas
    } else if (weather_code == 67) {
        condicoes_atuais = "Granizo forte"; // Trovoada
    } else if (weather_code == 71) {
        condicoes_atuais = "Queda de neve fraca"; 
    } else if (weather_code == 73) {
        condicoes_atuais = "Queda de neve moderada"; 
    } else if (weather_code == 75) {
        condicoes_atuais = "Queda de neve forte"; 
    } else if (weather_code == 77) {
        condicoes_atuais = "Grãos de neve"; 
    } else if (weather_code == 80) {
        condicoes_atuais = "Aguaceiros ligeiros"; 
    } else if (weather_code == 81) {
        condicoes_atuais = "Aguaceiros moderados"; 
    } else if (weather_code == 82) {
        condicoes_atuais = "Aguaceiros fortes";
    } else if (weather_code == 85) {
        condicoes_atuais = "Aguaceiros de neve fracos"; 
    } else if (weather_code == 86) {
        condicoes_atuais = "Aguaceiros de neve fortes";
    } else if (weather_code == 95) {
        condicoes_atuais = "Trovoada fraca ou moderada";  
    } else if (weather_code == 96) {
    condicoes_atuais = "Trovoada com granizo fraco";
    } else if (weather_code == 99) {
    condicoes_atuais = "Trovoada com granizo forte";
    } else {
        condicoes_atuais = "Unknown"; // Desconhecido, caso o código não seja reconhecido
    }
    document.querySelector(".valor_c_atuais").innerHTML = "Condição atual: " + condicoes_atuais;
    condicoes_atuais_imagem(condicoes_atuais,dia_noite);
}

function condicoes_atuais_imagem(condicoes_atuais,dia_noite){
    if(dia_noite==1){
        if(condicoes_atuais=="Céu Limpo"){
            condicao_tempo="sunny-Ceu_Limpo";
        }
        else if(condicoes_atuais=="Parcialmente claro" || condicoes_atuais=="Parcialmente nublado" || condicoes_atuais=="Nublado"){
            condicao_tempo="sunny-Nublado";
        }
        else if(condicoes_atuais=="Nevoeiro" || condicoes_atuais=="Nevoeiro Gelado"){
            condicao_tempo="sunny-Nevoeiro";
        }
        else if(condicoes_atuais=="Chuvisco fraco" || condicoes_atuais=="Chuvisco moderado" || condicoes_atuais=="Chuvisco denso" || condicoes_atuais=="Chuva fraca" || condicoes_atuais=="Chuva moderada" || condicoes_atuais=="Chuva forte" || condicoes_atuais=="Aguaceiros ligeiros" || condicoes_atuais=="Aguaceiros moderados" || condicoes_atuais=="Aguaceiros fortes"){
        condicao_tempo="sunny-Chuva";
        }
        else if(condicoes_atuais=="Granizo fraco" || condicoes_atuais=="Granizo forte"){
            condicao_tempo="sunny-Granizo";
        }
        else if(condicoes_atuais=="Queda de neve fraca" || condicoes_atuais=="Queda de neve moderada" || condicoes_atuais=="Queda de neve forte" || condicoes_atuais=="Grãos de neve" || condicoes_atuais=="Aguaceiros de neve fracos" || condicoes_atuais=="Aguaceiros de neve fortes"){
            condicao_tempo="sunny-Neve";
        }
        else if(condicoes_atuais=="Trovoada fraca ou moderada" || condicoes_atuais=="Aguaceiros moderados" || condicoes_atuais=="Aguaceiros fortes"){
            condicao_tempo="sunny-Trovoada";
        }
        else if(condicoes_atuais=="Trovoada com granizo fraco" || condicoes_atuais=="Trovoada com granizo forte"){
            condicao_tempo="sunny-Trovoada_Granizo";
        }
    }else if(dia_noite==0){
        if(condicoes_atuais=="Céu Limpo"){
            condicao_tempo="night-Ceu_Limpo";
        }
        else if(condicoes_atuais=="Parcialmente claro" || condicoes_atuais=="Parcialmente nublado" || condicoes_atuais=="Nublado"){
            condicao_tempo="night-Nublado";
        }
        else if(condicoes_atuais=="Nevoeiro" || condicoes_atuais=="Nevoeiro Gelado"){
            condicao_tempo="night-Nevoeiro";
        }
        else if(condicoes_atuais=="Chuvisco fraco" || condicoes_atuais=="Chuvisco moderado" || condicoes_atuais=="Chuvisco denso" || condicoes_atuais=="Chuva fraca" || condicoes_atuais=="Chuva moderada" || condicoes_atuais=="Chuva forte" || condicoes_atuais=="Aguaceiros ligeiros" || condicoes_atuais=="Aguaceiros moderados" || condicoes_atuais=="Aguaceiros fortes"){
        condicao_tempo="night-Chuva";
        }
        else if(condicoes_atuais=="Granizo fraco" || condicoes_atuais=="Granizo forte"){
            condicao_tempo="night-Granizo";
        }
        else if(condicoes_atuais=="Queda de neve fraca" || condicoes_atuais=="Queda de neve moderada" || condicoes_atuais=="Queda de neve forte" || condicoes_atuais=="Grãos de neve" || condicoes_atuais=="Aguaceiros de neve fracos" || condicoes_atuais=="Aguaceiros de neve fortes"){
            condicao_tempo="night-Neve";
        }
        else if(condicoes_atuais=="Trovoada fraca ou moderada" || condicoes_atuais=="Aguaceiros moderados" || condicoes_atuais=="Aguaceiros fortes"){
            condicao_tempo="night-Trovoada";
        }
        else if(condicoes_atuais=="Trovoada com granizo fraco" || condicoes_atuais=="Trovoada com granizo forte"){
            condicao_tempo="night-Trovoada_Granizo";
        }
    }
    alterarImagemFundo(condicao_tempo);

}




 




async function buscarCidade() {
    try {
        const url0 = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=40.2115&longitude=-8.4292&hourly=uv_index,uv_index_clear_sky`;
        const url1 = `https://api.open-meteo.com/v1/forecast?latitude=40.2115&longitude=-8.4292&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,rain,weather_code,surface_pressure,visibility,wind_speed_10m,wind_direction_10m`;
        const url2 = `https://api.open-meteo.com/v1/forecast?latitude=40.20564&longitude=-8.41955&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=GMT`;
        const url3 = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=40.2115&longitude=-8.4292&hourly=european_aqi&timezone=GMT`;
        const url4 = `https://api.open-meteo.com/v1/forecast?latitude=40.2115&longitude=-8.4292&current=is_day`;
        const dados0 = await fetch(url0).then(resposta => resposta.json());
        const dados1 = await fetch(url1).then(resposta => resposta.json());
        const dados2 = await fetch(url2).then(resposta => resposta.json());
        const dados3 = await fetch(url3).then(resposta => resposta.json());
        const dados4 = await fetch(url4).then(resposta => resposta.json());

        // Verifica se a resposta contém dados válidos
        if (dados0 && dados1 && dados0.hourly && dados1.hourly && dados2 && dados2.daily && dados3 && dados3.hourly&& dados4) {
            colocarDadosNaTela(dados0, dados1, dados2, dados3,dados4); // Passando os dados de ambas as APIs
        } else {
            console.error("Erro ao obter dados", dados0);
            console.error("Erro ao obter dados", dados1);
            console.error("Erro ao obter dados", dados2);
            console.error("Erro ao obter dados", dados3);
            console.error("Erro ao obter dados", dados4);
        }
    } catch (error) {
        console.error("Erro ao buscar dados da cidade:", error);
    }
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cliquei_botao() {
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function atualizarDataHora() {
    function atualizar() {
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');

        const dataHoraFormatada = `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
        document.querySelector(".data-hora").innerHTML = dataHoraFormatada;
    }

    atualizar();
    setInterval(atualizar, 60000); // Atualiza a cada minuto
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function login() {
    let username = document.querySelector('.utlizador').value;
    let password = document.querySelector('.password').value;

    if (username === "admin" && password === "admin") {
        document.getElementById('login-layout').style.display = 'none';
        document.getElementById('main-layout').style.display = 'block';
        document.getElementById('Previsao-Layout').style.display = 'none';
        document.getElementById('Menu-Layout').style.display = 'none';
        document.getElementById('Carga_Bateria-Layout').style.display = 'none';
        document.getElementById('Rele-Layout').style.display = 'none';
        document.getElementById('iniciar').style.display = 'none';
        document.querySelector('.password').value="";
        document.querySelector('.utlizador').value="";

    } else {
        alert('Usuário ou senha incorretos!');
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Função para exibir o layout de previsão
function button_previsao() {
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('Previsao-Layout').style.display = 'block';
    document.getElementById('Menu-Layout').style.display = 'none';
    document.getElementById('Carga_Bateria-Layout').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'none';
    document.getElementById('iniciar').style.display = 'none';
    
}

function button_return() {
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'block';
    document.getElementById('Previsao-Layout').style.display = 'none';
}

// Exibir layout inicial
function exibirLayoutInicial() {
    document.getElementById('iniciar').style.display = 'block';
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('Previsao-Layout').style.display = 'none';
    document.getElementById('Menu-Layout').style.display = 'none';
    document.getElementById('Carga_Bateria-Layout').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'none';
    
    setTimeout(exibirLayoutLogin, 15000);
}

// Exibir layout de login
function exibirLayoutLogin() {
    console.log('exibirLayoutLogin chamada em:', new Date().toLocaleTimeString());
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('login-layout').style.display = 'block';
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('Previsao-Layout').style.display = 'none';
    document.getElementById('Menu-Layout').style.display = 'none';
    document.getElementById('Carga_Bateria-Layout').style.display = 'none';
    document.getElementById('Rele-Layout').style.display = 'none';
}

// Função para ler dados do Firebase
function lerDadosFirebase2() {
    return new Promise((resolve, reject) => {
        const dados = {};
        const promises = [
            temperaturaRef.once('value').then(snapshot => dados.temperatura = snapshot.val()),
            gasRef.once('value').then(snapshot => dados.gas = snapshot.val()),
            humRef.once('value').then(snapshot => dados.humidade = snapshot.val()),
            uvRef.once('value').then(snapshot => dados.indiceUV = snapshot.val()),
            velocidadeVentoRef.once('value').then(snapshot => dados.vento = snapshot.val()),
        ];

        Promise.all(promises)
            .then(() => resolve(dados))
            .catch(reject);
    });
}
// Variáveis globais
const area = 0.04485;
const rendimento = 11.14 / 100;
const areaturbinas=Math.PI*Math.pow(0.85,2);
const rendimento2=35/100;
let dadosHistoricos = { temperatura: [], humidade: [], indiceUV: [], vento: [],gas: []};
const diasMediaMovel = 3;
let cont3 = 0;
let cont5 = 0;
let gas_iaq = 0;
let iaq=0;
const R_clean = 500.0; // Resistência típica em ar limpo (em kOhms, ajustar conforme o ambiente)
const R_polluted = 20.0; // Resistência típica em ar poluído (em kOhms, ajustar conforme o ambiente)
// Função para calcular média
function calcularMedia(valores) {
    return valores.reduce((acc, val) => acc + val, 0) / valores.length;
}







function calcular_iaq(valor_gas){
    let IAQ = 500.0 * (R_clean - valor_gas) / (R_clean - R_polluted);
    IAQ = (Math.max(0, Math.min(IAQ, 500))); // Garantir que fique no intervalo 0-500
    IAQ=500-IAQ;
    return IAQ;
}

// Função para calcular média móvel
function calcularMediaMovel(valores, n) {
    if (valores.length < n) return 0;
    return calcularMedia(valores.slice(-n));
}


// Função para calcular tendência
function calcularAmplitudeTemperatura() {
    let AmplitudeTemperatura=temperaturaMax-temperaturaMin;
    return AmplitudeTemperatura;

}
function calcularAmplitudeHumidade() {
    let AmplitudeHumidade=humidadeMax-humidadeMin;
    return AmplitudeHumidade;
}
// Previsão de geração solar
function preverGeracaoSolar(mediaIndiceUV) {
    return mediaIndiceUV * area * rendimento  *125;
}
function preverGeracaoEolica(mediavelocidadevento){
    return 0.5*Math.pow(mediavelocidadevento,3) * densidade * areaturbinas*rendimento2 ;

}

// Atualizar previsões com dados do Firebase
async function atualizarPrevisoes() {
    if (cont3 === 1) {
        // Redefine a tabela (objeto) com arrays vazios
        dadosHistoricos = { 
            temperatura: [], 
            humidade: [], 
            indiceUV: [],
            vento: [],  
            gas:[]
        };
        cont3=0;
        console.log("Tabela resetada!");
    }
    
    try {
        const dados = await lerDadosFirebase2();
        console.log("Dados recebidos do Firebase:", dados);

        if (!dados || Object.keys(dados).length === 0) {
            console.log("Nenhum dado para análise.");
            return;
        }
        if(cont3==0)
        // Atualiza o histórico
        dadosHistoricos.temperatura.push(dados.temperatura);
        dadosHistoricos.humidade.push(dados.humidade);
        dadosHistoricos.indiceUV.push(dados.indiceUV);
        dadosHistoricos.vento.push(dados.vento);
        dadosHistoricos.gas.push(dados.gas);
    
        // Atualiza a interface
        if(cont5==0){
        iaq=calcular_iaq(dadosHistoricos.gas);
        document.querySelector(".iaq_valor2").innerHTML = "IAQ: " + iaq.toFixed(2);
        cont5++;
        }

        // Calcula médias e tendências
        if (dadosHistoricos.temperatura.length >= diasMediaMovel) {
            const mediaTemp = calcularMediaMovel(dadosHistoricos.temperatura, diasMediaMovel);
            const mediaUmidade = calcularMediaMovel(dadosHistoricos.humidade, diasMediaMovel);
            const mediaUV = calcularMediaMovel(dadosHistoricos.indiceUV, diasMediaMovel);
            const media_vento = calcularMediaMovel(dadosHistoricos.vento, diasMediaMovel);
            const tendenciaTemp = calcularAmplitudeTemperatura();
            const tendenciaUmidade = calcularAmplitudeHumidade();
            const previsaoGeracaoSolar = preverGeracaoSolar(mediaUV);
            const previsaoGeracaoEolica = preverGeracaoEolica(media_vento);
            previsao_6horas(tendenciaTemp, tendenciaUmidade, mediaTemp, mediaUmidade);

            cont3++;
            // Atualiza previsões na interface 
            document.querySelector(".PrevES").innerHTML = 
                `Previsão Energia Solar: ${previsaoGeracaoSolar.toFixed(2)} Wh`;
            document.querySelector(".PrevEE").innerHTML = 
                `Previsão Energia Eolica: ${previsaoGeracaoEolica.toFixed(2)} Wh`;
        } else {
            console.log("Aguardando mais dados para calcular a média móvel.");
        }
    } catch (error) {
        console.error("Erro ao prever dados:", error);
    }
}

// Funções de previsão para próximas horas
const horarioPico = 14;

function preverTemperatura(hora, Tm, A, hp) {
    return Tm + A * Math.cos(((2 * Math.PI) / 24) * (hora - hp));
}

function preverHumidade(hora, Um, B, hp) {
    return Um - B * Math.cos(((2 * Math.PI) / 24) * (hora - hp));
}

// Variáveis médias e tendências
function previsao_6horas(tendenciaTemp, tendenciaUmidade, mediaTemp, mediaUmidade) {
    const data = new Date(); // Momento atual
    const horas = data.getHours();

    let previsaoTemperatura = [];
    let previsaoHumidade = [];

    for (let i = 1; i <= 6; i++) {
        const horaPrevista = (horas + i) % 24;
        previsaoTemperatura.push(preverTemperatura(horaPrevista, mediaTemp, tendenciaTemp, horarioPico));
        previsaoHumidade.push(preverHumidade(horaPrevista, mediaUmidade, tendenciaUmidade, horarioPico));
    }

    // Log de previsões
    previsaoTemperatura.forEach((temp, index) => {
        const horaPrevista = (horas + index + 1) % 24; // Ajusta as horas para o formato de 0-23
        
        console.log(`Temperatura prevista para ${horaPrevista}: ${temp.toFixed(2)}°C`);
        
        // Corrigindo o seletor do documento
        document.querySelector(`.PrevTemp${index}`).innerHTML = `Temperatura ${horaPrevista}:00 -> ${temp.toFixed(2)}°C`;
    });

    previsaoHumidade.forEach((hum, index) => {
        const horaPrevista = (horas + index + 1) % 24; // Ajusta as horas para o formato de 0-23
        console.log(`Humidade prevista para ${horaPrevista}: ${hum.toFixed(2)}%`);
        
        // Corrigindo o seletor do documento
        document.querySelector(`.PrevHum${index}`).innerHTML = `Humidade ${horaPrevista}:00 -> ${hum.toFixed(2)}%`;
    });
}
setInterval(() => {
    if (estado_rele0 == 1) {
        atualizarPrevisoes();
    }
}, 5000);



function alterarImagemFundo(condicao) {
    var imagemFundo = '';

    // Condições climáticas e as imagens correspondentes
    if (condicao === 'sunny-Ceu_Limpo') {
        imagemFundo = "url('http://4.bp.blogspot.com/-u9rUFvjzXCs/VO4Qe4EZJUI/AAAAAAAAAQc/YceD_lpmeq0/s1600/181179_Papel-de-Parede-Ceu-Limpo--181179_1600x1200.jpg')";
    } else if (condicao === 'sunny-Nublado') {
        imagemFundo = "url('https://c.wallhere.com/photos/85/26/uk_sky_weather_clouds_nikon_day_skies_cloudy-1125162.jpg!d')";
    } else if (condicao === 'sunny-Nevoeiro') {
        imagemFundo = "url('https://1.bp.blogspot.com/-YjuNWhUgofk/XvrZMJUv6ZI/AAAAAAAAzZU/-mRW7HjV24EP6ftHsJKYa5tMGPQKOfEFACLcBGAsYHQ/s2560/forest_fog_trees_166954_3840x2160.jpg')";
    } else if (condicao === 'sunny-Chuva') {
        imagemFundo = "url('https://cafetorah.com/wp-content/uploads/2018/09/chuva.jpg')";
    } else if (condicao === 'sunny-Granizo') {
        imagemFundo = "url('http://3.bp.blogspot.com/-fR6VCa0jDm0/VKMrzpyodJI/AAAAAAAAKxA/e_WmVwmBNCY/s1600/Granizo.-UGN.jpg')";
    } else if (condicao === 'sunny-Neve') {
        imagemFundo = "url('https://c.wallhere.com/photos/87/27/winter_snow_nature_landscape-69243.jpg!d')";
    } else if (condicao === 'sunny-Trovoada') {
        imagemFundo = "url('https://services.meteored.com/img/article/tempo-esta-semana-sera-de-chuva-abundante-nevoeiro-e-trovoada-214681-1_1280.jpg')";
    } else if (condicao === 'sunny-Trovoada_Granizo') {
        imagemFundo = "url('https://services.meteored.com/img/article/tempo-esta-semana-sera-de-chuva-abundante-nevoeiro-e-trovoada-214681-1_1280.jpg')";
    } else if (condicao === 'night-Ceu_Limpo') {
        imagemFundo = "url('http://www.webventure.com.br/wp-content/uploads/2017/02/Diego.jpg')";
    } else if (condicao === 'night-Nublado') {
        imagemFundo = "url('https://media.istockphoto.com/id/1492721937/pt/foto/black-blue-night-sky-with-clouds-dark-dramatic-sky-background-storm-rain-frightening-ominous.jpg?s=612x612&w=0&k=20&c=mt_Seg9oe30LG5yZmzLhKU5KWj_uKBE2ANOQ6LyImgY=')";
    } else if (condicao === 'night-Nevoeiro') {
        imagemFundo = "url('https://1.bp.blogspot.com/-ZuLYddQ7gQw/X-bXVCKxZUI/AAAAAAAA6Vw/akI1mS0takIqee3PlXdt-Wj8ZzXBGYR9gCLcBGAsYHQ/s2560/mountains_fog_trees_195557_2560x1440.jpg')";
    } else if (condicao === 'night-Chuva') {
        imagemFundo = "url('https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2h1dmElMjAlQzMlQTAlMjBub2l0ZXxlbnwwfHwwfHx8MA%3D%3D')";
    } else if (condicao === 'night-Granizo') {
        imagemFundo = "url('https://omunicipioblumenau.com.br/wp-content/uploads/2020/09/photo5154464589679798444.jpg')";
    } else if (condicao === 'night-Neve') {
        imagemFundo = "url('https://static.ohga.it/wp-content/uploads/sites/24/2022/02/iStock-155146307.jpg')";
    } else if (condicao === 'night-Trovoada') {
        imagemFundo = "url('https://radiocomercial.pt/upload/T/trovoada.jpg')";
    } else if (condicao === 'night-Trovoada_Granizo') {
        imagemFundo = "url('https://radiocomercial.pt/upload/T/trovoada.jpg')";
    } else {
        imagemFundo = "url('https://www.example.com/default.jpg')"; // Imagem padrão
    }

    // Aplica a imagem de fundo à div
    document.getElementById('Previsao-Layout').style.backgroundImage = imagemFundo;
}


function escolher_Carga_da_Bateria(bateria) {
    let Imagem_Carregado = ""; // Variável para armazenar a imagem correspondente

    // Define a imagem com base no valor da bateria
    if (bateria >= 75) {
        Imagem_Carregado = "https://www.svgrepo.com/show/499000/battery-100.svg";
    } else if (bateria >= 25 && bateria < 75) {
        Imagem_Carregado = "https://www.svgrepo.com/show/499001/battery-75.svg";  // Corrigi o nome do arquivo (só 2 'g' no link original)
    } else if (bateria >= 0 && bateria < 25) {
        Imagem_Carregado = "https://www.svgrepo.com/show/499002/battery-25.svg";
    }

    // Altera a imagem do elemento <img> com a classe 'img-bateria'
    document.querySelector('.img-bateria').src = Imagem_Carregado;

    // Atualiza o texto da bateria
    document.querySelector('.valor-bateria').innerHTML = `Carga: ${bateria}%`;
}
function atualizar_estado_rele(estado_rele0){
    document.querySelector(".int_valor_rele").innerHTML = estado_rele0;
}
