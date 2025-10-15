from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Ruta principal (Inicio)
@app.route('/')
def index():
    return render_template('index.html')

# ----------------------------
# RUTAS DE LAS OTRAS PÁGINAS
# ----------------------------
@app.route('/acerca')
def acerca():
    return render_template('acerca.html')

@app.route('/servicios')
def requisitos():
    return render_template('servicio.html')

@app.route('/formulario')
def formulario():
    return render_template('formulario.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

# ----------------------------
# PROCESAR FORMULARIO DE CONTACTO
# ----------------------------
@app.route('/enviar-contacto', methods=['POST'])
def enviar_contacto():
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        email = request.form.get('email')
        telefono = request.form.get('telefono')
        mensaje = request.form.get('mensaje')

        print("Nuevo contacto recibido:")
        print(f"Nombre: {nombre}")
        print(f"Email: {email}")
        print(f"Teléfono: {telefono}")
        print(f"Mensaje: {mensaje}")

        return jsonify({
            'success': True,
            'message': f'¡Gracias {nombre}! Hemos recibido tu mensaje.'
        })

# ----------------------------
# RUTA DE PRUEBA
# ----------------------------
@app.route('/test')
def test():
    return "¡Flask está funcionando correctamente!"

# ----------------------------
# EJECUTAR LA APLICACIÓN
# ----------------------------
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)



import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)




