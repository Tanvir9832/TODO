//  !selector Function 
function selector(attribute){
    return document.querySelector(attribute);
}

// !create Elements function
function create(element){
    return document.createElement(element);
}

//  !Selecting elements
const form = selector('form');
const date = selector('#date');
const t_name = selector('#name');
const t_priority = selector('#priority');
const tbody = selector('#tbody');
//  !Selecting elements end


// !set default date 
let todaysDate = new Date().toISOString().slice(0,10);
date.value = todaysDate;
// !set default date end

let todoArray = {};

// !unique Id generate
const uid = function(){
    return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36);
}
// !unique Id generate end

// !onload funtion

window.onload = function(){
    const tasks = getDataFromLocalStorage();
    tasks.map((task,index)=>{
        displayElements(task,index);

    })
}


// !Displaing todo 
const displayElements =(todo,index)=>{

        // !create element
        let tr = create('tr');
        // !create element end
        if(todo){
            const {name ,priority,date,status,no} = todo &&  todo;
            tr.innerHTML = `<td>${index+1}</td>
            <td id='newName'>${name}</td>
            <td id='newPriority'>${priority}</td>
            <td id='newStatus'>${status}</td>
            <td id='newDate'>${date}</td>
            <td id="newIcon">
                <button class="icon_btn_check"><i id="check" class="fa-solid fa-check-to-slot"></i></button>
                <button class="icon_btn_update"><i id="update" class="fa-sharp fa-solid fa-pen-to-square"></i></button>
                <button class="icon_btn_delete"><i id="delete" class="fa-solid fa-trash"></i></button>
            </td>`
            tr.dataset.id = no;
            tbody.appendChild(tr);
        }
        
}
// !Displaing todo end


// !form submission
form.addEventListener('submit',function(e){
e.preventDefault();

const elements= [...this.elements];
let isTrue =true;
elements.map((element)=>{
    if(element.name !== 'submit'){
        if(element.value ===''){
            alert('Fill');
            isTrue = false;
        }else{
            todoArray[element.name]=element.value;
        }
                 
    }
          
})
if(isTrue){
    todoArray.status = 'incomplete';
    todoArray.no = uid();
    this.reset();
    date.value = todaysDate;
    const newTask = getDataFromLocalStorage();
    displayElements(todoArray,newTask.length);
    newTask.push(todoArray);
    setDataFromLocalStorage(newTask);
    

}
});

// !form submission end



// !localStorage GET
const getDataFromLocalStorage =()=>{
    let tasks = [];
    let data = localStorage.getItem('tasks');
    if(data){
        tasks = JSON.parse(data);
    }
    return tasks;
}

// !localStorage SET
const setDataFromLocalStorage = (tasks)=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}



//  !Functionalities
tbody.addEventListener('click',function(e){
    if(e.target.id=='delete'){
        const tr = e.target.parentNode.parentNode.parentNode
        tr.remove();
        const id = tr.dataset.id;
        const tasks = getDataFromLocalStorage();
        const newTask =tasks.filter((elem)=>{
            return elem.no !== id;
        })
        setDataFromLocalStorage(newTask);
    }
    else if(e.target.id=='check'){
        const tr = e.target.parentElement.parentElement.parentElement;
        const id = tr.dataset.id;
        if(tr.children[3].innerHTML==='incomplete'){
            tr.children[3].innerHTML='complete';
            e.target.style.color = 'green';
        }else{
            tr.children[3].innerHTML='incomplete';
            e.target.style.color = 'rgb(148, 220, 40)';
        }
        const newTask = getDataFromLocalStorage();
        let clicked = newTask.map((element)=>{
            if(element.no==id){
            if(element.status==='incomplete'){
                element.status='complete';
                return element;
            }else{
                element.status='incomplete';
                return element;
            }
            }else{
                return element;
            }
            
        })
        setDataFromLocalStorage(clicked)

    }
    else if(e.target.id=='update'){
        const tr = e.target.parentElement.parentElement.parentElement;
        const id = tr.dataset.id;
        const tds = tr.children;

       

        [...tds].forEach((elm)=>{
            if(elm.id ==='newName'){
                let prevName = elm.innerHTML;
                elm.innerHTML = `<input type="text" name="text" id="text" value=${prevName}>`;
            }else if(elm.id === 'newPriority'){
                const prevPriority = elm.innerHTML;
                elm.innerHTML=`<select name="priority" id="updatePriority">
                <option value="Select todo" disabled >Select todo</option>
                <option ${prevPriority === 'High' ? 'selected' : ''} value="High">High</option>
                <option ${prevPriority === 'Medium' ? 'selected' : ''} value="Medium">Medium</option>
                <option ${prevPriority === 'Low' ? 'selected' : ''} value="Low">Low</option>
            </select>`;

                
                
            }else if(elm.id === 'newDate'){
                const prevDate = elm.innerHTML;
                elm.innerHTML=`<input type="date" name="date" value=${prevDate} id="updateDate">`
            }else if(elm.id === 'newIcon'){
                elm.innerHTML=`<i class="fa-sharp fa-solid fa-floppy-disk save"></i>`;
                const save = selector('.save');

                const updateDate = selector('#updateDate');
                const updatePriority =selector('#updatePriority');
                const text =selector('#text');

                save.addEventListener('click',function(){

                    const updatedDate =updateDate.value;
                    const updatedPriority = updatePriority.value;
                    const updatedtext= text.value;

                       
                    [...e.path[3].children].forEach((path)=>{

                        if(path.id==='newName' || path.id==='newPriority' || path.id==='newDate' ){
                            if(updatedtext ==''){
                                alert('Do not left any field empty');
                                
                            }else{
                                if(path.id==='newName'){
                                        path.innerHTML = updatedtext;
                                    
                                }
                                else if(path.id==='newPriority'){
                                        path.innerHTML = updatedPriority; 
                                }
                                else if(path.id==='newDate'){
                                        path.innerHTML = updatedDate;
                                    
                                }
                                elm.innerHTML=
                                `<td id="newIcon">
                                <button class="icon_btn_check"><i id="check" class="fa-solid fa-check-to-slot"></i></button>
                                <button class="icon_btn_update"><i id="update" class="fa-sharp fa-solid fa-pen-to-square"></i></button>
                                <button class="icon_btn_delete"><i id="delete" class="fa-solid fa-trash"></i></button>
                                </td>`
    
                            }
                        }

                    })
                    
                    const newTask = getDataFromLocalStorage();
                    let updatedTask = newTask.map((task)=>{
                        if(task.no===id){
                            task.name = updatedtext;
                            task.date = updatedDate;
                            task.priority = updatedPriority;

                            return task
                        }
                        return task
                    })

                    setDataFromLocalStorage(updatedTask);
                    
                })

            }
        })


    }
})


