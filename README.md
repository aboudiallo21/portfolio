# Portfolio Django

Ceci est un portfolio développé avec Django, déployé sur Render.

## Configuration requise

- Python 3.10.13
- pip

## Installation en local

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/portfolio-django.git
   cd portfolio-django
   ```

2. Créez et activez un environnement virtuel :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Windows : venv\Scripts\activate
   ```

3. Installez les dépendances :
   ```bash
   pip install -r requirements.txt
   ```

4. Effectuez les migrations :
   ```bash
   python manage.py migrate
   ```

5. Créez un superutilisateur (optionnel) :
   ```bash
   python manage.py createsuperuser
   ```

6. Lancez le serveur de développement :
   ```bash
   python manage.py runserver
   ```

## Déploiement sur Render

1. Poussez votre code sur un dépôt Git (GitHub, GitLab, etc.)

2. Créez un compte sur [Render](https://render.com/)

3. Dans le tableau de bord Render, cliquez sur "New" puis "Web Service"

4. Connectez votre dépôt Git

5. Configurez le service :
   - **Name** : portfolio-django (ou le nom de votre choix)
   - **Region** : Choisissez la région la plus proche de vos utilisateurs
   - **Branch** : main (ou la branche que vous souhaitez déployer)
   - **Build Command** : `./build.sh`
   - **Start Command** : `gunicorn portfolio_django.wsgi:application --log-file -`

6. Ajoutez les variables d'environnement :
   - `DEBUG` : `False`
   - `DJANGO_SETTINGS_MODULE` : `portfolio_django.settings`
   - `PYTHON_VERSION` : `3.10.13`
   - `SECRET_KEY` : Générez une clé secrète sécurisée
   - `DATABASE_URL` : Render fournira automatiquement une URL de base de données PostgreSQL

7. Cliquez sur "Create Web Service"

Votre application sera déployée automatiquement. Une fois le déploiement terminé, vous recevrez une URL pour accéder à votre application.

## Structure du projet

```
portfolio_django/
├── manage.py
├── requirements.txt
├── runtime.txt
├── Procfile
├── build.sh
├── render.yaml
├── .gitignore
├── portfolio_django/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── portfolio/
    ├── migrations/
    ├── static/
    ├── templates/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    ├── urls.py
    └── views.py
```

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
