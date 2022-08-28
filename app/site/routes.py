from flask import Blueprint, render_template
from helpers import token_required
from models import db, User, Recipe, recipe_schema, recipes_schema
from flask import Blueprint, request, jsonify, render_template

site = Blueprint('site', __name__, template_folder='site_templates')

@site.route('/')
def home():
    return render_template('index.html')

@site.route('/profile')
def profile():
    return render_template('profile.html')

@site.route('/recipe_card')
def recipe_card():
    return render_template('recipe_card.html')
    
@site.route('/recipes')
def recipes():
    recipes = Recipe.query
    return render_template('recipes.html', title='Recipe Table', recipes=recipes)

