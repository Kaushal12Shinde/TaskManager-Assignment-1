import './taskbox.css';
import { useEffect, useState } from 'react';
function Taskbox() {
    
    const [taskForm, setTaskForm] = useState(false);
    const [textInForm, setTextInForm] = useState('');
    const [dateInForm, setDateInForm] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [taskDeletion ,setTaskDeletion] = useState(false);
    const [allTask, setAllTask] = useState(true)


    //--As taskList updates or Refresh Page it will rerender Array
        useEffect(()=>{
            const taskListData = localStorage.getItem('savedTaskList');
            if(taskListData)
                setTaskList(JSON.parse(taskListData));
        },[])


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
            if(textInForm.length!==0 && dateInForm.length!==0){
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
        

    //--Check and Uncheck funtions for Done and Todo Task Respectively..
        const handelTaskStatus=(index)=>{
            let tempTaskList = [...taskList];
            tempTaskList[index].Status = tempTaskList[index].Status==='Todo'?'Done':'Todo';
            setTaskList(tempTaskList);
            localStorage.setItem('savedTaskList', JSON.stringify(tempTaskList));
        }
        
    
    //--Sorting on Basis Of todo Tasks and completed Tasks
        const displayTasks=(e)=>{

            let tempTaskList = JSON.parse(localStorage.getItem('savedTaskList'));

            if(e.target.innerText==='All')
            {
                setAllTask(true);
                setTaskList(tempTaskList);
            }
            else{
                setAllTask(false);
                let displayTaskList = tempTaskList.filter((eachTask)=>{
                    if(eachTask.Status===e.target.innerText)
                        return eachTask;
                });
                if(displayTaskList.length===0)
                {
                    alert(`No ${e.target.innerText} Task Yet`);
                    setTaskList(JSON.parse(localStorage.getItem('savedTaskList')));
                }
                else
                    setTaskList(displayTaskList);
            }
        }


    //--Clearing the Task from List
        const handleClearList=()=>{
            setTaskList([])
            localStorage.removeItem('savedTaskList');
        }


    //--Deleting Particular Task
        const handelDeletion=(index)=>{
            if(taskDeletion===true)
            {
                console.log(taskDeletion)
                let tempTaskList = JSON.parse(localStorage.getItem('savedTaskList'));
                tempTaskList.splice(index,1);
                if(tempTaskList.length===0)
                    setTaskDeletion(false);
                setTaskList(tempTaskList);
                localStorage.setItem('savedTaskList',JSON.stringify(tempTaskList));
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
                {!taskForm && <div className="select">
                    <button onClick={handleTaskForm}>Add</button>
                    <button onClick={displayTasks}>All</button>
                    <button onClick={displayTasks}>Todo</button>
                    <button onClick={displayTasks}>Done</button>
                </div>}
            </div>
            
            {!taskForm && <div className="taskSection">
                {taskList.length!==0 && <div className="task">
                    <ul>
                        {taskList && 
                            taskList.map((eachTask,index)=>{
                                return(
                                        <li key={index} onClick={()=>handelDeletion(index)}>
                                            <span>
                                                <input type="checkbox" id={index} checked={eachTask.Status==='Done'}
                                                    onChange={()=>handelTaskStatus(index)}/>
                                                <label htmlFor={index}></label>
                                            </span>
                                            {eachTask.Task}
                                            <span className='date'>{eachTask.Date}</span>
                                        </li>);
                            })
                        }
                    </ul>
                    {allTask&&<div className="removalContainer">
                        <button onClick={()=>{setTaskDeletion(!taskDeletion)}} className={taskDeletion ? 'deleteBut' : 'deleteButton'}>Delete</button>
                        <button onClick={handleClearList}>Clear</button>
                    </div>}
                </div>}
                {taskList.length===0 && <div className='task' style={{padding:'20px'}}> Click on Add to view task here</div> }
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