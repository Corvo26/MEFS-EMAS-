#include <Wire.h>
#include <WiFi.h>
#include <FirebaseESP32.h>
#include "Digital_Light_TSL2561.h"
#include "seeed_bme680.h"
#include "SI114X.h"
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

// Definir credenciais de Wi-Fi
#define WIFI_SSID "moto g(30)_3462"
#define WIFI_PASSWORD "bantower"

// Definir chave da API e URL do Realtime Database
#define API_KEY "AIzaSyCPCYjmA-LK5ruhzeXiacgiWJAznlwDiD4"
#define DATABASE_URL "https://mefs-336a1-default-rtdb.firebaseio.com"

// Definir email e senha do usuário Firebase
#define USER_EMAIL "..."
#define USER_PASSWORD "..."

// Definir pino do botão de controle e do relay
#define BUTTON_PIN 13 // Pino do botão de controle
#define RELAY_PIN 33  // Pino de controle do relay

// Definir o sensor de água
#define WATER_SENSOR 35
#define IIC_ADDR uint8_t(0x76)
// Variáveis de controle de leitura do Firebase
unsigned long lastFirebaseReadTime = 0;
const unsigned long firebaseReadInterval = 5000; // 10 segundos (ajuste conforme necessário)

// Definir objetos para sensores
Seeed_BME680 bme680(IIC_ADDR);
SI114X SI1145 = SI114X();

// Objetos do Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
#define PINO_ADC 34  // Pino ADC onde a bateria está conectada
// Variáveis de debounce para o botão
int buttonState = LOW;
int lastButtonState = LOW;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;
unsigned long lastSensorReadTime = 0;
// Variáveis de controle
unsigned long sendDataPrevMillis = 0;
float estado_botao_app = 0;  // Variável para armazenar o valor do botão do Firebase
int cont_rele=0;
void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(WATER_SENSOR, INPUT);
  Wire.begin(23,22);

  // Inicializa o sensor TSL2561
  TSL2561.init();

  // Inicializa outros sensores
  while (!bme680.init()) {
    delay(10000);
  }
  while (!SI1145.Begin()) {
    delay(1000);
  }

  // Conectar ao Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
  }

  // Configurar o Firebase
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectNetwork(true);
  fbdo.setBSSLBufferSize(4096, 1024);
  Firebase.setDoubleDigits(5);

  Serial.println("Sistema inicializado!");
}

void loop() {
  float leituraADC = analogRead(PINO_ADC);
  float tensao = (leituraADC / 4095.0) * 3.3 * 2; // Considerando divisor de tensão 1:2
  float carga = calcularPercentual(tensao);
   // Verificar se o valor do botão no Firebase é 0
   if (estado_botao_app == 0) {
      if (cont_rele == 0) {
        digitalWrite(RELAY_PIN, LOW);  // Desliga o relé
        cont_rele++;  // Marca que o relé foi desligado
      } else {
        checkButton();  // Verifica o estado do botão
      }
  } else {
    // Se o valor do app for 1, o botão não faz nada
    +
    digitalWrite(RELAY_PIN, HIGH);  // Liga o relé
    cont_rele = 0;
    buttonState = LOW;
    lastButtonState = LOW;
  }

  // Ler o estado do botão do Firebase periodicamente (não a cada ciclo do loop)
  if (millis() - lastFirebaseReadTime > firebaseReadInterval) {
    estado_botao_app = receberDadosFirebase();  // Atualiza o valor do botão a partir do Firebase
    lastFirebaseReadTime = millis();  // Atualiza o tempo da última leitura do Firebase
  }

  // Ler os dados dos sensores se o TSL2561 estiver ligado
  if (digitalRead(RELAY_PIN) == HIGH) {  // Verifica se o sensor está ligado
    uint16_t luzVisivel = SI1145.ReadVisible();
    uint16_t luzIR = SI1145.ReadIR();
    if (!bme680.read_sensor_data()) {
      float temperatura = bme680.sensor_result_value.temperature;
      float pressao = bme680.sensor_result_value.pressure / 1000.0;
      float umidade = bme680.sensor_result_value.humidity;
      float gas = bme680.sensor_result_value.gas / 1000.0;
      int waterLevel = analogRead(WATER_SENSOR);
      float indiceUV = (float)SI1145.ReadUV() / 100;

      // Exibir os dados no Serial Monitor
      Serial.print("Luz Visível: ");
      Serial.println(luzVisivel);
      Serial.print("Luz IR: ");
      Serial.println(luzIR);
      Serial.print("Temperatura: ");
      Serial.println(temperatura);
      Serial.print("Pressão: ");
      Serial.println(pressao);
      Serial.print("Umidade: ");
      Serial.println(umidade);
      Serial.print("Gás: ");
      Serial.println(gas);
      Serial.print("Nível de Água: ");
      Serial.println(waterLevel);
      Serial.print("Índice UV: ");
      Serial.println(indiceUV);

      // Enviar os dados para o Firebase
      if (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0) {
        sendDataPrevMillis = millis();
        enviarDadosFirebase(temperatura, pressao, umidade, gas, waterLevel, luzVisivel, luzIR, indiceUV,carga);
      }
    }
  }
}

float calcularPercentual(float tensao) {
  // Faixa típica de tensões para baterias de lítio
  float tensaoMinima = 3.0; // Totalmente descarregada
  float tensaoMaxima = 4.2; // Totalmente carregada

  if (tensao <= tensaoMinima) return 0;
  if (tensao >= tensaoMaxima) return 100;

  return (tensao - tensaoMinima) / (tensaoMaxima - tensaoMinima) * 100.0;
}


// Função que verifica o estado do botão e aplica debounce
void checkButton() {
  int reading = digitalRead(BUTTON_PIN);

  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;
      if (buttonState == HIGH) {
        if (digitalRead(RELAY_PIN) == LOW) {
          digitalWrite(RELAY_PIN, HIGH);  // Liga o sensor
          TSL2561.init();  // Reinicializa o sensor
          bme680.init();
          SI1145.Begin();

          Serial.println("Sensor Ligado.");
        } else {
          digitalWrite(RELAY_PIN, LOW);  // Desliga o sensor
          Serial.println("Sensor Desligado.");
        }
      }
    }
  }

  lastButtonState = reading;
}


// Função para receber dados do Firebase
float receberDadosFirebase() {
  float botao_valor = 0;

  if (Firebase.ready()) {
    if (Firebase.getFloat(fbdo, "/dados/botao", &botao_valor)) {  // Passando o endereço de botao_valor
    } else {
    }
  }

  return botao_valor;
}

void enviarDadosFirebase(float temperatura, float pressao, float umidade, float gas, int waterLevel, uint16_t luzVisivel, uint16_t luzIR, float indiceUV,float carga) {
  if (Firebase.ready()) {
    Firebase.setFloat(fbdo, "/dados/temperatura", temperatura);
    Firebase.setFloat(fbdo, "/dados/pressao", pressao);
    Firebase.setFloat(fbdo, "/dados/humidade", umidade);
    Firebase.setFloat(fbdo, "/dados/gas", gas);
    Firebase.setInt(fbdo, "/dados/nivel_agua", waterLevel);
    Firebase.setInt(fbdo, "/dados/luz_visivel", luzVisivel);
    Firebase.setInt(fbdo, "/dados/luz_ir", luzIR);
    Firebase.setFloat(fbdo, "/dados/indice_uv", indiceUV);
    Firebase.setFloat(fbdo, "/dados/carga", carga);
  }
}
