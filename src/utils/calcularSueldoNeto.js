// Función para calcular el sueldo neto en México
export default function calcularSueldoNeto(periodo, sueldoBruto, incluirIMSS, incluirSubsidio) {
 

const tablaISR = [
  { limiteInferior: 0.01, limiteSuperior: 746.04, cuotaFija: 0, tasa: 1.92 },
  { limiteInferior: 746.05, limiteSuperior: 6332.05, cuotaFija: 14.32, tasa: 6.40 },
  { limiteInferior: 6332.06, limiteSuperior: 11128.01, cuotaFija: 371.83, tasa: 10.88 },
  { limiteInferior: 11128.02, limiteSuperior: 12935.82, cuotaFija: 893.63, tasa: 16.00 },
  { limiteInferior: 12935.83, limiteSuperior: 15487.71, cuotaFija: 1182.88, tasa: 17.92 },
  { limiteInferior: 15487.72, limiteSuperior: 31236.49, cuotaFija: 1640.18, tasa: 21.36 },
  { limiteInferior: 31236.50, limiteSuperior: 49233.00, cuotaFija: 5004.12, tasa: 23.52 },
  { limiteInferior: 49233.01, limiteSuperior: 93993.90, cuotaFija: 9236.89, tasa: 30.00 },
  { limiteInferior: 93993.91, limiteSuperior: 125325.20, cuotaFija: 22665.17, tasa: 32.00 },
  { limiteInferior: 125325.21, limiteSuperior: 375975.61, cuotaFija: 32691.18, tasa: 34.00 },
  { limiteInferior: 375975.62, limiteSuperior: Infinity, cuotaFija: 117912.32, tasa: 35.00 },
];

  
    let sueldoNeto = 0;
    let impuestoISR = 0;
    let impuestoIMSS = 0;
    let subsidioEmpleo = 0;

    sueldoBruto = parseFloat(sueldoBruto);

  
    // Realizar cálculos según el período seleccionado
    switch (periodo) {
      case 'Semanal':
        sueldoBruto = sueldoBruto / 4;
        break;
      case 'Quincenal':
        sueldoBruto  = sueldoBruto / 2;
        break;
      case 'Mensual':
        // No es necesario realizar cambios al sueldoBruto
        break;
      default:
        return { error: 'Periodo seleccionado no válido' };
    }
  
    // Calcular ISR
    let ingresoGravable = sueldoBruto;
    for (let i = 0; i < tablaISR.length; i++) {
      const tramo = tablaISR[i];
      if (ingresoGravable <= tramo.limiteSuperior) {
        if (i === 0) {
          impuestoISR = ingresoGravable * (tramo.tasa / 100);
        } else {
          impuestoISR = (ingresoGravable - tablaISR[i - 1].limiteSuperior) * (tramo.tasa / 100) + tramo.cuotaFija;
        }
        break;
      }
    }

  
   // Calcular IMSS (asumiendo un porcentaje del sueldo bruto, generalmente 6.5% para el empleado y 7.0% para el empleador)
  if (incluirIMSS) {
    impuestoIMSS = sueldoBruto * 0.065; // Tasa del 6.5% para el empleado
  }



    // Calcular subsidio al empleo
    if (incluirSubsidio) {
      subsidioEmpleo = 200;
    }
  
    // Calcular sueldo neto
    sueldoNeto = sueldoBruto - impuestoISR - impuestoIMSS + subsidioEmpleo;

    // Limite inferior del tramo en el que se encuentra el sueldo bruto
    let taxBracket = tablaISR.find((tramo) => sueldoBruto >= tramo.limiteInferior && sueldoBruto <= tramo.limiteSuperior);

     // Calcula el impuesto marginal
    let impuestoMarginal = 0;
      for (let i = 0; i < tablaISR.length; i++) {
        const tramo = tablaISR[i];
        if (sueldoBruto <= tramo.limiteSuperior) {
          if (i === 0) {
            impuestoMarginal = sueldoBruto * (tramo.tasa / 100);
          } else {
            const tramoAnterior = tablaISR[i - 1];
            impuestoMarginal = (sueldoBruto - tramoAnterior.limiteSuperior) * (tramo.tasa / 100);
          }
          break;
        }
      }
        // Format numbers with commas
  const formatNumber = (number) => {
    return number.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };


  
    // return {
    //   limiteInferior: formatNumber(taxBracket.limiteInferior),
    //   excedente: (sueldoBruto - taxBracket.limiteInferior).toFixed(2), 
    //   tasaISR: taxBracket.tasa.toFixed(2),
    //   impuestoMarginal: impuestoMarginal.toFixed(2),
    //   impuestoISR: impuestoISR.toFixed(2),
    //   cuotaFijaISR: taxBracket.cuotaFija.toFixed(2),
    //   impuestoIMSS: impuestoIMSS,
    //   subsidioEmpleo: subsidioEmpleo.toFixed(2),
    //   sueldoNeto: sueldoNeto.toFixed(2),
    // };

    return {
      limiteInferior: formatNumber(taxBracket.limiteInferior),
      excedente: formatNumber(sueldoBruto - taxBracket.limiteInferior),
      tasaISR: formatNumber(taxBracket.tasa),
      impuestoMarginal: formatNumber(impuestoMarginal),
      impuestoISR: formatNumber(impuestoISR),
      cuotaFijaISR: formatNumber(taxBracket.cuotaFija),
      impuestoIMSS: formatNumber(impuestoIMSS),
      subsidioEmpleo: formatNumber(subsidioEmpleo),
      sueldoNeto: formatNumber(sueldoNeto),
    };
  }
  