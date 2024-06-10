
import React, { useState } from 'react'

export const useCalculator = () => {

    const [number, setNumber] = useState('0')

    const buildNumber = ( numberString: string ) => {

        if(number.includes('.') && numberString === '.' ) return;
        
        if (number.startsWith('0' || number.startsWith('-0'))){

            //punto decimal
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            //evaluar si es otro cero y no hay punto
            if(numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            //evaluar si es diferente de cero, no hay punto decimal y es el primer numero
            if (numberString !== '0' && !number.includes('.')){
                return setNumber( numberString );
            }

            //evaluar varios ceros al inicio 000000
            if(numberString === '0' && !number.includes('.')){
                return;
            }
        }
        setNumber(number + numberString)
    }


    return {
        //properties
        number,

        //methods
        buildNumber,
    }
}
