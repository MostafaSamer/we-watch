const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('promise');

// Connection
mongoose.connect('mongodb://localhost/we_watch', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Schema
const userSchema = new Schema({
    email: String,
    pass: String
})
const movieSchema = new Schema({
    name: String,
    tempId: String,
    addDate: {type: Date, default: Date.now()},
    loc: String
})
const seriesSchema = new Schema({
    name: String,
    tempId: String,
    season: {type: String, Default: "0"},
    episode: {type: String, Default: "0"},
    addDate: {type: Date, default: Date.now()},
    loc: String
})
const lastAdded = new Schema({
    Movieids: Array,
    Seriesids: Array
})
const movieTemp = new Schema({
    name: String,
    hasMovie: {type: Boolean, default: false}
})
const seriesTemp = new Schema({
    name: String
})

// Model
const userModel = mongoose.model('user', userSchema);
const movieModel = mongoose.model('movie', movieSchema);
const seriesModel = mongoose.model('serie', seriesSchema);
const lastAddedModel = mongoose.model('last', lastAdded);
const movieTempModel = mongoose.model('movieTemp', movieTemp);
const seriesTempModel = mongoose.model('serieTemp', seriesTemp);

const idOfObjectLast = "5d860cafa7694e8c7c5fa459";

// Object -> found;
// String -> Error Message;
var checkUser = function(email, pass, callback) {
    checkEmail(email, (result)=> {
        if (result) {
            if(result.pass == pass) {
                callback(result)
            } else {
                callback("Password is Wrong")
            }
        } else {
            callback("Email is Wrong")
        }
    })
}

// Object -> found;
// null -> not found;
var checkEmail = function(email, callback) {
    userModel.findOne({email: email}, (err, docs)=> {
        if (!err) {
            callback(docs)
        } else {
            callback(null)
        }
    })
}

// Object -> Saved;
// String -> Error Message;
var register = function(user, callback) {
    checkEmail(user.email, (result)=> {
        if(!result) {
            var newUser = new userModel({
                email: user.email,
                pass: user.pass
            })
            newUser.save((err)=> {
                if (!err) {
                    console.log("Data Saved");
                    callback(newUser);
                } else {
                    callback("Error in saving new user")
                }
            })
        } else {
            callback("Email is already exist");
        }
    })
}

// Object -> Saved;
// String -> Error Message;
var insertTempMovie = function(tempData, callback) {
    var newTemp = new movieTempModel(tempData);
    newTemp.save((err)=> {
        if(!err) {
            console.log("Data Saved");
            callback(newTemp);
        } else {
            callback("Error in saving new video")
        }
    })
}

// Object -> Saved;
// String -> Error Message;
var insertTempSeries = function(tempData, callback) {
    var newTemp = new seriesTempModel(tempData);
    newTemp.save((err)=> {
        if(!err) {
            console.log("Data Saved");
            callback(newTemp);
        } else {
            callback("Error in saving new video")
        }
    })
}

// Array -> Found;
// String -> Error Message;
var getMoviesTemp = function(callback) {
    movieTempModel.find({hasMovie: false}, (err, docs)=> {
        if (!err) {
            callback(docs)
        } else {
            callback("Error in getting all temps");
        }
    })
}

//Array -> Found;
// String -> Error Message;
var getSeriesTemp = function(callback) {
    seriesTempModel.find({}, (err, docs)=> {
        if (!err) {
            callback(docs)
        } else {
            callback("Error in getting all temps");
        }
    })
}

// Object -> found;
// String -> Error Message;
var getTempMovieById = function(id, callback) {
    movieTempModel.findOne({_id: id}, (err, docs)=> {
        if(!err) {
            callback(docs)
        } else {
            callback("Error in getting temp by id");
        }
    })
}

// Object -> found;
// String -> Error Message;
var getTempSeriesById = function(id, callback) {
    console.log(id);
    seriesTempModel.findOne({_id: id}, (err, docs)=> {
        if(!err) {
            callback(docs)
        } else {
            callback("Error in getting temp by id");
        }
    })
}

// Object -> Saved!
// String -> Error!
var insertDataMovie = function(videoData, callback) {
    var newVideo = new movieModel(videoData);
    newVideo.save((err)=> {
        if(!err) {
            console.log("Data Saved!");
            movieTempModel.updateOne({_id: newVideo.tempId}, {hasMovie: true}).then(()=> {
                movieTempModel.findOne({_id: newVideo.tempId}, (err, docs)=> {
                    if(!err) {
                        console.log("Templete Updated!")
                    } else {
                        callback("Error findind the lastModel in database");
                    }
                })
            })
            addNewDataMovie(newVideo._id);
            callback(newVideo);
        } else {
            callback("Error in saving new video")
        }
    })
}

// Object -> Saved!
// String -> Error!
var insertDataSeries = function(videoData, callback) {
    var newVideo = new seriesModel(videoData);
    newVideo.save((err)=> {
        if(!err) {
            console.log("Data Saved!");
            addNewDataSeries(newVideo._id);
            callback(newVideo);
        } else {
            callback("Error in saving new video")
        }
    })
}

// Resolve Object -> found;
// Resolve null -> not Found;
// Reject String -> Error Message;
var getMoviebyID = function(id, callback) {
    return new Promise(function(resolve, reject) {
        movieModel.findOne({_id: id}, (err, docs)=> {
            if (!err) {
                return resolve(docs)
            } else {
                return reject("Error in getting Movie by Id")
            }
        })
    })
}

// Resolve Object -> found;
// Resolve null -> not Found;
// Reject String -> Error Message;
var getSeriesbyID = function(id, callback) {
    return new Promise(function(resolve, reject) {
        seriesModel.findOne({_id: id}, (err, docs)=> {
            if (!err) {
                return resolve(docs)
            } else {
                return reject("Error in getting Series by Id")
            }
        })
    })
}

// Object -> found;
// null -> not Found;
// String -> Error Message;
var getMoviebyIDS = function(id, callback) {
    movieModel.findOne({_id: id}, (err, docs)=> {
        if (!err) {
            callback(docs)
        } else {
            callback("Error in getting Movie by Id")
        }
    })
}

// Object -> found;
// null -> not Found;
// String -> Error Message;
var getSeriesbyIDS = function(id, callback) {
    seriesModel.findOne({_id: id}, (err, docs)=> {
        if (!err) {
            callback(docs)
        } else {
            callback("Error in getting Series by Id")
        }
    })
}

// Object -> found;
// null -> not Found;
// String -> Error Message;
var getMoviebyTempId = function(tempId, callback) {
    movieModel.findOne({tempId: tempId}, (err, docs)=> {
        if (!err) {
            callback(docs);
        } else {
            callback("Error in finding Movie by Temp ID")
        }
    })
}

// Array -> found;
// null -> not Found;
// String -> Error Message;
var getSeriesbyTempId = function(tempId, callback) {
    seriesModel.find({tempId: tempId}, (err, docs)=> {
        if (!err) {
            callback(docs);
        } else {
            callback("Error in finding Movie by Temp ID")
        }
    })
}

var addNewDataMovie = function(id) {
    lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
        if(!err) {
            ids = docs.Movieids;
            ids.unshift(id);
            lastAddedModel.updateOne({_id: idOfObjectLast}, {
                Movieids: ids,
                Seriesids: docs.Seriesids
            }).then(()=> {
                lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
                    if(!err) {
                        console.log("Updated Last Added Model in Moves")
                    } else {
                        console.log("Error findind the lastModel in database");
                    }
                })
            })
        } else {
            console.log("Error findind the lastModel in database");
        }
    })
}

