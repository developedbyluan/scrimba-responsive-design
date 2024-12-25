# NFTs

## Units

### Absolute unit:

-   the same size no matter what size of the screen you view.

### Relative units:

-   Relative to another value (font-size, parent size)
-   Dynamic flexibility
-   Resize & scale

#### Percentage: (for width) relative to the width of the parent element

1.
-   commit: `0e1e4cd``
-   When building responsive layouts, use percentage-based widths to make elements adapt relative to their parent
    containers.
-   In this commit, the .container takes up 90% of the header's width, while the header itself spans 100% of the
    viewport width.

2. Fix the images
- The images overflow from their parent .container because they're fixed at a width of 310 pixels (an absolute unit). 
- When I change their width to 100% of the container width, they look distorted and still overflow. Why is this happening?
- Becausee their parent is a flex container `section-two-image-container`.
- When multiple flex items within a container each try to claim 100% width, they create a natural overflow situation. This happens because the parent flex container can't accommodate both items at full width simultaneously, leading to unexpected layout behavior. Think of it like two people trying to sit in the same chair – something's got to give, and like any good drama, it's the images that suffer and get ugly!

> Note: the width of the child element is relative to the available amount of space in the parent element.
