<?php

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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->float('size_sqft');
            $table->decimal('price');
            $table->string('type');
            $table->enum('availability_status', ['occupied', 'available', 'sold']);
            $table->foreignId('user_id')->constrained();
            $table->timestamp('published_at')->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
