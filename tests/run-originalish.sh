#!/bin/bash
# Runs the originalish script on the Brill-tagged column of labelled data to create the originalish classifications in labelled data
# See originalish.tcl comment header for more information about the originalish classifier.
cat labelled-data.tsv | cut -d$'\t' -f3 | while read line ; do
./originalish.tcl "$line"
done

