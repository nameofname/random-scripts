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
            'cdn.com/jacket.jpg',
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

function dedupeImages(categories) {
    const categoryMap = {};
    const imageMap = {};
    const resultByImage = {};
    const resultByCategory = {};

    categories.forEach(({ name, images }) => {
        categoryMap[name] = images;
        images.forEach(path => {
            imageMap[path] = imageMap[path] || [];
            imageMap[path].push(name);
        });
    });

    // next sort the options in each map according to how accessible they are :
    Object.keys(categoryMap).forEach(catKey => {
        const imagesArr = categoryMap[catKey];
        imagesArr.sort((path1, path2) => {
            return imageMap[path1].length - imageMap[path2].length;
        });
    });

    Object.keys(imageMap).forEach(path => {
        const catArr = imageMap[path];
        catArr.sort((cat1, cat2) => {
            return categoryMap[cat1].length - categoryMap[cat2].length;
        });
    });
 
    // now implement stable marriage algorithm
    let idx = 0;
    function _stableMarriage() {
        let keepGoing = false;

        Object.keys(categoryMap).forEach(catKey => {
            const potentialImg = categoryMap[catKey].shift();
            const currentImagePartner = resultByCategory[catKey];

            if (potentialImg && !currentImagePartner) {
                keepGoing = true;
                const potentilaImgPartner = resultByImage[potentialImg];
                // now we figure out if the image prefers this category
                // more than it's current mate, or if it has no mate
                const preferenceForThisCategory = imageMap[potentialImg].indexOf(catKey);
                const preferenceForCurrentPartner = imageMap[potentialImg].indexOf(potentilaImgPartner);

                if (!potentilaImgPartner || preferenceForThisCategory > preferenceForCurrentPartner) {
                    resultByImage[potentialImg] = catKey;
                    resultByCategory[catKey] = potentialImg;
                    resultByCategory[potentilaImgPartner] = null;
                }
            }
        });

        if (keepGoing) {
            return _stableMarriage();
        }
    }

    _stableMarriage();
    return [ resultByImage, resultByCategory ];
}

const answer = dedupeImages(exampleInput);
console.log(answer);