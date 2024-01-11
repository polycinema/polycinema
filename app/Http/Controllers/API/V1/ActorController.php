<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Actor;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ActorController extends Controller
{
    // Ẩn hiện Actor 
    public function changeLevelActor(Request $request)
    {
        // Post request id Actor
        try {
            $actor = Actor::find($request->actor_id);

            $level_actor = $actor->level;

            switch ($level_actor) {
                case Actor::LEVEL_HIDE:
                    $actor->level = Actor::LEVEL_SHOW;
                    $message = "Đã khôi phục diễn viên $actor->name";
                    break;
                case Actor::LEVEL_SHOW:
                    $actor->level = Actor::LEVEL_HIDE;
                    $message = "Đã ẩn diễn viên $actor->name";
                    break;
            }

            $actor->save();

            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('ActorController@changeLevelActor: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function searchActorByName(Request $request)
    {
        try {
            $actors = Actor::where('name', 'LIKE', '%' . $request->actor_name . '%')
                ->where('level', 'show')
                ->get();

            if ($actors->isEmpty()) {
                return response()->json([
                    'message' => "Không tồn tại diễn viên $request->actor_name"
                ], Response::HTTP_OK);
            }

            return response()->json([
                'data' => $actors
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('ActorController@searchActorByName: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function listActorInTrash()
    {
        try {
            $actors = Actor::query()->where('level','hide')->get();

            return response()->json([
                'data' => $actors
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/ActorController@listActorInTrash: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
