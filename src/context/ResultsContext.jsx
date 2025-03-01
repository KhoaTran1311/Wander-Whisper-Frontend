import { createContext, useContext, useState } from "react";

const ResultsContext = createContext();

export function ResultsProvider({ children }) {
	const [chosenCity, setChosenCity] = useState(null);

	return (
		<ResultsContext.Provider value={{ chosenCity, setChosenCity }}>
			{children}
		</ResultsContext.Provider>
	);
}

export const useResultsContext = () => useContext(ResultsContext);