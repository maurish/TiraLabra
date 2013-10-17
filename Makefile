REPORTER = spec
test:
	mocha 	--reporter $(REPORTER) scripts/tests

test-w:
	mocha 	--repoter $(REPORTER) scripts/tests \
			--growl \
			--watch


.PHONY: test test-w