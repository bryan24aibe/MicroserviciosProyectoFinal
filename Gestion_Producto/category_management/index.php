<?php

use Slim\Factory\AppFactory;
use Bryan\CategoryManagement\Config\Database;

require __DIR__ . '/vendor/autoload.php';

// Conectar a la base de datos
Database::connect();

$app = AppFactory::create();

// Incluye las rutas desde la carpeta correcta
(require __DIR__ . '/src/Routes/categoryRoutes.php')($app);

$app->run();
