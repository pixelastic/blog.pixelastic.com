---
layout: "post"
title: "Best Practices for JavaScript Exports"
tags: automation
---



When it comes to structuring my JavaScript projects, I've reached some pretty handy best practices. It's key to keep exports named so you can import only what's necessary. This approach plays nicely with tree-shaking, which helps trim down the final build size by stripping away unused code. Imagine we export everything; then we lose out on these optimizations.

![](/img/files/2025-02-12-javascript-exports-best-practices/01-ff117509e2.png)

I've started using a main.js file as the central hub. It imports from various other files, allowing access to individual components. This setup keeps dependencies clear and organized. Within each file, I've embraced the concept of scoped private methods. While not truly private, they are defined within the file's scope and not exported, making them inaccessible from the outside. For testing, if I ever need to access these "private" methods, I export them through a special object named __ (double underscore). This object holds the private methods, enabling me to call these functions indirectly. In tests, this lets me easily mock these functions without them being directly accessible in the production code.

Sometimes, I discover a need to mock functions from one module that are used in another. Previously, in my CommonJS days, I'd export private functions explicitly for this purpose. But I've found a more convenient way now. If, say, a module Norsca needs to call initConfig from NorscaConfig, I import it like any other function in Norsca. For testing, I can import everything as an object (via something like import * as NorscaConfig). This object contains all the functions as keys, and I can then spy on or mock them as needed. This is far simpler than managing explicit exports just for testing purposes.

The double underscore export is still valuable because it clearly marks which functions are supposed to be accessed only during testing. This helps in cases where private method functionality needs to be verified or mocked. The new approach clarifies what's test-accessible without cluttering exports with unnecessary items. Now, I can have one clean export per file, and if something needs to be mocked in a test, it has a designated place. Before, I used to have an extensive exported object with cluttered entries. Now, with a streamlined single export, the process is more transparent and easier to manage.