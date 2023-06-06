// Obtener referencias a los elementos HTML relevantes
const ingredientesDiv = document.querySelector(".row.ps-3");
const ingredientesSeleccionados = document.querySelector(".ingredientes");
const ingredientesExtrasSeleccionados = document.querySelector(
  ".ingredientes_extras"
);
const extrasDiv = document.querySelector(".resumen_extra");
const propinaInput = document.querySelector("#propina");
const propinaBtn = document.querySelector("#propina-btn");
const enviarBtn = document.querySelector("#enviar-btn");
const extrasText = document.querySelector(".extras");
const precioExtrasText = document.querySelector(".precio_extra");
const propinaText = document.querySelector(".propina");
const montoPropinaText = document.querySelector(".monto_propina");
const productoText = document.querySelector(".producto");
const precioText = document.querySelector(".precio");

const ingredientesGratis = 3;
let ingredientesExtras = [];

function actualizarResumenPedido() {
  // Actualizar los ingredientes seleccionados
  ingredientesSeleccionados.textContent = ingredientesExtras
    .slice(0, ingredientesGratis)
    .join(", ");
  ingredientesExtrasSeleccionados.textContent = ingredientesExtras
    .slice(ingredientesGratis)
    .join(", ");

  // Calcular el precio de los ingredientes extras
  const precioExtras =
    Math.max(0, ingredientesExtras.length - ingredientesGratis) * 800;

  extrasText.textContent =
    ingredientesExtras.length > ingredientesGratis
      ? `${ingredientesExtras.length - ingredientesGratis} Extras`
      : "";
  precioExtrasText.textContent =
    ingredientesExtras.length > ingredientesGratis ? `$${precioExtras}` : "";

  const propina =
    propinaInput.value === "" ? 1000 : parseInt(propinaInput.value, 10);

  propinaText.textContent = "Propina";
  montoPropinaText.textContent = `$${propina}`;

  const precioTotal = 15000 + precioExtras + propina;

  productoText.textContent = "Pizza XL";
  precioText.textContent = `$${precioTotal}`;
}

propinaBtn.addEventListener("click", () => {
  actualizarResumenPedido();
});

enviarBtn.addEventListener("click", () => {
  if (propinaInput.value === "") {
    alert("Por favor, ingresa un monto de propina antes de enviar el pedido.");
  } else {
    // Mostrar el mensaje de alerta con el monto total del pedido
    const propina = parseInt(propinaInput.value, 10);
    const precioTotal =
      15000 + (ingredientesExtras.length - ingredientesGratis) * 800 + propina;
    const mensaje = `¡Gracias por tu pedido! El monto total es $${precioTotal}. Tu pizza XL será enviada con una propina de $${propina}.`;
    alert(mensaje);
  }
});

// Eventos de cambio en los ingredientes seleccionados
ingredientesDiv.addEventListener("change", () => {
  ingredientesExtras = [];

  const checkboxes = Array.from(
    ingredientesDiv.querySelectorAll('input[type="checkbox"]')
  );
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      ingredientesExtras.push(checkbox.value);
    }
  });

  actualizarResumenPedido();
});

actualizarResumenPedido();
