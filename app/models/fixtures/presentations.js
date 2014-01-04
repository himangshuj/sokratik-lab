'use strict';
/*
 *  File: presentations.js
 *  Type: DataFixture
 *  Generated by: Mongoose-Fixture (v0.3.1)
 *
 */

// @callback must be returned
// expects (err, object)
// object can be an array of data-documents, or a kwarg['dataFixtures']
// mongoose is the instance of mongoose being used (has schemas)
// conn is the current native mongodb connection (will contain models)
module.exports = function (mongoose, conn, callback) {

    // standard callback error
    var error = null;

    // create your data documents using object-literals
    var fixture = [];

    /*
     * Example of adding a data document/fixture item 
     */
    fixture.push({
        '_id': '52a5b24f89163bb73f000026',
        'recordingStarted': '2013-12-09T14:16:17.617Z',
        'voting': {
            'upVote': 0,
            'downVote': 0
        },
        'authors': [
            {
                'username': 'Aniket Behera',
                'description': 'description',
                'role': 'Owner',
                'percentageContribution': 100,
                '_id': '529f39c238aa0ebe4c000009'
            }
        ],
        'files': [],
        'script': [
            {
                'fnName': 'changeState',
                'args': {
                    'subState': '.activate',
                    'params': {
                        'page': 0
                    }
                },
                'actionInitiated': 1386598577625,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f00003e'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386598577826,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f00003d'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386598578014,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f00003c'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386598578014,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f00003b'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386598642264,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f00003a'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 0
                },
                'actionInitiated': 1386598646765,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000039'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 1
                },
                'actionInitiated': 1386598648471,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000038'
            },
            {
                'fnName': 'changeState',
                'args': {
                    'subState': '.activate',
                    'params': {
                        'page': 1
                    }
                },
                'actionInitiated': 1386598649853,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000037'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386598649903,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000036'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386598676303,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000035'
            },
            {
                'fnName': 'redo',
                'module': 'dialogue',
                'actionInitiated': 1386598693576,
                '_id': '52a5d2f0b69456b93f000034'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386598693614,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000033'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386598709170,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000032'
            },
            {
                'fnName': 'changeState',
                'args': {
                    'subState': '.activate',
                    'params': {
                        'page': 2
                    }
                },
                'actionInitiated': 1386598724671,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000031'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386598724785,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000030'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386598782848,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f00002f'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 0
                },
                'actionInitiated': 1386598784633,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f00002e'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 1
                },
                'actionInitiated': 1386598788037,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f00002d'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 2
                },
                'actionInitiated': 1386598792119,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f00002c'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 3
                },
                'actionInitiated': 1386598799349,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f00002b'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 4
                },
                'actionInitiated': 1386598800872,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f00002a'
            },
            {
                'fnName': 'changeState',
                'args': {
                    'subState': '.activate',
                    'params': {
                        'page': 3
                    }
                },
                'actionInitiated': 1386598814052,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000029'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386598814101,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000028'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386598946812,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000027'
            },
            {
                'fnName': 'changeState',
                'args': {
                    'subState': '.activate',
                    'params': {
                        'page': 4
                    }
                },
                'actionInitiated': 1386598985066,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000026'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386598985124,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000025'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386599019274,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000024'
            },
            {
                'fnName': 'changeState',
                'args': {
                    'subState': '.activate',
                    'params': {
                        'page': 5
                    }
                },
                'actionInitiated': 1386599045950,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000023'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386599046007,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000022'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386599059268,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000021'
            },
            {
                'fnName': 'redo',
                'module': 'dialogue',
                'actionInitiated': 1386599069769,
                '_id': '52a5d2f0b69456b93f000020'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386599069805,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f00001f'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386599083456,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f00001e'
            },
            {
                'fnName': 'changeState',
                'args': {
                    'subState': '.activate',
                    'params': {
                        'page': 6
                    }
                },
                'actionInitiated': 1386599108258,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f00001d'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386599108374,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f00001c'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386599121981,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f00001b'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 0
                },
                'actionInitiated': 1386599124216,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f00001a'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 1
                },
                'actionInitiated': 1386599127789,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000019'
            },
            {
                'fnName': 'makeVisible',
                'args': {
                    'index': 2
                },
                'actionInitiated': 1386599129289,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000018'
            },
            {
                'fnName': 'changeState',
                'args': {
                    'subState': '.activate',
                    'params': {
                        'page': 7
                    }
                },
                'actionInitiated': 1386599136844,
                'module': 'dialogue',
                '_id': '52a5d2f0b69456b93f000017'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386599136907,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000016'
            },
            {
                'fnName': 'resume',
                'actionInitiated': 1386599144567,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000015'
            },
            {
                'fnName': 'pause',
                'actionInitiated': 1386599150865,
                'module': 'apollo',
                '_id': '52a5d2f0b69456b93f000014'
            }
        ],
        'presentationData': [
            {
                'templateName': 'title',
                '_id': '529f39c238aa0ebe4c000008',
                'keyVals': {
                    'title': 'Chinese lanterns',
                    'subtitle': 'Made by Grisha'
                },
                'apps': []
            },
            {
                'templateName': '7imageText',
                '_id': '529f474c360925c823000032',
                'apps': []
            },
            {
                'templateName': '1imageText',
                '_id': '529f4998360925c823000037',
                'keyVals': {
                    'title': 'What is convection',
                    'image1': 'http://upload.wikimedia.org/wikipedia/commons/0/08/Convection.gif',
                    'text1': 'Convection is a form of heat transfer',
                    'text2': 'When water/air is heated, it rises',
                    'text3': 'Colder water/air comes in to take its place'
                },
                'apps': []
            },
            {
                'templateName': '11imageText',
                '_id': '529f4a7e360925c823000038',
                'apps': []
            },
            {
                'templateName': '9imageText',
                '_id': '529f4ab8360925c823000039',
                'apps': []
            },
            {
                'templateName': '8imageText',
                '_id': '529f4c41360925c82300003d',
                'apps': []
            },
            {
                'templateName': '2imageText',
                '_id': '529f4c73360925c82300003e',
                'keyVals': {
                    'title': 'A lantern at home',
                    'image1': '//s3-ap-southeast-1.amazonaws.com/demo-answers-sg/Lantern/3092tea_bag.jpg',
                    'image2': '//s3-ap-southeast-1.amazonaws.com/demo-answers-sg/Lantern/Matchbox_PNG_by_AbsurdWordPreferred.png',
                    'text1': ''
                },
                'apps': []
            },
            {
                'templateName': '10imageText',
                '_id': '529f4dbc360925c82300003f',
                'apps': []
            }
        ],
        contentParams: {
            concept: [ 'Sky lantern wallpaper',
                'Ancient chinese nobles',
                'Convection animation wikimedia'],
            subject: ['Science','Physics'],
            location: 'Bangalore, India',
            language: ['English']
        }
    });


    // mongoose-fixture expects implementor to return
    // the callback passed in context
    return callback(error, fixture);
};
