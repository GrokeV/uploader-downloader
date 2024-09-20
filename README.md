# uploader-downloader
Host http server with ability to upload/download files.

# Launching
'npm run start'

# Setting passcode for uploading
open '.env' file and change 'PASSCODE=0000' to whatever you want

# Uploading
- select one or more files
- input passcode
- click 'Upload'

Currently I don't think it's possible to upload a file to specific folder.

# Downloading
goto 'http://localhost:8080/files/<path>'

## Examples
structure on website
files/

├── example.json
├── dir2/
│   └── info.txt
└── videos/
    └── 2020/
        └── example.mp4

- example.json: http://localhost:8080/files/example.json
- dir2/info.txt: http://localhost:8080/files/dir2/info.txt
- videos/2020/example.mp4: http://localhost:8080/files/videos/2020/example.mp4
