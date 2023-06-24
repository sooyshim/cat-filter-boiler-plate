import { FC } from "react";

//1. Fetch data from the url `https://test.marvel/v1/public/characters/:id`

// const characters = [
//     { id: "1", name: "Iron man", date: "2023" },
//     { id: "2", name: "Spider man", date: "2023" },
//     { id: "3", name: "Black Panther", date: "2023" },
//     { id: "4", name: "Captain America", date: "2023" },
// ];
// 2. Find Iron man from the array
// 3. Create an array containing only names

const Test: FC = () => {
    return (
        <div className="ml-6 mt-6 flex flex-col">
            <h1 className="text-2xl ">Level Test</h1>
            <h2 className="mt-8 text-lg font-semibold">Questions</h2>
            <ul>
                <li className="mt-3"> - Tell me about yourself.</li>
                <li> - What is a virtual DOM?</li>
                <li> - Why would you use React.js?</li>
            </ul>
            <h2 className="mt-10 text-lg font-semibold">Tect Challenge</h2>
            <p className="mt-3">Go back to repo</p>
        </div>
    );
};

export default Test;
