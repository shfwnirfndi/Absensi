<?php

namespace App\Models;

use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Concerns\Hasuuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasUuids;
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s', //pengaturan format tanggal pada attendances
    ];

    protected $fillable = [
        'user_id',
        'latitude',
        'longitude',
        'address',
        'status',
        'description',
    ];

    public function newUniqueId()
    {
        return (string) Uuid::uuid4();
    }

    public function user(): BelongsTo
    {
        //ada 2 table
        //table users adalah data utama (id)
        //table attendances adalah table tamu (userId)

        //kalau kamu dari tabel user mau akses tabel attendances sebagai relationsnya, itu pakai has many
        //kalau dati tabel attendance mau akses ke tabel utama nya (users), itu pakai belongTo

        return $this->belongsTo(User::class);
    }
}
