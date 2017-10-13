const routes = ['1', '2', '3', null, '5', '6']

for (const route of routes) {
    if (route === '5') {
        console.log(`it is broken ${route}`)
        break;
    } else if (route) {
        console.log(`found ${route}`)
        continue;
    }
    console.log(`we did not break or continue : ${route}`)
}
