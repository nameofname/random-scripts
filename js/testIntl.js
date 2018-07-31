const colors = require('colors');
const us = require('./build/messages/en-US.json');
const gb = require('./build/messages/en-GB.json');
const de = require('./build/messages/en-GB.json');


function getIds (messageFile) {
    return Object.keys(messageFile)
        .map(k => messageFile[k].map(({id}) => id))
        .reduce((all, arr) => [...all, ...arr], []);
}

function diffMessageIds (one, two) {
    const firstIds = getIds(one.file);
    const secondIds = getIds(two.file);
    const diff = [];

    [...firstIds, ...secondIds].forEach(key => {
        const hasOne = firstIds.includes(key);
        const hasTwo = secondIds.includes(key);
        if (!hasOne || !hasTwo) {
            diff.push({
                id: key,
                includedIn: hasOne ? one.name : two.name
            });
        }
    });

    return diff;
}


function errorDiff(message, diffArray) {
    const idString = diffArray.map(({id}) => id).join('\n')
    console.log(colors.red(message));
    console.log(idString);
}

/**
 * If GB and DE have the same IDs,
 * then we just compare one of those to US
 * Else there's a problem with either GB
 * or DE.
 */
function compareMessageIds() {
    const deVsGb = diffMessageIds(
        { name: 'en-GB', file: gb },
        { name: 'de-DE', file: de }
    );

    if (deVsGb.length) {
        errorDiff('INTL Message Files : Mis matched message file for de-DE and en-GB, should have all the same IDs', deVsGb);
        return;
    }

    const usVsGb = diffMessageIds(
        { name: 'en-US', file: us },
        { name: 'en-GB', file: gb }
    );

    if (!usVsGb.length) {
        console.log(colors.green('INTL Message Files : All keys are translated. Awesome!'))
    } else {
        const usIncluded = usVsGb.filter(({ includedIn }) => includedIn === 'en-US');
        const usMissing = usVsGb.filter(({ includedIn }) => includedIn !== 'en-US');
        errorDiff('INTL Message Files : Found strings missing from en-US', usMissing);
        errorDiff('INTL Message Files : Found strings missing from translated files\n', usIncluded);
    }
}

compareMessageIds();