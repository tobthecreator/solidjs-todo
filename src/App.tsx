import { For, createSignal, createMemo } from "solid-js";
import "./App.css";
import { createUniqueId } from "solid-js";
import TodoItem from "./components/TodoItem";

export type Todo = {
	id: string;
	description: string;
	completed: boolean;
};

const initialTodos = [
	{ id: createUniqueId(), description: "hi", completed: false },
	{ id: createUniqueId(), description: "tyler", completed: true },
];

function App() {
	const [filter, setFilter] = createSignal<boolean>(false);
	const [description, setDescription] = createSignal<string>("");
	const [todos, setTodos] = createSignal<Todo[]>(initialTodos);

	const deleteTodo = (id: string) => {
		setTodos((t) => {
			const tc = [...t];

			const deleteIndex = tc.findIndex((todo) => todo.id === id);

			tc.splice(deleteIndex, 1);

			return tc;
		});
	};

	const toggleTodo = (id: string) => {
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
				id: createUniqueId(),
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
					onChange={(e) => setDescription(() => e.target.value)}
				/>
				<button onClick={() => addTodo(description())}>Add</button>
			</div>
			<For each={displayTodos()}>
				{(todo) => {
					return (
						<TodoItem todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
					);
				}}
			</For>
		</>
	);
}

export default App;
