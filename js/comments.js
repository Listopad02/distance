const commentAdd = document.querySelector('#comment-add')
const commentName = document.querySelector('#comment-name')
const commentBody = document.querySelector('#comment-body')
const commentField = document.querySelector('#comment-field')
let comments = []

loadComments()

commentAdd.addEventListener('click', e => {
    e.preventDefault()

    let comment = {
        name: commentName.value,
        body: commentBody.value,
        time: Math.floor(Date.now() / 1000)
    }
    
    commentName.value = ''
    commentBody.value = ''
    comments.push(comment)
    saveComments()
    showComments()
})

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments))
}

function loadComments() {
    if (localStorage.getItem('comments')) {
        comments = JSON.parse(localStorage.getItem('comments'))
        showComments()
    }
}

function showComments() {
    let out = ''
    comments.forEach(item => {
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`
        out += `<p class="alert alert-primary">${item.name}</p>`
        out += `<p class="alert alert-success">${item.body}</p>`
    })
    commentField.innerHTML = out
}

function timeConverter(UNIX_timestamp) {
    const thisDate = new Date(UNIX_timestamp * 1000)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const year = thisDate.getFullYear()
    const month = months[thisDate.getMonth()]
    const date = thisDate.getDate()
    const hour = thisDate.getHours()
    const min = thisDate.getMinutes()
    const sec = thisDate.getSeconds()
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec

    return time
}