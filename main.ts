Read_Position.Set_Line_Color(lineColor.White)
OLED12864_I2C.init(60)
Read_Position.Set_Min_Value([40, 50, 30])
Read_Position.Set_Max_Value([450, 650, 350])
basic.forever(function on_forever() {
    OLED12864_I2C.showString(0, 0, "        ", 1)
    OLED12864_I2C.showNumber(0, 0, Read_Position.Read_Position([Read_Position.analog(AnalogPin.P0), Read_Position.analog(AnalogPin.P1), Read_Position.analog(AnalogPin.P2)]), 1)
    basic.pause(10)
})
