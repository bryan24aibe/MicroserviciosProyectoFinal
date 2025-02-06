<?php
use Slim\App;
use Bryan\CategoryManagement\Controllers\CategoryController;

return function (App $app) {
    $app->get('/categories', [CategoryController::class, 'getAll']);
};
