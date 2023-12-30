import { For, createSignal, Accessor, createEffect } from "solid-js";
import { createLocalStore } from "./utils";

import "./App.css";

type Todo = {
	description: string;
	completed: boolean;
};

function App() {
	const [todos, setTodos] = createSignal<Todo[]>([
		{ description: "hi", completed: false },
		{ description: "tyler", completed: true },
	]);

	const toggleTodo = (index: number) => {
		setTodos((t) => {
			const updatedTodos = [...t];

			updatedTodos[index] = {
				...updatedTodos[index],
				completed: !updatedTodos[index].completed,
			};

			return updatedTodos;
		});
	};

	const doSideEffect = (prev: Todo[]) => {
		console.log(prev);
	};

	createEffect(() => doSideEffect(todos()));

	return (
		<For each={todos()}>
			{(todo, i) => {
				console.log(i);
				return (
					<div>
						{i()}-{todo.description}-{String(todo.completed)}
						<button
							onClick={(e) => {
								e.preventDefault();
								toggleTodo(i());
							}}
						>
							Toggle
						</button>
					</div>
				);
			}}
		</For>
	);
}

export default App;
