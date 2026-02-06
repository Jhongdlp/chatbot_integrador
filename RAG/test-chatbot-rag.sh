#!/bin/bash
# Script de prueba para verificar la integración RAG del chatbot

echo "🧪 Testing RAG Integration - EMPODERATECH Chatbot"
echo "=================================================="
echo ""

# Test questions
questions=(
  "¿Qué es EMPODERATECH?"
  "¿Cuáles son las fases de la Ruta de Transformación Digital?"
  "¿Quiénes son los aliados estratégicos?"
  "¿Qué ofrece la Fase 1?"
)

API_URL="${1:-http://localhost:3000/api/chat}"

echo "API Endpoint: $API_URL"
echo ""

for i in "${!questions[@]}"; do
  question="${questions[$i]}";
  echo "Test $((i+1)): $question"
  echo "-------------------------------------------"
  
  response=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"messages\": [{\"role\": \"user\", \"content\": \"$question\"}],
      \"sessionId\": \"test-session-$(date +%s)\"
    }")
  
  if [ $? -eq 0 ]; then
    echo "$response" | jq -r '.content // "Error: No content"' | head -n 5
    docs=$(echo "$response" | jq -r '.metadata.documentsRetrieved // 0')
    echo ""
    echo "📊 Documentos recuperados: $docs"
    
    if [ "$docs" -gt 0 ]; then
      echo "✅ RAG Working"
    else
      echo "⚠️  No RAG context"
    fi
  else
    echo "❌ API Error"
  fi
  
  echo ""
  echo ""
done

echo "=================================================="
echo "✨ Test completed"
