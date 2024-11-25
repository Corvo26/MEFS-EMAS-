# Weather Monitoring System

## Author  
Samuel Figueira  

## Version  
1.0.0  

## Description  
This Weather Monitoring System is an Arduino-based IoT project that collects various environmental data using multiple sensors and uploads the information to a Firebase Realtime Database. The system tracks:  
- **Temperature**  
- **Pressure**  
- **Humidity**  
- **Gas levels**  
- **Water levels**  
- **Visible light intensity**  
- **Infrared light intensity**  
- **UV Index**  
- **Wind speed**  

The collected data can be monitored in real-time and used for advanced weather analysis and predictions.  

## Pre-requisites and Installation Instructions  

### Pre-requisites  
Ensure you have the following components and software tools:  
- ESP32 microcontroller board  
- Sensors:  
  - BME680 (temperature, pressure, humidity, and gas)  
  - TSL2561 (light intensity)  
  - SI114X (UV and IR light)  
  - Analog water level sensor  
  - Wind speed sensor  
- Arduino IDE installed on your computer ([Download here](https://www.arduino.cc/en/software))  
- Firebase account for setting up the Realtime Database  

### Installation  

1. **Clone the repository:**  
2. **Install Arduino Ide:**
   
   git clone https://github.com/yourusername/WeatherMonitoringSystem.git
   
   arduino https://www.arduino.cc/en/software
