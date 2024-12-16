# IoT Smart Agriculture System

## Project Overview

The IoT Smart Agriculture System integrates modern IoT technologies with agriculture, utilizing a Raspberry Pi 5, DS18B20 temperature sensor, and a capacitive moisture sensor with an MCP3008 ADC. The system collects real-time data on soil moisture and temperature, transmitting it to AWS IoT Core and ThingSpeak for analysis and visualization. This project aims to optimize resource usage and provide actionable insights for sustainable farming.

## Code Repositories

- *Frontend Repository*: [Smart Agri Frontend](https://github.com/Fullstack-Alchemists-SJSU/smart_agri_frontend)
- *Backend Repository*: [Smart Agri Backend](https://github.com/Fullstack-Alchemists-SJSU/smart_agri_backend)

## Setup Instructions

### Hardware Setup

1. Assemble the Raspberry Pi 5 with the DS18B20 temperature sensor and the capacitive moisture sensor.
2. Connect the MCP3008 ADC to the Raspberry Pi for analog-to-digital conversion.
3. Calibrate sensors using dry and saturated soil samples for accurate readings.

### Frontend Setup

1. Clone the frontend repository:
   git clone https://github.com/Fullstack-Alchemists-SJSU/smart_agri_frontend
2.  Navigate to the directory:
    cd smart_agri_frontend
3. Install dependencies:
    npm install
4. Start the development server:
    npm start

### Backend Setup

1. Clone the backend repository:
git clone https://github.com/Fullstack-Alchemists-SJSU/smart_agri_backend
2. Navigate to the project directory:
cd smart_agri_backend
3. Install dependencies:
npm install
4. Configure environment variables for AWS IoT Core and ThingSpeak.
5. Start the backend server:
npm start

## Features and Implementation
### Core Features
1. Real-time Monitoring:
- Soil moisture and temperature data are collected and displayed in real-time.
- Data processed using calibrated algorithms for precise insights.
2.  Cloud Integration:
- Dual-cloud setup with AWS IoT Core and ThingSpeak for data storage and visualization.
3. Interactive Dashboard:
- Responsive dashboard built with React, showcasing real-time readings, historical trends, and predictive insights.
4. AI Chatbot Integration:
- Provides agricultural recommendations based on real-time sensor data.
### Additional Features
1. Error Handling: Comprehensive mechanisms to ensure reliable data collection and transmission.
2. Scalability: Designed for integration with additional sensors and modules, supporting future expansion.

## Functional Tests
### Temperature Sensor Validation:

Verifies DS18B20 sensor outputs accurate temperature readings.
Status: ✅ Passed.
Soil Moisture Sensor Calibration:

### Tests the capacitive soil moisture sensor's calibration against dry and wet soil samples.
Status: ✅ Passed.
Cloud Communication Test:

### Ensures successful data transmission to AWS IoT Core and ThingSpeak.
Status: ✅ Passed.
Dashboard Visualization:

### Validates real-time updates and historical trend charts on the React dashboard.
Status: ✅ Passed.

![Functional Tests Passing](backend-mocktests.jpeg)

The video demo has all the functional tests passing. Screenshots are not possible since its an Iot project with hardware realitime components which can be proved only in video. 
Video Link - https://drive.google.com/file/d/158Ri0c_kD-zHv3yQAt_43dfxzW4A9_yw/view?usp=sharing
