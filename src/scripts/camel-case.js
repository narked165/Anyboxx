export { camelCase as default }

function camelCase(role) {
    let nameArray = role.split('').filter(k => k)
        nameArray.forEach((char, i) => {
        if (char === '-') {
            nameArray[i + 1] = nameArray[i + 1].toUpperCase()
            nameArray.splice(i, 1)
        }

    })
    return nameArray.join('')
}