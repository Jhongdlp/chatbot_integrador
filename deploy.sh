#!/bin/bash
# Script para desplegar a Vercel con todas las verificaciones

echo "🚀 DEPLOYMENT A VERCEL - EMPODERATECH CHATBOT"
echo "=============================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encuentra package.json${NC}"
    echo "Ejecuta este script desde el directorio raíz del proyecto"
    exit 1
fi

echo -e "${YELLOW}📋 Paso 1: Verificando instalación de Vercel CLI...${NC}"
if ! npx vercel --version > /dev/null 2>&1; then
    echo -e "${RED}❌ Vercel CLI no encontrado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Vercel CLI instalado${NC}"
echo ""

echo -e "${YELLOW}📋 Paso 2: Verificando variables de entorno locales...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Archivo .env no encontrado${NC}"
    echo "Crea un archivo .env con tus variables de entorno"
    exit 1
fi

# Verificar que existan las variables críticas
required_vars=("SUPABASE_URL" "SUPABASE_SERVICE_ROLE_KEY" "OPENAI_API_KEY" "UPSTASH_REDIS_REST_URL")
for var in "${required_vars[@]}"; do
    if ! grep -q "^${var}=" .env; then
        echo -e "${YELLOW}⚠️  Variable ${var} no encontrada en .env${NC}"
    else
        echo -e "${GREEN}✅ ${var} configurada${NC}"
    fi
done
echo ""

echo -e "${YELLOW}📋 Paso 3: Construyendo proyecto localmente (prueba)...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
else
    echo -e "${RED}❌ Error en build. Revisa los errores antes de desplegar${NC}"
    exit 1
fi
echo ""

echo -e "${YELLOW}🔐 Paso 4: Configuración de Variables de Entorno en Vercel${NC}"
echo ""
echo "IMPORTANTE: Antes de continuar, asegúrate de haber configurado las siguientes"
echo "variables de entorno en Vercel (Dashboard o CLI):"
echo ""
echo "  • UPSTASH_REDIS_REST_URL"
echo "  • UPSTASH_REDIS_REST_TOKEN"
echo "  • SUPABASE_URL"
echo "  • SUPABASE_SERVICE_ROLE_KEY"
echo "  • OPENAI_API_KEY"
echo ""
echo "Para configurarlas por CLI:"
echo "  npx vercel env add NOMBRE_VARIABLE"
echo ""
read -p "¿Ya configuraste las variables de entorno en Vercel? (s/n): " confirm

if [ "$confirm" != "s" ] && [ "$confirm" != "S" ]; then
    echo -e "${YELLOW}⏸  Deployment pausado. Configura las variables y vuelve a ejecutar${NC}"
    exit 0
fi
echo ""

echo -e "${YELLOW}🚀 Paso 5: Desplegando a Vercel...${NC}"
echo ""
echo "Selecciona el tipo de deployment:"
echo "  1) Preview (staging) - deployment de prueba"
echo "  2) Production - deployment oficial"
echo ""
read -p "Elige opción (1 o 2): " deploy_type

if [ "$deploy_type" = "2" ]; then
    echo -e "${YELLOW}Desplegando a PRODUCTION...${NC}"
    npx vercel --prod
else
    echo -e "${YELLOW}Desplegando a PREVIEW...${NC}"
    npx vercel
fi

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}=============================================="
    echo -e "✅ DEPLOYMENT EXITOSO!"
    echo -e "==============================================${NC}"
    echo ""
    echo "🔍 Próximos pasos:"
    echo "  1. Visita la URL proporcionada por Vercel"
    echo "  2. Abre el chatbot (botón flotante)"
    echo "  3. Prueba con: '¿Qué es EMPODERATECH?'"
    echo "  4. Verifica que aparezca el badge RAG"
    echo ""
    echo "📊 Ver logs:"
    echo "  npx vercel logs --follow"
    echo ""
else
    echo -e "${RED}❌ Error en deployment. Revisa los logs:${NC}"
    echo "  npx vercel logs"
    exit 1
fi
