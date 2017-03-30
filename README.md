# mvhbc17

built on [Django](https://www.djangoproject.com/)

requires [Python 2.7 or Python 3](https://www.python.org/)

requires [pip](https://pip.pypa.io/en/stable/)

## Dev Environment Installation Instructions

### Set up virtual env for isolated development Environment

[Virtual Env](http://python-guide-pt-br.readthedocs.io/en/latest/dev/virtualenvs/)

```
$ pip install virtualenv
$ cd dev_folder
$ virtualenv django
```

Once installed you can enter your virtual environment

```
$ cd django
$ source bin/activate
(django) MacBook-Pro-3:dev_folder [user]$
```

### Install Django

From your virtualenv folder you can install Django

```
$ pip install django
```

Test your install by outputting the version from the python console

```
$ python

>>> import django
>>> django.VERSION
```

You should see the current version output, example: (1, 10, 6, u'final', 0)

Quit the console

```
>>> quit()
```

## Clone the repo

From your virtual environment folder clone the repo of the project

```
$ git clone https://github.com/dwthomas77/mvhbc17.git
```

## Database Setup

Set up the database for your project.

```
$ cd mvhbc17
$ python manage.py migrate
```

## Run the webserver

You can now run the Django webserver and see the project serving from the virtual environment on a port of your localhost domain.

Start the development webserver

```
$ python manage.py runserver
```

go to localhost on your web browser

http://localhost:8000/

To run the application on a different port pass it as an argument after runserver

```
$ python manage.py runserver 4000
```

http://localhost:4000/
