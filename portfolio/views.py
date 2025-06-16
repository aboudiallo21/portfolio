from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.contrib import messages
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import smtplib
import logging
import json

# Configuration du logger
logger = logging.getLogger(__name__)

def log_smtp_info():
    """Affiche les informations de configuration SMTP actuelles"""
    logger.info("Configuration SMTP actuelle:")
    logger.info(f"EMAIL_BACKEND: {getattr(settings, 'EMAIL_BACKEND', 'Non défini')}")
    logger.info(f"EMAIL_HOST: {getattr(settings, 'EMAIL_HOST', 'Non défini')}")
    logger.info(f"EMAIL_PORT: {getattr(settings, 'EMAIL_PORT', 'Non défini')}")
    logger.info(f"EMAIL_USE_TLS: {getattr(settings, 'EMAIL_USE_TLS', 'Non défini')}")
    logger.info(f"EMAIL_HOST_USER: {getattr(settings, 'EMAIL_HOST_USER', 'Non défini')}")
    logger.info(f"DEFAULT_FROM_EMAIL: {getattr(settings, 'DEFAULT_FROM_EMAIL', 'Non défini')}")

# Vue pour la page d'accueil
class HomeView(TemplateView):
    template_name = 'index.html'

# Vue pour la page des compétences
class SkillsView(TemplateView):
    template_name = 'skills.html'

# Vue pour la page d'expérience
class ExperienceView(TemplateView):
    template_name = 'experience.html'

# Vue pour la page des projets
class ProjectsView(TemplateView):
    template_name = 'projects.html'

# Vue pour la page de contact
class ContactView(TemplateView):
    template_name = 'contact.html'
    
    def get(self, request, *args, **kwargs):
        # Afficher la configuration SMTP actuelle pour le débogage
        log_smtp_info()
        return super().get(request, *args, **kwargs)

@csrf_exempt
def send_message(request):
    log_smtp_info()
    
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Méthode non autorisée'}, status=405)
    
    try:
        # Récupérer les données du formulaire
        data = json.loads(request.body)
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
        
        logger.info(f"Données du formulaire - Nom: {name}, Email: {email}, Sujet: {subject}")
        
        # Validation des champs obligatoires
        if not all([name, email, subject, message]):
            logger.error("Tous les champs ne sont pas remplis")
            return JsonResponse({'success': False, 'error': 'Tous les champs sont obligatoires.'}, status=400)
            
        if '@' not in email or '.' not in email:
            logger.error(f"Email invalide: {email}")
            return JsonResponse({'success': False, 'error': 'Veuillez entrer une adresse email valide.'}, status=400)
        
        # Log des informations de l'email (même en mode production)
        logger.info(f"Envoi d'email à: {settings.DEFAULT_FROM_EMAIL}")
        logger.info(f"Sujet: [Portfolio] Nouveau message de {name}: {subject}")
        logger.info(f"Message: \nDe: {name} <{email}>\nSujet: {subject}\n\n{message}")
            
        # Envoi réel de l'email en production
        email_subject = f"[Portfolio] Nouveau message de {name}: {subject}"
        email_message = f"""
        Nouveau message depuis le formulaire de contact:
        
        Nom: {name}
        Email: {email}
        Sujet: {subject}
        
        Message:
        {message}
        """
        
        send_mail(
            subject=email_subject,
            message=email_message.strip(),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=False,
        )
        
        logger.info("Email envoyé avec succès!")
        return JsonResponse({
            'success': True, 
            'message': 'Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.'
        })
        
    except json.JSONDecodeError:
        logger.error("Erreur de décodage JSON")
        return JsonResponse({'success': False, 'error': 'Format de données invalide'}, status=400)
        
    except Exception as e:
        error_msg = f'Erreur lors de l\'envoi du message: {str(e)}'
        logger.error(error_msg, exc_info=True)
        return JsonResponse({'success': False, 'error': str(e)}, status=500)
