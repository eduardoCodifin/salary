import React, { useState, useEffect} from 'react';
import Head from 'next/head'
import calcularSueldoNeto from '@/utils/calcularSueldoNeto';
import CurrencyInput from 'react-currency-input-field';
import NavBar from '@/components/NavBar';
import Seo from '@/components/seo';



export default function Home() {

  const [periodo, setPeriodo] = useState('Mensual');
  // const [sueldoBruto, setSueldoBruto] = useState('');
  const [sueldoBruto, setSueldoBruto] = useState('10000');
  const [incluirIMSS, setIncluirIMSS] = useState(true);
  const [incluirSubsidio, setIncluirSubsidio] = useState(false);
  const [resultados, setResultado] = useState(null);

  const handlePeriodoChange = (event) => {
    setPeriodo(event.target.value);
  };

  const handleSueldoBrutoChange = (event) => {
    setSueldoBruto(event.target.value);
  };

  const handleIncluirIMSSChange = (event) => {
    setIncluirIMSS(event.target.checked);
  };

  const handleIncluirSubsidioChange = (event) => {
    setIncluirSubsidio(event.target.checked);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const sueldo = parseFloat(sueldoBruto);  
      const result = calcularSueldoNeto(periodo, sueldo, true, incluirSubsidio);
      setResultado(result);
    
  };


  useEffect(() => {
    // Check if the input fields have been filled by the user and not by default and its different from 0
    if (sueldoBruto !== '' && sueldoBruto !== '0') {
      const sueldo = parseFloat(sueldoBruto);
      const result = calcularSueldoNeto(periodo, sueldo, incluirIMSS, incluirSubsidio);
      setResultado(result);

    }
    
  }, []);

  

  const resultadoNeto = resultados?.sueldoNeto; // Asumiendo que resultadoNeto es una cadena
  const cleanedResultadoNeto = resultadoNeto?.replace(',', '').replace('.', '.');
  const sueldoNetoNumero = parseFloat(cleanedResultadoNeto);


  

  return (
    <>
     <Seo
        title="Calculadora salarios Mexico: Bruto a Neto        "
        description="Calculadora de Impuestos México. Con esta calculadora podrás determinar tu sueldo neto o bruto, calculando tu salario después de aplicar los impuestos con las nuevas tarifas de ISR y del IMSS."
        siteName="Codifin"
      />

      <NavBar /> 

      <div className="container">

        <div className="content">
          <form onSubmit={handleSubmit} className='form'>
            <div className="text">
              <div className="input-group">
                <div className='periodo'>
                  <span className={`label-periodo ${periodo === "Semanal" ? 'active' : ''}`} onClick={() => setPeriodo('Semanal')}>
                    Semanal
                  </span>
                  <span className={`label-periodo ${periodo === "Quincenal" ? 'active' : ''}`} onClick={() => setPeriodo('Quincenal')}>
                    Quincenal
                  </span>
                  <span className={`label-periodo ${periodo === "Mensual" ? 'active' : ''}`} onClick={() => setPeriodo('Mensual')}>
                    Mensual
                  </span>
                </div>
              </div>
                <style jsx>{`


                .active {
                  background-color: #ffff;
                  color: #010d2d;
                  padding: 8px 16px;
                  border-radius: 50px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
                }

                /* Resto de los estilos... */
              `}</style>    
            </div>
           
            <div className="radio">

            <div className="input-group">
                <label htmlFor="sueldoBruto">Sueldo bruto {periodo === 'Mensual' ? 'mensual' : periodo.toLowerCase()}:</label>
                <CurrencyInput
                className='input'
                  id="sueldoBruto"
                  prefix="$" 
                  name="input-name"
                  defaultValue={10000}
                  decimalsLimit={2}
                  onValueChange={(value, name) => setSueldoBruto(value)}
                />
              </div>



            

              {/* <div className="input-group">
                <label className="container_checkbox">
                  <span className="label_checkbox">Incluir IMSS</span>
                  <input type="checkbox" checked={incluirIMSS} onChange={handleIncluirIMSSChange} />
                  <div className="checkmark"></div>
                </label>    
              </div> */}
            
            </div>  

            <button type="submit" className="submit-button">
              Calcular
            </button>

            
         </form>

      
        <div className="resultados">
            <div className="sueldo_neto_group">
              <h3 className='resultado_neto'>Sueldo neto</h3>
              <h3 className='resultado_neto_value'>
                $ {resultados && (
                  periodo === 'Mensual' ? resultadoNeto :
                  periodo === 'Semanal' ? (sueldoNetoNumero / 4).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) :
                  (sueldoNetoNumero / 2).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                 )  
                  }
              </h3>              
            </div>

            


            <ul>

              <li>Limite inferior: <span className="resultado">${resultados && resultados.limiteInferior}</span></li>
              <li>Excedente del límite inferior: <span className="resultado">${resultados && resultados.excedente}</span></li>
              <li>Porcentaje sobre el excedente: <span className="resultado">{resultados && resultados.tasaISR}%</span></li>
              <li>Impuesto marginal: <span className="resultado">${resultados && resultados.impuestoMarginal}</span></li>
              <li>Cuota fija del impuesto: <span className="resultado"> ${resultados && resultados.cuotaFijaISR}</span></li>
              <li>ISR: <span className="resultado">${resultados && resultados.impuestoISR}</span></li>
              <li>IMSS: <span className="resultado">${resultados && resultados.impuestoIMSS}</span></li>

            </ul>
        </div>
      
        </div>

     
    </div>

    

   

    </>
  )
}
