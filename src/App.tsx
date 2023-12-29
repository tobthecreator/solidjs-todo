import { For, createSignal } from "solid-js";
import "./App.css";

function App() {
	const [count, setCount] = createSignal<number>(0);

	return (
		<>
			{count}
			<button
				onClick={(e) => {
					setCount((c) => c + 1);
				}}
			>
				MORE
			</button>
		</>
	);
}

export default App;
