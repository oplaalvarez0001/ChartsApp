export interface User {
    userName: string;
    token: string;
    photoUrl: string;
    knownAs: string;
    gender: string;
    roles:string[];
}



// let data: number | string = 42;

// interface Car {
//     color: string;
//     model: string;
//     topSpeed?: number;
// }

// const car1: Car = {
//     color: "red",
//     model: "BMW",
//     topSpeed: 3
// }

// const car2: Car = {
//     color: "red",
//     model: "BMW",
// }

// const multiply = (x:number, y:number):number => {
//     return x * y;
// }