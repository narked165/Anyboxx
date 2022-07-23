exports.LogAgent = function() {
    return {
        _logs_: {},
        timestamp() {
            return new Date().toLocaleTimeString()
        },
        logId(n = 1) {
            let id_array = []
            for (let i = 0; i < n; i++) {
                id_array.push(Math.ceil(Math.random() * Math.pow(8, 10)).toString(21))
            }
            return id_array.join('-')
        },
        log(m) {
            let ts = this.timestamp(),
                id = this.logId()
            this._logs_[id] = this._logs_[id] || `[${ts}] [INFO] ${m}\n`

        },

        read() {
            let logArray = []
            for (let l in this._logs_) {
                logArray.push(this._logs_[l])
            }
            return logArray
        }
    }
}

