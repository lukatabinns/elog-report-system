<?php


namespace App\Repositories;


use App\Models\Job;
use Illuminate\Database\Eloquent\Collection;

class JobRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Job::class;

    /**
     * @return Collection|array
     */
    public function getAllJobs(): Collection|array
    {
        return $this->query()->orderBy('id','desc')->with(['property','user'])->get();
    }

    /**
     * @param array $data
     * @return bool
     */

    public function storeJob(array $data) : bool
    {

        if($this->create($data))
        {
            return true;
        }
        return false;
    }
}
