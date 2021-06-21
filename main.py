Read_Position.Set_Line_Color(lineColor.WHITE)
OLED12864_I2C.init(60)
Read_Position.Set_Min_Value([40, 50, 30])
Read_Position.Set_Max_Value([450, 650, 350])

def on_forever():
    OLED12864_I2C.show_string(0, 0, "        ", 1)
    OLED12864_I2C.show_number(0,
        0,
        Read_Position.Read_Position([Read_Position.analog(AnalogPin.P0),
                Read_Position.analog(AnalogPin.P1),
                Read_Position.analog(AnalogPin.P2)]),
        1)
    basic.pause(10)
basic.forever(on_forever)
