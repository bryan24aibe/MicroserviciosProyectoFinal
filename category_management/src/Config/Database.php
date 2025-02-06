<?php

namespace Bryan\CategoryManagement\Config;

use Illuminate\Database\Capsule\Manager as Capsule;

class Database
{
    public static function connect()
    {
        $capsule = new Capsule;

        // Configura la conexión a la base de datos
        $capsule->addConnection([
            'driver'    => 'mysql', // o 'pgsql' para PostgreSQL
            'host'      => 'localhost', // Cambia si es un servidor remoto
            'port'      => '3310', // Puerto MySQL personalizado
            'database'  => 'category_management', // Nombre de la base de datos
            'username'  => 'root', // Usuario de la base de datos
            'password'  => 'example', // Contraseña de la base de datos
            'charset'   => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
        ]);

        // Establece el uso global de Eloquent
        $capsule->setAsGlobal();
        $capsule->bootEloquent();
    }
}
