import React, { useState } from 'react';
import Head from 'next/head'
import calcularSueldoNeto from '@/utils/calcularSueldoNeto';
import CurrencyInput from 'react-currency-input-field';


export default function Home() {

  const [periodo, setPeriodo] = useState('Mensual');
  const [sueldoBruto, setSueldoBruto] = useState('');
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
    // Convertimos el sueldo bruto ingresado a número

    const sueldo = parseFloat(sueldoBruto);
    
      const result = calcularSueldoNeto(periodo, sueldo, incluirIMSS, incluirSubsidio);
      setResultado(result);
    
    console.log(result)
  };





  return (
    <>
      <Head>
        <title>Calculadora</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
     
      </Head>
      <div className="container">
        
        {/* <div className="titulo">
          <h1>Calculadora de Sueldo Neto en México</h1>
        </div> */}

        <div className="content">
          <form onSubmit={handleSubmit} className='form'>
            <div className="text">

            <div className="input-group">
              <label>Selecciona período:</label>
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
        .label-periodo {
          cursor: pointer;
          margin-right: 2rem;
        }

        .active {
          background-color: #10c998;
          color: white;
          padding: 8px 16px;
          border-radius: 50px;
        }

        /* Resto de los estilos... */
      `}</style>


            <div className="input-group">
              <label htmlFor="sueldoBruto">Sueldo bruto {periodo === 'Mensual' ? 'mensual' : periodo.toLowerCase()}:</label>
              <CurrencyInput
              className='input'
                id="sueldoBruto"
                prefix="$" 
                name="input-name"
                defaultValue={1000}
                decimalsLimit={2}
                onValueChange={(value, name) => setSueldoBruto(value)}
              />
            </div>
            
            </div>
           
           <div className="radio">
            <div className="input-group">
              <label>
                <input type="checkbox" checked={incluirIMSS} onChange={handleIncluirIMSSChange} />
                Incluir IMSS
              </label>
            </div>
           
           </div>

           
            
            <button type="submit">Calcular</button>
        </form>

      {resultados && (
        <div className="resultados">

          <div className="sueldo_neto_group">
            <h3 className='resultado_neto'>Sueldo neto</h3>
            <h3 className='resultado_neto_value'>${resultados.sueldoNeto}</h3>
          </div>

          


          <ul>

          <li>Limite inferior: <span class="resultado">${resultados.limiteInferior}</span></li>
          <li>Excedente del imite inferior: <span class="resultado">${resultados.excedente}</span></li>
          <li>Porcentaje sobre el excedente: <span class="resultado">${resultados.tasaISR}%</span></li>
          <li>Impuesto marginal: <span class="resultado">${resultados.impuestoMarginal}</span></li>
          <li>Cuota fija del impuesto: <span class="resultado">${resultados.cuotaFijaISR}</span></li>
          <li>ISR: <span class="resultado">${resultados.impuestoISR}</span></li>
          <li>IMSS: <span class="resultado">${resultados.impuestoIMSS}</span></li>


          </ul>
        </div>
      )}
        </div>

     
    </div>

   

    </>
  )
}
