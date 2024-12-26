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

##### Set width constraint with max-width (commit `84a1e07`)

-   While setting a container's width to 90% of its parent helps with responsiveness, there's a catch! As the viewport (the parent) grows wider, your text lines become uncomfortably long, making content harder to read. That's where max-width comes to the rescue!
-   By limiting the container to 800 pixels, we create an optimal reading experience across all screen sizes.

- Let's talk about an interesting edge case with our main image! While we've set its max-width to 600 pixels, there's something magical happening here – since its parent container is capped at 800 pixels, our image would never exceed that width anyway.

- Now, here's where it gets fascinating: Because our image isn't taking up the full container width, it naturally aligns to the left (thanks to that default text-align property we all know and love). 

- But wait – there's a plot twist! When we try to center it using margin: 0 auto, nothing happens. Why? Because images are born as inline elements – they're literally designed to flow with text! They ignore margins and don't naturally expand to their parent's width. This is why we need that powerful display: block declaration to make our centering dreams come true.

> Note: I create a javascript code snippet to display the image's width in the `main-image-size-display` span element.

#### The `em` unit (commit `85565f8`)

The em unit is like a chameleon in CSS – it changes its reference point based on context!

-   When you're using it for spacing properties like padding and margin, it looks at the current element's font size and says "That's my guide!"
-   But here's the plot twist – when you use it for font-size itself, it looks up to the direct parent element and says "That's my reference point!"

Here's a quick example:
```html
<div class="parent">
    <div class="child">
        <p>Hello, world!</p>
    </div>
</div>
```
```css
.parent {
    font-size: 20px;        /* Base size */
}
.child {
    font-size: 0.5em;       /* 20px × 0.5 = 10px */
    padding: 1em;           /* 10px × 1 = 10px (based on its own font-size) */
    margin-bottom: 1.5em;   /* 10px × 1.5 = 15px */
}
.parent p { /* specificity: */
    font-size: 1em; /* 10px × 1 = 10px */
}
```

##### Absolute units are bad for responsive design and accessibility 
- ... because they don't adapt to the screen size.
- When you hard-code your website's font sizes and spacing using absolute units like pixels, you're essentially telling your users, "Sorry, your browser preferences don't matter!" If a user changes their default font size from 16px to 20px (perhaps due to vision needs), your website remains stubbornly fixed – creating potential accessibility barriers and a frustrating user experience. The last resort for users is to use the browser's zoom feature, which can be a pain.


> Side note: What about the direct parent of a child element (already have a font-size set) have no font-size set?
>
> The child element will look for the nearest parent element with a font-size set. If no parent element has a font-size set, the child element will use the default font-size of the browser, which is 16px.
```html
<div class="parent">
    <div class="child">
        <p class="hello">Hello, world!</p>
    </div>
</div>
```
```css
.parent {
    font-size: 20px;
}
.child {
}
.hello {
    font-size: 1em; /* 20px (parent's font-size) × 1 = 20px */
}
```


##### Pay attention: `commit: 467900f`
```css
h1 {
    font-size: 2.25em;
}
.subheading {
    font-size: 1.25em;
}
```
```html
<h1>Hello, world! <span class="subheading">Subheading</span></h1>
```

You set .subheading font-size to 1.25em, thinking the result will be 20px. But wait! What actually happens is mind-blowing:

html: 16px
body: 16px (inherited from the root/html element)
h1: 16px × 2.25 = 36px
.subheading: 36px × 1.25 = 45px

because, with the `em` unit, the .subheading element is a child of the h1 element, it will use the h1 element's font-size as its reference point.

Suddenly, your nested elements are growing exponentially – like a snowball rolling down a hill!


##### Margins and Padding (commit `9ce7a6c`)
when using `em` units for margins and padding, the value is relative to the current element's font-size.

>  Challenge:
>   1. Convert the padding value of .btn from px to em
>   2. Space buttons both horizontally and vertically using margins and em units
>   3. Convert the font-size of .btn from px to em

for button's/links decorated as buttons' paddings, top and bottom are set to a half of the font-size (0.5em), and left and right are set to the font-size (1em). In this case 1/2 em of 18px

for button's/links decorated as buttons' margins, top and bottom are set to the font-size (1em), and left and right are set to half of the font-size (0.5em). In this case 1 em of 18px

then I convert the font-size of .btn from px to em, from 18px to 1.125em.

> Challenge:
>  1. Convert the padding of header, section, and footer from px to em
>  2. Convert the bottom-margin of .main-image from px to em


##### An `em` value can compound from one level to the other (commit `1be6a38`)
https://scrimba.com/the-frontend-developer-career-path-c0j/~0iu

> Whenever you have nested elements with font-size set in `em`, the value can compound from one level to the other.

Here's a quick example:
```html
    <section class="section-zero"> <!-- 10px -->
        <div class="parent">
            <div class="child">
                <h1 class="heading">Name</h1> <!-- 20px -->
                <p class="title">Title</p>
            </div>
        </div>
    </section>
```

```css
.section-zero {
    background-color: darkorchid;
    color: white;
    font-size: 10px;
}

.heading {
    font-size: 2em; /* 20px */
}


/* Set font-size value for the parent of .heading element */
.child {
    font-size: 2em; /* 20px */
}
```

The .heading's font-size no longer has value of 20px but 2 times of its parent (2em * 10px).

=> Use `em` unit on font-size creates compound effect from one level to another.

=> To solve this cascading compound effect, introducing rem unit.

#### REM
An rem unit is always relative to the root <html> element and ignores the font-size of its parent element or any other ancestor element.
```css
html {
    font-size: 20px;
}
```

Change `em` to `rem` is straightforward. Except for .subheading, which is a child of h1 element, since change it to rem, it ignores the h1 element's font-size, and uses the root html element's font-size. So to get the font-size of .subheading to be 20px, we need to set the font-size of .subheading to 1.25rem (20/16, not 20/36 any more), not changing it from 0.55em to 0.55rem like other elements.
```css 
.subheading {
    display: block;
    /* font-size: 20px; */
    font-size: 1.25rem;
    color: #d0aaff;
}
```

##### Line height
- Line height property is used to set the height of the line box. It adds space above and below the text in horizontal writing mode and left and right space in vertical writing mode.

- When an element is set to `line-height: 2`, it means the line height will be 2 times the element's font size. Let's visualize this! (line-height is inherited from the parent element if no line-height is set on the element itself.)
```css
p {
    font-size: 16px;
    line-height: 2; /* 16px * 2 = 32px */
}
```

- highly recommended to use unitless line height value. Why?
```css
/* ❌ Using units */
.parent {
    font-size: 16px;
    line-height: 32px;    /* Fixed at 32px */
}
.child {
    font-size: 32px;      /* Still has 32px line-height - looks cramped! */
}

/* ✅ Using unitless */
.parent {
    font-size: 16px;
    line-height: 2;       /* 2 times the font-size */
}
.child {
    font-size: 32px;      /* Gets 64px line-height (2 × 32px) - properly scaled! */
}
```
> Note: line-height is inherited from the parent element if no line-height is set on the element itself.

> Rule of thumbs: Set line-height at 1.5 times the font-size (150%).



- Use this code snippet to visualize the line height.
citation: https://stackoverflow.com/questions/19032484/css-inspecting-line-height-in-browsers
```html
<p><span style="border: 1px solid red; display: inline-block; line-height: 1.5;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span> World</p>
```

- Change text to vertical writing mode.
```html
<p><span style="border: 1px solid red; display: inline-block; line-height: 1.5; writing-mode: vertical-rl;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span> World</p>
```

