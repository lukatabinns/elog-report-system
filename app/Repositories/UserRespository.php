<?php

namespace App\Repositories;

use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class UserRespository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = User::class;

    /**
     * @return Collection
     *
     */
    public function getAllUsers(): Collection
    {
        try
        {
            return $this->query()
                ->select(['id','users.id_number as number'])
                ->get();
        }
        catch(Exception $e)
        {
            dd($e->getMessage());
        }
    }
}
