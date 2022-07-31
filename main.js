//사용자가 입력후 +버튼 누르면 할일 생성
//finish버튼 클릭시 할일 끝남과 함께 밑줄 그임
//delete버튼 클릭시 삭제됨
//not done 누르면 아직 안끝난 일들만 보임, done 누르면 끝난 일들만 보임
// all 누르면 전체가 모두 보임

let userInput = document.querySelector(".user-input")
let addButton = document.querySelector(".add-button")
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.querySelector("#under-line")
let taskList = []
let state = 'all'
let filterList = []
let selectedTab = "all"

for(let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)})
}

addButton.addEventListener("click", addTask)
userInput.addEventListener("keyup", (e) => {
    if(e.keyCode == 13) {
        addTask(e)
    }
})

function addTask() {
    let task = {
        id: randomID(),
        taskContent: userInput.value,
        isComplete: false,
    }
    taskList.push(task)
    console.log(taskList)
    render()
}

function render() {
    let list = []
    if(state == "all"){
        list = taskList
    } else if (state == "not done" || state == "done"){
        list = filterList
    }
    let resultHTML = ''
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div class="button-box">
                <button class="back" onclick="toggleFinish('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
                <button onclick="deleteButton('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`
        } else if (list[i].isComplete == false) {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleFinish('${list[i].id}')"><i class="fa fa-check"></i></button>
                <button onclick="deleteButton('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`
        }

    }
    document.querySelector(".task-board").innerHTML = resultHTML
}

function toggleFinish(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break
        }
    }
    render()
    console.log(taskList)
}

function deleteButton (id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id){
            taskList.splice(i, 1)
            break
        }
    }
    filter()
    console.log(taskList)
}

function filter (event) {
    if(event) {
        state = event.target.id
        underLine.style.width = event.target.offsetWidth + "px"
        underLine.style.left = event.target.offsetLeft + "px"
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px"
    }
     
    // state = event.target.id
    filterList = []
    if(state == "all"){
        render()
    } else if (state == "not done") {
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }
        }
        render()
    } else if (state == "done") {
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i])
            }
        }
        render()
    }
}



function randomID () {
    return Math.random().toString(36).substr(2, 16);
  }
