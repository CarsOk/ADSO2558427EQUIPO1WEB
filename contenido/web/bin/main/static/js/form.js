function validarNumero() {
    var inputNumero = document.getElementById('numeroInput');
    var valor = parseFloat(inputNumero.value);

    // Verificar si el valor es negativo
    if (valor < 0) {
        // Si es negativo, ajustar el valor a 0
        inputNumero.value = 0;
    }
}