import React from 'react'
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Mensaje = styled.p`
background-color: rgb(127,224,237);
margin-top: 2rem;
padding: 1rem;
text-align: center;

`;
const ResultadoCotizacion = styled.div`
text-align: center;
background-color: rgb(127, 224,237);
padding: 5rem;
border: 1px solid #26c6da;
margin-top: 1rem;
position: relative;
`;


const TextoCotizacion = styled.p`
color: #00838f;
padding: 1rem;
text-transform: uppercase;
font-weight: bold;
margin-top: 0;

`;

const Resultado = ({cotizacion}) => {

 
    return (   cotizacion === 0  ? <Mensaje>Elige Marca, año y tipo de seguro</Mensaje>: 
        
        (<ResultadoCotizacion>
        <TransitionGroup
        component= 'span'
        className='resultado'>
            <CSSTransition
            classNames='resultado'
            key={cotizacion}
            timeout={{enter: 500, exit: 500}}>

            <TextoCotizacion>el total es:<span>${cotizacion}</span> </TextoCotizacion>
            </CSSTransition>
        </TransitionGroup>
        </ResultadoCotizacion>)
     );
}
 Resultado.propTypes = {
     cotizacion: PropTypes.number.isRequired
 }
export default Resultado;