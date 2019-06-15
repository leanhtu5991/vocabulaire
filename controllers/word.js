var wordModel = require('../models/word');
var db = require('../db');

module.exports.getAllWord = function (req, res) {
    wordModel.findAll()
    .then(words => res.status(200).json(words))
    .catch(error => res.status(400).json(error));
}

module.exports.getWordByUser = function(req, res){
    var userId = parseInt(req.params.userId);
    var dateValid = newDateTime();
    var query = "select w.id, w.word, w.translate, w.example1, w.example2, w.iduser, w.idbox, b.time, w.status, (TIME_TO_SEC(timediff(?, validatetime))/60) as validTime from word w, box b where w.idbox = b.id and iduser = ?" 
    db.get().query(query,
    { type: db.get().QueryTypes.SELECT, replacements: [dateValid, userId] })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(
        error => {
            res.status(400).json(error);
        }
    );
//     var userId =  req.params.userId;
//     console.log('userId',userId)
//     wordModel.findAll({where: {
//         iduser: userId
//     }})
// .then(datas => {res.status(200).json(datas)})
// .catch(error => res.status(400).json(error));
}

module.exports.getWordForQuestion = function(req, res){
    var userId = parseInt(req.params.userId);
    var dateValid = newDateTime();
    var query = "select w.id, w.word, w.translate, w.example1, w.example2, w.iduser, w.idbox, w.validatetime, w.status from word w, box b where w.idbox = b.id and iduser = ? and (TIME_TO_SEC(timediff(?, validatetime))/60-b.time)>0" 
    db.get().query(query,
    { type: db.get().QueryTypes.SELECT, replacements: [userId, dateValid] })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(
        error => {
            res.status(400).json(error);
        }
    );
}
module.exports.saveWordToUser = function(req, res){
    var userId = req.params.userId;
    var d = newDateTime();
    var newWord = wordModel.build({
        word: req.body.word,
        type: req.body.type,
        translate: req.body.translate,
        example1: req.body.example1,
        example2: req.body.example2,
        idbox: req.body.idbox,
        validatetime: d,
        iduser: userId
    });
    newWord.save().then(result => res.status(200).json({status: "success", messsage: "word update"}))
    .catch(error => res.status(400).json(error));;
    // console.log('word',req.body.word);
}

module.exports.modifyWord = function(req, res){
    var wordId =  req.body.id;
    var word = {
        translate : req.body.translate,
        idbox : req.body.idbox,
        example1: req.body.example1,
        example2: req.body.example2,
        status: req.body.idbox,
        validatetime: newDateTime()
    }
    wordModel.update(word, { where: { id: wordId} }).then(result => res.status(200).json({status: "success", messsage: "word update"}))
    .catch(error => res.status(400).json(error));;
}

module.exports.deleteWord = function(req, res){
    var wordId = req.params.wordId;
    wordModel.destroy({ where: { id: wordId } })
    .then(
        word => {
            res.status(200).json({status: "success", messsage: "delete"});
        }
    )
    .catch(
        error => {
            res.status(400).json(error);
        }
    );
}

function newDateTime(){
    var d=new Date();
    var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
    return date_format_str;
}
module.exports.updateStatutWord = function(req, res){
    var wordId = parseInt(req.params.wordId);
    var result = req.params.result;
    var idBox = 0;
    var dateUpdate = newDateTime();
    console.log(wordId)
    wordModel.findOne({ where: { id: wordId } })
        .then(
            word => {
            var status;
            if(result == 1){
                status =  word.status+1;
            }
            else if(result == 0){
                status = word.status-0.5;
            }
            if(status < 2){
                idBox = 1;
                status = 1;
            } else if(status >= 2 && status <3) {
                idBox = 2;
            } else if(status >= 3 && status <4) {
                idBox = 3;
            } else if(status >= 4 && status <5) {
                idBox = 4;
            } else if(status >= 5 && status <6) {
                idBox = 5;
            } else if(status >= 6) {
                idBox = 6;
                status = 6;
            }
            db.get().query("UPDATE word SET status=? , idbox=? , validatetime=? where id = ?",
                { type: db.get().QueryTypes.UPDATE, replacements: [status, idBox, dateUpdate, wordId] }).then(result => {
                    res.json("update word success");
                })
        })
        .catch(
            error => {
                res.status(400).json(error);
                console.log("word can't find");
            }
        );
    // res.status(200).json({status: "success", messsage: wordId});
}