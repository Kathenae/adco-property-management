<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'address',
        'city',
        'state',
        'price',
        'type',
        'status',
    ];

    public function features() {
        return $this->hasMany(PropertyFeature::class);
    }

    public function creator() {
        return $this->belongsTo(User::class);
    }

    public function contacts() {
        return $this->hasMany(ContactInfo::class);
    }

    public function images() {
        return $this->hasMany(Image::class);
    }
}
