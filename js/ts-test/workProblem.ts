enum COMPONENTS {
    PRODUCT_IMAGE,
    HEADLINE,
    BUY_BOX,
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
  
  interface HeadlineContext {
    fontSize: number
  } 
  
  interface BuyBoxContext {
    lines: number
  } 
  
  interface ProductImageContext {
    position: 'center' | 'bottom-align' | 'top-align'
  } 
  
  type ComponentTypeMap = {
    [COMPONENTS.BUY_BOX]: BuyBoxContext
    [COMPONENTS.PRODUCT_IMAGE]: ProductImageContext,
    [COMPONENTS.HEADLINE]: HeadlineContext
  
  }
  
  type ComponentContextTypes = ComponentTypeMap[keyof ComponentTypeMap];
  
  type ComponentContextBaseProps = {
    size: [ASPECT_RATIO, BREAKPOINT_SIZE];
  }
  
  type ComponentContextProps<ComponentProps, N = never> = {
   [Property in keyof N]?: never;  
  } & ComponentContextBaseProps & ComponentProps;
  
  type ComponentContextPropsMap = {
    [K in ComponentContextTypes as string]: ComponentContextProps<K, BuyBoxContext & ProductImageContext & HeadlineContext>
  }[keyof ComponentContextTypes]
  


/**
 * https://www.typescriptlang.org/play?#code/KYOwrgtgBAwg8gWQApwHIFFUBUDKUDeAUFFEgEpwAiAqjFgPoCSCAggOLoA0xUAEui0oAZRhm4kAQtQCa9CXAAa3AL6FCoSFBY4k6OvTIssjOAR44A0rJwxDuslAC8UAOQ4A1gE8cAYwBOAIYADsB+LuJQZHpYLKhsQuhOrmTAPgAuASAA5gA2wOE8ErEYDs4uEpkgoS6Equrg0BJRLBYoogw4jABaiUQkOKxCQkkARADOEAE5OSMRCOiUjNQIoxDAACYAlpCzPEIsZByjOQF+WcAjtWqbIGmhAGYBPsB8wAHrOTfAMAD2t8AADzSZhI9z+aRwmwAXsAAFxQBoAI1CtSg13+fkezygEjAngkPwBv3+QJBUE+VTG8KRKOUaMINzumKeLyQfh+6zA6UYk3OxLupL6UCCPzGmzSmz+8JczwxLigAB9XIifmk0j8IABaKabLIgeVKlzqoLaz56mp0tRpTwhWAakVVW5YG3ABDBJJCgDa8GQaEwuAAdFJZPIFABdeG4-GE-mAtI8b2IFAYbA4APkKi0BjMdjoCOkdmc7m877guMRRO+lOB-iCEQYfO8N4fL6xoFqOrW22-CAO0BpNtpZ0hMZJHt9p0ut1BT3uYCeH73O29v794eu4JhgDcVpdy4nA7LQIqY2AbJ+QVHziFYph8M92l0+kMxjgnBxzVacHa9E6PW3VyEF2LzjqutyDuel4ADygY6aSQWM76oEkVQAG6hAAfB6xCepBoTWlANxQHOC5LqgYYAPzUsA6F+FuJCogAZPuYGHiSaQnme7KXlAzGwf2CE7kBe78eBR7wdxYzTthJCehYhEgCxcGDuuo4BKOYxpH4NxZPmolsQKEkXmMUEWO+UYEkS4m8QWHJcmkPIBHy1nMU27wUqW7EYbUs7zouSn9ipLpjGGhBAA
 */