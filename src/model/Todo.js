class Todo{
    constructor(id, title, text, date, isCompleted = "fail"){
        this.id = id,
        this.title = title,
        this.text = text,
        this.date = date,
        this.isCompleted = isCompleted
    }
}

module.exports = Todo;