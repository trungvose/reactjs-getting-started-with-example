# ReactJS - Getting Started with Example
To get my head around ReactJS with simple example. Please check them listed below.

## Demo
1. [Bootstrap Modal](http://codepen.io/trungk18/pen/XjRNBL)
2. [Increment Button](http://codepen.io/trungk18/pen/jrkopg)
3. [Github Card](http://codepen.io/trungk18/pen/GjxvNo)
4. [Random Math Game - Play Nine](http://codepen.io/trungk18/)

## React Introduction
A `React` app is a set of reusable **component**. The component is like functions. They take input and produce an HTML document object model or DOM for short.
The input for components is one of two things:

- A set of **properties** that you can access inside component with `props` object. This **can not be changed**.
- A set of **state** element that can be accessed with `this.state`. State **can be changed** and every time we change the state of a component, React will re-render it.
    
In `React`, we write DOM in `JavaScript` and we call that JS representation of the DOM, the **virtual DOM**. React has a way to write the **virtual DOM** in a syntax very close to `HTML` syntax that we're used to and that is `JSX`.

1. **Component** using `React.createClass({})` is the syntax to create a new component, this take 1 argument - a JS object and we can define multiple things within that object. Render is the required function.
    
2. To render into the DOM, using `ReactDOM.render(reactElement, domContainerNode)`

## Lifecycle Methods

Various methods are executed at specific points in a component's lifecycle.

### Mounting: componentDidMount
Invoked once, only on the client (not on the server), immediately after the initial rendering occurs. At this point in the lifecycle, you can access any refs to your children (e.g., to access the underlying DOM representation). The `componentDidMount()` method of child components is invoked before that of parent components.

## References
1. [React.js: Getting Started](https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents)
2. [React](https://facebook.github.io/react/)