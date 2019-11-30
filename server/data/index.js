const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('promise');

// Connection
mongoose.connect('mongodb://localhost/we_watch', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

console.log("Connected");

// Schema
const userSchema = new Schema({
    email: String,
    pass: String,
    listM: Array,
    listS: Array,
})
const movieSchema = new Schema({
    name: String,
    tempId: String,
    addDate: {type: Date, default: Date.now()},
    loc: String,
    posterLoc: String,
})
const seriesSchema = new Schema({
    name: String,
    tempId: String,
    season: {type: String, Default: "0"},
    episode: {type: String, Default: "0"},
    addDate: {type: Date, default: Date.now()},
    loc: String,
    posterLoc: String,
})
const lastAdded = new Schema({
    Movieids: Array,
    Seriesids: Array
})
const movieTemp = new Schema({
    name: String,
    posterLoc: String,
    hasMovie: {type: Boolean, default: false},
    fav_Counter: {type: Number, default: 0},
})
const seriesTemp = new Schema({
    name: String,
    posterLoc: String,
    fav_Counter: {type: Number, default: 0},
})
const message = new Schema({
    from: String,
    data: {type: Date, default: Date.now()},
    title: String,
    mess: String,
    readed: {type: Boolean, default: false}
})

// Model
const userModel = mongoose.model('user', userSchema);
const movieModel = mongoose.model('movie', movieSchema);
const seriesModel = mongoose.model('serie', seriesSchema);
const lastAddedModel = mongoose.model('last', lastAdded);
const movieTempModel = mongoose.model('movieTemp', movieTemp);
const seriesTempModel = mongoose.model('serieTemp', seriesTemp);
const messageModel = mongoose.model('message', message)

const idOfObjectLast = "5db6a885e5b953140523f32e";

///////////////////
// FOR THE FIRST TIME ONLY
// CHANGE THE idOfObjectLast
/*
var test = new lastAddedModel({
    "Seriesids" : [],
    "Movieids" : []
})
test.save();
*/
//////////////////

//*************************
// DASHBOARD //
//*************************
var numberOfvideos = function(callback) {
    lastAddedModel.find({}, (err, docs)=> {
        if (!err) {
            callback({
                m: docs[0].Movieids.length,
                s: docs[0].Seriesids.length,
            })
        } else {
            console.log("Error getting number if videos");
        }
    })
}

//*************************
// USER //
//*************************
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

// Array of Object -> Found;
// Empty Array -> Not Found;
// String -> Error Message;
var searchVedios = function(key, callback) {
    var list = [];
    movieTempModel.find({"name": {'$regex': key}, "hasMovie": true}, (err, docs)=> {
        if (!err) {
            list.push(docs);
            seriesTempModel.find({"name": {'$regex': key}}, (err, docs)=> {
                if (!err) {
                    list.push(docs)
                    // TODO: PAGGING THE SEARCH, SEND DATA LIKE 1 OF 5 PAGES
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

var addMessage = function(messData, callback) {
    var newMess = new messageModel(messData);
    newMess.save((err)=> {
        if (!err) {
            console.log("Message Submitted");
            callback(newMess)
        } else {
            callback("Error in submitting the message")
        }
    })
}

//*************************
// MOVIES TEMP //
//*************************
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

// Array -> Found;
// String -> Error Message;
var getMoviesTempAll = function(callback) {
    movieTempModel.find({}, (err, docs)=> {
        if (!err) {
            callback(docs)
        } else {
            callback("Error in getting all temps");
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

var addFavMovie = function(userId, tempId) {
    // put id in the userlist
    console.log(userId);
    console.log(tempId);
    userModel.findOne({_id: userId}, (err, docs)=> {
        if(!err) {
            console.log(docs);
            var oldList = docs.listM;
            oldList.push(tempId);
            userModel.updateOne({_id: userId}, {
                listM: oldList
            }).then(()=> {
                console.log("Added to Fav");
            })
        } else {
            console.log("Error finding the user in addFav");
        }
    })
}

var delFavMovie = function(userId, tempId) {
    // put id in the userlist
    console.log(userId);
    console.log(tempId);
    userModel.findOne({_id: userId}, (err, docs)=> {
        if(!err) {
            console.log(docs);
            var oldList = docs.listM;
            oldList = oldList.filter(e=> e !== tempId)
            userModel.updateOne({_id: userId}, {
                listM: oldList
            }).then(()=> {
                console.log("Added to Fav");
            })
        } else {
            console.log("Error finding the user in addFav");
        }
    })
}

var fav_CounterMovies = function(tempId) {
    movieTempModel.findOne({_id: tempId}, (err, docs)=> {
        if (!err) {
            var newCount = docs.fav_Counter + 1;
            movieTempModel.updateOne({_id: tempId}, {
                fav_Counter: newCount
            }).then(()=> {
                console.log("Fav Counter incremented");
            })
        } else {
            console.log("Error in findind temp in addFav");
        }
    })
}

var unfav_CounterMovies = function(tempId) {
    movieTempModel.findOne({_id: tempId}, (err, docs)=> {
        if (!err) {
            var newCount = docs.fav_Counter - 1;
            movieTempModel.updateOne({_id: tempId}, {
                fav_Counter: newCount
            }).then(()=> {
                console.log("Fav Counter incremented");
            })
        } else {
            console.log("Error in findind temp in addFav");
        }
    })
}

//*************************
// SERIES TEMP //
//*************************
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
var getSeriesTempAll = function(callback) {
    seriesTempModel.find({}, (err, docs)=> {
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

var addFavSerie = function(userId, tempId) {
    userModel.findOne({_id: userId}, (err, docs)=> {
        if(!err) {
            var oldList = docs.listS;
            oldList.push(tempId);
            userModel.updateOne({_id: userId}, {
                listS: oldList
            }).then(()=> {
                console.log("Added to Fav");
            })
        } else {
            console.log("Error finding the user in addFav");
        }
    })
}



var delFavSerie = function(userId, tempId) {
    userModel.findOne({_id: userId}, (err, docs)=> {
        if(!err) {
            var oldList = docs.listS;
            oldList = oldList.filter(e=> e !== tempId)
            userModel.updateOne({_id: userId}, {
                listS: oldList
            }).then(()=> {
                console.log("Added to Fav");
            })
        } else {
            console.log("Error finding the user in addFav");
        }
    })
}



var fav_CounterSeries = function(tempId) {
    seriesTempModel.findOne({_id: tempId}, (err, docs)=> {
        if (!err) {
            var newCount = docs.fav_Counter + 1;
            seriesTempModel.updateOne({_id: tempId}, {
                fav_Counter: newCount
            }).then(()=> {
                console.log("Fav Counter incremented");
            })
        } else {
            console.log("Error in findind temp in addFav");
        }
    })
}



var unfav_CounterSeries = function(tempId) {
    seriesTempModel.findOne({_id: tempId}, (err, docs)=> {
        if (!err) {
            var newCount = docs.fav_Counter - 1;
            seriesTempModel.updateOne({_id: tempId}, {
                fav_Counter: newCount
            }).then(()=> {
                console.log("Fav Counter incremented");
            })
        } else {
            console.log("Error in findind temp in addFav");
        }
    })
}

//*************************
// MOVIES VIDEOS //
//*************************
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
var getMoviebyTempId = function(tempId, callback) {
    movieModel.findOne({tempId: tempId}, (err, docs)=> {
        if (!err) {
            callback(docs);
        } else {
            callback("Error in finding Movie by Temp ID")
        }
    })
}

var deleteMovieTemp = function(id) {
    movieModel.deleteMany({tempId: id}, (err)=> {
        console.log("Error Deleting movie before a Temp")
    })
    movieTempModel.deleteOne({_id: id}, (err)=> {
        console.log("Error Deleting Temp")
    })
    lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
        var ids = docs.Movieids.splice(docs.Movieids.indexOf(id), 1)
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
    })

}

//*************************
// SERIES VIDEOS //
//*************************
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

var deleteSerieTemp = function(id) {
    seriesModel.deleteMany({tempId: id}, (err)=> {
        console.log("Error Deleting movie before a Temp")
    })
    seriesTempModel.deleteOne({_id: id}, (err)=> {
        console.log("Error Deleting Temp")
    })
    lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
        var ids = docs.Seriesids.splice(docs.Movieids.indexOf(id), 1)
        lastAddedModel.updateOne({_id: idOfObjectLast}, {
            Movieids: docs.Movieids,
            Seriesids: ids
        }).then(()=> {
            lastAddedModel.findOne({_id: idOfObjectLast}, (err, docs)=> {
                if(!err) {
                    console.log("Updated Last Added Model in Moves")
                } else {
                    console.log("Error findind the lastModel in database");
                }
            })
        })
    })
}

//*************************
// MESSAGE //
//*************************
var getAll = function(callback) {
    messageModel.find({}, (err, docs)=> {
        if(!err) {
            callback(docs);
        } else {
            callback("Error in getting all message")
        }
    })
}

var markRead = function(id) {
    messageModel.updateOne({_id: id}, {
        readed: true
    }).then(()=> {})
}

var getNumMess = function(callback) {
    messageModel.find({readed: false}, (err, docs)=> {
        if (!err) {
            callback(docs.length)
        } else {
            callback("Error in getNumMess")
        }
    })
}

//*************************
// PRIVATE //
//*************************
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






module.exports = {
    // Dashboard
    numberOfvideos: numberOfvideos,

    // User
    checkUser: checkUser,
    register: register,
    searchVedios: searchVedios,
    addMessage: addMessage,

    // Movies Temps
    insertTempMovie: insertTempMovie,
    getMoviesTempAll: getMoviesTempAll,
    getMoviesTemp: getMoviesTemp,
    getTempMovieById: getTempMovieById,
    addFavMovie: addFavMovie,
    delFavMovie: delFavMovie,
    fav_CounterMovies: fav_CounterMovies,
    unfav_CounterMovies: unfav_CounterMovies,

    //  Series Temps
    insertTempSeries: insertTempSeries,
    getSeriesTempAll: getSeriesTempAll,
    getSeriesTemp: getSeriesTemp,
    getTempSeriesById: getTempSeriesById,
    addFavSerie: addFavSerie,
    delFavSerie: delFavSerie,
    fav_CounterSeries: fav_CounterSeries,
    unfav_CounterSeries: unfav_CounterSeries,

    // Movie Videos
    insertDataMovie: insertDataMovie,
    getDataOffsetMovie: getDataOffsetMovie,
    getMoviebyIDS: getMoviebyIDS,
    getMoviebyTempId: getMoviebyTempId,
    deleteMovieTemp: deleteMovieTemp,

    // Series Videos
    insertDataSeries: insertDataSeries,
    getDataOffsetSeries: getDataOffsetSeries,
    getSeriesbyIDS: getSeriesbyIDS,
    getSeriesbyTempId: getSeriesbyTempId,
    deleteSerieTemp: deleteSerieTemp,

    // Message
    getAll: getAll,
    markRead: markRead,
    getNumMess: getNumMess
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
