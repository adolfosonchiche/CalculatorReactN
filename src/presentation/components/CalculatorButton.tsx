import React from 'react'
import { colors, styles } from '../theme/app-theme'
import { Pressable, Text } from 'react-native'


interface Props {
    label: string;
    color?: string;
    doubleSize?: boolean;
    blackText?: boolean;

}

export const CalculatorButton = ({
    label, color = colors.darkGray, doubleSize = false, blackText= false,
}: Props ) => {
    return (
        <Pressable style={({pressed}) => ({
         ...styles.button,
         backgroundColor: color,
         width: (doubleSize) ? 170 : 80,
         opacity: (pressed) ? 0.8 : 1   
        })}>
            <Text style={{
                ...styles.buttonText, 
                color: (blackText) ? 'black': 'white'
            }}>{label}</Text>
        </Pressable>
    )
}
