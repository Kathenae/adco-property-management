<?php

use App\Models\Property;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->string('path');
            $table->string('disk')->default('local');
            $table->boolean('primary')->default(false);
            $table->timestamps();
        });

        Schema::create('image_property', function (Blueprint $table) {
            $table->foreignId('property_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('image_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->primary(['property_id', 'image_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_property');
        Schema::dropIfExists('images');
    }
};
