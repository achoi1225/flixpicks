from flask import Blueprint, jsonify, request
import requests
import os
from app.models import db, Trailer


