<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Intrant extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intrants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('num_affiche')->nullable();
            $table->string('nom_intrant',45);
            $table->integer('quantite_an')->nullable();;
            $table->boolean('ressource')->nullable();;
            $table->boolean('immobilisation')->nullable();;
            $table->integer('duree_vie_immo')->nullable();;
            $table->integer('NbTransport')->nullable();;
            $table->integer('provenance')->nullable();;
            $table->integer('GES_annuel')->nullable();;
            $table->string('Identifie_BD', 10)->nullable();;
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
        Schema::dropIfExists('intrants');
    }
}
