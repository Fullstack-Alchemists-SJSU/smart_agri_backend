import getMoisture from "../src/data-collection/moisture";
import getTemperature from "../src/data-collection/temperature";
import { sendDataToThingspeak, publishSensorData } from "../src/data-collection/network";
import { startSensorMonitoring } from "../src/index";
import device from "../src/aws/device";

// Mocking dependencies
jest.mock("spi-device");
jest.mock("w1temp");
jest.mock("axios");
jest.mock("../src/aws/device");

describe("Sensor Data Collection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should get moisture data", async () => {
    const mockMoistureValue = 500;
    const spi = require("spi-device");
    spi.open.mockImplementation((bus, device, callback) => {
      callback(null);
    });
    spi.transfer.mockImplementation((message, callback) => {
      message[0].receiveBuffer[1] = 1;
      message[0].receiveBuffer[2] = 244;
      callback(null, message);
    });

    const moisture = await getMoisture();
    expect(moisture).toBe(mockMoistureValue);
  });

  test("should get temperature data", async () => {
    const mockTemperatureValue = 25;
    const w1temp = require("w1temp");
    w1temp.getSensor.mockResolvedValue({
      getTemperature: () => mockTemperatureValue,
    });

    const temperature = await getTemperature();
    expect(temperature).toBe(mockTemperatureValue);
  });

  test("should send data to ThingSpeak", async () => {
    const axios = require("axios");
    axios.get.mockResolvedValue({ data: 1 });

    await sendDataToThingspeak(25, 500);
    expect(axios.get).toHaveBeenCalled();
  });

  test("should publish sensor data to AWS IoT", async () => {
    const mockTemp = 25;
    const mockMoisture = 500;
    const mockRawMoisture = 500;
    const mockTimestamp = Date.now();
    const mockDeviceId = "raspi_5";

    await publishSensorData(mockTemp, mockMoisture, mockRawMoisture, mockTimestamp, mockDeviceId);
    expect(device.publish).toHaveBeenCalled();
  });

  test("should start sensor monitoring", () => {
    jest.useFakeTimers();
    startSensorMonitoring(1000);
    jest.advanceTimersByTime(1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
  });
});