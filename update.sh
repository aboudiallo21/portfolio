#!/usr/bin/env bash
# Script pour mettre à jour l'application en production

# Arrêter en cas d'erreur
set -o errexit

# Activer le mode débogage (désactiver en production)
# set -x

echo "Mise à jour de l'application..."

# Mettre à jour le code source
echo "Mise à jour du code source..."
git pull

# Installer les dépendances
echo "Installation des dépendances..."
pip install -r requirements.txt

# Appliquer les migrations
echo "Application des migrations..."
python manage.py migrate --noinput

# Collecter les fichiers statiques
echo "Collecte des fichiers statiques..."
python manage.py collectstatic --noinput --clear

# Redémarrer les services si nécessaire
echo "Redémarrage des services..."
# Décommentez et modifiez selon votre configuration
# systemctl restart gunicorn
# systemctl restart nginx

echo "Mise à jour terminée avec succès !"
