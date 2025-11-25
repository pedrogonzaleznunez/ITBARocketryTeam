#!/bin/bash

# Script para iniciar el servidor con ngrok
# Esto permite acceder desde cualquier dispositivo sin configurar firewall
# Uso: ./dev-ngrok.sh [puerto] [dominio]
# Ejemplos:
#   ./dev-ngrok.sh 3000                              # URL aleatoria (plan gratuito)
#   ./dev-ngrok.sh 3000 mi-subdominio                # Subdominio fijo (plan de pago)
#   ./dev-ngrok.sh 3000 mi-dominio.com               # Dominio personalizado (plan de pago)

PORT=${1:-3000}
DOMAIN=${2:-""}

# Colores para la salida
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   ITBA Rocketry Team - Dev Server${NC}"
echo -e "${BLUE}   con ngrok (Acceso desde Internet)${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verificar si ngrok está instalado
if ! command -v ngrok &> /dev/null; then
    echo -e "${RED}✗ ngrok no está instalado${NC}"
    echo ""
    echo -e "${YELLOW}Para instalar ngrok:${NC}"
    echo ""
    echo -e "${BLUE}Opción 1: Desde el sitio web (recomendado)${NC}"
    echo -e "${GREEN}   1. Descarga ngrok desde: https://ngrok.com/download${NC}"
    echo -e "${GREEN}   2. Extrae el binario a /usr/local/bin/ o ~/bin/${NC}"
    echo -e "${GREEN}   3. O instala con snap: sudo snap install ngrok${NC}"
    echo ""
    echo -e "${BLUE}Opción 2: Con npm (ngrok local)${NC}"
    echo -e "${GREEN}   npm install -g ngrok${NC}"
    echo ""
    echo -e "${BLUE}Opción 3: Con Homebrew (si tienes brew en WSL)${NC}"
    echo -e "${GREEN}   brew install ngrok/ngrok/ngrok${NC}"
    echo ""
    echo -e "${YELLOW}Después de instalar, configura tu authtoken:${NC}"
    echo -e "${GREEN}   ngrok config add-authtoken TU_TOKEN${NC}"
    echo -e "${YELLOW}   Obtén tu token en: https://dashboard.ngrok.com/get-started/your-authtoken${NC}"
    echo ""
    exit 1
fi

# Verificar si ngrok está autenticado
if ! ngrok config check &> /dev/null; then
    echo -e "${YELLOW}⚠️  ngrok no está configurado con authtoken${NC}"
    echo -e "${YELLOW}   Configúralo con:${NC}"
    echo -e "${GREEN}   ngrok config add-authtoken TU_TOKEN${NC}"
    echo -e "${YELLOW}   Obtén tu token gratuito en: https://dashboard.ngrok.com/get-started/your-authtoken${NC}"
    echo ""
    read -p "¿Deseas continuar de todos modos? (s/N): " CONTINUE
    if [ "$CONTINUE" != "s" ] && [ "$CONTINUE" != "S" ]; then
        exit 1
    fi
fi

echo -e "${GREEN}✓ ngrok encontrado${NC}"

# Información sobre dominio personalizado
if [ -n "$DOMAIN" ]; then
    echo -e "${BLUE}   Usando dominio personalizado: ${DOMAIN}${NC}"
    echo -e "${YELLOW}   ⚠️  Nota: Requiere un plan de pago de ngrok${NC}"
    echo -e "${YELLOW}   Configura el dominio en: https://dashboard.ngrok.com/cloud-edge/domains${NC}"
    echo ""
else
    echo -e "${YELLOW}   Usando URL aleatoria (plan gratuito)${NC}"
    echo ""
fi

echo -e "${BLUE}Iniciando servidor Next.js en el puerto ${PORT}...${NC}"
echo ""

# Variable para el PID del proceso tail
TAIL_PID=""

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo -e "${YELLOW}Cerrando servidor y ngrok...${NC}"
    # Matar proceso de tail si existe
    [ -n "$TAIL_PID" ] && kill $TAIL_PID 2>/dev/null
    pkill -P $$ tail 2>/dev/null
    kill $NGROK_PID 2>/dev/null
    kill $NEXT_PID 2>/dev/null
    wait $NGROK_PID 2>/dev/null
    wait $NEXT_PID 2>/dev/null
    echo -e "${GREEN}✓ Limpieza completada${NC}"
    exit 0
}

# Capturar señales de interrupción
trap cleanup SIGINT SIGTERM

# Iniciar Next.js en segundo plano
echo -e "${BLUE}Iniciando servidor Next.js...${NC}"
export PORT=$PORT
# Guardar logs en archivo para poder mostrarlos después
npm run dev -- -H 0.0.0.0 -p $PORT > /tmp/nextjs-output.log 2>&1 &
NEXT_PID=$!

