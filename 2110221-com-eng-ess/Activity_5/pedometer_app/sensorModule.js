/*jshint esversion: 6 */
var linearAcc = null;
class SensorReader {
	constructor() {
		this.aX = 0;
		this.aY = 0;
		this.aZ = 0;
		this.gA = 0;
		this.gB = 0;
		this.gG = 0;
		this.gyroSensorApiStat = 'No API supported.';
		this.acceleratorApiStat = 'No API supported';
	}

	// For generic sensor api handler
	accelerationHandler(acceleration) {
		this.aX = acceleration.x;
		this.aY = acceleration.y;
		this.aZ = acceleration.z;
	}

	rotationHandler(rotation) {
		this.gA = rotation.x;
		this.gB = rotation.y;
		this.gG = rotation.z;
	}

	// For older sensor api handler 
	deviceMotionHandler(eventData) {
		this.aX = eventData.acceleration.x;
		this.aY = eventData.acceleration.y;
		this.aZ = eventData.acceleration.z;
	}

	deviceOrientationHandler(eventData) {
		this.gA = eventData.alpha;
		this.gB = eventData.beta;
		this.gG = eventData.gamma;
	}

	start() {
		// Gyroscope
		if ('DeviceOrientationEvent' in window) { // Device Orientation API
			var retVal = window.addEventListener('deviceorientation', ev => this.deviceOrientationHandler(ev), false);
			if (!retVal) { this.gyroSensorApiStat = 'device Orientation API' };
		} else {
		}

		// Accelerometer
		if ('LinearAccelerationSensor' in window) { // Generic Sensor API;
			linearAcc = new LinearAccelerationSensor();
			var retVal = linearAcc.addEventListener('reading', ev => this.accelerationHandler(linearAcc), false);
			linearAcc.start();
			if (!retVal) { this.acceleratorApiStat = 'Generic sensor api' };
		} else if ('DeviceMotionEvent' in window) { // Device Motion API;
			var retVal = window.addEventListener('devicemotion', ev => this.deviceMotionHandler(ev), false);
			if (!retVal) { this.acceleratorApiStat = 'device Motion API' };
		} else {
		}
	}

	stop() {
		//Gyro scope
		if ('DeviceOrientationEvent' in window) { // Device Orientation API
			if (window.removeEventListener) {
				window.removeEventListener('deviceorientation', this.deviceOrientationHandler);
			}
			else if (window.detachEvent) {
				window.detachEvent('deviceorientation', this.deviceOrientationHandler);
			}
		} 

		//Accelerometer
		if ('LinearAccelerationSensor_' in window && linearAcc != null) {
			linearAcc.stop();
			if (linearAcc.removeEventListener) {
				linearAcc.removeEventListener("reading", this.accelerationHandler);
			}
			else if (linearAcc.detachEvent) {
				linearAcc.detachEvent("reading", this.accelerationHandler);
			}
			linearAcc = null;
		} else if ('DeviceMotionEvent' in window) {
			if (window.removeEventListener) {
				window.removeEventListener('devicemotion', this.deviceMotiontionHandler);
			}
			else if (window.detachEvent) {
				window.detachEvent('devicemotion', this.deviceMotiontionHandler);
			}
		}
		this.aX = 0;
		this.aY = 0;
		this.aZ = 0;
		this.gA = 0;
		this.gB = 0;
		this.gG = 0;

	}

	getAcc() {
		return [this.aX, this.aY, this.aZ];
	}

	getGyro() {
		return [this.gA, this.gB, this.gG];
	}

	getGyroApiStatus() {
		return this.gyroSensorApiStat;
	}

	getAccApiStatus() {
		return this.acceleratorApiStat;
	}
}
const sensorReader = new SensorReader();
