from . base import *

SECRET_KEY = 'django-insecure-75s69su#b^#flm1%=8@h$n)mulk!ts#f7gaega0e9kh096lp3p'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['airlocker.biz', 'www.airlocker.biz', '3.37.113.236']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
