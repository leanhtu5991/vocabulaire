var wordModel = require('../models/word');
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
    newWord.save().then(result => res.status(200).json({staus: "success", messsage: "word update"}))
    .catch(error => res.status(400).json(error));;
    // console.log('word',req.body.word);
    res.json({'result': "succes"})
}