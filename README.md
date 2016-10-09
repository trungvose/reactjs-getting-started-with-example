# ReactJS - Getting Started with Examples
Initial application to get my head around ReactJS. Please check the example listed below.

## Demo
1. [Bootstrap Modal](http://codepen.io/trungk18/pen/XjRNBL)
2. [Increment Button](http://codepen.io/trungk18/pen/jrkopg)


## Summary
A `React` app is a set of reusable **component**. Component are like functions. They take input and produce an HTML document object model or DOM for short.
The input for components is one of two things:

- A set of **properties** that you can access inside component with `props` object. This **cannot be changed**.
- A set of **state** element that can be accessed with `this.state`. State **can be changed** and every time we change the state of a component, React will re-render it.
	
In `React`, we write DOM in `JavaScript` and we call that JS representation of the DOM, the **virtual DOM**. React has a way to write the **virtual DOM** in a syntax very close to `HTML` syntax that we're used to and that is `JSX`.

1. **Component** using `React.createClass({})` is the syntax to create new component, this take 1 argument - a JS object and we can define multiple thing within that object. Render is the required function.
	
2. To render, using `ReactDOM.render({<>, mountNode})`
