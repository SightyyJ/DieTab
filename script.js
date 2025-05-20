const form = document.getElementById('formulario');
const resultadoDiv = document.getElementById('resultado');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultadoDiv.innerHTML = '<p>Generando dieta, por favor espera...</p>';

  const data = {
    peso: document.getElementById('peso').value,
    talla: document.getElementById('talla').value,
    edad: document.getElementById('edad').value,
    enfermedad: document.getElementById('enfermedad').value,
  };

  try {
    const res = await fetch('/api/diet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    resultadoDiv.innerHTML = `<pre>${json.dieta}</pre>`;
  } catch (err) {
    resultadoDiv.innerHTML = '<p>Error al generar dieta.</p>';
  }
});