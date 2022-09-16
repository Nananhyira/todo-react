import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./firebase";
import {
	collection,
	query,
	onSnapshot,
	updateDoc,
	doc,
	addDoc,
	deleteDoc,
} from "firebase/firestore";
const style = {
	bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#051118] to-[#0b0a21]`,
	container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
	heading: `text-3xl font-bold text-center text-gray-800 p-2`,
	form: `flex justify-between`,
	input: `border p-2 w-full text-xl`,
	button: `border p-4 ml-2 bg-red-500 text-slate-100`,
	count: `text-center p-2`,
};

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	//create todo on firebase
	const handleSubmit = async (e) => {
		e.preventDefault(e);
		if (input === "") {
			alert("please fill the input");
			return;
		}

		await addDoc(collection(db, "todo"), {
			text: input,
			completed: false,
		});
		setInput("");
	};
	//read todo from firebase
	useEffect(() => {
		const q = query(collection(db, "todo"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let todosnew = [];
			querySnapshot.forEach((doc) => {
				todosnew.push({ ...doc.data(), id: doc.id });
			});
			setTodos(todosnew);
		});
		return () => unsubscribe();
	}, []);

	//update todo from firebase
	const toggleComplete = async (todo) => {
		await updateDoc(doc(db, "todo", todo.id), {
			completed: !todo.completed,
		});
	};

	//delete todo from firebase
	const deleteTodo = async (id) => {
		await deleteDoc(doc(db, "todo", id));
	};

	return (
		<div className={style.bg}>
			<div className={style.container}>
				<h3 className={style.heading}>Todo App</h3>
				<form onSubmit={handleSubmit} className={style.form}>
					<input
						onChange={(e) => {
							setInput(e.target.value);
						}}
						value={input}
						type="text"
						className={style.input}
						placeholder="Add Todo"
					/>
					<button className={style.button}>
						<AiOutlinePlus size={30} />
					</button>
				</form>
				<ul>
					{todos.map((todo, index) => {
						return (
							<Todo
								key={index}
								deleteTodo={deleteTodo}
								todo={todo}
								toggleComplete={toggleComplete}
							/>
						);
					})}
				</ul>
				{todos.length < 1 ? null : (
					<p className={style.count}>{`you have ${todos.length} todos`}</p>
				)}
			</div>
		</div>
	);
}

export default App;
