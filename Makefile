all: telegram.xpi

FILES := \
	install.rdf \
	chrome.manifest \
	telegram.js \
	$(wildcard content/*) \
	${NULL}

telegram.xpi: Makefile

telegram.xpi: ${FILES}
	-rm -f $@
	@zip -r $@ $^

install.rdf: install.rdf.rb
	ruby $< > $@

clean:
	rm -f telegram.xpi install.rdf

# Use in combination with the extension auto-installer extension
install: telegram.xpi
	curl $(if V,--verbose) --header Expect: --data-binary @$< http://localhost:8888/

.PHONY: clean install
