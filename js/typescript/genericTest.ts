// Using this to debug some complicated issues around 
// use of generics. 

interface PageState<T> {
    readonly getThing: () => T
}

type SpecificType = {
    propYouDontHave : string;
}

interface PageStateContextModel {
    // pageStateAccessor?: PageState<SpecificType>;
    pageStateAccessor?: PageState<any>;
}

type MyType = {
    prop1: string;
    prop2: number;
}

const myPageState: PageState<MyType> = {
    getThing: (): MyType => ({
        prop1: 'adf',
        prop2: 5,
    })
};

const contextModel: PageStateContextModel = {
    pageStateAccessor: myPageState
}