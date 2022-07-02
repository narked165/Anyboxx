exports.createUniqueKey = function(length=8) {
    let keyArray = []

    if (typeof length !== 'number' || length > 16){
        length=8
    }

    for(i=0; i<length; i++) {
       keyArray.push(Math.ceil(Math.random() * Math.pow(8,10)).toString(33))
    }

    return keyArray.join('-')

}



