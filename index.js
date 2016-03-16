var readline = require('readline');

/*
git remote add origin https://github.com/hollowdoor/readline_once.git
git push -u origin master
*/

module.exports = function startUpReadLine(rl){

    if(rl === undefined){
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    return function readlineOnce(question, required){

        rl.resume();

        if(typeof question === 'string'){

            return new Promise(function(resolve, reject){

                ask(question);

                function ask(question){

                    rl.question(question, function(line){
                        if(required && !line.length){
                            return ask(question);
                        }
                        rl.pause();
                        resolve(line);
                    });

                }
            });

        }else if(Object.prototype.toString.call(question) === '[object Array]'){

            return new Promise(function(resolve, reject){
                var index = 0, result = [], list = question;

                ask(question[0]);

                function ask(question){

                    rl.question(question, function(line){

                        if(required && !line.length){
                            return ask(question);
                        }

                        result.push(line);

                        if(++index < list.length){
                            return ask(list[index]);
                        }

                        rl.pause();
                        resolve(result);

                    });
                }
            });
        }

        return Promise.reject(new TypeError('A question should be an Array, or a String.'));

    };
};
