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
        //
        Schema::create('attendances', function (Blueprint $table) {
            $table->string('id')->primary(); //memakai string karena untuk menimpan uu id
            $table->foreignId('user_id')->constrained(); //dihubungkan user_id yang ada di tabel user AND constrained dgunakan kalau ada perubahan atau delete bisa diatur
            $table->string('latitude', 50)->nullable();
            $table->string('longitude', 50)->nullable();
            $table->string('address', 500)->nullable();
            $table->enum('status', ['attend', 'sick', 'leave', 'permit', 'business_trip', 'remote']);
            $table->string('description', 500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
