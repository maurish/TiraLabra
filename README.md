TiraLabra
=========

Aineopintojen harjoitustyö: Tietorakenteet ja algoritmit   
[WIKI](https://github.com/maurish/TiraLabra/wiki) contains all the rest documentation

# Requirements
### Runtime requirements
Google-chrome -browser
* Other browsers may work, but this is not intentational

# Testing requirements
node.js
Mocha
chai
make

## How to run

### Program
	
Just open index.html with Chrome and everything should work.

## Tests
### Run all tests
``` bash
make test
```

### Watching files and running tests on file change
``` bash
make test-w
```

### Running invidual tests
tests are located inside scripts/tests folder relative to the project root
example:
``` bash
mocha scripts/tests/arrayTest.js
mocha scripts/tests/heapTest.js
mocha scripts/tests/setTest.js
```
