<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;

class storeImagesAwsS3 implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $images;
    protected $id;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($images)
    {
        $this->images = $images;
        // $this->id = $id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->images as $image) {

            // Generate a unique file name using the original file name and a random string
            $filename = Str::random(40) . '.' . $image->getClientOriginalName();
            try {
                $path = Storage::putFileAs('public/state', $image, $filename, 'public');
                $url = Storage::url($path);
            } catch (\Throwable $th) {
                return $th;
            }                
            //get the public image url
            $url = Storage::url($path);
            Image::create([
                'client_id' => 7,
                'path' => $path,
                'url' => $url,
            ]);
        }
    }
}
