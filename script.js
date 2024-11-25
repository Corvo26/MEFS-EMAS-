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
        document.querySelector(".LUZIR2").innerHTML ='IR:'+ IR_string +'lm';
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
        document.querySelector(".pressao2").innerHTML = 'Pressão:' + PRES_string +'kPa';
    }, (error) => {
        console.error("Erro ao obter dados de pressão:", error);
    });
    


}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Função para inicializar a página
function iniciarPagina() {
    const cidade = "Coimbra"
    buscarCidade(cidade);
    atualizarDataHora();
    lerDadosFirebase();
    exibirLayoutInicial();
    atualizarPrevisoes();

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function colocarDadosNaTela(dados0, dados1) {
    // Acessando o índice UV da hora atual (ou de outra hora específica)
    const horaAtual = new Date().getHours(); // Obtém a hora atual (0-23)
    const indiceUV = dados0.hourly.uv_index[horaAtual]; // Obtém o índice UV da hora atual
    const indiceUVClearSky = dados0.hourly.uv_index_clear_sky[horaAtual]; // Índice UV para céu limpo
    
    // Exibindo o índice UV na tela
    document.querySelector(".indice-uv").innerHTML = "Índice UV: " + indiceUV;
    // Exibindo a temperatura atual
    const temperaturaAtual = dados1.hourly.temperature_2m[horaAtual];
    document.querySelector(".tempo").innerHTML = "Temperatura: " + temperaturaAtual + "°C";
    
    // Exibindo a umidade relativa atual
    const umidadeAtual = dados1.hourly.relative_humidity_2m[horaAtual];
    document.querySelector(".humidade").innerHTML = "Humidade: " + umidadeAtual + "%";

    let pressao_atmosferica = dados1.hourly.surface_pressure[horaAtual];
    pressao_atmosferica=pressao_atmosferica/10;
    pressao_atmosferica = pressao_atmosferica.toFixed(2); // Limita a 2 casas decimais
    document.querySelector(".pressao_atm").innerHTML = "pressao_atm: " + pressao_atmosferica + "kPa";


    const chuva = dados1.hourly.rain[horaAtual];
    document.querySelector(".chuva").innerHTML = "Chuva: " + chuva ;

    const intensidade_vento = dados1.hourly.wind_speed_10m[horaAtual];
    document.querySelector(".int_vento").innerHTML = "Velocidade_vento: " + intensidade_vento;

    const angulo_vento = dados1.hourly.wind_direction_10m[horaAtual];
    document.querySelector(".ang_vento").innerHTML = "Direcao_vento: " + angulo_vento;

}

async function buscarCidade() {
    try {
        const url0 = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=40.2115&longitude=-8.4292&hourly=uv_index,uv_index_clear_sky`;
        const url1 = `https://api.open-meteo.com/v1/forecast?latitude=40.2115&longitude=-8.4292&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,rain,weather_code,surface_pressure,visibility,,wind_speed_10m,wind_direction_10m`; // Corrigi a URL
        
        const dados0 = await fetch(url0).then(resposta => resposta.json());
        const dados1 = await fetch(url1).then(resposta => resposta.json());
        
        // Verifica se a resposta contém dados válidos
        if (dados0 && dados1 && dados0.hourly && dados1.hourly) {
            colocarDadosNaTela(dados0, dados1); // Passando os dados de ambas as APIs
        } else {
            console.error("Erro ao obter dados", dados0);
            console.error("Erro ao obter dados", dados1);
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
    var username = document.querySelector('.utlizador').value;
    var password = document.querySelector('.password').value;

    if (username === "admin" && password === "admin") {
        document.getElementById('login-layout').style.display = 'none';
        document.getElementById('main-layout').style.display = 'block';
        document.getElementById('Previsao-Layout').style.display = 'none';

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
}

// Exibir layout inicial
function exibirLayoutInicial() {
    document.getElementById('iniciar').style.display = 'block';
    document.getElementById('login-layout').style.display = 'none';
    document.getElementById('main-layout').style.display = 'none';

    setTimeout(exibirLayoutLogin, 3000);
}

// Exibir layout de login
function exibirLayoutLogin() {
    console.log('exibirLayoutLogin chamada em:', new Date().toLocaleTimeString());
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('login-layout').style.display = 'block';
    document.getElementById('main-layout').style.display = 'none';
}

// Função para ler dados do Firebase
function lerDadosFirebase2() {
    return new Promise((resolve, reject) => {
        const dados = {};
        const promises = [
            temperaturaRef.once('value').then(snapshot => dados.temperatura = snapshot.val()),
            gasRef.once('value').then(snapshot => dados.gas = snapshot.val()),
            humRef.once('value').then(snapshot => dados.humidade = snapshot.val()),
            uvRef.once('value').then(snapshot => dados.indiceUV = snapshot.val())
        ];

        Promise.all(promises)
            .then(() => resolve(dados))
            .catch(reject);
    });
}
// Variáveis globais
const area = 0.04485;
const rendimento = 11.14 / 100;
const dadosHistoricos = { temperatura: [], humidade: [], indiceUV: [] };
const diasMediaMovel = 3;

// Função para calcular média
function calcularMedia(valores) {
    return valores.reduce((acc, val) => acc + val, 0) / valores.length;
}

// Função para calcular média móvel
function calcularMediaMovel(valores, n) {
    if (valores.length < n) return 0;
    return calcularMedia(valores.slice(-n));
}

// Função para calcular tendência
function calcularTendencia(valores, n) {
    if (valores.length < n) return 0;

    const dados = valores.slice(-n);
    const x = [...Array(dados.length).keys()]; // [0, 1, 2, ..., n-1]
    const y = dados;

    const mediaX = calcularMedia(x);
    const mediaY = calcularMedia(y);

    // Calcula a covariância e a variância de X
    const covXY = x.reduce((acc, val, i) => acc + (val - mediaX) * (y[i] - mediaY), 0);
    const varX = x.reduce((acc, val) => acc + Math.pow(val - mediaX, 2), 0);

    // Coeficiente angular da linha (tendência)
    return covXY / varX;
}

// Previsão de geração solar
function preverGeracaoSolar(mediaIndiceUV) {
    return mediaIndiceUV * area * rendimento * 60 * 100;
}

// Atualizar previsões com dados do Firebase
async function atualizarPrevisoes() {
    try {
        const dados = await lerDadosFirebase2();
        console.log("Dados recebidos do Firebase:", dados);

        if (!dados || Object.keys(dados).length === 0) {
            console.log("Nenhum dado para análise.");
            return;
        }

        // Atualiza o histórico
        dadosHistoricos.temperatura.push(dados.temperatura);
        dadosHistoricos.humidade.push(dados.humidade);
        dadosHistoricos.indiceUV.push(dados.indiceUV);

        // Calcula médias e tendências
        if (dadosHistoricos.temperatura.length >= diasMediaMovel) {
            const mediaTemp = calcularMediaMovel(dadosHistoricos.temperatura, diasMediaMovel);
            const mediaUmidade = calcularMediaMovel(dadosHistoricos.humidade, diasMediaMovel);
            const mediaUV = calcularMediaMovel(dadosHistoricos.indiceUV, diasMediaMovel);

            const tendenciaTemp = calcularTendencia(dadosHistoricos.temperatura,diasMediaMovel);
            const tendenciaUmidade = calcularTendencia(dadosHistoricos.humidade,diasMediaMovel);

            const previsaoGeracaoSolar = preverGeracaoSolar(mediaUV);
            previsao_6horas(tendenciaTemp, tendenciaUmidade, mediaTemp, mediaUmidade);
            // Atualiza previsões na interface
            document.querySelector(".PrevTemp").innerHTML = 
                `Previsão Temperatura: ${(mediaTemp + tendenciaTemp).toFixed(2)}°C`;
            document.querySelector(".PrevHum").innerHTML = 
                `Previsão Humidade: ${(mediaUmidade + tendenciaUmidade).toFixed(2)}%`;
            document.querySelector(".PrevES").innerHTML = 
                `Previsão Energia Solar: ${previsaoGeracaoSolar.toFixed(2)} Wh`;
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

// Atualizar previsões periodicamente
setInterval (atualizarPrevisoes, 5000);
