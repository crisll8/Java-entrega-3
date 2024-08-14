function convertir() {
    const precios = { havanna: 6180, bbva: 3880 };
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let contador = todos.length + 1;

    document.getElementById("btn-add").addEventListener("click", async () => {
        const { value: dni } = await Swal.fire({
            title: 'Ingrese su DNI',
            input: 'text',
            inputPlaceholder: 'Ingrese su DNI para realizar una nueva compra/venta',
            showCancelButton: true,
            inputValidator: value => !value && '¡Debes ingresar un DNI!'
        });

        if (!dni) return;

        let todo = { id: contador, text: dni, completed: false };
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        contador++;

        const { value: acciónSeleccionada } = await Swal.fire({
            title: 'Seleccione una acción',
            input: 'radio',
            inputOptions: {
                havanna: 'Havanna',
                bbva: 'BBVA'
            },
            inputValidator: value => !value && '¡Debes seleccionar una acción!'
        });

        if (!acciónSeleccionada) return;

        const { value: cantidad } = await Swal.fire({
            title: `Ingrese la cantidad de acciones (${acciónSeleccionada.toUpperCase()})`,
            input: 'number',
            inputPlaceholder: 'Cantidad de acciones',
            inputValidator: value => {
                if (!value) return '¡Debes ingresar una cantidad!';
                if (value <= 0) return 'La cantidad debe ser mayor a cero';
            }
        });

        if (!cantidad) return;

        const total = cantidad * precios[acciónSeleccionada];
        
        Swal.fire({
            title: 'Resultado',
            text: `El total de sus acciones al precio de hoy es de $${total} pesos argentinos`,
            icon: 'success'
        });
    });
}

convertir();
