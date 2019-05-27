var wordModel = require('../models/word');
var db = require('../db');

module.exports.getAllWord = function (req, res) {
    wordModel.findAll()
    .then(words => res.status(200).json(words))
    .catch(error => res.status(400).json(error));
}

module.exports.getWordByUser = function(req, res){
    var userId =  req.params.userId;
    console.log('userId',userId)
    wordModel.findAll({where: {
        iduser: userId
    }})
.then(datas => {console.log(datas);res.status(200).json(datas)})
.catch(error => res.status(400).json(error));
}

module.exports.saveWordToUser = function(req, res){
    console.log('here')
    var userId = req.params.userId;
    var d = new Date();
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
    console.log('word', newWord)
    newWord.save().then(result => res.status(200).json({status: "success", messsage: "word update"}))
    .catch(error => res.status(400).json(error));;
    // console.log('word',req.body.word);
    res.json({'result': "succes"})
}

module.exports.deleteWord = function(req, res){
    var wordId = req.params.wordId;
    wordModel.destroy({ where: { id: wordId } })
    .then(
        word => {
            res.status(200).json({status: "success", messsage: "delete"});
            console.log('delete',word);
        }
    )
    .catch(
        error => {
            res.status(400).json(error);
            console.log("word can't delete");
        }
    );
}

module.exports.updateStatutWord = function(req, res){
    var wordId = req.params.wordId;
    var result = req.params.result;
    console.log(wordId);
    console.log(result)
    wordModel.findOne({ where: { id: wordId } })
        .then(
            word => {
            if(result == 1){
                
            }
            else if(result == 0){

            }
            res.status(200).json({status: "success", messsage: wordId});
        })
        .catch(
            error => {
                res.status(400).json(error);
                console.log("word can't find");
            }
        );
    // res.status(200).json({status: "success", messsage: wordId});
}