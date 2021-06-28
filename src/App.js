import React, {useState} from 'react'
import styled from 'styled-components';
import Header from './components/header';
import Formulario from './components/formulario';
import Resumen from './components/resumen';
import Resultado from './components/resultado';
import Spinner from './components/spinner';


const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #FFF;
  padding: 3rem;
`



function App() {
  const[resumen, GuardarResumen] = useState({
    cotizacion: 0,
    datos:{
      marca:'',
      year:'',
      plan:''
    }

  });

  const[cargando, guardarCargando] =useState(false); 



  const {cotizacion,datos} = resumen;

  return (

    <Contenedor>  

  <Header 
   titulo='Cotizador de seguros'
  />
  <ContenedorFormulario>
  <Formulario 
    GuardarResumen = {GuardarResumen}
    guardarCargando={guardarCargando}
  />

  {cargando ? <Spinner/> : null}
  <Resumen
    datos={datos}
  />
  {!cargando ? <Resultado
  cotizacion={cotizacion}
  /> : null}
  
  </ContenedorFormulario>
  </Contenedor>
  );
}

export default App;
