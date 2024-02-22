<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('states', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('client_id');//the owner
            $table->string('short_description');
            $table->string('situation');//new or used
            $table->boolean('avaliable');//avaliable or not
            $table->string('street');
            $table->string('number')->nullable();
            $table->string('neighbor');
            $table->string('city');
            $table->string('cep');
            $table->longText('path_image')->nullable();
            $table->longText('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('states');
    }
};
