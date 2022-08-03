function func() {
    return new Promise((resolve, reject) => {
        resolve([1,2,3,4,5]);
    });
}

async function getArrayContent() {
    const a = await func();
    console.log(a);
}

getArrayContent();

// [4, 1, 1, 1, 1]