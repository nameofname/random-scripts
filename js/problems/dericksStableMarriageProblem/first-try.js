// Input: a list of categories with a list of related images (any number of images/category)
//       [
//          { name: 'art', images: ['painting.jpg', 'photo.jpg', ...] },
//          { name: 'featured', images: ['chair.jpg', 'book.jpg', ...] },
//          ...
//       ]
// Output: a list of categories with one unique image each
//       [
//          { name: 'art', image: 'painting.jpg' },
//          { name: 'featured', image: 'chair.jpg' },
//          ...
//       ]
// Goals:
// - choose a single image for each category such that no images are duplicated
// - include as many images as possible
// - if no unique image exists for a category, set image value to to 'NO_IMAGE' (hint: this is usually not the case!)

const exampleInput = [
    {
        name: 'featured',
        images: [
            'cdn.com/painting.jpg',
            'cdn.com/chair.jpg',
            'cdn.com/sofa.jpg',
            // 'cdn.com/jacket.jpg',
            'cdn.com/sweater.jpg',
        ],
    },
    {
        name: 'sale',
        images: ['cdn.com/chair.jpg', 'cdn.com/sweater.jpg'],
    },
    {
        name: 'furniture',
        images: ['cdn.com/chair.jpg', 'cdn.com/sofa.jpg', 'cdn.com/table.jpg', 'cdn.com/vase.jpg'],
    },
    {
        name: 'art',
        images: ['cdn.com/chair.jpg', 'cdn.com/painting.jpg'],
    },
    {
        name: 'contemporary',
        images: ['cdn.com/ring.jpg', 'cdn.com/sofa.jpg'],
    },
    {
        name: 'recommended',
        images: [
            'cdn.com/painting.jpg',
            'cdn.com/chair.jpg',
            'cdn.com/ring.jpg',
            'cdn.com/sofa.jpg',
        ],
    },
];
const exampleSolution = [
    { name: 'sale', image: 'cdn.com/sweater.jpg' },
    { name: 'art', image: 'cdn.com/painting.jpg' },
    { name: 'contemporary', image: 'cdn.com/ring.jpg' },
    { name: 'furniture', image: 'cdn.com/table.jpg' },
    { name: 'recommended', image: 'cdn.com/sofa.jpg' },
    { name: 'featured', image: 'cdn.com/jacket.jpg' },
];


/*
function dedupeImages(categories) {
    // count of times a category is used per image : 
    const categoriesUsed = {};
    // map of images to array of categories they are in
    const imageMap = categories.reduce((map, { name, images }) => {
        images.forEach(img => {
            if (!map[img]) {
                map[img] = [];
            }
            map[img].push(name);

            if (!categoriesUsed[name]) {
                categoriesUsed[name] = {
                    count: 0,
                    image: null,
                };
            }
            ++categoriesUsed[name].count;

        });

        return map;
    }, {});
    
    // return imageMap;
    // return categoriesUsed;

    const res = [];
    Object.keys(imageMap).forEach((imagePath) => {
        const categoryArr = imageMap[imagePath];
        let lowest = null;
        let lowestCat = null;
        categoryArr.forEach(catName => {
            const { count } = categoriesUsed[catName];
            if (lowest === null || count < lowest) {
                lowest = count;
                lowestCat = catName;
            }
        });
        // console.log('assigning...', lowestCat, imagePath)
        categoriesUsed[lowestCat].image = imagePath;
    });

    return [imageMap, categoriesUsed];
}
*/


function dedupeImagesFirstAttempt(categories) {
    // map of images to array of categories they are in
    const imageMap = categories.reduce((map, { name, images }) => {
        images.forEach(img => {
            if (!map[img]) {
                map[img] = {};
                map[img].cats = [];
                map[img].used = false;
            }
            map[img].cats.push(name);
        });
        return map;
    }, {});
    
    categories.forEach(cat => {
        const { name, images } = cat;
        let lowestImage;
        let chosenImage;
        const bestFitImage = images.forEach(imgPath => {
            const { cats, used } = imageMap[imgPath];
            if (!used && (lowestImage === undefined || cats.length < lowestImage)) {
                lowestImage = cats.length;
                chosenImage = imgPath;
            }
        });
        imageMap[chosenImage].used = true;
        cat.image = chosenImage;
    });

    // return imageMap;
    // return categories.reduce((o, { name, images }) => Object.assign(o, { [name]: images }), {});
    return categories.map(({ name, image }) => ({ name, image }));
}


function dedupeImages(categories) {
    const imageMap = {};
    const picksByCategory = {};
    const picksByImage = {};

    categories.forEach(({ name: catName, images }) => {
        const imagePickPercent = 100 / images.length;
        picksByCategory[catName] = picksByCategory[catName] || {};

        images.forEach(img => {
            imageMap[img] = imageMap[img] || [];
            imageMap[img].push(catName);
            picksByCategory[catName][img] = imagePickPercent;
        });
    });

    Object.keys(imageMap).forEach(imgPath => {
        const catArr = imageMap[imgPath];
        const catPickPercent = 100 / catArr.length;
        picksByImage[imgPath] = picksByImage[imgPath] || {};
        catArr.forEach(catName => {
            picksByImage[imgPath][catName] = catPickPercent
        });
    });

    return imageMap;
    return [picksByImage, picksByCategory]
}


const answer = dedupeImages(exampleInput);
console.log(answer);