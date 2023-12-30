import { For, createSignal, createMemo } from "solid-js";
import "./App.css";

type Todo = {
	id: number;
	description: string;
	completed: boolean;
};

const initialTodos = [
	{ id: 1, description: "hi", completed: false },
	{ id: 2, description: "tyler", completed: true },
];

function App() {
	const [filter, setFilter] = createSignal<boolean>(false);
	const [description, setDescription] = createSignal<string>("");
	const [todos, setTodos] = createSignal<Todo[]>(initialTodos);

	const deleteTodo = (id: number) => {
		setTodos((t) => {
			const tc = [...t];

			const deleteIndex = tc.findIndex((todo) => todo.id === id);

			tc.splice(deleteIndex, 1);

			return tc;
		});
	};

	const toggleTodo = (id: number) => {
		setTodos((t) => {
			const updatedTodos = [...t];
			const updateIndex = updatedTodos.findIndex((todo) => todo.id === id);

			updatedTodos[updateIndex] = {
				...updatedTodos[updateIndex],
				completed: !updatedTodos[updateIndex].completed,
			};

			return updatedTodos;
		});
	};

	const addTodo = (description: string) => {
		setTodos((t) => {
			const newTodo = {
				id: t.length + 1,
				description,
				completed: false,
			};

			const updatedTodos = [...t, newTodo];

			return updatedTodos;
		});

		setDescription(() => "");
	};

	const displayTodos = createMemo(() =>
		!filter() ? todos() : todos().filter((t) => !t.completed)
	);

	return (
		<>
			<h2>Whatcha need to do my dood?</h2>
			<div>
				Filter Completed:
				<input
					type="checkbox"
					checked={filter()}
					onChange={(e) => setFilter(() => e.target.checked)}
				/>
			</div>
			<div>
				<input
					value={description()}
					onChange={(e) => setDescription((d) => e.target.value)}
				></input>
				<button onClick={(e) => addTodo(description())}>Add</button>
			</div>
			<For each={displayTodos()}>
				{(todo, i) => {
					return (
						<div>
							{todo.id}-{todo.description}-{String(todo.completed)}
							<button
								onClick={(e) => {
									e.preventDefault();
									toggleTodo(todo.id);
								}}
							>
								Toggle
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									deleteTodo(todo.id);
								}}
							>
								Delete
							</button>
						</div>
					);
				}}
			</For>
		</>
	);
}

export default App;
