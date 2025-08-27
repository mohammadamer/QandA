import React from 'react';
import { UserIcon } from '../Icons/Icons';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { fontFamily, fontSize, gray1, gray2, gray5 } from '../Styles'
import { Link } from 'react-router-dom';

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
        <div css={css` position: fixed; box-sizing: border-box; top: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 10px 20px; background-color: #fff; border-bottom: 1px solid ${gray5}; box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21); `}>
            <Link to="/" css={css` font-size: 24px; font-weight: bold; color: ${gray1}; text-decoration: none;`}>
                Q & A
            </Link>

            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchInputChange}
                css={css` box-sizing: border-box; font-family: ${fontFamily}; font-size: ${fontSize}; padding: 8px 10px; border: 1px solid ${gray5}; border-radius: 3px; color: ${gray2}; background-color: white; width: 200px; height: 30px; :focus {outline-color: ${gray5};}`} />
            <Link
                to="signin"
                css={css` font-family: ${fontFamily}; font-size: ${fontSize}; padding: 5px 10px; background-color: transparent; color: ${gray2}; text-decoration: none; cursor: pointer; :focus { outline-color: ${gray5}; } span {margin-left: 7px;}`}>
                <UserIcon />
                <span>Sign In</span></Link>
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