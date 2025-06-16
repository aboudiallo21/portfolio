#!/usr/bin/env bash
# Script de build personnalisé pour Render

# Arrêter en cas d'erreur
set -o errexit

echo "Démarrage du processus de build sur Render..."

# Installer les dépendances
echo "Installation des dépendances Python..."
pip install -r requirements.txt

# Collecter les fichiers statiques
echo "Collecte des fichiers statiques..."
python manage.py collectstatic --noinput

# Appliquer les migrations
echo "Application des migrations de base de données..."
python manage.py migrate --noinput

echo "Build terminé avec succès !"
