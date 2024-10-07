<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

enum AvailabilityStatus: string {
    case OCCUPIED = "occupied";
    case AVAILABLE = "available";
    case SOLD = "sold";
}

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
        'size_sqft',
        'type',
        'availability_status',
    ];

    public function amenities() {
        return $this->belongsToMany(Amenity::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function contacts() {
        return $this->belongsToMany(Contact::class);
    }

    public function images() {
        return $this->belongsToMany(Image::class);
    }
}
