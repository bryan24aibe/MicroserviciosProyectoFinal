<?php

namespace Bryan\CategoryManagement\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // Define la tabla de la base de datos
    protected $table = 'categories';

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = ['name'];
}
