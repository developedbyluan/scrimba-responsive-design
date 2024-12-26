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
- `commit: 598c001`
- When I change their width to 100% of the container width, they look distorted and still overflow. Why is this happening?
- Becausee their parent is a flex container `section-two-image-container`.
- When multiple flex items within a container each try to claim 100% width, they create a natural overflow situation. This happens because the parent flex container can't accommodate both items at full width simultaneously, leading to unexpected layout behavior. Think of it like two people trying to sit in the same chair – something's got to give, and like any good drama, it's the images that suffer and get ugly!

> Note: the width of the child element is relative to the available amount of space in the parent element.

###  Set width constraint with max-width

-   While setting a container's width to 90% of its parent helps with responsiveness, there's a catch! As the viewport (the parent) grows wider, your text lines become uncomfortably long, making content harder to read. That's where max-width comes to the rescue!
-   By limiting the container to 800 pixels, we create an optimal reading experience across all screen sizes.

- Let's talk about an interesting edge case with our main image! While we've set its max-width to 600 pixels, there's something magical happening here – since its parent container is capped at 800 pixels, our image would never exceed that width anyway.

- Now, here's where it gets fascinating: Because our image isn't taking up the full container width, it naturally aligns to the left (thanks to that default text-align property we all know and love). 

- But wait – there's a plot twist! When we try to center it using margin: 0 auto, nothing happens. Why? Because images are born as inline elements – they're literally designed to flow with text! They ignore margins and don't naturally expand to their parent's width. This is why we need that powerful display: block declaration to make our centering dreams come true.

> Note: I create a javascript code snippet to display the image's width in the `main-image-size-display` span element.