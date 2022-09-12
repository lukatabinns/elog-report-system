<?php


namespace App\Repositories;

use App\Models\Property;
use Illuminate\Database\Eloquent\Collection;

class PropertiesRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Property::class;

    /**
     * @return Collection|array
     */
    public function getAllProperties(): Collection|array
    {
        return $this->query()->get();
    }
}
