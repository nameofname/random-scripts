// the idea behind this is to create a type which requires that one of N properties is present on an object.

enum LAYOUTS {
  PRODUCT_IMAGE
}

enum ASPECT_RATIO {
  SKY_SCRAPER = 'SkyScraper',
  RECTANGLE = 'Rectangle',
  BANNER = 'Banner'
}

enum BREAKPOINT_SIZE {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

type AspectRatio = {
  [key in ASPECT_RATIO]: number;
}

interface HeadlineContext {
  fontSize: number
} 

interface BuyBoxContext {
  lines: number
} 

interface ProductImageContext {
  position: 'center' | 'bottom-align' | 'top-align'
} 

enum COMPONENTS {
  PRODUCT_IMAGE,
  HEADLINE,
  BUY_BOX,
}

type ComponentTypeMap = {
  [COMPONENTS.BUY_BOX]: BuyBoxContext,
  [COMPONENTS.PRODUCT_IMAGE]: ProductImageContext,
  [COMPONENTS.HEADLINE]: HeadlineContext
}

type ComponentContextTypes = ComponentTypeMap[keyof ComponentTypeMap];

type ComponentContextBaseProps = {
  size: [ASPECT_RATIO, BREAKPOINT_SIZE];
}

type ComponentContextProps<ComponentProps, N extends ComponentContextTypes > = {
 [Property in keyof Omit<N, keyof ComponentProps>]?: never;  
} & ComponentContextBaseProps & ComponentProps;

type ComponentContextPropsMap = {
  [K in ComponentContextTypes as string]: ComponentContextProps<K,BuyBoxContext & ProductImageContext & HeadlineContext>
}[keyof ComponentContextTypes]

type BreakpointConfig = {
  name: COMPONENTS;
  context: ComponentContextPropsMap;
}