var addNewDataSeries = function(id) {
    lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
        if(!err) {
            ids = docs.Seriesids;
            ids.unshift(id);
            lastAddedModel.updateOne({_id: idOfObjectLast}, {
                Movieids: docs.Movieids,
                Seriesids: ids
            }).then(()=> {
                lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
                    if(!err) {
                        console.log("Updated Last Added Model in Series")
                    } else {
                        console.log("Error findind the lastModel in database");
                    }
                })
            })
        } else {
            console.log("Error findind the lastModel in database");
        }
    })
}

// Array of Object -> Found;
// Array of null -> not Found;
// String -> Error Message;
var getDataOffsetMovie = function(offset, callback) {
    var promises = [];
    lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
        var len = docs.Movieids.length
        if ((offset*10) <= len) {
            var arr = docs.Movieids.slice((offset*10)-10, (offset*10));
            for (var i in arr) {
                promises.push(getMoviebyID(arr[i]))
            }
            Promise.all(promises)
            .then(function(data){ callback(data) })
            .catch(function(err){ console.log(err); });
        } else if ((offset*10) > len) {
            var arr = docs.Movieids.slice((offset*10)-10, len);
            for (var i in arr) {
                promises.push(getMoviebyID(arr[i]))
            }
            Promise.all(promises)
            .then(function(data){ callback(data) })
            .catch(function(err){ callback(err); });
        }
    })
}

// Array of Object -> Found;
// Array of null -> not Found;
// String -> Error Message;
var getDataOffsetSeries = function(offset, callback) {
    var promises = [];
    lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
        var len = docs.Seriesids.length
        if ((offset*10) <= len) {
            var arr = docs.Seriesids.slice((offset*10)-10, (offset*10));
            for (var i in arr) {
                promises.push(getSeriesbyID(arr[i]))
            }
            Promise.all(promises)
            .then(function(data){ callback(data) })
            .catch(function(err){ console.log(err); });
        } else if ((offset*10) > len) {
            var arr = docs.Seriesids.slice((offset*10)-10, len);
            for (var i in arr) {
                promises.push(getSeriesbyID(arr[i]))
            }
            Promise.all(promises)
            .then(function(data){ callback(data) })
            .catch(function(err){ callback(err); });
        }
    })
}

