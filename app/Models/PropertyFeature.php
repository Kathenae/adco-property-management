<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'value',
        'property_id'
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