# Esperar un momento para que Next.js empiece
sleep 2

# Verificar que el servidor esté corriendo
if ! ps -p $NEXT_PID > /dev/null; then
    echo -e "${RED}✗ Error al iniciar el servidor Next.js${NC}"
    echo -e "${YELLOW}Revisa los logs:${NC}"
    cat /tmp/nextjs-output.log
    exit 1
fi

# Mostrar los primeros logs para verificar que está iniciando
echo -e "${GREEN}✓ Servidor Next.js iniciado (PID: $NEXT_PID)${NC}"
echo -e "${YELLOW}Esperando a que el servidor esté listo...${NC}"
sleep 2

# Iniciar ngrok
echo -e "${BLUE}Iniciando túnel ngrok...${NC}"
if [ -n "$DOMAIN" ]; then
    # Usar dominio personalizado o subdominio fijo
    # Verificar si el dominio incluye punto (es dominio completo o subdominio.ngrok-free.app)
    if [[ "$DOMAIN" == *.* ]]; then
        # Es un dominio completo (ej: mi-dominio.com) o ya tiene .ngrok-free.app
        ngrok http --domain="$DOMAIN" $PORT > /tmp/ngrok.log 2>&1 &
    else
        # Es solo el nombre del subdominio (ej: mi-subdominio)
        # Intentar con .ngrok-free.app primero (ngrok v3+)
        # Si no funciona, el usuario puede especificar el dominio completo
        echo -e "${YELLOW}   Intentando con: ${DOMAIN}.ngrok-free.app${NC}"
        ngrok http --domain="${DOMAIN}.ngrok-free.app" $PORT > /tmp/ngrok.log 2>&1 &
        
        # Nota: Si el subdominio usa .ngrok.app en lugar de .ngrok-free.app, 
        # el usuario debe especificarlo completo: ./dev-ngrok.sh 3000 mi-subdominio.ngrok.app
    fi
else
    # URL aleatoria (plan gratuito)
    ngrok http $PORT > /tmp/ngrok.log 2>&1 &
fi
NGROK_PID=$!

# Esperar a que ngrok se conecte
sleep 4

# Obtener la URL pública de ngrok
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"https://[^"]*' | grep -o 'https://[^"]*' | head -n 1)

if [ -z "$NGROK_URL" ]; then
    echo -e "${YELLOW}⚠️  No se pudo obtener la URL de ngrok automáticamente${NC}"
    echo -e "${YELLOW}   Accede a http://localhost:4040 para ver la URL manualmente${NC}"
    NGROK_URL="http://localhost:4040"
else
    echo ""
    echo -e "${GREEN}✓ Servidor iniciado exitosamente!${NC}"
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}   URLs de acceso:${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    echo -e "${GREEN}📱 URL Pública (accede desde cualquier dispositivo):${NC}"
    echo -e "${GREEN}   ${NGROK_URL}${NC}"
    echo ""
    echo -e "${BLUE}💻 URL Local:${NC}"
    echo -e "${BLUE}   http://localhost:${PORT}${NC}"
    echo ""
    echo -e "${BLUE}📊 Panel de ngrok:${NC}"
    echo -e "${BLUE}   http://localhost:4040${NC}"
    echo ""
    if [ -n "$DOMAIN" ]; then
        echo -e "${GREEN}✓ URL fija configurada: ${DOMAIN}${NC}"
        echo -e "${YELLOW}   Esta URL se mantendrá igual en cada inicio${NC}"
    else
        echo -e "${YELLOW}⚠️  Nota: La URL pública de ngrok cambia cada vez que reinicias${NC}"
    fi
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo ""
fi

# Mostrar logs en tiempo real
echo -e "${BLUE}Presiona Ctrl+C para detener el servidor y ngrok${NC}"
echo ""
echo -e "${YELLOW}════════════════════════════════════════${NC}"
echo -e "${YELLOW}   Logs en tiempo real (Next.js):${NC}"
echo -e "${YELLOW}════════════════════════════════════════${NC}"
echo ""

# Mostrar logs de Next.js en tiempo real con prefijo
# Usamos tail -f para seguir el archivo y agregar el prefijo de color
tail -f /tmp/nextjs-output.log 2>/dev/null | while IFS= read -r line; do
    echo -e "${GREEN}[Next.js]${NC} $line"
done &
TAIL_PID=$!

# Esperar a que terminen los procesos principales
# Cuando Next.js termine, tail también se detendrá automáticamente
wait $NEXT_PID 2>/dev/null || true
wait $NGROK_PID 2>/dev/null || true

# Limpiar proceso de tail (por si acaso)
kill $TAIL_PID 2>/dev/null || true

