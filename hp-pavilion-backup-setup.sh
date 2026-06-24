#!/bin/bash
set -euo pipefail

echo "=== Setup HP Pavilion 15-cd006la ==="
echo "Hardware: AMD A12-9720P | 8GB RAM | RX 540 | HDD 5400 RPM"
echo

# 1. Dependencias básicas
echo "[1/6] Instalando dependencias..."
sudo apt update
sudo apt install -y curl wget git python3 python3-pip ufw

# 2. Instalar Ollama
echo "[2/6] Instalando Ollama..."
if ! command -v ollama &>/dev/null; then
  curl -fsSL https://ollama.com/install.sh | sh
else
  echo "Ollama ya instalado, saltando."
fi

# 3. Ajustes de sistema para HDD mecánico y memoria
echo "[3/6] Aplicando tuned profile para laptop..."
sudo systemctl disable bluetooth.service 2>/dev/null || true
echo "vm.swappiness = 60" | sudo tee /etc/sysctl.d/99-hp-pavilion.conf >/dev/null
sudo sysctl -p /etc/sysctl.d/99-hp-pavilion.conf

# 4. Descargar modelos livianos (3B parámetros, cuantizados)
echo "[4/6] Descargando modelo principal: qwen2.5:3b (4GB)..."
ollama pull qwen2.5:3b

echo "Descargando modelo rápido: gemma2:2b (1.5GB)..."
ollama pull gemma2:2b

# 5. Configurar servicio Ollama en arranque
echo "[5/6] Habilitando Ollama en boot..."
sudo systemctl enable --now ollama

# 6. Crear alias útiles
echo "[6/6] Agregando aliases..."
{
  echo 'alias ask="ollama run qwen2.5:3b"'
  echo 'alias ask-fast="ollama run gemma2:2b"'
  echo 'alias llm-server="./~/.local/bin/ollama serve"'
} >> ~/.bashrc

echo
echo "=== Setup completo ==="
echo
echo "Para probar:"
echo "  ollama run qwen2.5:3b"
echo
echo "Modelos disponibles:"
echo "  - qwen2.5:3b  (principal, 4GB)  → mejor razonamiento/tool use"
echo "  - gemma2:2b   (respuesta, 1.5GB) → respuestas rápidas"
echo
echo "Para exponer por web (opcional, siguiente paso):"
echo "  pip install open-webui && open-webui serve"
echo
