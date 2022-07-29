export const default_text = `class upd_sockets {
    ipAddr addr;
}

class host {
    socket sockets[10];
    upd_sockets sockets[10];
}

class  socket
{
    stream streams[10];
    stream_priotizer prio;
}

class stream_priotizer
{
    stream & streams [10];
}

class stream
{
    recv_queue_i recv_buffer;
    send_queue_i send_buffer;
}


class recv_queue_i extends queue_i{}
class send_queue_i extends queue_i{}

class recv_queue extends recv_queue_i 
{
    uint8 buffer[1024];
}

class send_queue extends send_queue_i 
{
    uint8 buffer[1024];
}`;
