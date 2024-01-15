<?php

namespace App\Events;

use App\Models\Seat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SeatReservation implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // public $seat;

    /**
     * Create a new event instance.
     */
    public function __construct(public Seat $seat)
    {
        // $this->seat = $seat;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('seat-reservation'),
        ];
    }

    public function broadcastAs()
    {
        return 'seat.reserved';
    }

    public function broadcastWith()
    {
        return [
            'seat' => $this->seat,
            'seat_type' => $this->seat->seatType
        ];
    }
}