// !searching with name 

const search = selector('#search');


search.addEventListener('input',function(e){
    let searchedValue = search.value;
    let length = searchedValue.length;

    const nameFromLocalStorage = getDataFromLocalStorage();
    let newData = nameFromLocalStorage&&nameFromLocalStorage.filter((data)=>{
        if(data.name.slice(0,length) === searchedValue){
            return data;
        }
    })
    tbody.innerHTML='';
    newData&&newData.map((data,index)=>{
        displayElements(data,index);
    })
    
});

// !searching with name ends

//!filtering starts

const filterData =selector('#filter');

filterData.addEventListener('change',function(e){
    if(e.target.value==='all'){
        const taskFromLS = getDataFromLocalStorage();
        tbody.innerHTML='';
        taskFromLS&&taskFromLS.map((filteredData,index)=>{
            displayElements(filteredData,index);
        })


    }
    else if(e.target.value==='complete'){
        
        const taskFromLS = getDataFromLocalStorage();
        let newTaskData = taskFromLS.filter((taskData)=>{
            return taskData.status ==='complete';
        })
        tbody.innerHTML ='';
        newTaskData&&newTaskData.map((filteredData,index)=>{
            displayElements(filteredData,index);
        })
    }
    
    else if(e.target.value==='incomplete'){
        const taskFromLS = getDataFromLocalStorage();
        let newTaskData = taskFromLS.filter((taskData)=>{
            return taskData.status ==='incomplete';
        })
        tbody.innerHTML ='';
        newTaskData&&newTaskData.map((filteredData,index)=>{
            displayElements(filteredData,index);
        })
    }
})
// !filtering ends

//!sort

const sort = selector('#sort');
sort.addEventListener('change',function(e){
    if(e.target.value==='newest'){
        const taskFromLS = getDataFromLocalStorage();
        tbody.innerHTML='';
        taskFromLS&&taskFromLS.map((filteredData,index)=>{
            displayElements(filteredData,index);
        })

    }else if(e.target.value==='oldest'){
        const taskFromLS = getDataFromLocalStorage();
        taskFromLS.reverse();
        tbody.innerHTML='';
        taskFromLS&&taskFromLS.map((filteredData,index)=>{
            displayElements(filteredData,index);
        })
    }
})


// !searching with date

const find_date = selector('#find_date');
find_date.addEventListener('change',function(){
    if(find_date.value != ''){
        const findDate = getDataFromLocalStorage()

        let updatedDate = findDate.filter((date)=>{
            if(date.date == find_date.value){
                return date
            }
        })
        tbody.innerHTML='';
        updatedDate&&updatedDate.map((update,index)=>{
            displayElements(update,index);
        })
    }else{
        const taskFromLS = getDataFromLocalStorage();
        tbody.innerHTML='';
        taskFromLS&&taskFromLS.map((filteredData,index)=>{
            displayElements(filteredData,index);
        })

    }

 })



