from flask import Blueprint, render_template
from helpers import token_required
from models import db, User, Recipe, recipe_schema, recipes_schema
from flask import Blueprint, request, jsonify, render_template
from flask_login import current_user

site = Blueprint('site', __name__, template_folder='site_templates')

@site.route('/')
def home():
    return render_template('index.html')

@site.route('/profile')
def profile():
    return render_template('profile.html')

@site.route('/recipe_card')
def recipe_card():
    return render_template('recipe_card.html', access_token=current_user.token)

# @site.route('/recipe_card<id>')
# def recipe_card(id):
#     print(f'THE ID is {id}!!!!!!!!!!!!!!!!!!!!!!!!!!!')
#     return render_template('recipe_card.html')  
    
@site.route('/recipes')
def recipes():
    all_recipes = Recipe.query
    # (['user_token']).where(('user_token' = current_user.token))
    print(f'HIIIIIIIIIIIIIIIIII {all_recipes}')
    
    recipes = [recipe for recipe in all_recipes if recipe.user_token == current_user.token]

    return render_template('recipes.html', title='Recipe Table', recipes=recipes, access_token=current_user.token)
