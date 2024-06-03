# player-sdk-js
Player SDK for online torrent streaming on your site

## Features
* Supports magnet-uri and external torrent-files
* Supports video (avi, mkv, mp4, m4v) with subtitles (vtt, srt)
* No additional plugins/extensions required

## Basic usage
```html
    <video controls src="magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel" width="100%" data-title="Sintel"></video>
    <script src="https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js" charset="utf-8" async></script>
```
with subtitle tracks and poster:
```html
    <video controls src="magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel" poster="https://via.placeholder.com/150/0000FF/808080" width="100%" data-title="Sintel">
        <track srclang="en" label="test" default src="https://raw.githubusercontent.com/andreyvit/subtitle-tools/master/sample.srt">
    </video>
    <script src="https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js" charset="utf-8" async></script>
```
Video element is replaced by wrapper div in this scenarios.

## Element attributes
Attribute    | Description
-------------|-------------
id           | ID of wrapper div
class        | Class of wrapper div
width        | Width of an iframe (might be any css width value: 800px, 100%, etc... 800px by default)
height       | Height of an iframe (might be any css width value: 800px, 100%, etc... optional)
src          | Magnet url or url to torrent file (required)
poster       | Url to the poster image (optional)
type         | Use `application/x-bittorrent` for torrent file url in case if it has no `.torrent` extension
data-config  | Additional player configuration in JSON (see [Player configuration](#player-configuration))
data-*       | Set specific configuration value for a key (see [Player configuration](#player-configuration))

## Advanced usage
```html
...
    <div id="player" class="webtor" />
    <script>
        window.webtor = window.webtor || [];
        window.webtor.push({
            id: 'player',
            magnet: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F',
            on: function(e) {
                if (e.name == window.webtor.TORRENT_FETCHED) {
                    console.log('Torrent fetched!', e.data);
                }
                if (e.name == window.webtor.TORRENT_ERROR) {
                    console.log('Torrent error!');
                }
            },
            poster: 'https://via.placeholder.com/150/0000FF/808080',
            subtitles: [
                {
                    srclang: 'en',
                    label: 'test',
                    src: 'https://raw.githubusercontent.com/andreyvit/subtitle-tools/master/sample.srt',
                    default: true,
                }
            ],
            lang: 'en',
            i18n: {
                en: {
                    common: {
                        "prepare to play": "Preparing Video Stream... Please Wait...",
                    },
                    stat: {
                        "seeding": "Seeding",
                        "waiting": "Client initialization",
                        "waiting for peers": "Waiting for peers",
                        "from": "from",
                    },
                },
            },
        });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js" charset="utf-8" async></script>
...
```
[Here is live example](https://webtor.io/sdk-example.html)

## Player configuration
Attribute  | Description
-----------|-------------
id         | Element id where player will be embedded
magnet     | Magnet URI (torrentUrl ot magnet is required)
width      | Width of an iframe (might be any css width value: 800px, 100%, etc... 800px by default)  
height     | Height of an iframe (might be any css width value: 800px, 100%, etc... optional)
torrentUrl | Url of the torrent-file (HTTP-server **MUST** include header "Access-Control-Allow-Origin: *" to allow torrent-file download on client-side)
poster     | Url to the poster image (optional)
on         | Callback-function to capture player events (optional)
subtitles  | Array of subtitles (optional, see [Subtitle configuration](#subtitle-configuration) for more details)
title      | Replaces original file name in a header with specific title (optional)
imdbId     | Helps to find subtitles and additional metadata (example values 'tt0133093' or '0133093' or even '133093', optional)
header     | Shows header with current progress and title (true/false, default: true)
pwd        | Selected directory in torrent (optional)
file       | Selected file in torrent (optional)
lang       | Override language (optional)
i18n       | Override i18n messages (optional)
features   | enables or disables specific player features (optional)

## Subtitle configuration
Attribute  | Description
-----------|-------------
srclang    | Two-letter language code
label      | Subtitle label
src        | `url` to the subtitle src, could be `vtt`, `srt` and `m3u8`. It should be direct link to subtitle.
default    | If true this track will be selected by default (true/false, optional)

## Player features
Name        | Description
------------|-------------
controls    | enables all features by default 
title       | displays movie title
p2pProgress | displays p2p progress
subtitles   | enables subtitles control
captions    | enables showing captions for subtitles
settings    | enables settings control (cog)
fullscreen  | enables fullscreen control
playpause   | enables plays/pause control
currentTime | displays current time
timeline    | enables timeline control
duration    | displays total duration
volume      | enables volume control
chromecast  | enables chromecast support
browse      | enables file browser menu
download    | enables download button

## Player events

Event types:

Name            | Description
----------------|-------------
TORRENT_FETCHED | Indicates that torrent has been fetched and also returns fetched torrent in `data` field
TORRENT_ERROR   | Indicates if some error has occured during loading (timeout, wrong url, etc...)
INITED          | Indicates if player can play content
OPEN            | Indicates that specific file in torrent was opened
PLAYER_STATUS   | Indicates current player status
CURRNET_TIME    | Indicates current player time
DURATION        | Indicates full content duration

Every event has following fields:

Name      | Description
----------|-------------
name      | Name of the event
data      | Specific data for this event
player    | Player representation that can be used after initialization to control playback

Player methods:

Name        | Description
------------|-------------
play        | starts playback (available only after first play-click in the player)
pause       | pauses playback (available only after first play-click in the player)
setPosition | sets player position in seconds (available only after first play-click in the player) 
open        | opens another file in torrent, full file-path should be provided
