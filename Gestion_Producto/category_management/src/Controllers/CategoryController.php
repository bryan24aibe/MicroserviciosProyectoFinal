<?php

namespace Bryan\CategoryManagement\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Bryan\CategoryManagement\Models\Category;

class CategoryController
{
    // Método para obtener todas las categorías
    public function getAll(Request $request, Response $response, $args)
    {
        // Obtén todas las categorías de la base de datos
        $categories = Category::all();

        // Convierte las categorías a formato JSON
        $response->getBody()->write($categories->toJson());

        return $response->withHeader('Content-Type', 'application/json');
    }
}
