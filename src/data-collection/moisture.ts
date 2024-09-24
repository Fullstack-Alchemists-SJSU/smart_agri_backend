import * as spi from "spi-device"

const DATA_CHANNEL = 4
const SPI_SPEED = 1350000

const getMoisture = () => {
	const mcp = spi.open(0, 0, (err) => {
		if (err) console.log("Error detecting SPI Device: ", err)

		const message = [
			{
				sendBuffer: Buffer.from([1, (8 + DATA_CHANNEL) << 4, 0]), // Sent to MCP3008
				receiveBuffer: Buffer.alloc(3), // Receive from MCP3008
				byteLength: 3,
				speedHz: SPI_SPEED,
			},
		]

		mcp.transfer(message, (err: any, message: any) => {
			if (err) {
				console.error("SPI Transfer Error:", err)
			} else {
				const rawValue =
					((message[0].receiveBuffer[1] & 3) << 8) +
					message[0].receiveBuffer[2]
				console.log("Raw moisture value: ", rawValue)
				//callback(rawValue)
			}
		})
	})
}

export default getMoisture