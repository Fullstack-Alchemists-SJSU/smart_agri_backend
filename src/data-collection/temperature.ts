import * as w1temp from "w1temp";

export const TEMP_DATA_GPIO_PIN = 4;

// Function to get temperature data from the sensor
const getTemperature = async () => {
  return new Promise<number>((resolve, reject) => {
    w1temp
      .getSensor("28-00000087dd5d")
      .then((sensor: any) => {
        const temp = sensor.getTemperature();
        if (temp) {
          resolve(temp); // Resolve the promise with the temperature value
        } else {
          reject(new Error("Temperature not found"));
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        reject(err); // Reject the promise on error
      });
  });
};

export default getTemperature;
