const router = require('express').Router();
var multer  = require('multer')
var DIR = 'videos/';
var upload = multer({ dest: DIR })
const data = require('../data/index');
var fs = require('fs');


router.get('/', (req, res)=> {
    res.json("Hello")
})

//*************************
// USER //
//*************************
router.post('/user/login', (req, res)=> {
    var email = req.body.email
    var pass = req.body.pass
    data.checkUser(email, pass, (result)=> {
        res.json(result)
    })
})

router.post('/user/register',(req, res)=> {
    var email = req.body.email
    var pass = req.body.pass
    data.register(req.body, (result)=>{
        res.json(result)
    })
})

router.post('/user/home/moviesOffset', (req, res)=> {
    var offset = req.body.offset;
    data.getDataOffsetMovie(offset, (result)=> {
        res.json(result)
    })
})

router.post('/user/home/seriesOffset', (req, res)=> {
    var offset = req.body.offset;
    data.getDataOffsetSeries(offset, (result)=> {
        res.json(result)
    })
})

router.post('/user/search', (req, res)=> {
    var name = req.body.key;
    data.searchVedios(name, (result)=> {
        res.json(result)
    })
})

//*************************
// ADMIN //
//*************************
router.post('/admin/login', (req, res)=> {
    var email = req.body.email
    var pass = req.body.pass
    var validEmail = 'admin@email.com'
    var validPass = 'admin'
    if (email == validEmail) {
        if (pass == validPass) {
            res.json(true)
        } else {
            res.json("Password is wrong")
        }
    } else {
        res.json("Email is wrong")
    }
})

router.post('/admin/edit', (req, res)=> {

})

router.post('/admin/delete', (req, res)=> {

})

//*************************
// Temps //
//*************************
router.post('/admin/add/moviesTemp', (req, res)=> {
    data.insertTempMovie({
        name: req.body.name
    }, (result)=> {
        res.json(result)
    })
})

router.post('/admin/add/seriesTemp', (req, res)=> {
    data.insertTempSeries({
        name: req.body.name
    }, (result)=> {
        res.json(result)
    })
})

router.get('/admin/get/moviesTemp', (req, res)=> {
    data.getMoviesTemp((result)=> {
        res.json(result)
    })
})

router.get('/admin/get/seriesTemp', (req, res)=> {
    data.getSeriesTemp((result)=> {
        res.json(result)
    })
})

//*************************
// MOVIES //
//*************************
router.post('/admin/upload/movies', upload.single('filess'), (req, res)=> {
    res.json(req.file.filename)
})

router.post('/admin/upload/movies/originalDataAndName', (req, res)=> {
    var oldName = req.body.oldName
    var newData = req.body.newData
    data.getTempMovieById(newData.TempId, (result)=> {
        var oldPath = DIR + oldName
        var newPath = DIR + 'movies/' + result.name + '/' + result.name + '.mp4'
        if (!fs.existsSync(DIR + 'movies/' + result.name)){
            fs.mkdirSync(DIR + 'movies/' + result.name, { recursive: true });
        }
        fs.rename(oldPath, newPath, function (err) {
            if(!err) {
                console.log("File Moved!");
                data.insertDataMovie({
                    name: result.name,
                    tempId: newData.TempId,
                    loc: newPath
                }, (result)=> {
                    res.json(result)
                })
            } else {
                res.json("Error in Moving the new video")
            }
        })
    })
})

//*************************
// SERIES //
//*************************
router.post('/admin/upload/series', upload.single('filess'), (req, res)=> {
    res.json(req.file.filename)
})

router.post('/admin/upload/series/originalDataAndName', (req, res)=> {
    var oldName = req.body.oldName
    var newData = req.body.newData
    data.getTempSeriesById(newData.TempId, (result)=> {
        var oldPath = DIR + oldName
        var newPath = DIR + 'tv/' + result.name + '/' + newData.season + '/' + newData.episode + '/' + result.name + '.' + newData.season + '.' + newData.episode + '.mp4'
        if (!fs.existsSync(DIR + 'tv/' + result.name + '/' + newData.season + '/' + newData.episode)){
            fs.mkdirSync(DIR + 'tv/' + result.name + '/' + newData.season + '/' + newData.episode, { recursive: true });
        }
        fs.rename(oldPath, newPath, function (err) {
            if(!err) {
                console.log("File Moved!");
                data.insertDataSeries({
                    name: result.name,
                    tempId: newData.TempId,
                    season: newData.season,
                    episode: newData.episode,
                    loc: newPath
                }, (result)=> {
                    res.json(result)
                })
            } else {
                res.json("Error in Moving the new video")
            }
        })
    })
})

module.exports = router;