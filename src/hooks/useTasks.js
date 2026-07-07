import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase";

const useTasks = () => {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(()=>{
    const tasksRef = ref(db,"tasks");
    const unsubscribe = onValue(
        tasksRef,
        (snapshot)=>{
            const data = snapshot.val();
            if(data){
                const taskList = Object.entries(data).map(([id,task])=>({
                    id,
                    ...task,
                }));
                setTasks(taskList);
            } else {
                setTasks([]);
            }
            setLoading(false);
        },
        (error)=>{
            console.error(error);
            setError(error.message);
            setLoading(false)
        }
    );
    return ()=> unsubscribe();
}, []);

return {
    tasks,
    loading,
    error,
};
};
export default useTasks;