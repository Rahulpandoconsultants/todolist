import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Todo = () => {
     const[state,setState]=useState(false);
    const [list, setList] = useState([]);
    const [todos, setTodos] = useState();
    const[userId,setUserId]=useState('');
    const[edit,setEdit]=useState(false);
    const url = "http://localhost:7000";

    const showtask = async () => {
        try {
            const { data } = await axios.get(`${url}/api/show/todos`);
            setList(data);


        } catch (error) {
            console.log(error);
        }
    }

    const addtask = async (e) => {
        e.preventDefault();
        const x=todos;
        try {
            const add = await axios.post(`http://localhost:7000/api/create/list`, {'tasks':x})
            console.log(add);
            console.log(todos);
            if (add.status === 200) {
                setTodos("");
                showtask();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const showsingletodo= async(id)=>{
        try {
            const { data } = await axios.get(`${url}/api/show/todos/${id}`);
            setEdit(true);
            setUserId(data.id);
            setTodos(data.tasks);
            // editTodo(data);

        } catch (error) {
            console.log(error);
        }

    }

    const editTodo = async (e) => {
        e.preventDefault();
        try {
            const y=todos;
          const edit = await axios.put(`${url}/api/update/todos/${userId}`, {'tasks':y});
          if(edit.status === 200){
            setEdit(false);
            setTodos("");
            showtask();
          }
        } catch (error) {
          console.log("Error edit todo:", error);
        }
      };

    const deletetask = async (id) => {
        
        try {
            const tododelete = await axios.delete(`${url}/api/delete/todos/${id}`)
            if (tododelete.status === 200) {
                
                showtask();
            }

        } catch (error) {
            setEdit(false);
            console.log(error);
        }
    }



    useEffect(() => {
        showtask();
       }, [])
    
    return (
        <div>

            <div className='border-2 h-16 text-2xl border-indigo-400 mt-8 rounded-lg text-center bg-[#E5E4E2] pt-2'>
                <label for='task'>Add Your Task:-</label>
                <input type='text' className='w-1/4 border-b-4  outline-none  ' placeholder='Title' value={todos} onChange={(e) => {
                    setTodos(e.target.value)
                }} ></input>
                {edit?
                    <button className='border-2 ml-4 w-[18%] rounded-lg bg-sky-500 hover:bg-sky-700 ' id='input' onClick={editTodo}>Update Task  </button> :
                <button className='border-2 ml-4 w-1/12 rounded-lg bg-sky-500 hover:bg-sky-700 ' id='input' onClick={addtask}>Add Task  </button>
                }
            </div>

            <div >
                {
                    list && list.map(d => (
                        <ul key={d.id} className='  border-2 h-16 bg-[#F8F4FF] border-[#F0F8FF] w-1/2 mx-[auto] my-3 rounded-lg'>

                        {/* ms-[15vw] */}
                            <div className='relative inline-flex  gap-2 flex-wrap  '>
                            <div className='text-sky-500 text-4xl flex ' >{d.tasks}</div>
                            <span className='flex ml-[500px]'>
                            <div  onClick={()=>{showsingletodo(d.id)}} className=' border-2  bg-[#72A0C1] cursor-pointer rounded-lg h-10 w-20 text-center  p-1 hover:bg-[#0070BB] '  >Update</div>
                            <div onClick={()=>{deletetask(d.id)}} className='border-2 bg-[#72A0C1] cursor-pointer rounded-lg h-10 w-20 text-center p-1 hover:bg-[#0070BB]  '>Delete</div> </span>
                            </div>

                        </ul>
                    ))
                }

            </div>
        </div>
    );
}

export default Todo;
