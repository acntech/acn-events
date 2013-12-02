#!/bin/bash
for var in $(ls lib/db/dummydata/*.json)
do
	collection=$(basename $var|cut -f1 -d".")

	echo "Iporting collection: $collection:"

	mongoimport --collection $collection < lib/db/dummydata/$collection.json
done
