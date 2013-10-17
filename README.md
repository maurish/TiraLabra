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
make

## How to run

### Program
	
Just open index.html with Chrome and everything should work.

### Tests

``` bash
make test
```
tests are located inside scripts/test folder relative to the project root
single tests are run with nodejs, just type node *test.js where * is the name of the object to be tested
``` bash
mocha scripts/tests/arrayTest.js
mocha scripts/tests/heapTest.js
mocha scripts/tests/setTest.js
```