// Array of Object -> Found;
// Empty Array -> Not Found;
// String -> Error Message;
var searchVedios = function(key, callback) {
    var list = [];
    movieModel.find({"name": {'$regex': key}}, (err, docs)=> {
        if (!err) {
            list.push(docs);
            seriesModel.find({"name": {'$regex': key}}, (err, docs)=> {
                if (!err) {
                    list.push(docs)
                    callback(list)
                } else {
                    console.log("Error in Searching in Series");
                }
            })
        } else {
            console.log("Error in Searching in Movies");
        }
    })
}

// String -> Status
var deleteVedio = function(id, callback) {

}

module.exports = {
    checkUser: checkUser,
    register: register,
    insertTempMovie: insertTempMovie,
    insertTempSeries: insertTempSeries,
    insertDataMovie: insertDataMovie,
    insertDataSeries: insertDataSeries,
    searchVedios: searchVedios,
    deleteVedio: deleteVedio,
    getMoviesTemp: getMoviesTemp,
    getSeriesTemp: getSeriesTemp,
    getTempMovieById: getTempMovieById,
    getTempSeriesById: getTempSeriesById,
    getDataOffsetMovie: getDataOffsetMovie,
    getDataOffsetSeries: getDataOffsetSeries,
    getMoviebyIDS: getMoviebyIDS,
    getSeriesbyIDS: getSeriesbyIDS,
    getMoviebyTempId: getMoviebyTempId,
    getSeriesbyTempId: getSeriesbyTempId,
};


/*



var getDataOffsetMovie = function(offset, callback) {
    lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
        var len = docs.Movieids.length
        if ((offset*10) <= len) {
            getMoviebyID(docs.Movieids.slice((offset*10)-10, (offset*10)))
            .then(function(res) {
                callback(res)
            })
        } else if ((offset*10) > len) {
            console.log(456);
            getMoviebyID(docs.Movieids.slice((offset*10)-10, len), (result)=> {
                callback(result)
            })
        }
    })
}

var getDataOffsetSeries = function(offset, callback) {
    lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
        var len = docs.Seriesids.length
        if ((offset*10) <= len) {
            console.log(123);
            getSeriesbyID(docs.Seriesids.slice((offset*10)-10, (offset*10)), (result)=> {
                callback(result)
            })
        } else if ((offset*10) > len) {
            console.log(456);
            getSeriesbyID(docs.Seriesids.slice((offset*10)-10, len), (result)=> {
                callback(result)
            })
        }
    })
}

var getMoviebyID = function(ids) {
    var list = [];
    return new Promise(function(reslove, reject) {
        for (var i = 0; i<ids.length; i++) {
            movieModel.findOne({_id: ids[i]}, (err, docs)=> {
                console.log("+++");
                console.log(list);
                if (!err) {
                    movieTempModel.findOne({_id: docs.tempId}, (err, docsT)=> {
                        console.log("entered");
                        list.push({
                            name: docsT.name,
                            data: docs
                        })
                    })
                } else {

                }
            })

        }
        resolve(list)
    })

}

var getSeriesbyID = function(ids, callback) {
    var list = [];
    for (var i = 0; i<ids.length; i++) {
        seriesModel.findOne({_id: ids[i]}, (err, docs)=> {
            if (!err) {
                console.log(ids[i]);
                seriesTempModel.findOne({_id: docs.tempId}, (err, docsT)=> {
                    console.log(docsT);
                    list.push({
                        name: docsT.name,
                        data: docs
                    })
                })
            } else {

            }
        })

    }

}







for (var i = 0; i<ids.length; i++) {
    movieModel.findOne({_id: ids[i]}, (err, docs)=> {
        console.log("+++");
        if (!err) {
            movieTempModel.findOne({_id: docs.tempId}, (err, docsT)=> {
                list.push({
                    name: docsT.name,
                    data: docs
                })
            })
        } else {

        }
    })

}

*/




// VIEWS IN COUCHDB
/*
// MOVIES
function (doc) {
  if(!doc.season && doc.name) {
    emit(doc._id, {
      rev: doc._rev,
      name: doc.name,
      loc: doc.loc
    });
  }
}
// TV
function (doc) {
  if(doc.season) {
    emit(doc._id, {
      rev: doc._rev,
      name:doc.name,
      season: doc.season,
      episode: doc.episode,
      loc: doc.loc
    });
  }
}
// USER
function (doc) {
  if(doc.email) {
    emit(doc.email, {
      rev: doc._rev,
      email: doc.email,
      pass: doc.pass
  });
  }
}
// VEDIO
function (doc) {
  if(doc.name) {
    emit(doc.name, {
      name: doc.name,
      rev: doc._rev,
      loc: doc.loc
    });
  }
}
*/
