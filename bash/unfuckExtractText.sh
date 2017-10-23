cat node_modules/extract-text-webpack-plugin/dist/index.js | node -e "console.log(process.argv[1].replace('shouldExtract \!== wasExtracted', 'shouldExtract && !wasExtracted'));" "$(cat $1)" > node_modules/extract-text-webpack-plugin/dist/index.js
 
