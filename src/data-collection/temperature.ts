import * as w1temp from "w1temp"

export const TEMP_DATA_GPIO_PIN = 4

const getTemperature = () => {
	w1temp.setGpioData(TEMP_DATA_GPIO_PIN)

	w1temp
		.getSensor("28-*")
		.then((sensor: any) => {
			sensor.getTemperature((err: Error | null, temp: number) => {
				if (err) {
					console.error("Error reading temperature:", err)
				} else {
					console.log(`Temperature: ${temp.toFixed(2)}°C`)
				}
			})
		})
		.catch((err) => {
			console.log("Error: ", err)
		})
}

export default getTemperature
