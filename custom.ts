
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum lineColor {
    //% block="Black"
    Black,
    //% block="White"
    White
}

/**
 * Read Position blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace Read_Position {

    let Color_Line = 0;  //0 = black, 1 = white 
    let minValue = [0, 0, 0, 0, 0, 0, 0, 0];
    let maxValue = [0, 0, 0, 0, 0, 0, 0, 0];
    let Num_Sensor = 0;
    let _lastPosition = 0;
    let returnValue = 0;
    let integral = 0;
    let derivative = 0;
    let previous_error = 0;



    /**
     * TODO: describe your function here
     * @param e describe parameter here
     */
    //% block
    export function Set_Line_Color(e: lineColor): void {
        if (e == lineColor.Black) {
            Color_Line = 0;
        }
        else {
            Color_Line = 1;
        }
        // Add code here
    }

    /**
  * Set_Min_Value
  * @param min1 Value of Sensor; eg: 0
  * 
  */
    //% blockId=Set_Min_Value block="Set_Min_Value %min1|"
    //% weight=80
    export function Set_Min_Value(min1: number[]): void {
        Num_Sensor = min1.length;
        for (let NumOfSensor = 0; NumOfSensor < min1.length; NumOfSensor++) {
            minValue[NumOfSensor] = min1[NumOfSensor];
        }
        // Add code here
    }

    /**
  * Set_Max_Value
  * @param max1 Value of Sensor; eg: 0
  * 
  */
    //% blockId=Set_Max_Value block="Set_Max_Value %max1|"
    //% weight=80
    export function Set_Max_Value(max1: number[]): void {
        Num_Sensor = max1.length;
        for (let NumOfSensor = 0; NumOfSensor < max1.length; NumOfSensor++) {
            maxValue[NumOfSensor] = max1[NumOfSensor];
        }
        // Add code here
    }



    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 0
     */
    //% block
    export function ReadMin(value: number): number {
        return minValue[value];
    }
    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 0
     */
    //% block
    export function ReadMax(value: number): number {
        return maxValue[value];
    }

    /**
     * TODO: describe your function here
     * @param e describe value here, eg: 0
     */
    //% block
    export function analog(e: AnalogPin): number {
        return pins.analogReadPin(e);
    }

    /**
     * TODO: Read_Position
     * @param SensorRead Value of Sensor; eg: 0
     */
    //% blockId=Read_Position block="Read_Position %SensorRead|"
    export function Read_Position(SensorRead: number[]): number {
        let ON_Line = 0;
        let avg = 0;
        let sum = 0;

        if (Color_Line == 0) {
            for (let numSen = 0; numSen < Num_Sensor; numSen++) {
                let value = Math.map(SensorRead[numSen], minValue[numSen], maxValue[numSen], 1000, 0);
                if (value > 200) {
                    ON_Line = 1;
                }
                if (value > 0) {
                    avg += value * (numSen * 100);
                    sum += value;
                }
            }
        }
        else {
            for (let numSen = 0; numSen < Num_Sensor; numSen++) {
                let value = Math.map(SensorRead[numSen], minValue[numSen], maxValue[numSen], 0, 1000);
                if (value > 200) {
                    ON_Line = 1;
                }
                if (value > 0) {
                    avg += value * (numSen * 100);
                    sum += value;
                }
            }
        }
        if (ON_Line == 0) {
            if (_lastPosition < (Num_Sensor - 1) * 100 / 2) {
                return -50;
            }
            else {
                return 50;
            }
        }
        _lastPosition = avg / sum;
        return (_lastPosition / (Num_Sensor - 1)) - 50;
    }

    /**
     * @param Kp Value of Sensor; eg: 1
     * @param Ki Value of Sensor; eg: 0
     * @param Kd Value of Sensor; eg: 0
     * @param datain Value of Sensor; eg: 0
     */
    //% blockId=PID block=" PID Function KP%kp|KI%ki|KD%kd|position%datain|"
    export function PID(kp: number, ki: number, kd: number, datain: number): number {
        let setpoint = 0;
        let errors = setpoint - datain;
        integral = integral + errors;
        derivative = (errors - previous_error);
        previous_error = errors;
        return kp * errors + ki * integral + kd * derivative;
    }
}
