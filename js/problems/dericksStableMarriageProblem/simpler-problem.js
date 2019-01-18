const exampleInput = [
    {
        name: 'featured',
        images: [
            'cdn.com/painting.jpg',
            'cdn.com/chair.jpg',
            'cdn.com/sofa.jpg',
            'cdn.com/jacket.jpg',
            'cdn.com/sweater.jpg',
            'cdn.com/table.jpg',
        ],
    },
    {
        name: 'sale',
        images: [
            'cdn.com/chair.jpg',
            'cdn.com/sweater.jpg',
            'cdn.com/vase.jpg',
            'cdn.com/ring.jpg',
            'cdn.com/sofa.jpg',
            'cdn.com/chais-longue.jpg'
        ],
    },
    {
        name: 'furniture',
        images: [
            'cdn.com/chair.jpg',
            'cdn.com/sofa.jpg',
            'cdn.com/table.jpg',
            'cdn.com/vase.jpg',
            'cdn.com/chais-longue.jpg',
            'cdn.com/painting.jpg'
        ],
    },
    {
        name: 'art',
        images: [
            'cdn.com/chair.jpg',
            'cdn.com/sofa.jpg',
            'cdn.com/table.jpg',
            'cdn.com/vase.jpg',
            'cdn.com/chais-longue.jpg',
            'cdn.com/painting.jpg'
        ],
    },
    {
        name: 'contemporary',
        images: [
            'cdn.com/painting.jpg',
            'cdn.com/chair.jpg',
            'cdn.com/ring.jpg',
            'cdn.com/sofa.jpg',
            'cdn.com/chais-longue.jpg',
            'cdn.com/animal.jpg',
        ],
    },
    {
        name: 'recommended',
        images: [
            'cdn.com/painting.jpg',
            'cdn.com/chair.jpg',
            'cdn.com/ring.jpg',
            'cdn.com/sofa.jpg',
            'cdn.com/chais-longue.jpg',
            'cdn.com/bird-man.jpg',
        ],
    },
];

function dedupeImages(categories) {
    const usedImgs = new Map();
    return categories.map(({ name, images }) => {
        const image = images.find(img => {
            const notUsed = !Boolean(usedImgs.get(img));
            return notUsed;
        });
        usedImgs.set(image, true);
        return { name, image };
    });
}

console.log(dedupeImages(exampleInput));
