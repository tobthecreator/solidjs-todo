import { Todo } from "../App";

type TodoItemProps = {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
};

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
	return (
		<div>
			{todo.id}-{todo.description}-{String(todo.completed)}
			<button onClick={() => onToggle(todo.id)}>Toggle</button>
			<button onClick={() => onDelete(todo.id)}>Delete</button>
		</div>
	);
};

export default TodoItem;
