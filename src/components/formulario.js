import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { calcularMarca, calcularPlan, obtenerDiferenciaYear } from '../helpers';

const Campo = styled.div`
 display: flex;
 margin-bottom: 1rem;
 aling-item: center;
`;

const Label = styled.label`
flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const Radio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        cursor:pointer;
        background-color: #26c6da;
    }
`;


const Error = styled.div`
background-color: red;
color: white;
padding: 1rem;
width: 100%;
text-align: center;
margin-bottom: 1rem;
`;
    const Formulario = ({GuardarResumen,guardarCargando}) => {
    const [datos, guardarDatos] = useState({
        marca: '',
        year: '' ,
        plan: ''
    });

    const [error, GuardarError] = useState(false);

    const {marca, year, plan} = datos;

    const obtenerInformacionUsuario = e =>{
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }
    


    const cotizarSeguro = e =>{
        e.preventDefault();
        if(marca.trim() === '' || year.trim() ==='' || plan.trim() === ''){
                GuardarError(true);
                return;
        }
        GuardarError(false);

        const diferencia = obtenerDiferenciaYear(year);
     

        let resultado = 2000;

        resultado -= ((diferencia *3 )* resultado)/100;

     
        
        resultado = calcularMarca(marca) * resultado;

     

        const incrementoPlan = calcularPlan(plan);
        resultado = parseFloat( incrementoPlan * resultado).toFixed(2);
     
        guardarCargando(true);
        setTimeout(() => {
            guardarCargando(false);
            GuardarResumen({
                cotizacion: Number(resultado),
                datos 
            })
        }, 3000);


        
    }

    return ( 
        <form onSubmit={cotizarSeguro}>
            { error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select name='marca' value={marca} onChange={obtenerInformacionUsuario} >
                    <option value=''>-- Seleccione--</option>
                    <option value='americano'>Americano</option>
                    <option value='europeo'>europeo</option>
                    <option value='asiatico'>asiatico</option> 
                </Select>
             </Campo>   
             <Campo>   
                <Label>Año</Label>
                <Select name='year' value={year} onChange={obtenerInformacionUsuario}>
                <option value="">-- Seleccione --</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                </Select>
                </Campo>
                <Campo>
                <Label> Plan</Label>
                <Radio type='radio' name='plan' value='basico' checked={plan=== 'basico'} onChange={obtenerInformacionUsuario} />Básico
                <Radio type='radio' name='plan' value='completo' checked={plan=== 'completo'} onChange={obtenerInformacionUsuario} />Completo
                </Campo>
                <Boton type='submit'> Cotizar</Boton>
         
        </form>

     );
}
Formulario.propTypes = {
    GuardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
} 


export default Formulario;