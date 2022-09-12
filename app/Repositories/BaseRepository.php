<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

/**
 * Class BaseRepository.
 */
class BaseRepository
{
    /**
     * @return mixed
     */
    public function getAll()
    {
        return $this->query()->cursor();
    }

    /**
     * @return mixed
     */
    public function getCount()
    {
        return $this->query()->count();
    }

    /**
     * @param array $data
     * @return Model
     * @throws ModelNotFoundException
     */
    public function create(array $data) : Model
    {
        return $this->query()->create($data);
    }

    /**
     * @param $id
     * @throws ModelNotFoundException
     * @return Model
     */
    public function find($id) : Model
    {
        return $this->query()->findOrFail($id);
    }

    /**
     * @param $input
     * @throws ModelNotFoundException
     * @return Model
     */
    public function update($input) : Model
    {
        return $this->query()->update($input);
    }

    /**
     * @return mixed
     */
    public function query()
    {
        return call_user_func(static::MODEL.'::query');
    }
}
