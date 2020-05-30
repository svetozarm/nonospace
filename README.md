# Nonospace

Everything in this repo can be considered as MIT licensed.

Nonospace is a project intended primarily as an exercise in exploring the
modern JS-based web ecosystem. It is by no means an extensive exploration, as
that would be impossible with the pace of changes in web technologies.

The plan (for now):

- ~~Make a nonogram class to handle the state of the puzzle~~
- ~~Make frontend components with React to render the said state~~
- ~~Use the flux paradigm to connect state and UI~~
- ~~Build a nonogram server that serves random puzzles for a start~~

(UPDATE) This won't get done:

- Extend the server to connect to a database and pull puzzles from there
- Figure out how to automate Google Cloud Platform deployment
- Set up the deployment with load balancers to be able to scale out


The core is there, setting up a database is trivial in complexity, but time
consuming. I have tried out all the relevant GCP features on a different
projact, so this time is better spent differently.

If someone wants to use this as a base for a nonogram website, you can do so, as
long as you propagate the following license text into any files you reuse:

```
Copyright (c) 2020 Svetozar Miucin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
