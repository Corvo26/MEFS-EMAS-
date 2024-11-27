#include <Wire.h>
#include <WiFi.h>
#include <FirebaseESP32.h>
#include "Digital_Light_TSL2561.h"
#include "seeed_bme680.h"
#include "Arduino.h"
#include "SI114X.h"
// Provide the token generation process info.
#include <addons/TokenHelper.h>

// Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>
// Definir credenciais de Wi-Fi
#define WIFI_SSID "moto g(30)_3462"
#define WIFI_PASSWORD "bantower"

// Definir chave da API e URL do Realtime Database
#define API_KEY "AIzaSyCPCYjmA-LK5ruhzeXiacgiWJAznlwDiD4"
#define DATABASE_URL "https://mefs-336a1-default-rtdb.firebaseio.com"

// Definir email e senha do usuário Firebase
#define USER_EMAIL "samuelbfigueira@gmail.com"
#define USER_PASSWORD "DoctorWho2806T@rdis"

// Definir pino do sensor de água
#define WATER_SENSOR 14
#define IIC_ADDR uint8_t(0x76)
// Objetos para comunicação com sensores
Seeed_BME680 bme680(IIC_ADDR); /* IIC PROTOCOL */
SI114X SI1145 = SI114X();
// Configuração do valor de corte do índice UV
#define relayPin 26
// Variáveis para controle do tempo
unsigned long relayOffStart = 0;
const unsigned long relayOffDuration = 60 * 1000; // 2 minutos em milissegundos

// Estado do relé
bool relayState = true; // Inicialmente ligado
// Objetos do Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
// Variáveis para controle de envio de dados
unsigned long sendDataPrevMillis = 0;
unsigned long count = 0;
/*
const int OutPin  = 25;   // pino analógico para o sensor de vento (Out)
const int TempPin = 26;   // pino analógico para o sensor de temperatura (TMP)
*/
// Definir a tensão de zero vento (ZeroWind_V), que deve ser medida manualmente.
const float ZeroWind_V = 0.500;  // exemplo de valor (ajuste conforme necessário)

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin,  LOW); // Relé inicialmente ligado (assumindo LOW ativa o relé)
  /*
  pinMode(OutPin, INPUT);      
  pinMode(TempPin, INPUT);      
  */
  pinMode(WATER_SENSOR, INPUT);
  Wire.begin();
  TSL2561.init();
  // Inicializar TSL2561
    while (!bme680.init()) {
    Serial.print("Erro no bme");
    delay(10000);
  }
  while (!SI1145.Begin()) {
        Serial.print("Erro no sI1145");
        delay(1000);
  }
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED){
    Serial.print("Erro ao conectar");
    delay(300);
  }


  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the user sign in credentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  config.database_url = DATABASE_URL;

  config.token_status_callback = tokenStatusCallback; 

  
  Firebase.reconnectNetwork(true);

  fbdo.setBSSLBufferSize(4096, 1024 );


  Firebase.begin(&config, &auth);

  Firebase.setDoubleDigits(5);


}

void enviarDadosFirebase(float temperatura, float pressao, float umidade, float gas, int waterLevel, uint16_t luzVisivel, uint16_t luzIR, float indiceUV,float vento) {
  // Enviar temperatura
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
  sendDataPrevMillis = millis();


  if (Firebase.setFloat(fbdo, "/dados/temperatura", temperatura)) {
  } else {
  }

  // Enviar pressão
  if (Firebase.setFloat(fbdo, "/dados/pressao", pressao)) {
  } else {
  }

  // Enviar umidade
  if (Firebase.setFloat(fbdo, "/dados/humidade", umidade)) {
  } else {
  }

  // Enviar gás
  if (Firebase.setFloat(fbdo, "/dados/gas", gas)) {
  } else {
  }

  // Enviar nível de água
  if (Firebase.setInt(fbdo, "/dados/nivel_agua", waterLevel)) {
  } else {
  }

  // Enviar luz visível
  if (Firebase.setInt(fbdo, "/dados/luz_visivel", luzVisivel)) {
  } else {
  }

  // Enviar luz infravermelha
  if (Firebase.setInt(fbdo, "/dados/luz_ir", luzIR)) {
  } else {
  }

  // Enviar índice UV
  if (Firebase.setFloat(fbdo, "/dados/indice_uv", indiceUV)) {
  } else {
  }
  //Enviar vento
  if (Firebase.setFloat(fbdo, "/dados/vento", vento)) {
  } else {
  }
  //Enviar carga bateria
  /*if (Firebase.setFloat(fbdo, "/dados/bateria", vento)) {
  } else {
  }*/
  }
}

void loop() {
  if (bme680.read_sensor_data()) {
    return;
  }


  float temperatura = bme680.sensor_result_value.temperature;
  float pressao = bme680.sensor_result_value.pressure / 1000.0;
  float umidade = bme680.sensor_result_value.humidity;
  float gas = bme680.sensor_result_value.gas / 1000.0;
  int waterLevel = analogRead(WATER_SENSOR);
  uint16_t luzVisivel = SI1145.ReadVisible();
  uint16_t luzIR = SI1145.ReadIR();
  float indiceUV = (float)SI1145.ReadUV() / 100;
      // Ler o valor analógico do sensor de vento
    /*
    int windADunits = analogRead(OutPin);
    float volts = (windADunits * 5.0) / 1024.0;  // Converter o valor A/D para volts

    // Ler o valor analógico do sensor de temperatura
    int tempRawAD = analogRead(TempPin);
    float tempC = ((((float)tempRawAD * 5.0) / 1024.0) - 0.400) / .0195;  // Converter para Celsius

    // Calcular a velocidade do vento em MPH usando a fórmula fornecida
    float vento = pow(((volts - ZeroWind_V) / (3.038517 * pow(tempC, 0.115157))) / 0.087288, 3.009364);
    */

    if (indiceUV < 0.03 && relayState && millis() - relayOffStart >= relayOffDuration) {
    // Se o índice UV estiver abaixo do limite e o relé estiver ligado
    Serial.println("Índice UV baixo. Desligando sensores...");
    digitalWrite(relayPin, LOW); // Desliga o relé
    relayState = false;
    relayOffStart = millis(); // Marca o tempo do desligamento
    }
     if (!relayState && millis() - relayOffStart >= relayOffDuration) {
    Serial.println("Religando sensores...");
    digitalWrite(relayPin, HIGH); // Religa o relé
    relayState = true;
    relayOffStart = millis();
    }



  delay(750);  // Atraso de 750ms para leitura contínua
  enviarDadosFirebase(temperatura, pressao, umidade, gas, waterLevel, luzVisivel, luzIR, indiceUV,0);

}

