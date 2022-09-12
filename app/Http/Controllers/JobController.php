<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateJobRequest;
use App\Repositories\JobRepository;
use App\Repositories\PropertiesRepository;
use App\Repositories\UserRespository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobController extends Controller
{
    protected PropertiesRepository $properties;
    protected JobRepository $jobRepository;
    protected UserRespository $userRespository;

    function __construct(PropertiesRepository $properties, JobRepository $jobRepository, UserRespository $userRespository)
    {
        $this->properties = $properties;
        $this->jobRepository = $jobRepository;
        $this->userRespository = $userRespository;
    }

    public function index(): View|Application
    {
        return view("app");
    }

    /**
     * @return JsonResponse
     */
    public function getProperties() : JsonResponse
    {
        $properties = $this->properties->getAllProperties();
        return response()->json(['success' => 'received data', 'properties' => $properties], 200);
    }

    /**
     * @return JsonResponse
     */
    public function getUsers() : JsonResponse
    {
        $users = $this->userRespository->getAllUsers();
        return response()->json(['success' => 'received data', 'users' => $users], 200);
    }

    /**
     * @param CreateJobRequest $request
     * @return JsonResponse
     */
    public function storeJob(CreateJobRequest $request) : JsonResponse
    {
        $input = $request->all();
        $this->jobRepository->storeJob($input);
        return response()->json(['success' => "job created"], 201);
    }

    /**
     * @return JsonResponse
     */
    public function getJobs() : JsonResponse
    {
        $jobs = $this->jobRepository->getAllJobs();
        return response()->json(['success' => 'received data', 'jobs' => $jobs], 200);
    }
}
