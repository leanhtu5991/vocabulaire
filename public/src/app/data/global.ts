import { User, Role, Civil } from './user';

export const USER_TEST = new User(
    1,
    "Jean [TEST USER]",
    "jp@icloud.com",
    new Date("11/10/1997"),
    "0655254122",
    Role.User,
    new Date("10/10/2019"),
    Civil.Man
);

export const CONST = Object.freeze({
    //Key
    KEY_LISTWORD : "listWord",
    CURRENT_USER : "currentUser",
    
    //Data Sample:
    CONFIG_WORD : [
        {id : 1, type : "(n)", color : 'green',     typename : 'Noun'},
        {id : 2, type : "(v)", color : 'red',       typename : 'Verb'},
        {id : 3, type : "(a)", color : 'orange',    typename : 'Adjectif'},
        {id : 4, type : "(adv)", color : 'purple',  typename : 'Adverb'},
    ],
    CONFIG_BOX : [
        {id : 1, name : "BOX 1", description: "box1"},
        {id : 2, name : "BOX 2", description: "box2"},
        {id : 3, name : "BOX 3", description: "box3"},
    ],
    LIST_WORD_EXAMPLE : [
        {id: 1, word: 'hello', translate : "bonjour", idbox : 1, type : 1},
        {id: 2, word: 'house', translate : "maison", idbox : 3, type : 1},
        {id: 3, word: 'love', translate : "aimer", idbox : 2, type : 2},
        {id: 4, word: 'small', translate : "petit", idbox : 2, type : 3},
        {id: 5, word: 'friendly', translate : "amical", idbox : 2, type : 4}
    ],
    USER_TEST : USER_TEST
});