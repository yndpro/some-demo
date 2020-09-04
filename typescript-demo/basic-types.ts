let isDone: boolean = false;
let decLiteral: number = 3;
let name: string = "adrian";

//array
let list1: number[] = [1,3,4];
let list2: Array<number> = [1,2,3];

//enum
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Red;
let colorName: string = Color[2];
console.log(c);
console.log(c);


//any
let notSure: any = "aa";
notSure = 4;
notSure.toFixed();
//let prettySure: Object = 4;


//void
function warnUser(): void {
    console.log("This is my warning message");
}
let unusable1: void = undefined;  //你只能为它赋予undefined和null

//undefined和null两者各自有自己的类型分别叫做undefined和null,默认情况下null和undefined是所有类型的子类型
let u: undefined = undefined;
let n: null = null;


//object表示非原始类型
declare function create(o: object | null): void;
create({prop:0})
create(null)
//create("saf")


//类型断言
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

export {};
