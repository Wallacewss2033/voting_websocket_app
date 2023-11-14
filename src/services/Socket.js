import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.PUSHER_APP_KEY.replace(/"/g, ""),
    cluster: 'mt1',
    wsHost: process.env.PUSHER_HOST.replace(/"/g, ""),
    wsPort: process.env.PUSHER_PORT.replace(/"/g, ""),
    forceTLS: false,
});