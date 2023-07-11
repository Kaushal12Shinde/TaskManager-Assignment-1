import './taskbox.css';
import { useEffect, useState } from 'react';
function Taskbox() {
    
    const [taskForm, setTaskForm] = useState(false);
    const [textInForm, setTextInForm] = useState('');
    const [dateInForm, setDateInForm] = useState('');
    const [taskList, setTaskList] = useState([]);

    //--As taskList updates or Refresh Page it will rerender Array
        useEffect(()=>{
            const taskListData = localStorage.getItem('savedTaskList');
            if(taskListData)
                setTaskList(JSON.parse(taskListData));
        },[taskList])


    //--Display Taskform or TaskTable
        const handleTaskForm=()=>{
            setTaskForm(!taskForm);
        }


    //--Extarcting Text from form as Task
        const handleTextInForm=(event)=>{
            setTextInForm(event.target.value);
        }


    //--Extracting Date from form as DueDate
        const handleDateInForm=(event)=>{
            setDateInForm(event.target.value);
        }


    //--On Submit check edge Case and store Data in array
        const handelAddTask = (e) =>{
            e.preventDefault();
            if(textInForm.length!=0&&dateInForm.length!=0){
                const newTask = {
                    Task : textInForm,
                    Date: dateInForm,
                    Status:"Todo"
                }

                //-- as newTask Get created is added to TaskList And stored in Local
                    const updatedTaskList = [...taskList,newTask];
                    setTaskList(updatedTaskList);
                    localStorage.setItem('savedTaskList',JSON.stringify(updatedTaskList));
                    setTaskForm(false);
                    setTextInForm('');
                    setDateInForm('');
            }
            else{
                alert("Please fill all fields");
            }
        }

    return (
        <div className="Taskbox">

            <div className="headSection">
                <div className="head">
                    <h2>Organize & Conquer</h2>
                </div>
            </div>

            <div className="selectionSection">
                <div className="select">
                    <button onClick={handleTaskForm}>Add</button>
                    <button>All</button>
                    <button>Todo</button>
                    <button>Done</button>
                </div>
            </div>
            
            {!taskForm && <div className="taskSection">
                <div className="task">
                    <ul>
                        {taskList && 
                            taskList.map((eachTask)=>{
                               return(<li><span><input type="checkbox" id="checkbox"/><label htmlFor="checkbox"></label></span>{eachTask.Task}<span className='date'>{eachTask.Date}</span></li>);
                            })
                        }
                    </ul>
                </div>
            </div>}
            
            {taskForm && <div className="taskForm">
                <h1>Add Task</h1>
                <form>
                    <input onChange={handleTextInForm}type="text" placeholder="Write Task" />
                    <input onChange={handleDateInForm}type="date" />
                    <button onClick={handelAddTask}>Submit</button>
                </form>
            </div>}
        
        </div>
    )
}

export default Taskbox
