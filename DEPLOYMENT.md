# Déploiement sur Render

Ce guide explique comment déployer cette application Django sur Render.

## Prérequis

- Un compte [Render](https://render.com/)
- Un dépôt Git (GitHub, GitLab ou Bitbucket) contenant votre code
- Python 3.10.13 installé localement

## Configuration du projet

### Fichiers nécessaires

Assurez-vous d'avoir les fichiers suivants dans votre projet :

- `requirements.txt` - Liste des dépendances Python
- `runtime.txt` - Version de Python à utiliser
- `Procfile` - Configuration pour le serveur web
- `render.yaml` - Configuration du déploiement Render
- `render-build.sh` - Script de build personnalisé
- `.env.example` - Exemple de variables d'environnement

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables nécessaires :

```bash
# Copiez le contenu de .env.example et ajustez les valeurs
cp .env.example .env
```

## Déploiement sur Render

### 1. Pousser le code sur un dépôt Git

Assurez-vous que tout votre code est poussé sur votre dépôt Git (GitHub, GitLab ou Bitbucket).

### 2. Créer un nouveau service Web sur Render

1. Connectez-vous à votre compte [Render](https://dashboard.render.com/)
2. Cliquez sur "New" puis sélectionnez "Web Service"
3. Connectez votre compte GitHub/GitLab/Bitbucket si ce n'est pas déjà fait
4. Sélectionnez votre dépôt

### 3. Configurer le service Web

- **Name** : `portfolio-django` (ou le nom de votre choix)
- **Region** : Choisissez la région la plus proche de vos utilisateurs
- **Branch** : `main` (ou la branche que vous souhaitez déployer)
- **Build Command** : `./render-build.sh`
- **Start Command** : `gunicorn portfolio_django.wsgi:application --log-file -`

### 4. Configurer les variables d'environnement

Ajoutez les variables d'environnement nécessaires :

- `PYTHON_VERSION` : `3.10.13`
- `PYTHONUNBUFFERED` : `True`
- `PYTHONDONTWRITEBYTECODE` : `1`
- `DJANGO_SETTINGS_MODULE` : `portfolio_django.settings`
- `DEBUG` : `False` (en production)
- `SECRET_KEY` : Générez une clé sécurisée (Render peut le faire automatiquement)
- `WEB_CONCURRENCY` : `4` (ajustez selon les besoins)
- `DISABLE_COLLECTSTATIC` : `0`

### 5. Démarrez le déploiement

Cliquez sur "Create Web Service" pour démarrer le déploiement. Render va :

1. Cloner votre dépôt
2. Exécuter le script de build (`render-build.sh`)
3. Démarrer votre application avec Gunicorn

## Mise à jour de l'application

Pour mettre à jour votre application :

1. Poussez vos modifications sur votre dépôt Git
2. Render détectera automatiquement les changements et redéploiera l'application

Ou manuellement :

1. Allez sur le tableau de bord Render
2. Sélectionnez votre service
3. Allez dans l'onglet "Manual Deploy"
4. Sélectionnez la branche et cliquez sur "Deploy"

## Dépannage

### Vérifiez les logs

Les logs sont disponibles dans l'onglet "Logs" de votre service sur le tableau de bord Render.

### Problèmes courants

1. **Échec du build** : Vérifiez les logs de build pour les erreurs de dépendances manquantes
2. **Erreurs 500** : Vérifiez les logs d'application et assurez-vous que `DEBUG=False` n'est pas actif en production
3. **Fichiers statiques non chargés** : Vérifiez que `collectstatic` s'exécute correctement pendant le build

## Sécurité

- Ne laissez jamais `DEBUG=True` en production
- Utilisez toujours HTTPS
- Gardez vos secrets (comme `SECRET_KEY`) dans des variables d'environnement, jamais dans le code source
- Mettez à jour régulièrement vos dépendances pour corriger les failles de sécurité

## Évolutivité

Pour augmenter les performances de votre application :

1. Passez au plan "Standard" sur Render
2. Augmentez le nombre d'instances
3. Activez l'auto-scaling si nécessaire

## Support

Pour toute question ou problème, consultez la [documentation de Render](https://render.com/docs) ou créez une issue sur le dépôt du projet.
