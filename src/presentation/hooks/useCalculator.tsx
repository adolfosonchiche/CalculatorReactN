
import React, { useEffect, useRef, useState } from 'react'

enum Operator {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '÷',
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('');
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>();


    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
           // setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
            setFormula( `${ firstFormulaPart } ${ lastOperation.current } ${ number }` );
        } else {
            setFormula(number);
        }

    }, [number]); //cada vez que el number cambie se ejecuta este useEffect


    //mostrar el resultado sin presionar el igual
    useEffect(() => {
      const subResult = calculateSubResult();
      setPrevNumber(`${ subResult }`)   
      
    }, [formula])
    


    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = undefined;
        setFormula('');
    }

    //borrar el último numero ingresado
    const deleteOperation = () => {
        let currentSign = '';
        let temporalNumber = number;

        if (number.includes('-')) {
            currentSign = '-';
            temporalNumber = number.substring(1);
        }

        if (temporalNumber.length > 1) {
            return setNumber(currentSign + temporalNumber.slice(0, -1));
        }

        return setNumber('0');
    }

    const toggleSign = () => {
        if (number.includes('-')) {
            return setNumber(number.replace('-', ''));
        }
        return setNumber('-' + number);
    }

    const buildNumber = (numberString: string) => {

        if (number.includes('.') && numberString === '.') return;

        if (number.startsWith('0' || number.startsWith('-0'))) {

            //punto decimal
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            //evaluar si es otro cero y no hay punto
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            //evaluar si es diferente de cero, no hay punto decimal y es el primer numero
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }

            //evaluar varios ceros al inicio 000000
            if (numberString === '0' && !number.includes('.')) {
                return;
            }
        }
        setNumber(number + numberString)
    }

    const setLastNumber = () => {
        calculateResult();
        

        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1));
        } else {
            setPrevNumber(number);
        }

        setNumber('0');
    }

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const calculateResult = () => {

        /* */
        const result = calculateSubResult();
        setFormula(`${result}`);
        lastOperation.current = undefined;
        setPrevNumber('0');
    }

    const calculateSubResult = () => {
        //const num1 = Number(number);
        //const num2 = Number(prevNumber);
        const  [firstValue, operation, secundValue ] = formula.split(' ');
        const num1 = Number(firstValue);
        const num2 = Number(secundValue); //NaN
        console.log('hola mundo')
        if ( isNaN( num2 ) ) return num1;

        switch (operation) {

            case Operator.add:
                return num1 + num2;
                //break;
            case Operator.subtract:
                return num1 - num2;
                //break;
            case Operator.multiply:
                return num1 * num2;
                //break;
            case Operator.divide:
                return num1 / num2;
                //break;

            default:
                console.log('not operation')
                //throw new Error('Operation not implemented');
            break; 
        }
    }


    return {
        //properties
        number,
        prevNumber,
        formula,

        //methods
        buildNumber,
        toggleSign,
        clean,
        deleteOperation,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
        calculateResult,

    }
}
