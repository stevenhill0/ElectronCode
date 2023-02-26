const ffmpeg = require('fluent-ffmpeg');
const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  ipcMain.on('videos:added', (event, videos) => {
    // Creating a Promise
    // const promise = new Promise((resolve, reject) => {
    //   // ffprobe 1st arg: path to the video; 2nd arg: callback passing the error and metadata
    //   ffmpeg.ffprobe(videos[0].path, (error, metadata) => {
    //     resolve(metadata);
    //   });
    // });
    // promise
    //   .then((metadata) => {
    //     console.log(metadata);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const promises = videos.map((video) => {
      return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(video.path, (error, metadata) => {
          resolve({
            ...video, // Spreading the video object (containing the video info from the video file)
            duration: metadata.format.duration, // Getting the duration from the metadata (pulled from ffprobe, after parsing the video)
            format: 'avi', // Stating what format you want the video file to be, after it has been converted
          });
        });
      });
    });

    // Promise.all() is fulfilled ONLY after ALL Promises have been resolved
    Promise.all(promises).then((results) => {
      mainWindow.webContents.send('metadata:complete', results);
    });
  });

  // ipcMain.on('conversion:start', (event, videos) => {
  //   // converts videos: 1st arg: file path. output() function@ 1st arg: file name, including the type of file e.g. .mp4
  //   const video = videos[0];

  //   // const outputDirectory = video.path.split(video.name)[0];
  //   // console.log(outputDirectory);
  // });
});
