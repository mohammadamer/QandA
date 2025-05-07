import React from 'react';
import { UserIcon } from '../Icons/Icons';

// Important Note
// An *arrow function* is an alternative function syntax that was introduced in
// ES6. The arrow function syntax is a little shorter than the original syntax and it
// also preserves the lexical scope of this. The function parameters are defined
// in parentheses and the code that the function executes follows a =>, which is
// often referred to as a fat arrow. More information can be found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// export const Header = () => (
//     <div>
//         <a href="./">Q & A</a>
//         <input type="text" placeholder="Search..." onChange={handleSearchInputChange}/>
//         <a href="./signin">
//             <UserIcon />
//             <span>Sign In</span></a>
//     </div>
// );

export const Header = () => {
    
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
    };

    return (
        <div>
            <a href="./">Q & A</a>
            <input type="text" placeholder="Search..." onChange={handleSearchInputChange} />
            <a href="./signin">
                <UserIcon />
                <span>Sign In</span></a>
        </div>
    );
};

// Notice that there are no curly braces or a return keyword. Instead, we just define
// the JSX that the function should return directly after the fat arrow. This is called
// an *implicit return*.

// Important Note
// The const keyword can be used to declare and initialize a variable where its
// reference won't change later in the program. Alternatively, the let keyword
// can be used to declare a variable whose reference can change later in the
// program. More information can be found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const.

// Important Note
// When an implicit return statement is on multiple lines, parentheses are
// required. When an implicit return is on just a single line, we can get away
// without the parentheses.
// Prettier automatically adds parentheses to an implicit return if they are needed,
// so we don't need to worry about remembering this rule.