# Weather Monitoring System

## Author  
Samuel Figueira  

## Version  
1.3.0  

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

## Updates from Last Version  
- Added battery monitoring feature to track charge levels.  
- Incorporated a relay capable of turning sensors on and off to conserve energy.  
- Added a database-controlled button to remotely turn sensors on and off.  
- Added a physical button to control sensors locally, enhancing energy management.  
- Fixed bugs and improved system stability.

## Future Updates  
- Further optimization of energy consumption.  
- Additional sensors for more comprehensive weather monitoring like wind sensor
- Improved user interface for real-time monitoring.  
- Enhanced security for Firebase interactions.  
- Bug fixes and performance improvements.

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
   https://github.com/Corvo26/MEFS-EMAS-.git

2. **Install Arduino IDE:**  
   [Download here](https://www.arduino.cc/en/software)

3. **Set up Firebase:**  
   - Create a Firebase project and enable Firebase Realtime Database.  
   - Configure the Firebase credentials in the Arduino code for seamless data uploading.  
